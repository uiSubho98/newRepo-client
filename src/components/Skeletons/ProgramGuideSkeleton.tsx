import React from "react";

const ProgramGuideSkeleton = () => {
    return (
        <>
            <div className="program-guide-skeleton-wrapper g-d g-h-c">
                <div className="skeleton-heading w-40"></div>
                <div className="g-d program-guide-skeleton w-60">
                    <div className="left-pane">
                        <div className="skeleton-paragraph w-80"></div>
                        <div className="skeleton-paragraph w-60"></div>
                    </div>
                    <div className="f-d f-v-c f-h-e f-h-s-m right-pane">
                        <div className="skeleton-btn">
                            <div className="skeleton-paragraph w-20"></div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .program-guide-skeleton-wrapper {
                    margin: var(--peaky-gap-32) 0 0;
                }

                .program-guide-skeleton-wrapper
                .program-guide-skeleton {
                    background-color: var(--secondary-bg);
                    grid-template-columns: 3fr 1fr;
                    padding: var(--peaky-gap-32);
                    margin: var(--peaky-gap-64) 0;
                }

                .program-guide-skeleton-wrapper
                .skeleton-heading, 
                .program-guide-skeleton-wrapper
                .skeleton-paragraph{
                    opacity: 0.54;
                }

                .program-guide-skeleton-wrapper
                .program-guide-skeleton .right-pane
                .skeleton-btn .skeleton-paragraph {
                    width: 100px;
                    height: 15px;
                }

                .program-guide-skeleton-wrapper
                .program-guide-skeleton .left-pane 
                .skeleton-paragraph:nth-of-type(2) {
                    margin: var(--peaky-gap-16) 0 0;
                }

                @media only screen and (max-device-width: 760px) {
                    .program-guide-skeleton-wrapper
                    .program-guide-skeleton {
                        grid-template-columns: 1fr;
                        margin: var(--peaky-gap-32) 0;
                        padding: var(--peaky-pad-16);
                        width: 100%;
                    }

                    .program-guide-skeleton-wrapper
                    .program-guide-skeleton .right-pane {
                        margin: var(--peaky-gap-16) 0 0;
                    }

                    .program-guide-skeleton-wrapper
                    .skeleton-heading {
                        width: 100%;
                    }
                }
            `}</style>
        </>
    )
}

export default ProgramGuideSkeleton;