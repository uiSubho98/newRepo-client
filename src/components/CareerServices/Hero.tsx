import React from "react";
import {Carousel} from "antd";
import {isMobile} from "react-device-detect";
import CustomNavigator from './CustomNavigator'
import CustomCarousel from "./CustomCarousel";
interface Props {
    data?: Content;
    lists: any;
}

interface Content {
    title?: string;
    description?: string;
    imageSrc?: string;
    highlights: Array<string>;
}

interface ILIst {
    list: any;
}

interface ICarouselProps {
    dots: boolean;
    draggable: boolean;
    arrows: boolean;
    autoplaySpeed: number;
    slidesToShow: number;
    slidesToScroll: number;
    infinite:boolean;
    prevArrow: any;
    nextArrow:any;
}

const Hero = (props: Props) => {
    const {data, lists} = props;

    const carouselProps:ICarouselProps  = {
        dots: false,
        draggable: !isMobile ? false:true,
        arrows: true,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false, 
        prevArrow: <CustomNavigator className="custom-prev" type="left" />,
        nextArrow: <CustomNavigator className="custom-next" type="right" />,
    };

    return (
        <>
            <div className="career-service hero-content-wrapper lr-pad-d tb-pad-d lr-pad-m tb-pad-m f-vt-m f-d">
                <div className="hero-container-left">
                    <h1 className="text-xxl font-heading title"
                        dangerouslySetInnerHTML={{__html: (data && data.title ? data.title : '')}}>
                    </h1>
                    <span className="f-d text-big description text-faded-2">
                        {data && data.description}
                    </span>
                    <div className="f-d highlights-list">
                        <div className=" g-d g-col-2 g-col-1-m g-gap-64-16">
                            {data && data.highlights.map((item, index) => {
                                return (
                                    <div className="list f-d f-v-c " key={index}>
                                        <div className="f-d f-h-c f-v-c check-icon">
                                            <i className="icon icon-check"></i>
                                        </div>
                                        <div className="text-regular"> {item}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="hero-container-right">
                    {
                        isMobile ?
                        <div className="prograd-carousel">
                            <div className="f-d f-h-c f-v-c h-100">
                                <Carousel {...carouselProps} autoplay className="pg-corousel">
                                    {lists.list.map((prograd: string, index: number) => {
                                        return (
                                            <img src={prograd} alt={`Prograd ${prograd}`} width="100%" height="100%"
                                                key={index}/>
                                        )
                                    })}
                                </Carousel>
                            </div>
                        </div> :
                        <CustomCarousel prograds={lists.list} />
                    }
                </div>
            </div>
            <style jsx>{`
                .career-service .hero-container-left {
                    width: 60%;
                    margin: 0 0 150px;
                }

                .slick-next,
                .slick-prev {
                    z-index: 10;
                }
                
                .ant-carousel .slick-next {
                    height:40px;
                    width:40px;
                    left:94%;
                    top: 45%;
                    background: var(--crow);
                    color: var(--dove);
                    font-size: 30px;
                    cursor: pointer;
                }

                .ant-carousel .slick-prev {
                    height:40px;
                    width:40px;
                    top: 45%;
                    background: var(--crow);
                    color: var(--dove);
                    font-size: 30px;
                    cursor: pointer;
                }

                .slick-next,
                .slick-prev {
                    background-color: var(--dove);
                    border-radius: 50%;
                    box-shadow: var(--peaky-shadow-high);
                    border: solid 1px var(--snowfall);
                    display: flex !important;
                    align-items: center;
                    justify-content: center;
                    width: 52px;
                    height: 52px;
                    transition: all 0.3s;
                }

                .ant-carousel .slick-next::before,
                .ant-carousel .slick-prev::before {
                    content: "";
                }

                .ant-carousel .slick-next:hover,
                .ant-carousel .slick-next:focus,
                .ant-carousel .slick-prev:hover,
                .ant-carousel .slick-prev:focus {
                    background: var(--primary-bg);
                    color: var(--dove);
                    box-shadow: var(--peaky-shadow-high-2);
                }

                .ant-carousel .slick-disabled {
                    display: none !important;
                }

                .career-service .hero-container-left .highlights-list {
                    margin: 2rem 0 0;
                }

                .career-service .highlights-list .check-icon {
                    background-color: #7FB53E;
                    border-radius: var(--peaky-br-full);
                    border: 1px solid var(--dove);
                    color: var(--dove);
                    font-size: 16px;
                    height: 20px;
                    margin-right: 1rem;
                    width: 20px;
                }

                .highlights-list .check-icon
                .icon-check {
                    font-size: 14px !important;
                }

                .hero-container-left .description {
                    font-weight: 300;
                    white-space: pre-wrap;
                }

                .hero-container-right {
                    width: 40%;
                }

                .hero-container-right .prograd-carousel {
                    float: right;
                }

                .hero-container-right .pg-corousel {
                    width: 400px;
                    height: auto;
                }

                .ant-carousel .slick-slide img {
                    border-radius: var(--peaky-br-4);
                }

                .career-service .hero-container-left 
                .highlights-list .list .text-regular {
                    font-weight: 400;
                }

                @media only screen and (max-device-width: 760px) {
                    .career-service {
                        // margin-top: 2rem;
                    }

                    .career-service .hero-container-left {
                        margin-bottom: 0;
                    }

                    .career-service .hero-container-left, .career-service .hero-container-right {
                        width: unset;
                    }

                    .career-service .hero-container-right {
                        margin: var(--peaky-gap-48) 0 0;
                    }

                    .hero-container-left .description {
                        white-space: unset;
                    }

                    .career-service .hero-container-right .prograd-carousel {
                        float: unset;
                    }

                    .career-service.hero-content-wrapper .title {
                        line-height: unset;
                    }

                    .career-service .hero-container-right .pg-corousel {
                        width: 300px;
                    }
                }
              
                @media only screen and (min-width: 768px) and (max-width: 1024px) {
                    .hero-container-right {
                        width: unset;
                    }
                }
            `}</style>
        </>
    )
}

export default Hero;