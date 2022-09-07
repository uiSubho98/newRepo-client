import React from "react";
import { Timeline } from "antd";
import ContentBlock from "./ContentBlock";
import GraduationFlag from './GraduationFlag';
import Reward from "../FreeBootcamp/Reward";

interface IModule {
    mainTopic?: string;
    subTopics?: Array<string>;
}

interface ITopic {
    title: string;
    topic: string;
    duration: string;
    description: string;
    moduleId: string;
    content: Array<IModule>;
}

interface IContent {
    title?: string;
    duration?: string;
    totalProjects?: string;
    description?: string;
    alternateDescription?: string;
    learningPath?: Array<ITopic>;
}

interface IReward {
    title?: string;
    description?: string;
    imageSrc?: string;
}

interface IProgress {
    completionStatus?: number;
    modulesCompleted?: Array<string>;
}

interface IOnboardStatus {
    slotsSelected?: boolean;
    discordInviteUsed?: boolean;
    projectsCompleted?: boolean;
}

interface IProps {
    data?: IContent;
    progress?: IProgress;
    onboardStatus?: IOnboardStatus;
    hasPurchased?: boolean;
    reward?: IReward;
}

const LearningPath = (props:IProps) => {

    const { data,reward,progress, onboardStatus, hasPurchased } = props;

    let status = onboardStatus && onboardStatus.slotsSelected && 
    onboardStatus.discordInviteUsed;

    const renderContent = (path?:Array<ITopic>) => {
        return path &&
        path.map((content,key) => 
            <ContentBlock
                key = { key }
                data = {content}
                onboardStatus={status}
                hasPurchased={hasPurchased}
                progress = {progress}
            />
        )
    }

    let completionClass = "incomplete";
    if(progress && progress.completionStatus) {
        completionClass = "complete";
    }

    return (
        <>
            <div className="learning-path-wrapper tb-pad-d tb-pad-m">
                <div className="header lr-pad-d lr-pad-m"> 
                    <h2 className="h2-heading title">
                        { data && data.title }
                    </h2>
                    <span className="f-d body-small info">
                        <span className="f-d f-v-c">
                            <i className="icon icon-clock"></i>&nbsp;
                            { data && data.duration }
                        </span>
                        <span className="f-d f-v-c">
                            <i className="icon icon-monitor"></i>&nbsp;
                            { data && data.totalProjects }
                        </span>
                    </span>

                    <span className="f-d body-small description">
                        { data && data.description }
                    </span>
                </div>
                <div className="learning-path">
                    <Timeline>
                        <div className="course-start lr-pad-d lr-pad-m">
                            <Timeline.Item/>
                        </div>
                        { data && renderContent(data.learningPath) }
                        <div className={`graduation-block ${completionClass}
                        lr-pad-d lr-pad-m`}>
                            <Timeline.Item
                                dot={<GraduationFlag status="active" />}
                            >
                            </Timeline.Item>
                        </div>
                        <div className={`certificate-block ${completionClass}`}>
                            <Reward data={reward}/>
                        </div>
                    </Timeline>
                </div>
            </div>
            <style jsx>{`

                .learning-path-wrapper .header .title {
                    margin-bottom:0;
                }

                .learning-path-wrapper .header .info > 
                span:nth-of-type(2) {
                    margin:0 0 0 var(--peaky-gap-16);
                }

                .learning-path-wrapper .header .description {
                    margin: var(--peaky-gap-24) 0 0;
                    white-space: pre-wrap;
                }

                .learning-path-wrapper .learning-path {
                    margin:var(--peaky-gap-32) 0 0;
                }

                .learning-path-wrapper .learning-path
                .content-block.complete .ant-timeline-item-tail,
                .learning-path-wrapper .learning-path
                .content-dot-circle.ongoing .ant-timeline-item-tail, 
                .completion-check.complete .ant-timeline-item-tail,
                .learning-path-wrapper .learning-path 
                .graduation-block.complete .ant-timeline-item-tail,
                .learning-path-wrapper .learning-path 
                .certification-block.complete .ant-timeline-item-tail {
                    border-left: 2px solid var(--greenapple);
                }

                .learning-path-wrapper .ant-timeline-item-head {
                    width: 24px;
                    height: 24px;
                }

                .learning-path-wrapper .learning-path
                .content-block .details-content
                .list > span {
                    margin: var(--peaky-gap-16) 0 0;
                }

                .learning-path-wrapper .learning-path
                .content-block, .learning-path-wrapper 
                .learning-path .graduation-block {
                    height: 175px;
                    overflow: hidden;
                    border-top: var(--peaky-border);
                    transition: all 0.4s;
                }

                .learning-path-wrapper 
                .learning-path .graduation-block {
                    height: 250px;
                }

                .learning-path-wrapper .learning-path
                .content-block:hover {
                    background: var(--smoke);
                }

                .learning-path-wrapper .learning-path
                .content-block.active {
                    height: unset;
                    background: var(--smoke);
                }

                .learning-path-wrapper .learning-path
                .prework-wrapper {
                    border-top: unset;
                    background-color: var(--dove);
                }

                .learning-path-wrapper .learning-path
                .prework-wrapper:hover {
                    background-color: unset;
                }

                .learning-path-wrapper .learning-path
                .prework-wrapper .content-dot-circle 
                .ant-timeline-item-head {
                    margin-top: 0;
                }

                .learning-path-wrapper .learning-path 
                .prework-wrapper .content-wrapper {
                    padding-top: 0.8rem !important;
                }

                .learning-path-wrapper .learning-path
                .content-block .content-wrapper {
                    margin-bottom: 2rem;
                    padding-top: 4rem;
                }

                .learning-path-wrapper .learning-path
                .content-block .content-wrapper.with-payment-btn {
                    padding-top: 2rem;
                }

                .learning-path-wrapper .learning-path
                .content-block .content-wrapper.add-on-tag {
                    padding-top: 3rem;
                }

                .learning-path-wrapper .learning-path
                .content-block .content-wrapper.with-payment-btn .topic {
                    margin-bottom: 0;
                }

                .learning-path-wrapper .learning-path
                .content-block .content-wrapper.with-payment-btn 
                .payment-btn {
                    margin: var(--peaky-gap-8) 0 0;
                }

                .learning-path-wrapper .learning-path
                .content-block .left-pane .get-certificate-btn {
                    color: var(--pink);
                    margin: var(--peaky-gap-16) 0 0;
                }

                .learning-path-wrapper .learning-path
                .content-block .content-wrapper .sprint-tag {
                    text-transform: uppercase;
                    width: max-content;
                    margin-bottom: 10px;
                }

                .learning-path-wrapper .learning-path
                .content-block .content-wrapper .add-on-tag {
                    color: var(--pink);
                    font-size: 18px;
                    margin-bottom: 0;
                }

                .learning-path-wrapper .learning-path
                .content-block .content-wrapper .action-btn {
                    // margin: var(--peaky-gap-32) 0 0;
                }

                .learning-path-wrapper .learning-path
                .content-block .ant-timeline-item {
                    padding-bottom: 30px;
                }

                .course-start .ant-timeline-item-head {
                    left: -7px !important;
                    background: var(--greenapple);
                }

                .course-start .ant-timeline-item-tail {
                    border-left: 2px solid var(--greenapple) !important;
                }

                .course-start .ant-timeline-item-head-blue {
                    border-color: var(--greenapple);
                }

                .course-start .ant-timeline-item {
                    padding-bottom: 6rem;
                }

                .content-dot-circle .ant-timeline-item-head, 
                .graduation-block .ant-timeline-item-head {
                    margin-top: 3.5rem;
                }

                .content-dot-circle .ant-timeline-item-head, 
                .certificate-dot-circle .ant-timeline-item-head {
                    width: 12px;
                    height: 12px;
                    left: -1px;
                    border-color: var(--snowfall);
                }

                .content-dot-circle .ant-timeline-item-head {
                    left: -4px !important;
                }

                .content-dot-circle .ant-timeline-item-tail {
                    top: 0;
                    height: 100%;
                }

                .course-completion-star-icon, 
                .course-completion-check-icon,
                .number-list-check-icon, 
                .show-more-icon, 
                .graduation-flag-icon {
                    border-radius: var(--peaky-br-full);
                    border: 1px solid var(--snowfall);
                    background: var(--dove);
                    box-shadow: var(--peaky-shadow-high);
                }

                .course-completion-check-icon.complete {
                    background: var(--greenapple);
                }

                .graduation-flag-icon {
                    width: 46px;
                    height: 46px;
                }

                .graduation-flag-icon .icon {
                    width: 24px;
                    height: 24px;
                }

                .graduation-block .ant-timeline-item {
                    padding-top: 4rem;
                }

                .graduation-block .ant-timeline-item-tail {
                    top: 0;
                    height: 250px;
                }

                .course-completion-check-icon, .show-more-icon {
                    width: 28px;
                    height: 28px;
                }

                .number-list-check-icon {
                    height: 46px;
                    width: 46px;
                    color: var(--carbon);
                }

                .show-more-icon .icon {
                    color: var(--granite);
                }

                .content-block .content-wrapper .expand-btn {
                    border: var(--peaky-border);
                    background: var(--dove);
                    margin-bottom: 1rem;
                    padding:0;
                    width: 140px;
                }

                .content-block .content-wrapper .expand-btn > p {
                    margin: 0;
                }

                .content-block.active .expand-btn .icon {
                    transform: rotate(180deg);
                }

                .completion-check .ant-timeline-item-head {
                    top: -8px;
                }

                .course-completion-check-icon .icon {
                    color: var(--snowfall);
                }

                .learning-path-wrapper .learning-path 
                .content-block .details-content {
                    margin: 0 0 var(--peaky-gap-32);
                }

                .ant-timeline-item-content {
                    padding-left: 2rem;
                }

                .ant-timeline-item-head {
                    width: 24px;
                    height: 24px;
                    left: -6px;
                    background: unset;
                }

                @media only screen and (max-device-width: 760px) {
                    .learning-path-wrapper .header .description {
                        white-space: unset;
                    }
                    .learning-path-wrapper .learning-path .course-start,
                    .learning-path-wrapper .learning-path .content-block,
                    .learning-path-wrapper .learning-path .graduation-block {
                        padding-left: 2rem;
                    }

                    .content-block .content-wrapper .expand-btn {
                        padding: 0;
                        width: 32px;
                        height: 32px !important;
                        margin: 1rem 0;
                        border-radius: var(--peaky-br-full);
                    }

                    .learning-path-wrapper .learning-path 
                    .content-block .content-wrapper .left-pane {
                        width: 95%;
                    }

                    .learning-path-wrapper .learning-path 
                    .content-block .details-content .list {
                        width: 100%;
                    }

                    .learning-path-wrapper .learning-path .content-block 
                    .content-wrapper .description {
                        margin: 0 0 var(--peaky-gap-16);
                    }

                    .ant-timeline-item-content {
                        padding-left: 1rem;
                    }
                }

                @media only screen and (max-device-width: 360px) {
                    .learning-path-wrapper .learning-path 
                    .content-block: first-child {
                        background-color: yellow;
                    }
                }

                @media only screen and (max-device-width: 320px) {
                    .learning-path-wrapper .learning-path 
                    .content-block:nth-last-child(3) .content-wrapper {
                        padding-top: 2.5rem;
                    }

                    .learning-path-wrapper .learning-path 
                    .content-block:nth-last-child(3)
                    .content-wrapper .expand-btn {
                        margin-top: 2.5rem;
                    }
                }

                @media screen and (min-width: 768px) and (max-width: 1023px) 
                and (orientation: portrait) {
                    .learning-path-wrapper .learning-path
                    .content-block .left-pane .get-certificate-btn {
                        margin-top: var(--peaky-gap-8);
                    }
                }
                
            `}</style>
        </>
    )
}

export default LearningPath; 