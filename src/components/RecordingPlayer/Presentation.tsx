import React from "react";
import ReactPlayer from "react-player";
import { G_S3_URL } from "../../constants/constants";

interface IProps {
    record_id: string;
    onPlayOrPause: Function;
    isPlaying: boolean;
}

const Presentation = (props: IProps) => {
    const { record_id, onPlayOrPause, isPlaying } = props;
    const onDuration = () => {

    }
    return (
        <>
            <div className="presentation-wrapper">
                <ReactPlayer 
                    url={G_S3_URL + "recordings/" + record_id + "/deskshare/deskshare.webm"} 
                    playing = {isPlaying}
                    controls
                    muted
                    height={540}
                    width={"100%"}
                    onPlay={() => onPlayOrPause(1)}
                    onPause={() => onPlayOrPause(2)}
                    onDuration={() => onDuration()}
                />
            </div>
            <style jsx>{`
                .presentation-wrapper {
                    margin: var(--peaky-gap-64) 0;
                }
            `}</style>
        </>
    )
}

export default Presentation;