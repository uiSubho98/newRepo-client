import React, { useState } from "react";
import Countdown from "react-countdown";
import OtpInput from "react-otp-input";
import axios from "axios";
import { G_API_URL } from "../../constants/constants";
import queryString from "query-string";
import { openNotification } from "../../utils/common.util";
import { Button } from "antd";

interface IProps {
    fromPage: string;
    apiData: any;
    setMode: Function;
    setVcode: Function;
}

const Verification = (props: IProps) => {

    const {     
        apiData,
        setMode,
        setVcode,
        fromPage
    } = props;

    const [isInvalid, setInvalid] = useState(false);
    const [validationError, setValidationError] = useState(false);
    const [counterTime, setCounterTime] = useState(Date.now() + 60000);
    const [inOTP, setInOTP] = useState('');
    const [resendCount, setResendCount] = useState<number>(0);
    const [isLoading, setLoading] = useState<boolean>(false);
    // const [updatedCredential, setUpdatedCredential] = useState<any>('');
    const { email, encryptedMail } = apiData;
    // let submitButton;

    const config = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    };

    const submitOTP = (inOTP: string) => {
        const invalidInput = inOTP !== '' && inOTP.length === 6 ? false : true;
        if (invalidInput) {
            setValidationError(true);
        } else {
            const otpInput = inOTP;
            // Verify OTP API

            const data = {
                otp: otpInput,
                email: encryptedMail
            }

            setLoading(true);
                
            // Validate OTP
            axios
                .post(G_API_URL + "auth/validate-otp/", queryString.stringify(data), config)
                .then(response => {
                    setLoading(false);
                    if (response.data.status === 1) {
                        // Set Errors false
                        // Set Errors false
                        setInvalid(false);
                        setValidationError(false);
                        setVcode(otpInput);
                        setMode(2);
                        // Show Notification
                        openNotification('success', 'Email verified successfully', 2);
                    } else {
                        // Set Invalid Status
                        setInvalid(true);
                        // Show failure message
                        openNotification('fail', response.data.message, 4);
                    }
                })
                .catch(err => {
                    setLoading(false);
                    console.log(err);
                });
        }
    }

    const resendOTP = () => {
        // const {encryptedMail, resendCount, resetMode, changedNumber} = state;
        // Update resend Count
        setResendCount(resendCount + 1);
        // Data based on Reset Mode
        let apiData = {
            mode: "email",
            emailEncrypted: encryptedMail
        };

        if (resendCount < 3) {
            axios
            .post(G_API_URL + "auth/reset-password/", queryString.stringify(apiData), config)
            .then(response => {
                if (response.data.status === 1) {
                    openNotification('success', 'OTP sent successfully', 3);
                    // Set Reset Counter
                    setCounterTime(Date.now() + 60000);
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

    const onChange = (otp: string) => {
        setInOTP(otp);
        if(otp.length === 6 && fromPage !== "profile") {
            submitOTP(otp);
        }
    }

    return (
        <>
            <div className={`g-d g-h-c tb-pad-d tb-pad-m text-c-d 
            verification-block-wrapper ${fromPage}`}>
                {
                    fromPage !== "profile" &&
                    <h1 className="font-heading text-xxl heading">
                        Verify your email to proceed
                    </h1>
                }
                <span className="text-medium description">
                    {`${ fromPage !== "profile" ? "Please enter the verification code we’ve sent to" : 
                    "Enter the verification code sent to"} ${email}`}{' '}
                    <span 
                        className="change-btn c-pointer" 
                        onClick={() => setMode(0)}
                    >
                        Change
                    </span>
                </span>
                <div className="otp-form text-c-d">
                    <div className="otp-inputs-container f-d f-h-c">
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
                    <div className="resend-container text-small">
                        Haven't received the code?{" "}
                        <span className="resend-block"><Countdown key={counterTime} date={counterTime} renderer={renderer} /></span>
                    </div>
                    {
                        fromPage === "profile" &&
                        <Button
                            className="default-blue-btn btn-small submit-btn"
                            onClick={() => submitOTP(inOTP)}
                            loading={isLoading}
                        >
                            Submit
                        </Button>
                    }
                </div>
            </div>
            <style jsx>{`

                .verification-block-wrapper .description 
                .change-btn {
                    color: var(--bluelagoon);
                    text-decoration: underline;
                }

                .otp-form {
                    margin: var(--peaky-gap-48) 0 0;
                }

                .otp-inputs-container .otp-input {
                    margin: var(--peaky-gap-16);
                }
    
                .otp-inputs-container .otp-input input {
                    width: 100px !important;
                    height: 100px;
                    text-align: center;
                    border-radius: var(--peaky-br-2);
                    color: var(--dove);
                    font-size: 32px;
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
    
                // .mobile-verification-container .otp-form {
                //     margin-top: 1.5rem;
                // }

                .otp-form .resend-container {
                    font-weight: 200;
                    margin: var(--peaky-gap-48) 0 0;
                }

                .otp-form .resend-otp-btn {
                    text-decoration: underline;
                    color: var(--primary);
                }

                .otp-form .resend-otp-timer {
                    color: var(--primary);
                }

                .verification-block-wrapper.profile {
                    padding: 0;
                    justify-items: start;
                    text-align: start;
                    margin: var(--peaky-gap-16) 0 0;
                } 

                .verification-block-wrapper.profile 
                .description {
                    font-size: 16px;
                }

                .verification-block-wrapper.profile
                .otp-form {
                    text-align: start;
                }

                .verification-block-wrapper.profile
                .otp-form,
                .verification-block-wrapper.profile
                .otp-form .resend-container {
                    margin: var(--peaky-gap-24) 0 0;
                }

                .verification-block-wrapper.profile
                .otp-form .resend-container {
                    font-weight: 400;
                    font-size: 16px;
                }

                .verification-block-wrapper.profile
                .otp-inputs-container .otp-input {
                    margin: 0 var(--peaky-gap-16) 0 0;
                }

                .verification-block-wrapper.profile
                .otp-inputs-container .otp-input input {
                    height: 50px;
                    width: 50px !important;
                    font-size: 18px;
                }

                .verification-block-wrapper.profile
                .otp-form .submit-btn {
                    margin: var(--peaky-gap-16) 0 0;
                }

                @media only screen and (max-device-width: 760px) {


                    .otp-inputs-container .otp-input {
                        margin: 4px;
                    }

                    .otp-inputs-container .otp-input input {
                        font-size: 21px;
                        height: 50px;
                        width: 50px !important;
                    }

                    .verification-block-wrapper.profile
                    .otp-inputs-container .otp-input {
                        margin: 4px;
                    }
                }
            `}</style>
        </>
    )
}

export default Verification;