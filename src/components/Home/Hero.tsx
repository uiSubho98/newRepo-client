import React from "react";
import { isMobile } from "react-device-detect";
import Achievements from "./Achievements";
import { IAchievement } from "../../interfaces/programs";

interface Props {
    data ?: Content;
    handleScroll: Function;
}

interface Content {
    title ?: string;
    description ?: string;
    imageSrc ?: string;
    videoSrc ?: string;
    achievements ?: Array<IAchievement>;
}



const Hero = (props:Props) => {
    const { data, handleScroll } = props;

    return (
        <>
            <div className="hero-content-wrapper lr-pad-d tb-pad-d lr-pad-m tb-pad-m">
                <h1 className="text-xxxl font-heading title" dangerouslySetInnerHTML={{__html: (data && data.title ? data.title : '')}}>
                </h1>
                <span className="f-d text-big description text-faded-2">
                    { data && data.description }
                </span>
                <button className="default-blue-btn" onClick={() => handleScroll()}>
                    Explore Programs
                </button>
                { 
                    !isMobile && data?.achievements && 
                    <Achievements achievements={data.achievements} /> 
                }
            </div>
            <style jsx>{`
                .hero-content-wrapper {
                    background-image: url(${data && data.imageSrc});
                    background-repeat: no-repeat;
                    background-position: right center;
                    height: 700px;
                }
                
                .hero-content-wrapper .title {
                    width: 50%;
                    margin-top: 32px;
                    white-space: pre-wrap;
                }

                .hero-content-wrapper .description {
                    font-weight: 200;
                    max-width: 50%;
                }

                .hero-content-wrapper .title {
                    font-weight: 900;
                    line-height: 4.7rem;
                }

                .hero-content-wrapper .description {
                    margin: var(--peaky-gap-16) 0 var(--peaky-gap-32);
                }

                @media only screen and (max-device-width: 760px) {
                    .hero-content-wrapper {
                        height: 900px;
                        background-position: center calc(100% + 2.5rem);
                        background-size: auto 500px;
                    }

                    .hero-content-wrapper .title,
                    .hero-content-wrapper .description {
                        white-space: unset;
                        max-width: 100%;
                    }

                    .hero-content-wrapper .title {
                        width: 100%;
                        font-weight: 900;
                        line-height: 3.671rem;
                        margin-top: 0;
                    }

                    .hero-content-wrapper .default-blue-btn {
                        width: 100%;
                        margin-bottom: var(--peaky-gap-32);
                    }

                    .hero-content-wrapper .help-text {
                        margin-left: auto !important;
                        margin-right: auto !important;
                    }
                }

                @media only screen and (max-device-width: 380px) {
                    .hero-content-wrapper {
                        height: 950px;
                        background-size: auto 450px;
                    }
                }

                @media only screen and (max-device-width: 320px) {
                    .hero-content-wrapper {
                        height: 880px;
                        background-size: auto 380px;
                    }
                }
            `}</style>
        </>
    )
}

export default Hero;