import React, { useState } from "react";
import { Form, Input, Button, Radio } from 'antd';
import { FormComponentProps } from "antd/lib/form/Form";
// @ts-ignore
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';
import axios from "axios";
import { G_API_URL } from "../../constants/constants";
import { openNotification } from '../../utils/common.util';

interface IState {
    userNumber: {
        prefix: string;
        mobileNumber: string;
    },
    numberNotEntered: boolean;
    isNumberValid: boolean;
    isLoading: boolean;
}

interface IProps extends FormComponentProps {
}

const DiscussionForm = (props: IProps) => {
    const { getFieldDecorator } = props.form;

    const defaultState = {
        userNumber: {
            prefix: "",
            mobileNumber: ""
        },
        numberNotEntered: false,
        isNumberValid: true,
        isLoading: false
    }

    const [state, setState] = useState<IState>(defaultState);

    const { TextArea } = Input;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        props.form.validateFields((err: Error, values: any) => {
            const { userNumber } = state;
            const isValidNumber = userNumber.prefix && userNumber.mobileNumber 
            && userNumber.mobileNumber !== "NaN" ? userNumber.prefix === "91" ? 
            (userNumber.mobileNumber.length === 10) : true : false;
            if (!err && isValidNumber) {
                setState(prev => ({...prev, isLoading: true}));

                const data = {
                    first_name: values['first_name'],
                    last_name: values['last_name'],
                    email: values['email'],
                    prefix: userNumber['prefix'],
                    mobile: userNumber['mobileNumber'],
                    org_name: values['org_name'],
                    contact_mode: values['contact_mode'],
                    requirements: values['requirements']
                }

                axios.post(G_API_URL + "tracker/discussion/request", data)
                .then((response: any) => {
                    response = response.data;
                    setTimeout(() => {
                        if(response.status === 1) {
                            props.form.resetFields();
                            setState(prev => ({ ...prev, ...defaultState }));
                            openNotification("success","Thanks for initiating a new discussion. Our team will contact you shortly!", 2);
                        } else {
                            setState(prev => ({...prev, isLoading: false}));
                            openNotification("fail", response.message , 2);
                        }
                    }, 1000);
                }).catch(() => {
                    openNotification("fail", "Something went wrong!" , 2);
                    setState(prev => ({...prev, isLoading: false}));
                })
            } else if(!isValidNumber) {
                setState(prev => ({
                    ...prev,
                    numberNotEntered: true,
                    isNumberValid: false
                }));
            }
        })
    }

    const { numberNotEntered, isNumberValid, isLoading } = state;

    return (
        <>
            <div className="g-d g-col-s-b g-col-1-m g-gap-32 g-v-c lr-pad-d 
            lr-pad-m tb-pad-d tb-pad-m discussion-form-wrapper" 
            id="discussion-block">
                <div>
                    <h1 className="title text-xxxl">Let’s Discuss</h1>
                    <p className="description">
                        Ready to reinvent your workforce with us? Fill up 
                        the form to explore the range of unique solutions 
                        specifically designed for your talent needs.
                    </p>
                </div>
                <div>
                    <Form className="discussion-form w-70" onSubmit={handleSubmit} 
                    name="discussion-form">
                        <div className="g-d g-col-2 g-col-1-m g-gap-48-32 form-block">
                            <Form.Item label="First Name">
                                {getFieldDecorator('first_name', {
                                    rules: [{ 
                                        required: true, 
                                        message: 'Please enter first name!' 
                                    }]
                                })(
                                    <Input placeholder="Austin" autoComplete="firstname" />,
                                )}
                            </Form.Item>
                            <Form.Item label="Last Name">
                                {getFieldDecorator('last_name', {
                                    rules: [{ 
                                        required: true, 
                                        message: 'Please enter last name!' 
                                    }]
                                })(
                                    <Input placeholder="D’ Coasta" autoComplete="lastname" />,
                                )}
                            </Form.Item>
                            <Form.Item className={`form-block mobile-number ${numberNotEntered ? isNumberValid ? 'has-error' : 'has-error-2' : ''}`} label="Mobile">
                                <IntlTelInput
                                    containerClassName="intl-tel-input"
                                    inputClassName="form-control intl-tel-num"
                                    preferredCountries={['in', 'us', 'ca', 'sa', 'qa', 'ae', 'om', 'kw', 'sg']}
                                    defaultCountry={'in'}
                                    fieldName={'mobile'}
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
                            <Form.Item label="Email">
                                {getFieldDecorator('email', {
                                    rules: [{ 
                                        required: true, 
                                        message: 'Please enter email!' 
                                    }]
                                })(
                                    <Input placeholder="austindcoasta@gmail.com" autoComplete="email" />,
                                )}
                            </Form.Item>
                            <Form.Item label="Enterprise/ Org Name">
                                {getFieldDecorator('org_name', {
                                    
                                })(
                                    <Input placeholder="Stark Industires" autoComplete="organization" />,
                                )}
                            </Form.Item>
                            <Form.Item label="Preferred mode of contacting">
                                {getFieldDecorator('contact_mode', {
                                    initialValue: 1
                                })(
                                    <Radio.Group>
                                        <Radio value={1}>Email</Radio>
                                        <Radio value={2}>Whatsapp</Radio>
                                        <Radio value={3}>Call</Radio>
                                    </Radio.Group>
                                )}
                            </Form.Item>
                        </div>
                        <Form.Item className="requirements" label="Tell us a bit about your talent needs">
                            {getFieldDecorator('requirements', {
                                initialValue: ""
                            })(
                                <TextArea 
                                    placeholder="Looking to train & onboard................" 
                                    autoSize={{ minRows: 4, maxRows: 4 }} 
                                />
                            )}
                        </Form.Item>
                        <Button className="default-blue-btn btn-small 
                        get-in-touch-btn" htmlType="submit" loading={isLoading}>
                            Get in Touch
                        </Button>
                    </Form>
                </div>
            </div> 
            <style jsx>{`
                .discussion-form-wrapper {
                    background-color: var(--primary-bg);
                }

                .discussion-form-wrapper .title {
                    font-weight: 800;
                    line-height: 90px;
                }

                .discussion-form-wrapper .description {
                    font-size: 24px;
                    font-weight: 200;
                    opacity: 0.87;
                }
    
                .discussion-form-wrapper .input-group {
                    grid-column-gap: 4rem;
                    margin: var(--peaky-gap-24) 0 0;
                    width: max-content;
                }
    
                .discussion-form-wrapper .form-block input,
                .discussion-form-wrapper .requirements textarea,
                .discussion-form-wrapper .ant-select-selection--single {
                    background-color: #272727;
                    border-radius: var(--peaky-br-2);
                    color: var(--dove);
                    font-weight: 300;
                    height: 50px;
                    padding: 0 var(--peaky-pad-16);
                }

                .discussion-form-wrapper .requirements {
                    margin: var(--peaky-gap-32) 0 0;
                }

                .discussion-form-wrapper .requirements textarea {
                    padding: 16px;
                    resize: none;
                }
    
                .discussion-form-wrapper .form-block
                .ant-select-search__field__wrap input {
                    padding: 0 !important;
                }  

                .discussion-form-wrapper .form-block input:hover,
                .discussion-form-wrapper .form-block input:focus {
                    background-color: #272727 !important;
                }

                .discussion-form-wrapper .form-block input::placeholder,
                .discussion-form-wrapper .intl-tel-input input::placeholder,
                .discussion-form-wrapper .ant-select-selection__placeholder {
                    color: var(--dove);
                    opacity: 0.38;
                }

                .discussion-form-wrapper .ant-form-item-required::before,
                .discussion-form-wrapper .ant-form-item-label > label::after {
                    margin: unset;
                    content: unset;
                }

                .discussion-form-wrapper .ant-form-item-label > label {
                    color: var(--dove);
                    font-weight: 600;
                    opacity: 0.87;
                }

                .discussion-form-wrapper .ant-input {
                    border: unset;
                    border-radius: unset;
                    font-size: 16px;
                }

                .discussion-form-wrapper .ant-input:focus {
                    box-shadow: none;
                }

                .discussion-form-wrapper input:-webkit-autofill,
                .discussion-form-wrapper input:-webkit-autofill:hover,
                .discussion-form-wrapper input:-webkit-autofill:focus,
                .discussion-form-wrapper input:-webkit-autofill:active {
                    -webkit-transition: "color 9999s ease-out, background-color 9999s ease-out";
                    -webkit-transition-delay: 9999s;
                }

                .discussion-form-wrapper .intl-tel-input.allow-dropdown input {
                    border: none;
                    color: var(--dove);
                    font-size: 16px;
                    width: 280px;
                }

                .discussion-form-wrapper .intl-tel-input.allow-dropdown input:focus {
                    border: none;
                    box-shadow: none;
                }

                .discussion-form-wrapper .intl-tel-input .country-list {
                    z-index: 5;
                }

                .discussion-form-wrapper .intl-tel-input,
                .discussion-form-wrapper .intl-tel-input .country-list {
                    width: inherit;
                }

                .discussion-form-wrapper .intl-tel-input input {
                    height: 50px;
                    border-radius: var(--peaky-br-4);
                    border: 1px solid #d9d9d9;
                    width: 100%;
                    font-weight: 300;
                    color: var(--carbon);
                    transition: all 0.4s;
                }

                .discussion-form-wrapper .intl-tel-input input:hover,
                .discussion-form-wrapper .intl-tel-input input:focus {
                    border-color: var(--purple);
                }

                .discussion-form-wrapper .intl-tel-input input:focus,
                .discussion-form-wrapper .intl-tel-input .selected-flag {
                    outline: none;
                }

                .discussion-form-wrapper .intl-tel-input .country-list
                .country.highlight {
                    background-color: var(--charcoal);
                }

                .discussion-form-wrapper .intl-tel-input .selected-flag {
                    width: 50px;
                }

                .discussion-form-wrapper .intl-tel-input input::placeholder {
                    font-weight: 400;
                }

                .discussion-form-wrapper .intl-tel-input input::placeholder,
                .discussion-form-wrapper .intl-tel-input .country-list .country {
                    font-family: "Open Sans", sans-serif;
                }

                .discussion-form-wrapper .intl-tel-input
                .flag-container .arrow {
                    color: var(--sandstone);
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
                    font-weight: 200;
                    color: #f5222d;
                    position: absolute;
                    top: 40px;
                    left: 0;
                }

                .discussion-form-wrapper .intl-tel-input .country-list {
                    z-index: 5;
                    overflow-x: hidden;
                    background-color: #272727;
                    color: var(--dove);
                    border: 1px solid var(--crow);
                }

                .discussion-form-wrapper .ant-select-selection--single {
                    padding: unset;
                    font-size: 16px;
                }

                .discussion-form-wrapper .ant-select-selection__rendered {
                    line-height: 50px;
                    margin-left: var(--peaky-gap-16);
                }

                .discussion-form-wrapper .ant-select-selection {
                    border: unset;
                }

                .discussion-form-wrapper .ant-select-arrow .anticon {
                    color: var(--sandstone);
                }

                .discussion-form-wrapper .ant-select-selection:hover {
                    border-color: unset;
                }

                .discussion-form-wrapper .work-status .ant-form-item-required,
                .discussion-form-wrapper .laptop-radio .ant-form-item-required,
                .discussion-form-wrapper .stable-internet-radio .ant-form-item-required,
                .discussion-form-wrapper .ant-radio-wrapper {
                    font-weight: 400;
                    font-size: 16px;
                    font-family: 'Open Sans', sans-serif;
                    color: var(--dove);
                }

                .discussion-form-wrapper .ant-radio-inner {
                    background-color: var(--spider);
                    height: 8px;
                    width: 8px;
                    top: -5px;
                }

                .discussion-form-wrapper .ant-radio-inner::after {
                    height: 8px;
                    top: -1px;
                    left: -1px;
                    width: 8px;
                }

                .discussion-form-wrapper .divider {
                    border: 1px solid var(--spider);
                    margin: var(--peaky-gap-32) 0;
                }

                .discussion-form-wrapper .ant-form-item {
                    margin-bottom: 0;
                }

                .discussion-form-wrapper .action-block-wrapper {
                    background: var(--spider);
                    bottom: 0;
                    left: 0;
                    position: fixed;
                    padding: var(--peaky-pad-16) 0;
                    width: 100%;
                }

                .discussion-form-wrapper .action-block-wrapper
                .save-btn {
                    background: linear-gradient(180deg, #0E7DED 1.47%, #1739E6 101.42%);
                    border: none;
                    border-radius: var(--peaky-br-2);
                    color: var(--dove);
                    height: 50px;
                    padding: 0 var(--peaky-pad-32);
                }

                .discussion-form-wrapper .ant-select-dropdown {
                    background-color: var(--spider) !important;
                }

                .discussion-form-wrapper .ant-select-dropdown-menu-item {
                    color: var(--dove) !important;
                }

                .discussion-form-wrapper .ant-select-dropdown-menu-item-selected,
                .discussion-form-wrapper .ant-select-dropdown-menu-item-active {
                    background-color: var(--charcoal) !important;
                }

                .discussion-form-wrapper .ant-empty-description {
                    color: var(--dove);
                }

                .discussion-form-wrapper .get-in-touch-btn {
                    margin: var(--peaky-gap-32) 0 0;
                }

                .discussion-form-wrapper .get-in-touch-btn:hover, 
                .discussion-form-wrapper .get-in-touch-btn:focus {
                    color: var(--dove);
                }

                .ant-radio-group {
                    align-items: center;
                    display: flex;
                    min-height: 50px;
                }

                .discussion-form-wrapper .ant-radio-wrapper {
                    background-color: var(--secondary-bg);
                    color: var(--dove);
                    padding: 8px 24px 8px 12px;
                }

                .discussion-form-wrapper .radio-block:nth-of-type(2) {
                    margin: var(--peaky-gap-48) 0 0;
                }

                .discussion-form-wrapper .radio-group {
                    margin: var(--peaky-gap-48) 0 0; 
                }

                .discussion-form-wrapper .ant-radio-wrapper > span {
                    font-size: 14px;
                    font-weight: 200;
                    opacity: 0.87;
                }

                .discussion-form-wrapper .ant-radio-wrapper > span.ant-radio + * {
                    padding-left: 4px;
                    padding-right: 0;
                }

                .discussion-form-wrapper .ant-form-item-label > 
                .ant-form-item-required::after,
                .discussion-form-wrapper .mobile-number 
                .ant-form-item-label > label::after {
                    display: inline-block;
                    color: #f5222d;
                    font-size: 16px;
                    font-family: SimSun, sans-serif;
                    line-height: 1;
                    content: "*";
                }

                @media only screen and (max-device-width: 760px) {
                    .discussion-form-wrapper .discussion-form {
                        width: 100%;
                    }

                    .discussion-form-wrapper .input-group,
                    .discussion-form-wrapper .form-block,
                    .discussion-form-wrapper .intl-tel-input,
                    .discussion-form-wrapper .intl-tel-input.allow-dropdown input {
                        width: 100%;
                    }

                    .discussion-form-wrapper .title {
                        line-height: 60px;
                    }

                    .discussion-form-wrapper .description {
                        font-size: 21px;
                        margin: var(--peaky-gap-16) 0 0;
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

export default Form.create<any>({ name: 'discussion-form' })(DiscussionForm);