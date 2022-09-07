import React, { useState } from "react";
import Countdown from "react-countdown";
import OtpInput from "react-otp-input";
import ChangeOtpCredential from "./ChangeOtpCredential";
import axios from "axios";
import { G_API_URL } from "../../constants/constants";
import queryString from "query-string";
import { decodeToken } from "../../utils/user-details.util";

interface IProps {
    apiData: any;
    locationData: any;
    registerApi: Function;
    sendOtpApi: Function;
    handleChange: Function;
    updateOtpCredential: Function;
}

const Verification = (props: IProps) => {

    const {     
        apiData, 
        locationData, 
        registerApi, 
        sendOtpApi, 
        updateOtpCredential
    } = props;

    const [isInvalid, setInvalid] = useState(false);
    const [validationError, setValidationError] = useState(false);
    const [counterTime, setCounterTime] = useState(Date.now() + 60000);
    const [inOTP, setInOTP] = useState('');
    const [isUpdateCredentialModalVisible, setUpdateCredentialModalVisible] = useState<boolean>(false);
    // const [updatedCredential, setUpdatedCredential] = useState<any>('');
    const {prefix, mobileNumber} = apiData;
    const {country_name} = locationData;
    // let submitButton;

    const submitOTP = (inOTP: string) => {
        const email = decodeToken().email;
        const invalidInput = inOTP !== '' && inOTP.length === 6 ? false : true;
        if (invalidInput) {
            setValidationError(true);
        } else {
            const otpInput = inOTP;
            // Verify OTP API
            const config = {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            };

            const data = {
                otp: otpInput,
                prefix: prefix,
                mobileNumber: mobileNumber,
                email: apiData['emailEncrypted'],
                emailOld: apiData['email'] !== email? email : undefined,
                mode: country_name !== 'India' ? 'email' : 'mobile'
            }

            axios.post(G_API_URL + "auth/verify-otp/", queryString.stringify(data), config)
            .then(response => {
                if (response.data.status === 1) {
                    // Set Errors false
                    setInvalid(false);
                    setValidationError(false);
                    // Call Registration API function
                    registerApi();
                } else {
                    setInvalid(true);
                }
            })
            .catch(err => {
                console.log(err);
            });
        }
    }

    const resendOTP = () => {
        setCounterTime(Date.now() + 60000);
        sendOtpApi();
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

    const changeCredential = (values: any) => {
        // setUpdatedCredential(values);
        setUpdateCredentialModalVisible(!isUpdateCredentialModalVisible);
        // sendOtpApi(values);
        setCounterTime(Date.now() + 60000);
        updateOtpCredential(values);
    }

    const onChange = (otp: string) => {
        setInOTP(otp);
        if(otp.length === 6) {
            submitOTP(otp);
        }
    }

    const isOverseasUser = country_name !== 'India' || prefix !== '91';

    return (
        <>
            <div className="g-d g-h-c tb-pad-d tb-pad-m text-c-d 
            verification-block-wrapper">
                <h1 className="font-heading text-xxl heading">
                    Verify your { isOverseasUser ? "email" : "mobile" } to proceed
                </h1>
                <span className="text-medium description">
                    {`Please enter the verification code we’ve sent to 
                    ${isOverseasUser ? apiData['email'] : `+${prefix} ${mobileNumber}`}`}{' '}
                    <span 
                        className="change-btn c-pointer" 
                        onClick={() => setUpdateCredentialModalVisible(true)}
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
                </div>
            </div>
            <ChangeOtpCredential 
                isOverseasUser = {isOverseasUser}
                isModalVisible={isUpdateCredentialModalVisible}
                changeCredential={changeCredential}
                setModalVisible= {setUpdateCredentialModalVisible}
            />
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

                @media only screen and (max-device-width: 760px) {
                    .otp-inputs-container .otp-input {
                        margin: 4px;
                    }

                    .otp-inputs-container .otp-input input {
                        font-size: 21px;
                        height: 50px;
                        width: 50px !important;
                    }
                }
            `}</style>
        </>
    )
}

export default Verification;