import React from "react";
import {Carousel} from "antd";
import {isMobile} from "react-device-detect";
import CustomCarousel from "./CustomCarousel";

interface IProps {
    data: {
        title: string
        stats: Array<{ val: string, desc: string }>
        extra: string
        learnMoreLink: string
        prograds: Array<string>
    }
    program?: string;
    handleRegister?: (mode?: number, type?: string) => void;
}

const CareerServices = (props: IProps) => {
    const {title, stats, extra, prograds} = props.data;

    const path = window.location.pathname.split('/');
    let isOptional = false;
    if(path && (path[1] === "microdegree" || 
    path[1] === "bootcamp")) {
        isOptional = true;
    }

    return (
        <>
            <div className="career-services-wrapper lr-pad-d tb-pad-d g-d g-col-2 g-col-1-m tb-pad-m lr-pad-m text-c-m"
            id={"placements"}>
                {
                    !isMobile &&
                    <>
                        <CustomCarousel prograds={prograds} />
                        {/* <div className="prograd-carousel"> */}
                            {/* <div className="f-d f-h-c f-v-c h-100"> */}
                                {/*<div className='carousel-bg' style={{*/}
                                {/*    backgroundImage:*/}
                                {/*        "linear-gradient(rgba(18,18,18,0.5),rgba(18,18,18,0.5)),url(" + prograds[sliderPos] + ")"*/}
                                {/*}}>*/}
                                    {/* <Carousel className="pg-corousel"
                                              beforeChange={(n) => changeSliderPos(n + 2 >= prograds.length ? n + 2-prograds.length : n + 2)}>
                                        {prograds.map((prograd: string, index: number) => {
                                            return (
                                                <img src={prograd} alt={`Prograd ${prograd}`} width="100%" height="100%"
                                                     key={index}/>
                                            )
                                        })}
                                    </Carousel> */}
                                {/*</div>*/}
                            {/* </div> */}
                        {/* </div> */}
                        <div className="right-pane">
                            {
                                isOptional &&
                                <span className="f-d optional-text text-medium strong-text">
                                    Optional paid service
                                </span>
                            }
                            <div className="text-xl font-heading title">{title}</div>
                            <div className="stats-wrapper f-d">
                                <div className="stats-container g-d g-col-2">
                                    {
                                        stats.map((stat: { val: string, desc: string }, index: number) => {
                                            return (
                                                <div className="stat-wrapper f-d f-h-c" key={index}>
                                                    <div className="stat f-d f-vt f-v-c">
                                                        <div
                                                            className="text-xxxl text-primary font-heading">{stat.val}</div>
                                                        <div
                                                            className="text-big text-c-d text-faded-2 desc">{stat.desc}</div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="extra-info text-small text-c-m text-faded">{extra}</div>

                            {/* <div className="f-d f-ht flex-container">
                                <button className="default-blue-btn learn-more-btn" onClick={() => {
                                    window.open(G_URL + "career-services")
                                }}>
                                    Learn more
                                </button>

                                
                                <button className="default-blue-btn outline-white download-report-btn"
                                    onClick={() => { handleRegister && handleRegister(undefined, "placement")}}>
                                    Download Placement Report
                                </button>

                            </div> */}
                        </div>
                    </>
                }
                {
                    isMobile &&
                    <>
                        {
                            isOptional &&
                            <span className="optional-text text-medium text-c-d strong-text">
                                Optional paid service
                            </span>
                        }
                        <div className="text-xl font-heading title">{title}</div>
                        <div className="prograd-carousel">
                            <div className="f-d f-h-c f-v-c h-100">
                                <Carousel autoplay className="pg-corousel">
                                    {prograds.map((prograd: string, index: number) => {
                                        return (
                                            <img src={prograd} alt={`Prograd ${prograd}`} className="carousel-img"
                                                 key={index}/>
                                        )
                                    })}
                                </Carousel>
                            </div>
                        </div>
                        <div className="stats-wrapper f-d">
                            <div className="stats-container g-d g-col-2">
                                {
                                    stats.map((stat: { val: string, desc: string }, index: number) => {
                                        return (
                                            <div className="stat-wrapper f-d f-h-c">
                                                <div className="stat f-d f-vt f-v-c">
                                                    <div className="text-xxxl font-heading val">{stat.val}</div>
                                                    <div
                                                        className="text-big text-c-d text-faded-2 desc">{stat.desc}</div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="extra-info text-small text-c-d text-faded">{extra}</div>
                        {/* <div className="f-d f-vt flex-container">
                            <button className="default-blue-btn learn-more-btn" onClick={() => {
                                window.open(G_URL + "career-services")
                            }}>
                                Learn more
                            </button>
                            
                            <button className="default-blue-btn outline-white download-report-btn"
                            onClick={() => { handleRegister && handleRegister(undefined, "placement")}}>
                                Download Placement Report
                            </button>
                        </div> */}
                    </>
                }
            </div>

            <style jsx>{`
                .career-services-wrapper .h-100 {
                    height: 100%;
                }

                .career-services-wrapper .pg-corousel {
                    width: 450px;
                }

                .career-services-wrapper .title {
                    max-width: 500px;
                    line-height: 2.623rem;
                }

                .career-services-wrapper .stats-container {
                    margin-top: var(--peaky-gap-64);
                    grid-gap: 128px;
                }

                .career-services-wrapper .carousel-img {
                    width: 100%;
                    height: 100%;
                }

                .career-services-wrapper .stat {
                    max-width: 200px;
                }

                .career-services-wrapper .extra-info {
                    margin-top: var(--peaky-gap-32);
                }

                .career-services-wrapper .career-services-btn {
                    font-weight: 700;
                    border: 1px solid var(--dove);
                    padding: 21px 32px;
                    margin-top: var(--peaky-gap-64);
                }

                .carousel-bg {
                    padding-right: 20rem;
                    background-repeat: no-repeat;
                    background-position: right;
                }

                .career-services-wrapper .prograd-carousel {
                    margin-right: 2rem;
                }

                .career-services-wrapper .optional-text {
                    font-family: Inconsolata;
                    opacity: 0.54;
                    margin: 0 0 var(--peaky-gap-16);
                }

                .career-services-wrapper .stat .desc {
                    font-weight: 300;
                }

                .ant-carousel .slick-slide img {
                    border-radius: var(--peaky-br-4);
                }

                .flex-container {
                    margin-top: var(--peaky-gap-64);
                    padding: 0 8px;
                }

                .flex-container .learn-more-btn {
                    margin: 0 var(--peaky-gap-16) 0 0;
                }

                @media only screen and (max-device-width: 760px) {
                    .career-services-wrapper .prograd-carousel {
                        margin-top: var(--peaky-gap-32);
                        margin-right: 0;
                    }

                    .career-services-wrapper .pg-corousel {
                        width: 90vw;
                    }

                    .career-services-wrapper .prograd-carousel
                    .ant-carousel .slick-dots-bottom {
                        bottom: -25px;
                    }

                    .career-services-wrapper .title {
                        max-width: 500px;
                        line-height: 2.623rem;
                    }

                    .career-services-wrapper .optional-text {
                        margin-bottom: var(--peaky-gap-8);
                    }

                    .career-services-wrapper .stats-container {
                        grid-gap: 64px;
                    }

                    .career-services-wrapper .stat .val {
                        color: var(--primary);
                    }

                    .career-services-wrapper .stat .desc {
                        margin-top: var(--peaky-gap-16);
                    }

                    .career-services-wrapper .career-services-btn {
                        margin-top: var(--peaky-gap-32);
                    }

                    .flex-container {
                        padding: 0;
                    }

                    .flex-container .learn-more-btn,
                    .flex-container .download-report-btn {
                        width: 100%;
                    }

                    .flex-container .download-report-btn {
                        margin: var(--peaky-gap-16) 0 0;
                    }
                }
            `}</style>
        </>
    )
}

export default CareerServices;