import React from 'react';
import { Button } from 'antd';

interface IPaymentOption {
    type: string;
    actualPrice?: string;
    sellingPrice: string;
    symbol: string;
    name?: string;
}

interface IProps {
    options: Array<IPaymentOption>;
    isLoading: boolean;
    selectPaymentOption: Function;
}

const BootcampCheckout = (props: IProps) => {

    const { isLoading, options, selectPaymentOption  } = props;

    const benefits = [
        "Live code-along sessions by our expert teachers",
        "Self-paced concept-builders on our AI-powered learning platform",
        "Virtual Classroom for all interactions with teachers & fellow prograds",
        "Expert guidance and mentorship round the clock (24/7)",
        "Real Life Projects that boost general Problem Solving"
    ];

    const renderBenefits = () => {
        return benefits.map(benefit =>
            <div className="f-d f-ht f-v-c">
                <div>
                    <span className="f-d f-v-c f-h-c check-icon">
                        <i className="icon icon-check"></i>
                    </span>
                </div>
                <span className="body-regular benefit">
                    { benefit }
                </span>
            </div>
        );
    }

    return (
        <>
            <div className="g-d g-h-c bootcamp-fee-wrapper">
                <h1 className="h1-heading">
                    Program Fee
                </h1>
                <span className="price-block body-large strong-text">
                    <span className="price">
                        { options[0].symbol } <span className="actual-price">{options[0].actualPrice}</span> {options[0].sellingPrice}/-
                    </span>
                </span>
                <div className="w-40 benefits-wrapper">
                    { renderBenefits() }
                </div>
                <Button
                        className="default-pink-btn filled-pink btn-large
                        confirm-btn"
                        type="primary"
                        onClick={() => selectPaymentOption(options[0])}
                        loading={isLoading}
                    >
                        Confirm and proceed
                </Button>
            </div>
            <style jsx>{`
                .bootcamp-fee-wrapper .price-block {
                    background-color: var(--snowfall);
                    border-radius: var(--peaky-br-4);
                    padding: var(--peaky-pad-16) var(--peaky-pad-32);
                    margin: var(--peaky-gap-8) 0 0;
                }

                .bootcamp-fee-wrapper .benefits-wrapper {
                    margin: var(--peaky-gap-16) 0 var(--peaky-gap-24);
                }

                .bootcamp-fee-wrapper .benefits-wrapper 
                .check-icon {
                    margin: var(--peaky-gap-16) 0;
                }

                .bootcamp-fee-wrapper .benefits-wrapper 
                .check-icon {
                    background-color: var(--greenapple);
                    border-radius: var(--peaky-br-full);
                    color: var(--dove);
                    height: 25px;
                    width: 25px;
                }

                .bootcamp-fee-wrapper .benefits-wrapper
                .benefit {
                    margin: var(--peaky-gap-8);
                }

                .bootcamp-fee-wrapper .price-block 
                .price .actual-price {
                    text-decoration: line-through;
                }

                @media only screen and (max-device-width: 760px) {
                    .bootcamp-fee-wrapper .benefits-wrapper {
                        width: 100%;
                    }
                }
            `}</style>
        </>
    )
}

export default BootcampCheckout;