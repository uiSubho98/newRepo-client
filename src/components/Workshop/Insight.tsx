import React from "react";
// @ts-ignore
import {Link} from "react-router-dom";

interface IProps { 
    imageSrc?: string;
}

const Insight = (props: IProps) => {
    const { imageSrc } = props;
    return (
        <>
            <div className="insight-wrapper g-d g-v-c g-col-2 g-col-1-m lr-pad-d 
            lr-pad-m tb-pad-d tb-pad-m">
                <div className="f-d f-vt left-pane w-80">
                    <span className="f-d body-big text-c-d
                    info">
                        Show off your app building skills on your CV, 
                        LinkedIn through the ProGrad Certificate.
                    </span>
                    <div className="f-d f-vt-m f-h-c f-v-c action-block">
                        <Link to="/register/microdegree?rurl=/learning-dashboard/microdegree">
                            <div className="enroll-btn default-purple-btn filled-purple
                            cap-letter">
                                Learn For Free
                            </div>
                        </Link>
                        <span className="body-regular strong-text
                        certificate-info">
                            ... and get a free certificate!
                        </span>
                    </div>
                </div>
                <div className="right-pane">
                    <div className="bg-image-full certificate-img" style={{ 
                        backgroundImage:"url("+imageSrc+")"}}>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .insight-wrapper .action-block {
                    margin: var(--peaky-gap-48) 0 0;
                }

                .insight-wrapper .action-block .certificate-info {
                    margin: 0 0 0 var(--peaky-gap-32);
                }

                .insight-wrapper .right-pane
                .certificate-img {
                    height: 350px;
                }

                @media only screen and (max-device-width: 760px) {
                    .insight-wrapper .left-pane {
                        width: 100%;
                    }

                    .insight-wrapper .action-block {
                        margin-top: var(--peaky-gap-24);
                    }

                    .insight-wrapper .action-block 
                    .certificate-info { 
                        margin-left: 0;
                        margin-top: var(--peaky-gap-16);
                    }

                    .insight-wrapper .info {
                        width: 100%;
                    }
                }

                @media screen and (min-width: 768px) and 
                (max-width: 1023px) and (orientation: portrait) {
                    .insight-wrapper {
                        grid-template-columns: 1fr;
                    }

                    .insight-wrapper .left-pane {
                        width: 100%;
                    }

                    .insight-wrapper .right-pane {
                        margin: var(--peaky-gap-24) 0 0; 
                    }
                }
            `}</style>
        </>
    )
}

export default Insight;