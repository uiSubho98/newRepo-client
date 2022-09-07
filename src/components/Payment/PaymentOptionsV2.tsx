import axios from "axios";
import moment from "moment";
import React,{ useEffect, useState } from "react";
// @ts-ignore
import { useHistory } from "react-router-dom";
import { G_API_URL } from "../../constants/constants";
import { intermediatePayment } from "../../utils/payment.util";
import { __getToken } from "../../utils/user-details.util";
import { IPaymentOption } from "./payment";

interface IProps {
    displayEarlyBirdDiscount: boolean;
    programType: string;
    closeModal: Function
}

const PaymentOptionsV2 = (props: IProps) => {
    const { programType, closeModal } = props;
    const [options, setOptions] = useState<Array<IPaymentOption>>([]);
    const [batchStartText, setBatchStartText] = useState<number>();
    const isMicrodegree = programType === "microdegree";
    const history = useHistory();

    useEffect(() => {
        // Fetch plan for the program
        const config = {
            params: {
                programType
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
                    setOptions(planDetails.paymentOptions[programType]);
                    setBatchStartText(planDetails.batchStartText)
                } else {
                    console.error("Plan fetching API error", response);
                }
            })
            .catch((err: Error) => {
                console.log(err);
            });
    }, [programType]);

    const selectPaymentOption = (option: IPaymentOption) => {
        localStorage.setItem("paymentOption", option.name !== undefined ? option.name : '');
        // Handle the user's payment selection & redirect to checkout
        intermediatePayment('microdegree', history);
    }

    const renderPaymentOptions = () => {
        let sellingPrice = "";
        let actualPrice = "";
        let discountText = "";
        let pmText = "";
        return options.map((option, index) => {
            if(isMicrodegree) {
                pmText = `INR ${Math.floor(parseInt(option.sellingPrice) / (option.termIds!.length*4))} /month`;
            } else {
                pmText = ``;
            }
            sellingPrice = option.sellingPrice ?? "";
            actualPrice = option.actualPrice ?? "";
            discountText = option.actualPrice ? `SAVE ${option.symbol} ${(parseInt(option.actualPrice) - parseInt(option.sellingPrice))}` : ""
            if(option.symbol.toLowerCase() === "inr") {
                if(option.actualPrice) {
                    if(index === 0) {
                        actualPrice = parseInt(option.sellingPrice)
                        .toLocaleString('en-IN');
                    } else {
                        actualPrice = parseInt(option.actualPrice)
                        .toLocaleString('en-IN');
                    }
                    discountText = option.actualPrice ? `SAVE ${option.symbol} ${(parseInt(option.actualPrice) - parseInt(option.sellingPrice)).toLocaleString('en-IN')}` : "";
                }
                sellingPrice = parseInt(option.sellingPrice)
                .toLocaleString('en-IN');
            }
            return (
            <div className={`option`} key={index}>
                <div className="option-header f-d">
                    <span className="text-big strong-text">
                        { option.title }
                    </span>
                    {
                        index !== 0 && discountText !== "" && 
                        <span className="discount-text f-d f-v-c text-small strong-text">
                            {discountText}
                        </span>
                    }
                </div>
                <div className="price-wrapper text-large font-heading">
                    <div className="amount-block f-d">
                        <div className="symbol-block">

                        </div>
                        <div className={`selling-price ${index === 0 ? 
                            "invisible" : ""}`}>
                            { sellingPrice }
                        </div>
                    </div>
                    <div className="amount-block f-d">
                        <div className="symbol-block">
                            { option.symbol }&nbsp; 
                        </div>
                        <div className="actual-price text-large font-heading">
                            <span style={{color: 'red',textDecoration: index !== 0 ? 'line-through' : 'none'}}>
                                <span style={{color: 'white'}}>{actualPrice}</span>
                            </span>
                        </div>
                    </div>
                </div>
                <span className="text-small text-primary emi"><i>{pmText}</i></span>
                <div className="text-faded option-desc">
                    {option.desc}
                </div>
                <div className="default-blue-btn enroll-btn" onClick={() => selectPaymentOption(option)}>Enrol Now</div>
            </div>
            )
        })
    }

    return (
        <>
            <div className="payment-options-wrapper">
                <div className="payment-options-header f-d f-h-sb f-v-s">
                    <div>
                        <h1 className="font-heading text-large">
                            Select a Plan. Enrol in the {isMicrodegree ? 'Microdegree' : 'Bootcamp'}
                        </h1>
                        {
                            batchStartText &&
                            <div className="text-medium subtitle">
                                Batches starting {moment(batchStartText * 1000).format("DD MMM YYYY")}
                            </div>
                        }
                    </div>
                    <div>
                        <div className="close-btn f-d f-h-c f-v-c c-pointer" onClick={()=>{closeModal()}}>
                            <i className="icon icon-x"></i>
                        </div>
                    </div>
                </div>
                <div className="g-d g-col-3 g-col-1-m payment-options w-90">
                    { renderPaymentOptions() }
                </div>
                <div className="g-d action-block">
                    <span className="text-small return-statement text-c-d">
                        100% refund on a pro-rata basis. Cancel Anytime. No questions asked!
                    </span>
                </div>
            </div>
            <style jsx>{`
                .payment-options-wrapper {
                    background-color: var(--primary-bg);
                    padding: 2rem;
                }

                .payment-options-wrapper .close-btn {
                    border-radius: 50%;
                    background-color: var(--spider);
                    color: rgba(255, 255, 255, 0.87);
                    width: 50px;
                    height: 50px;
                }

                .payment-options-wrapper .close-btn .icon {
                    font-size: 24px;
                }

                .payment-options-wrapper .payment-options {
                    grid-gap: 0 var(--peaky-gap-32);
                    margin: var(--peaky-gap-32) 0;
                }

                .payment-options-wrapper .payment-options .option {
                    padding: var(--peaky-gap-32);
                    background-color: var(--secondary-bg);
                    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
                    border-radius: 4px;
                }

                .payment-options-wrapper .payment-options .option .discount-text {
                    background-color: #E6BE2E;
                    padding: 0 8px;
                    color: var(--carbon);
                    border-radius: var(--peaky-br-2);
                    margin-left: var(--peaky-gap-8);
                }

                .payment-options-wrapper .payment-options .option .price-wrapper {
                    margin: var(--peaky-gap-64) 0 0;
                }

                .payment-options-wrapper .payment-options 
                .option .price-wrapper .invisible {
                    visibility: hidden;
                }

                .payment-options-wrapper .payment-options .option .symbol-block {
                    width: 64px;
                }

                .payment-options-wrapper .payment-options .option .option-desc {
                    margin-top: var(--peaky-gap-32);
                }

                .payment-options-wrapper .payment-options .option .enroll-btn {
                    height: 50px !important;
                    margin-top: var(--peaky-gap-32);
                }

                .payment-options-wrapper .payment-options .option .emi {
                    color: var(--primary);
                }

                .payment-options-wrapper .early-bird-container{
                    margin-bottom: 25%;
                }

                .payment-options-wrapper .early-bird-container .early-bird-options{
                    margin-top: var(--peaky-gap-64);
                }

                .payment-options-wrapper .subtitle {
                    font-weight: 400;
                    margin: var(--peaky-gap-8) 0 0;
                }

                .payment-options-wrapper .return-statement {
                    color: rgba(255, 255, 255, 0.54);
                }

                .bg-discount {
                    background-color: var(--discount);
                    padding: 5px 10px;
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

                    .payment-content-wrapper .left-pane
                    .payment-options .option {
                        width: 70%;
                        margin: var(--peaky-gap-8) 0;
                    }

                    .payment-content-wrapper .left-pane
                    .action-block .confirm-btn {
                        margin: var(--peaky-gap-16) 0 0;
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

                    .payment-options-wrapper,
                    .payment-options-wrapper .payment-options .option {
                        padding: var(--peaky-pad-16);
                    }

                    .payment-options-wrapper .payment-options {
                        width: 100%;
                        grid-gap: var(--peaky-pad-32) 0;
                    }

                    .payment-options-wrapper .payment-options 
                    .option .symbol-block {
                        width: 48px;
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

export default PaymentOptionsV2;