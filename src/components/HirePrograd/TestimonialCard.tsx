import React from "react";
import Quotes from '../../assets/icons/svg-icons-v2/quotes.svg';

interface Props {
    data ?: Content;
    id ?: number;
    key?:number;
}

interface Content {
    type: string
    designation?: string
    imgSrc?: string
    name?: String
    text?: string 
    desc?: string
}



const TestimonialCard = (props:Props) => {
    const { data, key, id } = props;    
    return (
        <>
            <div className={`testimonials-list g-d g-col-s-b g-col-1-m card-${id}`} key={key}>
                <div className="g-d g-col-2 g-v-e testimonilas-left">
                    {/* <img className="img-testimonial w-100" src={data && data.imgSrc} /> */}
                    <div className="bg-image-full img-testimonial" style={{
                        backgroundImage: 'url(' + data?.imgSrc + ')'
                    }}></div>
                    <div className="f-d f-vt f-h-c recruiter-info hide-d">
                        <div className="text-regular text-faded-2" > {data && data.name} </div>
                        <div className="text-small text-faded designation" > {data && data.designation} </div>
                    </div>
                </div>
                <div className="testimonilas-right">   
                    <div className="description">   
                        <img className="quote-img" src={Quotes} alt="quotes" />
                        <div className="text text-medium" > {data && data.text} </div>
                        <div className="text text-medium" > {data && data.desc} </div>
                        <div className="text-regular text-faded-2 hide-m" > {data && data.name} </div>
                        <div className="text-small text-faded designation hide-m" > {data && data.designation} </div>
                    </div> 
                </div>
            </div>

            <style jsx>{`
                .testimonials-list .testimonilas-left {
                    padding: 4rem 0 0;
                }

                .testimonials-list .testimonilas-left
                .img-testimonial {
                    height: 400px;
                    width: 400px;
                    object-fit: contain;
                }

                .testimonials-list .testimonilas-right {
                    padding: 4rem 8rem 4rem 1rem;
                }

                .testimonials-list .testimonilas-right 
                .description .text {
                    margin: var(--peaky-gap-16) 0;
                }

                .testimonials-list .testimonilas-right 
                .description .text:nth-of-type(2) {
                    margin-bottom: var(--peaky-gap-32);
                }

                @media only screen and (min-width: 760px) and (max-width: 1024px) {
 
                }

                @media only screen and (min-width: 1366px) and (max-width: 1440px) {
                }

                @media only screen and (min-width: 1024px) and (max-width: 1365px) {
                }

                @media only screen and (max-device-width: 760px) {
                    .testimonials-list .testimonilas-left {
                        padding: 0;
                        order: 1;
                    }

                    .testimonials-list .testimonilas-left
                    .img-testimonial {
                        height: 180px;
                        width: 100%;
                        background-position: bottom;
                    }

                    .hire-prograd .testimonials-list 
                    .testimonilas-right {
                        height: 450px;
                        margin: 0 !important;
                        padding: 0;
                    }

                    .testimonials-list .recruiter-info {
                        display: block;
                        height: 180px;
                    }
                }

                @media only screen and (max-device-width: 380px) {
                    .hire-prograd .testimonials-list 
                    .testimonilas-right {
                        height: 500px;
                    }
                }

                @media only screen and (max-device-width: 320px) {
                    .hire-prograd .testimonials-list 
                    .testimonilas-right {
                        height: 580px;
                    }

                    .testimonials-list .recruiter-info {
                        padding-right: var(--peaky-pad-16);
                    }
                }
            `}</style>
        </>
    )
}

export default TestimonialCard;