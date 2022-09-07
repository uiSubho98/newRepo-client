import React from "react";
import Feature from "./Feature";
import { IFeatures, IFeature } from "../../interfaces/talent-solutions";

interface IProps {
    data: IFeatures;
}

const Features = (props: IProps) => {

    const { title, list } = props.data;

    const renderFeatures = () => {
        return list.map((listItem: IFeature, key: number) => 
            <Feature key={key} data={listItem} />
        )
    }

    return (
        <>
            <div className="features-wrapper f-d f-vt f-v-c lr-pad-d lr-pad-m 
            tb-pad-d tb-pad-m">
                <h1 className="font-heading text-xl text-c-d title">
                    { title }
                </h1>
                <div className="g-d g-col-2 g-col-1-m g-gap-64 
                g-gap-32-m features-list">
                    { renderFeatures() }
                </div>
            </div>
            <style jsx>{`
                .features-wrapper {
                    background-color: var(--primary-bg);
                }

                .features-wrapper .features-list {
                    margin: var(--peaky-gap-64) 0 0;
                    width: 95%;
                }

                .features-wrapper .features-list .feature {
                    border-radius: var(--peaky-br-4);
                    padding: var(--peaky-pad-16) var(--peaky-pad-32);
                    width:100%
                }

                .features-wrapper .features-list .feature .name {
                    color: var(--dove);
                    font-size: 36px;
                    font-weight: 800;
                }

                .features-wrapper .features-list .feature .gist {
                    font-weight: 300;
                    opacity: 0.87;
                    white-space: pre-wrap;
                }

                @media only screen and (max-device-width: 760px) {
                    .features-wrapper .title {
                        line-height: 36px;
                    }

                    .features-wrapper .features-list {
                        grid-row-gap: var(--peaky-gap-16); 
                        width: 100%;
                    }

                    .features-wrapper .features-list .feature {
                        padding: var(--peaky-pad-16);
                    }

                    .features-wrapper .features-list .feature .name {
                        font-size: 24px;
                        line-height: 24px;
                    }

                    .features-wrapper .features-list .feature .gist {
                        font-size: 16px;
                        margin: var(--peaky-gap-8) 0 0;
                        white-space: unset;
                    }
                }
            `}</style>
        </>
    )
}

export default Features;