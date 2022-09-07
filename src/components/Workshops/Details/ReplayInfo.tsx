import React from "react";

interface IReplayInfoBlock {
    registrationsClosed?: boolean;
}

const ReplayInfoBlock = (props: IReplayInfoBlock) => {
    return (
        <>
            <div className="tb-pad-d tb-pad-m lr-pad-d 
            lr-pad-m replay-info-block w-100">
                <h1 className="font-heading text-large text-c-d">
                    {
                        props.registrationsClosed ?
                        'Sorry! This workshop is full.'
                        :
                        'Replay coming soon....'
                    }
                </h1>
            </div>
            <style jsx>{`
                .replay-info-block {
                    background-color: var(--primary-bg);
                }
            `}</style>
        </>
    )
}

export default ReplayInfoBlock;