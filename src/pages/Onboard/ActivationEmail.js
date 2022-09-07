import React, {Component} from 'react';
import Layout from '../../components/Layout';
import {Form, Input, Button} from 'antd';
import FloatLabel from '../../components/Form/FloatLabel';
import email_sent_icon from '../../assets/imgs/email_sent_icon.jpg';
import axios from "axios";
import keys from '../../config/keys';
import queryString from "query-string";
import jwtDecode from 'jwt-decode';
import {G_HOME_URL, G_API_URL} from "../../constants/constants";
import { check_login } from '../../utils/login.util';
import { __getCookie } from '../../utils/cookie.util';
import {encrypt} from '../../utils/encryption.util';
import {getSearchParam, openNotification} from '../../utils/common.util';

class ChangeMailForm extends Component {
    constructor() {
        super();
        const is_logged_in = check_login();
        this.state = {
            is_logged_in: is_logged_in,
            loading: false,
            resendCount: 1,
            decodedToken: '',
            changedEmail: '',
            showChangeEmail: false
        }
    }

    componentDidMount() {
        if (this.state.is_logged_in) {
            let decodedToken = jwtDecode(__getCookie(keys.cookiePrefix + "ut").cookieValue);
            this.setState({ decodedToken });
            // Check if account is verified if yes redirect
            if (decodedToken.emailVerified) {
                window.location.href = G_HOME_URL + 'learning-dashboard';
            }
        } else {
            window.location.href = G_HOME_URL + 'login';
        }
    }

    sendEmail = (mode) => {
        const {decodedToken, changedEmail} = this.state;
        const userEmail = changedEmail !== '' ? changedEmail : decodedToken.email;
        const rurl = getSearchParam('rurl');

        // Encrypt user details and get Hex and Salt values
        const emailEncrypted = encrypt(userEmail);
        const emailEncryptedOld = encrypt(decodedToken.email);

        if (userEmail !== undefined && userEmail.length > 0 && this.state.resendCount < 3) {
            let data = {
                emailEncryptedOld: mode === 'change' ? emailEncryptedOld : undefined,
                emailEncrypted: emailEncrypted,
                rurl: rurl,
            }
            axios
            .post(G_API_URL + "auth/resend-mail/", queryString.stringify(data))
            .then(response => {
                if (response.data.status === 1) {
                    this.setState({ resendCount: this.state.resendCount + 1 });

                    if (mode === 'change') {
                        // Hide Change Email Form
                        this.setState({
                            showChangeEmail: false,
                            loading: false
                        });
                        // Reset Form
                        this.props.form.resetFields();
                    }
                    openNotification('success', 'Mail sent successfully', 2);
                } else if (response.data.status === 3) {
                    openNotification('fail', 'Account exists with this email!', 4);
                    this.setState({
                        loading: false,
                        changedEmail: ''
                    });
                } else {
                    openNotification('fail', 'Resend failed, please try again', 4);
                    this.setState({loading: false});
                }
            })
            .catch(err => {
                console.log(err);
            });
        } else {
            openNotification('fail', 'Resend limit reached, please wait for some time and try again', 4);
            this.setState({
                loading: false
            });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (!this.state.helpEmailSent) {
                    this.setState({
                        loading: true,
                        changedEmail: values['email']
                    });

                    setTimeout(() => {
                        this.sendEmail('change');
                    }, 300);
                }
            }
        });
    }

    render() {
        const {decodedToken, changedEmail, showChangeEmail} = this.state;
        const { getFieldDecorator } = this.props.form;
        return (
            <>
                <Layout
                    redirectDisable={true}
                    navAction={'Account'}
                >
                    <div className="activation-page f-d f-vt f-v-c f-h-c lr-pad-d lr-pad-m tb-pad-m">
                        <div 
                            className="email-sent-icon bg-image-full"
                            style={{backgroundImage: 'url(' + email_sent_icon + ')'}}
                        >
                        </div>
                        <h1 className="h1-heading text-c-m">Activate your account to continue</h1>
                        <div className="body-regular">
                            We’ve sent an activation link to you on
                            <span className="mail-holder">{changedEmail !== '' ? changedEmail : decodedToken.email}</span>
                        </div>
                        <div className="resend-email-container">
                            Haven’t got the mail?
                            <span className="resend-email-btn c-pointer" onClick={() => this.sendEmail()}>Resend</span>
                        </div>
                        <div className={`change-mail c-pointer ${showChangeEmail ? 'hide' : ''}`} onClick={() => this.setState({showChangeEmail: true})}>Change email</div>
                        <div className={`form-container ${showChangeEmail ? 'active' : ''}`}>
                            <Form onSubmit={this.handleSubmit} className="help-form">
                                <Form.Item>
                                    <FloatLabel label="Email">
                                        {getFieldDecorator('email', {
                                            rules: [{ required: true, message: 'Email cannot be empty!' }],
                                        })(
                                            <Input type="email" placeholder="Enter new Email" />
                                        )}
                                    </FloatLabel>
                                </Form.Item>
                                <Button
                                    className="change-email-btn default-pink-btn filled-pink"
                                    type="primary"
                                    htmlType="submit"
                                    loading={this.state.loading}
                                >
                                    Send Activation Link
                                </Button>
                            </Form>
                        </div>
                    </div>
                </Layout>
                <style jsx={'true'}>
                    {`
                    .navbar-container {
                        height: 64px;
                        box-shadow: 0px 5px 11px 0px rgba(50, 50, 50, 0.08);
                    }

                    .activation-page {
                        height: calc(100vh - 64px);
                    }
                    
                    .activation-page .mail-holder {
                        font-weight: 500;
                        margin-left: 8px;
                    }

                    .activation-page .body-regular {
                        width: 700px;
                        text-align: center;
                    }
                    
                    .activation-page .resend-email-container,
                    .activation-page .change-mail {
                        margin-top: 2rem;
                        font-size: 16px;
                        font-weight: 300;
                    }

                    .activation-page .change-mail {
                        text-decoration: underline;
                        transition: all 0.4s;
                    }

                    .activation-page .change-mail:hover {
                        color: var(--purple);
                    }

                    .resend-email-container .resend-email-btn {
                        margin-left: 8px;
                        color: var(--purple);
                    }

                    .activation-page .email-sent-icon {
                        width: 150px;
                        height: 150px;
                    }

                    .form-container {
                        width: 300px;
                        margin-top: 3rem;
                        opacity: 0;
                        visibility: hidden;
                        height: 0;
                        transform: translateY(18px);
                        transition: all 0.4s;
                    }

                    .form-container.active {
                        opacity: 1;
                        height: auto;
                        visibility: visible;
                        transform: translateY(0);
                    }

                    .form-container .change-email-btn {
                        width: 100%;
                    }

                    .form-container .ant-input:hover,
                    .form-container .ant-input:focus {
                        border-color: var(--pink);
                        box-shadow: none;
                    }

                    @media only screen and (max-device-width: 760px) {
                        .activation-page {
                            height: unset;
                        }

                        .activation-page .body-regular {
                            width: unset;
                        }

                        .form-container {
                            width: 100%;
                        }
                    }
                    `}
                </style>
            </>
        );
    }
}

const ActivationPage = Form.create()(ChangeMailForm);
export default ActivationPage;
