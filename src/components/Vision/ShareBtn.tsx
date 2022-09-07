import React from "react";
import { FacebookShare, WhatsAppShare, TwitterShare, LinkedinShare,LinkShare } from "./MediaShare";

const ShareBtn = (props: any) => {
    const { w_url, fb_url, msg, fromPage, tw_url, li_url, tw_msg,is_ignite } = props;

    let link_share_jsx = <></>

    if(is_ignite && props.from && props.from === "new-dash") {
       link_share_jsx =  <LinkShare url={`${fb_url}`}/>
    }
    else if(is_ignite) {
        link_share_jsx = <LinkShare url={`${msg} ${fb_url}`}/>
    }


    return (
        <>
            <div className={` ${fromPage !== null && fromPage !== undefined ? 'add_margin' : ''}  share-btn-container f-d  f-v-c `}>
                <WhatsAppShare
                    div={
                        <div className="f-d f-v-c f-h-c share-icon c-pointer whatsapp-icon">
                            <i className="fa fa-whatsapp"></i>
                        </div>
                    }
                    url={w_url}
                    title={msg}
                    type={fromPage}
                />
                <FacebookShare
                    div={
                        <div className="f-d f-v-c f-h-c share-icon c-pointer fb-icon">
                            <i className="fa fa-facebook"></i>
                        </div>
                    }
                    url={fb_url}
                    quote={`${msg} ${fb_url}`}
                    type={fromPage}
                />
                {<TwitterShare
                    div={
                        <div className="f-d f-v-c f-h-c share-icon c-pointer twitter-icon">
                            <i className="fa fa-twitter"></i>
                        </div>
                    }
                    url={tw_url}
                    title={tw_msg} 
                    type={fromPage}
                />}
                {<LinkedinShare
                    div={
                        <div className="f-d f-v-c f-h-c share-icon c-pointer linkedin-icon">
                            <i className="fa fa-linkedin"></i>
                        </div>
                    }
                    url={li_url}
                    title={`${msg} ${li_url}`} 
                    type={fromPage}
                />}
                {link_share_jsx}

            </div>

            <style jsx>
                {`
        
                .body-container .share-btn-container .bg-image {
                width: 50px;
                height: 50px;
                // background-size: unset;
                }

                .body-container .share-btn-container .share-icon {
                    border: 2px solid rgba(255, 255, 255, 0.87);
                    border-radius: var(--peaky-br-full);
                    color: rgba(255, 255, 255, 0.87);
                    height: 50px;
                    width: 50px;
                }

                .body-container .share-btn-container .share-icon .fa {
                    font-size: 23px;
                }

                .body-container .share-btn-container .whatsapp-icon:hover {
                    border-color: #25D366;
                    color: #25D366;
                }


                .body-container .share-btn-container .fb-icon:hover {
                    border-color: #1877F2;
                    color: #1877F2;
                }

                .body-container .share-btn-container .linkedin-icon:hover {
                    border-color: #0077B5;
                    color: #0077B5;
                }


                .body-container .share-btn-container .twitter-icon:hover {
                    border-color: #1DA1F2;
                    color: #1DA1F2;
                }
            
            .body-container .share-btn-container .SocialMediaShareButton{
               margin-right: 1rem;
               outline: none;
            }

            //     .body-container .share-btn-container .whatsapp-btn {
            //     background-color: #25d366;
            // }

            //     .body-container .share-btn-container .fb-btn {
            //     background-color: #4267b2;
            // }
            .body-container .share-btn-container .whatsapp-btn,
                    .body-container .share-btn-container .fb-btn {
                   border-radius: 50%;
                    color: var(--smoke);
                }

            //     .body-container .add_margin .SocialMediaShareButton.SocialMediaShareButton--whatsapp{
            //      margin-right: 2rem;
            //}

                @media only screen and (max-device-width: 760px) {
            //    .body-container .share-btn-container .whatsapp-btn {
            //    margin-bottom: 1rem;
            //}

            //    .body-container .SocialMediaShareButton.SocialMediaShareButton--whatsapp {
            //    margin-right:unset!important;
            //}
            
            
            }
            `}
            </style>
        </>
    );
};

export default ShareBtn;
