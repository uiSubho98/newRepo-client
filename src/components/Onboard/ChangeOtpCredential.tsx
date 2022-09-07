import React, { useState } from "react";
import { Button, Form, Input, Modal } from "antd";
// @ts-ignore
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';
import { FormComponentProps } from "antd/lib/form/Form";

interface ChangeOtpCredentialProps extends FormComponentProps {
    isOverseasUser: boolean;
    isModalVisible: boolean;
    changeCredential: Function;
    setModalVisible: Function;
}

interface IState {
    userNumber: any;
    numberNotEntered: boolean;
    isNumberValid: boolean;
}

const ChangeOtpCredentialForm = (props: ChangeOtpCredentialProps) => {

    const defaultState = {
        userNumber: undefined,
        numberNotEntered: false,
        isNumberValid: true
    }

    const [ state, setState ] = useState<IState>(defaultState);

    const { isOverseasUser, isModalVisible, form, changeCredential, setModalVisible } = props;
    const { getFieldDecorator, validateFields } = form;
    const { userNumber, numberNotEntered, isNumberValid } = state;

    const updateCredential = (e: any) => {
        e.preventDefault();
        validateFields((err: any, values: any) => {
            if (!err) {
                if(isOverseasUser)
                    changeCredential(values);
                else 
                    changeCredential(userNumber);
            }
        })
    }

    const renderEmail = () => {
        return (
            <div className="form-block">
                <Form.Item>
                    {getFieldDecorator('email', {
                        rules: [{ required: true, 
                            message: 'Email cannot be empty!' }],
                        initialValue: ""
                    }) ( 
                        <Input placeholder="Enter your email" autoComplete="email"/>
                    )}
                </Form.Item>
            </div>
        )
    }

    const renderMobile = () => {
        return (
            <div className={`form-block mobile-number ${numberNotEntered ? isNumberValid ? 'has-error' : 'has-error-2' : ''}`}>
                <Form.Item>
                    <IntlTelInput
                        containerClassName="intl-tel-input"
                        inputClassName="form-control"
                        preferredCountries={['in', 'us', 'ca', 'sa', 'qa', 'ae', 'om', 'kw', 'sg']}
                        defaultCountry={'in'}
                        fieldName={'mobileNumber'}
                        autoComplete="phone"
                        placeholder={"9999999999"}
                        format
                        onPhoneNumberBlur={(status: boolean, value: string, countryData: any) => {
                            // 1. Get rid of white spaces, dash, # that's formatted during entry to avoid literal string conflict
                            // 2. Get rid of first character if its zero
                            let mobileNumber = `${value}`.replace(/[\s-#()]/g, "");
                            mobileNumber = `${parseInt(mobileNumber)}`;
                            setState(prev => ({
                                ...prev,
                                userNumber: {
                                    prefix: countryData.dialCode,
                                    mobileNumber
                                },
                                numberNotEntered: false,
                                isNumberValid: true
                            }));
                        }}
                    />
                </Form.Item>
            </div>
        )
    }

    return (
        <>
            <Modal 
                className="change-otp-credential-block"
                centered
                closable={false}
                destroyOnClose={true}
                footer={null}
                visible={isModalVisible}
                onCancel={() => setModalVisible(false)}
            >
                <h2 className="text-large font-heading">
                    Change { isOverseasUser ? "Email" : "Mobile" }
                </h2>
                <Form className="change-otp-credential-form"
                onSubmit={(e) => updateCredential(e)}>
                    {
                        isOverseasUser ?
                        renderEmail() : renderMobile()
                    }
                    <Button 
                        className="update-btn text-regular c-pointer"
                        htmlType="submit"
                    >
                        Update
                    </Button>
                </Form>
            </Modal>
            <style jsx>{`

                .change-otp-credential-block 
                .ant-modal-content {
                    width: 464px;
                    padding: var(--peaky-pad-32);
                    border-radius: var(--peaky-br-4);
                    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
                    background: linear-gradient(180deg, #2E2E2E 0%, #1E1E1E 100%);
                }

                .change-otp-credential-block 
                .ant-modal-content .ant-modal-body {
                    padding: unset;
                }

                .change-otp-credential-block
                .change-otp-credential-form {
                    margin: var(--peaky-gap-24) 0 0;
                }

                .change-otp-credential-block
                .form-block input {
                    background-color: #383838;
                    border-radius: var(--peaky-br-2);
                    border: 2px solid var(--primary);
                    color: var(--dove);
                    font-weight: 300;
                    font-size: 16px;
                    height: 50px;
                    padding: 0 var(--peaky-pad-16);
                }

                .change-otp-credential-block 
                .form-block input:focus {
                    background-color: #383838 !important;
                    box-shadow: none;
                }

                .change-otp-credential-block 
                 input:-webkit-autofill,
                .change-otp-credential-block 
                 input:-webkit-autofill:hover,
                .change-otp-credential-block 
                 input:-webkit-autofill:focus,
                .change-otp-credential-block 
                 input:-webkit-autofill:active {
                    -webkit-transition: "color 9999s ease-out, background-color 9999s ease-out";
                    -webkit-transition-delay: 9999s;
                }

                .change-otp-credential-block 
                .intl-tel-input.allow-dropdown input {
                    color: var(--dove);
                    font-size: 16px;
                    width: 100%;
                }
 
                .change-otp-credential-block 
                .intl-tel-input.allow-dropdown input:focus {
                    border-color: var(--primary);
                    box-shadow: none;
                }

                .change-otp-credential-block 
                .intl-tel-input .country-list {
                    z-index: 5;
                }

                .change-otp-credential-block 
                .intl-tel-input, 
                .change-otp-credential-block 
                .intl-tel-input .country-list {
                    width: 100%;
                }

                .change-otp-credential-block 
                .intl-tel-input input {
                    height: 50px;
                    border-radius: var(--peaky-br-4);
                    border: 2px solid var(--primary);
                    background-color: #383838;
                    width: 100%;
                    font-weight: 300;
                    color: var(--carbon);
                    transition: all 0.4s;
                }

                .change-otp-credential-block 
                .intl-tel-input input:hover,
                .change-otp-credential-block 
                .intl-tel-input input:focus {
                    border-color: var(--primary);
                }

                .change-otp-credential-block 
                .intl-tel-input input:focus, 
                .change-otp-credential-block 
                .intl-tel-input .selected-flag {
                    outline: none;
                }

                .change-otp-credential-block 
                .intl-tel-input .country-list 
                .country.highlight {
                    background-color: var(--charcoal);
                }

                .change-otp-credential-block 
                .intl-tel-input .selected-flag {
                    width: 50px;
                }

                .change-otp-credential-block 
                .intl-tel-input input::placeholder {
                    font-weight: 400;
                }

                .change-otp-credential-block 
                .intl-tel-input input::placeholder,
                .change-otp-credential-block 
                .intl-tel-input .country-list .country {
                    font-family: "Open Sans", sans-serif;
                }
 
                .change-otp-credential-block 
                .intl-tel-input .country-list {
                    z-index: 5;
                    overflow-x: hidden;
                    background-color: #383838;
                    color: var(--dove);
                    border: 1px solid var(--crow);
                }

                .change-otp-credential-block 
                .intl-tel-input .flag-container .arrow  {
                    color: var(--sandstone);
                }

                .change-otp-credential-block 
                .update-btn {
                    background: linear-gradient(180deg, #0E7DED 1.47%, #1739E6 101.42%);
                    border: none;
                    border-radius: var(--peaky-br-2);
                    color: var(--dove);
                    height: 50px;
                    padding: 0 var(--peaky-pad-32);
                    margin: var(--peaky-gap-24) 0 0;
                }

                .form-block.has-error input,
                .form-block.has-error-2 input {
                    border-color: var(--organred);
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

                @media only screen and (max-device-width: 760px) {
                    .change-otp-credential-block .ant-modal-content {
                        margin: 0 auto;
                        padding: var(--peaky-pad-32) var(--peaky-pad-16);
                        width: 95%;
                    }

                    .change-otp-credential-block .update-btn {
                        margin-top: 0;
                    }

                    .intl-tel-input .country-list .country .country-name {
                        color: var(--carbon);
                        font-size: 14px;
                    }
                }
            `}</style>
        </>
    )
}

const ChangeOtpCredential = Form.create<ChangeOtpCredentialProps>({name: ""})(ChangeOtpCredentialForm);
export default ChangeOtpCredential;