import React from "react";
import { FacebookShare, LinkedinShare, TwitterShare, WhatsAppShare } from "./MediaShare";
import { G_URL } from "../../constants/constants";
import prograd_logo from "../../assets/brand/prograd_logo.svg";

import { isMobile } from "react-device-detect";
// import facebook from "react-player/facebook";
// import { LinkedinIcon } from "react-share";

const ProjectEngagementSection = (props: any) => {
    const { student_name } = props;

    return (
        <>
            <div className="f-d f-h-sb f-v-c project-engagement-container">
                <div>
                    <p id="made-with-love" className="body-regular">
                        Made with{" "}
                        <span role="img" aria-label="heart" className="heart-emoji">
                            ❤️
                        </span>{" "}
                        by {student_name}.
                    </p>
                    <p className="share-info h3-heading">Share it with your friends</p>
                    <div className={`sticky-share f-d ${isMobile ? "f-h-s" : ""}`}>
                        <WhatsAppShare
                            div={
                                <div className="f-d f-v-c f-h-c share-icon c-pointer whatsapp-icon">
                                    <i className="fa fa-whatsapp"></i>
                                </div>
                            }
                            url="https://bit.ly/3dyR14T"
                            title={`I have built a cool project at ProGrad. Check it out here: ${window.location.href}\n\nSign up for the FREE experience of ProGrad microdegree and build your first app in no time! - `}
                            type="project"
                        />
                        <FacebookShare
                            div={
                                <div className="f-d f-v-c f-h-c share-icon c-pointer fb-icon">
                                    <i className="fa fa-facebook"></i>
                                </div>
                            }
                            url="https://bit.ly/3wagFFt"
                            quote={`I have built a cool project at ProGrad. Check it out here: ${window.location.href}\n\nSign up for the FREE experience of ProGrad microdegree and build your first app in no time! - `}
                            type="project"
                        />
                        <TwitterShare
                            div={
                                <div className="f-d f-v-c f-h-c share-icon c-pointer twitter-icon">
                                    <i className="fa fa-twitter"></i>
                                </div>
                            }
                            url="https://bit.ly/3dfXWje"
                            title={`I have built a cool project at ProGrad. Check it out here: ${window.location.href}\n\nSign up for the FREE experience of ProGrad microdegree and build your first app in no time! - `}
                            type="project"
                        />
                        <LinkedinShare
                            div={
                                <div className="f-d f-v-c f-h-c share-icon c-pointer linkedin-icon">
                                    <i className="fa fa-linkedin"></i>
                                </div>
                            }
                            url="https://bit.ly/39sm4xK"
                            title={`I have built a cool project at ProGrad. Check it out here: ${window.location.href}\n\nSign up for the FREE experience of ProGrad microdegree and build your first app in no time! - `}
                            type="project"
                        />
                    </div>
                </div>

                <div className="f-d f-v-e f-vt right-wrapper">
                    <p className="logo-text body-caption">Powered by</p>
                    <div
                        className={`brand-logo c-pointer f-d f-v-sa ${isMobile ? "f-h-c" : ""}`}
                        onClick={() => (window.location.href = G_URL)}
                    >
                        <img src={prograd_logo} height="40" alt="logo" />
                    </div>
                    <div id="CTA" className="body-regular">
                        Wanna create your own App like this?
                        <br />
                        Take the free experience of ProGrad Microdegree
                    </div>
                    <div
                        className="book-seat-btn default-blue-btn"
                        onClick={() => (window.location.href = "https://bit.ly/31ujjb7")}
                    >
                        Learn more
                    </div>
                </div>
            </div>
            <style jsx>
                {`
                    .project-engagement-container {
                        padding: 24px;
                    }

                    .line {
                        width: 100%;
                        height: 1px;
                        border: solid 1px #696969;
                    }

                    .social-icons * {
                        padding: 10px;
                    }

                    .logo-text {
                        margin: var(--peaky-gap-32) 0 var(--peaky-gap-16);
                        text-align: end;
                        color: rgba(255, 255, 255, 0.54);
                    }

                    #CTA {
                        color: var(--dove);
                        line-height: 1.5;
                        text-align: end;
                        margin: 16px 0;
                    }
                    .book-seat-btn {
                        padding: 13px 2rem;
                    }
                    .book-seat-btn a {
                        color: var(--dove);
                    }

                    .share-info {
                        color: var(--dove);
                    }

                    #made-with-love {
                        color: var(--dove);
                    }

                    #book-a-seat {
                        width: 182px;
                        height: 50px;
                        border-radius: 4px;
                        background-color: #f50a5f;
                        line-height: 50px;
                        text-align: center;
                        font-weight: bold;
                        cursor: pointer;
                    }
                    .heart-emoji {
                        animation: heartBeat 1.2s infinite;
                    }

                    @keyframes heartBeat {
                        0% {
                            color: #000;
                        }
                        49% {
                            color: #000;
                        }
                        60% {
                            color: transparent;
                        }
                        100% {
                            color: #000;
                        }
                    }
                    .sticky-share .bg-image {
                        height: 50px;
                        width: 50px;
                    }

                    .sticky-share .share-icon {
                        border: 2px solid rgba(255, 255, 255, 0.87);
                        border-radius: var(--peaky-br-full);
                        color: rgba(255, 255, 255, 0.87);
                        height: 50px;
                        width: 50px;
                    }

                    .sticky-share .share-icon .fa {
                        font-size: 23px;
                    }

                    .sticky-share .share-icon:hover {
                        border-color: #1DA1F2;
                        color: #1DA1F2;
                    }

                    .sticky-share .whatsapp-icon:hover {
                        border-color: #25D366;
                        color: #25D366;
                    }
    
                    .sticky-share .fb-icon:hover {
                        border-color: #1877F2;
                        color: #1877F2;
                    }
    
                    .sticky-share .linkedin-icon:hover {
                        border-color: #0077B5;
                        color: #0077B5;
                    }
    
    
                    .sticky-share .twitter-icon:hover {
                        border-color: #1DA1F2;
                        color: #1DA1F2;
                    }

                    .SocialMediaShareButton {
                        margin-right: 1rem;
                        outline: none;
                    }

                    @media only screen and (max-device-width: 760px) {
                        .project-engagement-container {
                            flex-direction: column;
                        }

                        .project-engagement-container > div:nth-of-type(1) {
                            width: 100%;
                        }

                        .project-engagement-container .right-wrapper {
                            align-items: flex-start;
                        }

                        #CTA {
                            text-align: start;
                        }
                    }
                `}
            </style>
        </>
    );
};

export default ProjectEngagementSection;
