import React from "react";
import { Progress } from "antd";
import { ICurriculumBlock, IOngoing } from "../../interfaces/dashboard";

interface IProps {
    curriculum?: ICurriculumBlock;
    ongoing?: IOngoing;
    redirect: Function;
}

const Curriculum = (props: IProps) => {

    const { curriculum, ongoing, redirect } = props;

    const renderTerms = () => {
        return curriculum?.terms.map((term, key) => {
            let isTermCompleted = false;
            let isTermOngoing = false;

            if(term.id === ongoing?.id) {
                isTermOngoing = true;
            } else if(ongoing?.id && term.id < ongoing?.id) {
                isTermCompleted = true;
            }

            return (
                <div key={key}>
                    <div className="f-d f-h-sb f-v-c term">
                        <div className="f-d f-vt info">
                            <span className="strong-text text-medium name">
                                { term.name }
                            </span>
                            <span className="text-regular topic">
                                { term.topic }
                            </span>
                            {
                                (isTermOngoing || isTermCompleted) ?
                                <Progress 
                                    className="progress-bar"
                                    percent={ isTermOngoing ? ongoing?.completion : 100 } 
                                    size="small" 
                                    status="active" 
                                    strokeColor="var(--pekachu)" 
                                /> :
                                <span className="f-d text-small description">
                                    Will be available after completing Term {term?.id - 1}.
                                </span>
                            }
                        </div>
                        {
                            (isTermOngoing || isTermCompleted) ?
                            <div className="f-d f-v-c text-regular strong-text 
                            cap-letter c-pointer view-lessons-btn"
                            onClick={() => redirect("dashboard/?p=" + term?.program)}>
                                View Lessons
                                <i className="icon icon-chevron-right 
                                strong-text"></i>
                            </div> :
                            <div className="f-d f-v-c text-regular status">
                                <i className="icon icon-lock"></i>&nbsp;
                                Locked
                            </div>
                        }
                    </div>
                    <div className="divider"></div>
                </div>
            )
        })
    }

    return (
        <>
            <div className="g-d curriculum-content-wrapper">
                {/* <div></div> */}
                <div className="curriculum-block">
                    <span className="text-big strong-text heading">
                        All self-paced lessons in the Microdegree
                    </span>
                    <div className="terms w-70">
                        { renderTerms() }
                    </div>
                </div>
            </div>
            <style jsx>{`
                .curriculum-content-wrapper {
                    width: 85%;
                    margin: 0 0 64px;
                }

                .curriculum-content-wrapper .curriculum-block {
                    // width: 85%;
                }

                .curriculum-content-wrapper .curriculum-block
                .heading {
                    font-family: Inconsolata;
                }

                .curriculum-content-wrapper .curriculum-block
                .terms {
                    margin: var(--peaky-gap-32) 0;
                }

                .curriculum-content-wrapper .curriculum-block
                .terms .term .info .name {
                    font-family: Inconsolata;
                }

                .curriculum-content-wrapper .curriculum-block
                .terms .term .info .topic,
                .curriculum-content-wrapper .curriculum-block
                .terms .term .info .description,
                .curriculum-content-wrapper .curriculum-block
                .terms .term .status {
                    opacity: 0.54;
                }

                .divider {
                    background-color: rgba(255, 255, 255, 0.1);
                    height: 1px;
                    margin: var(--peaky-gap-32) 0;
                    width: 100%;
                }

                .view-lessons-btn .icon {
                    color: var(--primary);
                    font-size: 21px;
                }

                .curriculum-content-wrapper .curriculum-block
                .terms .term .progress-bar {
                    margin: 4px 0 0;
                }

                .curriculum-content-wrapper .curriculum-block
                .terms .term .info .description {
                    font-style: italic;
                    margin: 4px 0 0;
                }

                @media only screen and (max-device-width: 760px) {
                    .curriculum-content-wrapper {
                        grid-template-columns: 1fr;
                        width: 100%;
                    }

                    .curriculum-content-wrapper .curriculum-block,
                    .curriculum-content-wrapper .curriculum-block .terms {
                        width: 100%;
                    }

                    .curriculum-content-wrapper .curriculum-block 
                    .terms .term .status {
                        width: 30%;
                    }
                }
            `}</style>
        </>
    )
}

export default Curriculum;