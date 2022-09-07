import React, { useState } from "react";
import { IPlan, ISprint } from "../../interfaces/bootcamp";

interface IProps {
    data: ISprint;
    program: string;
}

const ModuleCard = (props: IProps) => {
    const { data, program } = props;

    const [ isActive, setActive ] = useState<boolean>(false);

    const renderMicrodegreePlan = (plan: Array<IPlan> = []) => {
        return plan.map((plan, key) => 
            <div key={key} className="plan term-info w-70">
                <h5 className="font-heading text-medium
                duration">
                    { plan.title }
                </h5>

                <span className="topic">
                    { plan.topic }
                </span>
            </div>
        )
    }

    const renderBootcampPlan = (plan: Array<IPlan> = []) => {

        const renderTopics = (topics: Array<string>) => {
            return topics.map((topic: string) =>
                <span className="topic">
                    { "- " + topic }
                </span>
            )
        }

        return plan.map((data) => 
            <div className="plan w-70">
                <h5 className="font-heading text-medium
                duration">
                    { data.duration }
                </h5>
                <span className="strong-text text-regular
                title">
                    { data.title }
                </span>
                <div className="f-d f-vt topics">
                    { renderTopics(data.topics) }
                </div>
            </div>
        );
    }
    
    return (
        <div className="module-card-wrapper">
            <div className="f-d f-v-c f-h-sb module-card-header"
            onClick={() => setActive(!isActive)}>
                <span className="font-heading text-big">
                    { data.title }
                </span>
                <i className={`icon icon-chevron-${isActive ? "up" : "down"}`}></i>
            </div>
            {
                isActive &&
                <div className="module-card-body">
                    <span className="font-heading text-large topic">
                        { data.topic }
                    </span>
                    {
                        data?.title.toLowerCase() !== "graduation" && 
                        data?.title.toLowerCase() !== "certification" ?
                        <>
                            <span className="f-d text-medium info">
                                {
                                    program === "microdegree" ?
                                    (
                                        data?.duration + "+ Learning Hrs | " +
                                        data?.projects + "+ Projects"
                                    ) : 
                                    (
                                        data?.duration + " Weeks | " + 
                                        data?.projects + " Projects" + 
                                        ((data?.labs) ? " | " + data?.labs + "+ Labs" : "")
                                    )
                                }
                            </span>
                            <div className="g-d g-gap-32 plan-wrapper">
                            { 
                                program === "microdegree" ? 
                                renderMicrodegreePlan(data?.plan) : 
                                renderBootcampPlan(data?.plan) 
                            }
                            </div>
                        </> :
                        <div className="bg-image-full certificate" style={{
                            backgroundImage: "url(" + data?.certificate + ")"
                        }}>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default ModuleCard;