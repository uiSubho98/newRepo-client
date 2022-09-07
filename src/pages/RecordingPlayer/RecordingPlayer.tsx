import React, { useState } from "react";
import Layout from "../../components/Layout";
import Presentation from "../../components/RecordingPlayer/Presentation";
import Webcam from "../../components/RecordingPlayer/Webcam";

const RecordingPlayer = (props: any) => {

    const [isPlaying, setPlaying] = useState<boolean>(false);

    const onPlayOrPause = (event: number) => {
        setPlaying(event === 1 ? true : false);
    }

    const {slug} = props.match.params;
    return (
        <>
            <Layout>
                <div className="recording-player-wrapper g-d g-col-b-s">
                    <Presentation 
                        record_id = {slug} 
                        onPlayOrPause={onPlayOrPause} 
                        isPlaying={isPlaying}
                    />
                    <Webcam 
                        record_id = {slug} 
                        onPlayOrPause={onPlayOrPause} 
                        isPlaying={isPlaying}
                    />
                </div>
            </Layout>
            <style>{`
                .recording-player-wrapper {
                    background-color: var(--smoke);
                }
            `}</style>
        </>
    )
}

export default RecordingPlayer;