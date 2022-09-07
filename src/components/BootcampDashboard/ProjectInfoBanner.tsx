import React from "react";


interface IProps {
    isProjectSubmitted?: boolean;
    isProjectCompleted?: boolean;
    isProjectReviewed?: boolean;
    mentorMessage?: string;
}

const ProjectInfoBanner = (props:IProps) => {
    const { 
        isProjectSubmitted, 
        isProjectCompleted, 
        isProjectReviewed, 
        mentorMessage } = props;
    let activeClass = "active";
    if(isProjectCompleted || !isProjectSubmitted) {
        activeClass = "inactive";
    }
    return (
        <>
            <div className={`g-d project-info-banner ${activeClass}
            lr-pad-d lr-pad-m tb-pad-d tb-pad-m`}>
            { !isProjectReviewed ?
                <>
                    <div className="f-d f-h-c f-v-c check-icon">
                        <i className="icon icon-check"></i>
                    </div>
                    <div className="content">
                        <h2 className="h2-heading title">
                            Thanks for your submission!
                        </h2>
                        <span className="f-d body-big w-60">
                            Your project submission is being assessed by our mentors. 
                            Hold on tight, while we will soon update on your 
                            performance and eligibility for fullstack bootcamp!
                        </span>
                    </div>
                </> : 
                <>
                    <div className="content">
                        <h2 className="h2-heading content">
                            We have assessed your project...
                        </h2>
                        <span className="body-big">
                            Oops<span role="img" aria-label="sad" 
                            className="body-large">😕</span>, looks like 
                            you could not do well this time. No Problem, you can 
                            try again!
                        </span>
                        {
                            mentorMessage &&
                            <div className="message-block">
                                <h4 className="h4-heading">Message from Mentor</h4>
                                <span className="body-regular">
                                    {mentorMessage}
                                </span>
                            </div>
                        }
                    </div>
                </>
            }
            </div>
            <style jsx>{`

                .project-info-banner {
                    background-color: var(--smoke);
                }

                .project-info-banner.inactive {
                    display: none;
                }

                .project-info-banner .check-icon {
                    background-color: var(--pink);
                    border-radius: var(--peaky-br-full);
                    border: 1px solid var(--pink);
                    color: var(--dove);
                    height: 35px;
                    width: 35px;
                }

                .project-info-banner .check-icon
                .icon-check {
                    font-size: 25px;
                } 

                .project-info-banner .content .title {
                    margin: var(--peaky-gap-8) 0 var(--peaky-gap-4);
                }

                .project-info-banner .content .message-block {
                    margin: var(--peaky-gap-24) 0 0;
                }

                @media only screen and (max-device-width: 760px) {
                    .project-info-banner .content .body-big {
                        width: 100%;
                    }
                }
            `}</style>
        </>
    )
}

export default ProjectInfoBanner;