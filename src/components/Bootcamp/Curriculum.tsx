import React, { useState } from "react";
import { Steps } from "antd";
import { ICurriculum, ISprint } from "../../interfaces/bootcamp";
import SprintDetails from "./SprintDetails";
import ModuleCard from "./ModuleCard";

interface IProps {
    data?: ICurriculum;
    program: string;
    handleRegister?: (mode?: number, type?:string) => void;
}

const Curriculum = (props: IProps) => {

    const { Step } = Steps;

    // const { data, program, handleRegister } = props;
    const { data, program } = props;

    const [ activeStep, setActiveStep ] = useState<number>(0);

    const customDot = () => (
        <div className="progress-dot c-pointer">
        </div>
    )

    const renderSteps = (sprints: Array<ISprint> = []) => {
        return sprints.map((sprint, key) => 
            <Step key={key} title={sprint.title}>
            </Step>
        );
    }

    const renderCurriculum = (sprints: Array<ISprint> = []) => {
        return sprints.map((sprint, key) =>
            <ModuleCard key={key} data={sprint} program={program}  />
        )
    }

    let customWidth = "";

    if(data?.sprints && data.sprints.length === 2) {
        customWidth = "w-50";
    }

    return (
        <>
            <div className="g-d g-h-c curriculum-content-wrapper
            tb-pad-d tb-pad-m lr-pad-d lr-pad-m" id="curriculum">
                <h1 className="font-heading text-xl text-c-d">
                    { data?.title }
                </h1>
                {
                    /** 
                    * * Desktop View 
                    */
                    <div className="g-d g-h-c w-70 curriculum-block">
                        <Steps progressDot={customDot} current={activeStep} 
                        className={`sprint-steps ${customWidth}`} size="default"
                        onChange={(id) => setActiveStep(id)}>
                            { renderSteps(data?.sprints) }
                        </Steps>

                        <SprintDetails data={data?.sprints[activeStep]} program={program} />
                        {/* {
                            (data?.brochureLink && program === "bootcamp") &&
                            <div className="brochure-btn-wrapper f-d f-h-c">
                                <button className="default-blue-btn" onClick={() => { handleRegister && handleRegister( undefined, "Syllabus")}}>
                                    Download Syllabus
                                </button>
                            </div>
                        } */}
                    </div>
                }

                {
                    /**
                     * * Mobile View
                     */

                    <div className="g-d g-gap-16 w-100 curriculum-block-alt">
                        { renderCurriculum(data?.sprints) }
                        {/* {
                             (data?.brochureLink && program === "bootcamp") &&
                            <div className="brochure-btn-wrapper f-d f-h-c">
                                <button className="default-blue-btn" onClick={() => { handleRegister && handleRegister()}}>
                                    Download Syllabus
                                </button>
                            </div>
                        } */}
                    </div>
                }
            </div>
            <style jsx>{`

                .curriculum-content-wrapper .curriculum-block-alt {
                    display: none;
                }

                .curriculum-content-wrapper .curriculum-block
                .sprint-steps {
                    margin: 100px 75px 80px 0;
                }

                .curriculum-content-wrapper .curriculum-block
                .progress-dot {
                    width: 23px;
                    height: 23px;
                    border: 4px solid #2C2C2C;
                    border-radius: var(--peaky-br-full);
                }

                .curriculum-content-wrapper .curriculum-block
                .ant-steps-dot .ant-steps-item-tail {
                    top: 10px;
                    margin-left: 75px;
                }

                .curriculum-content-wrapper .curriculum-block
                .ant-steps-item-process > .ant-steps-item-container > 
                .ant-steps-item-tail::after,
                .curriculum-content-wrapper .curriculum-block
                .ant-steps-item-wait > .ant-steps-item-container > 
                .ant-steps-item-tail::after,
                .curriculum-content-wrapper .curriculum-block
                .ant-steps-item-finish > .ant-steps-item-container > 
                .ant-steps-item-tail::after {
                    background-color: #2C2C2C !important;
                }

                .curriculum-content-wrapper .curriculum-block
                .ant-steps-item-container > .ant-steps-item-content > 
                .ant-steps-item-title {
                    color: var(--dove);
                    font-family: Inconsolata;
                    font-size: 18px;
                    font-weight: 600;
                    opacity: 0.54;
                }

                .curriculum-content-wrapper .curriculum-block
                .ant-steps-item-process > .ant-steps-item-container > 
                .ant-steps-item-content > .ant-steps-item-title {
                    font-size: 21px;
                    opacity: unset;
                }

                .curriculum-content-wrapper .curriculum-block
                .ant-steps-label-vertical .ant-steps-item-content {
                    position: absolute;
                    bottom: 25px;
                }

                .curriculum-content-wrapper .curriculum-block
                .ant-steps-dot .ant-steps-item-content {
                    width: 160px;
                }

                .curriculum-content-wrapper .curriculum-block
                .ant-steps-item-process .progress-dot {
                    background: linear-gradient(180deg, #0E7DED 1.47%, #1739E6 101.42%);
                    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
                    height: 32px;
                    position: absolute;
                    top: -5px;
                    width: 32px;
                    border: none;
                }

                .curriculum-content-wrapper .curriculum-block
                .sprint-content-wrapper .info {
                    color: rgba(255, 255, 255, 0.87);
                    font-weight: 300;
                    margin: var(--peaky-gap-8) 0 0;
                }

                .curriculum-content-wrapper .curriculum-block
                .sprint-content-wrapper .plan-wrapper {
                    margin: var(--peaky-gap-64) 0 0;
                }

                .curriculum-content-wrapper .curriculum-block
                .sprint-content-wrapper .plan-wrapper
                .plan .duration {
                    margin: 0 0 var(--peaky-gap-16);
                }

                .curriculum-content-wrapper .curriculum-block
                .sprint-content-wrapper .plan-wrapper
                .plan .title,
                .curriculum-content-wrapper .curriculum-block
                .sprint-content-wrapper .plan-wrapper
                .plan .topics .topic {
                    opacity: 54%;
                }

                .curriculum-content-wrapper .curriculum-block
                .sprint-content-wrapper .plan-wrapper
                .plan .topics .topic {
                    font-weight: 300;
                }

                .curriculum-content-wrapper .curriculum-block
                .sprint-content-wrapper .plan-wrapper
                .term-info .topic {
                    opacity: 0.54;
                }

                .curriculum-content-wrapper .curriculum-block
                .sprint-content-wrapper .certificate {
                    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
                    border-radius: var(--peaky-br-4);
                    height: 346px;
                    margin: var(--peaky-gap-32) 0 0;
                    width: 624px;
                }

                .curriculum-content-wrapper .curriculum-block .brochure-btn-wrapper {
                    margin-top: var(--peaky-gap-64);
                }

                @media only screen and (max-device-width: 760px) {
                    .curriculum-content-wrapper .curriculum-block {
                        display: none;
                    }

                    .curriculum-content-wrapper .curriculum-block-alt {
                        display: grid;
                        margin: var(--peaky-gap-32) 0 0;
                    }

                    .curriculum-content-wrapper .curriculum-block-alt
                    .module-card-wrapper {
                        background-color: var(--primary-bg);
                        border-radius: var(--peaky-br-4);
                        padding: var(--peaky-pad-16);
                    }

                    .curriculum-content-wrapper .curriculum-block-alt
                    .module-card-wrapper .module-card-header .icon {
                        font-size: 24px;
                        opacity: 0.87;
                    }

                    .curriculum-content-wrapper .curriculum-block-alt
                    .module-card-wrapper .module-card-body {
                        margin: var(--peaky-gap-32) 0 0;
                    }

                    .curriculum-content-wrapper .curriculum-block-alt
                    .module-card-wrapper .module-card-body .info {
                        margin: var(--peaky-gap-8) 0 0;
                        font-weight: 300;
                        opacity: 0.87;
                    }

                    .curriculum-content-wrapper .curriculum-block-alt
                    .module-card-wrapper .module-card-body .plan-wrapper {
                        margin: var(--peaky-gap-32) 0 0;
                    }

                    .curriculum-content-wrapper .curriculum-block-alt
                    .module-card-wrapper .module-card-body .plan-wrapper
                    .plan .duration {
                        margin: 0 0 var(--peaky-gap-8);
                    }

                    .curriculum-content-wrapper .curriculum-block-alt
                    .module-card-wrapper .module-card-body .certificate {
                        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
                        border-radius: var(--peaky-br-4);
                        background-position: left;
                        height: 250px;
                        margin: var(--peaky-gap-8) 0 0;
                        width: 100%;
                    }

                    .curriculum-content-wrapper .curriculum-block-alt
                    .module-card-wrapper .module-card-body .plan-wrapper
                    .plan {
                        width: 100%;
                    }

                    .curriculum-content-wrapper .curriculum-block-alt
                    .module-card-wrapper .module-card-body .plan-wrapper
                    .plan .title,
                    .curriculum-content-wrapper .curriculum-block-alt
                    .module-card-wrapper .module-card-body .plan-wrapper
                    .plan .topics .topic,
                    .curriculum-content-wrapper .curriculum-block-alt
                    .module-card-wrapper .module-card-body .plan-wrapper
                    .term-info .topic {
                        opacity: 0.54;
                    }

                    .curriculum-content-wrapper .curriculum-block-alt .brochure-btn-wrapper {
                        margin-top: var(--peaky-gap-32);
                    }

                    .curriculum-content-wrapper .curriculum-block-alt .brochure-btn-wrapper .default-blue-btn {
                        width: 100%;
                    }
                }
            `}</style>
        </>
    )
}

export default Curriculum;