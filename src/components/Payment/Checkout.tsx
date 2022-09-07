import React,{ useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
// @ts-ignore
import { loadStripe } from "@stripe/stripe-js";
import { Button, Input, Modal, Checkbox } from "antd";
import axios from "axios";
import queryString from "query-string";
import prograd_logo from '../../assets/brand/prograd_box_logo.png';
import { __getToken, decodeToken } from "../../utils/user-details.util";
import { getGATag, getSearchParam, openNotification } from "../../utils/common.util";
import {encrypt} from '../../utils/encryption.util';
import {FREE_COURSE_ENCRYPTION, G_URL, G_API_URL, G_API_PHP, RZP_KEY, STRIPE_P_KEY } from "../../constants/constants";
import StripeBlock from '../Stripe/StripeBlock';
import { __getCookie } from "../../utils/cookie.util";
import { SafetyOutlined } from "@ant-design/icons";


const stripePromise = loadStripe(STRIPE_P_KEY);


declare global {
    interface Window {
        Razorpay:any;
    }
}

interface ICoupon {
    discount: string;
}

interface ITarget {
    target: HTMLInputElement;
}

interface IPlanDetails {
    symbol: string;
    courseName: string;
    selectedSlot: string;
    planPrice: number;
    name: string;
    termIds: string;
    terms: string;
    planId: string;
    planMode: string;
    userTimeZone: string;
    countryCode: string;        
    termsIds: string
    courses: string
    termNames: Array<string>
    courseTermMap: string
    paymentOption?: string
    subDesc?: string
}

interface IProps {
    planDetails: IPlanDetails;
    paymentCompleted: Function;
    programType: string;
    international_status: boolean;
    country: boolean;
}

interface IDecodedToken {
    uid: number;
    name: string;
    email: string;
}

interface IState {
    loading: boolean;
    couponValidating: boolean;
    couponCode:  string;
    discount:  string;
    finalPrice:  string;
    orderPlaced: boolean;
    paymentVerified: boolean;
    decodedToken: IDecodedToken;
    couponValidTxt: string;
    couponClass: string;
    showCouponBox: boolean;
    isPayPal: boolean;
    stripeOrderRes: any;
}

const Checkout = (props:IProps) => {

    const {planDetails, programType} = props;

    const defaultState = {
        loading: false,
        couponValidating: false,
        couponCode: '',
        discount: '-',
        finalPrice: '',
        orderPlaced: false,
        paymentVerified: false,
        decodedToken: {
            uid:0,
            name:"",
            email:""
        },
        couponValidTxt: '',
        couponClass: 'invalid-coupon',
        showCouponBox: false,
        isPayPal: false,
        stripeOrderRes: {}
    }

    const [state, setState] = useState<IState>(defaultState);
    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const [tncChecked, setTncChecked] = useState<boolean>(false);

    useEffect(() => {
        let decodedToken = decodeToken();
        setState(prev => ({...prev,decodedToken}));
        // Initialize RazorPay
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    },[])

    const renderPlanDetails = () => {
        let sellingPrice = planDetails.planPrice.toString() ?? "";
        let feeType = "Bootcamp Fees";
        if(planDetails.symbol.toLowerCase() === "inr") {
            sellingPrice = planDetails.planPrice.toLocaleString('en-IN');
        }
        if(programType === "microdegree") {
            feeType = "Microdegree " + planDetails.paymentOption!.charAt(0).toUpperCase() + planDetails.paymentOption!.slice(1) + " Fees";
        }
        return (
            <>
                <div className="plan-details-container">
                    <div className="plan-details  f-d f-h-sb">
                        <div className="plan-detail-block">
                            <span className="text-medium">{ feeType }</span>
                            <span className="terms-holder"></span>
                        </div>
                        <span className="plan-price-block text-medium strong-text">
                            {planDetails.symbol} {sellingPrice}
                        </span>
                    </div>
                    <div className="text-small text-faded">{planDetails.subDesc}</div>
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

    const handleChange = (event:ITarget) => {
        const value = event.target.value;
        setState(prev => (
            {...prev, couponCode: value}
        ))
    }

    const calculateDiscount = (couponData:ICoupon) => {
        const { planDetails } = props;
        let discountPrice = (planDetails.planPrice * parseFloat(couponData.discount)) / 100;
        let finalPrice = planDetails.planPrice - discountPrice;
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
            programType: programType
        }
        // API Call - to validate Coupon
        axios
            .post(G_API_PHP + 'subscription/validate-coupon/', queryString.stringify(data), config)
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

    const createOrder = () => {
        const {finalPrice, couponCode, decodedToken} = state;
        const {planDetails, international_status, country} = props;

        let utm_source = __getCookie('utm_source').cookieExists ? __getCookie('utm_source').cookieValue : '';
        let utm_campaign = __getCookie('utm_campaign').cookieExists ? __getCookie('utm_campaign').cookieValue : '';

        // Set Loading status
        setState(prev=> ({...prev, loading:true}));

        // Get source
        let source = getSearchParam('source');
        if (source === undefined || source === '' || source === null) {
            source = 'Organic';
        }

        const config = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": __getToken()
            }
        };

        const data = {
            uid: decodedToken.uid,
            email: decodedToken.email,
            purchaseMode: planDetails.paymentOption ?? planDetails.planMode,
            courseId: planDetails.planId,
            termIds: planDetails.termIds,
            courseName: planDetails.courseName,
            termNames: planDetails.terms,
            courseNames: planDetails.courses,
            purchasePrice: finalPrice !== '' ? finalPrice : planDetails.planPrice,
            couponCode: couponCode,
            pageSource: source,
            international_status: international_status,
            country: country,
            symbol: planDetails.symbol,
            selectedSlot: planDetails.selectedSlot,
            userTimeZone: planDetails.userTimeZone,
            courseTermMap: planDetails.courseTermMap,
            paymentOption: planDetails.paymentOption,
            utm_source,
            utm_campaign
        }

        // createOrder API Call - to Create the order on RazorPay
        axios
            .post(G_API_URL + `program/order`, queryString.stringify(data), config)
            .then(response => {
                if (response.data.status === 1) {
                    setState(prev => ({
                        ...prev,
                        loading: false,
                        orderPlaced: true,
                    }));

                    // Send Payment Initiation Event to GA
                    // ReactGA.event({
                    //     category: `${planDetails.planMode} subscribers`,
                    //     action: 'payment_initiated',
                    //     label: planDetails.courseName,
                    //     value: 0
                    // });

                    // Env
                    const platformEnv = process.env.REACT_APP_PLATFORM;

                    if (platformEnv === 'prod') {
                        const tag = getGATag(planDetails.planMode+"_payment_initiated",
                        planDetails.planMode+" subscribers",planDetails.courseName,0);
                        document.body.appendChild(tag);
                    }

                    // Check for international_status if true -> Stripe else -> RazorPay
                    if (international_status) {
                        // Set Client Secret to process the payment
                        if(parseInt(response.data.data.purchasePrice)>=1) {
                            setState(prev => ({
                                ...prev,
                                stripeOrderRes: response.data.data,
                                showStripeModal: true
                            }));
                        } else {
                            //Logic for handling payment if amount is 0
                            const data_payment = {
                                stripeOrderId: encrypt(`${FREE_COURSE_ENCRYPTION}_hmc_${parseInt((new Date().getTime() / 1000).toString())}`),
                                orderId: response.data.data.orderId,
                                couponCode: couponCode,
                                uid: decodedToken.uid,
                                name: decodedToken.name,
                                email: decodedToken.email,
                                termIds: planDetails.termIds,
                                termNames: planDetails.terms,
                                courseId: planDetails.planId,
                                purchaseMode: planDetails.paymentOption ?? planDetails.planMode,
                                selectedSlot: planDetails.selectedSlot,
                                userTimeZone: planDetails.userTimeZone,
                                signature: encrypt(FREE_COURSE_ENCRYPTION + "_hmc_" + couponCode),
                                purchasePrice:parseInt(response.data.data.purchasePrice),
                                paymentOption: planDetails.paymentOption
                            };
                            axios
                                .post(G_API_URL + `program/stripe/confirm`, queryString.stringify(data_payment), config)
                                .then(res => {
                                    if (res.data.status === 1) {
                                        // Send Payment Success Event to GA
                                        // ReactGA.event({
                                        //     category: `${planDetails.planMode} subscribers`,
                                        //     action: 'payment_success',
                                        //     label: planDetails.courseName,
                                        //     value: parseInt(response.data.data.purchasePrice)
                                        // });

                                        // Env
                                        const platformEnv = process.env.REACT_APP_PLATFORM;

                                        if (platformEnv === 'prod') {
                                            const tag = getGATag(planDetails.planMode+"_payment_success",
                                            planDetails.planMode+" subscribers",planDetails.courseName,
                                            parseInt(response.data.data.purchasePrice));
                                            document.body.appendChild(tag);
                                        }

                                        // // Send Payment Success Event to Pixel
                                        // ReactPixel.track('Purchase', {
                                        //     currency: planDetails.symbol,
                                        //     value: parseInt(response.data.data.purchasePrice),
                                        //     content_category: planDetails.courseName,
                                        //     content_type: planDetails.planMode
                                        // });

                                        // // Send Payment Success to Google Ads
                                        // const s1 = document.createElement("script");
                                        // s1.type = "text/javascript";
                                        // s1.async = true;
                                        // s1.innerHTML =
                                        //     "gtag('event', 'Purchase', { 'send_to': 'AW-611372314/h0ScCKzVn9kBEJqaw6MC','value': "
                                        //     + parseInt(response.data.data.purchasePrice) + ", 'currency': '" + planDetails.symbol + "', 'transaction_id': '" + response.data.data.orderId + "' });";
                                        // document.body.appendChild(s1);

                                        // // Send Payment Success to Quora
                                        // const s2 = document.createElement("script");
                                        // s2.type = "text/javascript";
                                        // s2.async = true;
                                        // s2.innerHTML = "qp('track', 'Purchase');";
                                        // document.body.appendChild(s2);

                                        // Redirect to Success Page - 1s Delay so tracking scripts executes
                                        setTimeout(() => {
                                            window.location.href = G_URL + 'payment/success/' + planDetails.planMode + "/" + planDetails.planId + "/";
                                        }, 1000);
                                    } else {
                                        // If payment verification failed
                                        openNotification('fail', res.data.message, 4, 54);
                                    }
                                })
                                .catch(err => {
                                    console.log(err);
                                });
                        }
                        // Complete Stripe Payment
                    } else {
                        // Process the payment with RazorPay
                        paymentHandler(response.data);
                    }

                } else {
                    setState(prev=> ({...prev, loading:false}));
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    const paymentHandler = (orderResponse:any) => {
        const {decodedToken, couponCode} = state;
        const {planDetails, paymentCompleted,programType} = props;

        // Set Loading again while payment verification in progress
        setState(prev => ({...prev,loading: true}));

        if (orderResponse.status !== 0) {

            const {orderId, rzOrderId, courseId, purchasePrice, purchaseMode, orderType, uid, source} = orderResponse.data;
            
            const config = {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": __getToken()
                }
            }

            let options = {
                order_id: rzOrderId,
                key: RZP_KEY,
                name: "ProGrad",
                description: planDetails.courseName,
                image: prograd_logo,
                handler: (response:any) => {
                    const data = {
                        paymentId: response.razorpay_payment_id,
                        signature: response.razorpay_signature,
                        rzOrderId: response.razorpay_order_id,
                        orderId: orderId,
                        purchasePrice: purchasePrice,
                        source: source,
                        couponCode: couponCode,
                        uid: uid,
                        name: decodedToken.name,
                        email: decodedToken.email,
                        termIds: planDetails.terms,
                        termNames: planDetails.termNames,
                        courseNames: planDetails.courses,
                        courseId: courseId,
                        purchaseMode: purchaseMode,
                        orderType: orderType,
                        selectedSlot: planDetails.selectedSlot,
                        userTimeZone: planDetails.userTimeZone,
                        courseTermMap: planDetails.courseTermMap,
                        paymentOption: planDetails.paymentOption
                    };
                axios
                    .post(G_API_URL + `program/payment`, queryString.stringify(data), config)
                    .then(res => {
                        if (res.data.status === 1) {
                            // Send Payment Success Event to GA
                            // ReactGA.event({
                            //     category: `${purchaseMode} subscribers`,
                            //     action: 'payment_success',
                            //     label: planDetails.courseName,
                            //     value: purchasePrice * 1
                            // });
                                            // Env
                            const platformEnv = process.env.REACT_APP_PLATFORM;

                            if (platformEnv === 'prod') {
                                const tag = getGATag(planDetails.planMode+"_payment_success",
                                planDetails.planMode+" subscribers",
                                planDetails.courseName, purchasePrice * 1);
                                document.body.appendChild(tag);
                            }

                            // Send Payment Success Event to Pixel
                            // ReactPixel.track('Purchase', {
                            //     currency: planDetails.symbol,
                            //     value: purchasePrice * 1,
                            //     content_category: planDetails.courseName,
                            //     content_type: planDetails.planMode
                            // });

                            // // Send Payment Success to Google Ads
                            // const s1 = document.createElement("script");
                            // s1.type = "text/javascript";
                            // s1.async = true;
                            // s1.innerHTML =
                            //     "gtag('event', 'Purchase', { 'send_to': 'AW-611372314/h0ScCKzVn9kBEJqaw6MC','value': "
                            //     + (purchasePrice * 1) + ", 'currency': '" + planDetails.symbol + "', 'transaction_id': '" + orderId + "' });";
                            // document.body.appendChild(s1);

                            // // Send Payment Success to Quora
                            // const s2 = document.createElement("script");
                            // s2.type = "text/javascript";
                            // s2.async = true;
                            // s2.innerHTML = "qp('track', 'Purchase');";
                            // document.body.appendChild(s2);

                            // Set payment status
                            setState(prev => ({
                                ...prev,
                                paymentVerified: true
                            }));

                            // Sidebar Status Check
                            paymentCompleted(true);

                            // Redirect to Success Page - 1s Delay so tracking scripts executes
                            setTimeout(() => {
                                setState(prev => ({
                                    ...prev,
                                    loading: false
                                }));
                                window.location.href = G_URL + 'payment/success/'+programType;
                            }, 1000);
                        } else {
                            // If payment verification failed
                            openNotification('fail', res.data.message, 4, 54);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
                },
                prefill: {
                    name: decodedToken.name,
                    email: decodedToken.email,
                    contact: ''
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
            if (purchasePrice * 1 >= 1) {
                let rzp = new window.Razorpay(options);
                rzp.open();
            } else {
                const data = {
                    paymentId: encrypt(`${FREE_COURSE_ENCRYPTION}_hmc_${parseInt((new Date().getTime() / 1000).toString())}`),
                    signature: encrypt(FREE_COURSE_ENCRYPTION + "_hmc_" + couponCode),
                    rzOrderId: rzOrderId,
                    orderId: orderId,
                    purchasePrice: purchasePrice,
                    source: source,
                    couponCode: couponCode,
                    uid: uid,
                    name: decodedToken.name,
                    email: decodedToken.email,
                    termIds: planDetails.terms,
                    termNames: planDetails.termNames,
                    courseNames: planDetails.courses,
                    courseId: courseId,
                    purchaseMode: purchaseMode,
                    selectedSlot: planDetails.selectedSlot,
                    userTimeZone: planDetails.userTimeZone,
                    courseTermMap: planDetails.courseTermMap,
                    paymentOption: planDetails.paymentOption
                };

            axios
                .post(G_API_URL + `program/payment`, queryString.stringify(data), config)
                .then(res => {
                    if (res.data.status === 1) {
                        // Send Payment Success Event to GA
                        // ReactGA.event({
                        //     category: `${purchaseMode} subscribers`,
                        //     action: 'payment_success',
                        //     label: planDetails.courseName,
                        //     value: purchasePrice * 1
                        // });
                        // Env
                        const platformEnv = process.env.REACT_APP_PLATFORM;

                        if (platformEnv === 'prod') {
                            const tag = getGATag(planDetails.planMode+"_payment_success",
                            planDetails.planMode+" subscribers",
                            planDetails.courseName, purchasePrice * 1);
                            document.body.appendChild(tag);
                        }

                        // Send Payment Success Event to Pixel
                        // ReactPixel.track('Purchase', {
                        //     currency: planDetails.symbol,
                        //     value: purchasePrice * 1,
                        //     content_category: planDetails.courseName,
                        //     content_type: planDetails.planMode
                        // });

                        // Send Payment Success to Google Ads
                        // const s1 = document.createElement("script");
                        // s1.type = "text/javascript";
                        // s1.async = true;
                        // s1.innerHTML =
                        //     "gtag('event', 'Purchase', { 'send_to': 'AW-611372314/h0ScCKzVn9kBEJqaw6MC','value': "
                        //     + (purchasePrice * 1) + ", 'currency': '" + planDetails.symbol + "', 'transaction_id': '" + orderId + "' });";
                        // document.body.appendChild(s1);

                        // // Send Payment Success to Quora
                        // const s2 = document.createElement("script");
                        // s2.type = "text/javascript";
                        // s2.async = true;
                        // s2.innerHTML = "qp('track', 'Purchase');";
                        // document.body.appendChild(s2);

                        // Set payment status
                        setState(prev => ({
                            ...prev,
                            paymentVerified: true
                        }));

                        // Sidebar Status Check
                        paymentCompleted(true);

                        // Redirect to Success Page - 1s Delay so tracking scripts executes
                        setTimeout(() => {
                            setState(prev => ({
                                ...prev,
                                loading: false
                            }));
                            window.location.href = G_URL + 'payment/success/'+programType;
                        }, 1000);
                    } else {
                        // If payment verification failed
                        openNotification('fail', res.data.message, 4, 54);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            }
        }
    }

    const setStripeModal = (visible:boolean) => {
        setModalVisible(visible);
    }

    const setPaymentVerified = (status:boolean) => {
        if(status)
            window.location.href = G_URL + 'payment/success/'+props.programType;
    }

    const {
        finalPrice,
        discount,
        couponValidating,
        decodedToken,
        stripeOrderRes
    } = state;

    const { paymentCompleted} = props;

    let discountValue = discount;
    let finalPriceValue = finalPrice;

    if(planDetails.symbol.toLowerCase() === "inr") {
        if(discount !== "-") {
            discountValue = parseInt(discount).toLocaleString('en-IN');
        } 
        if(finalPrice === '') {
            finalPriceValue = planDetails.planPrice.toLocaleString('en-IN');
        } else {
            finalPriceValue = parseInt(finalPrice).toLocaleString('en-IN');
        }
    }

    return (
        <>
            <Modal
                footer={null}
                centered
                destroyOnClose={true}
                visible={isModalVisible}
                onCancel={() => setStripeModal(false)}
                title={'Payment'}
            >
                <Elements stripe={stripePromise}>
                    <StripeBlock
                        stripeOrderRes={stripeOrderRes}
                        decodedToken={decodedToken}
                        planDetails={planDetails}
                        finalPrice={parseInt(finalPrice)}
                        setPaymentVerified={setPaymentVerified}
                        paymentCompleted={paymentCompleted}
                        courseTermMap = { planDetails.courseTermMap }
                        setStripeModal={setStripeModal}
                    />
                </Elements>
            </Modal>
            <div className="checkout-content-wrapper g-d g-col-1 g-h-c">
                <div className="checkout-content-container w-60">
                    <h1 className="text-xxl font-heading w-100">
                        Checkout
                    </h1>
                    <div className="checkout-details-container w-100">
                        <div className="main-block">
                            {renderPlanDetails()}
                            {
                                !state.showCouponBox &&
                                <span className="f-d body-small c-pointer apply-coupon text-primary" onClick= {() => toggleApplyCoupon()}>
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
                                <span className="discount-holder text-medium strong-text">{parseInt(discount) > 0 ? planDetails.symbol : ''} {discountValue}</span>
                            </div>
                            <div className="total-payable-container f-d f-v-c f-h-sb">
                                <span className="title text-big strong-text">Total Payable</span>
                                <span className="payable-holder text-big strong-text">
                                {planDetails.symbol} {finalPriceValue}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="footer f-d f-vt f-v-e">
                        <span className="text-regular info">
                            <Checkbox onChange={(e)=>{setTncChecked(e.target.checked)}}></Checkbox>&nbsp;&nbsp;I agree to the program&nbsp;
                            <a className="terms-and-conditions" 
                            target="_blank"
                            rel="noopener noreferrer"
                            href={ G_URL + "terms-and-conditions/" + programType }
                            >
                                Terms and Conditions
                            </a>
                        </span>
                        <div className="g-d g-h-e action-element">
                            <Button
                            className="default-blue-btn checkout-btn"
                            type="primary"
                            onClick={() => createOrder()}
                            loading={state.loading}
                            disabled={!tncChecked}
                            >
                                Pay {planDetails.symbol} {finalPrice !== '' ? finalPrice.toLocaleString() : planDetails.planPrice.toLocaleString()}
                            </Button>
                        </div>
                        <div className="g-d g-h-e text-faded secure-txn-text">
                            <span><SafetyOutlined /> Secure Transaction</span>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .checkout-content-wrapper .checkout-btn {
                    padding-left: 2rem;
                    padding-right: 2rem;
                    height: 50px !important;
                }

                .checkout-content-wrapper .checkout-details-container {
                    margin-top: var(--peaky-gap-64);
                    border-radius: var(--peaky-br-4);
                    padding: var(--peaky-pad-32);
                    background-color: var(--primary-bg);
                }

                .checkout-content-wrapper .checkout-details-container .main-block {
                    padding-bottom: var(--peaky-gap-16);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }

                .checkout-content-wrapper .checkout-details-container .main-block .apply-coupon {
                    margin: var(--peaky-gap-16) 0 0;
                }

                .checkout-content-wrapper .checkout-details-container .summary {
                    padding-top: 2rem;
                }

                .checkout-content-wrapper .checkout-details-container .summary .total-payable-container {
                    margin: var(--peaky-gap-16) 0 0;
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
                    background-color: var(--secondary-bg);
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