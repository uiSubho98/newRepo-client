import moment from "moment-timezone";
import React from "react";

const CompanyCard = (props: any) => {
    const { 
        id,
        isEditable,
        company, 
        designation, 
        employmentType, 
        startDate, 
        endDate, 
        location, 
        currentCompany,
        setActiveCompanyId
    } = props;
    const endDateObj = currentCompany ? moment() : moment(endDate * 1000);
    let duration:any = endDateObj.diff(moment(startDate * 1000), "months", true);
    duration = Math.ceil(duration);
    duration = duration < 12 ? duration + " mos" : Math.floor(duration / 12) 
    + " yr " + (Math.floor(duration % 12) ? Math.floor(duration % 12) + " mos" : "");
    return (
        <div className={`company-card ${isEditable ? "c-pointer" : "" } text-small`}
        onClick={() => isEditable && setActiveCompanyId(id)}>
            <h3 className="designation">{ designation }</h3>
            <p className="company">
                <span>{ company }</span>&nbsp;&middot;&nbsp;
                <span>{ employmentType }</span>
            </p>
            <p>
                <span>
                    { 
                        moment(startDate * 1000).format("MMM YYYY") + " - " + 
                        (currentCompany ? "Present" : moment(endDate * 1000).format("MMM YYYY")) 
                    }
                </span>&nbsp;&middot;&nbsp;
                <span>{duration}</span>
            </p>
            <p className="location">{ location }</p>
        </div>
    )
}

export default CompanyCard;