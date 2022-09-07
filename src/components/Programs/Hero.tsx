import React from "react";
import { IHeroContent } from "../../interfaces/programs";
import Achievements from "../Home/Achievements";

interface IProps {
    data: IHeroContent;
}

const Hero = (props: IProps) => {

    const { image, mob_image, title, description, achievements } = props.data;

    const handleScroll = () => {
        const element = document.getElementById("programs");
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
                <button className="default-blue-btn explore-programs-btn"
                onClick={() => handleScroll()}>
                    Explore Programs
                </button>
                <Achievements achievements={achievements} />
            </div>
            <style jsx>{`
                .hero-content-wrapper {
                    background-image: url(${image});
                }

                .hero-content-wrapper .title {
                    white-space: pre-wrap;
                    line-height: 75px;
                }

                .hero-content-wrapper .description {
                    font-weight: 200;
                    margin: var(--peaky-gap-16) 0 var(--peaky-gap-32);
                    white-space: pre-wrap;
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
                        line-height: 56px;
                    }

                    .hero-content-wrapper .title,
                    .hero-content-wrapper .description {
                        white-space: unset;
                    }

                    .hero-content-wrapper .explore-programs-btn {
                        width: 100%;
                    }
                }
            `}</style>
        </>
    )
}

export default Hero;