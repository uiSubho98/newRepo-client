import React from "react";
import { IBenefits } from "../../interfaces/microdegree";
import CheckIcon from "../../assets/icons/svg_icons/icon-checked.svg";

interface IProps {
    data?: IBenefits
}

const Benefits = (props: IProps) => {
    const { data } = props;

    const renderBenefits = (benefits: Array<string> = []) => {
        return benefits.map((benefit) =>
            <div className="f-d f-v-s benefit">
                <div className="bg-image-full check-icon" style={{
                    backgroundImage: "url(" + CheckIcon + ")"
                }}></div>&nbsp;
                <span className="text-regular">
                    { benefit }
                </span>
            </div>
        );
    }

    return (
        <>
            <div id="benefits" className="benefits-content-wrapper tb-pad-d tb-pad-m
            lr-pad-d lr-pad-m">
                <h1 className="font-heading text-xl text-c-d">
                    { data?.title }
                </h1>
                <div className="g-d g-col-2 g-col-1-m g-v-c g-gap-64">
                    <div className="image-block">
                        <div className="bg-image-full image" style={{
                            backgroundImage: "url(" + data?.image + ")"
                        }}></div>
                    </div>
                    <div className="benefits-list w-90">
                        { renderBenefits(data?.list) }
                    </div>
                </div>
            </div>
            <style jsx>{`
                .benefits-content-wrapper > div:first-of-type {
                    margin: var(--peaky-gap-32) 0 0;
                }

                .benefits-content-wrapper .image-block
                .image {
                    background-position: top;
                    height: 512px;
                    width: 512px;
                }

                .benefits-content-wrapper .benefits-list
                .benefit {
                    margin: 0 0 var(--peaky-gap-16);
                }

                .benefits-content-wrapper .benefits-list
                .benefit .check-icon {
                    height: 25px;
                    width: 25px;
                    margin: 2px var(--peaky-gap-16) 0 0;
                }

                .benefits-content-wrapper .benefits-list
                .benefit > span {
                    flex: 1;
                }

                @media only screen and (max-device-width: 760px) {
                    .benefits-content-wrapper > div:first-of-type {
                        grid-gap: 0;
                        margin: 0;
                    }

                    .benefits-content-wrapper .image-block .image {
                        height: 350px;
                        width: 100%;
                    }

                    .benefits-content-wrapper > div:first-of-type
                    .benefits-list {
                        width: 100%;
                    }
                }
            `}</style>
        </>
    )
}

export default Benefits;