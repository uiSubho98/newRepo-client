import React from 'react';

const AboutUsSkeleton = () => {
    return (
        <>
            <div className="lr-pad-d lr-pad-m f-d f-vt f-vt-m f-v-c f-v-s-m
            aboutus-skeleton-container">
                {/* <div className="skeleton-heading w-80"></div>
                <div className="skeleton-heading w-50"></div> */}
                {/* <div className="skeleton-heading w-50 hide-d f-m"></div> */}
                {/* <div className="skeleton-paragraph w-70"></div> */}
                {/* <div className="skeleton-paragraph w-70 hide-d f-m"></div> */}
                <div className="skeleton-heading w-40"></div>
                <div className="skeleton-paragraph w-70"></div>
                <div className="skeleton-paragraph w-70"></div>
                <div className="skeleton-paragraph w-40"></div>
                <div className="skeleton-card skeleton-initial-team"></div>
                <div className="skeleton-paragraph w-70"></div>
                <div className="skeleton-paragraph w-70"></div>
                <div className="skeleton-paragraph w-40"></div>
                <div className="skeleton-paragraph w-70"></div>
                <div className="skeleton-paragraph w-70"></div>
                <div className="skeleton-paragraph w-40"></div>
            </div>
            <style jsx>
                {`
                .aboutus-skeleton-container .skeleton-heading:nth-of-type(6) {
                    margin-top: 128px;
                }

                .aboutus-skeleton-container .skeleton-paragraph {
                    margin-top: 8px;
                }

                .aboutus-skeleton-container .skeleton-initial-team {
                    margin: 64px 0;
                    width: 706px;
                }

                .aboutus-skeleton-container .skeleton-paragraph:last-child {
                    margin-bottom: var(--peaky-gap-64);
                }

                @media only screen and (max-device-width: 760px) {
                    .aboutus-skeleton-container .skeleton-heading:nth-of-type(6) {
                        margin-top: 32px;
                    }

                    .aboutus-skeleton-container .skeleton-initial-team {
                        margin: 32px 0;
                        width: 100%;
                    }

                    .aboutus-skeleton-container .w-40 {
                        width: 80%;
                    }

                    .aboutus-skeleton-container .w-70 {
                        width: 100%;
                    }
                    
                }
                `}
            </style>
        </>
    );
}

export default AboutUsSkeleton;
