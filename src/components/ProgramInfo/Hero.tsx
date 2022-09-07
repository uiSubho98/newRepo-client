import React from "react";
import { Button } from "antd";
import { IHeroContent } from "../../interfaces/program-info";

interface IProps extends IHeroContent {
    apply: Function;
    hasApplied: boolean;
    isLoading: boolean;
    status: number;
}

const Hero = (props: IProps) => {

    const { 
        apply, 
        heading, 
        hasApplied, 
        isLoading, 
        sub_heading, 
        image_src, 
        close_date, 
        status 
    } = props;
    console.log(props)
    return (
        <>
            <div className="hero-container f-d f-h-sb lr-pad-d 
            f-v-c lr-pad-m f-vt-m">
                <div className="hero-left">
                    <div className="hero-heading">{heading}</div>
                    <div className="hero-sub-head">{sub_heading}</div>
                    <Button type="primary" className="default-blue-btn btn-small"
                    id="apply-btn" onClick={() => apply()} loading={isLoading}
                    disabled={status === 0 || hasApplied}>
                        { hasApplied ? "Applied" : "Apply Now" }
                    </Button>
                    <div className="closing-date">{close_date}</div>
                </div>
                <div className="hero-right">
                    <div className=" bg-image-full"
                         style={{backgroundImage: "url(" + image_src + ")"}}
                    />
                </div>
            </div>
            <style jsx>{`
                .hero-container {
                    font-family: "Nunito sans", sans-serif;
                    margin-top: 8rem;
                    margin-bottom: 4rem;
                    height: 25rem;
                    background-color: var(--crow);
                }

                .hero-left {
                    width: 50%;
                    height: 100%;
                }

                .hero-right {
                    width: 40%;
                    height: 100%;
                }

                .hero-left .hero-heading {
                    font-size: 36px;
                    font-weight: 500;
                    color: var(--dove);
                    margin-bottom: 28px;
                    font-family: "Poppins";
                }

                .hero-left .hero-sub-head {
                    font-size: 18px;
                    font-weight: 300;
                    color: var(--dove);
                    margin-bottom: 32px;
                }

                .hero-left .closing-date {
                    color: var(--carbon);
                    font-size: 14px;
                    background: var(--joy);
                    margin-top: 2rem;
                    padding: 4px 32px 4px 12px;
                    width: max-content;
                    position: relative;
                    border-radius: 2px 0 0 2px;
                }

                .hero-left .closing-date::after {
                    content: "";
                    width: 28px;
                    height: 28px;
                    background: var(--crow);
                    position: absolute;
                    top: 0;
                    transform: rotate(45deg);
                    right: -12px;
                }

                .hero-right {
                    display: flex;
                    justify-content: flex-end;
                }

                .hero-right .hero-img {
                    height: 100%;
                }

                .hero-right .bg-image-full {
                    width: 100%;
                }

                #apply-btn {
                    height: 50px;
                    width: 160px;
                    border: none;
                }

                @media only screen and (max-width: 768px) {
                    .hero-right .bg-image-full {
                        height: 420px;
                    }

                    .hero-container {
                        margin-top: 5rem;
                        height: 32rem;
                        padding-bottom: 20px;
                    }

                    .hero-left .hero-heading {
                        font-size: 32px;
                    }

                    .hero-left, .hero-right {
                        width: 100%;
                    }
                }
            `}</style>
        </>
    )
}

export default Hero;