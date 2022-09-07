import React from "react";
import { Timeline } from "antd";
import CourseBlock from "./CourseBlock";
import GraduationFlag from '../BootcampDashboard/GraduationFlag';
import Reward from "../FreeBootcamp/Reward";
import {check_login} from "../../utils/login.util";
import CourseTerms from "./CourseTerms";
import { ICountryData } from "./microdegreeDashboard.d";

interface IModule {
    mainTopic?: string;
    subTopics?: Array<string>;
}

interface ITopic {
    title: string;
    topic: string;
    description: string;
    content: Array<IModule>;
    termsContent: Object
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

interface IProps {
    data?: IContent;
    reward?: IReward;
    userGroup?: Array<number>
    userProgress?: any
    timeZones?: object
    countryData?: ICountryData
    onetimePrice?: object
}

const LearningPath = (props:IProps) => {

    const { data, reward, userProgress } = props;
    const renderCourses = (courses?:Array<ITopic>) => {
        return courses &&
        courses.map((course:any,index:number) => 
            <CourseBlock 
                key={index} 
                courseContent={course}
                userProgress={userProgress} 
                // activeCourse={activeCourse}
                is_logged_in={check_login()}
                learningContent={data}
                userGroup={props.userGroup}
                timeZones={props.timeZones}
                countryData={props.countryData}
                onetimePrice={props.onetimePrice}
            />
        )
    }
    
    return (
        <>
            <div className="learning-path-wrapper tb-pad-d tb-pad-m" id="learning-path">
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
                <div className="learning-path learning-courses-container">
                    <Timeline>
                        <div className="course-start lr-pad-d lr-pad-m">
                            <Timeline.Item/>
                        </div>
                        <div className="lr-pad-d lr-pad-m course-prework">
                            {/* Display term 0 */}
                            <CourseTerms 
                                is_logged_in={check_login()} 
                                userProgress={userProgress} 
                                termsContent={data && data.learningPath ? data.learningPath[0].termsContent : {}} 
                                courseId="1000"
                                countryData={props.countryData}
                                timeZones={props.timeZones}
                                />
                        </div>
                        { data && renderCourses(data.learningPath?.slice(1)) }
                        <div className="graduation-block lr-pad-d lr-pad-m">
                            <Timeline.Item
                                dot={<GraduationFlag status="active" />}
                            >
                                <div className="body-small">GRADUATION</div>
                                <h2 className="h2-heading">Microdegree in Coding</h2>
                            </Timeline.Item>
                        </div>
                    </Timeline>
                    <div className="certificate-block">
                        <Reward data={reward}/>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .learning-path-wrapper .header .info > 
                span:nth-of-type(2) {
                    margin:0 0 0 var(--peaky-gap-16);
                }

                .learning-path-wrapper .header .description {
                    margin: var(--peaky-gap-24) 0 0;
                    white-space: pre-wrap;
                }

                .learning-courses-container {
                    margin-top: 4rem;
                }

                .learning-courses-container > h2 {
                    margin-bottom: 2rem;
                }

                .course-container .course-details {
                    margin-bottom: 2rem;
                    padding-top: 4rem;
                }

                .course-container .course-details.with-pymt-btn {
                    padding-top: 2rem;
                }

                .course-details .course-action-btn {
                    margin-top: 1.4rem;
                }

                .learning-courses-container .course-start .ant-timeline-item {
                    padding-bottom: 4rem;
                }
                
                .term0-block .course-more-icon {
                    margin-left: 8px;
                }

                .course-container > .ant-timeline-item {
                    padding: 0 0 32px;
                }

                .course-details .course-tag {
                    margin-bottom: 8px;
                    text-transform: uppercase;
                }

                .course-details .go-to-details-btn {
                    margin-top: 1rem;
                    transition: all 0.01s;
                }

                .course-details .go-to-details-btn.not-visible {
                    opacity: 0;
                }

                .course-details .go-to-details-btn.visible {
                    opacity: 1;
                }

                .learning-courses-container .course-container {
                    height: 190px;
                    overflow: hidden;
                    border-top: var(--peaky-border);
                    transition: all 0.4s;
                }

                .learning-courses-container > .ant-timeline > div:nth-last-child(2) {
                    border-bottom: var(--peaky-border);
                }

                .learning-courses-container .course-container.active {
                    height: unset;
                    background: var(--smoke);
                }

                .learning-courses-container .course-container:hover {
                    background: var(--smoke);
                }

                .graduation-block .ant-timeline-item {
                    padding-top: 4rem;
                }

                .graduation-block .ant-timeline-item-tail {
                    top: 0;
                    height: calc(100% - 80px);
                }

                .term-block .term-tag {
                    text-transform: uppercase;
                    width: max-content;
                    margin-bottom: 10px;
                }

                .course-container .course-details .details-expand-btn {
                    margin-bottom: 1rem;
                    border: var(--peaky-border);
                    background: var(--dove);
                }

                .course-details .details-expand-btn .icon {
                    margin-right: 8px;
                    transition: all 0.2s;
                }

                .course-container.active .details-expand-btn .icon {
                    transform: rotate(180deg);
                }

                .course-container .course-details .details-expand-btn > p {
                    margin: 0;
                }

                .term-block {
                    margin-bottom: 4rem;
                }

                .term-block .term-desc {
                    font-size: 18px;
                    font-family: 'Open Sans', sans-serif;
                    font-weight: normal;
                    color: var(--carbon);
                }

                .term-block .unlock-message,
                .course-details .unlock-message {
                    margin-top: 8px;
                }

                .term-block .unlock-message,
                .course-details .unlock-message,
                .course-details .details {
                    color: var(--carbon);
                    font-size: 16px;
                    font-family: 'Open Sans', sans-serif;
                }

                .term-block .term-details-container {
                    margin: 8px 0 1.4rem 0;
                }

                .term-details-container .term-detail-block {
                    margin-right: 1rem;
                }

                .term-details-container .detail-icon {
                    width: 12px;
                    height: 12px;
                    margin-right: 8px;
                }

                .certificate-btn .lock-icon,
                .course-action-btn .lock-icon {
                    padding: 0 3rem;
                }

                .term-action-container .lock-icon,
                .certificate-btn .lock-icon,
                .course-action-btn .lock-icon,
                .graduation-action-btn .lock-icon,
                .milestone-action-btn .lock-icon {
                    width: 16px;
                    height: 16px;
                }

                .term-action-container .term-action-btn,
                .graduation-block .graduation-action-btn {
                    padding: 0 2rem;
                }

                .course-certificate .tags-container {
                    margin-top: 1rem;
                }

                .course-completion-star {
                    margin-bottom: 3rem;
                }

                .course-completion-star-icon,
                .graduation-flag-icon {
                    width: 46px;
                    height: 46px;
                }

                .course-completion-star .milestone-action-btn {
                    margin:1rem 0 0;
                    padding:0 2rem;
                }

                .course-start .ant-timeline-item-head {
                    left: -7px !important;
                    background: var(--greenapple);
                }

                .course-start .ant-timeline-item-tail {
                    border-left: 2px solid var(--greenapple) !important;
                }

                .course-dot-circle .ant-timeline-item-head {
                    left: -4px !important;
                }

                .course-dot-circle .ant-timeline-item-tail {
                    top: 0;
                }

                .completion-check .ant-timeline-item-head {
                    left: 2px;
                    top: -2px;
                }

                .course-completion-check-icon,
                .course-more-icon {
                    width: 28px;
                    height: 28px;
                }

                .course-more-icon .icon {
                    color: var(--granite);
                }

                .course-completion-star-icon,
                .course-completion-check-icon,
                .course-more-icon,
                .graduation-flag-icon {
                    border-radius: var(--peaky-br-full);
                    border: 1px solid var(--snowfall);
                    background: var(--dove);
                    box-shadow: var(--peaky-shadow-high);
                }

                .course-completion-star-icon.complete,
                .course-completion-check-icon.complete {
                    border: 2px solid var(--greenapple);
                }

                .completion-check.complete .ant-timeline-item-tail,
                .course-dot-circle.complete .ant-timeline-item-tail,
                .earn-a-star.complete .ant-timeline-item-tail,
                .learning-courses-container > .ant-timeline > div:nth-child(2) > li:first-child .ant-timeline-item-tail {
                    border-left: 2px solid var(--greenapple);
                }

                .course-completion-check-icon.complete {
                    background: var(--greenapple);
                }

                .course-completion-star-icon .star-icon {
                    width: 24px;
                    height: 24px;
                    opacity: 50%;
                }

                .graduation-flag-icon .icon {
                    width: 24px;
                    height: 24px;
                }

                .course-completion-check-icon .icon {
                    color: var(--snowfall);
                }

                .course-completion-star-icon.complete .star-icon {
                    opacity: 100%;
                }

                .course-completion-check-icon.complete .icon {
                    color: var(--dove);
                }

                .course-dot-circle .ant-timeline-item-head,
                .certificate-dot-circle .ant-timeline-item-head {
                    width: 12px;
                    height: 12px;
                    left: -1px;
                    border-color: var(--snowfall);
                }

                .course-dot-circle .ant-timeline-item-head,
                .graduation-block .ant-timeline-item-head {
                    margin-top: 5rem;
                }

                .course-certificate {
                    padding: 1rem;
                    margin-bottom: 4rem;
                    width: 60%;
                    border-radius: var(--peaky-br-4);
                    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.08);
                    background: var(--dove);
                }

                .course-certificate .tags-container .tag-block {
                    color: var(--carbon);
                    text-transform: uppercase;
                    margin-right: 1rem;
                }

                .course-certificate .tags-container .tag-block .achievement-badge {
                    width: 24px;
                    height: 24px;
                    margin-right: 6px;
                }

                .ant-timeline-item-head-blue {
                    border-color: var(--greenapple);
                }

                .ant-timeline-item-head {
                    width: 24px;
                    height: 24px;
                    left: -6px;
                    background: unset;
                }

                ul.ant-timeline .course-container:first-child .ant-timeline-item:first-child .ant-timeline-item-head-blue {
                    background-color: var(--greenapple);
                }

                ul.ant-timeline .course-container:first-child .ant-timeline-item:first-child .ant-timeline-item-tail {
                    border-left: 2px solid var(--greenapple);
                }

                ul.ant-timeline .course-container:first-child .ant-timeline-item:first-child {
                    padding-bottom: 5rem;
                }

                .course-container.bg-grey .course-certificate {
                    background: var(--dove);
                }

                .course-certificate .certificate-left .desc {
                    color: var(--carbon);
                    font-size: 16px;
                    font-family: 'Open Sans', sans-serif;
                }

                .ant-timeline-item-content {
                    padding-left: 2rem;
                }

                @media only screen and (max-device-width: 760px) {
                    .course-container,
                    .course-start,
                    .course-prework,
                    .graduation-block {
                        padding-left: 2rem;
                    }

                    .ant-timeline-item-content {
                        padding-left: 1.4rem;
                    }

                    .course-details .go-to-details-btn {
                        margin-bottom: 2rem;
                    }

                    .course-certificate,
                    .active-term-container .active-term-block {
                        width: unset;
                    }

                    .certificate-right .certificate-btn {
                        margin-top: 1rem;
                    }

                    .graduation-block .ant-timeline-item-tail {
                        height: calc(100px);
                    }

                    .term-block .term-details-container {
                        align-items: baseline;
                    }

                    .term-details-container .term-detail-block {
                        margin-top: 1rem;
                    }

                    .course-container .course-details .details-left {
                        width: calc(100% - 32px);
                    }

                    .course-container .course-details {
                        flex-direction: row;
                    }

                    .course-container .course-details .details-expand-btn {
                        padding: 0;
                        width: 32px;
                        height: 32px !important;
                        // margin-bottom: 7rem;
                        border-radius: var(--peaky-br-full);
                    }

                    .course-details .details-expand-btn .icon {
                        margin-right: 0;
                    }
                }
                
            `}</style>
        </>
    )
}

export default LearningPath; 