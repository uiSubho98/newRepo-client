import React, { useEffect, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { FormComponentProps } from "antd/lib/form/Form";
import axios from "axios";
import queryString from "query-string";
import { G_API_URL } from '../../constants/constants';
import { encrypt } from '../../utils/encryption.util';
import { check_login, logout_user } from '../../utils/login.util';
import { openNotification } from '../../utils/common.util';
import { useHistory } from 'react-router';

interface CreatePasswordFormProps extends FormComponentProps {
    fromPage: string;
    encryptedMail: string;
    vcode: string;
    setDefault?: Function;
}

interface CreatePasswordFormState {
    is_logged_in: boolean;
    loading: boolean;
}

interface CreatePassword{
    password: string
}

const CreatePasswordForm = (props: CreatePasswordFormProps) => {

    const history = useHistory();

    const defaultState: CreatePasswordFormState = {
        is_logged_in: check_login(),
        loading: false,
    }

    const [state, setState] = useState<CreatePasswordFormState>(defaultState);

    const { fromPage, encryptedMail, vcode, setDefault } = props;

    useEffect(() => {
        if (state.is_logged_in && fromPage !== "profile") {
            // If user already logged in, log them out
            logout_user();
        }
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        props.form.validateFields((err: Error, values: CreatePassword) => {
            if (!err) {
                // Set Loading
                setState(previousState => ({
                    ...previousState,
                    loading: true,
                }));
                // Encrypt user details and get Hex and Salt values
                const emailEncrypted = encryptedMail;
                const passEncrypted = encrypt(values['password']);

                const config = {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                };

                const data = {
                    emailEncrypted: emailEncrypted,
                    passEncrypted: passEncrypted,
                    vcode: vcode
                }

                axios
                    .post(G_API_URL + "auth/create-password/", queryString.stringify(data), config)
                    .then(response => {
                        if (response.data.status === 1) {
                            // Set Loading False
                            setState(previousState => ({
                                ...previousState,
                                loading: false,
                            }));
                            // Show Success Notification
                            openNotification('success', 'Password set successfully, please log in with new password', 2)
                            // Redirect to login
                            setTimeout(() => {
                                if(fromPage === "profile" && setDefault !== undefined) {
                                    setDefault();
                                } else {
                                    history.push({
                                        pathname: '/login'
                                    })
                                }
                            }, 1000)
                        } else {
                            setState(previousState => ({
                                ...previousState,
                                loading: false,
                            }));
                            openNotification('fail', response.data.message, 6)
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        })
    }

    const { getFieldDecorator, getFieldValue } = props.form;
    return (
        <>
            {/* <Layout> */}
                {/* <Helmet>
                    <title>ProGrad | Reset Password</title>
                </Helmet> */}
                <div className={`createpassword-page-container ${fromPage} c-height f-d f-vt f-v-c 
                tb-pad-d tb-pad-m lr-pad-d lr-pad-m`}>
                    <div className="g-d g-h-c create-password-block">
                        <h1 className="font-heading text-xxl title">
                            Set New Password
                        </h1>
                        <Form onSubmit={handleSubmit} className="create-password-form">
                            <div className="form-block">
                                <Form.Item label="New Password">
                                    {getFieldDecorator('password', {
                                        rules: [
                                            { required: true, message: 'Password cannot be empty!' },
                                            {
                                                validator(rule:any, value:any, callback:any) {
                                                    const confirmPassword = getFieldValue("confirm_password");
                                                    if(!confirmPassword && value.length < 6){
                                                        callback("Password must be at least 6 characters.");
                                                    } else if (confirmPassword && value !== confirmPassword) {
                                                        callback("The new password and confirmation password do not match!");
                                                    }
                                                    callback();
                                                }
                                            }
                                        ],
                                    })(
                                        <Input.Password
                                            placeholder="Enter your new password"
                                        />
                                    )}
                                </Form.Item>
                                <Form.Item label="Confirm Password">
                                    {getFieldDecorator('confirm_password', {
                                        rules: [
                                            { required: true, message: 'Password cannot be empty!' },
                                            {
                                                validator(rule:any, value:any, callback:any) {
                                                    const newPassword = getFieldValue("new_password");
                                                    if(!newPassword && value.length < 6){
                                                        callback("Password must be at least 6 characters.");
                                                    } else if (newPassword && value !== newPassword) {
                                                        callback("The new password and confirmation password do not match!");
                                                    }
                                                    callback();
                                                }
                                            }
                                        ]
                                    })(
                                        <Input.Password
                                            placeholder="Enter your new password"
                                        />
                                    )}
                                </Form.Item>
                            </div>
                            <Button
                                className="create-password-form-btn default-blue-btn 
                                btn-small f-d f-v-c"
                                type="primary"
                                htmlType="submit"
                                loading={state.loading}
                            >
                                Save
                            </Button>
                        </Form>
                    </div>
                </div>
            {/* </Layout> */}

            <style jsx>
                {`
                    .createpassword-page-container h1 {
                        margin-bottom: 0;
                    }

                    .create-password-form {
                        margin-top: 2rem;
                    }

                    .create-password-block .input-group {
                        grid-column-gap: 4rem;
                        margin: var(--peaky-gap-24) 0 0;
                        width: max-content;
                    }

                    .create-password-block .form-block {
                        width: 300px;
                    }

                    .create-password-block .form-block input,
                    .create-password-block .ant-select-selection--single {
                        height: 50px;
                        font-weight: 300;
                        color: var(--dove);
                        background-color: #383838;
                        border-radius: var(--peaky-br-2);
                    }

                    .create-password-block .form-block input:focus {
                        background-color: #383838 !important;
                    }

                    .create-password-block .form-block input::placeholder,
                    .create-password-block .intl-tel-input input::placeholder,
                    .create-password-block .ant-select-selection__placeholder {
                        color: var(--dove);
                        opacity: 0.38;
                    }

                    .create-password-block .ant-form-item-required::before,
                    .create-password-block .ant-form-item-label > label::after {
                        margin: unset;
                        content: unset;
                    }

                    .create-password-block .ant-form-item-label > label {
                        color: var(--dove);
                        opacity: 0.87;
                    }

                    .create-password-block .ant-input {
                        border: unset;
                        border-radius: unset;
                        font-size: 16px;
                    }

                    .create-password-block .ant-input:focus {
                        box-shadow: none;
                    }
                    
                    .create-password-block input:-webkit-autofill,
                    .create-password-block input:-webkit-autofill:hover,
                    .create-password-block input:-webkit-autofill:focus,
                    .create-password-block input:-webkit-autofill:active {
                        -webkit-transition: "color 9999s ease-out, background-color 9999s ease-out";
                        -webkit-transition-delay: 9999s;
                    }

                    .create-password-block .ant-form label {
                        color: var(--dove);
                        font-weight: 600;
                        opacity: 0.87;
                    }
                    
                    .create-password-block .intl-tel-input.allow-dropdown input {
                        border: none;
                        color: var(--dove);
                        font-size: 16px;
                        width: 300px;
                    }

                    .create-password-block .intl-tel-input.allow-dropdown input:focus {
                        border: none;
                        box-shadow: none;
                    }

                    .create-password-form .create-password-form-btn {
                        height: 50px;
                        width: 300px;
                        margin-top: 2rem;
                        outline: none;
                        border: none;
                        text-transform: uppercase;
                        background: var(--purple);
                    }

                    .create-password-block .ant-input-password-icon {
                        color: rgba(255, 255, 255, 0.87);
                        font-size: 18px;
                    }

                    .has-error .ant-input-affix-wrapper .ant-input,
                    .has-error .ant-input-affix-wrapper .ant-input:hover {
                        background-color: #383838;
                    }

                    .createpassword-page-container.profile {
                        align-items: flex-start;
                        margin: var(--peaky-gap-16) 0 0;
                        padding: 0;
                    }

                    .createpassword-page-container.profile
                    .create-password-block {
                        justify-items: start;
                    }

                    .createpassword-page-container.profile
                    .create-password-block .title {
                        font-size: 21px;
                        font-weight: 600 !important;
                    }

                    .createpassword-page-container.profile
                    .create-password-block .create-password-form {
                        margin-top: 0;
                    }
                `}
            </style>
        </>
    );
}

const CreatePassword = Form.create<CreatePasswordFormProps>({ name: "" })(CreatePasswordForm);
export default CreatePassword;