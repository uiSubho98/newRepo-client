import React, { useState } from "react";
// @ts-ignore
import { Link } from "react-router-dom";
import { FacebookShare, WhatsAppShare, TwitterShare, LinkedinShare } from "./MediaShare";
import { isMobile } from "react-device-detect";

const StickyBar = (props: any) => {
    const { ptile, profile_type } = props;
    // let program = props.gg === 1 ? "microdegree" : "bootcamp";
    let profile = "";
    if (profile_type !== undefined) {
        profile =
            parseInt(profile_type) === 1
                ? "Architect"
                : parseInt(profile_type) === 2
                ? "Commander"
                : "Explorer";
    }
    const [stickyBarVisibility, setStickyBarVisibility] = useState(true);

    const message = `I just took a 21st-century skills assessment by ProGrad. Happy to share that I'm ${
        profile !== undefined &&
        profile
            .toString()
            .toLowerCase()
            .trim() === "commander"
            ? "a"
            : "an"
    } ${profile} and belong to the top ${
        ptile
    }%ile of students. Here's the report - ${window.location.href +
        "/share/"}.\n\nSign up for the FREE experience of ProGrad microdegree and get your personalised 21st-century skills assessment report - `;

    return (
        <>
            {stickyBarVisibility && (
                <div className="sticky-bar lr-pad-m f-d f-vt-m f-v-c f-h-sa">
                    {isMobile && (
                        <div
                            className="benefits-close-btn f-d f-v-c f-h-c"
                            onClick={() => setStickyBarVisibility(!stickyBarVisibility)}
                        >
                            <i className="icon icon-x"></i>
                        </div>
                    )}
                    <div className="left-container">
                        <div className="text">
                            {!window.location.pathname.includes("/share/")
                                ? `Share this report with your friends and family`
                                : `Get your Vision Skills report. Sign up for a free experience of ProGrad Microdegree in programming`}
                        </div>
                    </div>
                    <div className="right-container">
                        {!window.location.pathname.includes("/share/") ? (
                            <div className="sticky-share f-d">
                                <WhatsAppShare
                                    div={
                                        <div className="f-d f-v-c f-h-c share-icon c-pointer whatsapp-icon">
                                            <i className="fa fa-whatsapp"></i>
                                        </div>
                                    }
                                    url="https://bit.ly/3tYNhjA"
                                    title={message}
                                />
                                <FacebookShare
                                    div={
                                        <div className="f-d f-v-c f-h-c share-icon c-pointer fb-icon">
                                            <i className="fa fa-facebook"></i>
                                        </div>
                                    }
                                    url="https://bit.ly/3wmxlK2"
                                    quote={`I just took a 21st-century skills assessment by ProGrad. Happy to share that I'm ${
                                        profile !== undefined &&
                                        profile
                                            .toString()
                                            .toLowerCase()
                                            .trim() === "commander"
                                            ? "a"
                                            : "an"
                                    } ${profile} and belong to the top ${
                                        ptile
                                    }%ile of students. Here's the report - ${window.location.href +
                                        "/share/"}.\n\nSign up for the FREE experience of ProGrad microdegree and get your personalised 21st-century skills assessment report - `}
                                />
                                <TwitterShare
                                    type={"outline"}
                                    div={
                                        <div className="f-d f-v-c f-h-c share-icon c-pointer twitter-icon">
                                            <i className="fa fa-twitter"></i>
                                        </div>
                                    }
                                    url="https://bit.ly/3wdx7ob"
                                    title={message}
                                />
                                <LinkedinShare
                                    type={"outline"}
                                    div={
                                        <div className="f-d f-v-c f-h-c share-icon c-pointer linkedin-icon">
                                            <i className="fa fa-linkedin"></i>
                                        </div>
                                    }
                                    url="https://bit.ly/2PcXrOW"
                                    title={message}
                                />
                            </div>
                        ) : (
                            <div className="default-blue-btn learn-more-btn">
                                <Link to={`${process.env.PUBLIC_URL}/microdegree`}>Learn more</Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
            <style jsx>
                {`
                    .sticky-bar {
                        background: var(--primary-bg);
                        padding: 2rem 4rem;
                        color: var(--dove);
                        position: fixed;
                        bottom: 0px;
                        width: 100%;
                    }

                    .sticky-bar .left-container {
                        width: 60%;
                    }

                    //.body-container .SocialMediaShareButton.SocialMediaShareButton--whatsapp {
                    //      margin-right: unset;
                    //}

                    .sticky-bar .left-container .text {
                        font-family: "OpenSans";
                        font-size: 24px;
                        font-weight: 500;
                        flex: 0.65 0.35 300px;
                    }

                    .sticky-bar .right-container .book-seat-btn {
                        background: var(--dove);
                        border-radius: var(--peaky-br-4);
                        box-shadow: none;
                        cursor: pointer;
                        flex: 0 0 auto;
                        padding: 20px 32px;
                        margin: 15px 0;
                        font-family: Poppins;
                        border: none;
                        text-transform: uppercase;
                        font-size: 18px;
                    }

                    .sticky-bar .right-container .learn-more-btn a {
                        color: var(--dove) !important;
                    }

                    .sticky-bar .right-container .sticky-share .bg-image {
                        height: 50px;
                        width: 50px;
                        margin: 1rem;
                    }

                    .sticky-bar .share-icon {
                        border: 2px solid rgba(255, 255, 255, 0.87);
                        border-radius: var(--peaky-br-full);
                        color: rgba(255, 255, 255, 0.87);
                        height: 50px;
                        margin: 0 var(--peaky-gap-16);
                        width: 50px;
                    }

                    .sticky-bar .share-icon .fa {
                        font-size: 23px;
                    }

                    .sticky-bar .whatsapp-icon:hover {
                        border-color: #25D366;
                        color: #25D366;
                    }
    
                    .sticky-bar .fb-icon:hover {
                        border-color: #1877F2;
                        color: #1877F2;
                    }
    
                    .sticky-bar .linkedin-icon:hover {
                        border-color: #0077B5;
                        color: #0077B5;
                    }
    
    
                    .sticky-bar .twitter-icon:hover {
                        border-color: #1DA1F2;
                        color: #1DA1F2;
                    }

                    .SocialMediaShareButton {
                        outline: none;
                    }
                    
                    @media only screen and (max-device-width: 760px) {
                        .sticky-bar {
                            padding: 0.5rem 0;
                            justify-content: unset;
                        }
                        .sticky-bar .left-container {
                            width: unset;
                            padding: 0.5rem 1rem;
                        }
                        .sticky-bar .right-container .book-seat-btn {
                            margin-top: 2rem;
                        }
                        .sticky-bar .left-container .text {
                            font-size: 14px;
                            text-align: left;
                        }
                        .sticky-bar .right-container .sticky-share .bg-image {
                            height: 30px;
                            width: 30px;
                            margin: 0.5rem;
                        }
                        .sticky-bar .right-container .book-seat-btn {
                            background: var(--dove);
                            border-radius: var(--peaky-br-4);
                            box-shadow: none;
                            cursor: pointer;
                            flex: 0 0 auto;
                            padding: 12px 56px;
                            margin: 5px 0;
                            font-family: Poppins;
                            border: none;
                            text-transform: uppercase;
                            font-size: 16px;
                        }
                        .benefits-close-btn {
                            position: absolute;
                            top: -18px;
                            right: 0.5rem;
                            width: 32px;
                            height: 32px;
                            color: var(--carbon);
                            border-radius: var(--peaky-br-full);
                            background: var(--snowfall);
                            box-shadow: var(--peaky-shadow);
                        }
                    }
                `}
            </style>
        </>
    );
};

export default StickyBar;
