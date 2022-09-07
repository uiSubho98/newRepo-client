import { Button, Form } from "antd";
import { FormComponentProps } from "antd/lib/form";
import React from "react";
import { useState } from "react";
// @ts-ignore
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';

interface IProps extends FormComponentProps {
    isDisabled: boolean;
    isLoading: boolean;
    defaultValue: string;
    sendOtp: Function;
}

const FormBlock = (props: any) => {

    const { isDisabled, sendOtp, countryCode, isLoading, defaultValue } = props;

    // const { getFieldDecorator } = props.form;

    // const [domReady, setDomReady] = useState(false);
    // // const [isLoading, setIsLoading] = useState(false);
    // const [btnLoading, setBtnLoading] = useState(false);
    // const [isInvalid, setInvalid] = useState(false);
    // const [validationError, setValidationError] = useState(false);
    // const [mobileChangeBlock, setMobileChangeBlock] = useState(false);
    // const [numberForm, setNumberForm] = useState(true);
    const [mobileChanged, setMobileChanged] = useState<any>('');
    // const [inOTP, setInOTP] = useState('');
    // const [counterTime, setCounterTime] = useState(Date.now() + 180000);
    // const [resendCount, setResendCount] = useState(1);
    const [numberNotEntered, setNumberNotEntered] = useState(false);
    const [isNumberValid, setIsNumberValid] = useState(true);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        props.form.validateFields((err: Error, values: any) => {
            if (!err) {
                sendOtp(mobileChanged, "mobile", "update")
            }
        });
    }

    return (
        <>
            <Form onSubmit={(e) => handleSubmit(e)} className="change-mobile-form f-d f-vt-m">
                <div className={`form-block mobile-number ${numberNotEntered ? 'has-error' : isNumberValid ? '' : 'has-error-2'}`}>
                    <Form.Item>
                        <IntlTelInput
                            containerClassName="intl-tel-input"
                            inputClassName="form-control"
                            preferredCountries={['in', 'us', 'ca', 'sa', 'qa', 'ae', 'om', 'kw', 'sg']}
                            defaultCountry={countryCode}
                            defaultValue={defaultValue}
                            fieldName={'mobileNumber'}
                            autoComplete="phone"
                            placeholder={"Mobile Number*"}
                            format
                            disabled={isDisabled}
                            onPhoneNumberBlur={(status: any, value: any, countryData: any, number: any, id: any) => {
                                // 1. Get rid of white spaces, dash, # that's formatted during entry to avoid literal string conflict
                                // 2. Get rid of first character if its zero
                                let mobileNumber:any = `${value}`.replace(/[\s-#()]/g, "");
                                mobileNumber = `${parseInt(mobileNumber)}`;

                                // Set changedMobile
                                if (mobileNumber !== "" && mobileNumber !== undefined &&
                                    mobileNumber !== null && !isNaN(mobileNumber)) {
                                    setMobileChanged({
                                        prefix: countryData.dialCode,
                                        mobileNumber
                                    });
                                }

                                // Set Validation Status
                                setNumberNotEntered(false);
                                setIsNumberValid(true);
                            }}
                        />
                    </Form.Item>
                </div>
                <Button
                    className="change-mobile-btn default-blue-btn btn-small"
                    type="primary"
                    htmlType="submit"
                    loading={isLoading}
                    disabled={isDisabled}
                >
                    Update
                </Button>
            </Form>
            <style jsx>{`

                .change-mobile-form .form-block {
                    margin: 0 var(--peaky-gap-16) 0 0;
                }

                .change-mobile-form .form-block input, 
                .change-mobile-form .ant-select-selection--single {
                    background-color: #383838;
                }

                .change-mobile-form .intl-tel-input input::placeholder {
                    color: var(--dove);
                    opacity: 0.38;
                }

                .change-mobile-form .intl-tel-input.allow-dropdown input {
                    border: none;
                    color: var(--dove);
                    font-size: 16px;
                    width: 300px;
                }

                .change-mobile-form .intl-tel-input.allow-dropdown input:focus {
                    border: solid 2px var(--primary);
                    padding-left: 50px;
                    box-shadow: none;
                    transition: none;
                }

                .change-mobile-form .intl-tel-input .country-list {
                    z-index: 5;
                }

                .change-mobile-form .intl-tel-input, 
                .change-mobile-form .intl-tel-input .country-list {
                    width: inherit;
                }

                .change-mobile-form .intl-tel-input input {
                    height: 50px;
                    border-radius: var(--peaky-br-4);
                    border: 1px solid #d9d9d9;
                    width: 100%;
                    font-weight: 300;
                    color: var(--carbon);
                }

                .change-mobile-form .intl-tel-input input:focus,
                .change-mobile-form .intl-tel-input .selected-flag,
                .change-mobile-form .intl-tel-input .ant-input,
                .change-mobile-form .intl-tel-input .ant-input:focus {
                    outline: none;

                }

                .change-mobile-form .intl-tel-input .country-list 
                .country.highlight {
                    background-color: var(--charcoal);
                }

                .change-mobile-form .intl-tel-input .selected-flag {
                    width: 50px;
                }

                .change-mobile-form .intl-tel-input input::placeholder {
                    font-weight: 400;
                }

                .change-mobile-form .intl-tel-input input::placeholder,
                .change-mobile-form .intl-tel-input .country-list .country {
                    font-family: "Open Sans", sans-serif;
                }

                .change-mobile-form .intl-tel-input 
                .flag-container .arrow  {
                    color: var(--sandstone);
                }

                .form-block.has-error .intl-tel-input::after {
                    content: "Mobile Number is required!";
                }

                .form-block.has-error-2 .intl-tel-input::after {
                    content: "Please enter a valid mobile number!";
                }

                .form-block.has-error .intl-tel-input::after,
                .form-block.has-error-2 .intl-tel-input::after {
                    font-weight: 400;
                    font-family: "Open Sans", sans-serif;
                    color: var(--organred);
                    position: absolute;
                    top: 40px;
                    left: 0;
                }

                .change-mobile-form .intl-tel-input .country-list {
                    z-index: 5;
                    overflow-x: hidden;
                    background-color: #383838;
                    color: var(--dove);
                    border: 1px solid var(--crow);
                }

                .change-mobile-form 
                input:-webkit-autofill,
               .change-mobile-form 
                input:-webkit-autofill:hover,
               .change-mobile-form 
                input:-webkit-autofill:focus,
               .change-mobile-form 
                input:-webkit-autofill:active {
                   -webkit-transition: "color 9999s ease-out, background-color 9999s ease-out";
                   -webkit-transition-delay: 9999s;
               }
            `}</style>
        </>
    )
}

const ChangeEmailForm = Form.create<any>()(FormBlock);
export default ChangeEmailForm;