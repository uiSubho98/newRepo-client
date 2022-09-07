import React from "react";
import { isMobile } from "react-device-detect";
import ReactPlayer from "react-player";
import PlayButton from "../../../assets/imgs/home/play-button-v2.svg";
interface ITeaserProps {
    data: {
        url: string;
        thumb: string;
    }
}
const Teaser = (props: ITeaserProps) => {
    const videoUrl = props.data.url;
    const videoThumb = props.data.thumb;
    
    const renderPlayButton = () => {
        return (
            <div className="f-d f-vt f-v-c">
                <div className="play-icon" style={{ backgroundImage: `url(${PlayButton})` }}>
                </div>
                <div className="font-heading text-xl">Watch Teaser</div>
            </div>
        )
    }
    return (
        <>
            <div className="teaser-wrapper lr-pad-d lr-pad-m tb-pad-d tb-pad-m f-d f-h-c">
                <ReactPlayer
                    url={videoUrl}
                    playing
                    controls
                    volume={0.2}
                    muted
                    width={isMobile ? "90vw" : "960px"}
                    height={isMobile ? "214px" : "540px"}
                    className="video"
                    light={videoThumb}
                    playIcon={renderPlayButton()}
                />
            </div>
            <style jsx>
                {`
                    .teaser-wrapper {
                        width: 100%;
                        background-color: var(--primary-bg);
                    }
                    .teaser-wrapper .play-icon {
                        width: 68px;
                        height: 68px;
                        margin-bottom: var(--peaky-gap-16);
                    }
                    @media only screen and (max-device-width: 760px) {
                    }
            `}
            </style>
        </>
    )
}
export default Teaser;