import React from "react";
import {FacebookShare, LinkedinShare, TwitterShare, WhatsAppShare} from "./MediaShare";
import {G_URL} from "../../constants/constants";
import pro_junior_logo from "../../assets/brand/prograd_logo_white_text.svg";
import pro_junior_logo_black from "../../assets/brand/prograd_pink_logo.svg";
// @ts-ignore
import {Link} from "react-router-dom";
import {isMobile} from "react-device-detect";

const MemeEngagementSection = (props: any) => {
    const {student_name, project, program} = props;

    return (
        <>
            {/* <div className="line"/> */}
            <p id="made-with-love" className="body-regular">Made with <span role="img" aria-label="heart"
                                                                            className="heart-emoji">❤️</span> by ProGrad.
            </p>
            <p className="share-info h3-heading">Share it with your friends</p>
            <div className={`sticky-share f-d ${isMobile ? 'f-h-c' : ''}`}>
                <WhatsAppShare
                    div={<div className="bg-image c-pointer"
                              style={{backgroundImage: 'url(https://cdn.progradjunior.org/whatsapp.svg)'}}/>}
                    url='https://bit.ly/37JcB3y'
                    title={`${student_name} has built a cool app at ProGrad's coding workshop. Check it out here: ${window.location.href}\n\nRegister for a FREE coding workshop with ProGrad and build your first app in no time - `}
                />
                <FacebookShare
                    div={<div className="bg-image c-pointer"
                              style={{backgroundImage: 'url(https://cdn.progradjunior.org/facebook.svg)'}}/>}
                    url='https://bit.ly/3qER6tf'
                    quote={`${student_name} has built a cool app at ProGrad's coding workshop. Check it out here: ${window.location.href}\n\nRegister for a FREE coding workshop with ProGrad and build your first app in no time - https://bit.ly/3qER6tf`}
                />
                <TwitterShare
                    url='https://bit.ly/3oxrfS4'
                    title={`Here's ${student_name}'s latest creation: ${window.location.href}\n\nRegister for a FREE coding workshop with ProGrad and build your first app in no time - `}
                />
                <LinkedinShare
                    url='https://bit.ly/3m1cBBc'
                    title={`${student_name} has built a cool app at ProGrad coding workshop. Check it out here: ${window.location.href}\n\nRegister for a FREE coding workshop with ProGrad and build your first app in no time - https://bit.ly/3m1cBBc`}
                />
            </div>
            <div className="line"/>
            <p className="logo-text body-caption">Powered by</p>
            <div
                className={`brand-logo c-pointer f-d f-v-sa ${isMobile ? 'f-h-c' : ''}`}
                onClick={() => (window.location.href = G_URL)}
            ><img
                src={project !== null && project !== undefined && project === 'greetn' ? pro_junior_logo_black : pro_junior_logo}
                height='40' alt="logo"/>
            </div>
            <div id="CTA" className="body-regular">
                Register for a free coding workshop now!
            </div>
            <div
                className='book-seat-btn default-purple-btn filled-purple'>
                <Link
                    to={`${process.env.PUBLIC_URL}/register/${program}/?utm_source=projectpage&utm_medium=wsproject&utm_campaign=networking`}>
                    BOOK A SEAT
                </Link>
            </div>
            <style jsx>
                {`
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
                text-align: center;
                color: rgba(255, 255, 255, 0.54);
            }
            
            #CTA {
                text-align: center;
               color: var(--dove);
                line-height: 1.5;
                margin: var(--peaky-gap-32);
            }
            .book-seat-btn{
               padding: 13px 2rem;
            }
            .book-seat-btn a{
               color: var(--dove);
            }

            .share-info {
                color: var(--dove);
            }
            
            #made-with-love {
                text-align: center;
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
                    animation:heartBeat 1.2s infinite;
                }
                
                @keyframes heartBeat{
                    0%{     color: #000; }
                    49%{    color: #000; }
                    60%{    color: transparent; }
                    100%{   color: #000;    }
                }
            .sticky-share .bg-image {
                height: 50px;
                width: 50px;
               
            }
            .SocialMediaShareButton{
             margin: 1rem;
            }

            
                `}
            </style>

        </>
    );
};

export default MemeEngagementSection;
