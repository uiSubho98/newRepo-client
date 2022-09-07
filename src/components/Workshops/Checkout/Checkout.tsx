import React, { useEffect, useState } from "react";
import { Button, Input } from "antd";
import { SafetyOutlined } from "@ant-design/icons";
import { FREE_COURSE_ENCRYPTION, G_API_URL, G_URL } from "../../../constants/constants";
import { __getToken } from "../../../utils/user-details.util";
import axios from "axios";
import queryString from "query-string";
import moment from 'moment-timezone';
import keys from '../../../config/keys';
import prograd_logo from '../../../assets/brand/prograd_box_logo.png';
import { encrypt } from "../../../utils/encryption.util";
import { __getCookie } from "../../../utils/cookie.util";

interface IState {
    couponCode: string;
    showCouponBox: boolean;
    couponClass: string;
    couponValidTxt: string;
    couponValidating: boolean;
    loading: boolean;
    finalPrice: any;
    discount: any;
}

interface ICoupon {
    discount: string;
}

interface IProps {
    userInfo: any;
    title: string;
    startTime: number;
    price: number;
    workshopKey: string;
    workshopType: string;
    workshopPrice: number;
}

const Checkout = (props: IProps) => {
    const defaultState = {
        couponCode: "",
        showCouponBox: false,
        couponClass: "",
        couponValidTxt: "",
        couponValidating: false,
        loading: false,
        finalPrice: props.price / 100,
        discount: "-"
    }
    const [state, setState] = useState<IState>(defaultState);

    const { title, startTime, price, workshopKey, workshopType, userInfo } = props;

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    }, [])

    const handleChange = (event: any) => {
        const value = event.target.value;
        setState(prev => (
            {...prev, couponCode: value}
        ))
    }

    const calculateDiscount = (couponData:ICoupon) => {
        const planPrice = price/100;
        let discountPrice = (planPrice * parseFloat(couponData.discount)) / 100;
        let finalPrice = planPrice - discountPrice;
        setState(prev => ({
            ...prev,
            finalPrice: parseFloat(finalPrice.toString()).toFixed(2),
            discount: parseFloat(discountPrice.toString()).toFixed(2)
        }))
    }

    const validateCoupon = () => {

        const {couponCode} = state;

        setState(prev => (
            {...prev, couponValidating:true}
        ));

        // Make API to check validity of the Coupon
        const config = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": __getToken()
            }
        };

        const data = {
            mode: "VALIDATE_COUPON",
            coupon: couponCode,
            courseId: 2000,
            programType: 'workshop'
        }
        // API Call - to validate Coupon
        axios
            .post(G_API_URL + 'coupon/validate/workshop', queryString.stringify(data), config)
            .then(response => {
                if (response.data.status === 1) {
                    setState(prev => ({
                        ...prev,
                        couponValidating: false,
                        couponValidTxt: "You’ve applied the coupon successfully!",
                        couponClass: "valid-coupon"
                    }));
                    // Calculate Coupon Discount
                    calculateDiscount(response.data.data);
                } else {
                    setState(prev => ({
                        ...prev,
                        couponValidating: false,
                        couponValidTxt: "The coupon code entered is not valid",
                        couponClass: "invalid-coupon"
                    }));
                    calculateDiscount({ discount: "0" });
                }
            })
            .catch(err => {
                setState(prev => (
                    {
                        ...prev,
                        couponCode: "",
                        discount: "0",
                        couponClass: "invalid-coupon",
                        couponValidTxt: "The coupon code entered is not valid",
                        couponValidating: false
                    }
                ))
                console.log(err);
            });
    }

    const paymentHandler = (orderResponse: any, regData:any) => {

        const { couponCode } = state;
        if (orderResponse.status !== 0) {

            const {orderId, rzOrderId, userName, email, prefix, mobileNumber, workshopPrice, sourcePath} = orderResponse.data;

            const config = {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
            setState(prev => ({
                ...prev,
                loading: true
            }));
            let options = {
                order_id: rzOrderId,
                key: keys.rpSecretKey,
                name: "ProGrad",
                description: title,
                image: prograd_logo,
                handler: function (response: any) {
                    const data = {
                        paymentId: response.razorpay_payment_id,
                        signature: response.razorpay_signature,
                        rzOrderId: response.razorpay_order_id,
                        orderId: orderId,
                        prefix: prefix,
                        mobileNumber: mobileNumber,
                        userName: userName,
                        email: email,
                        workshopPrice: state.finalPrice,
                        source: __getCookie('utm_source').cookieExists ? __getCookie('utm_source').cookieValue : 'Organic',
                        sourcePath: sourcePath,
                        workshopType: workshopType,
                        couponCode: couponCode
                    };

                    axios
                        .post(G_API_URL + `workshops/payment/${workshopKey}`, queryString.stringify(data), config)
                        .then(res => {
                            if (res.data.status === 1) {

                                axios
                                    .post(G_API_URL + `workshops/register/${workshopKey}`, queryString.stringify(regData), config)
                                    .then(response => {
                                        if (response.data.status === 1) {

                                            // setState(prev => ({
                                            //     ...prev,
                                            //     loading: false
                                            // }));

                                            // const args = {
                                            //     message: response.data.message,
                                            //     description: '',
                                            //     duration: 6,
                                            //     top: 0,
                                            //     className: 'success-notification-top',
                                            //     getContainer: () => document.querySelector('.ant-modal-header')
                                            // };
                                            // notification.open(args);

                                            // Send Registration Success Event to GA
                                            // ReactGA.event({
                                            //     category: 'Webinar',
                                            //     action: 'webinar_registration_success',
                                            //     label: window.location.pathname + window.location.search
                                            // })

                                            let redUrl = G_URL + 'workshop/register/success?workshopKey=' + response.data.data.workshopKey;

                                            setTimeout(() => {
                                                setState(prev => ({
                                                    ...prev,
                                                    loading: false
                                                }));
                                                window.location.href = decodeURIComponent(redUrl);
                                            }, 1000);

                                        } else {
                                            setState(prev => ({
                                                ...prev,
                                                loading: false
                                            }));
                                            // const args = {
                                            //     message: response.data.message,
                                            //     description: '',
                                            //     duration: 6,
                                            //     top: 0,
                                            //     className: 'failure-notification-top',
                                            //     getContainer: () => document.querySelector('.ant-modal-header')
                                            // };
                                            // notification.open(args);
                                        }

                                    })
                                    .catch(err => {
                                        console.log(err);
                                    });
                            } else {
                                setState(prev => ({
                                    ...prev,
                                    loading: false
                                }));
                            }
                        });
                },
                prefill: {
                    name: userName,
                    email: email,
                    contact: mobileNumber
                },
                notes: {
                    address: "Team ProGrad"
                },
                theme: {
                    color: "#f50a5f"
                },
                modal: {
                    ondismiss: () => {
                        setState(prev => ({
                            ...prev,
                            loading: false
                        }));
                    }
                }
            };
            
            if (workshopPrice !== 0) {
                let rzp = new window.Razorpay(options);
                rzp.open();
            } else {
                const data = {
                    paymentId: encrypt(`${FREE_COURSE_ENCRYPTION}_hmc_${parseInt((new Date().getTime() / 1000).toString())}`),
                    signature: encrypt(FREE_COURSE_ENCRYPTION + "_hmc_" + couponCode),
                    rzOrderId: rzOrderId,
                    orderId: orderId,
                    prefix: prefix,
                    mobileNumber: mobileNumber,
                    userName: userName,
                    email: email,
                    workshopPrice: state.finalPrice,
                    source: __getCookie('utm_source').cookieExists ? __getCookie('utm_source').cookieValue : 'Organic',
                    sourcePath: sourcePath,
                    workshopType: workshopType,
                    couponCode: couponCode
                };

                axios
                    .post(G_API_URL + `workshops/payment/${workshopKey}`, queryString.stringify(data), config)
                    .then(res => {
                        if (res.data.status === 1) {

                            axios
                                .post(G_API_URL + `workshops/register/${workshopKey}`, queryString.stringify(regData), config)
                                .then(response => {
                                    if (response.data.status === 1) {

                                        setState(prev => ({
                                            ...prev,
                                            loading: false
                                        }));

                                        // const args = {
                                        //     message: response.data.message,
                                        //     description: '',
                                        //     duration: 6,
                                        //     top: 0,
                                        //     className: 'success-notification-top',
                                        //     getContainer: () => document.querySelector('.ant-modal-header')
                                        // };
                                        // notification.open(args);

                                        // Send Registration Success Event to GA
                                        // ReactGA.event({
                                        //     category: 'Webinar',
                                        //     action: 'webinar_registration_success',
                                        //     label: window.location.pathname + window.location.search
                                        // })

                                        let redUrl = G_URL + 'workshop/register/success?workshopKey=' + response.data.data.workshopKey;

                                        setTimeout(() => {
                                            window.location.href = decodeURIComponent(redUrl);
                                        }, 1000);

                                    } else {
                                        setState(prev => ({
                                            ...prev,
                                            loading: false
                                        }));
                                        // const args = {
                                        //     message: response.data.message,
                                        //     description: '',
                                        //     duration: 6,
                                        //     top: 0,
                                        //     className: 'failure-notification-top',
                                        //     getContainer: () => document.querySelector('.ant-modal-header')
                                        // };
                                        // notification.open(args);
                                    }

                                })
                                .catch(err => {
                                    console.log(err);
                                });
                        } else {
                            setState(prev => ({
                                ...prev,
                                loading: false
                            }));
                        }
                    });
            }
        }
    }

    const createOrder = () => {
        // // Get webinar url path
        // let webinarPathUrl = window.location.pathname;
        // webinarPathUrl = webinarPathUrl[0] === '/' ? webinarPathUrl.slice(1) : webinarPathUrl;
        // // Get source
        // let source = getSearchParam('source');
        // if (source === undefined || source === '' || source === null) {
        //     source = 'Organic';
        // }

        let data = {
            ...userInfo,
            workshopKey,
            workshopPrice: state.finalPrice
        }

        const config = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        };
        setState(prev => ({
            ...prev,
            loading: true
        }));
        // createOrder API Call - to Create the order on RazorPay
        axios
            .post(G_API_URL + `workshops/order/${workshopKey}`, queryString.stringify(data), config)
            .then(response => {
                if (response.data.status === 1) {
                    // setState({orderPlaced: true});
                    
                    // Send Order Initiation Event to GA
                    // ReactGA.event({
                    //     category: 'Webinar',
                    //     action: 'payment_initiated',
                    //     label: window.location.pathname + window.location.search
                    // })

                    setState(prev => ({
                        ...prev,
                        loading: false
                    }));

                    paymentHandler(response.data, data);

                } else {
                    setState(prev => ({
                        ...prev,
                        loading: false
                    }));
                    // this.openFailureNotification('User already registered');
                }

            })
            .catch(err => {
                console.log(err);
            });
    }

    const renderPlanDetails = () => {
        let feeType = "Workshop entry fee";
        const dateAndTime = moment(startTime * 1000).format("DD MMM YYYY | h:mm A");
        return (
            <>
                <div className="plan-details-container">
                    <div className="plan-details  f-d f-h-sb">
                        <div className="plan-detail-block">
                            <span className="text-medium">{ feeType }</span>
                            <span className="terms-holder"></span>
                        </div>
                        <span className="plan-price-block text-medium strong-text">
                            INR {price/100}
                        </span>
                    </div>
                    <div className="text-small text-faded">
                        { title } | { dateAndTime }
                    </div>
                </div>
            </>
        )
    }

    const toggleApplyCoupon = () => {
        setState(prev => (
            {
                ...prev,
                showCouponBox: true
            }
        ))
    }

    const { couponValidating } = state;

    return (
        <>
            <div className="checkout-content-wrapper g-d g-col-1 g-h-c">
                <div className="checkout-content-container w-100">
                    <h1 className="text-large font-heading w-100">
                        Checkout
                    </h1>
                    <div className="checkout-details-container w-100">
                        <div className="main-block">
                            {renderPlanDetails()}
                            {
                                !state.showCouponBox &&
                                <span className="f-d text-regular strong-text c-pointer apply-coupon text-primary" onClick= {() => toggleApplyCoupon()}>
                                    Apply Coupon
                                </span>
                            }
                            {
                                state.showCouponBox &&
                                <div className="apply-coupon f-d f-v-c">
                                    <Input
                                        className="f-d coupon-input"
                                        value= {state.couponCode}
                                        placeholder= "Coupon Code"
                                        onChange= {handleChange}
                                    />
                                    <Button
                                        className="apply-coupon-btn"
                                        onClick={validateCoupon}
                                        loading={couponValidating}
                                    >
                                        APPLY
                                    </Button>
                                </div>
                            }
                            <span className={`f-d body-small coupon-text 
                            ${state.couponClass}`}>
                                {state.couponValidTxt}
                            </span>
                        </div>
                        <div className="summary">
                            <div className="coupon-discount f-d f-v-c f-h-sb">
                                <span className="title text-medium">Coupon Discount</span>
                                <span className="discount-holder text-medium strong-text">
                                    {state.discount}
                                </span>
                            </div>
                            <div className="total-payable-container f-d f-v-c f-h-sb">
                                <span className="title text-big strong-text">Total Payable</span>
                                <span className="payable-holder text-big strong-text">
                                    INR {state.finalPrice}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="footer f-d f-vt f-v-e">
                        <div className="g-d g-h-e action-element">
                            <Button
                            className="default-blue-btn checkout-btn"
                            type="primary"
                            onClick={() => createOrder()}
                            loading={state.loading}
                            >
                                Pay INR {state.finalPrice}
                            </Button>
                        </div>
                        <div className="g-d g-h-e text-faded secure-txn-text">
                            <span><SafetyOutlined /> Secure Transaction</span>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .checkout-content-wrapper {
                    width: 700px;
                }

                .checkout-content-wrapper .checkout-btn {
                    padding-left: 2rem;
                    padding-right: 2rem;
                    height: 50px !important;
                }

                .checkout-content-wrapper .checkout-details-container {
                    margin-top: var(--peaky-gap-64);
                    border-radius: var(--peaky-br-4);
                    padding: 0;
                    // background-color: var(--primary-bg);
                }

                .checkout-content-wrapper .checkout-details-container .main-block,
                .checkout-content-wrapper .checkout-details-container .summary {
                    padding-bottom: var(--peaky-gap-16);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }

                .checkout-content-wrapper .checkout-details-container .main-block .apply-coupon {
                    margin: var(--peaky-gap-16) 0 0;
                }

                .checkout-content-wrapper .checkout-details-container .summary {
                    padding: 2rem 0;
                }

                .checkout-content-wrapper .checkout-details-container .summary .total-payable-container {
                    margin: var(--peaky-gap-32) 0 0;
                }

                .checkout-content-wrapper .footer {
                    margin: var(--peaky-gap-32) 0 0;
                }

                .checkout-content-wrapper .footer .terms-and-conditions {
                    color: var(--dove);
                    text-decoration: underline;
                }

                .apply-coupon .ant-input {
                    height: 50px;
                    background-color: var(--primary-bg);
                    box-shadow: none;
                    border: none;
                    color: var(--dove);
                    padding: 14px 16px;
                    font-size: 16px;
                }

                .apply-coupon .ant-input:focus,
                .apply-coupon .ant-input:hover {
                    // border-color: var(--purple);
                    box-shadow: unset;
                }

                .apply-coupon {
                    position: relative;
                    margin-top: 1rem;
                    margin-bottom: 1rem;
                }

                .apply-coupon .apply-coupon-btn {
                    position: absolute;
                    right: 10px;
                    border: none;
                    box-shadow: none;
                    outline: none;
                    color: var(--primary);
                    font-family: OpenSans;
                    font-size: 16px;
                    font-weight: 700;
                    background-color: var(--secondary-bg);
                }

                .valid-coupon {
                    color: var(--go) ;
                }
                
                .invalid-coupon {
                    color: var(--facered);
                }
                
                .coupon-text {
                    margin-top: var(--peaky-gap-16);
                }
                
                .checkout-content-wrapper .footer .action-element {
                    margin-top: var(--peaky-gap-32);
                }

                .checkout-content-wrapper .footer .secure-txn-text {
                    margin-top: var(--peaky-gap-16);
                }

                @media only screen and (max-device-width: 760px) {
                    .checkout-content-container,
                    .checkout-content-wrapper,
                    .checkout-content-container .checkout-content-wrapper 
                    .checkout-details-container {
                        width: unset !important;
                    }

                    .checkout-content-wrapper .footer {
                        width: 100%;
                    }

                    .checkout-content-wrapper .footer .action-element {
                        justify-content: start;
                        margin: var(--peaky-gap-16) 0 0;
                    }

                    .checkout-content-wrapper .checkout-details-container
                    .main-block .apply-coupon {
                        width: 100%;
                    }
                }

                @media screen and (min-width: 768px) and 
                (max-width: 1023px) and (orientation: portrait) {
                    .checkout-content-wrapper .checkout-details-container {
                        width: 100%;
                    }

                    .checkout-content-wrapper .footer {
                        width: 100%;
                    }
                }
            `}</style>
        </>
    )
}

export default Checkout;