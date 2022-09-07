import React, {useState, useEffect} from 'react';
import Layout from '../../components/Layout';
import {Button, Form, Input} from 'antd';
import FloatLabel from '../../components/Form/FloatLabel';
import Countdown from 'react-countdown';
import OtpInput from 'react-otp-input';
import keys from '../../config/keys';
import axios from "axios";
import queryString from "query-string";
// @ts-ignore
import jwtDecode from 'jwt-decode';
import {G_HOME_URL, G_API_URL} from '../../constants/constants';
import {openNotification} from '../../utils/common.util';
import {__getCookie} from '../../utils/cookie.util';
import {check_login, logout_user} from '../../utils/login.util';
import ISDCodesDropDown from "../../components/Onboard/ISDCodeDropDown";
import { encrypt } from '../../utils/encryption.util';

const OtpForm = ({form: {getFieldDecorator, validateFields}}: any) => {

    const [isInvalid, setInvalid] = useState<any>(false);
    const [btnLoading, setBtnLoading] = useState<any>(false);
    const [validationError, setValidationError] = useState<any>(false);
    const [changeNumber, setChangeNumber] = useState<any>(false);
    const [changedNumber, setChangedNumber] = useState<any>('');
    const [counterTime, setCounterTime] = useState<any>(Date.now() + 60000);
    const [decodedToken, setDecodedToken] = useState<any>({});
    const [inOTP, setInOTP] = useState<any>('');
    const is_logged_in = check_login();

    useEffect(() => {
        if (is_logged_in) {
            const tokenData = jwtDecode(__getCookie(keys.cookiePrefix + "ut").cookieValue);
            setDecodedToken(tokenData);
            sendOtpApi(tokenData);
            // Check if account is verified if yes redirect
            if (tokenData.accountVerified) {
                window.location.href = G_HOME_URL;
            }
        } else {
            window.location.href = G_HOME_URL + 'login';
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [is_logged_in]);

    const submitOTP = (e: any) => {
        e.preventDefault();
        validateFields((err: any, values: any) => {
            const invalidInput = inOTP !== '' && inOTP.length === 6 ? false : true;
            if (invalidInput) {
                setValidationError(true);
            } else {
                setBtnLoading(true);
                const otpInput = inOTP;
                // Verify OTP API
                const config = {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                };

                // Check for changedNumber
                let data:any = {};
                if (changedNumber !== "" && changedNumber !== undefined) {
                    data = {
                        otp: otpInput,
                        prefix: changedNumber.prefix,
                        mobileNumber: changedNumber.mobileNumber,
                        prefixOld: decodedToken.prefix,
                        mobileNumberOld: decodedToken.mobileNumber,
                        email: decodedToken.email,
                        mode: 'mobile'
                    }
                } else {
                    data = {
                        otp: otpInput,
                        prefix: decodedToken.prefix,
                        mobileNumber: decodedToken.mobileNumber,
                        email: decodedToken.email,
                        mode: 'mobile'
                    }
                }

                data.email = encrypt(data.email);

                axios
                    .post(G_API_URL + "auth/verify-otp/", queryString.stringify(data), config)
                    .then(response => {
                        if (response.data.status === 1) {
                            // Set Errors false
                            setInvalid(false);
                            setValidationError(false);
                            setBtnLoading(false);
                            // Show Notification
                            openNotification('success', 'Mobile number verified successfully, please login again', 2);
                            // Logout user to avoid phone number conflict with old data
                            setTimeout(() => {
                                logout_user();
                            }, 1000)
                        } else {
                            setInvalid(true);
                            setBtnLoading(false);
                        }
                    })
                    .catch(err => {
                        setBtnLoading(false);
                        console.log(err);
                    });
            }
        })
    }

    const sendOtpApi = (sendData: any = undefined) => {
        let apiData = sendData !== undefined ? sendData : decodedToken;
        let {prefix, mobileNumber, email} = apiData;
        const config = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        };

        const data = {
            prefix,
            mobileNumber,
            email: email ? email : decodedToken.email,
            mode: 'mobile',
            subMode: 'verification'
        }

        data.email = encrypt(data.email);

        axios
            .post(G_API_URL + "auth/send-otp/", queryString.stringify(data), config)
            .then(response => {
                if (response.data.status === 1) {
                    // Remove change number form after OTP is sent
                    if (sendData !== undefined) {
                        setChangeNumber(false);
                    }
                    // Show Notification
                    openNotification('success', 'Verification code sent successfully', 2);
                } else {
                    // Show Notification
                    openNotification('fail', response.data.message, 4);
                }
            })
            .catch(err => {
                console.log(err);
            });
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

    // Country Codes
    const prefixSelector = (
        <ISDCodesDropDown getFieldDecorator={getFieldDecorator} isDisabled={'yes'} />
    );

    const updateNumber = (e: any) => {
        e.preventDefault();
        validateFields((err: any, values: any) => {
            if (!err) {
                setChangedNumber({...values});
                setChangeNumber(!changeNumber);
                sendOtpApi(values);
            }
        })
    }

    return (
        <>
        <Layout
            redirectDisable={true}
            navAction={'Account'}
        >
            <div className="activation-page f-d f-vt f-v-c f-h-c lr-pad-d lr-pad-m tb-pad-m">
                <div className="mobile-verification-container">
                    <h1 className="h1-heading text-c-m">Verify your mobile number to continue</h1>
                    <div className="code-sent-info body-big text-c-d">
                        {`Enter the verification code sent to +${changedNumber !== '' ? changedNumber.prefix + changedNumber.mobileNumber : decodedToken.prefix + decodedToken.mobileNumber}`}
                        <span className="change-btn c-pointer" onClick={() => setChangeNumber(!changeNumber)}>Change</span>
                    </div>
                    {
                        !changeNumber ?
                        <div className="otp-form text-c-d">
                            <Form onSubmit={(e) => submitOTP(e)}>
                                <div className="otp-inputs-container f-d f-h-c">
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
                                <Button
                                    className="submit-otp-btn default-pink-btn filled-pink"
                                    type="primary"
                                    htmlType="submit"
                                    loading={btnLoading}
                                >
                                    Submit
                                </Button>
                                <div className="resend-container body-regular">
                                    Haven't received the code? 
                                    <span className="resend-block"><Countdown key={counterTime} date={counterTime} renderer={renderer} /></span>
                                </div>
                            </Form>
                        </div>
                        :
                        <div className="change-number-form f-d f-h-c">
                            <Form onSubmit={(e) => updateNumber(e)}>
                                <div className="form-block mobile-group f-d f-h-c">
                                    {prefixSelector}
                                    <Form.Item>
                                        <FloatLabel label="Mobile Number" customClass={'mobile-input'}>
                                            {getFieldDecorator('mobileNumber', {
                                                getValueFromEvent: (e: any) => {
                                                    const convertedValue = Number(e.currentTarget.value);
                                                    if (!isNaN(convertedValue)) {
                                                        return convertedValue;
                                                    }
                                                },
                                                rules: [{ required: true, message: 'Mobile cannot be empty!' }],
                                            })(
                                                <Input minLength={4} maxLength={10} placeholder="Enter Parent's Number" />
                                            )}
                                        </FloatLabel>
                                    </Form.Item>
                                </div>
                                <Button
                                    className="change-number-btn default-pink-btn filled-pink w-100"
                                    type="primary"
                                    htmlType="submit"
                                    loading={false}
                                >
                                    Change
                                </Button>
                            </Form>
                        </div>
                    }
                </div>
            </div>
        </Layout>

        <style jsx>
            {`
            .navbar-container {
                height: 64px;
                box-shadow: 0px 5px 11px 0px rgba(50, 50, 50, 0.08);
            }

            .activation-page {
                height: calc(100vh - 64px);
            }

            .code-sent-info .change-btn {
                color: var(--pink);
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
                border-color: var(--pink);
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

            .otp-form .submit-otp-btn {
                padding: 0 2rem;
                width: 384px;
                margin: 0 auto;
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
                margin-top: 1rem;
            }

            span.resend-otp-btn,
            span.resend-otp-timer {
                color: var(--pink);
                margin-left: 8px;
                transition: all 0.4s;
            }

            span.resend-otp-btn:hover {
                text-decoration: underline;
            }

            span.resend-otp-timer {
                opacity: 0.8;
            }

            .form-block.mobile-group .ant-select-selection--single {
                height: 50px;
                border-radius: 4px 0 0 4px;
                border-right: none;
            }

            .form-block.mobile-group .ant-select-selection__rendered {
               line-height: 50px;
               margin-right: 0;
            }

            .form-block.mobile-group .ant-select {
                width: 50px !important;
            }

            .form-block.mobile-group .ant-select-arrow {
                display: none !important;
            }

            .form-block.mobile-group .ant-row.ant-form-item:nth-child(2) {
                width: 100%;
            }
            
            .change-number-form {
                margin-top: 2rem;
            }

            .change-number-form .mobile-input input {
                border-radius: 0 4px 4px 0;
            }

            @media only screen and (max-device-width: 760px) {
                .otp-form .verification-failed.active {
                    height: 48px;
                }

                .otp-form .submit-otp-btn {
                    width: unset;
                }

                .otp-inputs-container .otp-input input {
                    width: 50px !important;
                    height: 50px;
                }
            }
            `}
        </style>
        </>
    );
}

const ActivationMobile = Form.create()(OtpForm);
export default ActivationMobile;
