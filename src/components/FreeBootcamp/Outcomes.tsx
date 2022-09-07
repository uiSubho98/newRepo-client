import React from "react";

interface IOutcomes {
    title?: string;
    outcomes?: Array<string>;
}

interface IProps {
    data?: IOutcomes;
}

const Outcomes = (props: IProps) => {

    const { data } = props;

    const renderOutcomes = (outcomes?: Array<string>) => {
        return outcomes &&
        outcomes.map(outcome => 
            <div className="w-70 outcome">
                <span className="body-regular">
                    {outcome}
                </span>
            </div>
        )
    }

    return (
        <>
            <div className="program-outcomes-wrapper lr-pad-d lr-pad-m
            tb-pad-d tb-pad-m">
                <h2 className="h2-heading">
                    { data && data.title }
                </h2>
                <div className="outcomes-list">
                    { data && renderOutcomes(data.outcomes) }
                </div>
            </div>
            <style jsx>{`

                .program-outcomes-wrapper .outcomes-list {
                    margin: var(--peaky-gap-32) 0 0;
                }

                .program-outcomes-wrapper .outcomes-list 
                .outcome {
                    background-color: var(--smoke);
                    border-radius: var(--peaky-br-4);
                    padding: var(--peaky-pad-24);
                    margin: var(--peaky-gap-24) 0 0;
                }

                @media only screen and (max-device-width: 760px) {

                    .program-outcomes-wrapper .outcomes-list 
                    .outcome {
                        width:100%;
                    }
                    
                }

                @media screen and (min-width: 768px) and (max-width: 1023px) 
                and (orientation: portrait) {
                    .program-outcomes-wrapper .outcomes-list .outcome {
                        width: 90%;
                    }
                }

            `}</style>
        </>
    )
}

export default Outcomes;