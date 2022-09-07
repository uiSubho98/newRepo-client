import React, { useEffect, useState } from "react";
import {Button, Form} from 'antd';
// @ts-ignore
import { Helmet } from 'react-helmet';
import {FormInputPswd} from "../../components/Form/FormInput";
import { G_API_URL, G_URL } from "../../constants/constants";
import { check_login, logout_user } from "../../utils/login.util";
import { __getToken } from "../../utils/user-details.util";
import {openNotification} from '../../utils/common.util';
import {encrypt} from '../../utils/encryption.util';
import Layout from "../../components/Layout";
// @ts-ignore
import prograd_pink_logo from "../../assets/brand/FavIcon/favicon.ico";
// @ts-ignore
import jwtDecode from 'jwt-decode';
import queryString from "query-string";
import axios from "axios";
import { FormComponentProps } from "antd/lib/form/Form";

interface ChangePasswordFormProps extends FormComponentProps {

}

interface IChangePassword {
    old_password: string
    new_password: string
}

const ChangePasswordForm = (props: ChangePasswordFormProps) => {
    const is_logged_in = check_login();

    const [isLoading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if(!is_logged_in) {
            window.location.href = decodeURIComponent(G_URL + 'login/');
        }
    },[is_logged_in]);

    const {getFieldDecorator} = props.form;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        props.form.validateFields((err: null | object, values: IChangePassword) => {
            if (!err) {
                // Set Loading
                setLoading(true);
                let decodedToken = jwtDecode(__getToken());
                // Encrypt user details and get Hex and Salt values
                const emailEncrypted = encrypt(decodedToken.email);
                const oldPassEncrypted = encrypt(values['old_password']);
                const passEncrypted = encrypt(values['new_password']);

                const config = {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                };

                const data = {
                    emailEncrypted: emailEncrypted,
                    oldPassEncrypted: oldPassEncrypted,
                    passEncrypted: passEncrypted
                }

                axios
                    .post(G_API_URL + "auth/change-password/", queryString.stringify(data), config)
                    .then((response) => {
                        if (response.data.status === 1) {
                            // Set Loading False
                            setLoading(false);
                            // Show Success Notification
                            openNotification('success', 'Password changed successfully, please log in with new password', 2)
                            // Logout user
                            setTimeout(() => {
                                logout_user();
                            }, 1000)
                        } else {
                            setLoading(false);
                            openNotification('fail', response.data.message, 6)
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        })
    }

    return (
        <>
            <Layout
                navAction={'Account'}
            >
            <Helmet>
                <link 
                    rel="icon" 
                    type="image/png" 
                    href={prograd_pink_logo} 
                    sizes="16x16" 
                />
                <title>Change Password</title>
            </Helmet>
            <div className="changepassword-page-container c-height f-d f-vt f-v-c f-h-c lr-pad-d lr-pad-m">
                <div className="change-password-block">
                    <h1 className="h1-heading">Change Password</h1>
                    <Form onSubmit={(e)=> handleSubmit(e)} className="change-password-form">
                        <div className="form-block">
                            <FormInputPswd
                                message="Password cannot be empty!"
                                name="old_password"
                                label="Old Password"
                                placeholder="Enter old password"
                                value=""
                                isRequired={true}
                                getFieldDecorator={getFieldDecorator}
                            />
                        </div>
                        <div className="form-block">
                            <FormInputPswd
                                message="Password cannot be empty!"
                                name="new_password"
                                label="New Password"
                                placeholder="Enter password"
                                value=""
                                isRequired={true}
                                getFieldDecorator={getFieldDecorator}
                            />
                        </div>
                        <Button
                            className="change-password-form-btn standard-btn f-d f-v-c"
                            type="primary"
                            htmlType="submit"
                            loading={isLoading}
                        >
                            Change Password
                        </Button>
                    </Form>
                </div>
            </div>
        </Layout>

        <style jsx>
            {`
            body {
                background: #f1f1f1;
            }

            .changepassword-page-container h1 {
                font-size: 36px;
                margin-bottom: 0;
            }

            .changepassword-page-container .change-password-block {
                width: 400px;
                padding: 2rem;
                border-radius: var(--peaky-br-4);
                box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.1);
                background: var(--dove);
            }

            .change-password-form {
                margin-top: 2rem;
            }

            .change-password-form .ant-input:hover,
            .change-password-form .ant-input:focus,
            .change-password-form .ant-input-password:hover input {
                border-color: var(--pink);
                box-shadow: unset;
            }

            .change-password-form .ant-input-affix-wrapper:hover .ant-input:not(.ant-input-disabled) {
                border-color: var(--pink);
            }

            .change-password-form .ant-input-password,
            .change-password-form .ant-input-group .ant-input {
                height: 50px;
            }

            .change-password-form .change-password-form-btn {
                height: 50px;
                width: max-content;
                margin-top: 1rem;
                outline: none;
                border: none;
                background: var(--pink);
            }

            @media only screen and (max-device-width: 760px) {
                .changepassword-page-container 
                .change-password-block {
                    width: 100%;
                }
            }
            `}
        </style>
    </>
    )
}

const ChangePassword = Form.create<FormComponentProps>({name: ""})(ChangePasswordForm);
export default ChangePassword;