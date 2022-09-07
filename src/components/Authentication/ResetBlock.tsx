import React, {useEffect, useState} from 'react';
import {Button, Input, Form} from 'antd';
import FloatLabel from './../Form/FloatLabel';
import {G_URL, G_API_URL} from '../../constants/constants';
import axios from "axios";
import queryString from "query-string";
import Countdown from 'react-countdown';
import OtpInput from 'react-otp-input';
import {encrypt} from '../../utils/encryption.util';
import {openNotification} from '../../utils/common.util';
import ISDCodesDropDown from '../Onboard/ISDCodeDropDown';

interface IState {
    loading: boolean;
    otpSubmitting: boolean;
    requestProcessed: boolean;
    otpVerified: boolean;
    userMail: string,
    encryptedMail: string;
    passLabel: boolean;
    resendCount: number;
    inSwitch: boolean;
    isInvalid: boolean;
    resetMode: string;
    validationError: boolean;
    counterTime: number;
    changedNumber: any;
    enteredOtp: string;
}

const ResetForm = (props: any) => {

    const defaultState = {
        loading: false,
        otpSubmitting: false,
        requestProcessed: false,
        otpVerified: false,
        userMail: '',
        encryptedMail: '',
        passLabel: false,
        resendCount: 1,
        inSwitch: true,
        isInvalid: false,
        resetMode: '',
        validationError: false,
        counterTime: 0,
        changedNumber: '',
        enteredOtp: ''
    };

    const [ state, setState ] = useState<IState>(defaultState);

    useEffect(() => {
        // const {locationData} = props;
        // if (locationData['country_name'] !== 'India') {
        //     setState(prev => ({
        //         ...prev,
        //         inSwitch: true
        //     }));
        // }
    }, [])

    // componentDidMount() {
    //     const {locationData} = this.props;
    //     if (locationData['country_name'] !== 'India') {
    //         this.setState({inSwitch: true});
    //     }
    // }

    const config = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        props.form.validateFields((err: any, values: any) => {
            if (!err) {
                const resetMode = values['email'] !== undefined ? 'email' : values['mobileNumber'] !== undefined ? 'mobile' : 'none';
                // Set Loading
                setState(prev => ({ 
                    ...prev,
                    loading: true,
                    resetMode: resetMode
                }));

                // Check from from Settings Page
                const {setMode, setEmail} = props

                // Encrypt user details and get Hex and Salt values
                const emailEncrypted = encrypt(values['email']);

                // Request Data
                let apiData = {};

                // Set Data in state
                if (resetMode === 'email') {
                    setState(prev => ({
                        ...prev,
                        encryptedMail: emailEncrypted,
                        userMail: values['email']
                    }));
                    setEmail(values['email'])
                    apiData = {
                        mode: resetMode,
                        emailEncrypted: emailEncrypted
                    }
                } else if (resetMode === 'mobile') {
                    setState(prev => ({
                        ...prev,
                        changedNumber: {...values}
                    }));
                    apiData = {
                        mode: resetMode,
                        prefix: values['prefix'],
                        mobileNumber: values['mobileNumber']
                    }
                }
                const config = {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                };

                axios
                .post(G_API_URL + "auth/reset-password/", queryString.stringify(apiData), config)
                .then(response => {
                    if (response.data.status === 1) {
                        openNotification('success', 'Verification code sent successfully', 4);
                        setState(prev => ({
                            ...prev,
                            loading: false,
                            requestProcessed: true,
                            counterTime: Date.now() + 180000
                        }));
                        setMode(1)
                    } else {
                        openNotification('fail', response.data.message, 4);
                        setState(prev => ({
                            ...prev,
                            loading: false
                        }));
                    }
                })
                .catch(err => {
                    console.log(err);
                    setState(prev => ({
                        ...prev,
                        loading: false
                    }));
                });
            } else {
                // Set Loading
                setState(prev => ({ 
                    ...prev,
                    loading: false
                }));
            }
        })
    }

    const resendRequest = () => {
        const {encryptedMail, resendCount, resetMode, changedNumber} = state;
        // Update resend Count
        setState(prev => ({ 
            ...prev,
            resendCount: resendCount + 1 
        }));
        // Data based on Reset Mode
        let apiData = {};
        if (resetMode === 'email') {
            apiData = {
                mode: resetMode,
                emailEncrypted: encryptedMail
            }
        } else if (resetMode === 'mobile') {
            apiData = {
                mode: resetMode,
                prefix: changedNumber['prefix'],
                mobileNumber: changedNumber['mobileNumber']
            }
        }
        if (resendCount < 3) {
            axios
            .post(G_API_URL + "auth/reset-password/", queryString.stringify(apiData), config)
            .then(response => {
                if (response.data.status === 1) {
                    if (resetMode === 'email') {
                        openNotification('success', 'Mail sent successfully', 3);
                    } else {
                        openNotification('success', 'OTP sent successfully', 3);
                        // Set Reset Counter
                        setState(prev => ({
                            ...prev,
                            counterTime: Date.now() + 180000
                        }));
                    }
                } else {
                    openNotification('fail', response.data.message, 6);
                }
            })
            .catch(err => {
                console.log(err);
            });
        } else {
            openNotification('fail', 'Resend limit has been reached!, try after some times')
        }
    }

    const submitOTP = (e: React.FormEvent) => {
        e.preventDefault();
        props.form.validateFields((err: any, values: any) => {
            const {enteredOtp} = state;
            const invalidInput = enteredOtp !== '' && enteredOtp.length === 6 ? false : true;
            if (invalidInput) {
                setState(prev => ({
                    ...prev,
                    validationError: true
                }));
            } else {
                // Set Loading
                setState(prev => ({
                    ...prev,
                    otpSubmitting: true
                }));
                const email = state.userMail;
                const otpInput = enteredOtp;
                var data = {
                    otp: otpInput,
                    email: encrypt(email)
                }
                
                // Validate OTP
                axios
                    .post(G_API_URL + "auth/validate-otp/", queryString.stringify(data), config)
                    .then(response => {
                        if (response.data.status === 1) {
                            // Set Errors false
                            setState(prev => ({
                                ...prev,
                                isInvalid: false,
                                validationError: false,
                                otpSubmitting: false,
                                otpVerified: true
                            }));
                            // Show Notification
                            openNotification('success', 'Mobile number verified successfully', 2);
                        } else {
                            // Set Invalid Status
                            setState(prev => ({
                                ...prev,
                                isInvalid: true,
                                otpSubmitting: false
                            }));
                            // Show failure message
                            openNotification('fail', response.data.message, 4);
                        }
                    })
                    .catch(err => {
                        setState(prev => ({
                            ...prev,
                            otpSubmitting: false
                        }));
                        console.log(err);
                    });
            }
        })
    }

    const submitPassword = (e: React.FormEvent) => {
        e.preventDefault();
        props.form.validateFields((err: any, values: any) => {
            if (!err) {
                // Set Loading
                setState(prev => ({
                    ...prev,
                    loading: true
                }));
                const {prefix, mobileNumber} = state.changedNumber;
                const {enteredOtp} = state;

                // Check from from Settings Page
                const {fromPage} = props;

                // Encrypt password
                const passEncrypted = encrypt(values['password']);

                var data = {
                    mode: 'otp',
                    vcode: enteredOtp,
                    prefix,
                    mobileNumber,
                    passEncrypted
                }
                
                // Create password API
                axios
                .post(G_API_URL + "auth/create-password/", queryString.stringify(data), config)
                .then(response => {
                    if (response.data.status === 1) {
                        // Set Loading False
                        setState(prev => ({
                            ...prev,
                            loading: false
                        }));
                        // Show Success Notification
                        let successMsg = fromPage !== "profile" ? "Password set successfully, please log in with new password" : "Password Changed Successfully";
                        openNotification('success', successMsg, 2)

                        // If its from Settings Page No Redirection
                        if (fromPage !== 'profile') {
                            // Redirect to login
                            setTimeout(() => {
                                window.location.href = decodeURIComponent(G_URL + "login");
                            }, 1000);
                        }
                    } else {
                        setState(prev => ({ ...prev, loading: false }));
                        openNotification('fail', response.data.message, 6)
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            }
        })
    }

    const renderer = ({minutes, seconds, completed}: any) => {
        if (completed) {
            return (
                <span className="resend-otp-btn c-pointer" onClick={() => resendRequest()}>
                    Resend
                </span>
            )
        } else {
            return (
                <span className="resend-otp-timer">
                    Resend in {minutes}:{seconds}
                </span>
            )
        }
    }

    // const inputFocus = (elmnt: any) => {
    //     if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
    //         elmnt.preventDefault();
    //         const next = elmnt.target.tabIndex - 2;
    //         if (next > -1) {
    //             elmnt.target.form.elements[next].focus()
    //         }
    //     }
    //     else {
    //         const next = elmnt.target.tabIndex;
    //         if (next < 6) {
    //             elmnt.target.form.elements[next].focus()
    //         }
    //     }
    // }

    // const renderOtpInputs = (getFieldDecorator: any) => {
    //     const inLength = 6;
    //     let holdInElement = [];
    //     for (let i = 1; i <= inLength; i++) {
    //         holdInElement.push(
    //             <Form.Item key={i}>
    //                 {getFieldDecorator(`otp_${i}`, {
    //                     getValueFromEvent: (e: any) => {
    //                         const convertedValue = Number(e.currentTarget.value);
    //                         if (!isNaN(convertedValue)) {
    //                             return convertedValue;
    //                         }
    //                     },
    //                     rules: [{ required: false }],
    //                 })(<Input maxLength={1} tabIndex={i} name={`otp${i}`} placeholder={i.toString()} onKeyUp={e => inputFocus(e)} autoFocus={i === 1 ? true : false} />)}
    //             </Form.Item>
    //         )
    //     }
    //     return holdInElement;
    // }

    const updateEnteredOTP = (enteredOtp: string) => {
        setState(prev => ({
            ...prev,
            enteredOtp
        }));
    }

    const {
        loading,
        otpSubmitting,
        requestProcessed,
        otpVerified,
        userMail,
        inSwitch,
        isInvalid,
        validationError,
        counterTime,
        enteredOtp
    } = state;
    const {getFieldDecorator} = props.form;
    const {fromPage, setDefault} = props;
    return (
        <>
            {
                !requestProcessed ?
                <Form onSubmit={handleSubmit} className="reset-form">
                    <div className="form-content">
                        <div className="inputs-container">
                            <div className={`form-block ${inSwitch ? 'active' : ''}`}>
                                {inSwitch &&
                                    <>
                                        <Form.Item label={"Email"}>
                                            {getFieldDecorator('email', {
                                                rules: [{ required: true, message: 'Email cannot be empty!' }],
                                            }) ( 
                                                <Input type="text" placeholder="Enter Email" />
                                            )}
                                        </Form.Item>
                                    </>
                                }
                            </div>
                            {
                                !inSwitch && 
                                <span className="text-small strong-text mobile-input-label">Mobile</span>
                            }
                            <div className={`form-block mobile-group ${!inSwitch ? 'active' : ''} f-d f-h-c`}>
                                {!inSwitch &&
                                    <>
                                        <ISDCodesDropDown getFieldDecorator={getFieldDecorator} isDisabled={'yes'} />
                                        <Form.Item>
                                            {getFieldDecorator('mobileNumber', {
                                                getValueFromEvent: (e: any) => {
                                                    const convertedValue = Number(e.currentTarget.value);
                                                    if (!isNaN(convertedValue)) {
                                                        return convertedValue;
                                                    }
                                                },
                                                rules: [{ required: true, message: 'Mobile cannot be empty!' }],
                                            })(
                                                <Input minLength={4} maxLength={10} placeholder="Enter Mobile Number" />
                                            )}
                                        </Form.Item>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="reset-form-action f-d f-v-c">
                        <Button
                            className={`reset-form-btn default-blue-btn btn-small 
                            ${fromPage !== "profile" ? "custom-width" : ""}`}
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                        >
                            Get verification code
                        </Button>
                        {fromPage === "profile" &&
                            <div className="cancel-btn c-pointer strong-text" onClick={() => setDefault('password')}>Cancel</div>
                        }
                    </div>
                    {/* {
                        locationData['country_name'] === 'India' &&
                        <div className="input-switch c-pointer" onClick={() => loading ? null : setState(prev => ({...prev, inSwitch: !inSwitch}))}>
                            or <span className="type-in strong-text">use {!inSwitch ? 'Email' : 'Mobile'}</span>
                        </div>
                    } */}
                </Form>
                :
                    !otpVerified ?
                        <div className="mobile-verification-container text-c-d">
                            <div className="code-sent-info body-big">
                                {`Enter the verification code sent to ${userMail !== '' ? userMail : ''}`}
                                <span className="change-number-btn c-pointer" onClick={() => setState(prev => ({...prev, requestProcessed: false}))}>Change</span>
                            </div>
                            <div className="otp-form">
                                <Form onSubmit={submitOTP}>
                                    <div className="otp-inputs-container f-d f-h-c">
                                        <OtpInput
                                            containerStyle="otp-inputs-container"
                                            className="otp-input"
                                            value={enteredOtp}
                                            placeholder="123456"
                                            onChange={(otp:string) => updateEnteredOTP(otp)}
                                            numInputs={6}
                                            shouldAutoFocus
                                            isInputNum
                                        />
                                    </div>
                                    <div className={`verification-failed body-regular ${isInvalid || validationError ? 'active' : ''}`}>
                                        {isInvalid ? `Oops, looks like it's not valid code! Please check again.` : 'Please enter the code'} 
                                    </div>
                                    <Button
                                        className="submit-otp-btn default-blue-btn btn-small"
                                        type="primary"
                                        htmlType="submit"
                                        loading={otpSubmitting}
                                    >
                                        Submit
                                    </Button>
                                </Form>
                            </div>
                            <div className="resend-container body-regular">
                                Haven't received the code? 
                                <span className="resend-block"><Countdown key={counterTime} date={counterTime} renderer={renderer} /></span>
                            </div>
                        </div>
                        :
                        <div className="set-password-block">
                            <h1 className="h1-heading">Set New Password</h1>
                            <Form onSubmit={submitPassword} className="create-password-form">
                                <div className="form-block">
                                    <Form.Item>
                                        <FloatLabel label="Password" customClass={state.passLabel ? 'pass-label' : undefined}>
                                            {getFieldDecorator('password', {
                                                rules: [
                                                    { required: true, message: 'Password cannot be empty!' },
                                                    { min: 6, message: 'Password must be at least 6 characters.' }
                                                ],
                                            })(
                                                <Input.Password 
                                                    placeholder="Enter password" 
                                                    onChange={(e) => {
                                                    (e.target.value).length > 0 ? setState(prev => ({...prev, passLabel: true})) : setState(prev => ({...prev, passLabel: false}))
                                                }}
                                                />
                                            )}
                                        </FloatLabel>
                                    </Form.Item>
                                </div>
                                <Button
                                    className="create-password-form-btn default-pink-btn filled-pink"
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}
                                >
                                    Set Password
                                </Button>
                            </Form>
                        </div>
            }
            <style jsx>
                {`
                .login-page-container .login-block-container {
                    width: unset !important;
                    padding: 3rem !important;
                }

                .mail-sent-block > .body-regular {
                    margin-bottom: 1rem;
                }

                .mail-sent-block .mail-holder {
                    font-weight: 500;
                    margin-left: 8px;
                }

                .mail-sent-block .resend-email-container,
                .mail-sent-block .go-back-action {
                    font-size: 16px;
                }

                .mail-sent-block .go-back-action {
                    margin-top: 8px;
                }

                .resend-email-container .resend-email-btn {
                    margin-left: 8px;
                    color: var(--purple);
                }

                .reset-form .ant-input:hover,
                .reset-form .ant-input:focus,
                .reset-form .ant-input-password:hover input {
                    border-color: var(--primary);
                }

                .resend-email-container .resend-email-btn {
                    margin-left: 8px;
                    color: var(--primary);
                    text-decoration: underline;
                }

                .mail-sent-block .change-mail-btn,
                .change-number-btn {
                    width: max-content;
                    margin-left: 8px;
                    color: var(--primary);
                    text-decoration: underline;
                }

                .reset-form .reset-form-btn {
                    padding: 0 2rem;
                }

                .reset-form .form-content {
                    margin-bottom: 2rem;
                }

                .form-content .inputs-container {
                    position: relative;
                    height: 50px;
                }

                .form-content .inputs-container .ant-form-item {
                    margin-bottom: 0;
                }

                .set-password-block > h1 {
                    margin-bottom: 1rem !important;
                }

                .set-password-block input {
                    height: 50px;
                }

                .set-password-block input:hover,
                .set-password-block .ant-input:hover,
                .set-password-block .ant-input-affix-wrapper:hover .ant-input:not(.ant-input-disabled) {
                    border-color: var(--primary);
                }

                .set-password-block .has-error .ant-form-explain, .has-error .ant-form-split {
                    font-weight: 500 !important;
                }

                .set-password-block input:focus {
                    border-color: var(--primary);
                    box-shadow: none;
                }

                .inputs-container .form-block {
                    position: absolute;
                    width: 100%;
                    opacity: 0;
                    visibility: hidden;
                    transform: scale(0.9);
                    transition: all 0.2s ease;
                }

                .inputs-container .form-block.active {
                    opacity: 1;
                    visibility: visible;
                    transform: scale(1);
                }

                .reset-form .input-switch {
                    color: var(--dove);
                    margin-top: 1rem;
                    font-size: 16px;
                    font-weight: 300;
                    width: max-content;
                }

                .reset-form .input-switch .type-in {
                    color: var(--primary);
                    font-weight: 400;
                }

                .reset-form .input-switch:hover .type-in {
                    text-decoration: underline;
                }

                .form-block.mobile-group .ant-select-selection--single {
                    height: 50px;
                    border-radius: 4px 0 0 4px;
                    border-right: none;
                }

                .mobile-input-label {
                    line-height: 40px;
                }

                .reset-form .ant-select-selection {
                    border: none;
                }

                .reset-form .ant-select-disabled .ant-select-selection {
                    background: var(--charcoal) !important;
                    cursor: not-allowed;
                }

                .reset-form .ant-select-selection:hover {
                    border-color: var(--primary);
                }

                .reset-form .ant-select-selection:focus {
                    border-color: var(--primary);
                    box-shadow: none;
                }

                .form-block.mobile-group input {
                    border-radius: 0 4px 4px 0;
                }

                .form-block.mobile-group .ant-row.ant-form-item:nth-child(2) {
                    width: 100%;
                }

                .otp-inputs-container .otp-input {
                    margin: 0 var(--peaky-gap-16) 0 0;
                }
    
                .otp-inputs-container .otp-input input {
                    width: 50px !important;
                    height: 50px;
                    text-align: center;
                    border-radius: var(--peaky-br-2);
                    color: var(--dove);
                    font-size: 18px;
                    font-family: "Open Sans", sans-serif;
                    font-weight: 500;
                    border: var(--peaky-border-none);
                    transition: all 0.3s;
                    background-color: #383838;
                }
    
                .otp-inputs-container .otp-input input:hover,
                .otp-inputs-container .otp-input input:focus {
                    border-color: var(--primary);
                    border-radius: 4px;
                    border-width: 2px;
                    box-shadow: 0 10px 10px 0 rgba(0,0,0,0.1);
                    outline: none;
                }
    
                .otp-inputs-container .otp-input input::placeholder {
                    color: var(--dove);
                    opacity: 0.54;
                }

                .otp-form .ant-form-item {
                    margin-bottom: 0;
                }

                .form-block.mobile-group .ant-select {
                    width: 50px !important;
                }

                .form-block.mobile-group .ant-select-selection__rendered {
                    line-height: 50px !important;
                    margin-right: 0;
                }

                .form-block.mobile-group .ant-select-arrow {
                    display: none !important;
                }

                .otp-form .verification-failed {
                    color: var(--organred);
                    margin-top: 8px;
                    margin-bottom: 1rem;
                    opacity: 0;
                    visibility: hidden;
                    height: 0;
                    transition: all 0.2s;
                }
    
                .otp-form .verification-failed.active {
                    opacity: 1;
                    visibility: visible;
                    height: 24px;
                }
    
                .mobile-verification-container .otp-form {
                    margin-top: 1.5rem;
                }

                .mobile-verification-container .resend-container {
                    margin-top: 1rem;
                }
    
                .otp-form .submit-otp-btn {
                    padding: 0 3rem;
                    margin: 0 auto;
                }

                span.resend-otp-btn,
                span.resend-otp-timer {
                    color: var(--primary);
                    margin-left: 8px;
                    transition: all 0.4s;
                }
    
                span.resend-otp-btn:hover {
                    text-decoration: underline;
                }
    
                span.resend-otp-timer {
                    opacity: 0.8;
                }

                .reset-form .form-block {
                    width: 331px;
                }

                .reset-form .form-block {
                    width: 300px;
                }

                .reset-form .form-block input,
                .reset-form .ant-select-selection--single {
                    height: 50px;
                    font-weight: 300;
                    color: var(--dove);
                    background-color: #383838;
                    border-radius: var(--peaky-br-2);
                }

                .reset-form .form-block input:focus {
                    background-color: #383838 !important;
                }

                .reset-form .form-block input::placeholder,
                .reset-form .intl-tel-input input::placeholder,
                .reset-form .ant-select-selection__placeholder {
                    color: var(--dove);
                    opacity: 0.38;
                }

                .reset-form .ant-form-item-label {
                    font-family: 'OpenSans', sans-serif;
                    font-weight: 700;
                }

                .reset-form .ant-form-item-required::before,
                .reset-form .ant-form-item-label > label::after {
                    margin: unset;
                    content: unset;
                }

                .reset-form .ant-form-item-label > label {
                    color: var(--dove);
                    opacity: 0.87;
                }

                .reset-form .ant-input {
                    border: none;
                    font-size: 16px;
                    outline: none;
                }

                .reset-form .ant-input:focus {
                    box-shadow: 0 0 0 2px var(--primary);
                    outline: none;
                }

                .reset-form input:-webkit-autofill,
                .reset-form input:-webkit-autofill:hover,
                .reset-form input:-webkit-autofill:focus,
                .reset-form input:-webkit-autofill:active {
                    -webkit-transition: "color 9999s ease-out, background-color 9999s ease-out";
                    -webkit-transition-delay: 9999s;
                }
                
                .reset-form .intl-tel-input.allow-dropdown input {
                    border: none;
                    color: var(--dove);
                    font-size: 16px;
                    width: 300px;
                }

                .reset-form .intl-tel-input.allow-dropdown input:focus {
                    border: none;
                    box-shadow: none;
                }

                .reset-form .ant-input-password-icon {
                    color: rgba(255, 255, 255, 0.87);
                    font-size: 18px;
                }

                .reset-form-action {
                    margin: var(--peaky-gap-64) 0 0;
                }

                .reset-form-action .reset-form-btn.custom-width {
                    width: 300px;
                }

                @media only screen and (max-device-width: 760px) {
                    .login-page-container .login-block-container {
                        padding: 2rem !important;
                    }

                    .otp-inputs-container .otp-input input {
                        width: 50px !important;
                        height: 50px;
                    }

                    .mobile-verification-container .resend-container {
                        display: flex;
                        flex-direction: column;
                    }

                    .otp-form .verification-failed.active {
                        height: 48px;
                    }
                }

                `}
            </style>
        </>
    );
}

const ResetBlock = Form.create<any>({name: ""})(ResetForm);
export default ResetBlock;