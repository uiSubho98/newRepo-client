import React from "react";
import DropdownIcon from "../../assets/icons/svg_icons/dropdown-icon.svg";

interface IStep {
    title?: string;
    description?: string;
}

interface IJoiningProcess {
    title?: string;
    description?: string;
    steps?: Array<IStep>;
}

interface IProps {
    data?: IJoiningProcess;
}

const JoiningProcess = (props: IProps) => {
    const { data } = props;

    const renderSteps = (steps?: Array<IStep>) => {
        return steps &&
        steps.map(step => 
            <div className="step" key={step.title}>
                <span className="f-d f-v-c body-large 
                strong-text cap-letter title">
                    { step.title }&nbsp;&nbsp;
                    <span className="f-d bg-image-full 
                    dropdown-icon" style={{ backgroundImage:
                    "url(" +DropdownIcon+ ")"}}>
                    </span>
                </span>
                <span className="body-regular description">
                    { step.description }
                </span>
            </div>
        )
    }

    return (
        <>
            <div className="joining-process-wrapper lr-pad-d lr-pad-m
            tb-pad-d tb-pad-m">
                <h2 className="h2-heading">
                    { data && data.title }
                </h2>
                <span className="body-regular">
                    { data && data.description }
                </span>

                <div className="g-d g-col-3 g-col-1-m steps">
                    { data && renderSteps(data.steps) }
                </div>
            </div>
            <style jsx>{`

                .joining-process-wrapper {
                    background-color: var(--smoke);
                }

                .joining-process-wrapper .steps {
                    margin: var(--peaky-gap-32) 0 0;
                    grid-gap: 0 var(--peaky-gap-128);
                }

                .joining-process-wrapper .steps
                .step .title {
                    color: var(--purple);
                    margin: 0 0 var(--peaky-gap-16);
                }

                .joining-process-wrapper .steps
                .step .dropdown-icon {
                    height: 30px;
                    width: 30px;
                    transform: rotate(270deg);

                }

                @media only screen and (max-device-width: 760px) {

                    .joining-process-wrapper .steps {
                        grid-gap: var(--peaky-gap-32);
                    }

                }

                @media screen and (min-width: 768px) and (max-width: 1023px) 
                and (orientation: portrait) {
                    .joining-process-wrapper .steps {
                        grid-template-columns: 1fr;
                        grid-gap: var(--peaky-gap-32);
                    }
                }

            `}</style>
        </>
    )
}

export default JoiningProcess;