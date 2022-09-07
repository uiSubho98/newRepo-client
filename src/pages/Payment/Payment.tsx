import React,{ useEffect, useState } from "react";
// import { message } from "antd";
// @ts-ignore
import {useSelector, useDispatch} from 'react-redux';
// @ts-ignore
import { Helmet } from 'react-helmet';
import {updatePlan} from '../../actions';
import { G_URL, G_API_URL } from "../../constants/constants";
import { decodeToken, __getToken } from "../../utils/user-details.util";
import { check_login } from '../../utils/login.util';
import Layout from "../../components/Layout";
// import SlotsComponent from "../../components/Payment/Slots";
import Checkout from "../../components/Payment/Checkout";
import Spinner from '../../components/Spinner/spinner';
import PaymentOptions from "../../components/Payment/PaymentOptions";
// import BootcampPaymentOption from "../../components/Payment/BootcampPaymentOption";
import axios from "axios";
import { RouteComponentProps } from "react-router";
import { IPaymentOption } from "../../components/Payment/payment";

interface ISelectedSlot {
    slot: string;
    slotId: string;
    timeZone: string;
    zoneAbbr: string;
}

interface IState {
    isPlanAvailable: boolean;
    isLoading: boolean;
    isSpinning: boolean;
    paymentOptions: IPaymentOption;
    stepOne: boolean;
    stepTwo: boolean;
    stepThree: boolean;
    isSlotSelected: boolean;
    selectedSlot?: ISelectedSlot;
    isPaymentOptionSelected: boolean;
}

interface MatchParams {
    slug: string
}

interface IPaymentProps extends RouteComponentProps<MatchParams> {

}

const Payment = (props: IPaymentProps) => {

    const defaultState = {
        isPlanAvailable: false,
        isLoading: false,
        isSpinning: false,
        paymentOptions: {
            type:"",
            actualPrice: "0",
            sellingPrice: "0",
            symbol: ""
        },
        stepOne: true,
        stepTwo: false,
        stepThree: false,
        isSlotSelected: false,
        isPaymentOptionSelected: false
    }

    const planDetails = useSelector((state:any) => state.planDetails);

    const isLoggedIn = check_login();

    const { slug } = props.match.params;
    
    if (!isLoggedIn) {
        window.location.href = decodeURIComponent(G_URL + `login/?rurl=/payment/${slug}`);
    }
    
    const [state, setState] = useState<IState>(defaultState);

    const dispatch = useDispatch();

    useEffect(() => {
        if (isLoggedIn) {
            let planDetails:any = localStorage.getItem('ps-state');
            let isActivePlan = false;
            planDetails = JSON.parse(planDetails);
            if(planDetails && planDetails['planDetails'] && 
            planDetails['planDetails']['planMode'] === slug) {
                isActivePlan = true;
            }
            if (localStorage.getItem('ps-state') !== null && localStorage.getItem('ps-state') !== undefined && 
            isActivePlan) {
                setState(prev => ({...prev, isPlanAvailable: true}));
                if(slug === 'bootcamp') {
                    selectPaymentOption(planDetails.planDetails.paymentOptions[slug][0]);
                }
            } else {
                // Check whether planDetails stored in DB for this user
                setState(prev => ({...prev, isPlanAvailable: false}));

                const getPlanSelection = () => {
                    const config = {
                        params:{
                            programType: slug
                        },
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                            "Authorization": __getToken()
                        }
                    };
                    axios
                        .get(G_API_URL + "tracker/plan/", config)
                        .then(response => {
                            if (response.data.status === 1) {
                                let {planDetails} = response.data.data[0]; 
                                planDetails = {planDetails: {...planDetails}};
                                planDetails = JSON.stringify(planDetails);
                                // Update store from DB
                                localStorage.setItem('ps-state', planDetails);
                                window.location.reload();
                            } else {
                                setState(prev => ({...prev, isPlanAvailable: false}));
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }

                getPlanSelection();
            }
        } else {
            window.location.href = decodeURIComponent(G_URL + `login/?rurl=/payment/${slug}`);
        }
    },[isLoggedIn,slug]);   // eslint-disable-line react-hooks/exhaustive-deps

    const selectPaymentOption = (activeOption:any) => {
        if(slug === "microdegree") {    // Check if it is microdegree payment
            planDetails['planPrice'] = activeOption.sellingPrice
            planDetails['terms'] = activeOption.terms//csv
            planDetails['termNames'] = activeOption.termIds //Array<string>    term 0 term 1
            planDetails['courses'] = activeOption.courses//csv
            planDetails['courseIds'] = activeOption.courseIds //Array<number>
            planDetails['planMode'] = planDetails['type']
            planDetails['courseTermMap'] = activeOption.courseTermMap //Array<number>
            planDetails['paymentOption'] = activeOption.name //string       term / year / one-time
            
            dispatch(updatePlan({ ...planDetails }));
            setState(prev => (
                {
                    ...prev,
                    isPaymentOptionSelected: true,
                    stepTwo: true
                }
            ));
        } else {
            let updatedPlanDetails = planDetails;
            updatedPlanDetails.planPrice = activeOption.sellingPrice;
            dispatch(updatePlan({...updatedPlanDetails}));
            setState(prev => (
                {
                    ...prev, 
                    // isSpinning: false,
                    isPaymentOptionSelected: true,
                    stepTwo: true
                }
            ));
        }
    }

    var displayEarlyBirdDiscount = false;
    
    if(slug === 'microdegree') {
        // Subscription date of microdegree
        var decodedToken = decodeToken();
        const subscriptionDate = new Date(decodedToken.subscriptions.mdRegTime * 1000);
        var discountUntilDate = subscriptionDate;
        discountUntilDate.setDate(discountUntilDate.getDate() + 7);
        displayEarlyBirdDiscount = discountUntilDate.getTime() > new Date().getTime();
    }

    if(slug === 'bootcamp') {
        displayEarlyBirdDiscount = false;
    }

    const getBlock = () => {
        const { country, international_status } = planDetails;
            if(!state.isPaymentOptionSelected)  // Step 2
            {
                const paymentOptions = planDetails.paymentOptions[slug];
                return (
                    slug === "microdegree" ?
                    <PaymentOptions 
                        options={paymentOptions}
                        isLoading={state.isSpinning}
                        selectPaymentOption = {selectPaymentOption}
                        displayEarlyBirdDiscount={displayEarlyBirdDiscount}
                        batchStartText={planDetails.batchStartText}
                        isMicrodegree={true}
                    /> :
                    <></>
                    // <BootcampPaymentOption 
                    //     options={paymentOptions}
                    //     isLoading={state.isSpinning}
                    //     selectPaymentOption = {selectPaymentOption}
                    // />
                    // {selectPaymentOption(paymentOptions[0])}
                    // <PaymentOptions 
                    //     options={paymentOptions}
                    //     isLoading={state.isSpinning}
                    //     selectPaymentOption = {selectPaymentOption}
                    //     displayEarlyBirdDiscount={false}
                    //     batchStartText={planDetails.batchStartText}                        
                    //     isMicrodegree={false}
                    // />
                )
            } 
            else  // Step 3
            {
                return (
                    <Checkout 
                        planDetails={planDetails}
                        programType = { slug }
                        international_status={international_status} 
                        country={country}
                        paymentCompleted={setStepThree}
                    />
                )
            }
    }

    const setStepThree = () => {
        setState(prev => ({ ...prev,stepThree: true }));
    }

    // const { isPlanAvailable, stepOne, stepTwo, stepThree} = state;
    const { isPlanAvailable, stepTwo, stepThree} = state;

    let isProgressBlockVisible = false;

    if(slug === "bootcamp" && !stepTwo) {
        isProgressBlockVisible = false;
    }

    return (
        <>
            <Layout navAction={"Payment"}>
                <Helmet>
                    <title>ProGrad | Payment</title>
                </Helmet>
                { 
                    isPlanAvailable ?
                    <div className="payment-content-wrapper f-d lr-pad-d
                    lr-pad-m tb-pad-d tb-pad-m">
                        <div className={`left-pane tb-pad-m ${!isProgressBlockVisible ? "bootcamp-payment-option" : 
                        "" }`}>
                            { getBlock() }
                        </div>
                        {
                            isProgressBlockVisible &&
                            <div className="right-pane">
                                <h2 className="h2-heading hide-m">
                                    Super awesome learning experience
                                </h2>
                                <div className="steps-container">
                                    <div className={`step-block f-d f-vt-m f-v-c
                                    ${stepTwo ? 'complete' : 'incomplete'}`}>
                                        <div className="check-circle f-d f-v-c f-h-c">
                                            <i className="icon icon-check"></i>
                                        </div>
                                        Choose a payment option
                                    </div>
                                    <div className={`step-block f-d f-vt-m f-v-c
                                    ${stepThree ? 'complete' : 'incomplete'}`}>
                                        <div className="check-circle f-d f-v-c f-h-c">
                                            <i className="icon icon-check"></i>
                                        </div>
                                        Checkout
                                    </div>
                                </div>
                            </div>
                        }
                    </div> 
                    :
                    <div className="spinner f-d f-vt f-v-c f-h-c">
                        <Spinner />
                        <div className="brief-message body-regular">
                            Please try again, or go back
                            <a href="/">Home</a>
                        </div>
                    </div>
                }
            </Layout>
            <style jsx>{`
                .payment-content-wrapper {
                    min-height: calc(100vh - 64px);
                }
    
                .payment-content-wrapper .left-pane {
                    width: 54vw;
                }

                .payment-content-wrapper 
                .left-pane.bootcamp-payment-option {
                    width: 100%;
                }
    
                .spinner a {
                    color: var(--pink);
                    text-decoration: underline;
                    margin-left: 8px;
                }
    
                .payment-content-wrapper .right-pane {
                    position: fixed;
                    top: 0;
                    right: 0;
                    width: 30vw;
                    height: 100vh;
                    color: var(--dove);
                    padding: 9rem 3rem;
                    background: var(--carbon);
                }
    
                .right-pane > h2 {
                    color: var(--dove);
                    margin-bottom: 2rem;
                }
    
                .steps-container .step-block {
                    font-size: 18px;
                    font-weight: 200;
                    margin-bottom: 3rem;
                }
    
                .step-block .check-circle {
                    position: relative;
                    width: 32px;
                    height: 32px;
                    margin-right: 1rem;
                    color: rgba(0,0,0,0.2);
                    border-radius: var(--peaky-br-full);
                    background: var(--dove);
                    box-shadow: var(--peaky-shadow);
                }
    
                .step-block.complete .check-circle {
                    background: var(--greenapple);
                    color: var(--dove);
                }
    
                .steps-container .step-block:nth-child(-n+1) 
                .check-circle:before {
                    content: '';
                    position: absolute;
                    z-index: -1;
                    top: 26px;
                    width: 2px;
                    height: 60px;
                    background: var(--dove);
                }
    
                .step-block.complete .check-circle:before {
                    background: var(--greenapple) !important;
                }
    
                .navbar-container {
                    height: 64px;
                    box-shadow: 0px 5px 11px 0px rgba(50, 50, 50, 0.08);
                }
    
                @media only screen and (max-device-width: 760px) {
                    .payment-content-wrapper {
                        flex-direction: column-reverse;
                        padding-top: 0;
                    }
    
                    .payment-content-wrapper .left-pane,
                    .payment-content-wrapper .right-pane {
                        width: unset;
                    }
    
                    .payment-content-wrapper .right-pane {
                        position: unset;
                        height: unset;
                        margin: 0 -1rem;
                        padding: 2rem 1rem;
                    }
    
                    .payment-content-wrapper .steps-container {
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                    }
    
                    .steps-container .step-block {
                        font-size: 14px;
                        text-align: center;
                        margin-bottom: unset;
                    }
    
                    .step-block .check-circle {
                        margin-right: unset;
                        margin-bottom: 1rem;
                        z-index: 2;
                    }
    
                    .steps-container .step-block:nth-child(-n+1) 
                    .check-circle:before {
                        top: 16px;
                        left: 26px;
                        z-index: 1;
                        width: 106px;
                        height: 2px;
                    }
                }
    
                @media only screen and (max-device-width: 360px) {
                    .course-slots-container .slot-time-container span {
                        font-size: 16px;
                    }
    
                    .course-slots-container .slot-time-container {
                        margin-right: unset;
                        padding-right: 0;
                    }
    
                    .steps-container .step-block:nth-child(-n+1) 
                    .check-circle:before {
                        width: 92px;
                    }
                }
    
                @media screen and (min-width: 768px) and 
                (max-width: 1023px) and (orientation: portrait) {
                    .payment-content-wrapper .right-pane > h2 {
                        text-align: center;
                    }
    
                    .payment-content-wrapper {
                        flex-direction: column-reverse;
                        padding-top: 0;
                        min-height: unset;
                    }
    
                    .payment-content-wrapper .left-pane {
                        padding-top: 2rem;
                    }
    
                    .payment-content-wrapper .left-pane,
                    .payment-content-wrapper .right-pane {
                        width: unset;
                    }
    
                    .payment-content-wrapper .right-pane {
                        position: unset;
                        height: unset;
                        margin: 0 -2rem;
                        padding: 2rem;
                    }
    
                    .payment-content-wrapper .steps-container {
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                    }
    
                    .steps-container .step-block {
                        flex-direction: column;
                        font-size: 14px;
                        text-align: center;
                        margin-bottom: unset;
                    }
    
                    .step-block .check-circle {
                        margin-right: unset;
                        margin-bottom: 1rem;
                        z-index: 2;
                    }
    
                    .steps-container .step-block:nth-child(-n+1) 
                    .check-circle:before {
                        top: 16px;
                        left: 26px;
                        z-index: 1;
                        width: 224px;
                        height: 2px;
                    }
                }
            `}</style>
        </>
    )
}

export default Payment;