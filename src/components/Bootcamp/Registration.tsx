import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { FormComponentProps } from "antd/lib/form/Form";
import { check_login } from "./../../utils/login.util";
import axios from "axios";
import { G_API_URL } from "./../../constants/constants";
import { __getToken } from "./../../utils/user-details.util";
// @ts-ignore
import IntlTelInput from 'react-intl-tel-input';
import { __getCookie } from "./../../utils/cookie.util";
import keys from "../../config/keys";
interface IProps extends FormComponentProps {
    setMode: Function;
    closeModal: Function;
    program?: string;
    url?: string;
    type?: string;
}

interface ICountryData {
    dialCode: string;
}

interface IState {
    isNumberValid: boolean;
    numberNotEntered: boolean;
    loading: boolean;
    userNumber: {
        prefix: string,
        mobileNumber: string
    }
}

const RegistrationForm = (props: IProps) => {
    const { form, closeModal, program, type } = props;
    const { getFieldDecorator } = form;

    const defaultState = {
        isNumberValid: true,
        numberNotEntered: false,
        loading: false,
        userNumber: {
            prefix: '',
            mobileNumber: ''
        }
    }

    const [state, setState] = useState<IState>(defaultState);
    const [ userInfo, setUserInfo ] = useState<any>({});

    const { isNumberValid, numberNotEntered, userNumber } = state;

    useEffect(() => {
        if(check_login()) {
            axios.get(G_API_URL + "auth/user", {
                headers: {
                    Authorization: __getToken()
                }
            }).then((response: any) => {
                response = response.data;
                if(response.status === 1) {
                    setUserInfo(response.user);
                    if(response.user && response.user.mobileNumber) {
                        setState(prev => ({
                            ...prev,
                            userNumber: {
                                prefix: response.user.prefix,
                                mobileNumber: response.user.mobileNumber
                            }
                        }));
                    }
                }
            });
        }
    }, []);

    const handleSubmit = (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();
        props.form.validateFields(async(err:null | object, values: any) => {
            if(!err) {

                const validInNumber = userNumber.prefix ? ( userNumber.mobileNumber && userNumber.mobileNumber.length === 10) : false;

                if(validInNumber) {
                    
                    setState(prev => ({...prev, loading: true}));

                    const data = {
                        userName: values['firstName'] + " " + values['lastName'],
                        firstName: values['firstName'],
                        lastName: values['lastName'],
                        email: values['email'],
                        prefix: userNumber['prefix'],
                        mobileNumber: userNumber['mobileNumber'],
                        pageSource: program 
                    }

                    try{
                        const response = await axios.post(G_API_URL + "pdf/download/", data, {
                            headers: {
                                Authorization: __getCookie(keys.cookiePrefix + "ut")["cookieValue"],
                            },
                        });
    
                        if (response.data.status === 1) {
                            closeModal()
                            if(program === "bootcamp"){
                                if(type === "placement")
                                    window.open("https://cdn.prograd.org/resources/Documents/ProGrad_Placement_Report.pdf")
                                else    
                                    window.open("https://cdn.prograd.org/resources/Documents/ProGrad_Bootcamp_Brochure.pdf")
                            }
                            else{
                                if(type === "placement") 
                                    window.open("https://cdn.prograd.org/resources/Documents/prograd_placement_report.pdf")
                                else
                                    window.open("https://cdn.prograd.org/resources/Documents/ProGrad_Microdegree_Brochure.pdf")
                            }
                        }
        
                        if (response.data.status === 0) {
                            console.log("error try after some times");  
                            closeModal() 
                        }
                    }
                    catch(err){
                        console.log(err);
                    }

                } 
                else {
                    console.log("elseee");
                    
                    setState(prev => ({
                        ...prev,
                        numberNotEntered: true,
                        isNumberValid: false
                    }));
                }
            }
        })
    }

    // const getOptions = (options: any) => {
    //     return options.map((option: any) => {
    //         return (
    //             <Option key={option} value={option}>
    //                 {option}
    //             </Option>
    //         );
    //     })
    // }

    const renderFormFields = () => {
        return (
            <div className="input-group g-d g-col-2 
            g-col-1-m">
                <div className="form-block">
                    <Form.Item label="First Name">
                        {getFieldDecorator('firstName', {
                            rules: [{ 
                                required: true, 
                                message: 'First Name cannot be empty!' }],
                                initialValue: userInfo.firstName
                        }) ( 
                            <Input placeholder="John" autoComplete="firstname"/>
                        )}
                    </Form.Item>
                </div>
                <div className="form-block">
                    <Form.Item label="Last Name">
                        {getFieldDecorator('lastName', {
                            rules: [{ 
                            required: true, 
                            message: 'Last Name cannot be empty!' }],
                            initialValue: userInfo.lastName
                        }) ( 
                            <Input placeholder="Doe" autoComplete="lastname"/> 
                        )}
                    </Form.Item>
                </div>
                <div className="form-block">
                    <Form.Item label="Email">
                        {getFieldDecorator('email', {
                            rules: [{ 
                                required: true, 
                                message: 'Email cannot be empty!' }],
                                initialValue: userInfo.email
                        }) ( 
                            <Input placeholder="Enter your email" autoComplete="email" disabled/>
                        )}
                    </Form.Item>
                </div>
                <div className={`form-block mobile-number ${numberNotEntered ? isNumberValid ? 'has-error' : 'has-error-2' : ''}`}>
                    <Form.Item label="Mobile Number">
                        <IntlTelInput
                            key = {!userInfo.mobileNumber ? 0 : 1}
                            containerClassName="intl-tel-input"
                            inputClassName="form-control"
                            preferredCountries={['in', 'us', 'ca', 'sa', 'qa', 'ae', 'om', 'kw', 'sg']}
                            defaultCountry={'in'}
                            fieldName={'mobileNumber'}
                            autoComplete="phone"
                            placeholder={"9999999999"}
                            format
                            disabled={userInfo.mobileNumber !== undefined ? true: false}
                            defaultValue={userInfo.mobileNumber }
                            onPhoneNumberBlur={(status: any, value: any, countryData: any) => {
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
            </div>
        )
    }
    const { loading } = state;
    return (
        <>
            <div className="registration-wrapper">
                <h1 className="font-heading text-large">
                    Enter your details
                </h1>
                <Form className="workshop-form" onSubmit={handleSubmit}>
                    { renderFormFields() }
                    <div className="g-d g-h-e action-block">
                        <Button 
                            className="default-blue-btn btn-small 
                            text-regular c-pointer confirm-btn" 
                            htmlType="submit"
                            loading={loading}
                        >
                            {type === "Syllabus" ? "Download Syllabus" : "Download Placement Report"}
                            
                        </Button>
                    </div>
                </Form>
            </div>
            <style jsx>{`

                .registration-wrapper {
                    width: max-content;
                }

                .workshop-form .input-group {
                    grid-column-gap: 4rem;
                    margin: var(--peaky-gap-24) 0 0;
                    width: max-content;
                }

                .workshop-form .form-block {
                    width: 300px;
                }

                .workshop-form .form-block input,
                .workshop-form .ant-select-selection--single {
                    background-color: #383838;
                    border-radius: var(--peaky-br-2);
                    color: var(--dove);
                    font-weight: 300;
                    height: 50px;
                    padding: 0 var(--peaky-pad-16);
                }

                .workshop-form .form-block
                .ant-select-search__field__wrap input {
                    padding: 0 !important;
                }

                .workshop-form .form-block input:focus {
                    background-color: #383838 !important;
                }
                
                .workshop-form .form-block .ant-input:focus {
                    padding: 0 14px;
                }

                .workshop-form .form-block .ant-input {
                    -webkit-transition: none;
                    transition: none;
                }

                .workshop-form .form-block input::placeholder,
                .workshop-form .intl-tel-input input::placeholder,
                .workshop-form .ant-select-selection__placeholder {
                    color: var(--dove);
                    opacity: 0.38;
                }

                .workshop-form .ant-form-item-required::before,
                .workshop-form .ant-form-item-label > label::after {
                    margin: unset;
                    content: unset;
                }

                .workshop-form .ant-form-item-label > label {
                    color: var(--dove);
                    font-weight: 600;
                    opacity: 0.87;
                }

                .workshop-form .ant-input {
                    border: unset;
                    border-radius: unset;
                    font-size: 16px;
                }

                .workshop-form .ant-input:focus {
                    box-shadow: none;
                }
                
                .workshop-form input:-webkit-autofill,
                .workshop-form input:-webkit-autofill:hover,
                .workshop-form input:-webkit-autofill:focus,
                .workshop-form input:-webkit-autofill:active {
                    -webkit-transition: "color 9999s ease-out, background-color 9999s ease-out";
                    -webkit-transition-delay: 9999s;
                }
                
                .workshop-form .intl-tel-input.allow-dropdown input {
                    border: none;
                    color: var(--dove);
                    font-size: 16px;
                    width: 300px;
                }

                .workshop-form .intl-tel-input.allow-dropdown input:focus {
                    border: none;
                    box-shadow: none;
                }

                .workshop-form .intl-tel-input .country-list {
                    z-index: 5;
                }

                .workshop-form .intl-tel-input, 
                .workshop-form .intl-tel-input .country-list {
                    width: inherit;
                }

                .workshop-form .intl-tel-input input {
                    height: 50px;
                    // border-radius: var(--peaky-br-4);
                    border: 1px solid #d9d9d9;
                    width: 100%;
                    font-weight: 300;
                    color: var(--carbon);
                    transition: none;
                }
                .workshop-form .intl-tel-input input:focus {
                    padding-left: 50px;
                }

                .workshop-form .intl-tel-input input:hover,
                .workshop-form .intl-tel-input input:focus {
                    border-color: var(--purple);
                }

                .workshop-form .intl-tel-input input:focus,
                .workshop-form .intl-tel-input .selected-flag {
                    outline: none;
                }

                .workshop-form .intl-tel-input .country-list 
                .country.highlight {
                    background-color: var(--charcoal);
                }

                .workshop-form .intl-tel-input .selected-flag {
                    width: 50px;
                }

                .workshop-form .intl-tel-input input::placeholder {
                    font-weight: 400;
                }

                .workshop-form .ant-select-selection__placeholder {
                    top: 45%;
                }

                .workshop-form .intl-tel-input input::placeholder,
                .workshop-form .intl-tel-input .country-list .country {
                    font-family: "Open Sans", sans-serif;
                }

                .workshop-form .intl-tel-input 
                .flag-container .arrow  {
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
                    font-weight: 400;
                    font-family: "Open Sans", sans-serif;
                    color: var(--organred);
                    position: absolute;
                    top: 40px;
                    left: 0;
                }

                .workshop-form .intl-tel-input .country-list {
                    z-index: 5;
                    overflow-x: hidden;
                    background-color: #383838;
                    color: var(--dove);
                    border: 1px solid var(--crow);
                }

                .workshop-form .ant-select-selection--single {
                    padding: unset;
                    font-size: 16px;
                }

                .workshop-form .ant-select-selection__rendered {
                    line-height: 50px;
                    margin-left: var(--peaky-gap-16);
                }

                .workshop-form .ant-select-selection,
                .workshop-form .ant-select-selection:hover {
                    border: 2px solid transparent;
                }

                .workshop-form .ant-select-arrow .anticon  {
                    color: var(--sandstone);
                }

                .workshop-form .work-status .ant-form-item-required,
                .workshop-form .laptop-radio .ant-form-item-required,
                .workshop-form .stable-internet-radio .ant-form-item-required,
                .workshop-form .ant-radio-wrapper {
                    font-weight: 400;
                    font-size: 16px;
                    font-family: 'Open Sans', sans-serif;
                    color: var(--dove);
                }

                .workshop-form .ant-radio-inner {
                    border: 2px solid var(--primary);
                    background-color: var(--spider);
                    height: 20px;
                    width: 20px;
                }

                .workshop-form .ant-radio-inner::after {
                    height: 10px;
                    width: 10px;
                }

                .workshop-form .divider {
                    border: 1px solid var(--spider);
                    margin: var(--peaky-gap-32) 0;
                }

                .workshop-form .ant-radio-wrapper:nth-of-type(1) {
                    margin-right: 50px;
                }

                .workshop-form .ant-radio-wrapper span.ant-radio + * {
                    padding-left: var(--peaky-pad-16);
                    padding-right: var(--peaky-pad-16);
                }

                .workshop-form .work-status .ant-form-item,
                .workshop-form .laptop-radio .ant-form-item,
                .workshop-form .stable-internet-radio .ant-form-item {
                    margin-bottom: var(--peaky-gap-8);
                }

                .workshop-form .action-block-wrapper {
                    background: var(--spider);
                    bottom: 0;
                    left: 0;
                    position: fixed;
                    padding: var(--peaky-pad-16) 0;
                    width: 100%;
                }

                .workshop-form .confirm-btn {
                    margin: var(--peaky-gap-32) 0 0;
                }
                
                .workshop-form .confirm-btn:hover {
                    color: var(--dove);
                }

                .workshop-form .form-block .ant-select-search__field__wrap input:focus {
                    background-color: unset !important;
                }

                .workshop-form .ant-input:focus,
                .workshop-form .intl-tel-input input:focus,
                .workshop-form .intl-tel-input.allow-dropdown input:focus,
                .workshop-form .ant-select-focused .ant-select-selection, 
                .workshop-form .ant-select-selection:focus, 
                .workshop-form .ant-select-selection:active
                .workshop-form .ant-select-selection--single:focus {
                    box-shadow: none;
                    border: 2px solid var(--primary) !important;
                }

                .ant-select-dropdown {
                    background-color: var(--spider)!important;
                }

                .ant-select-dropdown-menu-item {
                    color: var(--dove) !important;
                }
                
                .ant-select-dropdown-menu-item-selected,
                .ant-select-dropdown-menu-item-active {
                    background-color: var(--charcoal) !important;
                }

                .ant-empty-description {
                    color: var(--dove);
                }

                @media only screen and (max-device-width: 760px) {
                    .registration-wrapper {
                        min-width: 80vw;
                    }

                    .workshop-form,
                    .workshop-form .input-group,
                    .workshop-form .form-block,
                    .workshop-form .intl-tel-input,
                    .workshop-form .intl-tel-input.allow-dropdown input {
                        width: 100%;
                    }

                    .workshop-form .action-block {
                        justify-content: center;
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

const Registration = Form.create<IProps>({name: ""})(RegistrationForm);
export default Registration;