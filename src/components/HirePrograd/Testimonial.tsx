import React from "react";
// @ts-ignore
import {Carousel} from "antd";
import TestimonialCard from "./TestimonialCard"
import {isMobile} from "react-device-detect";
import { ITestimonial } from "./HirePrograd";



interface ITestimonials {
    title?: string;
    testimonials : Array<ITestimonial>;
}

interface Props {
    data: ITestimonials
}

interface ICarouselProps {
    dots: boolean;
    draggable: boolean;
    arrows: boolean;
    autoplaySpeed: number;
    slidesToShow: number;
    slidesToScroll: number;
    infinite:boolean;
}

const Testimonial = (props:Props) => {
    const {data} = props;

    const renderTestimonials = () => {        
        let list = data && data.testimonials.map( (t, i) => <TestimonialCard data={t} id={i + 1} key = {i} /> )
        return list
    }
 
    const carouselProps:ICarouselProps  = {
        dots: true,
        draggable: !isMobile ? false:true,
        arrows: false,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite:true,
    };

    return (
        <>
            <div className="hire-prograd testimonials-wrapper lr-pad-d lr-pad-m ">  
                <div className="testimonials-content">
                    <Carousel {...carouselProps} autoplay easing={"linear"} effect={"fade"}>
                        { data && renderTestimonials() }
                    </Carousel>
                </div>
            </div>
            <style jsx>{`

                .hire-prograd .testimonials-content{
                    background-color:var(--primary-bg);
                    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
                    border-radius: var(--peaky-br-4);
                }

                .hire-prograd .testimonials-content .designation{
                    position:relative;
                }

                .hire-prograd .testimonials-content .ant-carousel 
                .slick-dots {
                    height: 6%;
                    width:73%;
                }

                .hire-prograd .testimonials-content .ant-carousel .slick-dots 
                li button {
                    border-radius: var(--peaky-br-full);
                    height: 10px;
                    margin-left: 2.5px;
                    margin-right: unset;
                    width: 10px;
                }

                .hire-prograd .testimonials-content .ant-carousel .slick-dots li.slick-active 
                button {
                    width: 10px;
                }

                .testimonials-wrapper{
                    padding-bottom:2rem;
                }

                .hire-prograd .testimonials-wrapper .testimonials-list {
                    margin: var(--peaky-gap-32) 0 0;
                }

                @media only screen and (min-width: 760px) and (max-width: 1024px) {
                    .hire-prograd .testimonials-content{
                        height:auto;
                    }
                    .hire-prograd .testimonials-list .testimonilas-right{
                        height:500px;
                    }
                    .hire-prograd .testimonials-content .ant-carousel 
                    .slick-dots {
                        display:none !important;
                    }
                }

                @media only screen and (max-device-width: 760px) {
                    .hire-prograd .testimonials-content{
                        height:auto;
                    }

                    .hire-prograd .testimonials-list .testimonilas-right{
                        margin:5rem 0 1rem 0;
                        padding:1rem;
                        width:unset;
                    }

                    .hire-prograd .testimonials-content .ant-carousel 
                    .slick-dots {
                        height: unset;
                        width: 100%;
                        position: absolute;
                        bottom: 20px;
                        left: 1.5rem;
                        text-align: center;
                    }
                }

                @media only screen and (min-width: 1024px) and (max-width: 1365px) {
                    .hire-prograd .testimonials-content .ant-carousel 
                    .slick-dots {
                        height: 6%;
                        width:83%;
                    }
                }
            `}</style>
        </>
    )
}

export default Testimonial;