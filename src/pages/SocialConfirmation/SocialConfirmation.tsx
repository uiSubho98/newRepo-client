import React, { FormEvent, useEffect, useState } from "react";
// @ts-ignore
import { Helmet } from 'react-helmet';
import Layout from "../../components/Layout";
import { Button, Checkbox, Form } from 'antd';
import { FormComponentProps } from "antd/lib/form/Form";
import { G_API_URL, G_URL } from "../../constants/constants";
import { check_login, login_user } from "../../utils/login.util";
// @ts-ignore
import { useHistory, useLocation } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { onboardRedirect, openNotification } from "../../utils/common.util";
import { encrypt } from '../../utils/encryption.util';
import { __getCookie } from "../../utils/cookie.util";
import { handlePaymentRedirect } from "../../utils/payment.util";


interface IInfo {
    provider?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    img?: string,
    id?: string
}

interface SCProps extends FormComponentProps {
    isWorkshop?: boolean;
    info?: IInfo;
    setMode?: Function;
}

interface ISCForm {
    email: string;
    consent: boolean;
}

const SocialConfirmationForm = (props: SCProps) => {
    const { isWorkshop, setMode, info } = props;
    const {getFieldDecorator} = props.form;
    const history = useHistory();
    const location = useLocation();
    const [isLoading, setLoading] = useState<boolean>(false);

    if(isWorkshop && info) {
        location.state = info;
    }
    // Redirect user if already logged in
    useEffect(()=>{
        if(check_login()) {
            history.push("/login");
        }
        if(location.state === undefined) {
            if(!isWorkshop) {
                window.location.href = G_URL + 'signup';
            } else if(setMode){
                setMode(1);
            }
        }
    },[history, location.state]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.form.validateFields((err: null | object, values: ISCForm) => {
            if (!err) {
                // Set Button Loading
                setLoading(true);

                // Encrypt user details and get Hex and Salt values
                const emailEncrypted = encrypt(location.state.email);
                const regSrc = localStorage.getItem('regSrc');

                const config = {
                    headers: {
                        "Content-Type": "application/json"
                    }
                };

                const data = {
                    emailEncrypted: emailEncrypted,
                    user_type: 1,
                    provider: location.state.provider.toLowerCase(),
                    firstName: location.state.firstName,
                    lastName: location.state.lastName,
                    profilePic: location.state.img,
                    id: location.state.id,
                    regSrc: regSrc ? regSrc : "Organic",
                    consent: values.consent,
                    utmParams: {
                        utm_source: __getCookie('utm_source').cookieExists ? __getCookie('utm_source').cookieValue : '',
                        utm_medium: __getCookie('utm_medium').cookieExists ? __getCookie('utm_medium').cookieValue : '',
                        utm_campaign: __getCookie('utm_campaign').cookieExists ? __getCookie('utm_campaign').cookieValue : '',
                        utm_term: __getCookie('utm_term').cookieExists ? __getCookie('utm_term').cookieValue : '',
                        utm_content: __getCookie('utm_content').cookieExists ? __getCookie('utm_content').cookieValue : ''
                    }
                }

                axios
                    .post(G_API_URL + "auth/signup-sc/", data, config)
                    .then((response: AxiosResponse) => {
                        if (response.data.status === 1) {
                            // Set Loading False
                            setLoading(false);
                            login_user({token:response.data.data});
                            if(!isWorkshop) {
                                // Check for payment redirect and md register form redirect
                                if(!handlePaymentRedirect(history) && !onboardRedirect(history)) {
                                    history.push({
                                        pathname: "/"
                                    });
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

    return (
        <>
            <Layout redirectDisable={true} authPage={true}>
                <Helmet>
                    <title>ProGrad | Social Confirmation</title>
                </Helmet>
                <div className="sc-wrapper g-d g-h-c g-v-c lr-pad-d lr-pad-m">
                    <div className="sc-container f-d f-vt f-v-c">
                        <h2 className="text-xxl font-heading title">Almost done!</h2>
                        <div className="text-medium desc text-c-d text-faded-2">You are about to create an account on <span>ProGrad</span> using login from <span>{location.state && location.state.provider ? location.state.provider : ""}</span> with the following email: </div>
                        <div className="text-medium email"><b>{location.state && location.state.email ? location.state.email : ""}</b></div>
                        <Form onSubmit={handleSubmit} className="sc-form">
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
                        <div className="tnc-block text-small text-faded text-c-d">
                        By creating an account you agree to our <u className="c-pointer" onClick={()=>{window.open(G_URL+'terms-and-conditions')}}>terms and conditions</u> and any data submitted will be subject to our <u className="c-pointer" onClick={()=>{window.open(G_URL+'privacy-policy')}}>privacy policy</u>.
                        </div>
                        <div className="login-block text-small">Already have an account?  <u className="c-pointer" onClick={() => { isWorkshop ? setMode && setMode(0) : history.push("/login");}}>Log In</u></div>
                    </div>
                </div>
            </Layout>

            <style jsx>
                {`
                    .sc-wrapper {
                        height: ${isWorkshop ? 'auto' :'calc(100vh - 80px)'};
                    }
                    
                    .sc-wrapper .desc {
                        max-width: 440px;
                        margin-top: var(--peaky-gap-16);
                    }
                    
                    .sc-wrapper .desc > span {
                        font-weight: 700;
                        color: var(--dove);
                    }

                    .sc-wrapper .email {
                        margin-top: var(--peaky-gap-32);
                    }

                    .sc-wrapper .consent-block {
                        margin-top: var(--peaky-gap-64);
                    }

                    .sc-wrapper .sc-form,
                    .sc-wrapper .tnc-block {
                        max-width: 300px;
                    }

                    .sc-wrapper .sc-form .ant-form-item-control {
                        line-height: 1 !important ;
                    }

                    .sc-wrapper .sc-form .consent-block .ant-form-item {
                        margin-top: var(--peaky-gap-8);
                    }

                    .sc-wrapper .sc-form .consent-block > div:last-of-type {
                        margin-left: var(--peaky-gap-16);
                    }

                    .sc-wrapper .sc-form .create-btn {
                        margin-top: var(--peaky-gap-32);
                        width: 100%;
                        height: 50px !important;
                    }

                    .sc-wrapper .tnc-block {
                        margin-top: var(--peaky-gap-32);
                    }
                    
                    .sc-wrapper .login-block {
                        margin-top: var(--peaky-gap-64);
                    }
                `}
            </style>
        </>
    )
}

const SocialConfirmation = Form.create<SCProps>({ name: "" })(SocialConfirmationForm);
export default SocialConfirmation;