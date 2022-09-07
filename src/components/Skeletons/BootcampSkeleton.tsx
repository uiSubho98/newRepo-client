import React from "react";

const BootcampSkeleton = () => {

    const renderHero = () => {
        return (
            <div className="g-d g-col-b-s g-col-1-m hero-skeleton-wrapper">
                <div className="left-pane lr-pad-d lr-pad-m
                tb-pad-d tb-pad-m">
                    <div className="skeleton-paragraph w-20"></div>
                    <div className="skeleton-heading w-80"></div>
                    <div className="skeleton-heading w-50"></div>

                    <div className="description">
                        <div className="skeleton-paragraph w-90"></div>
                        <div className="skeleton-paragraph w-90"></div>
                        <div className="skeleton-paragraph w-90"></div>
                        <div className="skeleton-paragraph w-70"></div>
                    </div>

                    <div className="action-block">
                        <div className="skeleton-paragraph w-40"></div>
                        <div className="skeleton-btn">
                            <div className="skeleton-paragraph"></div>
                        </div>
                    </div>
                </div>
                <div className="right-pane">
                    <div className="skeleton-image">

                    </div>
                </div>
            </div>
        )
    }

    const renderOverview = () => {

        const renderFaqs = () => {
            let faqs = [];
            for(let index = 0; index < 5; index++) {
                faqs.push(
                    <div className="faq">
                        <div className="question">
                            <div className="skeleton-paragraph w-70"></div>
                            <div className="skeleton-paragraph w-50"></div>
                        </div>
                        <div className="answer">
                            <div className="skeleton-paragraph w-90"></div>
                            <div className="skeleton-paragraph w-80"></div>
                        </div>
                    </div>
                )
            }
            return faqs;
        }

        return (
            <div className="program-overview-skeleton-wrapper
            lr-pad-d lr-pad-m tb-pad-d tb-pad-m">
                <div className="skeleton-heading w-30"></div>
                <div className="g-d g-col-2 g-col-1-m content">
                    { renderFaqs() }
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="bootcamp-skeleton-wrapper">
                { renderHero() }
                { renderOverview() }
            </div>
            <style jsx>{`

                .hero-skeleton-wrapper .description {
                    margin: var(--peaky-gap-24) 0;
                }

                .hero-skeleton-wrapper .description 
                .skeleton-paragraph {
                    margin: var(--peaky-gap-8) 0 0;
                }

                .hero-skeleton-wrapper .action-block {
                    margin: var(--peaky-gap-64) 0 0;
                }

                .hero-skeleton-wrapper .action-block 
                .skeleton-btn {
                    margin: var(--peaky-gap-24) 0 0;
                }

                .hero-skeleton-wrapper .action-block 
                .skeleton-btn .skeleton-paragraph {
                    width: 100px;
                    height: 15px;
                }

                .hero-skeleton-wrapper .right-pane
                .skeleton-image {
                    height:100%;
                }

                .program-overview-skeleton-wrapper .content {
                    grid-gap: 0 var(--peaky-gap-128);
                }

                .program-overview-skeleton-wrapper .content .faq {
                    margin: var(--peaky-gap-32) 0 0;
                }

                .program-overview-skeleton-wrapper .content .faq
                .answer {
                    margin: var(--peaky-gap-16) 0 0;
                }

                .program-overview-skeleton-wrapper .content
                .faq .skeleton-paragraph {
                    margin: var(--peaky-gap-8) 0 0;
                }
            `}</style>
        </>
    )
}

export default BootcampSkeleton;