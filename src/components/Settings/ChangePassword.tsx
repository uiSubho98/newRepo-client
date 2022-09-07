import React, {useState, useEffect} from 'react';
import {Button, Form, Input} from 'antd';
import axios from "axios";
import queryString from "query-string";
import {G_API_URL} from '../../constants/constants';
import {encrypt} from '../../utils/encryption.util';
import {openNotification} from '../../utils/common.util';
import ResetBlock from '../Authentication/ResetBlock';
import { __getToken } from '../../utils/user-details.util';
import Verification from '../Authentication/Verification';
import CreatePassword from '../Authentication/CreatePassword';

interface IState {
    email: string;
    vcode: string;
    mode: number;
}

const PasswordForm = ({form: {getFieldDecorator,getFieldValue, validateFields}, locationData, decodedToken}: any) => {

    const defaultState = {
        email: "",
        vcode: '000000',
        mode: 0,
    }

    const [state, setState] = useState<IState>(defaultState);

    const [domReady, setDomReady] = useState(false);
    const [blockMode, setBlockMode] = useState('password');
    const [isLoading, setIsLoading] = useState(false);
    // const [passCurrent, setPassCurrent] = useState(false);
    // const [passNew, setPassNew] = useState(false);

    const { email, mode, vcode } = state;

    const setMode = (mode: number) => {
        setState(prev => ({
            ...prev,
            mode
        }));
    }

    const setEmail = (email: string) => {
        setState(prev => ({
            ...prev,
            email: email
        }))
    }

    const setVcode = (vcode: string) => {
        setState(prev => ({
            ...prev,
            vcode: vcode
        }))
    }



    const setDefault = (action: string = "password") => {
        setState(defaultState);
        setBlockMode(action);
    }

    const apiData = { 
        email: email, 
        encryptedMail: encrypt(email) 
    }

    useEffect(() => {
        setTimeout(() => {
            setDomReady(true)
        }, 50);
    }, []);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        validateFields((err:any, values: any) => {
            if (!err) {
                // Set Loading
                setIsLoading(true);
                // Encrypt user details and get Hex and Salt values
                const emailEncrypted = encrypt(decodedToken.email);
                const oldPassEncrypted = encrypt(values['old_password']);
                const passEncrypted = encrypt(values['new_password']);

                const data = {
                    emailEncrypted: emailEncrypted,
                    oldPassEncrypted: oldPassEncrypted,
                    passEncrypted: passEncrypted
                }

                const apiHeader = {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Authorization": __getToken()
                    }
                }

                axios.post(G_API_URL + `auth/change-password/`, queryString.stringify(data), apiHeader)
                    .then(response => {
                        if (response.data.status === 1) {
                            // Set Loading False
                            setIsLoading(false);
                            // Show Success Notification
                            openNotification('success', 'Password changed successfully', 2)
                        } else {
                            setIsLoading(false);
                            openNotification('fail', response.data.message, 6);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        setIsLoading(false);
                        openNotification('fail', err.message, 6);
                    });
            }
        })
    }

    const renderPasswordForm = () => {
        let formElements = [];
        formElements.push(
            <Form key="password-frm" onSubmit={(e) => handleSubmit(e)} className="change-password-form g-d">
                <div className="form-block">
                    <Form.Item label="Current Password">
                        {getFieldDecorator('old_password', {
                            rules: [
                                { required: true, message: 'Password cannot be empty!' }
                            ],
                        })(
                            <Input.Password
                                placeholder="Enter your current password"
                                // onChange={(e) => {
                                // (e.target.value).length > 0 ? setPassCurrent(true) : setPassCurrent(false)
                            // }}
                            />
                        )}
                    </Form.Item>
                </div>
                <div className="form-block">
                    <Form.Item label="New Password">
                        {getFieldDecorator('new_password', {
                            rules: [
                                { required: true, message: 'Password cannot be empty!' },
                                { min: 6, message: 'Password must be at least 6 characters.' }
                            ],
                        })(
                            <Input.Password
                                placeholder="Enter your new password"
                                // onChange={(e) => {
                                // (e.target.value).length > 0 ? setPassNew(true) : setPassNew(false)
                            // }}
                            />
                        )}
                    </Form.Item>
                </div>
                <div className="change-password-footer">
                    <div className="change-password-footer-action f-d f-vt f-v-s-m">
                        <Button
                            className="change-password-form-btn default-blue-btn btn-small"
                            type="primary"
                            htmlType="submit"
                            loading={isLoading}
                            >
                            Update
                        </Button>
                        <div className="forgot-password-btn body-regular 
                        c-pointer strong-text" onClick={() => setBlockMode('reset')}>
                            Forgot password?
                        </div>
                    </div>
                </div>
            </Form>
        );
        return formElements;
    }

    return (
        <>
            <div className={`password-content-container w-70 base-transition ${domReady ? 'ready' : ''}`}>
                <h3 className="heading text-big">
                    Change Password
                </h3>
                {blockMode === 'password' &&
                    renderPasswordForm()
                }
                {blockMode === 'reset' &&
                    <>
                        {
                            mode === 0 ?
                            <ResetBlock
                                fromPage={'profile'}
                                setMode={setMode}
                                setEmail={setEmail}
                                setDefault={setDefault}
                            /> :
                            mode === 1 ?
                            <Verification
                                fromPage={'profile'}
                                apiData = {apiData}
                                setMode={setMode}
                                setVcode={setVcode}
                            /> :
                            <CreatePassword 
                                fromPage={'profile'}
                                encryptedMail={apiData.encryptedMail} 
                                vcode={vcode} 
                                setDefault={setDefault}
                            />
                        }
                     </>
                }
            </div>

            <style jsx>
                {`

                .change-password-form,
                .reset-form {
                    margin: var(--peaky-gap-16) 0 0;
                }

                .change-password-form .form-block {
                    width: 331px;
                }

                // .change-password-form .ant-input:hover,
                // .change-password-form .ant-input:focus,
                // .change-password-form .ant-input-password:hover input {
                //     border-color: var(--pink);
                // }

                // .change-password-form .ant-input-affix-wrapper:hover .ant-input:not(.ant-input-disabled) {
                //     border-color: var(--pink);
                // }

                // .float-label.pass-label label {
                //     font-size: 12px;
                //     transform: translateY(-24%);
                // }

                .password-content-container .ant-input,
                .change-password-form .ant-input {
                    border: none;
                    border-radius: 2px;
                    outline: none;
                }
                
                .password-content-container .ant-input:focus,
                .change-password-form .ant-input:focus {
                    box-shadow: 0 0 0 2px var(--primary);
                    outline: none;
                }
                
                .change-password-footer .password-guide {
                    margin-bottom: 1rem;
                }

                .change-password-form-btn {
                    padding: 0 2rem;
                }

                .forgot-password-btn {
                    color: var(--primary);
                    margin-top: var(--peaky-gap-32);
                }

                .password-content-container .back-to-password {
                    width: max-content;
                    transition: all 0.2s;
                }

                .password-content-container .back-to-password:hover {
                    color: var(--pink);
                }

                .back-to-password .icon {
                    margin-right: 8px;
                }

                .reset-form .form-block,
                .set-password-block .form-block {
                    width: 331px;
                }

                .set-password-block .form-block {
                    margin-bottom: 2rem;
                }

                .form-block.mobile-group .ant-select {
                    width: 60px !important;
                }

                .mobile-verification-container {
                    margin-top: 1rem;
                    text-align: unset;
                }

                .set-password-block {
                    margin-top: 1rem;
                }

                .set-password-block h1 {
                    font-size: 24px;
                    font-weight: 400;
                }

                .password-content-container .otp-inputs-container {
                    justify-content: unset !important;
                }

                .password-content-container .mail-sent-block {
                    margin-top: 1rem;
                }

                .password-content-container .otp-form .submit-otp-btn {
                    margin: 0;
                }

                .reset-form-action .cancel-btn {
                    font-size: 16px;
                    margin-left: 1rem;
                    color: var(--dove);
                }

                .reset-form-action .cancel-btn:hover {
                    text-decoration: underline;
                }

                .change-password-form .form-block,
                .change-password-form .change-password-form-btn {
                    width: 300px;
                }

                .change-password-form .form-block input,
                .change-password-form .ant-select-selection--single {
                    height: 50px;
                    font-weight: 300;
                    color: var(--dove);
                    background-color: #383838;
                    border-radius: var(--peaky-br-2);
                }

                .change-password-form .form-block input:focus {
                    background-color: #383838 !important;
                }

                .change-password-form .form-block input::placeholder,
                .change-password-form .intl-tel-input input::placeholder,
                .change-password-form .ant-select-selection__placeholder {
                    color: var(--dove);
                    opacity: 0.38;
                }

                .change-password-form .ant-form-item-label {
                    font-family: 'OpenSans', sans-serif;
                    font-weight: 700;
                }

                .change-password-form .ant-form-item-required::before,
                .change-password-form .ant-form-item-label > label::after {
                    margin: unset;
                    content: unset;
                }

                .change-password-form .ant-form-item-label > label {
                    color: var(--dove);
                    opacity: 0.87;
                }

                .change-password-form .ant-input{
                    border: unset;
                    border-radius: unset;
                    font-size: 16px;
                }

                .change-password-form .ant-input:focus {
                    box-shadow: none;
                    border: solid 1px var(--primary); 
                }
                
                .change-password-form input:-webkit-autofill,
                .change-password-form input:-webkit-autofill:hover,
                .change-password-form input:-webkit-autofill:focus,
                .change-password-form input:-webkit-autofill:active {
                    -webkit-transition: "color 9999s ease-out, background-color 9999s ease-out";
                    -webkit-transition-delay: 9999s;
                }
                
                .change-password-form .intl-tel-input.allow-dropdown input {
                    border: none;
                    color: var(--dove);
                    font-size: 16px;
                    width: 300px;
                }

                .change-password-form .intl-tel-input.allow-dropdown input:focus {
                    border: none;
                    box-shadow: none;
                }

                .change-password-form .ant-input-password-icon {
                    color: rgba(255, 255, 255, 0.87);
                    font-size: 18px;
                }

                .change-password-form .change-password-form-btn {
                    margin: var(--peaky-gap-8) 0 0;
                }

                @media only screen and (max-device-width: 760px) {
                    .password-content-container {
                        width: unset;
                    }

                    .change-password-form .form-block {
                        width: 100%;
                    }

                    .change-password-form-btn {
                        margin-bottom: 1rem;
                    }

                    .forgot-password-btn {
                        margin-left: 0;
                    }

                    .reset-form .form-block, .set-password-block .form-block {
                        width: 100%;
                    }

                    .change-password-form .change-password-form-btn {
                        width: 100%;
                    }

                    .change-password-form .ant-form-item {
                        margin-bottom: var(--peaky-gap-32);
                    }
    
                }

                @media only screen and (max-device-width: 360px) {

                }
                `}
            </style>
        </>
    );
}

const Password = Form.create<any>()(PasswordForm);
export default Password;
