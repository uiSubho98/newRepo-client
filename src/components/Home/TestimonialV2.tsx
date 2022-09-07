import React from "react";
import { isMobile } from "react-device-detect";

interface IProps {
    data: {
        imgSrc: string;
        text: string;
        author: string;
        authorClass: string;
    },
    revert?: boolean;
}

const TestimonialV2 = (props: IProps) => {
    const { data, revert } = props;
    const { imgSrc, text, author, authorClass } = data;

    return (
        <>
            <div className="testimonial-wrapper f-d f-h-c lr-pad-d tb-pad-d lr-pad-m tb-pad-m">
                {/* Desktop View */}
                { 
                    !isMobile && <div className={`testimonial f-d f-v-e ${ revert? "f-ht-r" : ""}`}>
                        <img className="testimonial-img" src={imgSrc} alt="testimonial" height="250px"/>
                        <div className="testimonial-body f-d f-vt f-h-sb">
                            <h3 className="font-heading text-xl text"><span className="text-pekachu">“</span>{text}<span className="text-pekachu">”</span></h3>
                            <div className="author-details">
                                <div className="author text-faded-2">{author}</div>
                                <div className="author-class text-small text-faded">{authorClass}</div>
                            </div>
                        </div>
                    </div>
                }
                {/* Mobile View */}
                { 
                    isMobile && <div className="testimonial f-d f-vt">
                        <h3 className="font-heading text-xl text"><span className="text-pekachu">“</span>{text}<span className="text-pekachu">”</span></h3>
                        <div className="testimonial-body f-d f-vt f-h-sb f-ht-m f-v-c-m f-h-s-m">
                            <img className="testimonial-img" src={imgSrc} alt="testimonial"/>
                            <div className="author-details">
                                <div className="author text-faded-2">{author}</div>
                                <div className="author-class text-small text-faded">{authorClass}</div>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <style jsx>{`
                .testimonial-wrapper .testimonial {
                    background-color: var(--primary-bg);
                    border-radius: var(--peaky-br-4);
                    height: 215px;
                    width: 85%;
                }

                .testimonial-wrapper .testimonial.f-ht-r {
                    padding-left: 64px;
                }

                .testimonial-wrapper .testimonial .testimonial-img {
                    height: 250px;
                }
                
                .testimonial-wrapper .testimonial-body .text{
                    white-space: pre-wrap;
                    line-height: 2.623rem;
                }

                .testimonial-wrapper .testimonial-body {
                    margin-left: var(--peaky-gap-8);
                    padding: 32px 0;
                    height: 100%;
                }

                .text-pekachu {
                    color: var(--pekachu);
                }

                @media screen and (min-width: 1023px) and (max-width: 1365px) and (orientation: portrait) {
                    .testimonial-wrapper {
                        margin: 0 4rem 4rem;
                    }

                    .testimonial-wrapper .testimonial-body .text{
                        max-width: 100%;
                    }
                }

                @media only screen and (min-width: 1366px) and (max-width: 1440px) {
                    .testimonial-wrapper .testimonial.f-ht-r {
                        padding-left: 32px;
                    }
                }

                @media only screen and (max-device-width: 760px) {
                    .testimonial-wrapper .testimonial {
                        border-radius: var(--peaky-br-4);
                        height: min-content;
                        width: 100%;
                    }

                    .testimonial-wrapper .text {
                        padding: 1rem;
                        line-height: 36px;
                    }

                    .testimonial-wrapper .testimonial-body {
                        margin-left: 0;
                        padding: 0;
                        height: unset;
                    }

                    .testimonial-wrapper .testimonial-body .text{
                        white-space: unset;
                    }

                    .testimonial-wrapper .testimonial-body .testimonial-img {
                        max-width: 200px;
                        height: 200px;
                        object-fit: contain;
                    }
                }

            `}</style>
        </>
    )
}

export default TestimonialV2;