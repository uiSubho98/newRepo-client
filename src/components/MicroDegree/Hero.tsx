import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { useHistory } from "react-router";
import { G_URL } from "../../constants/constants";
import { IHeroContent } from "../../interfaces/microdegree";
import { handleRegistrationSrc } from "../../utils/common.util";
import { check_login } from "../../utils/login.util";
import { decodeToken } from "../../utils/user-details.util";

interface IProps {
    data?: IHeroContent;
    hasPurchased?: boolean;
    enroll: Function;
}

const Hero = (props: IProps) => {
    const { data, hasPurchased, enroll } = props;

    const history = useHistory();

    const [ hasSubscribed, setSubscribed ] = useState<boolean>(false);

    useEffect(() => {
        if(check_login()) {
            const decodedToken = decodeToken();
            if(decodedToken.subscriptions && 
                decodedToken.subscriptions.microdegree) {
                setSubscribed(true);
            }
        }
    }, []);

    const register = () => {
        if(check_login()) {
            history.push({
                pathname: (!hasSubscribed && !hasPurchased) ? "/register" : "/learning-dashboard/microdegree"
            })
        } else {
            handleRegistrationSrc("microdegree-hero-component");
            window.location.href = G_URL + "signup?rurl=/register&action=microdegree"
        }
    }

    return (
        <>
            <div className="lr-pad-d lr-pad-m bg-image 
            hero-content-wrapper" style={{ 
                backgroundImage: "url(" + ( 
                    !isMobile ? data?.image : data?.mob_image 
                ) + ")" 
            }}>
                <h1 className="font-heading text-xxl title">
                    { data?.title }
                </h1>
                <span className="f-d text-big description">
                    { data?.description }
                </span>
                <div className="f-d f-vt-m action-block">

                    {/* Enrollment closed */}

                    {
                        !hasPurchased &&
                        <button className="default-blue-btn
                        enrol-now-btn btn-disabled" onClick={() => enroll("hero")} disabled>
                            Enrollments Will Begin Soon
                        </button>
                    }

                    {(hasSubscribed && hasPurchased) && (
                        <button className="default-blue-btn
                            outline-white try-for-free-btn" 
                            onClick={() => register()}>
                                Go To Learning Dashboard 
                        </button>
                    )}


                    {/* Enrollment Open */}

                    {/* {
                        !hasPurchased &&
                        <button className="default-blue-btn
                        enrol-now-btn" onClick={() => enroll("hero")} disabled>
                            Enroll Now
                        </button>
                    }

                    <button className="default-blue-btn
                    outline-white try-for-free-btn" 
                    onClick={() => register()}>
                        { (!hasSubscribed && !hasPurchased) ? "Try for free" : "Go To Learning Dashboard" }
                    </button> */}

                    
                </div>
            </div>
            <style jsx>{`
                .hero-content-wrapper {
                    padding-top: 6rem;
                    padding-bottom: 6rem;
                }

                .btn-disabled{
                    opacity:0.4;
                    cursor: not-allowed;
                }

                .hero-content-wrapper .title {
                    line-height: 59px;
                }

                .hero-content-wrapper .description {
                    color: var(--dove);
                    font-weight: 300;
                    margin: var(--peaky-gap-16) 0 var(--peaky-gap-8);
                    opacity: 0.87;
                    white-space: pre-wrap;
                }

                .hero-content-wrapper .action-block {
                    margin: var(--peaky-gap-32) 0;
                }

                .hero-content-wrapper .action-block 
                .enrol-now-btn {
                    margin: 0 var(--peaky-gap-16) 0 0;
                }

                @media only screen and (max-device-width: 760px) {
                    .hero-content-wrapper {
                        background-position: top;
                        background-size: contain;
                        padding-top: 15rem;
                        padding-bottom: 4rem;
                    }

                    .hero-content-wrapper .action-block {
                        margin-bottom: 0;
                    }

                    .hero-content-wrapper .action-block 
                    .enrol-now-btn,
                    .hero-content-wrapper .action-block 
                    .try-for-free-btn {
                        width: 100%;
                    }

                    .hero-content-wrapper .action-block 
                    .enrol-now-btn {
                        margin: 0 0 var(--peaky-gap-16);
                    }

                    .hero-content-wrapper .action-block 
                    .try-for-free-btn {
                        margin: 0;
                    }

                    .hero-content-wrapper .title {
                        line-height: 50px;
                    }

                    .hero-content-wrapper .description {
                        white-space: unset;
                    }
                }
            `}</style>
        </>
    )
}

export default Hero;