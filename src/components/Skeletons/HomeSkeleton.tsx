import React from "react";

const HomeSkeleton = () => {

    const renderHero = () => {
        return (
            <div className="g-d g-v-c g-col-2 g-col-1-m g-h-c-m hero-skeleton-wrapper tb-pad-d tb-pad-m">
                <div className="left-pane">
                    <div className="skeleton-heading w-90"></div>
                    <div className="skeleton-heading w-60"></div>
                    <div className="skeleton-heading w-70 hide-d f-m"></div>
                    <div className="description">
                        <div className="skeleton-paragraph w-90"></div>
                        <div className="skeleton-paragraph w-90"></div>
                    </div>
                    <div className="skeleton-btn">
                        <div className="skeleton-paragraph"></div>
                    </div>
                </div>
                <div className="g-d g-h-e right-pane">
                    <div className="skeleton-image"></div>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="skeleton-container lr-pad-d lr-pad-m">
                { renderHero() }
                <div className="g-d g-h-c testimonials-skeleton-wrapper tb-pad-d tb-pad-m">
                    <div className="skeleton-heading w-40 text-c-d"></div>
                    <div className="g-d g-col-3 g-gap-64 g-col-1-m w-100 testimonials-wrapper">
                        <div className="g-d g-col-1 g-gap-64">
                            <div className="skeleton-card-wrapper vid-testimonial"></div>
                            <div className="skeleton-card-wrapper text-testimonial"></div>
                        </div>
                        <div className="g-d g-col-1 g-gap-64 hide-m">
                            <div className="skeleton-card-wrapper text-testimonial"></div>
                            <div className="skeleton-card-wrapper text-testimonial"></div>
                        </div>
                        <div className="g-d g-col-1 g-gap-64 hide-m">
                            <div className="skeleton-card-wrapper vid-testimonial"></div>
                            <div className="skeleton-card-wrapper text-testimonial"></div>
                            <div className="skeleton-card-wrapper vid-testimonial"></div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`

                .hero-skeleton-wrapper .description {
                    margin: var(--peaky-gap-32) 0;
                }

                .hero-skeleton-wrapper .description 
                .skeleton-paragraph {
                    margin: var(--peaky-gap-8) 0 0;
                }

                .hero-skeleton-wrapper .skeleton-btn 
                .skeleton-paragraph {
                    width: 200px;
                    height: 15px;
                }

                .hero-skeleton-wrapper .right-pane
                .skeleton-image {
                    height:350px;
                    width:60%;
                }

                .testimonials-skeleton-wrapper .testimonials-wrapper {
                    margin-top: var(--peaky-gap-64);
                }

                .testimonials-skeleton-wrapper .testimonials-wrapper .vid-testimonial {
                    grid-row-end: span 1;
                    height: 200px;
                }

                .testimonials-skeleton-wrapper .testimonials-wrapper .text-testimonial {
                    grid-row-end: span 2;
                }

                @media only screen and (max-device-width: 760px) {
                    .hero-skeleton-wrapper .left-pane .skeleton-btn {
                        width: 100%;
                    }

                    .hero-skeleton-wrapper .right-pane .skeleton-image {
                        width: 100%;
                        margin-top: var(--peaky-gap-32);
                    }

                    .testimonials-skeleton-wrapper .skeleton-heading {
                        width: 85%;
                    }
                }
            `}</style>
        </>
    )
}

export default HomeSkeleton;