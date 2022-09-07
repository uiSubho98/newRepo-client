import React from "react";
import { ITestimonial } from "../workshops";
import DoubleQuotes from "../../../assets/imgs/double_quotes.svg";

interface ITestimonialsProps {
    data?: {
        title: string;
        list: Array<ITestimonial>;
    }
}

const Testimonials = (props: ITestimonialsProps) => {
    const { title, list } = props.data!

    return (
        <>
            <div className="testimonials-wrapper lr-pad-d tb-pad-d tb-pad-m">
                <h3 className="font-heading text-xl f-d f-h-c title text-c-m lr-pad-m">{title}</h3>
                <div className="testimonials-container g-d g-col-2 f-m lr-pad-m">
                    {list.map((testimonial: ITestimonial, idx: number) => {
                        return (
                            <div className="testimonial-wrapper f-d f-vt f-h-sb" key={idx}>
                                <div>
                                    <div className="icon bg-image-full" style={{ backgroundImage: `url(${DoubleQuotes})`}}></div>
                                    <div className="quote text-medium">{testimonial.quote}</div>
                                </div>
                                <div>
                                    <div className="author text-faded-2">{testimonial.author}</div>
                                    <div className="role text-small text-faded">{testimonial.role}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <style jsx>
                {`
                    .testimonials-wrapper {
                        background-color: var(--crow);
                        width: 100%;
                    }
                    
                    .testimonials-wrapper .testimonials-container {
                        margin-top: var(--peaky-gap-64);
                        grid-gap: var(--peaky-gap-64);
                    }

                    .testimonials-wrapper .testimonial-wrapper {
                        background-color: var(--primary-bg);
                        padding: var(--peaky-pad-32);
                        min-height: 380px;
                    }

                    .testimonials-wrapper .testimonial-wrapper .icon {
                        height: 34px;
                        width: 44px;
                        margin-bottom: var(--peaky-gap-8);
                    }

                    @media only screen and (max-device-width: 760px) {
                        .testimonials-wrapper {
                            padding-left: 0;
                            padding-right: 0;
                        }

                        .testimonials-wrapper .title {
                            line-height: 2.23rem;
                        }
                        
                        .testimonials-wrapper .testimonials-container {
                            width: calc(100vw);
                            overflow-x: auto;
                            overflow-y: hidden;
                            grid-gap: 0;
                        }

                        .testimonials-wrapper .testimonials-container .testimonial-wrapper {
                            min-height: 0;
                            min-width: 80vw;
                        }
                        
                        .testimonials-wrapper .testimonials-container .testimonial-wrapper:not(:last-of-type) {
                            margin-right: var(--peaky-gap-16);
                        }

                        .testimonials-wrapper .testimonials-container .testimonial-wrapper > div:nth-child(2) {
                            margin-top: var(--peaky-gap-64);
                        }
                    }
            `}
            </style>
        </>
    )
}

export default Testimonials;