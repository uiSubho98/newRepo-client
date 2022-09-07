import React from "react";
import { IProblem } from "../../interfaces/talent-solutions";

interface IProps {
    data: IProblem;
}

const Problem = (props: IProps) => {

    const { statement, gist, logo } = props.data;

    return (
        <div className="problem">
            <h3 className="statement">{ statement }</h3>
            <p className="text-big gist">{ gist }</p>
            <button className="f-d f-v-c f-ht text-regular strong-text
            cap-letter c-pointer learn-more-btn">
                Learn More <i className="icon icon-chevron-right"></i>
            </button>
            <div className="company-logo-wrapper">
                <div className="bg-image-full company-logo" 
                style={{ backgroundImage: "url(" + logo + ")" }} />
            </div>
        </div>
    )
}

export default Problem;