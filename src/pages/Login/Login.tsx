import React, { useState, useEffect } from "react";
// @ts-ignore
import { Helmet } from 'react-helmet';
import Layout from "../../components/Layout";
import { check_login, login_user } from "../../utils/login.util";
import { Button, Form, Input } from 'antd';
import { FormComponentProps } from "antd/lib/form/Form";
import { G_URL, G_API_URL } from "../../constants/constants";
import { getSearchParam, openNotification } from '../../utils/common.util';
// @ts-ignore
import jwtDecode from 'jwt-decode';
import axios, { AxiosResponse } from "axios";
import queryString from "query-string";
import { encrypt, decrypt } from '../../utils/encryption.util';
import FloatLabel from '../../components/Form/FloatLabel';
import ResetBlock from '../../components/Authentication/ResetBlock';
// @ts-ignore
// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
// import keys from '../../config/keys';
import loginBg from '../../assets/imgs/login/login-bg.png';
import { __getSubscriptions } from "../../utils/user-details.util";
import { __setCookie } from "../../utils/cookie.util";
import keys from "../../config/keys";

interface LoginProps extends FormComponentProps {
    // form: string
}

type LoginState = {
    is_logged_in: boolean,
    loading: boolean,
    blockMode: blockModes
}

type blockModes = "login" | "reset"

interface ILoginForm {
    email: string
    password: string
}

const LoginForm = (props: LoginProps) => {
    const defaultState: LoginState = {
        is_logged_in: check_login(),
        loading: false,
        blockMode: 'login'
    }

    const [state, setState] = useState<LoginState>(defaultState);

    let searchQuery = window.location.search;
    let urlParams = new URLSearchParams(searchQuery);

    const getRurl = (): string => {
        let rurl = urlParams.get('rurl');
        rurl = rurl !== null && rurl !== "" ? rurl : "";
        rurl = (rurl.length && rurl[0] === '/') ? rurl.slice(1) : rurl;
        return rurl;
    }

    useEffect(() => {
        let redUrl = getRurl();
        let type = urlParams.get("type");
        let subscriptions = __getSubscriptions();
        let isRedirectable = false;
        if(type !== "free workshop") {
            isRedirectable = true;
        } else if(type === "free workshop" && !(subscriptions && 
        !subscriptions.microdegree)) {
            isRedirectable = true;
        }

        // Check if user is already logged in, redirect to rurl
        if (state.is_logged_in && isRedirectable) {
            redUrl = redUrl !== undefined && redUrl !== "" ? G_URL + redUrl : G_URL;
            window.location.href = decodeURIComponent(redUrl);
        }

        // Get url params to verify user email
        const email_vcode = getSearchParam('vcode');
        const user_email = getSearchParam('email');

        // Make call Email verification API
        if (email_vcode !== undefined && user_email !== undefined && email_vcode !== null && user_email !== null) {
            const data = {
                email: user_email,
                vcode: email_vcode
            }
            axios
                .post(G_API_URL + "auth/verify-account", queryString.stringify(data))
                .then(response => {
                    if (response.data.status === 1) {
                        setState({ ...state, loading: false });
                        openNotification('success', 'Email verified successfully', 2);
                    } else {
                        openNotification('fail', response.data.message, 6);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }

        // Auto Login if encIK exists in url
        let encUrlIK = getSearchParam('encIK');
        let encLocIK = localStorage.getItem('encIK');
        if (encUrlIK !== undefined && encUrlIK !== null && encUrlIK !== '' &&
            encLocIK !== undefined && encLocIK !== null && encLocIK !== ''
        ) {
            encUrlIK = encUrlIK.replace(/\s/g, '+');
            // From URL
            const decUrlIK = decrypt(encUrlIK);
            // From Local
            const decLocIK = decrypt(encLocIK);

            if (decUrlIK === decLocIK) {
                const data = {
                    encIK: encLocIK
                }
                axios.post(G_API_URL + "auth/token", queryString.stringify(data))
                    .then(res => {
                        if (res.data.status === 1) {
                            const { lastActive } = res.data.data;
                            // Remove encIK from store
                            localStorage.removeItem('encIK');
                            // Set First Login status based on lastActive
                            if (lastActive === 1) {
                                localStorage.setItem('first-log', "true");
                            }
                            // Login user
                            login_user(res.data.data);

                            // Show login message
                            openNotification('success', 'Logged in successfully', 2);

                            // Check if its payment RURL
                            // let rurlCheck = redUrl.split('/')[0];
                            // if (rurlCheck === 'payment') {
                            //     setTimeout(() => {
                            //         window.location.href = decodeURIComponent(G_URL + `${redUrl !== '' ? redUrl : 'learning-dashboard'}`);
                            //     }, 500);
                            // } else {
                                // const searchQuery = localStorage.getItem('utmQuery');
                                setTimeout(() => {
                                    window.location.href = decodeURIComponent(G_URL + redUrl);
                                }, 500);
                            // }
                        } else {
                            openNotification('error', res.data.message, 6);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        props.form.validateFields((err: null | object, values: ILoginForm) => {
            if (!err) {
                // Set Button Loading
                setState({ ...state, loading: true });

                // Get url params to set redirection
                let rurl = getRurl();

                // Encrypt user details and get Hex and Salt values
                const emailEncrypted = encrypt(values['email']);
                const passEncrypted = encrypt(values['password']);

                const config = {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                };

                const data = {
                    emailEncrypted: emailEncrypted,
                    passEncrypted: passEncrypted,
                    rurl: rurl
                }

                axios
                    .post(G_API_URL + "auth/login/", queryString.stringify(data), config)
                    .then(response => {
                        if (response.data.status === 1) {
                            // Set Loading False
                            setState({ ...state, loading: false });
                            postLogin(response);

                        } else {
                            setState({ ...state, loading: false });
                            openNotification('fail', response.data.message, 0);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        })
    }

    const postLogin = (response: AxiosResponse) => {
        const { lastActive,token, verified } = response.data.data;
        const decodedToken = jwtDecode(token);
        let slug = '';
        login_user(response.data.data);
        // Show Success Notification
        openNotification('success', 'Logged in successfully, please wait while we redirect you!', 2);

        // Set First Login status based on lastActive
        if (lastActive === 1) {
            localStorage.setItem('first-log', "true");
        }
        // Redirect based on rurl
        let redUrl = getRurl();
        if(verified) {

        // Check if user has subscribed for either bootcamp or microdegree.
        // Suppose if user has subscribed for both bootcamp and microdegree
        // then redirect user to microdegree dashboard.
        if(decodedToken?.subscriptions &&
            decodedToken.subscriptions.microdegree) {
                slug = 'learning-dashboard/microdegree';
        } else if(decodedToken?.subscriptions && 
            decodedToken.subscriptions.bootcamp) {
                slug = 'learning-dashboard/bootcamp';
        }

        if(verified !== undefined) {
            __setCookie(keys.cookiePrefix + "verified", verified.toString(), 1, "month");
        }
        // Check if its payment RURL
        // let rurlCheck = redUrl.split('/')[0];

        // if (rurlCheck !== 'payment' && !slotSelected) {
        //     const searchQuery = localStorage.getItem('utmQuery');
        //     setTimeout(() => {
        //         window.location.href = decodeURIComponent(G_URL + `booking${searchQuery !== null ? searchQuery : ''}`);
        //     }, 500);
        // } else {
            setTimeout(() => {
                window.location.href = decodeURIComponent(G_URL + `${redUrl !== '' ? redUrl !== '/' ? redUrl : slug : slug}`);
            }, 1000);
        // }
        } else {
            setTimeout(() => {
                window.location.href = G_URL + `activation/mobile?rurl=${redUrl}`;
            }, 500);
        }
    }

    const handleBlockChange = (mode: blockModes) => {
        setState({
            ...state,
            blockMode: mode
        })
    }

    // const openLinkedInLogin = () => {
    //     const state = getRandomString(10);
    //     localStorage.linkedInReactState = state;
    //     const redirectUri = encodeURIComponent(LI_RED_URL);
    //     const base = "http://www.linkedin.com/oauth/v2/authorization?response_type=code&";
    //     const fullScope = `&scope=${encodeURIComponent(["r_liteprofile", "r_emailaddress"].join(" "))}`;
    //     // Redirect user to login
    //     window.location.href = `${base}client_id=${keys.linkedInClientID}&redirect_uri=${redirectUri}&state=${state}${fullScope}`;
    // }


    const {getFieldDecorator} = props.form;
    const {blockMode} = state;

    return (
        <>
            <Layout footer={true}>
                <Helmet>
                    <title>ProGrad | Login</title>
                </Helmet>
                <div className="lr-pad-d c-height lr-pad-m tb-pad-d tb-pad-m">
                    <div className="login-container f-d f-vt-r-m f-h-sb w-100">
                        <div className="login-form">
                            {
                                blockMode === 'login' &&
                                <>
                                    <h1>Login</h1>
                                    {/* <h3>Login if you already have an account!</h3> */}
                                    <Form onSubmit={handleSubmit} className="login-form">
                                        <div className="form-block">
                                            <Form.Item>
                                                <FloatLabel label="Email Address">
                                                    {getFieldDecorator('email', {
                                                        rules: [{ required: true, message: 'Email cannot be empty!' }],
                                                    })(
                                                        <Input type="email" placeholder="Enter Email" />
                                                    )}
                                                </FloatLabel>
                                            </Form.Item>
                                        </div>
                                        <div className="form-block">
                                            <Form.Item>
                                                <FloatLabel label="Password">
                                                    {getFieldDecorator('password', {
                                                        rules: [
                                                            { required: true, message: 'Password cannot be empty!' }
                                                        ]
                                                    })(
                                                        <Input type="password" placeholder="Enter password" />
                                                    )}
                                                </FloatLabel>
                                            </Form.Item>
                                        </div>
                                        <div className="login-extra-options f-d">
                                            <div className="forgot-pwd c-pointer"
                                                onClick={() => handleBlockChange('reset')}>
                                                Forgot Password?
                                            </div>
                                        </div>
                                        <Button
                                            className="login-form-btn default-purple-btn filled-purple"
                                            type="primary"
                                            htmlType="submit"
                                            loading={state.loading}
                                        >
                                            Log in
                                        </Button>
                                    </Form>
                                    {/* <div className="social-login-options f-d f-h-sb w-100">
                                        <span>Or login with</span>
                                        <span className="text-primary c-pointer">
                                            <FacebookLogin
                                                appId={keys.facebookClientId}
                                                callback={responseFacebook}
                                                autoLoad={false}
                                                fields="name,email"
                                                render={(renderProps:any) => (
                                                    <div onClick={() => {renderProps.onClick()}}>Facebook</div>
                                                )}
                                            />
                                        </span>
                                        <span className="text-primary c-pointer"
                                            onClick={()=>{openLinkedInLogin()}}>LinkedIn</span>
                                    </div> */}
                                </>
                            }
                            {
                                blockMode === 'reset' &&
                                // @ts-ignore
                                <ResetBlock changeBlock={() => handleBlockChange('login')}/>
                            }
                        </div>
                        <div className="login-img">
                            <img src={loginBg} alt="Login Page"/>
                        </div>
                    </div>
                </div>            
            </Layout>

            <style jsx>
                {`
                .login-container .login-extra-options {
                    margin-bottom: 24px;
                }
                .login-container .login-form {
                    width: 400px;    
                }
                .login-container .login-form .ant-input:hover,
                .login-container .login-form .ant-input:focus,
                .login-container .login-form .ant-input-password:hover input {
                    border-color: var(--purple);
                }
                .login-container .forgot-pwd {
                    margin-left: auto;
                }
                .login-container .login-form-btn {
                    padding-left: 40px;
                    padding-right: 40px;
                }
                .login-container .social-login-options {
                    margin-top: 24px;
                }

                @media only screen and (max-device-width: 760px) {
                    .c-height {
                        height: unset;
                    }

                    .login-container .login-form {
                        width: 100%;
                    }

                    .login-container .login-img {
                        display: grid;
                        justify-content: center;
                    }

                    .login-container .login-img img {
                        height: unset;
                        width: 100%;
                        margin: 0 0 var(--peaky-gap-24);
                    }
                }

                @media screen and (min-width: 768px) and (max-width: 1023px) 
                and (orientation: portrait) {
                    .login-container {
                        flex-direction: column-reverse;
                        align-items: center;
                    }

                    .login-container .login-form {
                        margin: var(--peaky-gap-48) 0 0;
                    }
                }
                `}
            </style>
        </>
    )
}

const Login = Form.create<LoginProps>({ name: "" })(LoginForm);
export default Login;