import React from "react";

interface IStep {
    insight?: string;
    imageSrc?: string;
    imageSrc1?: string;
}

interface IProps {
    data?: Array<IStep>;
}

const Projects = (props:IProps) => {
    const {data} = props;

    const renderProjectSources = (data?: Array<IStep>) => {
        return data && data.map((project,key) => {
            return (
                <div className="step-wrapper w-90">
                    <div className="g-d info-block">
                        <div>
                            <span className="f-d f-h-c f-v-c step 
                            body-regular strong-text">
                                { key+1 }
                            </span>
                        </div>
                        <span className="f-d body-big">{project.insight}</span>
                    </div>
                    <div className="g-d g-h-c source-block">
                        <div className="f-d w-90 bg-image-full source" style={{
                            backgroundImage: "url(" + (project.imageSrc) + ")"
                        }}>
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (
        <>
            <div className="projects-wrapper lr-pad-d lr-pad-m
            tb-pad-d tb-pad-m">
                <h2 className="h2-heading">
                    Things you will do in Codealong
                </h2>
                <div className="g-d g-col-3 g-col-1-m project-build-cycle">
                    { data && renderProjectSources(data) }
                </div>
            </div>
            <style jsx>{`
                .projects-wrapper {
                    background-color: var(--smoke);
                }

                .projects-wrapper .project-build-cycle {
                    margin: var(--peaky-gap-64) 0;
                }

                .projects-wrapper .project-build-cycle .step-wrapper {
                    background-color: rgba(95, 39, 205,0.1);
                    border-radius: 10px;
                    padding: var(--peaky-pad-16);
                    height: 230px;
                }

                .projects-wrapper .project-build-cycle 
                .step-wrapper .info-block {
                    grid-template-columns: 1fr 5fr;
                    min-height:70px;
                }

                .projects-wrapper .project-build-cycle 
                .step-wrapper .info-block .step {
                    background-color: var(--dove);
                    height: 35px;
                    width: 35px;
                    border-radius: var(--peaky-br-full);
                }

                .projects-wrapper .project-build-cycle 
                .step-wrapper .source {
                    height:200px;
                    width:330px;
                }

                @media only screen and (max-device-width: 760px) {
                    .projects-wrapper .project-build-cycle {
                        margin-top: var(--peaky-gap-32);
                        margin-bottom: 0;
                    }

                    .projects-wrapper .project-build-cycle 
                    .step-wrapper {
                        width: 100%;
                        height: 200px;
                        margin-bottom: 76px;
                    }

                    .projects-wrapper .project-build-cycle 
                    .step-wrapper .source {
                        height: 170px;
                        width: 100%;
                    }
                }

                @media screen and (min-width: 768px) and 
                (max-width: 1023px) and (orientation: portrait) {
                    .projects-wrapper .project-build-cycle {
                        grid-template-columns: repeat(2, 1fr);
                    }

                    .projects-wrapper .project-build-cycle 
                    .step-wrapper:last-child {
                        margin-top: var(--peaky-gap-64);
                    }

                    .projects-wrapper .project-build-cycle 
                    .step-wrapper .source {
                        width: 280px;
                    }
                }
            `}</style>
        </>
    )
}

export default Projects;