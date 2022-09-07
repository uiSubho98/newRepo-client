import React from "react";
import { Timeline } from "antd";
import NumberListIcon from "./NumberListIcon";

interface IModule {
    id?: number;
    moduleId?: string;
    mainTopic?: string;
    subTopics?: Array<string>;
    progress?: Array<string>;
}

const DetailsContent = (props: IModule) => {
    const { id, moduleId, mainTopic, subTopics, progress } = props;
    let isModuleCompleted = false;

    if(progress && moduleId &&
        progress.includes(moduleId) ) {
        isModuleCompleted = true;
    }

    const renderSubTopics = ( subTopics?: Array<string>) => {
        return subTopics && 
        subTopics.map(topic => 
        <span className="f-d body-small">
            { "> "+topic }
        </span>)
    }  
    
    return (
        <Timeline.Item
        className={`completion-check ${isModuleCompleted ? 'complete' : 'incomplete'}`}
        dot={
            <NumberListIcon id={id} status={isModuleCompleted ? 'complete' : 'incomplete'}/>
        }
        > 
            <div className="details-content">
                <h3 className="h3-heading">
                    { mainTopic }
                </h3>
                <div className="list w-50">
                    { renderSubTopics( subTopics ) }
                </div>
            </div>
        </Timeline.Item>
    )
}

export default DetailsContent