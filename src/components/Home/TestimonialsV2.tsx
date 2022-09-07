import React, { useState } from "react";
import { ITestimonial } from "./home";
import { Modal } from "antd";
import PlayButton from "../../assets/imgs/home/play-button-v2.svg";
import { HeartFilled } from "@ant-design/icons";
import { isMobile } from "react-device-detect";
import ReactPlayer from 'react-player';

interface ITestimonialV2Props {
    data: {
        testimonials: Array<ITestimonial>
        wrapperHeight1920: string
        wrapperHeight1600: string
        wrapperHeight1440: string
        wrapperHeight1366: string
        wrapperHeight1024: string
    }
}

const TestimonialsV2 = (props: ITestimonialV2Props) => {
    const {testimonials, wrapperHeight1920, wrapperHeight1600, wrapperHeight1440, wrapperHeight1366, wrapperHeight1024} = props.data;

    const [isVisible, setVisibility] = useState<boolean>(false);
    const [videoSrc, setVideoSrc] = useState<string>("");
    
    return (
        <>
            <div className="testimonials-wrapper lr-pad-d tb-pad-d tb-pad-m"
            id="reviews">
                <h2 className="text-xl font-heading f-d f-h-c f-v-c">
                    Our students <HeartFilled className="title-heart" /> us
                </h2>
                <div className="testimonials-list w-100">
                    {/* Display desktop view of testimonials */}
                    { !isMobile && testimonials.map((testimonial: ITestimonial, index: number) => {
                        if(testimonial.type === 'video') {
                            return (
                                <div className="testimonial video-testimonial" key={index}>
                                    <div className="thumbnail f-d f-h-c f-v-c bg-image-full"
                                        style= {{ backgroundImage: "url("+ 
                                        ( testimonial.imgSrc ) + ")" }}
                                    >
                                        <div className="bg-image-full play-button 
                                        c-pointer" style={{ backgroundImage: 
                                            "url(" +PlayButton+ ")"}} 
                                        onClick={() => {setVideoSrc(testimonial.src ?? "");setVisibility(true)} }>
                                        </div>
                                    </div>
                                </div>
                            )
                        } else {
                            return (
                                <div className="testimonial text-testimonial c-pointer" key={index} onClick={()=>{window.open(testimonial.reviewLink, '_blank')}}>
                                    <div className="testimonial-header f-d">
                                        <div className="testimonial-img bg-image-full" style={{backgroundImage: "url(" +( testimonial.imgSrc )+ ")"}}></div>
                                        <div>
                                            <div className="text-big font-heading">{testimonial.name}</div>
                                            <div className="text-small text-faded">{testimonial.class}</div>
                                        </div>
                                    </div>
                                    <div className="testimonial-body text-medium text-faded-2">
                                        {testimonial.text}
                                    </div>
                                    <div className="testimonial-footer f-d f-h-c f-v-c text-faded">
                                        Full review on <div 
                                        className="review-icon bg-image-full c-pointer" 
                                        style={{backgroundImage: "url(" +( testimonial.reviewIcon )+ ")"}}
                                        ></div>
                                    </div>
                                </div>
                            );
                        }
                    })}
                    {/* Display mobile view of textimonials */}
                    {
                        isMobile && 
                        <div className="video-testimonials-wrapper f-d w-100">
                            {testimonials.filter((t: ITestimonial) => t.type === 'video').map((testimonial: ITestimonial, index: number) => {
                                return (
                                    <ReactPlayer 
                                        className="react-video-player"
                                        light = {testimonial.imgSrc}
                                        url = {testimonial.src} 
                                        playing
                                        controls
                                        width="340px"
                                        height="225px"
                                        config={{ file: { 
                                            attributes: {
                                            controlsList: 'nodownload',
                                            disablePictureInPicture: true
                                            }
                                        }}}
                                    />
                                )
                            })}
                        </div>
                    }
                    {
                        isMobile && 
                        <div className="text-testimonials-wrapper f-d w-100">
                            {testimonials.filter((t: ITestimonial) => t.type === 'text').map((testimonial: ITestimonial, index: number) => {
                                return (
                                    <div className="text-testimonial-m c-pointer" key={index} onClick={()=>{window.open(testimonial.reviewLink, '_blank')}}>
                                        <div className="testimonial-header f-d f-v-c">
                                            <div className="testimonial-img bg-image-full" style={{backgroundImage: "url(" +( testimonial.imgSrc )+ ")"}}></div>
                                            <div>
                                                <div className="text-big font-heading">{testimonial.name}</div>
                                                <div className="text-small text-faded">{testimonial.class}</div>
                                            </div>
                                        </div>
                                        <div className="testimonial-body text-medium text-faded-2">
                                            {testimonial.text}
                                        </div>
                                        <div className="testimonial-footer f-d f-h-c f-v-c text-faded">
                                            Full review on <div 
                                            className="review-icon bg-image-full c-pointer" 
                                            style={{backgroundImage: "url(" +( testimonial.reviewIcon )+ ")"}}
                                            ></div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    }
                </div>
            </div>
            <Modal
                footer={null}
                centered
                destroyOnClose={true}
                visible={isVisible}
                onCancel={() => setVisibility(false)}
                width="1000"
                className="testimonial-modal"
            >
                <iframe 
                    className="framevideo" 
                    width="1200" 
                    height="675"
                    title="Testimonial Video"
                    frameBorder = "0"
                    allow="autoplay *; fullscreen *"
                    src={ videoSrc+"?autoplay=1" }
                 >
                </iframe>
            </Modal>
            <style jsx>{`
                /* Styles for 1920p width screen */
                .testimonials-wrapper {
                    background-color: var(--primary-bg);
                }

                .testimonials-wrapper .title-heart {
                    color: var(--pekachu);
                    margin: 0 8px;
                }

                .testimonials-wrapper .testimonials-list {
                    margin-top: 4rem;
                    display: flex;
                    flex-flow: column wrap;
                    align-content: space-between;
                    height: ${wrapperHeight1920}
                }
                
                .testimonials-wrapper .testimonial {
                    width: 32%;
                    margin-bottom: 2%;
                }
                
                .testimonial:nth-child(3n+1) { order: 1; }
                .testimonial:nth-child(3n+2) { order: 2; }
                .testimonial:nth-child(3n)   { order: 3; }

                .testimonials-wrapper::before,
                .testimonials-wrapper::after {
                    content: "";
                    flex-basis: 100%;
                    width: 0;
                    order: 2;
                }

                .testimonials-wrapper .video-testimonial {
                    height: 225px;
                    background-color: var(--secondary-bg);
                }

                .testimonials-wrapper .video-testimonial .thumbnail {
                    height: 100%;
                }

                .testimonials-wrapper .video-testimonial .thumbnail .play-button {
                    height: 70px;
                    width: 70px;
                }

                .testimonials-wrapper .text-testimonial {
                    padding: 2rem;
                    background-color: var(--secondary-bg);
                }

                .testimonials-wrapper .text-testimonial .testimonial-img {
                    height: 50px;
                    width: 50px;
                    border-radius: 50%;
                    border: solid 1px var(--dove);
                    margin-right: var(--peaky-gap-16);
                }

                .testimonials-wrapper .text-testimonial .testimonial-header .font-heading {
                    font-weight: 800 !important;
                }

                .testimonials-wrapper .text-testimonial .testimonial-body {
                    font-weight: 300;
                    margin-top: var(--peaky-gap-32);
                    margin-bottom: var(--peaky-gap-32);
                }
                
                .testimonials-wrapper .text-testimonial .testimonial-footer {
                    font-weight: 700;
                    color: rgba(255, 255, 255, 0.54);
                }

                .testimonials-wrapper .text-testimonial .testimonial-footer .review-icon {
                    margin-left: var(--peaky-gap-8);
                    width: 30px;
                    height: 30px;
                }

                .testimonial-modal .ant-modal-body {
                    padding:0;
                }

                .testimonial-modal .ant-modal-close {
                    z-index:2;
                    font-size:24px;
                }

                .testimonial-modal .ant-modal-close-x {
                    position: absolute;
                    width: 32px;
                    height: 32px;
                    color: var(--tomato);
                    font-size: 24px;
                    font-weight: 600;
                    line-height: 32px;
                }

                .ant-modal.testimonial-modal .ant-modal-body {
                    height: 675px;
                }
                
                @media only screen and (max-device-width: 1600px) {
                    .testimonials-wrapper .testimonials-list {
                        height: ${wrapperHeight1600}
                    }
                }

                @media only screen and (max-device-width: 1440px) {
                    .testimonials-wrapper .testimonials-list {
                        height: ${wrapperHeight1440}
                    }
                }

                @media only screen and (max-device-width: 1366px) {
                    .testimonials-wrapper .testimonials-list {
                        height: ${wrapperHeight1366}
                    }
                }

                @media only screen and (max-device-width: 1024px) {
                    .testimonials-wrapper .testimonials-list {
                        height: ${wrapperHeight1024}
                    }
                }

                @media only screen and (max-device-width: 760px) {
                    .testimonials-wrapper {
                        padding-left: 0.5rem;
                        padding-right: 0;
                    }
                    
                    .testimonials-wrapper .testimonials-list {
                        margin-top: 2rem;
                        height: fit-content;
                    }
                    
                    .testimonials-wrapper .video-testimonials-wrapper {
                        overflow-x: scroll;
                    }

                    .testimonials-wrapper .react-video-player {
                        background-color: var(--secondary-bg);
                        margin-right: 0.5rem;
                        margin-left: 0.5rem;
                    }


                    .testimonials-wrapper .text-testimonials-wrapper {
                        overflow-x: scroll;
                        margin-top: 0.5rem;
                    }

                    .testimonials-wrapper .text-testimonial-m {
                        padding: 1rem;
                        min-width: 300px;
                        background-color: var(--secondary-bg);
                        margin-right: 0.5rem;
                        margin-left: 0.5rem;
                        height: fit-content;
                    }
    
                    .testimonials-wrapper .text-testimonial-m .testimonial-img {
                        height: 40px;
                        width: 40px;
                        margin-right: var(--peaky-gap-8);
                        border-radius: 50%;
                        border: solid 1px var(--dove);
                    }
    
                    .testimonials-wrapper .text-testimonial-m .testimonial-header .font-heading {
                        font-weight: 800 !important;
                        line-height: 30px;
                    }
    
                    .testimonials-wrapper .text-testimonial-m .testimonial-body {
                        margin-top: var(--peaky-gap-32);
                        margin-bottom: var(--peaky-gap-32);
                    }
                    
                    .testimonials-wrapper .text-testimonial-m .testimonial-footer {
                        font-weight: 700;
                        color: rgba(255, 255, 255, 0.54);
                    }
    
                    .testimonials-wrapper .text-testimonial-m .testimonial-footer .review-icon {
                        margin-left: var(--peaky-gap-8);
                        width: 30px;
                        height: 30px;
                    }

                    .testimonials-wrapper .react-video-player {
                        min-width: 340px;
                    }
                }
            `}</style>
        </>
    )
}

export default TestimonialsV2;