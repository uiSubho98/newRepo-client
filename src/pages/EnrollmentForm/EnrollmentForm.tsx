import React, {useEffect, useState} from "react";
import {Button, Form, Input, Radio, Select} from "antd";
import {FormComponentProps} from "antd/lib/form/Form";
import {decodeToken, __getEmail, __getToken, __getUID} from "../../utils/user-details.util";
// @ts-ignore
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';
import {__getCookie} from "../../utils/cookie.util";
import axios from "axios";
import {G_API_URL, G_URL} from "../../constants/constants";
import {check_login, login_user} from "../../utils/login.util";
import {openNotification} from "../../utils/common.util";
import queryString from "query-string";
import {encrypt} from "../../utils/encryption.util";
// @ts-ignore
import {useHistory, useLocation} from "react-router-dom";
import DegreeDropDown from "../../components/Onboard/DegreeDropDown";
import StreamDropDown from "../../components/Onboard/StreamDropDown";
// import Verification from "../../components/Onboard/Verification";
import Layout from "../../components/Layout";
// import Spinner from "../../components/Spinner/spinner";

interface IProps extends FormComponentProps {
    userInfo: any;
}

interface IUserNumber {
    prefix: string;
    mobileNumber: string;
}

interface ICountryData {
    dialCode: string;
}

interface ILocationData {
    city?: string;
    country_code?: string;
    country_name?: string;
}

interface IState {
    userNumber: IUserNumber;
    isNumberValid: boolean;
    numberNotEntered: boolean;
    workStatus: number;
    loading: boolean;
    isLoggedIn: boolean;
    isFormFilled: boolean;
    countryCode: string;
    locationData: ILocationData;
    apiData: any;
}

const FormBlock = (props: IProps) => {
    const location = useLocation();
    const history = useHistory();
    if (location.state === undefined || location.state.profile === undefined || location.state.profile === undefined) {
        history.goBack();
    }

    const userInfo = {...location.state.profile, email: __getEmail()};

    const {Option} = Select;
    const {getFieldDecorator, getFieldValue} = props.form;

    const defaultState = {
        isNumberValid: true,
        numberNotEntered: false,
        workStatus: userInfo.workStatus ? userInfo.workStatus : 1,
        loading: false,
        isLoggedIn: false,
        countryCode: '',
        locationData: {},
        userNumber: {
            prefix: '',
            mobileNumber: ''
        },
        apiData: {},
        isFormFilled: false
    }

    const [state, setState] = useState<IState>(defaultState);
    const {
        workStatus,
        loading,
        numberNotEntered,
        isNumberValid,
        userNumber,
        locationData,
    } = state;
    const config = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": __getToken()
        },
    };
    let searchQuery = window.location.search;
    let urlParams = new URLSearchParams(searchQuery);


    useEffect(() => {
        if (check_login()) {
            axios.get(G_API_URL + 'tracker/ip')
                .then((response) => {
                    const {data} = response.data;
                    setState(prev => ({
                        ...prev,
                        countryCode: data.country_code !== null ? `${data.country_code}`.toLowerCase() : 'in',
                        locationData: {...data}
                    }));
                    // Store Country code in storage for auto select
                    // localStorage.setItem('itiAutoCountry', `${data.country_code}`.toLowerCase());
                })
                .catch((error) => console.error(error));
        } else {
            // window.location.href = G_URL + "signup"
        }
    }, [])

    const renderFormFields = () => {
        const getYearOfGraduation = () => {
            let yearOptions = [];
            let maxYear = new Date().getFullYear() + 4;
            for (let i = 2010; i <= maxYear; i++) {
                yearOptions.push(<Option key={i} value={i}>{i}</Option>)
            }
            return yearOptions;
        }
        const handleTypeChange = (e: any) => {
            setState(prev => (
                {
                    ...prev,
                    workStatus: e.target.value
                }
            ))
        }

        const currentYear = new Date().getFullYear();

        return (
            <Layout redirectDisable={true}>
                <div className="g-d g-h-c lr-pad-d lr-pad-m 
                tb-pad-d tb-pad-m onboard-page-container">
                    <div className="input-group g-d g-col-2 g-col-1-m">
                        <div className="form-block">
                            <Form.Item label="First Name">
                                {getFieldDecorator('firstName', {
                                    rules: [{
                                        required: true,
                                        message: 'First Name cannot be empty!'
                                    }],
                                    initialValue: userInfo.firstName
                                })(
                                    <Input placeholder="John" autoComplete="firstname"/>
                                )}
                            </Form.Item>
                        </div>
                        <div className="form-block">
                            <Form.Item label="Last Name">
                                {getFieldDecorator('lastName', {
                                    rules: [{
                                        required: true,
                                        message: 'Last Name cannot be empty!'
                                    }],
                                    initialValue: userInfo.lastName
                                })(
                                    <Input placeholder="Doe" autoComplete="lastname"/>
                                )}
                            </Form.Item>
                        </div>
                        {
                            locationData && locationData.country_name === "India" ?
                                <div
                                    className={`form-block mobile-number ${numberNotEntered ? isNumberValid ? 'has-error' : 'has-error-2' : ''}`}>
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
                                </div> :
                                <div className="form-block">
                                    <Form.Item label="Email">
                                        {getFieldDecorator('email', {
                                            rules: [{
                                                required: true,
                                                message: 'Email cannot be empty!'
                                            }],
                                            initialValue: userInfo.email
                                        })(
                                            <Input placeholder="Enter your email" autoComplete="email"/>
                                        )}
                                    </Form.Item>
                                </div>
                        }
                        <div className="form-block">
                            <DegreeDropDown
                                message="Degree cannot be empty!"
                                name="degree"
                                degree={userInfo.degree}
                                placeholder="Degree"
                                getFieldDecorator={getFieldDecorator}
                                isRequired={true}
                            />
                        </div>
                        <div className="form-block">
                            <StreamDropDown
                                message="Stream cannot be empty!"
                                name="stream"
                                stream={userInfo.stream}
                                placeholder="Stream"
                                getFieldDecorator={getFieldDecorator}
                                isRequired={true}
                            />
                        </div>
                        <div className="form-block">
                            <Form.Item label="College Name">
                                {getFieldDecorator('college', {
                                    rules: [{
                                        required: true,
                                        message: 'College Name cannot be empty!'
                                    }],
                                    initialValue: userInfo.college
                                })(
                                    <Input placeholder="Xavier’s School for the gifted" autoComplete="college"/>
                                )}
                            </Form.Item>
                        </div>
                        <div className="form-block custom-year">
                            <Form.Item label={"Year of graduation"}>
                                {getFieldDecorator('yop', {
                                    rules: [{
                                        required: true,
                                        message: 'Please select your year of graduation'
                                    }],
                                    initialValue: userInfo.yop
                                })(
                                    <Select placeholder="Select">
                                        {getYearOfGraduation()}
                                    </Select>
                                )}
                            </Form.Item>
                        </div>
                        <div/>
                        {
                            getFieldValue("yop") && (
                                getFieldValue("yop") < currentYear &&
                                <>
                                    <div className="form-block work-status">
                                        <Form.Item label="Are you currently working?">
                                            {getFieldDecorator('workStatus', {
                                                rules: [
                                                    {required: true, message: 'Please select an option!'},
                                                ],
                                                initialValue: workStatus
                                            })(
                                                <Radio.Group onChange={(e) => handleTypeChange(e)}>
                                                    <Radio value={1}>Yes</Radio>
                                                    <Radio value={0}>No</Radio>
                                                </Radio.Group>,
                                            )}
                                        </Form.Item>
                                    </div>
                                    {
                                        workStatus === 1 &&
                                        <>
                                            <div></div>
                                            <div className="form-block">
                                                <Form.Item label="Company Name">
                                                    {getFieldDecorator('company', {
                                                        rules: [{
                                                            required: true,
                                                            message: 'Company Name cannot be empty!'
                                                        }],
                                                        initialValue: userInfo.company
                                                    })(
                                                        <Input placeholder="Wipro" autoComplete="company"/>
                                                    )}
                                                </Form.Item>
                                            </div>
                                        </>
                                    }
                                </>
                            )}
                    </div>
                </div>

            </Layout>
        )
    }

    const getRurl = () => {
        let rurl = urlParams.get('rurl');
        rurl = rurl !== null && rurl !== "" ? rurl : "";
        rurl = (rurl.length && rurl[0] === '/') ? rurl.slice(1) : rurl;
        return rurl;
    }

    const handleSubmit = (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();
        props.form.validateFields((err: null | object,
                                   values: any) => {
            if (!err) {
                // Country Data
                const {country_name} = locationData;

                const validInNumber = country_name === "India" ? userNumber.mobileNumber.length === 10 ? true : false :
                    userNumber.mobileNumber !== "NaN" && userNumber.mobileNumber.length >= 4 ? true : false;
                if (country_name !== "India" || (userNumber.mobileNumber !== "" &&
                    validInNumber)) {
                    let formValues = values;

                    // Get url params to set redirection
                    let rurl = getRurl();
                    // let checkRurl = rurl.split('/')[0];
                    let utm_source = __getCookie('utm_source').cookieExists ? __getCookie('utm_source').cookieValue : '';
                    let utm_campaign = __getCookie('utm_campaign').cookieExists ? __getCookie('utm_campaign').cookieValue : '';

                    const data = {
                        ...formValues,
                        uid: __getUID(),
                        rurl: rurl,
                        utm_source: utm_source,
                        utm_campaign: utm_campaign,
                        emailEncrypted: encrypt(formValues.email ? formValues.email : decodeToken().email)
                    }

                    if (country_name === "India") {
                        data.prefix = userNumber.prefix;
                        data.mobileNumber = userNumber.mobileNumber;
                    }

                    // Unix Time Stamp
                    const timeStamp = new Date().getTime();

                    // Store Data in state
                    setState(prev => ({
                        ...prev,
                        loading: true,
                        timeStamp: timeStamp,
                        apiData: data
                    }));
                    // Send OTP API call
                    setTimeout(() => {
                        // if (decodedToken.emailVerified) {
                            registerApi(data);
                        // } else {
                        //     sendOtpApi(data);
                        // }
                    }, 1000);
                } else {
                    setState(prev => ({
                        ...prev,
                        numberNotEntered: true,
                        isNumberValid: false
                    }));
                }

            } else {
                // check for Number
                const {userNumber} = state;
                if (userNumber?.mobileNumber === '') {
                    setState(prev => ({
                        ...prev,
                        numberNotEntered: true
                    }));
                }
            }
        })
    }

    // const updateOtpCredential = (values: any) => {
    //     let updatedData = apiData;
    //     updatedData = {...updatedData, ...values};
    //     if (values.email !== undefined) {
    //         updatedData.emailEncrypted = encrypt(values.email);
    //         setState(prev => ({
    //             ...prev,
    //             apiData: {...updatedData, ...values}
    //         }));
    //     } else {
    //         setState(prev => ({
    //             ...prev,
    //             apiData: {...updatedData, ...values}
    //         }));
    //     }
    //     sendOtpApi(updatedData);
    // }

    // const sendOtpApi = (apiData: any) => {
    //     if (!apiData) {
    //         apiData = state.apiData;
    //     }
    //     const {prefix, mobileNumber, emailEncrypted} = apiData;
    //     const {country_name}: any = state.locationData;

    //     const data = {
    //         prefix: prefix,
    //         mobileNumber: mobileNumber,
    //         email: emailEncrypted,
    //         mode: country_name !== 'India' || prefix !== '91' ? 'email' : 'mobile'
    //     }

    //     axios
    //         .post(G_API_URL + "auth/send-otp/", queryString.stringify(data), config)
    //         .then(response => {
    //             if (response.data.status === 1) {
    //                 openNotification('success', 'Verification code sent successfully', 4);
    //                 setState(prev => ({
    //                     ...prev,
    //                     isFormFilled: true,
    //                     loading: false
    //                 }));
    //             } else {
    //                 openNotification('fail', response.data.message, 4);
    //                 setState(prev => ({
    //                     ...prev,
    //                     loading: false
    //                 }));
    //             }
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             setState(prev => ({
    //                 ...prev,
    //                 loading: false
    //             }));
    //         });
    // }

    // const handleChange = () => {
    //     setState(prev => ({
    //         ...prev,
    //         isFormFilled: false
    //     }));
    // }

    const registerApi = (data: any = undefined) => {
        let {apiData, locationData} = state;
        const {emailEncrypted} = apiData;

        if (data) {
            apiData = data;
        }

        // Set loading
        setState(prev => ({...prev, loading: true}));

        // Send Country in API Data
        apiData['country'] = locationData['country_name'];
        apiData['user_type'] = 1;

        axios.post(G_API_URL + "auth/register/bootcamp", queryString.stringify(apiData), config)
            .then(response => {
                if (response.data.status === 1) {
                    // const {uid} = response.data.data;
                    // const uidMask = `-${uid}-`;

                    // Set loading false
                    setState(prev => ({
                        ...prev,
                        registrationStatus: false
                    }));
                    // Show success notification
                    openNotification('success', 'Details saved successfully', 2);

                    // Set temporary identity key in storage to do auto login
                    localStorage.setItem('encIK', emailEncrypted);

                    // for NOW send emailKey and rurl to auto login
                    // autoLogin(emailEncrypted, rurl, scheduleWorkshop, slug);
                    login_user({token: response.data.data});

                    // Env
                    // const platformEnv = process.env.REACT_APP_PLATFORM;

                    // if (platformEnv === 'prod') {
                    //     const tag = getGATag("free_experience_registered",
                    //         "subscribers", "Microdegree", 1);
                    //     document.body.appendChild(tag);
                    // }

                    setTimeout(() => {
                        window.location.href = G_URL + 'learning-dashboard/bootcamp';
                    }, 1000);
                } else {
                    // Set Loading false
                    setState(prev => ({...prev, loading: false}));
                    // Show Failure Notification
                    openNotification('fail', response.data.message, 4);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <>
            <>
                <div className="text-c-d">
                    <h1 className="font-heading text-xxl heading">
                        Before you start learning ...
                    </h1>
                    <span className="f-d f-h-c text-medium description">
                        Please tell us a bit about yourself to get started
                    </span>
                </div>
                <Form className="prograd-form" onSubmit={handleSubmit}>
                    {renderFormFields()}
                    <div className="g-d g-h-c action-block-wrapper">
                        <Button
                            className="save-btn text-regular c-pointer"
                            htmlType="submit"
                            loading={loading}
                        >
                            Save and continue
                        </Button>
                    </div>
                </Form>
            </>
            <style jsx>{`

              .prograd-form {
                margin: 0 0 var(--peaky-gap-128);
              }

              .prograd-form .input-group {
                grid-column-gap: 4rem;
                margin: var(--peaky-gap-24) 0 0;
                width: max-content;
              }

              .prograd-form .form-block {
                width: 300px;
              }

              .prograd-form .form-block input,
              .prograd-form .ant-select-selection--single {
                background-color: #383838;
                border-radius: var(--peaky-br-2);
                color: var(--dove);
                font-weight: 300;
                height: 50px;
                padding: 0 var(--peaky-pad-16);
              }

              .prograd-form .form-block
              .ant-select-search__field__wrap input {
                padding: 0 !important;
              }

              .prograd-form .form-block input:focus {
                background-color: #383838 !important;
              }

              .prograd-form .form-block input::placeholder,
              .prograd-form .intl-tel-input input::placeholder,
              .prograd-form .ant-select-selection__placeholder {
                color: var(--dove);
                opacity: 0.38;
              }

              .prograd-form .ant-form-item-required::before,
              .prograd-form .ant-form-item-label > label::after {
                margin: unset;
                content: unset;
              }

              .prograd-form .ant-form-item-label > label {
                color: var(--dove);
                font-weight: 600;
                opacity: 0.87;
              }

              .prograd-form .ant-input {
                border: unset;
                border-radius: unset;
                font-size: 16px;
              }

              .prograd-form .ant-input:focus {
                box-shadow: none;
              }

              .prograd-form input:-webkit-autofill,
              .prograd-form input:-webkit-autofill:hover,
              .prograd-form input:-webkit-autofill:focus,
              .prograd-form input:-webkit-autofill:active {
                -webkit-transition: "color 9999s ease-out, background-color 9999s ease-out";
                -webkit-transition-delay: 9999s;
              }

              .prograd-form .intl-tel-input.allow-dropdown input {
                border: none;
                color: var(--dove);
                font-size: 16px;
                width: 300px;
              }

              .prograd-form .intl-tel-input.allow-dropdown input:focus {
                border: none;
                box-shadow: none;
              }

              .prograd-form .intl-tel-input .country-list {
                z-index: 5;
              }

              .prograd-form .intl-tel-input,
              .prograd-form .intl-tel-input .country-list {
                width: inherit;
              }

              .prograd-form .intl-tel-input input {
                height: 50px;
                border-radius: var(--peaky-br-4);
                border: 1px solid #d9d9d9;
                width: 100%;
                font-weight: 300;
                color: var(--carbon);
                transition: all 0.4s;
              }

              .prograd-form .intl-tel-input input:hover,
              .prograd-form .intl-tel-input input:focus {
                border-color: var(--purple);
              }

              .prograd-form .intl-tel-input input:focus,
              .prograd-form .intl-tel-input .selected-flag {
                outline: none;
              }

              .prograd-form .intl-tel-input .country-list
              .country.highlight {
                background-color: var(--charcoal);
              }

              .prograd-form .intl-tel-input .selected-flag {
                width: 50px;
              }

              .prograd-form .intl-tel-input input::placeholder {
                font-weight: 400;
              }

              .prograd-form .intl-tel-input input::placeholder,
              .prograd-form .intl-tel-input .country-list .country {
                font-family: "Open Sans", sans-serif;
              }

              .prograd-form .intl-tel-input
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
                font-weight: 400;
                font-family: "Open Sans", sans-serif;
                color: var(--organred);
                position: absolute;
                top: 40px;
                left: 0;
              }

              .prograd-form .intl-tel-input .country-list {
                z-index: 5;
                overflow-x: hidden;
                background-color: #383838;
                color: var(--dove);
                border: 1px solid var(--crow);
              }

              .prograd-form .ant-select-selection--single {
                padding: unset;
                font-size: 16px;
              }

              .prograd-form .ant-select-selection__rendered {
                line-height: 50px;
                margin-left: var(--peaky-gap-16);
              }

              .prograd-form .ant-select-selection {
                border: unset;
              }

              .prograd-form .ant-select-arrow .anticon {
                color: var(--sandstone);
              }

              .prograd-form .ant-select-selection:hover {
                border-color: unset;
              }

              .prograd-form .work-status .ant-form-item-required,
              .prograd-form .laptop-radio .ant-form-item-required,
              .prograd-form .stable-internet-radio .ant-form-item-required,
              .prograd-form .ant-radio-wrapper {
                font-weight: 400;
                font-size: 16px;
                font-family: 'Open Sans', sans-serif;
                color: var(--dove);
              }

              .prograd-form .ant-radio-inner {
                border: 2px solid var(--primary);
                background-color: var(--spider);
                height: 20px;
                width: 20px;
              }

              .prograd-form .ant-radio-inner::after {
                height: 10px;
                width: 10px;
              }

              .prograd-form .divider {
                border: 1px solid var(--spider);
                margin: var(--peaky-gap-32) 0;
              }

              .prograd-form .ant-radio-wrapper:nth-of-type(1) {
                margin-right: 50px;
              }

              .prograd-form .ant-radio-wrapper span.ant-radio + * {
                padding-left: var(--peaky-pad-16);
                padding-right: var(--peaky-pad-16);
              }

              .prograd-form .work-status .ant-form-item,
              .prograd-form .laptop-radio .ant-form-item,
              .prograd-form .stable-internet-radio .ant-form-item {
                margin-bottom: var(--peaky-gap-8);
              }

              .prograd-form .action-block-wrapper {
                background: var(--spider);
                bottom: 0;
                left: 0;
                position: fixed;
                padding: var(--peaky-pad-16) 0;
                width: 100%;
              }

              .prograd-form .action-block-wrapper
              .save-btn {
                background: linear-gradient(180deg, #0E7DED 1.47%, #1739E6 101.42%);
                border: none;
                border-radius: var(--peaky-br-2);
                color: var(--dove);
                height: 50px;
                padding: 0 var(--peaky-pad-32);
              }

              .ant-select-dropdown {
                background-color: var(--spider) !important;
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
                    .prograd-form .input-group,
                    .prograd-form .form-block,
                    .prograd-form .intl-tel-input,
                    .prograd-form .intl-tel-input.allow-dropdown input {
                    width: 100%;
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

const EnrollmentForm = Form.create<IProps>({name: ""})(FormBlock);
export default EnrollmentForm;