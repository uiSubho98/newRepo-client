import React from "react";
// @ts-ignore
import {Link} from "react-router-dom";

interface IHero {
    title?: string;
    description?: string;
    imageSrc?: string;
}

interface IProps {
    data?: IHero;
}

const Hero = (props:IProps) => {
    const { data } = props;
    return (
        <>
            <div className="g-d g-col-2 g-col-1-m hero-content-wrapper
            lr-pad-d lr-pad-m tb-pad-d tb-pad-m">
                <div className="f-d f-h-sb left-pane">
                    {/* <div className="calender-container">
                        <div className="g-d g-h-c calender">
                            <span className="f-d f-h-c month">OCT</span>
                            <span className="f-d f-h-c date">12</span>
                        </div>
                    </div> */}
                    <div className="main">
                        <h1 className="h1-heading">
                            { data && data.title }
                        </h1>
                        <span className="f-d body-regular description">
                            { data && data.description }
                        </span>
                        <Link to="/register/microdegree?rurl=/learning-dashboard/microdegree&type=free">
                            <div className="action-element default-purple-btn filled-purple
                            cap-letter">
                                Learn for free
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="right-pane bg-image-full"
                style={{
                    backgroundImage: "url(" + (data && data.imageSrc) + ")"
                }}>

                </div>
            </div>
            <style jsx>{`

                .navbar-container {
                    background-color: var(--smoke);
                }

                .hero-content-wrapper {
                    background-color: var(--smoke);
                }

                .hero-content-wrapper .left-pane .main .description {
                    white-space: pre-wrap;
                }

                .hero-content-wrapper .left-pane .action-element {
                    margin: var(--peaky-gap-48) 0 0;
                }

                .hero-content-wrapper .left-pane .calender-container {
                    margin: var(--peaky-gap-16) var(--peaky-gap-32) 0 0;
                }

                .hero-content-wrapper .left-pane .calender-container
                .calender {
                    box-shadow: var(--peaky-shadow);
                }

                .hero-content-wrapper .left-pane .calender-container
                .calender .month {
                    background-color: var(--purple);
                    color: var(--dove);
                    padding: 4px 12px;
                    width:100%;
                }

                .hero-content-wrapper .left-pane .calender-container
                .calender .date {
                    color: var(--carbon);
                    padding: 10px 12px;
                }

                .hero-content-wrapper .right-pane {
                    background-position: right;
                    height: 350px;
                }

                @media only screen and (max-device-width: 760px) {

                    .hero-content-wrapper .left-pane {
                        flex-direction: column;
                        order: 2;
                    }

                    .hero-content-wrapper .left-pane .calender-container 
                    .calender {
                        width: 20%;
                        margin: 0 0 var(--peaky-gap-16);
                    }

                }

                @media screen and (min-width: 768px) and 
                (max-width: 1023px) and (orientation: portrait) {
                    .hero-content-wrapper {
                        grid-template-columns: 1fr;
                    }

                    .hero-content-wrapper .left-pane {
                        order: 2;
                    }

                    .hero-content-wrapper .right-pane {
                        background-position: center;
                        margin-bottom: var(--peaky-gap-16);
                    }
                }
            `}</style>
        </>
    )
}

export default Hero;