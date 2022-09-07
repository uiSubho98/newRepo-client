import React from "react";
// @ts-ignore
import {Carousel} from "antd";
import { HeartFilled } from "@ant-design/icons";
import {isMobile} from "react-device-detect";
import TestimonialCard from "./TestimonialCard"
import { ITestimonial } from "../../interfaces/talent-solutions";

interface Props {
    data: Array<ITestimonial>
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
        let list = data && data.map( (t, i) => <TestimonialCard data={t} id={i + 1} key = {i} /> )
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
            <div className="testimonials-wrapper lr-pad-d lr-pad-m 
            tb-pad-d tb-pad-m">  
                <h2 className="font-heading f-d f-h-c f-v-c text-xl title">
                    Recruiters <HeartFilled className="heart" /> us
                </h2>
                <div className="testimonials-content">
                    <Carousel {...carouselProps} autoplay easing={"linear"} effect={"fade"}>
                        { data && renderTestimonials() }
                    </Carousel>
                </div>
            </div>
            <style jsx>{`

                .title .heart {
                    color: var(--pekachu);
                    margin: 0px 8px;
                }
                
                .testimonials-wrapper .testimonials-content{
                    background-color:var(--primary-bg);
                    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
                    border-radius: var(--peaky-br-4);
                    margin: var(--peaky-gap-48) 0 0;
                }

                .testimonials-wrapper .testimonials-content .designation{
                    position:relative;
                }

                .testimonials-wrapper .testimonials-content .ant-carousel 
                .slick-dots {
                    height: 6%;
                    width:73%;
                }

                .testimonials-wrapper .testimonials-content .ant-carousel .slick-dots 
                li button {
                    border-radius: var(--peaky-br-full);
                    height: 10px;
                    margin-left: 2.5px;
                    margin-right: unset;
                    width: 10px;
                }

                .testimonials-wrapper .testimonials-content .ant-carousel .slick-dots li.slick-active 
                button {
                    width: 10px;
                }

                @media only screen and (min-width: 760px) and (max-width: 1024px) {
                    .testimonials-wrapper .testimonials-content{
                        height:auto;
                    }
                    .testimonials-wrapper .testimonials-list .testimonilas-right{
                        height:500px;
                    }
                    .testimonials-wrapper .testimonials-content .ant-carousel 
                    .slick-dots {
                        display:none !important;
                    }
                }

                @media only screen and (max-device-width: 760px) {
                    .testimonials-wrapper .testimonials-content{
                        height: auto;
                        margin-left: auto;
                        margin-right: auto;
                        width: 95%;
                    }

                    .testimonials-wrapper .testimonials-list .testimonilas-right{
                        min-height: 480px;
                        margin:5rem 0 1rem 0;
                        padding:1rem;
                        width:unset;
                    }

                    .testimonials-wrapper .testimonials-content .ant-carousel 
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
                    .testimonials-wrapper .testimonials-content .ant-carousel 
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