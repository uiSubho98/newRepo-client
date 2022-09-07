import React from "react";
import { IInsight } from "../../interfaces/microdegree";


interface IProps {
    data?: Array<IInsight>
}

const Insights = (props: IProps) => {
    const { data } = props;

    const renderInsights = (insights: Array<IInsight> = []) => {
        return insights.map((insight, key) => 
            <div key={key} className="insight-block text-c-d">
                <h1 className="font-heading text-xxl 
                data">
                    { insight.data }
                </h1>
                <span className="text-medium info text-faded-2">
                    { insight.info }
                </span>
            </div>
        );
    }

    return (
        <>
            <div className="g-d g-h-c g-col-4 g-col-2-m g-gap-32-64-m
            insights-content-wrapper lr-pad-d lr-pad-m">
                { renderInsights(data) }
            </div>
            <style jsx>{`
                .insights-content-wrapper {
                    background-color: var(--primary-bg);
                    padding-top: 2rem;
                    padding-bottom: 2rem;
                }

                .insights-content-wrapper .insight-block
                .data {
                    color: var(--primary);
                    line-height: 59px;
                    margin: 0 0 var(--peaky-gap-16);
                }

                .insights-content-wrapper .insight-block
                .info {
                    font-weight: 300;
                    white-space: pre-wrap;
                }

                @media only screen and (max-device-width: 760px) {
                    .insights-content-wrapper {
                        padding-top: 4rem;
                        padding-bottom: 4rem;
                    }

                    .insights-content-wrapper .insight-block {
                        width: unset;
                    }

                    .insights-content-wrapper .insight-block
                    .info {
                        white-space: unset;
                    }
                }
            `}</style>
        </>
    )
}

export default Insights;