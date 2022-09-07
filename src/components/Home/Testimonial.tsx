import React, { useState } from "react";
import { Modal } from "antd";
import PlayButton from "../../assets/imgs/home/play-button.svg";

interface ITestimonial {
    title?: string;
    imageSrc?: string;
    videoSrc?: string;
}

interface IProps {
    data?: ITestimonial
}

const Testimonial = (props: IProps) => {
    const { data } = props;

    const [ isVisible, setVisibility ] = useState<boolean>(false);

    const updateStates = () => {
        setVisibility(!isVisible);
    }

    return (
        <>
            <div className="testimonial-content-wrapper lr-pad-d lr-pad-m
            tb-pad-d tb-pad-m">
                <h2 className="h2-heading text-c-d">
                    { data && data.title }
                </h2>
                <div className="thumbnail f-d f-h-c f-v-c bg-image-full"
                style= {{ backgroundImage: "url("+ 
                ( data && data.imageSrc ) + ")" }}>
                    <div className="bg-image-full play-button 
                    c-pointer" style={{ backgroundImage: 
                        "url(" +PlayButton+ ")"}} 
                    onClick={() => updateStates() }>
                    </div>
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
                    title= { data && data.title }
                    frameBorder = "0"
                    allow="autoplay *; fullscreen *"
                    src={ data ? data.videoSrc+"?autoplay=1":"" }
                 >
                </iframe>
            </Modal>

            <style jsx>{`

                .testimonial-content-wrapper .thumbnail {
                    margin: var(--peaky-gap-48) 0;
                    height:600px;
                }

                .testimonial-content-wrapper .thumbnail 
                .play-button {
                    height:70px;
                    width:70px;
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

                @media only screen and (max-device-width: 760px) {

                    .testimonial-content-wrapper .thumbnail {
                        margin: var(--peaky-gap-32) 0;
                        height: 200px;
                    }

                    .ant-modal.testimonial-modal {
                        width:100%;
                    }

                    .ant-modal.testimonial-modal .ant-modal-body {
                        height: 225px;
                    }

                    .testimonial-modal .framevideo {
                        height:225px;
                        width:100%;
                    }

                    .testimonial-modal .ant-modal-close-x {
                        position:unset;
                    }

                }

                @media screen and (min-width: 768px) and (max-width: 1023px) 
                and (orientation: portrait) {
                    .testimonial-content-wrapper .thumbnail {
                        height: 400px;
                    }

                    .ant-modal.testimonial-modal {
                        width:90%;
                    }

                    .ant-modal.testimonial-modal .ant-modal-body {
                        height: 400px;
                    }

                    .testimonial-modal .framevideo {
                        height:400px;
                        width:100%;
                    }
                }

            `}</style>
        </>
    )
}

export default Testimonial;