import React, { Component } from "react";
import styled from "styled-components";
import { HeartFilled } from "@ant-design/icons";
import PlayButton from "../../../../assets/imgs/home/play-button-v2.svg";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Modal } from "antd";
import ReactPlayer from "react-player";
import { isMobile } from "react-device-detect";

const TestimonialContainer = styled.div`
    padding-top: 64px;
    padding-bottom: 64px;

    background-color: var(--primary-bg);

    .title-heading {
        margin-bottom: 64px;
        .title-heart {
            color: var(--pekachu);
            margin: 0 8px;
        }
    }

    .grid-item {
        cursor: pointer;
    }

    .react-player__preview {
        background-size: contain !important;
        background-repeat: no-repeat !important;
    }
`;

const VideoCardContainer = styled.div`
    background-image: url(${(props) => props.bgImage});
    background-color: var(--crow);
    position: relative;
    border-radius: var(--peaky-br-4);
    background-position: center right;

    .play-icon {
        position: absolute;
        background-image: url(${PlayButton});
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 68px;
        height: 68px;
    }
`;

const RenderVideoJSX = ({ obj, idx, handleClick }) => {
    if (isMobile) {
        return (
            <ReactPlayer
                className="react-video-player bg-image-full"
                light={obj.imgSrc}
                url={obj.src}
                playing
                controls
                width="100%"
                height="225px"
                config={{
                    file: {
                        attributes: {
                            controlsList: "nodownload",
                            disablePictureInPicture: true,
                        },
                    },
                }}
            />
        );
    }

    return (
        <VideoCardContainer
            key={"TES-VIDEO-CARD" + idx}
            className="grid-item bg-image-full"
            style={{ height: 200 }}
            bgImage={obj.imgSrc}
            onClick={() => handleClick(obj.src)}
        >
            <div className="play-icon bg-image-full"></div>
        </VideoCardContainer>
    );
};

const TestimonialCardContainer = styled.div`
    background-color: var(--secondary-bg);
    padding: 32px;
    border-radius: 4px;
    font-family: "OpenSans", sans-serif !important;

    .user-details {
        margin-bottom: 32px;

        .user-pic {
            background-image: url(${(props) => props.userPic});
            border: 1px solid var(--snowfall);
            box-sizing: border-box;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin-right: 16px;
        }

        .user-name {
            font-family: "Inconsolata", sans-serif !important;
            font-weight: 800 !important;
            font-size: 21px;
            color: var(--dove);
        }

        .user-class {
            font-size: 14px;
            color: rgba(255, 255, 255, 0.54);
        }
    }

    .testimonial-text {
        font-size: 18px;
        line-height: 25px;
        font-weight: 400;
        color: var(--snowfall);
        white-space: pre-wrap;
    }

    .read-review {
        margin-top: 32px;
        color: rgba(255, 255, 255, 0.54);
        font-size: 16px;

        .site-img {
            background-image: url(${(props) => props.reviewIcon});
            width: 30px;
            height: 30px;
            margin-left: 8px;
        }
    }
`;

const RenderTestimonialReview = ({ obj, idx }) => {
    return (
        <TestimonialCardContainer
            key={"TES-REV-CARD" + idx}
            className="grid-item"
            userPic={obj.imgSrc}
            reviewIcon={obj.reviewIcon}
            onClick={() => {
                window.open(obj.reviewLink, "_blank");
            }}
        >
            <div className="f-d user-details">
                <div className="user-pic bg-image-full"></div>
                <div>
                    <div className="user-name">{obj.name}</div>
                    <div className="user-class">{obj.class}</div>
                </div>
            </div>
            <div className="testimonial-text">{obj.text}</div>
            <div className="read-review f-d f-h-c">
                <div className="review-text">Full review on </div>
                <div className="site-img bg-image-full"></div>
            </div>
        </TestimonialCardContainer>
    );
};

class TestimonialsV3 extends Component {
    state = {
        isVisible: false,
        videoSrc: null,
    };

    handleVisible = () => {
        this.setState({ isVisible: !this.state.isVisible });
    };

    setVideoSrc = (src) => {
        this.setState({
            videoSrc: src,
            isVisible: true,
        });
    };

    renderTestimonial = () => {
        let testimonial_list = this.props.data.testimonials;

        return testimonial_list.map((obj, idx) => {
            if (obj.type === "video") {
                return <RenderVideoJSX obj={obj} key={idx} idx={idx} handleClick={this.setVideoSrc} />;
            } else {
                return <RenderTestimonialReview obj={obj} key={idx} idx={idx} />;
            }
        });
    };

    render() {
        const { isVisible, videoSrc } = this.state;

        return (
            <>
                <TestimonialContainer className="lr-pad-d lr-pad-m"
                id="reviews">
                    <h2 className="text-xl title-heading font-heading f-d f-h-c f-v-c">
                        Our students <HeartFilled className="title-heart" /> us
                    </h2>

                    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
                        <Masonry gutter="16px">{this.renderTestimonial()}</Masonry>
                    </ResponsiveMasonry>
                </TestimonialContainer>
                <Modal
                    footer={null}
                    centered
                    destroyOnClose={true}
                    visible={isVisible}
                    onCancel={this.handleVisible}
                    width="1000"
                    className="testimonial-modal"
                >
                    <iframe
                        className="framevideo"
                        width="1200"
                        height="675"
                        title="Testimonial Video"
                        frameBorder="0"
                        allow="autoplay *; fullscreen *"
                        src={videoSrc + "?autoplay=1"}
                    ></iframe>
                </Modal>
                <style jsx={"true"}>
                    {`
                        .testimonial-modal .ant-modal-body {
                            padding: 0;
                        }

                        .testimonial-modal .ant-modal-close {
                            z-index: 2;
                            font-size: 24px;
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
                    `}
                </style>
            </>
        );
    }
}

export default TestimonialsV3;
