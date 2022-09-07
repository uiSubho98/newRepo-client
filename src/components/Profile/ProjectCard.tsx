import React from "react";
import moment from "moment";

const ProjectCard = (props: any) => {
    const { 
        id, 
        isEditable, 
        projectName, 
        description, 
        projectField, 
        currentProject, 
        startDate, 
        endDate, 
        setActiveProjectId
    } = props;
    
    return (
        <div className={`${isEditable ? "c-pointer" : "" } project-card text-small`}
        onClick={() => isEditable && setActiveProjectId(id)}>
            <h3 className="strong-text name">
                { projectName }
            </h3>
            <h4 className="text-small field">
                { 
                    projectField + (" ( " + moment(startDate * 1000).format("MMM YYYY") + " - " + 
                    (currentProject ? "Present" : moment(endDate * 1000).format("MMM YYYY")) + " )")
                }
            </h4>
            <p className="description">{ description }</p>
        </div>
    )
}

export default ProjectCard;