import { Carousel, Modal } from 'antd';
import React, { useState } from 'react';
import { G_URL } from '../../constants/constants';
import { IEnrolBlock } from '../../interfaces/dashboard';
import PaymentOptionsV2 from '../Payment/PaymentOptionsV2';

interface IProps {
    enrol?: IEnrolBlock;
}

const Enrol = (props: IProps) => {

    const { enrol } = props;
    const [isPaymentModalVisible, setPaymentModalVisible] = useState<boolean>(false);
    
    const renderTestimonials = () => {
        return enrol?.testimonials.map((testimonial, key) => (
            <div className="testimonial-card" key={key}>
                <div>
                    <span className="font-heading text-large statement">
                        <span className="highlight">“</span>
                        { testimonial.statement }
                        <span className="highlight">”</span>
                    </span>
                    <div className="f-d f-vt info">
                        <span className="text-regular name">
                            { testimonial.name }
                        </span>
                        <span className="text-small class">
                            Class of { testimonial.class }
                        </span>
                    </div>
                </div>
                <div className="bg-image-full user-image" 
                style={{backgroundImage: 'url(' + testimonial.image + ')'}}>
                </div>
            </div>
        ));
    }

    const learnMore = () => {
        window.open(G_URL + "microdegree", "_blank");
    }

    return (
        <>
            {/* <div className="g-d g-col-s-b g-h-e enrol-block-wrapper">
                <div></div> */}
                <div className="enrol-block">
                    <div className="header">
                        <h1 className="font-heading text-large">
                            { enrol?.title }
                        </h1>
                        <span className="f-d description text-regular">
                            { enrol?.description }
                        </span>
                        <div className="f-d f-v-c action-block">
                            
                            {/* Enrollments closed */}
                            <button
                                className="default-blue-btn btn-small btn-disabled" 
                                onClick={() => {setPaymentModalVisible(true)}} 
                                disabled
                            >
                                Enrollments Will Begin Soon
                            </button>

                            {/* Enrollments Open */}

                            {/* <button
                                className="default-blue-btn btn-small"
                                onClick={() => {setPaymentModalVisible(true)}}
                            >
                                Enrol Now
                            </button> */}


                            <span className="learn-more-btn c-pointer"
                                onClick={() => learnMore()}
                            >
                                Learn More
                            </span>
                        </div>
                    </div>
                    <div className="divider"></div>
                    <div className="f-d testimonial">
                        <Carousel autoplay>
                            { renderTestimonials() }
                        </Carousel>
                    </div>
                </div>
            {/* </div> */}
            <Modal
                destroyOnClose={true}
                footer={null}
                visible={isPaymentModalVisible}
                onCancel={() => setPaymentModalVisible(false)}
                wrapClassName="payment-options-content"
                closable={false}
                width="90%"
            >
                <PaymentOptionsV2 
                    programType="microdegree"
                    displayEarlyBirdDiscount={false}
                    closeModal={()=>{setPaymentModalVisible(false)}}
                />
            </Modal>
            <style jsx>{`
                .enrol-block-wrapper {
                    margin: 0 0 84px;
                }

                .enrol-block {
                    background-color: var(--primary-bg);
                    width: 85%;
                }

                .enrol-block .btn-disabled{
                    opacity:0.4;
                    cursor:not-allowed;
                }

                .enrol-block .header {
                    padding: var(--peaky-pad-32) var(--peaky-pad-32) 0;  
                }

                .enrol-block .description {
                    margin: 5px 0 0;
                    opacity: 0.87;
                }

                .enrol-block .action-block {
                    margin: var(--peaky-gap-32) 0 0;
                }

                .enrol-block .learn-more-btn {
                    text-decoration: underline;
                    margin: 0 0 0 var(--peaky-gap-32);
                    opacity: 0.87;
                }

                .enrol-block .divider {
                    background-color: rgba(255, 255, 255, 0.1);
                    height: 1px;
                    margin: var(--peaky-gap-48) var(--peaky-gap-32) var(--peaky-gap-64);
                    width: 100%;
                }

                .enrol-block .ant-carousel {
                    width: 100%;
                }

                .enrol-block .testimonial-card {
                    display: grid !important;
                    grid-template-columns: 2fr 1fr;
                    padding: 0 0 0 var(--peaky-pad-32);
                }

                .enrol-block .testimonial-card 
                .statement {
                    display: inline-block;
                    line-height: 34px;
                    min-height: 115px;
                }

                .enrol-block .testimonial-card
                .highlight {
                    color: var(--pekachu);
                }

                .enrol-block .testimonial-card 
                .user-image {
                    height: 260px;
                    width: 260px;
                }

                .enrol-block .testimonial-card
                .info {
                    margin: var(--peaky-gap-8) 0 0;
                }

                .enrol-block .testimonial-card
                .info .name {
                    opacity: 0.87;
                }

                .enrol-block .testimonial-card
                .info .class {
                    opacity: 0.54;
                }

                .enrol-block .ant-carousel 
                .slick-slider {
                    display: grid;
                }

                .enrol-block .ant-carousel 
                .slick-dots {
                    height: 20%;
                    text-align: left;
                    padding: 0 0 0 var(--peaky-pad-32);
                }

                .enrol-block .ant-carousel .slick-dots 
                li button {
                    border-radius: var(--peaky-br-full);
                    height: 10px;
                    margin-left: 2.5px;
                    margin-right: unset;
                    width: 10px;
                }

                .enrol-block .ant-carousel .slick-dots li.slick-active 
                button {
                    width: 10px;
                }

                .payment-options-content .ant-modal-body {
                    padding: 0;
                }
                @media only screen and (max-device-width: 760px) {
                    .enrol-block-wrapper {
                        display: unset;
                        margin: 0;
                    }

                    .enrol-block-wrapper .enrol-block {
                        width: 100%;
                    }

                    .enrol-block .header {
                        padding: var(--peaky-pad-16) var(--peaky-pad-16) 0;
                    }

                    .enrol-block .divider {
                        margin-left: var(--peaky-gap-16);
                        margin-right: var(--peaky-gap-16);
                        width: unset;
                    }

                    .enrol-block .testimonial-card {
                        grid-template-columns: 1fr;
                        padding-left: var(--peaky-pad-16);
                    }

                    .enrol-block .ant-carousel .slick-dots {
                        padding-left: var(--peaky-pad-16);
                    }
    
                    .enrol-block .testimonial-card .info {
                        position: absolute;
                        margin-top: var(--peaky-gap-48);
                    }
    
                    .enrol-block .testimonial-card .user-image {
                        height: 200px;
                        margin-left: auto;
                        width: 200px;
                    }
                }
            `}</style>
        </>
    )
}

export default Enrol;