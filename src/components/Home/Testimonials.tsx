import React,{ useState } from "react";
// @ts-ignore
import {Carousel,Modal} from "antd";
import {isMobile} from "react-device-detect";
import PlayButton from "../../assets/imgs/home/play-button.svg";


interface ITestimonial {
    name?: string;
    batch?: string;
    videoSrc?: string;
    thumbnail?: string;
    imageSrc?: string;
    content?: string;
    company?: string;
}

interface ITestimonials {
    title?: string;
    testimonialsList?: Array<ITestimonial>;
}

interface Props {
    data?: ITestimonials
}

interface ICarouselProps {
    dots: boolean;
    draggable: boolean;
    arrows: boolean;
    autoplaySpeed: number;
    speed:number;
    slidesToShow: number;
    slidesToScroll: number;
    infinite:boolean;
}

const Testimonials = (props:Props) => {
    const {data} = props;
    const [isModalActive , setModalState] = useState<boolean>(false);
    const [testimonialActive, setActiveTestimonial] = 
    useState<ITestimonial>({});

    const updateStates = (testimonial: ITestimonial) => {
        setModalState(true);
        setActiveTestimonial(testimonial);
    }

    const renderTestimonials = (testimonialsList?: Array<ITestimonial>) => {
        return testimonialsList && 
        testimonialsList.map((testimonial, index) => {
            return (
                <div className="g-d g-v-c g-h-c w-80 testimonial-container" key={index}>
                    <div className="sub g-d g-v-c g-h-c 
                    bg-image" style={{
                    backgroundImage: "url(" + testimonial.thumbnail + ")"
                    }}>
                        { !isModalActive &&
                            <div className="bg-image-full play-button 
                            c-pointer" style={{ backgroundImage: 
                                "url(" +PlayButton+ ")"}} 
                            onClick={() => updateStates(testimonial) }>
                            </div>
                        }
                    </div>
                    <div className="f-d f-vt user-info">
                        <div className="f-d f-v-c f-h-s w-100">
                            <div className="bg-image-full profile-picture" 
                            style={{ backgroundImage: "url(" +
                            testimonial.imageSrc+ ")"}}>
                            </div>
                            <div className="f-d f-vt f-h-c info">
                                <span className="body-small strong-text">
                                    {testimonial.name}
                                </span>
                                <span className="body-small">
                                    {testimonial.batch}
                                </span>
                                <span className="body-small">
                                    Now working in&nbsp;
                                    <span className="strong-text">
                                        {testimonial.company}
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div className="content">
                            <span className="body-small">
                                {testimonial.content}
                            </span>
                        </div>
                    </div>
                </div>
            )
        });
    }

 
    const carouselProps:ICarouselProps  = {
        dots: false,
        draggable: !isMobile ? false:true,
        arrows: false,
        autoplaySpeed: 0,
        speed:8000,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite:true
    };

    return (
        <>
            <div className="testimonials-wrapper
            lr-pad-d lr-pad-m tb-pad-d tb-pad-m">
                <h2 className="h2-heading text-c-d">
                    { data && data.title }
                </h2>
                <div className="testimonials-list w-100">
                    <Carousel {...carouselProps} autoplay>
                        { data && renderTestimonials( data.testimonialsList ) }
                    </Carousel>
                </div>
            </div>
            <Modal
                footer={null}
                centered
                destroyOnClose={true}
                visible={isModalActive}
                onCancel={() => setModalState(false)}
                width="1000"
                className="testimonial-modal"
            >
                <iframe 
                className="framevideo" 
                width="1200" 
                height="675" 
                title= "testimonial"
                frameBorder = "0"
                allow="autoplay *; fullscreen *"
                src={testimonialActive ? 
                testimonialActive.videoSrc+"?autoplay=1" : "" } >
                </iframe>
            </Modal>
            <style jsx>{`
                .testimonials-wrapper .testimonials-list {
                    margin: var(--peaky-gap-32) 0 0;
                }

                .testimonials-wrapper .testimonials-list 
                .testimonial-container {
                    display: grid !important;
                    margin:var(--peaky-gap-32) 0 0;
                }

                .testimonials-wrapper .testimonials-list 
                .testimonial-container .sub {
                    height: 400px;
                    width:800px;
                }

                .testimonials-wrapper .testimonials-list 
                .testimonial-container .sub .play-button {
                    height:70px;
                    width:70px;
                }

                .testimonials-wrapper .testimonials-list 
                .testimonial-container .user-info {
                    margin: var(--peaky-gap-16) 0 0 ;
                    width:800px;
                }

                .testimonials-wrapper .testimonials-list 
                .testimonial-container .profile-picture {
                    height:85px;
                    width:85px;
                    border-radius: var(--peaky-br-full);
                }

                .testimonials-wrapper .testimonials-list 
                .testimonial-container .user-info .info {
                    margin: 0 0 0 var(--peaky-gap-16);
                }

                .testimonials-wrapper .testimonials-list 
                .testimonial-container .user-info .content {
                    margin: var(--peaky-gap-32) 0 0;
                }

                .testimonial-modal .ant-modal-body {
                    padding:0;
                }

                .testimonial-modal .ant-modal-close {
                    z-index:2;
                    font-size:24px;
                }

                .testimonial-modal .ant-modal-close-x {
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

                @media only screen and (max-device-width: 760px) {
                    .testimonials-wrapper .testimonials-list 
                    .testimonial-container .sub {
                        height: 200px;
                        width:100%;
                    }

                    .testimonials-wrapper .testimonials-list 
                    .testimonial-container .user-info {
                        width:unset;
                    }

                    .testimonials-wrapper .testimonials-list 
                    .testimonial-container {
                        width: 90% !important;
                        margin: 0 auto;
                    }

                    .ant-modal.testimonial-modal {
                        width:100%;
                    }

                    .ant-modal.testimonial-modal .ant-modal-body {
                        height: 250px;
                    }

                    .testimonial-modal .framevideo {
                        height:250px;
                        width:100%;
                    }
                }
            `}</style>
        </>
    )
}

export default Testimonials;