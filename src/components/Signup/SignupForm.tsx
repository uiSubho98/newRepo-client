import React, { FormEvent, useState } from "react";
// @ts-ignore
import { Button, Checkbox, Form, Input } from 'antd';
import { FormComponentProps } from "antd/lib/form/Form";
import google_logo from '../../assets/icons/svg_icons/google_colored.svg';
import github_logo from '../../assets/icons/svg_icons/github_colored.svg';
import linkedin_logo from '../../assets/icons/svg_icons/linkedin_colored.svg';
import { GH_RED_URL, G_API_URL, G_URL, LI_RED_URL } from "../../constants/constants";
import { login_user } from "../../utils/login.util";
// @ts-ignore
import { useHistory } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { getGATag, onboardRedirect, openNotification } from "../../utils/common.util";
import { encrypt } from '../../utils/encryption.util';
import { GoogleLogin } from 'react-google-login';
import ReactPixel from 'react-facebook-pixel';
import keys from '../../config/keys';
// @ts-ignore
import GitHubLogin from 'react-github-login';
// @ts-ignore
import { LinkedIn } from 'react-linkedin-login-oauth2';
// @ts-ignore
import jwtDecode from "jwt-decode";
import { __getCookie } from "../../utils/cookie.util";
import { handlePaymentRedirect } from "../../utils/payment.util";

interface SignupProps extends FormComponentProps {
    type: string;
    setMode?: Function;
    setState?: Function;
}

interface ISignupForm {
    email: string;
    password: string;
    consent: boolean;
}

const SignupForm = (props: SignupProps) => {
    const [showFields, setShowFields] = useState<boolean>(false);
    const { type, setMode, setState } = props;
    const {getFieldDecorator} = props.form;
    const history = useHistory();
    const [isLoading, setLoading] = useState<boolean>(false);
    // const [regSuccess, setRegSuccess] = useState<boolean>(false);
    // const [userEmail, setUserEmail] = useState<string>("");
    // const [timestamp, setTimestamp] = useState<number>();
    // const regSuccess = false;
    // const userEmail = "";
    // const timestamp = 0;
    const urlParams = new URLSearchParams(window.location.search);

    let isWorkshop = false;

    if (type === "workshop" || type === "replay") {
        isWorkshop = true;
    }


    const getRurl = () => {
        let rurl = urlParams.get("rurl");
        rurl = rurl !== null && rurl !== "" ? rurl : "";
        rurl = rurl.length && rurl[0] === "/" ? rurl.slice(1) : rurl;

        return rurl;
    };

    if (getRurl() === "register") {
        localStorage.setItem("onboardRedirect", "true");
    }

    const trackSignup = (data: string) => {
        // Env
        const platformEnv = process.env.REACT_APP_PLATFORM;
        if (platformEnv === "prod") {
            const decodedToken = jwtDecode(data);
            const { uid, email } = decodedToken;
            const uidMask = `-${uid}-`;
            console.log(uidMask);
            const tag = getGATag("signup_success", "subscribers", uid, 1);
            document.body.appendChild(tag);

            // Send Signup Event to Pixel
            ReactPixel.track("Signup", {
                value: email,
                content_category: "Subscribers",
                content_type: "prograd",
                user_uid: uidMask,
            });

            // Google Ads Events
            const s1 = document.createElement("script");
            s1.type = "text/javascript";
            s1.async = true;
            s1.innerHTML =
                "gtag('event', 'conversion', { 'send_to': 'AW-439710104/FR-9COninIoCEJjj1dEB','value': " +
                email +
                " });";
            document.body.appendChild(s1);
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.form.validateFields((err: null | object, values: ISignupForm) => {
            if (!err) {
                // Set Button Loading
                setLoading(true);

                // Unix Time Stamp
                const timeStamp = new Date().getTime();

                // Encrypt user details and get Hex and Salt values
                const emailEncrypted = encrypt(values["email"]);
                const emailEncryptedKey = encrypt(values["email"] + "$-" + timeStamp);
                const passEncrypted = encrypt(values["password"]);
                const regSrc = localStorage.getItem("regSrc");

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                    },
                };

                const data = {
                    emailEncrypted: emailEncrypted,
                    emailEncryptedKey: emailEncryptedKey,
                    passEncrypted: passEncrypted,
                    regSrc: regSrc !== undefined ? regSrc : "Organic",
                    rurl: getRurl(),
                    user_type: 1,
                    utmParams: {
                        utm_source: __getCookie("utm_source").cookieExists ? __getCookie("utm_source").cookieValue : "",
                        utm_medium: __getCookie("utm_medium").cookieExists ? __getCookie("utm_medium").cookieValue : "",
                        utm_campaign: __getCookie("utm_campaign").cookieExists
                            ? __getCookie("utm_campaign").cookieValue
                            : "",
                        utm_term: __getCookie("utm_term").cookieExists ? __getCookie("utm_term").cookieValue : "",
                        utm_content: __getCookie("utm_content").cookieExists
                            ? __getCookie("utm_content").cookieValue
                            : "",
                    },
                    consent: values.consent,
                };

                axios
                    .post(G_API_URL + "auth/signup/", data, config)
                    .then((response: AxiosResponse) => {
                        if (response.data.status === 1) {
                            // Set Loading False
                            setLoading(false);

                            login_user({ token: response.data.data });

                            trackSignup(response.data.data);
                            // console.log(response.data)
                            if (!isWorkshop) {
                                // Show success notification
                                openNotification("success", "You have signed up successfully", 2);
                                // Check for payment redirect and md register form redirect
                                if (!handlePaymentRedirect(history) && !onboardRedirect(history)) {
                                    setTimeout(() => {
                                        // setUserEmail(values['email']);
                                        // setTimestamp(timeStamp);
                                        // setRegSuccess(true);
                                        // localStorage.setItem('encIK', emailEncryptedKey);
                                        history.push({
                                            pathname: "/" + getRurl(),
                                            state: {},
                                        });
                                    }, 1000);
                                }
                            } else if (setMode) {
                                setMode(3);
                            }
                        } else {
                            setLoading(false);
                            openNotification("fail", response.data.message, 0);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        });
    };

    const responseGoogle = (response: any) => {
        axios
            .post(G_API_URL + "auth/social-verify/", {
                provider: "google",
                email: response.profileObj.email,
            })
            .then((resp: AxiosResponse) => {
                if (resp.data.status === 1) {
                    let state = {
                        provider: "Google",
                        firstName: response.profileObj.givenName,
                        lastName: response.profileObj.familyName,
                        email: response.profileObj.email,
                        img: response.profileObj.imageUrl,
                        id: response.profileObj.googleId,
                    };
                    // console.log(response.data)
                    if (!isWorkshop) {
                        history.push({
                            pathname: "/social-confirmation",
                            state: state,
                        });
                    } else if (setMode && setState) {
                        setState(state);
                        setMode(2);
                    }
                } else if (resp.data.status === 2) {
                    login_user(resp.data);
                    trackSignup(resp.data.token);
                    if (!isWorkshop) {
                        // Show success notification
                        openNotification("success", "You have logged in successfully", 2);
                        // Check for payment redirect and md register form redirect
                        if (!handlePaymentRedirect(history) && !onboardRedirect(history)) {
                            setTimeout(() => {
                                history.push("/" + getRurl());
                            }, 1000);
                        }
                    } else if (setMode) {
                        setMode(3);
                    }
                } else {
                    setLoading(false);
                    openNotification("fail", resp.data.message, 0);
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    const responseGithub = (response: any) => {
        let code = response.code;

        axios
            .post(G_API_URL + "auth/social-verify/", {
                code,
                provider: "github",
            })
            .then((response: AxiosResponse) => {
                if (response.data.status === 1) {
                    if (response.data.data.email === null) {
                        openNotification(
                            "fail",
                            "The email associated with the selected GitHub account is not public. Please make the email public and try again or try other login options.",
                            0
                        );
                    } else {
                        let state = {
                            provider: "Github",
                            email: response.data.data.email,
                            img: response.data.data.img,
                            id: response.data.data.id,
                            firstName: response.data.data.firstName,
                            lastName: response.data.data.lastName,
                        };
                        if (!isWorkshop) {
                            history.push({
                                pathname: "/social-confirmation",
                                state: state,
                            });
                        } else if (setMode && setState) {
                            setState(state);
                            setMode(2);
                        }
                    }
                } else if (response.data.status === 2) {
                    login_user(response.data);
                    trackSignup(response.data.token);
                    if (!isWorkshop) {
                        // Show success notification
                        openNotification("success", "You have logged in successfully", 2);
                        // Check for payment redirect and md register form redirect
                        if (!handlePaymentRedirect(history) && !onboardRedirect(history)) {
                            setTimeout(() => {
                                history.push("/" + getRurl());
                            }, 1000);
                        }
                    } else if (setMode) {
                        setMode(3);
                    }
                } else {
                    setLoading(false);
                    openNotification("fail", response.data.message, 0);
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    const responseLinkedin = (response: any) => {
        let code = response.code;

        axios
            .post(G_API_URL + "auth/social-verify/", {
                code,
                provider: "linkedin",
                redirectUri: LI_RED_URL,
            })
            .then((response: AxiosResponse) => {
                if (response.data.status === 1) {
                    let state = {
                        provider: "LinkedIn",
                        email: response.data.data.email,
                        img: response.data.data.img,
                        id: response.data.data.id,
                        firstName: response.data.data.firstName,
                        lastName: response.data.data.lastName,
                    };
                    if (!isWorkshop) {
                        history.push({
                            pathname: "/social-confirmation",
                            state: state,
                        });
                    } else if (setMode && setState) {
                        setState(state);
                        setMode(2);
                    }
                } else if (response.data.status === 2) {
                    login_user(response.data);
                    trackSignup(response.data.token);
                    if (!isWorkshop) {
                        // Show success notification
                        openNotification("success", "You have logegd in successfully", 2);
                        // Check for payment redirect and md register form redirect
                        if (!handlePaymentRedirect(history) && !onboardRedirect(history)) {
                            setTimeout(() => {
                                history.push("/" + getRurl());
                            }, 1000);
                        }
                    } else if (setMode) {
                        setMode(3);
                    }
                } else {
                    setLoading(false);
                    openNotification("fail", response.data.message, 0);
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    const login = () => {
        if(!isWorkshop) {
            const rurl = getRurl();
            history.push("/login" + (rurl ? "?rurl=/" + rurl : ""));
        }else if(setMode) {
            setMode(0);
        }
    }

    return (
        <>
            <div className="signup-container f-d f-vt f-v-c">
                <h2 className={`${!isWorkshop ? "text-xxl": "text-large"}
                font-heading title text-c-m`}>
                    { !isWorkshop? "Create an account" :
                        type === "replay" ?
                        "Sign up to watch replay" :
                        "Create an account to continue" }
                </h2>
                <div className="signup-form-wrapper">
                    <GoogleLogin
                        clientId={keys.googleClientId}
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={({error})=>{console.log("Google auth error ", error)}}
                        cookiePolicy={'single_host_origin'}
                        render={renderProps => (
                            <div className="google-btn f-d f-v-c c-pointer" onClick={renderProps.onClick}>
                                <div className="signin-logo-wrapper f-d f-v-c f-h-c">
                                    <img className="signin-logo" src={google_logo} alt="Google" />
                                </div>
                                <span className="social-signup-text text-small text-carbon">Sign Up with Google</span>
                            </div>
                        )}
                    />
                    <GitHubLogin
                        clientId={process.env.REACT_APP_PLATFORM === 'dev' ? keys.githubClientId.dev : keys.githubClientId.prod}
                        onSuccess={responseGithub}
                        redirectUri={GH_RED_URL}
                        scope="user:email"
                        onFailure={(error: any)=>{console.log("Github auth error ", error)}}
                        className="github-btn-wrapper"
                    >
                        <div className="github-btn f-d f-v-c c-pointer" >
                            <div className="signin-logo-wrapper f-d f-v-c f-h-c">
                                <img className="signin-logo" src={github_logo} alt="Github" />
                            </div>
                            <span className="social-signup-text text-small text-carbon">Sign Up with Github</span>
                        </div>
                    </GitHubLogin>
                    <LinkedIn
                        clientId={keys.linkedInClientID}
                        onFailure={responseLinkedin}
                        onSuccess={responseLinkedin}
                        redirectUri={LI_RED_URL}
                        className="w-100"
                        scope="r_emailaddress,r_liteprofile"
                    >
                        <div className="linkedin-btn f-d f-v-c c-pointer">
                            <div className="signin-logo-wrapper f-d f-v-c f-h-c">
                                <img className="signin-logo" src={linkedin_logo} alt="LinkedIn" />
                            </div>
                            <span className="social-signup-text text-small">Sign Up with LinkediIn</span>
                        </div>
                    </LinkedIn>
                    <div className="text-faded text-small or-text">OR</div>
                    {
                        showFields ?
                        <Form onSubmit={handleSubmit} className="signup-form">
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
                            <div className="f-d consent-block">
                                <Form.Item>
                                    {getFieldDecorator('consent', {
                                        valuePropName: 'checked',
                                        initialValue: true,
                                    })(<Checkbox></Checkbox>)}
                                </Form.Item>
                                <div className="text-faded-2 text-small">It's okay to send me program updates, newsletters, exclusive discounts & offers via email/SMS.</div>
                            </div>
                            <Button type="primary" htmlType="submit" className="default-blue-btn create-btn" disabled={isLoading}>
                                Create Account
                            </Button>
                        </Form>
                        :
                        <div className="use-email-btn c-pointer" onClick={() => {setShowFields(true)}}><u>Use Email</u></div>
                    }
                    <div className="tnc-block text-small text-faded">By creating an account you agree to our <u className="c-pointer" onClick={()=>{window.open(G_URL+'terms-and-conditions')}}>terms and conditions</u> and any data submitted will be subject to our <u className="c-pointer" onClick={()=>{window.open(G_URL+'privacy-policy')}}>privacy policy</u>.</div>
                    <div className="login-block text-small">Already have an account?  <u className="c-pointer" onClick={()=> login()}>Log In</u></div>
                </div>
            </div>

            <style jsx>
                {`

                    .signup-container .signup-form-wrapper {
                        width: 300px;
                    }

                    .signup-container .title {
                        margin-bottom: var(--peaky-gap-32);
                    }

                    .signup-container .signup-form-wrapper .google-btn,
                    .signup-container .signup-form-wrapper .github-btn-wrapper,
                    .signup-container .signup-form-wrapper .linkedin-btn {
                        margin-bottom: var(--peaky-gap-16);
                    }

                    .signup-container .signup-form-wrapper .github-btn-wrapper {
                        width: 100%;
                        border: none;
                    }

                    .signup-container .signup-form-wrapper .google-btn,
                    .signup-container .signup-form-wrapper .github-btn {
                        background-color: var(--dove);
                    }

                    .signup-container .signup-form-wrapper .linkedin-btn {
                        background-color: #0077B5;
                    }

                    .signup-container .signup-form-wrapper .use-email-btn {
                        color: var(--dove);
                    }

                    .signup-container .signup-form-wrapper .signin-logo-wrapper {
                        height: 50px;
                        width: 50px;
                    }

                    .signup-container .signup-form-wrapper .social-signup-text {
                        font-weight: 700;
                        margin-left: var(--peaky-gap-32);
                    }

                    .signup-container .signup-form-wrapper .or-text {
                        margin-top: var(--peaky-gap-32);
                        margin-bottom: var(--peaky-gap-32);
                    }
                    
                    .signup-container .signup-form-wrapper .form-input {
                        margin-bottom: var(--peaky-gap-32);
                    }

                    .signup-container .signup-form-wrapper .input-label {
                        font-weight: 700;
                        margin-bottom: var(--peaky-gap-8);
                    }

                    .signup-container .signup-form-wrapper .form-input .ant-input {
                        color: var(--dove);
                        background-color: #383838;
                        padding: 14px 16px;
                        font-size: 16px;
                        border: none;
                        border-radius: 2px;
                        height: auto;
                        outline: none;
                    }
                    
                    .signup-container .signup-form-wrapper .form-input .ant-input:focus {
                        box-shadow: 0 0 0 2px var(--primary);
                        outline: none;
                    }

                    .signup-container .signup-form-wrapper .ant-input-password-icon {
                        color: rgba(255, 255, 255, 0.87);
                    }

                    .signup-container .signup-form-wrapper .ant-input-password-icon:hover {
                        color: var(--dove);
                    }


                    .signup-container .signup-form-wrapper .ant-form-item-control {
                        line-height: 1 !important ;
                    }

                    .signup-container .signup-form-wrapper .consent-block {
                        margin-bottom: var(--peaky-gap-32);
                    }

                    .signup-container .signup-form-wrapper .consent-block .ant-form-item {
                        margin-top: var(--peaky-gap-8);
                    }

                    .signup-container .signup-form-wrapper .consent-block > div:last-of-type {
                        margin-left: var(--peaky-gap-16);
                    }

                    .signup-container .signup-form .label {
                        font-weight: 700;
                    }

                    .signup-container .signup-form .default-blue-btn {
                        width: 100%;
                        height: 50px !important;
                    }

                    .signup-container .signup-form-wrapper .tnc-block {
                        margin: var(--peaky-gap-32) 0 var(--peaky-gap-64);
                    }

                    @media only screen and (max-device-width: 760px) {
                        .signup-container .signup-form-wrapper {
                            width: 100%;
                        }

                        .signup-container .title {
                            line-height: 2.623rem;
                        }   
                        
                        .signup-container .google-btn .social-signup-text,
                        .signup-container .github-btn-wrapper .social-signup-text {
                            color: var(--carbon);
                        }

                        .signup-container .login-block {
                            margin-bottom: var(--peaky-gap-32);
                        }
                    }
                `}
            </style>
        </>
    )
}

const Signup = Form.create<SignupProps>({ name: "" })(SignupForm);
export default Signup;