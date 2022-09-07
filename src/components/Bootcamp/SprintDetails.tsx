import React from "react";
import { IPlan, ISprint } from "../../interfaces/bootcamp";


interface IProps {
    data?: ISprint;
    program: string;
}

const SprintDetails = (props:IProps) => {
    const { data, program } = props;


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
        <div className="g-d g-h-c w-100 sprint-content-wrapper">
            <h1 className="font-heading text-large title">
                { data?.topic }
            </h1>
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
                    <div className="g-d g-col-2 g-h-c g-gap-64 w-100 
                    plan-wrapper">
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
    )
}

export default SprintDetails;