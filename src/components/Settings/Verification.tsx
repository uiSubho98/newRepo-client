import { Button, Form } from "antd";
import axios from "axios";
import React, { useState } from "react";
import Countdown from "react-countdown";
import OtpInput from "react-otp-input";
import queryString from "query-string";
import { G_API_URL } from "../../constants/constants";
import { login_user } from "../../utils/login.util";
import { FormComponentProps } from "antd/lib/form";
import { encrypt } from "../../utils/encryption.util";
import { openNotification } from "../../utils/common.util";

interface IProps extends FormComponentProps{
    emailOld: string;
    updatedValue: any;
    activeMode: number;
    decodedToken: any;
    sendOtp: Function;
    onVerification: Function;
}

const VerificationForm = (props: IProps) => {

    const { updatedValue, activeMode, emailOld, sendOtp, onVerification, decodedToken } = props;

    const { validateFields } = props.form;
    const [isLoading, setLoading] = useState<boolean>(false);
    const [isInvalid, setInvalid] = useState(false);
    const [validationError, setValidationError] = useState(false);
    const [counterTime, setCounterTime] = useState(Date.now() + 60000);
    const [inOTP, setInOTP] = useState<string>('');

    const onChange = (otp: string) => {
        setInOTP(otp);
    }

    const resendOTP = () => {
        setCounterTime(Date.now() + 60000);
        sendOtp("", "email", "update");
    }


    const submitOTP = (e: React.FormEvent) => {
        e.preventDefault();
            validateFields((err, values) => {
                if(!err) {
                    const invalidInput = inOTP !== '' && inOTP.length === 6 ? false : true;
                    if (invalidInput) {
                        setValidationError(true);
                    } else {
                        setLoading(true);
                        const otpInput = inOTP;
                        // Verify OTP API
                        const config = {
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            }
                        };

                        let data: any = {
                            otp: otpInput,
                            subMode: 'verification'
                        }

                        if(activeMode === 0) {
                            data.email = encrypt(updatedValue);
                            data.emailOld = emailOld;
                            data.mode = "email";
                        } else {
                            data.prefix = parseInt(updatedValue.prefix);
                            data.mobileNumber = updatedValue.mobileNumber;
                            data.email = encrypt(decodedToken.email);
                            data.prefixOld = decodedToken.prefix;
                            data.mobileNumberOld = decodedToken.mobileNumber;
                            data.mode = "mobile";
                        }

                        axios.post(G_API_URL + "auth/verify-otp/", queryString.stringify(data), config)
                        .then(response => {
                            setLoading(false);
                            if (response.data.status === 1) {
                                const {token} = response.data.data;
                                // Set Errors false
                                setInvalid(false);
                                setValidationError(false);
                                // setBtnLoading(false);
                                // Show Notification
                                if(activeMode === 0) {
                                    openNotification('success', 'Email updated successfully', 2);
                                } else {
                                    openNotification('success', 'Mobile Number updated successfully', 2);
                                }
                                // Update token
                                login_user({token});
                                onVerification(token);
                                // Hide change email block
                                // setEmailChangeBlock(false);
                            } else {
                                setInvalid(true);
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                    }
                }
        });
    }

    const renderer = ({minutes, seconds, completed}: any) => {
        if (completed) {
            return (
                <span className="resend-otp-btn c-pointer" onClick={() => resendOTP()}>
                    Resend
                </span>
            )
        } else {
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            return (
                <span className="resend-otp-timer">
                    Resend in {minutes}:{seconds}
                </span>
            )
        }
    };

    return (
        <>
            <div className="verification-block-wrapper">
                <span className="text-regular info">
                    We’ve sent a verification code to the above email. 
                    Enter it here to verify
                </span>
                <div className="otp-form">
                    <Form onSubmit={(e) => submitOTP(e)}>
                        <div className="otp-inputs-container f-d">
                            <OtpInput
                                containerStyle="otp-inputs-container"
                                className="otp-input"
                                value={inOTP}
                                placeholder="000000"
                                onChange={(otp: any) => onChange(otp)}
                                numInputs={6}
                                shouldAutoFocus
                                isInputNum
                            />
                        </div>
                        <div className={`verification-failed body-regular ${isInvalid || validationError ? 'active' : 'hide'}`}>
                            {isInvalid ? `Oops, looks like it's not valid code! Please check again.` : 'Please enter the code'} 
                        </div>
                        <div className="f-d f-v-c f-vt-m action-block">
                            <Button 
                                className="default-blue-btn btn-small verify-otp-btn"
                                htmlType="submit"
                                loading={isLoading}
                            >
                                Verify
                            </Button>
                            <div className="resend-container text-small">
                                Haven't received the code?{" "}
                                <span className="resend-block"><Countdown key={counterTime} date={counterTime} renderer={renderer} /></span>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
            <style jsx>{`
                .verification-block-wrapper {
                    margin: var(--peaky-gap-32) 0 0;
                }
                
                .verification-block-wrapper .description 
                .change-btn {
                    color: var(--bluelagoon);
                    text-decoration: underline;
                }

                .otp-form .otp-inputs-container {
                    margin: var(--peaky-gap-16) 0;
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
    
                .otp-form .verification-failed {
                    color: var(--organred);
                    margin-top: 8px;
                    margin-bottom: 1rem;
                    opacity: 0;
                    height: 0;
                    transition: all 0.2s;
                }
    
                .otp-form .verification-failed.active {
                    opacity: 1;
                    height: 24px;
                }

                .otp-form .action-block {

                }

                .otp-form .resend-container {
                    font-weight: 200;
                    margin: 0 0 0 var(--peaky-gap-16);
                }

                .otp-form .resend-otp-btn {
                    text-decoration: underline;
                    color: var(--primary);
                }

                .otp-form .resend-otp-timer {
                    color: var(--primary);
                }

                @media only screen and (max-device-width: 760px) {
                    .otp-inputs-container .otp-input {
                        margin: 4px;
                    }

                    .otp-inputs-container .otp-input input {
                        font-size: 21px;
                        height: 45px;
                        width: 45px !important;
                    }

                    .otp-form .resend-container {
                        margin: var(--peaky-gap-16) 0 0;
                    }

                    .verification-block-wrapper {
                        margin: var(--peaky-gap-16) 0 0;
                    }
                }
            `}</style>
        </>
    )
}

const Verification = Form.create<IProps>()(VerificationForm);
export default Verification;