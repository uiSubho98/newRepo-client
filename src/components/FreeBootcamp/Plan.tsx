import React,{ useState } from "react";
import DropdownIcon from "../../assets/icons/svg_icons/dropdown-icon.svg";

interface ISchedule {
    dayCount?: number;
    topic?: string;
}

interface ICurriculum {
    title?: string;
    duration?: string;
    noOfProjects?: string;
    schedule?: Array<ISchedule>;
}

interface IPlan {
    title?: string;
    description?: string;
    curriculum?: ICurriculum;
}

interface IProps {
    data?: IPlan;
}

const Plan = (props: IProps) => {

    const {data} = props;
    const [isExpanded,setExpansionState] = useState<boolean>(false);

    const renderSyllabus = (curriculum?: ICurriculum) => {

        const classActive = isExpanded?"active":"";

        const renderSchedule = (schedule?: Array<ISchedule>) => {
            return schedule && 
            schedule.map(data => 
                <div className="f-d f-vt schedule-item">
                    <span className="body-regular strong-text">
                        { "Day " + data.dayCount }
                    </span>
                    <span className="body-small">
                        { data.topic }
                    </span>
                </div>
            )
        }

        return (
            <div className="curriculum w-70">
                <div className="header g-d c-pointer"
                onClick={() => setExpansionState(!isExpanded)}>
                    <div>
                        <span className="f-d body-regular strong-text">
                            { curriculum && curriculum.title }
                        </span>
                        <span className="f-d info">
                            <span className="f-d f-v-c body-small about">
                                <i className="icon icon-clock"></i>&nbsp;
                                { curriculum && curriculum.duration }
                            </span>
                            <span className="f-d f-v-c body-small about">
                                <i className="icon icon-monitor"></i>&nbsp;
                                { curriculum && 
                                curriculum.noOfProjects+" Projects"}
                            </span>
                        </span>
                    </div>
                    <div className="g-d g-h-e g-v-c">
                        <span className={`f-d bg-image-full 
                        dropdown-icon ${classActive}`}
                        style={{ backgroundImage: "url(" +DropdownIcon+ ")"
                        }}>
                        </span>
                    </div>
                </div>
                {
                    isExpanded &&
                    <div className="schedule">
                        { curriculum && renderSchedule(curriculum.schedule) }
                    </div>
                }
            </div>
        )
    }
    
    return (
        <>
            <div className="plan-wrapper lr-pad-d lr-pad-m
            tb-pad-d tb-pad-m">
                <h2 className="h2-heading">
                    { data && data.title }
                </h2>
                <span className="f-d body-regular description">
                    { data && data.description }
                </span>
                { data && renderSyllabus(data.curriculum) }
            </div>
            <style jsx>{`

                .plan-wrapper .description {
                    margin: var(--peaky-gap-32) 0 var(--peaky-gap-48);
                }

                .plan-wrapper .curriculum .header {
                    grid-template-columns: 8fr 1fr;
                    background-color:var(--smoke);
                    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
                    padding: var(--peaky-pad-16) var(--peaky-pad-32);
                }

                .plan-wrapper .curriculum .schedule {
                    background-color:var(--smoke);
                    padding: var(--peaky-pad-16) var(--peaky-pad-32);
                }

                .plan-wrapper .curriculum .schedule 
                .schedule-item {
                    margin: 0 0 var(--peaky-gap-24);
                }

                .plan-wrapper .curriculum .header 
                .about {
                    margin: var(--peaky-gap-8) 0 0;
                }

                .plan-wrapper .curriculum .header 
                .about:nth-of-type(2) {
                    margin-left: var(--peaky-gap-16);
                }

                .plan-wrapper .curriculum .header 
                .dropdown-icon {
                    height: 16px;
                    width: 16px;
                    transition: all 0.4s;
                }

                .plan-wrapper .curriculum .header
                .dropdown-icon.active {
                    transform: rotate(180deg);
                }

                @media only screen and (max-device-width: 760px) {
                    .plan-wrapper .curriculum {
                        width: 100%;
                    }

                    .plan-wrapper .curriculum .info {
                        // flex-direction: column;
                    }

                    .plan-wrapper .curriculum .header,
                    .plan-wrapper .curriculum .schedule {
                        padding-left: var(--peaky-pad-16);
                        padding-right: var(--peaky-pad-16);
                    }

                    .plan-wrapper .curriculum .header 
                    .about:nth-of-type(2) {
                        // margin-left: 0;
                    }
                }

                @media screen and (min-width: 768px) and (max-width: 1023px) 
                and (orientation: portrait) {
                    .plan-wrapper .curriculum {
                        width: 90%;
                    }
                }

            `}</style>
        </>
    )
}

export default Plan;