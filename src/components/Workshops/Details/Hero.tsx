import { Popover, Rate } from "antd";
import React from "react";
import moment from "moment";
import { CalendarOutlined, DownOutlined } from "@ant-design/icons";
import PlayButton from "../../../assets/imgs/home/play-button-v2.svg";
import ReactPlayer from "react-player";
import { isMobile } from "react-device-detect";
import { check_login } from "../../../utils/login.util";
import { IWorkshopTime } from "../workshops";

interface IHeroProps {
    data: {
        bookingText?: string;
        rating?: number;
        ratingCount?: string;
        subtitle?: string;
        title: string;
        videoThumb?: string;
        videoUrl?: string;
        replayUrl?: string;
        replayThumb?: string;
    },
    workshopTimes: Array<IWorkshopTime>;
    startTime: number
    handleRegister: (mode?: number) => void;
    joinUrl?: string;
    ended: boolean;
    showReplay: () => void;
    replayAvailable: boolean;
    registrationsClosed: boolean;
}

const Hero = (props: IHeroProps) => {
    const { bookingText, rating, ratingCount, subtitle, title, videoThumb, videoUrl, replayUrl, replayThumb } = props.data;
    const { startTime, handleRegister, workshopTimes, joinUrl, ended, showReplay, replayAvailable, registrationsClosed } = props;
    const loggedIn = check_login();

    const renderPlayButton = () => {
        if(ended && replayAvailable) {
            return (
                <div className="f-d f-vt f-v-c c-pointer" onClick={()=>{showReplay()}}>
                    <div className="play-icon bg-image" style={{
                        backgroundImage: `url(${PlayButton})`
                    }}>
                    </div>
                    <div className="font-heading text-medium replay-text">Watch Replay</div>
                </div>
            )
        } else {
            return (
                <div className="play-icon" style={{ backgroundImage: `url(${PlayButton})`}}>
                </div>
            )
        }
    }

    const renderWorkshopTime = () => {
        let wTimes = workshopTimes.map((wt: IWorkshopTime, idx: number) => {
            return (
                <div key={idx}>{moment(wt.startTime * 1000).utcOffset("+05:30").format('DD MMMM Y[,] h:mm A')} to {moment(wt.endTime * 1000).utcOffset("+05:30").format('h:mm A [IST]')}</div>
            )
        });

        if (workshopTimes.length === 1) {
            return (
                <span>{moment(startTime * 1000).utcOffset("+05:30").format('DD MMMM Y [@] h:mm A [IST]')}</span>
            )
        } else {

            if(isMobile){
                return (
                    <span className="f-d f-v-c">
                        {workshopTimes.length} sessions  
                        <Popover placement="bottom" content={wTimes} trigger="click" className="caret-down text-small">
                            <DownOutlined />    
                        </Popover>
                    </span>
                )
            } else {
                return (
                    <span className="f-d f-v-c">
                        This workshop consists of {workshopTimes.length} sessions  
                        <Popover placement="bottomRight" content={wTimes} trigger="click" className="caret-down text-small">
                            <DownOutlined />    
                        </Popover>
                    </span>
                )
            }
        }
    }

    return (
        <>
            <div className="hero-wrapper lr-pad-d tb-pad-d">
                <div className="g-d g-col-2 g-col-1-m">
                    <div className="left-pane f-d f-vt f-h-c lr-pad-m">
                        <h2 className="font-heading text-xxl title">{title}</h2>
                        <div className="text-medium text-faded-2 subtitle">{subtitle}</div>
                        <div className="ratings-block text-faded-2 text-medium">
                            {rating && <span className="stars"><Rate disabled defaultValue={Math.round(rating / 0.5) * 0.5} allowHalf={true} /></span>}
                            <span>{rating}/5</span>
                            <span className="text-faded rating-count">{ratingCount}</span>
                        </div>
                        <div className="font-heading text-medium time-wrapper hide-d f-m f-v-c">
                            <CalendarOutlined className="calendar-icon" />
                            {renderWorkshopTime()}
                        </div>
                    </div>
                    <div className="right-pane">
                        {!isMobile ? 
                            <>{
                                !ended || !replayUrl ?
                                <ReactPlayer
                                    url={!ended || !replayAvailable ? videoUrl : replayUrl}
                                    playing
                                    controls
                                    volume={0.2}
                                    muted
                                    width="520px"
                                    height="320px"
                                    className="video"
                                    light={videoThumb}
                                    playIcon={renderPlayButton()}
                                    onPlay={()=>{console.log("some handling to be implemented")}}
                                />
                                : 
                                <div className="replay-wrapper">
                                    {
                                        replayUrl &&
                                        <div className="f-d f-h-c f-v-c bg-image replay-thumbnail"
                                            style={{ backgroundImage: "url(" + replayThumb + ")" }}>
                                            {renderPlayButton()}
                                        </div>
                                    }
                                </div>
                            }</>
                            :
                            <div className="video-thumb">
                                <img src={ended && replayThumb ? replayThumb : videoThumb} className="video-thumbnail" alt="Why Prograd"/>
                                {renderPlayButton()}
                            </div>
                        }
                        <div className="font-heading text-medium time-wrapper f-d f-h-c f-v-c hide-m">
                            <CalendarOutlined className="calendar-icon"/>
                            {renderWorkshopTime()}
                        </div>
                    </div>
                </div>

                <div className="btn-wrapper f-d f-h-c lr-pad-m">
                    {
                    !ended ?
                        <>
                        {
                            joinUrl ?
                            <button className="default-blue-btn" onClick={() => { window.open(joinUrl) }}>
                                Join Workshop
                            </button>
                            :
                            <button className="default-blue-btn" onClick={() => { !registrationsClosed && handleRegister() }}>
                                {registrationsClosed ? 'Workshop is Full' :bookingText}
                            </button>
                        }
                        </>
                    :
                        <>
                        {
                            replayAvailable ?
                            <button className="default-blue-btn" onClick={() => { showReplay() }}>
                                Watch Replay
                            </button>
                            :
                            <button className="default-blue-btn">
                                Replay coming soon...
                            </button>
                        }
                        </>
                    }
                </div>
                {
                    !ended && !loggedIn &&
                    <div className="text-faded text-small text-c-d login-wrapper">
                        Already registered? <u className="c-pointer" onClick={() => { handleRegister(0) }}>Log in</u>
                    </div>
                }
            </div>
            <style jsx>
                {`
                    .hero-wrapper .left-pane .title {
                        line-height: 3.67125rem;
                    }

                    .hero-wrapper .left-pane .subtitle {
                        margin-top: var(--peaky-gap-16);
                    }

                    .hero-wrapper .left-pane .ratings-block {
                        margin-top: var(--peaky-gap-32);
                    }

                    .hero-wrapper .left-pane .ratings-block .stars {
                        margin-right: var(--peaky-gap-8);
                    }

                    .hero-wrapper .left-pane .ratings-block .rating-count {
                        margin-left: var(--peaky-gap-8);
                    }


                    .hero-wrapper .right-pane {
                        text-align: -webkit-right;
                    }

                    .hero-wrapper .right-pane .play-icon {
                        width: 68px;
                        height: 68px;
                    }

                    .hero-wrapper .right-pane .video {
                        height: 320px;
                        width: 520px;
                    }

                    .hero-wrapper .right-pane .react-player__preview {
                        border-radius: 4px 4px 0 0;
                    }

                    .hero-wrapper .right-pane .time-wrapper {
                        max-width: 520px;
                        padding: var(--peaky-pad-16);
                        background-color: var(--primary-bg);
                        border-radius: 0 0 4px 4px;
                    }

                    .hero-wrapper .right-pane .calendar-icon {
                        margin-right: var(--peaky-gap-8);
                    }

                    .hero-wrapper .caret-down {
                        margin-left: var(--peaky-gap-8);
                    }
                    
                    .hero-wrapper .btn-wrapper {
                        margin-top: var(--peaky-gap-64);
                        margin-bottom: var(--peaky-gap-16);
                    }

                    .hero-wrapper .btn-wrapper .default-blue-btn {
                        width: 600px;
                    }


                    .ant-popover-arrow {
                        display: none;
                    }
                    .ant-popover-inner {
                        border-radius: 0;
                    }
                    .ant-popover-inner-content {
                        background-color: var(--spider);
                        color: var(--dove);
                    }
                    .ant-popover-inner-content > div:not(:last-child) {
                        margin-bottom: var(--peaky-gap-8);
                    }

                    .hero-wrapper .right-pane .replay-wrapper {
                        border-radius: var(--peaky-br-4);
                    }

                    .hero-wrapper .right-pane .replay-wrapper .replay-thumbnail {
                        height: 300px;
                        width: 520px;
                    }

                    .hero-wrapper .right-pane .replay-wrapper .play-icon {
                        width: 48px;
                        height: 48px;
                        margin-bottom: var(--peaky-gap-8);
                    }

                    @media only screen and (max-device-width: 760px) {
                        .hero-wrapper {
                            padding: 0;
                        }

                        .hero-wrapper .left-pane .title {
                            line-height: 3.14rem;
                        }

                        .hero-wrapper .left-pane .subtitle {
                            font-size: 21px;
                        }

                        .hero-wrapper .right-pane .video-thumb {
                            display:inline-block;
                            background: -moz-linear-gradient(to bottom, rgba(0, 0, 0, 0), #121212); /* FF3.6+ */
                            background: -webkit-gradient(linear, left bottom, right bottom, color-stop(0%, rgba(0, 0, 0)), color-stop(100%, #121212)); /* Chrome,Safari4+ */
                            background: -webkit-linear-gradient(top, rgba(0,0,0,0) 0%, #121212 100%); /* Chrome10+,Safari5.1+ */
                            background: -o-linear-gradient(top, rgba(0, 0, 0, 0) 0%, #121212 100%); /* Opera 11.10+ */
                            background: -ms-linear-gradient(top, rgba(0, 0, 0, 0) 0%, #121212 100%); /* IE10+ */
                            background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, #121212 100%); /* W3C */
                            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#a6000000', endColorstr='#00000000',GradientType=0 ); /* IE6-9 */
                        }

                        .hero-wrapper .right-pane .video-thumbnail {
                            position: relative;
                            width: 100%;
                            height: auto;
                            z-index:-1;
                            display:block;
                        }

                        .hero-wrapper .right-pane .video-thumb .play-icon {
                            position: absolute;
                            top: calc(50vw - 34px);
                            left: calc(50vw - 34px);
                        }

                        .hero-wrapper .replay-text{
                            position: absolute;
                            top: calc(50vw + 38px);
                        }

                        .hero-wrapper .left-pane {
                            order: 1;
                        }
                    
                        .hero-wrapper .left-pane .time-wrapper,
                        .hero-wrapper .btn-wrapper {
                            margin-top: var(--peaky-gap-32);
                        }
                        
                        .hero-wrapper .btn-wrapper {
                            margin-bottom: var(--peaky-gap-64);
                        }

                        .hero-wrapper .left-pane .calendar-icon {
                            margin-right: var(--peaky-gap-8);
                        }
                        
                        .hero-wrapper .btn-wrapper .default-blue-btn {
                            width: 100%;
                        }
                    }
            `}
            </style>
        </>
    )
}

export default Hero;