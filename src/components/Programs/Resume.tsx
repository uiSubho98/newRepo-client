import React from "react";
import { IResume } from "../../interfaces/bootcamp";

interface IProps {
    data?: IResume;
}

const Resume = (props: IProps) => {

    const { data } = props;

    return (
        <>
            <div className="g-d g-v-c g-col-b-s g-col-1-m resume-content-wrapper">
                <div className="g-d g-col-2 g-col-1-m w-90">
                    <div className="f-d f-h-c f-v-e resume before bg-image-full"
                    style={{
                        backgroundImage: "linear-gradient(360deg, #1E1E1E 0%, rgba(30, 30, 30, 0) 100%), url(" + data?.before + ")"
                    }}>
                        <span className="font-heading text-medium
                        cap-letter">
                            Before
                        </span>
                    </div>
                    <div className="f-d f-h-c f-v-e resume after bg-image-full"
                    style={{
                        backgroundImage: "linear-gradient(360deg, #1E1E1E 0%, rgba(30, 30, 30, 0) 100%), url(" + data?.after + ")"
                    }}>
                        <span className="font-heading text-medium
                        cap-letter">
                            After
                        </span>
                    </div>
                </div>
                <div className="w-90 f-d font-heading text-large description">
                    { data?.description }
                </div>
            </div>
            <style jsx>{`
                .resume-content-wrapper {
                    grid-column-gap: 32px;
                    margin: var(--peaky-gap-64) 0;
                }

                .resume-content-wrapper .resume {
                    border-radius: 4px 4px 0px 0px;
                    height: 479px;
                    padding: var(--peaky-pad-16);
                    width: 343px;
                }

                .resume-content-wrapper .before {
                    margin: var(--peaky-gap-128) 0 0;
                }

                .resume-content-wrapper .description {
                    line-height: 35.6px;
                }

                .resume-content-wrapper .btn-disabled{
                    opacity:0.4;
                    cursor:not-allowed;
                }

                .resume-content-wrapper .action-block {
                    margin: var(--peaky-gap-32) 0 0;
                }

                .resume-content-wrapper .action-block
                .enrol-now-btn {
                    margin: 0 var(--peaky-gap-16) 0 0;
                }

                .resume-content-wrapper .enrol-now-btn:disabled {
                    opacity: 0.4;
                    cursor: not-allowed;
                }

                @media only screen and (max-device-width: 760px) {
                    .resume-content-wrapper {
                        margin: 0;
                    }

                    .resume-content-wrapper > div:first-of-type {
                        justify-items: center;
                        width: 100%;
                    }

                    .resume-content-wrapper .resume {
                        margin-bottom: var(--peaky-gap-32);
                        width: 100%;
                    }

                    .resume-content-wrapper .before {
                        margin-top: 0;
                    }

                    .resume-content-wrapper > div:nth-of-type(2) {
                        text-align: center;
                        width: 100%;
                    }

                    .resume-content-wrapper .action-block .enrol-now-btn {
                        margin: 0;
                    }

                    .resume-content-wrapper .enrol-now-btn {
                        width: 100%;
                    }

                    .resume-content-wrapper .action-block
                    .try-for-free-btn {
                        width: 100%;
                        margin: var(--peaky-gap-16) 0 0;
                    }
                }
            `}</style>
        </>
    )
}

export default Resume;