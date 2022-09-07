import React from "react";
import ReactPlayer from "react-player";
import { G_S3_URL } from "../../constants/constants";

interface IProps {
    record_id: string;
    onPlayOrPause: Function;
    isPlaying: boolean;
}

const Webcam = (props: IProps) => {
    const { record_id, onPlayOrPause, isPlaying } = props;
    return (
        <>
            <div className="webcam-wrapper">
                <ReactPlayer 
                    url={G_S3_URL + "recordings/" + record_id + "/video/webcams.webm"} 
                    playing = {isPlaying}
                    controls
                    volume={0.2}
                    height={"50%"}
                    width={"100%"}
                    onPlay={() => onPlayOrPause(1)}
                    onPause={() => onPlayOrPause(2)}
                />
            </div>
            <style jsx>{`
                .webcam-wrapper {
                    margin: var(--peaky-gap-64) 0;
                }
            `}</style>
        </>
    )
}

export default Webcam;