import React from "react";
import { IPlan, IPlans } from "../../interfaces/microdegree";
import Plan from "./Plan";

interface IProps {
    data?: IPlans;
    countryName: string;
}

const Plans = (props: IProps) => {

    const { data, countryName } = props;

    const renderPlans = (plans: Array<IPlan> = []) => {
        return plans.map((plan, key) => 
            <Plan key={key} data={plan} countryName={countryName} />
        )
    }

    return (
        <>
            <div className="g-d g-h-c tb-pad-d tb-pad-m
            lr-pad-d lr-pad-m plan-details-wrapper" id="plans">
                <h1 className="font-heading text-xl text-c-d">
                    { data?.title }
                </h1>
                <span className="text-medium next-batch-info">
                    { data?.nextBatch }
                </span>
                <div className="g-d g-h-c g-col-3 g-col-1-m 
                g-gap-24 plan-list">
                    { renderPlans(data?.list) }
                </div>
                <div className="g-d text-small text-c-d return-statement">
                    100% refund on a pro-rata basis. Cancel Anytime. No questions asked!
                </div>
            </div>
            <style jsx>{`
                .plan-details-wrapper {
                    background-color: var(--primary-bg);
                }

                .plan-details-wrapper .next-batch-info {
                    margin: var(--peaky-gap-8) 0 0;
                }

                .plan-details-wrapper .plan-list
                .plan-wrapper {
                    background-color: var(--secondary-bg);
                    border-radius: var(--peaky-br-4);
                    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
                    margin: var(--peaky-gap-64) 0 0;
                    padding: var(--peaky-pad-32);
                    width: 343px;
                }

                .plan-details-wrapper .plan-list
                .plan-wrapper .plan-header .title {
                    opacity: 0.87;
                }

                .plan-details-wrapper .plan-list
                .plan-wrapper .plan-header .discount {
                    color: var(--carbon);
                    background-color: #E6BE2E;
                    border-radius: var(--peaky-br-2);
                    margin: 0 0 0 var(--peaky-gap-8);
                    padding: 4px 8px;
                }

                .plan-details-wrapper .plan-list
                .plan-wrapper .price-block {
                    height: 130px;
                    margin: 48px 0 var(--peaky-gap-16);
                }

                .plan-details-wrapper .plan-list
                .plan-wrapper .price-block .strike-through {
                    position: relative;
                }

                .plan-details-wrapper .plan-list
                .plan-wrapper .price-block .strike-through:before {
                    content: '';
                    width: 100%;
                    height: 3px;
                    background: var(--tomato);
                    position: absolute;
                    top: 50%;
                    left: 0; 
                    right: 0;
                }

                .plan-details-wrapper .plan-list
                .plan-wrapper .price-block .emi {
                    color: var(--primary);
                    font-style: italic;
                }

                .plan-details-wrapper .plan-list
                .plan-wrapper .price-block .selling-price {
                    margin: 0 0 0 63px;
                }

                .plan-details-wrapper .plan-list
                .plan-wrapper .price-block 
                .selling-price.invisible {
                    visibility: hidden;
                }

                .plan-details-wrapper .plan-list
                .plan-wrapper .description {
                    opacity: 0.54;
                }

                .plan-details-wrapper .plan-list
                .plan-wrapper .enrol-now-btn {
                    margin: var(--peaky-gap-32) 0 0;
                }

                .plan-details-wrapper .return-statement {
                    margin: var(--peaky-gap-32) 0 0;
                    color: rgba(255, 255, 255, 0.54);
                }

                @media only screen and (max-device-width: 760px) {
                    .plan-details-wrapper .plan-list {
                        margin: var(--peaky-gap-32) 0 0;
                    }

                    .plan-details-wrapper .plan-list .plan-wrapper {
                        margin: 0;
                        padding: var(--peaky-pad-16);
                        width: 100%;
                    }

                    .plan-details-wrapper .plan-list .plan-wrapper 
                    .price-block .selling-price {
                        margin-left: 50px;
                    }
                }
            `}</style>
        </>
    )
}

export default Plans;