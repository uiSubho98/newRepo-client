import React from 'react';

const MicroDegreeSkeleton = () => {
    return (
        <>
            <div className="skeleton-hero lr-pad-d tb-pad-d lr-pad-m tb-pad-m f-d f-vt-m f-v-c f-h-sb">
                <div className="left-container">
                    <div className="skeleton-heading w-80"></div>
                    <div className="skeleton-heading w-50"></div>
                    <div className="skeleton-paragraph w-60"></div>
                    <div className="skeleton-paragraph w-40"></div>
                    <div className="skeleton-paragraph w-20"></div>
                </div>
                <div className="right-container">
                    <div className="video-card">
                        <div className="skeleton-video f-d f-v-c f-h-c micdeg-skeleton-video">
                            <div className="skeleton-circle"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="year-heading lr-pad-d lr-pad-m">
                <div className="skeleton-heading w-60">
                </div>
            </div>
            <div className="skeleton-year lr-pad-d lr-pad-m">
                <div className="skeleton-card">
                </div>
            </div>
            <style jsx>
                {`
                .skeleton-hero .left-container {
                    width: 50%;
                }

                .left-container > .skeleton-heading:nth-child(2) {
                    margin-bottom: 2rem;
                }

                .skeleton-hero .left-container > .skeleton-paragraph {
                    margin-bottom: 8px;
                }

                .skeleton-hero .right-container .skeleton-video {
                    width: 432px;
                }

                .micdeg-skeleton-video {
                    height: 432px;
                }

                .video-card .body {
                    padding: 1rem;
                }

                .video-card .body .skeleton-heading {
                    height: 40px;
                    margin-top: 0;
                }

                .video-card .body .skeleton-paragraph {
                    margin-bottom: 8px;
                }

                .skeleton-year {
                    margin-top: 64px;
                }

                @media only screen and (max-device-width: 760px) {
                    .skeleton-hero .left-container {
                        width: 90vw;
                        margin-bottom: 3rem;
                    }

                    .skeleton-hero .right-container .skeleton-video {
                        width: 90vw;
                    }

                    .year-heading > .skeleton-heading {
                        width: 100%;
                    }
                }

                @media only screen and (max-device-width: 360px) {
                }
                `}
            </style>
        </>
    );
}

export default MicroDegreeSkeleton;
