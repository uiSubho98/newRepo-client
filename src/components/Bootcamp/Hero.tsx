import React from "react";
import { isMobile } from "react-device-detect";
import { IHeroContent } from "../../interfaces/bootcamp";
import Moment from "moment-timezone";

interface IProps {
    status: number;
    data?: IHeroContent;
    hasPurchased?: boolean;
    enroll: Function;
    countryName: string;
}

const Hero = (props: IProps) => {
    const { status, data, hasPurchased, enroll, countryName } = props;

    let sellingPrice:any = 0;
    let actualPrice:any = 0;

    if(data) {
        sellingPrice = data?.sellingPrice[countryName]?.sp;
        actualPrice = data?.actualPrice ? data?.actualPrice[countryName]?.sp : "";
    }
    let currency = countryName === "India" ? "INR" : "USD";

    if(currency.toLocaleLowerCase() === "inr") {
        sellingPrice = sellingPrice.toLocaleString('en-IN');
        actualPrice = actualPrice.toLocaleString('en-IN');
    }
    
    return (
        <>
            <div className="lr-pad-d lr-pad-m bg-image 
            hero-content-wrapper" style={{ 
                backgroundImage: "url(" + ( 
                    isMobile? data?.mob_image : data?.image ) + ")" 
            }}>
                <h1 className="font-heading text-xxl title">
                    { data?.title }
                </h1>
                <span className="f-d text-big description">
                    { data?.description }
                </span>
                <span className="font-heading text-large price">
                    { currency }&nbsp;
                    <span className="strike-through">
                        { actualPrice }
                    </span>
                    { actualPrice ? " " : "" }
                    { sellingPrice }
                </span>
                <button className="default-blue-btn enrol-now-btn" 
                onClick={() => enroll("hero")} disabled={!hasPurchased && status === 0}>
                    { 
                        !hasPurchased ? (status === 0 ? 
                        "Enrollments Will Begin Soon" : "Enrol Now") : 
                        "Go To Dashboard"
                    }
                </button>
                {
                    !hasPurchased && status === 1 && data?.nextBatch &&
                    <span className="batch-start-text text-faded-2">
                        New batches starting { Moment(data.nextBatch * 1000)
                        .tz("asia/kolkata").format("DD MMM YYYY") 
                        }
                    </span>
                }
            </div>
            <style jsx>{`
                .hero-content-wrapper {
                    padding-top: 6rem;
                    padding-bottom: 6rem;
                }

                .hero-content-wrapper .title {
                    line-height: 59px;
                    white-space: pre-wrap;
                }

                .hero-content-wrapper .description {
                    color: var(--dove);
                    font-weight: 400;
                    margin: var(--peaky-gap-16) 0 var(--peaky-gap-8);
                    opacity: 0.80;
                    white-space: pre-wrap;
                }

                .hero-content-wrapper .price .strike-through {
                    opacity: 0.87;
                    position: relative;
                }

                .hero-content-wrapper .price .strike-through:before {
                    content: '';
                    width: 100%;
                    height: 3px;
                    background: var(--tomato);
                    position: absolute;
                    top: 50%;
                    left: 0; 
                    right: 0;
                }

                .hero-content-wrapper .enrol-now-btn {
                    margin: var(--peaky-gap-32) 0;
                }

                .hero-content-wrapper .enrol-now-btn:disabled {
                    opacity: 0.4;
                    cursor: not-allowed;
                }
                
                @media only screen and (max-device-width: 760px) { 
                    .hero-content-wrapper {
                        background-size: contain;
                        background-position: top;
                        padding-top: 15rem;
                        padding-bottom: 2rem;
                    }

                    .hero-content-wrapper .title {
                        line-height: 50px;
                    }

                    .hero-content-wrapper .description {
                        margin-bottom: var(--peaky-gap-16);
                        white-space: unset;
                    }

                    .hero-content-wrapper .enrol-now-btn {
                        width: 100%;
                    }
                }
            `}</style>
        </>
    )
}

export default Hero;