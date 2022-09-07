import React, { useEffect, useState } from 'react';
import { check_login, login_user } from "../../utils/login.util";
import { Button, Form, Input } from 'antd';
import { FormComponentProps } from "antd/lib/form/Form";
import { G_API_URL, G_URL, LI_RED_URL } from "../../constants/constants";
import { openNotification, onboardRedirect } from '../../utils/common.util';
import axios, { AxiosResponse } from "axios";
import queryString from "query-string";
import { decrypt, encrypt } from '../../utils/encryption.util';
import keys from "../../config/keys";
// @ts-ignore
import jwtDecode from "jwt-decode";
// @ts-ignore
import { useHistory } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';
// @ts-ignore
import GitHubLogin from 'react-github-login';
// @ts-ignore
import { LinkedIn } from 'react-linkedin-login-oauth2';
import google_logo from '../../assets/icons/svg_icons/google_colored.svg';
import github_logo from '../../assets/icons/svg_icons/github_colored.svg';
import linkedin_logo from '../../assets/icons/svg_icons/linkedin_colored.svg';
import { handlePaymentRedirect } from "../../utils/payment.util";


interface LoginProps extends FormComponentProps {
    type: string;
    setMode?: Function;
    setState?: Function;
}

interface ILoginForm {
    email: string;
    password: string;
}

interface ISubscriptions {
    microdegree?: boolean;
    mdRegTime?: number;
    bootcamp?: boolean;
    bcRegTime?: number;
}

const LoginForm = (props: LoginProps) => {
    const { type, form, setMode, setState } = props;
    const {getFieldDecorator} = form;
    const history = useHistory();
    const [isLoading, setLoading] = useState<boolean>(false);
    const isLoggedIn = check_login();
    const [are3rdPCookiesAllowed, set3rdPCookies] = useState<boolean>(true);

    const getSearchParam = (param: string) => {
        const urlParams = new URLSearchParams(window.location.search);
        let paramValue = urlParams.get(param);
        return paramValue;
    }

    let isWorkshop = false;

    if (type === "workshop" || type === "replay") {
        isWorkshop = true;
    }

    // Redirect user if already logged in
    useEffect(()=>{
            // Get url params to verify user email
            const email_vcode = getSearchParam('vcode');
            const user_email = getSearchParam('email');
            const rurl = getSearchParam('rurl');

            // Make call Email verification API
            if (email_vcode !== undefined && user_email !== undefined && email_vcode !== null && user_email !== null) {

                const data = {
                    email: user_email,
                    vcode: email_vcode
                }

                axios
                .post(G_API_URL + "auth/verify-account/", queryString.stringify(data))
                .then(response => {
                    if (response.data.status === 1) {
                        setLoading(false);
                        openNotification('success', 'Email verified successfully', 2);
                        // Logout user if he is logged in
                        if (isLoggedIn) {
                            setTimeout(() => {
                                history.push("/");
                            }, 500);
                        }
                        // Run auto login
                        const encKey = getSearchParam('encIK');
                        if (encKey !== undefined && encKey !== null) {
                            setTimeout(() => {
                                autoLogin();
                            }, 300);
                        }
                    } else {
                        openNotification('fail', response.data.message, 6);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            } else if(isLoggedIn) {
                history.push("/");
            }

            const autoLogin = () => {
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
                                const {lastActive} = res.data.data;
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
        
                                // Redirect based on rurl
                                let redUrl = rurl ? rurl : '';

                                setTimeout(() => {
                                    window.location.href = decodeURIComponent(G_URL + redUrl);
                                }, 500);
        
                                // if (accountVerified) {
                                //     // Check if its payment RURL
                                //     let rurlCheck = redUrl.split('/')[0];
                                //     if (rurlCheck === 'payment') {
                                //         setTimeout(() => {
                                //             window.location.href = decodeURIComponent(G_URL + `${redUrl !== '' ? redUrl : 'learning-dashboard'}`);
                                //         }, 500);
                                //     } else {
                                //         // const searchQuery = localStorage.getItem('utmQuery');
                                //         const searchQuery = __getCookie(keys.cookiePrefix + "utm").cookieValue;
                                //         setTimeout(() => {
                                //             window.location.href = decodeURIComponent(G_URL + `${slotSelected ? redUrl !== '' ? redUrl : 'learning-dashboard' : `booking${searchQuery !== null ? searchQuery : ''}`}`);
                                //         }, 500);
                                //     }
                                // } else {
                                //     window.location.href = G_URL + `activation/mobile?rurl=${redUrl}`;
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
            }  
    }, []);     // eslint-disable-line react-hooks/exhaustive-deps

    
    let searchQuery = window.location.search;
    let urlParams = new URLSearchParams(searchQuery);

    const getRurl = (): string => {
        let rurl = urlParams.get('rurl');
        rurl = rurl !== null && rurl !== "" ? rurl : "";
        rurl = (rurl.length && rurl[0] === '/') ? rurl.slice(1) : rurl;
        return rurl;
    }

    if(getRurl() === 'register') {
        localStorage.setItem('onboardRedirect', 'true');
    }

    const getLearningDashboardUrl = (subscriptions?: ISubscriptions) => {

        if(subscriptions && subscriptions.microdegree) {
            return "/learning-dashboard/microdegree";
        } else if(subscriptions && subscriptions.bootcamp) {
            return "/learning-dashboard/bootcamp";
        }
        return "";
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        props.form.validateFields((err: null | object, values: ILoginForm) => {
            if (!err) {
                // Set Button Loading
                setLoading(true);

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
                    .then((response: AxiosResponse) => {
                        if (response.data.status === 1) {
                            const decodedToken = jwtDecode(response.data.data.token);
                            const learningDashboardUrl = getLearningDashboardUrl(decodedToken.subscriptions);
                            // Set Loading False
                            setLoading(false);
                            login_user(response.data.data);
                            if(!isWorkshop) {
                                openNotification('success', response.data.message, 2);
                                // Check for payment redirect and md register form redirect
                                if(!handlePaymentRedirect(history) && !onboardRedirect(history)) {
                                    history.push(rurl ? rurl : learningDashboardUrl ? learningDashboardUrl : '/');
                                }
                            } else if(setMode) {
                                setMode(3);
                            }
                        } else {
                            setLoading(false);
                            openNotification('fail', response.data.message, 4);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        })
    }
    
    const handleSocialLogin = (inpData:{provider: string, email: string, id: string, firstName?: string, lastName?: string, img?: string}) => {
        setLoading(true);

        const data = {
            provider: inpData.provider, 
            emailEncrypted: encrypt(inpData.email), 
            id: inpData.id,
            firstName: inpData.firstName,
            lastName: inpData.lastName,
            profilePic: inpData.img
        }
        
        axios
            .post(G_API_URL + "auth/logic-sc/", queryString.stringify(data))
            .then((response: AxiosResponse) => {
                if (response.data.status === 1) {
                    const decodedToken = jwtDecode(response.data.data.token);
                    const learningDashboardUrl = getLearningDashboardUrl(decodedToken.subscriptions);
                    // Set Loading False
                    setLoading(false);
                    login_user(response.data.data);

                    if(!isWorkshop) {
                        // Check for payment redirect and md register form redirect
                        if(!handlePaymentRedirect(history) && !onboardRedirect(history)) {
                            history.push({
                                pathname: learningDashboardUrl ? learningDashboardUrl : "/" + getRurl()
                            });
                        }
                    } else if(setMode) {
                        setMode(3);
                    }
                } else if(response.data.status === 2) { // User's new account needs to be created 
                    let state = {
                        provider: 'Google',
                        firstName: inpData.firstName,
                        lastName: inpData.lastName,
                        email: inpData.email,
                        img: inpData.img,
                        id: inpData.id
                    }
                    if(inpData.provider === 'google') {
                        if(!isWorkshop) {
                            history.push({
                                pathname: "/social-confirmation"+window.location.search,
                                state: state
                            });
                        } else if(setMode && setState) {
                            setState(state);
                            setMode(2);
                        }
                    } else if (inpData.provider === 'github') {
                        let state = {
                            provider: 'Github',
                            firstName: inpData.firstName,
                            lastName: inpData.lastName,
                            email: inpData.email,
                            img: inpData.img,
                            id: inpData.id
                        }
                        if(!isWorkshop) {
                            history.push({
                                pathname: "/social-confirmation"+window.location.search,
                                state: state
                            });
                        } else if(setMode && setState) {
                            setState(state);
                            setMode(2);
                        }
                    } else if (inpData.provider === 'linkedin') {
                        let state = {
                            provider: 'LinkedIn',
                            firstName: inpData.firstName,
                            lastName: inpData.lastName,
                            email: inpData.email,
                            img: inpData.img,
                            id: inpData.id
                        }
                        if(!isWorkshop) {
                            history.push({
                                pathname: "/social-confirmation"+window.location.search,
                                state: state
                            });
                        } else if(setMode && setState) {
                            setState(state);
                            setMode(2);
                        }
                    }
                } else {
                    setLoading(false);
                    openNotification('fail', response.data.message, 4);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    const responseGoogle = (response: any) => {
        handleSocialLogin({
            provider: 'google',
            email: response.profileObj.email, 
            id: response.profileObj.googleId, 
            firstName: response.profileObj.givenName, 
            lastName: response.profileObj.familyName, 
            img: response.profileObj.imageUrl
        });
    }

    const responseGithub = (response: any) => {
        let code = response.code;

        axios
            .post(G_API_URL + "auth/social-verify/", {
                code,
                provider: 'github'
            })
            .then((response: AxiosResponse) => {
                if (response.data.status === 1) {
                    if(response.data.data.email === null) {
                        openNotification('fail', 'The email associated with the selected GitHub account is not public. Please make the email public and try again or try other login options.', 0);
                    } else {
                        handleSocialLogin({
                            provider: 'github', 
                            email: response.data.data.email, 
                            id: response.data.data.id, 
                            firstName: response.data.data.firstName, 
                            lastName: response.data.data.lastName, 
                            img: response.data.data.img
                        });
                    }
                } else if (response.data.status === 2) {
                    const decodedToken = jwtDecode(response.data.token);
                    const learningDashboardUrl = getLearningDashboardUrl(decodedToken.subscriptions);
                    // Set Loading False
                    setLoading(false);
                    login_user(response.data);
                    history.push({
                        pathname: learningDashboardUrl ? learningDashboardUrl : "/" + getRurl()
                    });
                } else {
                    setLoading(false);
                    openNotification('fail', response.data.message, 4);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    const responseLinkedin = (response: any) => {
        let code = response.code;

        axios
            .post(G_API_URL + "auth/linkedin/", {
                code,
                provider: 'linkedin',
                redirectUri: LI_RED_URL
            })
            .then((response: AxiosResponse) => {
                if (response.data.status === 1) {
                    handleSocialLogin({
                        provider: 'linkedin', 
                        email: response.data.data.email, 
                        id: response.data.data.id, 
                        firstName: response.data.data.firstName, 
                        lastName: response.data.data.lastName, 
                        img: response.data.data.img
                    });
                } else {
                    setLoading(false);
                    openNotification('fail', response.data.message, 0);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    const handleClick = () => {
        history.push({
            pathname: '/forgot-password'
        });
    }

    const signup = () => {
        if(!isWorkshop) {
            const rurl = getRurl();
            history.push("/signup" + (rurl ? "?rurl=/" + rurl : ""));
        } else if(setMode) {
            setMode(1);
        }
    }

    return (
        <>
            <div className="login-container f-d f-vt f-v-c">
                <h2 className={`${!isWorkshop ? "text-xxl" : "text-large"} 
                font-heading title`}>
                    {
                        !isWorkshop ? "Welcome back!" : 
                        type === "replay" ?
                        "Log in to watch replay" :
                        "Log in to continue"
                    }
                </h2>
                <div className="login-block f-d f-h-sb w-100 f-vt-m f-v-c-m">
                    <div className="social-auth">
                        <GoogleLogin
                            clientId={keys.googleClientId}
                            buttonText="Login"
                            onSuccess={responseGoogle}
                            onFailure={({error}) => {
                                if(error === "idpiframe_initialization_failed") set3rdPCookies(false);
                                console.log("Google auth error ", error)}
                            }
                            cookiePolicy={'single_host_origin'}
                            render={renderProps => (
                                <div 
                                    className="google-btn f-d f-v-c c-pointer" 
                                    onClick={()=>{
                                        if(are3rdPCookiesAllowed) {
                                            renderProps.onClick()
                                        } else {
                                            openNotification('warn', 'Third party cookies are blocked on your browser. Kindly enable them to sign up with Google', 4);
                                        }
                                    }}
                                >
                                    <div className="login-logo-wrapper f-d f-v-c f-h-c">
                                        <img className="login-logo" src={google_logo} alt="Google" />
                                    </div>
                                    <span className="social-login-text text-small text-carbon">Log In with Google</span>
                                </div>
                            )}
                        />
                        <GitHubLogin
                            clientId={process.env.REACT_APP_PLATFORM === 'dev' ? keys.githubClientId.dev : keys.githubClientId.prod}
                            onSuccess={responseGithub}
                            redirectUri=""
                            scope="user:email"
                            onFailure={(error: any)=>{console.log("Github auth error ", error)}}
                            className="github-btn-wrapper"
                        >
                            <div className="github-btn f-d f-v-c c-pointer" >
                                <div className="login-logo-wrapper f-d f-v-c f-h-c">
                                    <img className="login-logo" src={github_logo} alt="Github" />
                                </div>
                                <span className="social-login-text text-small text-carbon">Log In with Github</span>
                            </div>
                        </GitHubLogin>
                        <LinkedIn
                            clientId={keys.linkedInClientID}
                            onFailure={responseLinkedin}
                            onSuccess={responseLinkedin}
                            redirectUri={LI_RED_URL}
                            scope="r_emailaddress,r_liteprofile"
                            className="w-100"
                        >
                            <div className="linkedin-btn f-d f-v-c c-pointer">
                                <div className="login-logo-wrapper f-d f-v-c f-h-c">
                                    <img className="login-logo" src={linkedin_logo} alt="LinkedIn" />
                                </div>
                                <span className="social-login-text text-small">Log In with LinkediIn</span>
                            </div>
                        </LinkedIn>
                    </div>
                    <div className="separator f-d f-vt f-v-c">
                        <div className="line hide-m"></div>
                        <div className="or-text text-small text-faded">OR</div>
                        <div className="line hide-m"></div>
                    </div>
                    <div className="custom-auth">
                        <Form onSubmit={handleSubmit} className="login-form">
                            <div className="email form-input">
                                <div className="text-small text-faded-2 input-label">Email</div>
                                {getFieldDecorator('email', {
                                    rules: [{ required: true, message: 'Email is required!' }],
                                })(
                                    <Input type="email" placeholder="Email" />,
                                )}
                            </div>
                            <div className="password form-input">
                                <div className="text-small text-faded-2 input-label">Password</div>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: 'Password is required!' }],
                                })(
                                    <Input.Password placeholder="Enter a Password" />,
                                )}
                            </div>
                            <Button type="primary" htmlType="submit" className="default-blue-btn create-btn" disabled={isLoading}>
                                Log In
                            </Button>
                        </Form>
                        <div className="forgot-pass text-primary text-small c-pointer" onClick={() => handleClick()}>Forgot password?</div>
                    </div>
                </div>
                <div className="signup-block text-small">New to ProGrad? <u className="c-pointer" onClick={()=> signup()}>Sign Up</u></div>
            </div>
            <style jsx>
                {`
                    .login-container {
                        width: 850px;
                    }

                    .login-container .title {
                        margin-bottom: var(--peaky-gap-32);
                    }

                    .login-container.workshop .title {
                        font-size: 32px;
                    }

                    .login-container .social-auth {
                        max-width: 300px;
                    }

                    .login-container .social-auth .google-btn,
                    .login-container .social-auth .github-btn-wrapper,
                    .login-container .social-auth .linkedin-btn {
                        margin-bottom: var(--peaky-gap-16);
                    }

                    .login-container .social-auth .github-btn-wrapper {
                        width: 100%;
                        border: none;
                    }

                    .login-container .social-auth .google-btn,
                    .login-container .social-auth .github-btn {
                        background-color: var(--dove);
                    }

                    .login-container .social-auth .linkedin-btn {
                        background-color: #0077B5;
                    }

                    .login-container .social-auth .login-logo-wrapper {
                        height: 50px;
                        width: 50px;
                    }

                    .login-container .social-auth .social-login-text {
                        font-weight: 700;
                        margin-left: var(--peaky-gap-32);
                    }



                    .login-container .separator .line {
                        flex: 1;
                        border: 1px solid rgba(255, 255, 255, 0.54);
                        width: 1px;
                    }

                    .login-container .separator .or-text {
                        margin-top: var(--peaky-gap-8);
                        margin-bottom: var(--peaky-gap-8);
                    }




                    .login-container .custom-auth .form-input {
                        margin-bottom: var(--peaky-gap-32);
                    }

                    .login-container .custom-auth .input-label {
                        font-weight: 700;
                        margin-bottom: var(--peaky-gap-8);
                    }

                    .login-container .custom-auth .form-input .ant-input {
                        color: var(--dove);
                        background-color: #383838;
                        padding: 14px 16px;
                        font-size: 16px;
                        border: none;
                        border-radius: 2px;
                        height: auto;
                        outline: none;
                        width: 300px;
                    }
                    
                    .login-container .custom-auth .form-input .ant-input:focus {
                        box-shadow: 0 0 0 2px var(--primary);
                        outline: none;
                    }

                    .login-container .custom-auth .ant-input-password-icon {
                        color: rgba(255, 255, 255, 0.87);
                    }

                    .login-container .custom-auth .ant-input-password-icon:hover {
                        color: var(--dove);
                    }
                    
                    .login-container .login-form .label {
                        font-weight: 700;
                    }
                    
                    .login-container .login-form .default-blue-btn {
                        width: 100%;
                        height: 50px !important;
                    }
                    
                    .login-container .custom-auth .forgot-pass {
                        margin-top: var(--peaky-gap-32);
                    }


                    .login-container .signup-block {
                        margin-top: var(--peaky-gap-64);
                    }


                    @media only screen and (max-device-width: 760px) {
                        .login-container {
                            width: 100%;
                        }

                        .login-container .social-auth .google-btn .social-login-text,
                        .login-container .social-auth .github-btn .social-login-text {
                            color: var(--carbon);
                        }

                        .login-container .separator {
                            width: 100%;
                            align-items: start;
                        }

                        .login-container .separator .or-text {
                            margin-top: var(--peaky-gap-32);
                            margin-bottom: var(--peaky-gap-32);
                        }

                        .login-container .custom-auth .form-input .ant-input {
                            width: 80vw;
                        }

                        .login-container .signup-block {
                            margin-bottom: var(--peaky-gap-32);
                        }

                        .login-container .custom-auth .forgot-pass {
                            color: var(--primary);
                        }
                    }
                `}
            </style>
        </>
    )
}

const Login = Form.create<LoginProps>({ name: "" })(LoginForm);
export default Login;