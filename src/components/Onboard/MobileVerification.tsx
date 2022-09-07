import React, {useState} from 'react';
import {Button, Form} from 'antd';
import Countdown from 'react-countdown';
import axios from "axios";
import queryString from "query-string";
import OtpInput from 'react-otp-input';
import {G_URL, G_API_URL} from '../../constants/constants';
import { FormComponentProps } from 'antd/lib/form/Form';
import { decrypt } from '../../utils/encryption.util';

interface IProps extends FormComponentProps {
    form: any;
    btnLoading: boolean;
    apiData: any;
    locationData: any;
    registerApi: Function;
    sendOtpApi: Function;
    handleChange: Function;
}

const OtpForm = ({
    form: {
        validateFields
    }, 
    btnLoading,
    apiData,
    locationData,
    registerApi,
    sendOtpApi,
    handleChange}: IProps) => {

    const [isInvalid, setInvalid] = useState(false);
    const [validationError, setValidationError] = useState(false);
    const [counterTime, setCounterTime] = useState(Date.now() + 60000);
    const [inOTP, setInOTP] = useState('');

    const {prefix, mobileNumber, emailEncrypted} = apiData;
    const {country_name} = locationData;

    const submitOTP = (e: any) => {
        e.preventDefault();
        validateFields((err: any, values: any) => {
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
                    mode: country_name !== 'India' ? 'email' : 'mobile'
                }

                axios
                    .post(G_API_URL + "auth/verify-otp/", queryString.stringify(data), config)
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
        })
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
            return (
                <span className="resend-otp-timer">
                    Resend in {minutes}:{seconds}
                </span>
            )
        }
    }

    return (
        <>
        <div className="mobile-verification-container">
            <div className="code-sent-info body-big">
                {`Enter the verification code sent to ${country_name !== 'India' ? `${ decrypt(emailEncrypted) }` : `+${prefix} ${mobileNumber}`}`}
                <span className="change-btn c-pointer" onClick={() => handleChange()}>Change</span>
            </div>
            <div className="otp-form">
                <Form onSubmit={(e) => submitOTP(e)}>
                    <div className="otp-inputs-container f-d">
                        <OtpInput
                            containerStyle="otp-inputs-container"
                            className="otp-input"
                            value={inOTP}
                            placeholder="123456"
                            onChange={(otp: any) => setInOTP(otp)}
                            numInputs={6}
                            shouldAutoFocus
                            isInputNum
                        />
                    </div>
                    <div className={`verification-failed body-regular ${isInvalid || validationError ? 'active' : ''}`}>
                        {isInvalid ? `Oops, looks like it's not valid code! Please check again.` : 'Please enter the code'} 
                    </div>
                    <div className="resend-container body-regular">
                        Haven't received the code? 
                        <span className="resend-block"><Countdown key={counterTime} date={counterTime} renderer={renderer} /></span>
                    </div>
                    <Button
                        className="create-account-btn default-purple-btn filled-purple"
                        type="primary"
                        htmlType="submit"
                        loading={btnLoading}
                    >
                        Create Account
                    </Button>
                </Form>
            </div>
            <div className="term-privacy-container body-regular">
                By creating an account you agree to the 
                <a
                    href={G_URL+"terms-and-conditions/"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="terms"
                >
                    terms of use
                </a>
                and
                <a
                    href={G_URL+"privacy-policy/"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="privacy"
                >
                    privacy policy
                </a>
            </div>
        </div>

        <style jsx>
            {`
            .code-sent-info .change-btn {
                color: var(--purple);
                text-decoration: underline;
                margin-left: 8px;
            }

            .otp-inputs-container .ant-form-item {
                margin-bottom: 0;
            }

            .otp-inputs-container .otp-input input {
                width: 64px !important;
                height: 64px;
                text-align: center;
                border-radius: 0;
                color: var(--carbon);
                font-size: 16px;
                font-family: "Open Sans", sans-serif;
                font-weight: 500;
                border: var(--peaky-border);
                transition: all 0.3s;
            }

            .otp-inputs-container .otp-input:first-child input {
                border-radius: 4px 0 0 4px;
            }

            .otp-inputs-container .otp-input:last-child input {
                border-radius: 0 4px 4px 0;
            }

            .otp-inputs-container .otp-input input:hover,
            .otp-inputs-container .otp-input input:focus {
                border-color: var(--purple);
                border-radius: 4px;
                box-shadow: 0 10px 10px 0 rgba(0,0,0,0.1);
                outline: none;
            }

            .otp-inputs-container .otp-input input::placeholder {
                color: rgba(0,0,0,0.3);
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

            .mobile-verification-container .otp-form {
                margin-top: 1.5rem;
            }

            .otp-form .create-account-btn {
                padding: 0 2rem;
            }

            .term-privacy-container {
                margin-top: 1rem;
            }

            .term-privacy-container a {
                margin-left: 5px;
                margin-right: 5px;
                color: var(--carbon);
                text-decoration: underline;
            }

            .otp-form .resend-container {
                margin-bottom: 2rem;
            }

            span.resend-otp-btn,
            span.resend-otp-timer {
                color: var(--purple);
                margin-left: 8px;
                transition: all 0.4s;
            }

            span.resend-otp-btn:hover {
                text-decoration: underline;
            }

            span.resend-otp-timer {
                opacity: 0.8;
            }

            @media only screen and (max-device-width: 760px) {
                .otp-inputs-container .otp-input input {
                    width: 50px !important;
                    height: 50px;
                }

                .otp-form .verification-failed.active {
                    height: 48px;
                }
            }
            `}
        </style>
        </>
    );
}

const MobileVerification = Form.create<IProps>()(OtpForm);
export default MobileVerification;
