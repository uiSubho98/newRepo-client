import React from "react";
import ShareBtn from "./ShareBtn";
import { isMobile } from "react-device-detect";

const ShareBlock = (props: any) => {
    const { name, w_url, fb_url, msg, fromPage, tw_url, li_url, tw_msg } = props;

    return (
        <>
            <div className="share-block lr-pad-m">
                <div className="title h1-heading">
                    Share this report with your friends and family
                </div>
                <div className={`share-btn-container f-d f-vt-m ${isMobile ? "" : "f-v-c"} f-h-c `}>
                    <ShareBtn
                        name={name}
                        w_url={w_url}
                        fb_url={fb_url}
                        li_url={li_url}
                        tw_url={tw_url}
                        msg={msg}
                        tw_msg={tw_msg}
                        fromPage={fromPage}
                    />
                </div>
            </div>
            <style jsx>
                {`
                    .body-container .share-block .title {
                        margin-bottom: 1rem;
                    }

                    .body-container .share-block .share-btn-container {
                        margin-top: 2rem;
                    }
                    @media only screen and (max-device-width: 760px) {
                    }
                `}
            </style>
        </>
    );
};

export default ShareBlock;
