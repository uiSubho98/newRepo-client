import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, Select } from "antd";
import { FormComponentProps } from "antd/lib/form/Form";
// import ISDCodesDropDown from '../Onboard/ISDCodeDropDown';
// import CollegeNameDropDown from '../Onboard/CollegeNameDropDown';
import DegreeDropDown from '../Onboard/DegreeDropDown';
import StreamDropDown from '../Onboard/StreamDropDown';
// import { CheckboxChangeEvent } from 'antd/lib/checkbox';
// @ts-ignore
import IntlTelInput from 'react-intl-tel-input';
import { G_API_URL } from '../../constants/constants';
import axios, { AxiosResponse } from 'axios';
import { openNotification } from '../../utils/common.util';
import { isMobile } from 'react-device-detect';
import { check_login } from '../../utils/login.util';
import { setTimeout } from 'timers';
import { IProfile } from '../ProfileOld/profile';
import { __getEmail } from '../../utils/user-details.util';
import { CheckboxChangeEvent } from 'antd/lib/checkbox/Checkbox';

interface FormBlockProps extends FormComponentProps{
    profile: IProfile
}

interface IState {
    accountType: number;
    userNumber: {
        prefix: string;
        mobileNumber: string;
    }
    numberNotEntered: boolean;
    isNumberValid: boolean;
    informationConsent: boolean;
    loading: boolean;
}

const FormBlock = (props: FormBlockProps) => {

    const {getFieldDecorator, getFieldValue} = props.form;
    const {profile} = props;

    const {Option} = Select;

    const defaultState: IState = {
        accountType: 1,
        userNumber: {
            prefix: profile.prefix ? profile.prefix : "",
            mobileNumber: profile.mobileNumber ? profile.mobileNumber : ""
        },
        informationConsent: true,
        loading: false,
        numberNotEntered: false,
        isNumberValid: true
    }

    const [state, setState] = useState(defaultState);

    useEffect(() => {
        setState(prev => ({
            ...prev,
            userNumber: {
                prefix: profile.prefix ? profile.prefix : "",
                mobileNumber: profile.mobileNumber ? profile.mobileNumber : ""
            }
        }))
    }, [profile.mobileNumber, profile.prefix])

    // const prefixSelector = (type:number) => {
    //     return <ISDCodesDropDown 
    //         getFieldDecorator={getFieldDecorator}
    //     />
    // }

    // const handleTypeChange = (e: any) => {
    //     setState(prev => (
    //         {
    //             ...prev,
    //             accountType: e.target.value
    //         }
    //     ))
    // }

    // const renderAccountTypes = () => {
    //     return ["Student", "Working Professional", "Graduate"].map((accountType, key) => {
    //         return (
    //             <Radio.Button value={key + 1} className="account-type f-v-c f-h-c-m">
    //                 { accountType }
    //             </Radio.Button>
    //         )
    //     })
    // }

    const getCollegeInput = () => {
        return (
            <div className="form-block">
                <Form.Item label="College Name">
                    {getFieldDecorator('college', {
                        rules: [{ 
                            required: true, 
                            message: 'College Name cannot be empty!' }],
                            initialValue: profile.college
                    }) ( 
                        <Input placeholder="Xavier’s School for the gifted" autoComplete="college"/>
                    )}
                </Form.Item>
            </div>
        )
    }

    // const getYearOptions = () => {
    //     let yearOptions = [];
    //     for (let i = 1; i <= 4; i++) {
    //         yearOptions.push(<Option key={i} value={i}>{i}</Option>)
    //     }
    //     yearOptions.unshift(<Option key={'title'} 
    //     disabled>Select a Year</Option>);
    //     return yearOptions;
    // }

    // const getYearInput = () => {
    //     return (
    //         <div className="form-block custom-year">
    //             <Form.Item>
    //                 {getFieldDecorator('year', {
    //                     rules: [{required: true, 
    //                         message: 'Please select your year'}]
    //                 })(
    //                     <Select placeholder="What year are you in?" >
    //                         {getYearOptions()}
    //                     </Select>
    //                 )}
    //             </Form.Item>
    //         </div>
    //     )
    // }

    const getDegreeInput = () => {
        return (
            <div className="form-block">
                <DegreeDropDown
                    message="Degree cannot be empty!"
                    name="degree"
                    degree = {profile.degree === "" ? undefined : profile.degree}
                    placeholder="Degree"
                    getFieldDecorator={getFieldDecorator}
                    isRequired={true}
                />
            </div>
        )
    }

    const getStreamInput = () => {
        return (
            <div className="form-block">
                <StreamDropDown
                    message="Stream cannot be empty!"
                    name="stream"
                    stream = {profile.stream === "" ? undefined : profile.stream}
                    placeholder="Stream/Department"
                    getFieldDecorator={getFieldDecorator}
                    isRequired={true}
                />
            </div>
        )
    }

    const getYearOfGraduation = () => {
        let yearOptions = [];
        let maxYear = new Date().getFullYear() + 4;
        for (let i = 2010; i <= maxYear; i++) {
            yearOptions.push(<Option key={i} value={i}>{i}</Option>)
        }
        return yearOptions;
    }

    const getWorkStatus = () => {
        return ["Yes", "No"].map((status, idx) => 
            <Option key={idx} value={status}>
                {status}
            </Option> 
        )
    }

    const getYearOfGraduationInput = () => {
        return (
            <div className="form-block custom-year">
                <Form.Item label="Year of graduation">
                    {getFieldDecorator('yop', {
                        rules: [{required: true, 
                            message: 'Please select your year of graduation'}],
                        initialValue: profile.yop === "" ? undefined : profile.yop
                    })(
                        <Select placeholder="Select">
                            {getYearOfGraduation()}
                        </Select>
                    )}
                </Form.Item>
            </div>
        )
    }

    const getCompanyNameInput = () => {
        return (
            <div className="form-block">
                <Form.Item label="Company Name">
                    {getFieldDecorator('company', {
                        rules: [{ required: true, 
                            message: 'Company Name cannot be empty!' }],
                            initialValue: profile.company
                    }) ( 
                        <Input placeholder="Enter Company Name"/>
                    )}
                </Form.Item>
            </div>
        )
    }

    // const getRoleInput = () => {
    //     return (
    //         <div className="form-block">
    //             <Form.Item>
    //                 <FloatLabel label="Role">
    //                     {getFieldDecorator('role', {
    //                         rules: [{ required: true, 
    //                             message: 'Role cannot be empty!' }]
    //                     }) ( 
    //                         <Input placeholder="Enter Role"/>
    //                     )}
    //                 </FloatLabel>
    //             </Form.Item>
    //         </div>
    //     )
    // }

    const getWorkStatusInput = () => {
        return (
            <div className="form-block custom-year">
                <Form.Item label="Are you currently working?">
                    {getFieldDecorator('workStatus', {
                        rules: [{required: true, 
                            message: 'Please select your year of graduation'}],
                            initialValue: profile.isWorking ? "Yes" : "No"
                    })(
                        <Select placeholder="Are you currently working?">
                            {getWorkStatus()}
                        </Select>
                    )}
                </Form.Item>
            </div>
        )
    }

    const updateConsent = (e: CheckboxChangeEvent) => {
        e.target.checked ? setState({...state,informationConsent: true}) : 
        setState({...state,informationConsent: false});
    }

    const handleSubmit = (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();

        props.form.validateFields((err:null | object, values: any) => {
            if (!err) {
                const { userNumber, accountType } = state;
                const { prefix, mobileNumber } = userNumber;
                setState(prev => ({
                    ...prev,
                    loading: true
                }));

                const data = {
                    ...values,
                    account_type: accountType,
                    mobile: mobileNumber,
                    prefix: prefix,
                    user_type: check_login() ? 1 : 2,
                    informationConsent: informationConsent,
                    requestedAt: Math.round((new Date()).getTime() / 1000)
                }

                if(values.workStatus) {
                    data['workStatus'] = values.workStatus === "Yes" ? 1 : 0;
                }

                axios.post(G_API_URL + "tracker/whatsapp", data)
                .then((res: AxiosResponse) => {
                    let response = res.data;
                    if(response.status === 1) {
                        let text = "Hi! This is " + data.firstname + " " + data.lastname + ". I'd like to get the free subscription to ProGrad Buzz!"
                        let encodedtext = encodeURI(text)
                        openNotification("success", response.message, 3);
                        setTimeout(() => {
                            setState(prev => ({
                                ...prev,
                                loading: false
                            }));
                            if(isMobile){
                                window.open(
                                    `https://api.whatsapp.com/send?phone=+919789139126&text=${encodedtext}`,
                                    '_blank'
                                );
                            } else{
                                window.open(
                                    `https://web.whatsapp.com/send?phone=+919789139126&text=${encodedtext}`,
                                    '_blank'
                                );
                            }
                        }, 1500);

                        setTimeout(() => {
                            window.location.reload();
                        }, 3000);
                    
                    } else {
                        setState(prev => ({
                            ...prev,
                            loading: false
                        }));
                        openNotification("Fail","Mobile number is already registered!", 3);
                    }
                }).catch((error) => {
                    console.log(error)
                })
            }
        })
    }
    
    const { informationConsent, loading } = state;
    const informationConsentValue = "I agree to receive messages from ProGrad on WhatsApp";
    const currentYear = new Date().getFullYear();
    return (
        <>
            <Form className="prograd-edge-form"
            onSubmit={handleSubmit}>
                <div className="input-group g-d g-col-2 g-col-1-m">
                    <div className="form-block">
                        <Form.Item label="First Name">
                            {getFieldDecorator('firstname', {
                                rules: [{ required: true, 
                                    message: 'First Name cannot be empty!' }],
                                initialValue: profile.firstName
                            }) ( 
                                <Input placeholder="Enter Name" autoComplete="name"/>
                            )}
                        </Form.Item>
                    </div>

                    <div className="form-block">
                        <Form.Item label="Last Name">
                            {getFieldDecorator('lastname', {
                                rules: [{ required: true, 
                                    message: 'Last Name cannot be empty!' }],
                                initialValue: profile.lastName
                            }) ( 
                                <Input placeholder="Enter Name" autoComplete="name"/>
                            )}
                        </Form.Item>
                    </div>

                    <div className="form-block mobile-group f-d">
                        <Form.Item label="Mobile Number">
                            <IntlTelInput
                                containerClassName="intl-tel-input"
                                inputClassName="form-control"
                                preferredCountries={['in', 'us', 'ca', 'sa', 'qa', 'ae', 'om', 'kw', 'sg']}
                                defaultCountry={'in'}
                                fieldName={'mobileNumber'}
                                autoComplete="phone"
                                placeholder={"9999999999"}
                                format
                                defaultValue={profile.mobileNumber}
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

                    <div className="form-block">
                        <Form.Item label="Email">
                            {getFieldDecorator('email', {
                                rules: [{ required: true, 
                                    message: 'Email cannot be empty!' }],
                                initialValue: __getEmail()
                            }) ( 
                                <Input placeholder="Enter Email" autoComplete="email"/>
                            )}
                        </Form.Item>
                    </div>
                    { getDegreeInput() }
                    { getStreamInput() }
                </div>

                {/* <div className="action-block">
                    <span className="body-small f-d">Are you a...</span>
                    <Radio.Group defaultValue={accountType} className="f-vt-m account-types-wrapper"
                    onChange={(e) => handleTypeChange(e)}>
                        {renderAccountTypes()}
                    </Radio.Group>
                </div> */}

                <div className="input-group secondary-input-block g-d g-col-2 g-col-1-m">
                    {/* { accountType === 1 && getYearInput()} */}
                    { getYearOfGraduationInput() }
                    {/* { ([1,3].includes(accountType)) && getCollegeInput()}
                    { accountType === 2 && getCompanyNameInput()}
                    { accountType === 2 && getRoleInput()} */}

                    {
                        getFieldValue("yop") && (
                            getFieldValue("yop") >= currentYear ?
                            getCollegeInput() :
                            <>
                                { getWorkStatusInput() }
                                {
                                    getFieldValue("workStatus") === "Yes" && 
                                    getCompanyNameInput()
                                }
                            </>
                        )

                    }
                </div>
                <div className="information-consent-wrapper f-d f-vt">
                    <Checkbox checked={informationConsent} 
                        className={"information-consent"} 
                        onChange={(e)=>updateConsent(e)}>
                        {informationConsentValue}
                    </Checkbox>
                </div>

                <div className="action-block-wrapper f-d f-h-s f-v-c f-v-s-m f-vt-m">
                    {
                        informationConsent ?
                        <Button
                            className="create-account-btn 
                            default-blue-btn"
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                        >
                            Subscribe
                        </Button> 
                        : ''
                    }
                    {/* {
                        informationConsent ?
                        <span className="info">
                            This message will be sent to ProGrad (9789139126)
                        </span> : ''
                    } */}
                </div>
            </Form>
            <style jsx>{`
                .prograd-edge-form {
                    margin: 0 0 var(--peaky-gap-128);
                }

                .prograd-edge-form .input-group {
                    grid-column-gap: 4rem;
                    width: max-content;
                }

                .prograd-edge-form .form-block {
                    width: 300px;
                }

                .prograd-edge-form .form-block input,
                .prograd-edge-form .ant-select-selection--single {
                    background-color: #383838;
                    border-radius: var(--peaky-br-2);
                    color: var(--dove);
                    font-weight: 300;
                    height: 50px;
                    padding: 0 var(--peaky-pad-16);
                }

                .prograd-edge-form .form-block
                .ant-select-search__field__wrap input {
                    padding: 0 !important;
                }

                .prograd-edge-form .form-block input:focus {
                    background-color: #383838 !important;
                }

                .prograd-edge-form .form-block .ant-select-search__field__wrap input:focus {
                    background-color: unset !important;
                }

                .prograd-edge-form .form-block input::placeholder,
                .prograd-edge-form .intl-tel-input input::placeholder,
                .prograd-edge-form .ant-select-selection__placeholder {
                    color: var(--dove);
                    opacity: 0.38;
                }

                .prograd-edge-form .ant-form-item-required::before,
                .prograd-edge-form .ant-form-item-label > label::after {
                    margin: unset;
                    content: unset;
                }

                .prograd-edge-form .ant-form-item-label > label::after {
                    display: inline-block;
                    margin-right: 4px;
                    color: #f5222d;
                    font-size: 14px;
                    font-family: SimSun, sans-serif;
                    line-height: 1;
                    content: '*';
                }

                .prograd-edge-form .ant-form-item-label > label {
                    color: var(--dove);
                    font-weight: 600;
                    opacity: 0.87;
                }

                .prograd-edge-form .ant-input {
                    border: unset;
                    border-radius: unset;
                    font-size: 16px;
                }
                
                .prograd-edge-form input:-webkit-autofill,
                .prograd-edge-form input:-webkit-autofill:hover,
                .prograd-edge-form input:-webkit-autofill:focus,
                .prograd-edge-form input:-webkit-autofill:active {
                    -webkit-transition: "color 9999s ease-out, background-color 9999s ease-out";
                    -webkit-transition-delay: 9999s;
                }
                
                .prograd-edge-form .intl-tel-input.allow-dropdown input {
                    // border: none;
                    color: var(--dove);
                    font-size: 16px;
                    width: 300px;
                }

                .prograd-edge-form .intl-tel-input .country-list {
                    z-index: 5;
                }

                .prograd-edge-form .intl-tel-input, 
                .prograd-edge-form .intl-tel-input .country-list {
                    width: inherit;
                }

                .prograd-edge-form .intl-tel-input input {
                    height: 50px;
                    border-radius: var(--peaky-br-2);
                    border: none;
                    width: 100%;
                    font-weight: 300;
                    color: var(--carbon);
                    transition: all 0.4s;
                }

                .prograd-edge-form .intl-tel-input input:focus,
                .prograd-edge-form .intl-tel-input .selected-flag {
                    outline: none;
                }

                .prograd-edge-form .intl-tel-input .country-list 
                .country.highlight {
                    background-color: var(--charcoal);
                }

                .prograd-edge-form .intl-tel-input .selected-flag {
                    width: 50px;
                }

                .prograd-edge-form .intl-tel-input input::placeholder {
                    font-weight: 400;
                }

                .prograd-edge-form .intl-tel-input input::placeholder,
                .prograd-edge-form .intl-tel-input .country-list .country {
                    font-family: "Open Sans", sans-serif;
                }

                .prograd-edge-form .intl-tel-input 
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

                .prograd-edge-form .intl-tel-input .country-list {
                    z-index: 5;
                    overflow-x: hidden;
                    background-color: #383838;
                    color: var(--dove);
                    border: 1px solid var(--crow);
                }

                .prograd-edge-form .ant-select-selection--single {
                    padding: unset;
                    font-size: 16px;
                }

                .prograd-edge-form .ant-select-selection__rendered {
                    line-height: 50px;
                    margin-left: var(--peaky-gap-16);
                }

                .prograd-edge-form .ant-select-selection {
                    border: unset;
                }

                .prograd-edge-form .ant-select-arrow .anticon  {
                    color: var(--sandstone);
                }

                .prograd-edge-form .ant-select-selection:hover {
                    border-color: unset;
                }

                .prograd-edge-form .work-status .ant-form-item-required,
                .prograd-edge-form .laptop-radio .ant-form-item-required,
                .prograd-edge-form .stable-internet-radio .ant-form-item-required,
                .prograd-edge-form .ant-radio-wrapper {
                    font-weight: 400;
                    font-size: 16px;
                    font-family: 'Open Sans', sans-serif;
                    color: var(--dove);
                }

                .prograd-edge-form .ant-radio-inner {
                    border: 2px solid var(--primary);
                    background-color: var(--spider);
                    height: 20px;
                    width: 20px;
                }

                .prograd-edge-form .ant-radio-inner::after {
                    height: 10px;
                    width: 10px;
                }

                .prograd-edge-form .divider {
                    border: 1px solid var(--spider);
                    margin: var(--peaky-gap-32) 0;
                }

                .prograd-edge-form .ant-radio-wrapper:nth-of-type(1) {
                    margin-right: 50px;
                }

                .prograd-edge-form .ant-radio-wrapper span.ant-radio + * {
                    padding-left: var(--peaky-pad-16);
                    padding-right: var(--peaky-pad-16);
                }

                .prograd-edge-form .work-status .ant-form-item,
                .prograd-edge-form .laptop-radio .ant-form-item,
                .prograd-edge-form .stable-internet-radio .ant-form-item {
                    margin-bottom: var(--peaky-gap-8);
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

                .information-consent-wrapper .information-consent {
                    color: rgba(255, 255, 255, 0.87);
                    font-size: 14px;
                    white-space: pre-wrap;
                }

                .information-consent-wrapper {
                    margin: var(--peaky-gap-8) 0 var(--peaky-gap-32);
                }

                .mobile-group .ant-row.ant-form-item {
                    width: 100%;
                }

                .prograd-edge-form .ant-input:focus,
                .prograd-edge-form .intl-tel-input input:focus,
                .prograd-edge-form .intl-tel-input.allow-dropdown input:focus,
                .prograd-edge-form .ant-select-focused .ant-select-selection, 
                .prograd-edge-form .ant-select-selection:focus, 
                .prograd-edge-form .ant-select-selection:active
                .prograd-edge-form .ant-select-selection--single:focus {
                    box-shadow: none;
                    border: 2px solid var(--primary) !important;
                }


                @media only screen and (max-device-width: 760px) {
                    .prograd-edge-form .input-group,
                    .prograd-edge-form .form-block,
                    .prograd-edge-form .intl-tel-input,
                    .prograd-edge-form .intl-tel-input.allow-dropdown input {
                        width: 100%;
                    }

                    .information-consent-wrapper .information-consent {
                        white-space: unset;
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

const ProgradEdgeForm = Form.create<FormBlockProps>({name: ""})(FormBlock);
export default ProgradEdgeForm;