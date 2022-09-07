import React from "react";

const WorkshopSkeleton = () => {
    return (
        <>
            <div className="workshop-skeleton-wrapper">
                <div className="hero-skeleton-wrapper g-d g-col-2 g-col-1-m
                lr-pad-d lr-pad-m tb-pad-d tb-pad-m">
                    <div className="left-pane">
                        <div className="skeleton-heading w-90"></div>
                        <div className="skeleton-heading w-50"></div>

                        <div className="description">
                            <div className="skeleton-paragraph w-90"></div>
                            <div className="skeleton-paragraph w-70"></div>
                        </div>

                        <div className="skeleton-btn">
                            <div className="skeleton-paragraph"></div>
                        </div>
                    </div>
                    <div className="f-d f-h-e right-pane">
                        <div className="skeleton-image">
                        </div>
                    </div>
                </div>
                <div className="overview-skeleton-wrapper lr-pad-d lr-pad-m
                tb-pad-d tb-pad-m w-70">
                    <div className="skeleton-heading w-50"></div>
                    <div className="skeleton-paragraph w-100"></div>
                    <div className="skeleton-paragraph w-80"></div>

                    <div className="content">
                        <div className="skeleton-paragraph w-80"></div>
                        <div className="skeleton-paragraph w-90"></div>
                        <div className="skeleton-paragraph w-70"></div>
                    </div>

                    <div className="content">
                        <div className="skeleton-paragraph w-80"></div>
                        <div className="skeleton-paragraph w-90"></div>
                        <div className="skeleton-paragraph w-70"></div>
                    </div>

                </div>
            </div>
            <style jsx>{`
                .workshop-skeleton-wrapper .hero-skeleton-wrapper 
                .description {
                    margin: var(--peaky-gap-32) 0 var(--peaky-gap-48); 
                }

                .workshop-skeleton-wrapper .skeleton-paragraph {
                    margin: 0 0 var(--peaky-gap-16);
                }

                .workshop-skeleton-wrapper .skeleton-btn 
                .skeleton-paragraph {
                    width: 120px;
                    height: 15px;
                    margin: 0;
                }

                .workshop-skeleton-wrapper .hero-skeleton-wrapper
                .right-pane .skeleton-image {
                    height:100%;
                    width: 80%;
                }

                .workshop-skeleton-wrapper .overview-skeleton-wrapper 
                .content {
                    margin: var(--peaky-gap-48) 0;
                }

                @media only screen and (max-device-width: 760px) {

                    .workshop-skeleton-wrapper .hero-skeleton-wrapper
                    .left-pane {
                        order: 2;
                    }

                    .workshop-skeleton-wrapper .hero-skeleton-wrapper
                    .right-pane {
                        height: 300px;
                    }

                    .workshop-skeleton-wrapper .overview-skeleton-wrapper {
                        width: 100%;
                    }

                    .workshop-skeleton-wrapper .hero-skeleton-wrapper 
                    .right-pane .skeleton-image {
                        width: 100%;
                    }

                    .workshop-skeleton-wrapper .overview-skeleton-wrapper 
                    .content .w-90 {
                        width: 100%;
                    }
                }
            `}</style>
        </>
    )
}

export default WorkshopSkeleton;