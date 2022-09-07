import React from "react";
import Achievements from "../Home/Achievements";
import { IHeroContent } from "../../interfaces/talent-solutions";

interface IProps {
    data: IHeroContent
}

const Hero = (props: IProps) => {
    const { title, description, image, mob_image, achievements } = props.data;

    const handleScroll = () => {
        const element = document.getElementById("process");
        if(element) {
            element.scrollIntoView({
                behavior: "smooth"
            });
        } 
    }

    return (
        <>
            <div className="hero-content-wrapper bg-image lr-pad-d lr-pad-m 
            tb-pad-d tb-pad-m">
                <h1 className="font-heading text-xxxl title">{ title }</h1>
                <p className="text-big description">{ description }</p>
                <button className="default-blue-btn know-more-btn" 
                onClick={() => handleScroll()}>
                    Know More
                </button>
                <Achievements achievements={achievements} />
            </div>
            <style jsx>{`
                .hero-content-wrapper {
                    background-image: url(${image});
                }

                .hero-content-wrapper .title {
                    line-height: 75px;
                    white-space: pre-wrap;
                }

                .hero-content-wrapper .description {
                    font-weight: 200;
                    margin: var(--peaky-gap-16) 0 0;
                    white-space: pre-wrap;
                }

                .hero-content-wrapper .know-more-btn {
                    margin: var(--peaky-gap-32) 0 0;
                    padding-left: var(--peaky-gap-48);
                    padding-right: var(--peaky-gap-48);
                }

                @media only screen and (max-device-width: 760px) {
                    .hero-content-wrapper {
                        background-image: url(${mob_image});
                        background-size: contain;
                        background-position: top;
                        padding-top: 15rem;
                        padding-bottom: 2rem;
                    }

                    .hero-content-wrapper .title {
                        line-height: 48px;
                    }

                    .hero-content-wrapper .title,
                    .hero-content-wrapper .description {
                        white-space: unset;
                    }

                    .hero-content-wrapper .know-more-btn {
                        width: 100%;
                    }
                }
            `}</style>
        </>
    )
}

export default Hero;