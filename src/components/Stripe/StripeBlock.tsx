import React, {useState} from 'react';
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js';
import CardSection from './CardSection';
import keys from '../../config/keys';
import axios from "axios";
import queryString from "query-string";
import ReactPixel from 'react-facebook-pixel';
import {__getCookie} from '../../utils/cookie.util';
import {G_API_URL, G_HOME_URL} from '../../constants/constants';
import {getGATag, openNotification} from '../../utils/common.util';
import BillingDetailsForm from './BillingDetailsForm';
import stripeLogo from '../../assets/brand/stripe/stripe-wordmark-slate-grey.svg';

interface IDecodedToken {
    uid: number;
    name: string;
    email: string;
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
}

interface IProps {
    stripeOrderRes: any;
    decodedToken: IDecodedToken;
    planDetails: IPlanDetails;
    finalPrice: number;
    courseTermMap: string;
    setPaymentVerified: Function;
    paymentCompleted: Function;
    setStripeModal: Function;
}

export default function StripeBlock({
        stripeOrderRes,
        decodedToken,
        planDetails,
        courseTermMap,
        finalPrice,
        setPaymentVerified,
        paymentCompleted,
        setStripeModal
    }:IProps) {
    const [isProcessing, setProcessing] = useState<boolean>(false);
    const [isCardInvalid, setIsCardInvalid] = useState<boolean>(false);
    const [validationError, setValidationError] = useState<string>('');

    // Load Stripe
    const stripe = useStripe();
    const elements = useElements();

    // Stripe Order Response
    const {couponCode, orderCS, orderId, orderType, stripeOrderId, purchasePrice} = stripeOrderRes;

    const handleSubmit = async (event:any) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        const billingDetails = {
            name: event.target.name.value,
            email: event.target.email.value,
            phone: event.target.phone.value,
            address: {
                line1: event.target.address.value,
                city: event.target.city.value,
                state: event.target.state.value,
                postal_code: event.target.postal_code.value,
                country: planDetails.countryCode
            }
        };

        // Set Processing so Pay button can be disabled to avoid multiple order
        setProcessing(true);

        const result = await stripe.confirmCardPayment(orderCS, {
            payment_method: {
                card: elements.getElement(CardElement)!,
                billing_details: {
                    ...billingDetails
                },
            }
        });

        if (result.error) {
            // Reset Button
            setProcessing(false);
            // Show Card error to customer (e.g., insufficient funds)
            // Set Card Validation
            setIsCardInvalid(true);
            setValidationError(result.error.message ? result.error.message : "");
            // Get Rid of Validation
            setTimeout(() => {
                setIsCardInvalid(false);
            }, 5000);
        } else {
            // The payment has been processed!
            if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {

                const conFinalPrice = finalPrice ? finalPrice * 1 : planDetails.planPrice * 1;

                // Send payment confirm status to backend
                const config = {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Authorization": __getCookie(keys.cookiePrefix + "ut").cookieValue
                    }
                };

                const data = {
                    stripeOrderId: stripeOrderId,
                    orderId: orderId,
                    couponCode: couponCode,
                    uid: decodedToken.uid,
                    name: decodedToken.name,
                    email: decodedToken.email,
                    termIds: planDetails.termIds,
                    termNames: planDetails.terms,
                    courseId: planDetails.planId,
                    purchaseMode: planDetails.planMode,
                    selectedSlot: planDetails.selectedSlot,
                    userTimeZone: planDetails.userTimeZone,
                    purchasePrice: purchasePrice,
                    orderType: orderType,
                    courseTermMap: courseTermMap
                };

                axios
                    .post(G_API_URL + `program/stripe/confirm`, queryString.stringify(data), config)
                    .then(res => {
                        if (res.data.status === 1) {
                            // Send Payment Success Event to GA
                            // ReactGA.event({
                            //     category: 'subscribers',
                            //     action: 'payment_success',
                            //     label: planDetails.courseName,
                            //     value: conFinalPrice
                            // });
                            // Env
                            const platformEnv = process.env.REACT_APP_PLATFORM;
                            var isBootcamp = planDetails.planMode === "bootcamp";

                            if (platformEnv === 'prod') {
                                const tag = getGATag(planDetails.planMode+"_payment_success",
                                planDetails.planMode+" subscribers",
                                planDetails.courseName, conFinalPrice);
                                document.body.appendChild(tag);

                                // Send Payment Success Event to Pixel
                                ReactPixel.track((isBootcamp ? 'Bootcamp Purchase' : 'Microdegree Purchase'), {
                                    currency: planDetails.symbol,
                                    value: conFinalPrice,
                                    content_category: planDetails.courseName,
                                    content_type: planDetails.planMode
                                });

                                // Send Payment Success to Google Ads
                                const s1 = document.createElement("script");
                                s1.type = "text/javascript";
                                s1.async = true;
                                s1.innerHTML = `gtag('event', 'conversion', { 'send_to': '${isBootcamp ? 'AW-439710104/mzOdCKWo-IkCEJjj1dEB' : 'AW-439710104/LM7xCOvkoIoCEJjj1dEB'}','value': ${conFinalPrice}, 'currency': '${planDetails.symbol}', 'transaction_id': '${orderId}' });`;

                                document.body.appendChild(s1);
                            }

                            // Send Payment Success to Quora
                            // const s2 = document.createElement("script");
                            // s2.type = "text/javascript";
                            // s2.async = true;
                            // s2.innerHTML = "qp('track', 'Purchase');";
                            // document.body.appendChild(s2);

                            // Set payment status
                            setPaymentVerified(true);
                            paymentCompleted(true);
                            setStripeModal(false);

                            // Redirect to Success Page - 1s Delay so tracking scripts executes
                            setTimeout(() => {
                                window.location.href = G_HOME_URL + 'payment/success/' + planDetails.planMode + "/" + planDetails.planId + "/";
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
    };

    return (
        <>
        <form onSubmit={handleSubmit}>
            <CardSection/>
            <div className={`card-validation-error ${isCardInvalid ? 'active' : ''}`}>
                *{validationError}
            </div>
            <BillingDetailsForm/>
            <button className="stripe-btn default-blue-btn btn-small" 
            disabled={isProcessing || !stripe}>
                {isProcessing ? 'Processing...' : `Pay ${planDetails.symbol} ${finalPrice ? finalPrice : planDetails.planPrice}`}
            </button>
            <div className="stripe-brand">
                <div className="powered-by f-d f-v-c f-h-c">
                    <div className="tag">Powered by</div>
                    <img className="stripe-logo" src={stripeLogo} alt="stripe-logo"/>
                </div>
                <div className="stripe-t-p text-c-d">
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://stripe.com/en-in/privacy"
                    >
                        Terms & Privacy
                    </a>
                </div>
            </div>
        </form>
        <style jsx>{`
            .ant-modal label {
                color: #6b7c93;
                font-weight: 300;
                font-size: 16px;
                text-transform: uppercase;
                letter-spacing: 0.025em;
            }
            
            .ant-modal .stripe-btn {
                white-space: nowrap;
                border: 0;
                outline: 0;
                display: inline-block;
                height: 50px;
                width: 100%;
                line-height: 50px;
                padding: 0 14px;
                box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
                color: #fff;
                border-radius: 4px;
                font-size: 16px;
                font-weight: 400;
                text-transform: uppercase;
                letter-spacing: 0.025em;
                background-color: var(--pink);
                text-decoration: none;
                -webkit-transition: all 150ms ease;
                transition: all 150ms ease;
                margin-top: 10px;
            }
            
            .ant-modal .stripe-btn:hover {
                color: #fff;
                cursor: pointer;
                transform: translateY(-1px);
                box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
            }
            
            .ant-modal input,
            .StripeElement {
                display: block;
                margin: 10px 0 20px 0;
                max-width: 500px;
                padding: 16px 14px;
                font-size: 1em;
                box-shadow: rgba(50, 50, 93, 0.14902) 0px 1px 3px,
                    rgba(0, 0, 0, 0.0196078) 0px 1px 0px;
                border: 0;
                outline: 0;
                border-radius: 4px;
                background: white;
            }
            
            .ant-modal input::placeholder {
                color: #aab7c4;
            }
            
            .ant-modal input:focus,
            .StripeElement--focus,
            .details-form-block.active {
                box-shadow: rgba(50, 50, 93, 0.109804) 0px 4px 6px,
                    rgba(0, 0, 0, 0.0784314) 0px 1px 3px;
                -webkit-transition: all 150ms ease;
                transition: all 150ms ease;
            }
            
            .StripeElement.IdealBankElement,
            .StripeElement.FpxBankElement,
            .StripeElement.PaymentRequestButton {
                padding: 0;
            }
            
            .StripeElement.PaymentRequestButton {
                height: 40px;
            }
            
            .StripeElement.details-form-block {
                padding: 0;
            }
            
            .details-form-block .field {
                color: #303238;
            }
            
            .ant-modal .section-title {
                color: #32325d;
                font-size: 16px;
                text-transform: uppercase;
                font-weight: 500;
            }
            
            fieldset.with-state label span {
                color: #525f7f;
                min-width: 100px;
                text-align: right;
                margin-right: 1rem;
            }
            
            fieldset.with-state label:not(:nth-last-child(-n+2)) {
                border-bottom: 1px solid #f0f5fa;
            }
            
            fieldset.with-state label {
                display: flex;
                align-items: center;
                text-transform: capitalize;
                font-weight: 400;
            }
            
            fieldset.with-state label input {
                margin: 0;
                height: 50px;
                box-shadow: none;
                width: 100%;
            }
            
            label.state {
                display: inline-flex !important;
                width: 70%;
            }
            
            label.zip {
                display: inline-flex !important;
                width: 30%;
            }
            
            label.zip span {
                min-width: unset !important;
            }
            
            fieldset.with-state input:focus,
            fieldset.with-state input:hover {
                box-shadow: none;
            }
            
            .ant-modal-body .stripe-brand {
                margin-top: 1rem;
            }
            
            .powered-by .tag {
                font-size: 16px;
            }
            
            .powered-by .tag,
            .stripe-t-p a,
            fieldset.with-state label,
            .ant-modal .section-title,
            .ant-modal .stripe-btn,
            .card-validation-error {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
            }
            
            .powered-by .stripe-t-p {
                margin-top: 6px;
            }
            
            .stripe-t-p a {
                color: rgba(0, 0, 0, 0.65);
            }
            
            .powered-by .stripe-logo {
                height: 17px;
                margin-top: 2px;
                margin-left: 5px;
            }
            
            .card-validation-error {
                color: var(--organred);
                font-size: 16px;
                margin-bottom: 1rem;
                margin-top: -10px;
                opacity: 0;
                height: 0;
                transition: all 0.2s;
            }
            
            .card-validation-error.active {
                opacity: 1;
                height: 24px;
            }
            
            @media only screen and (max-device-width: 760px) {
                fieldset.with-state label span,
                label.zip span {
                    min-width: 74px !important;
                    margin-right: 6px;
                }
            
                label.zip,
                label.state {
                    display: flex;
                    width: unset;
                }
            
                fieldset.with-state label:not(:nth-last-child(-n+1)) {
                    border-bottom: 1px solid #f0f5fa;
                }
            }
        `}</style>
        </>
    );
}
