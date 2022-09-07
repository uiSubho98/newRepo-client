import React, { useState } from "react";
import { Timeline } from "antd";
import ShowMoreIcon from "./ShowMoreIcon";
import MainContent from "./MainContent";
import DetailsContent from "./DetailsContent";
import CompletionCheckIcon from "./CompletionCheckIcon";

interface IModule {
    id?: number;
    moduleId?: string;
    mainTopic?: string;
    subTopics?: Array<string>;
}

interface ITopic {
    title: string;
    topic: string;
    constraint?: string;
    description: string;
    duration: string;
    moduleId: string;
    content: Array<IModule>;
}

interface ISprint {
    sprintName: string;
    moduleId: string;
}

interface ICertificate {
    sprintName: string;
    moduleId: string;
    slug: string;
    downloadStatus: number;
}

interface IProgress {
    ongoing?: ISprint;
    modulesCompleted?: Array<string>;
    sprintsCompleted?: Array<ISprint>;
    certificates?: Array<ICertificate>;
}

interface IProps {
    data?: ITopic;
    progress?: IProgress;
    onboardStatus?: boolean;
    hasPurchased?: boolean;
}

const ContentBlock = (props:IProps) => {
    const { data, progress, hasPurchased } = props;

    const [ isExpanded, setExpansionState ] = useState<boolean>(false);

    const renderDetails = (content: Array<IModule>) => {
        return progress && content &&
        content.map( data => 
            <DetailsContent 
                id = { data.id}
                moduleId = { data.moduleId }
                mainTopic = {data.mainTopic}
                subTopics = {data.subTopics}
                progress = {progress.modulesCompleted}
            />
        )
    }

    let isPrework = false;
    let preworkClass = "";
    let isPaymentActionActive = false;
    let ongoingSprintClass = "";
    let completionStatus = "incomplete";
    let isPreworkCompleted = true;
    let title = data ? data.title.toLowerCase() : "";
    let slug = "";
    if( title === "sprint 0" ) {
        isPrework = true;
        preworkClass = "prework-wrapper";
    } else if( title === "sprint 1" && 
   !hasPurchased) {
        isPaymentActionActive = true;
    }


    if(progress && progress.sprintsCompleted) {
        progress.sprintsCompleted.forEach(sprint => {
            if(sprint.sprintName.toLowerCase() === title) {
                completionStatus = "complete";
            }
        })
    }

    if(progress && progress.ongoing ) {
        if(progress.ongoing.sprintName.toLowerCase() === "sprint 0" ) {
            isPreworkCompleted = false;
        } else if( hasPurchased && 
            progress.ongoing.sprintName.toLowerCase() === title) {
            ongoingSprintClass = "ongoing";
        } 
    }

    if(isPreworkCompleted) {
        if(progress?.certificates) {
            progress.certificates.filter(certificate => {
                if(certificate.sprintName.toLowerCase() === "sprint 0") {
                    slug = certificate.slug;
                }
                return certificate;
            })
        }
    }

    return (
        <>
            {
                data &&
                <div className={`content-block ${preworkClass} ${completionStatus} ${ 
                    isExpanded ? "active" : "" } lr-pad-d lr-pad-m`} >
                    <Timeline.Item className={`content-dot-circle 
                    ${ongoingSprintClass}`} dot= { isPrework ? 
                    <CompletionCheckIcon status = { completionStatus } />  : 
                    <ShowMoreIcon/>} >
                        <MainContent 
                            title = { data.title }
                            topic = { data.topic }
                            duration = { data.duration }
                            constraint = { data.constraint }
                            description = { data.description }
                            isExpanded = { isExpanded }
                            isPaymentActionActive={ isPaymentActionActive }
                            isPreworkCompleted = { isPreworkCompleted }
                            setExpansionState= { setExpansionState }
                            isPrework = { isPrework }
                            slug = { slug }
                        />
                    </Timeline.Item>

                    { !isPrework && renderDetails( data.content ) }
                </div>
            }
        </>
    )
}

export default ContentBlock;