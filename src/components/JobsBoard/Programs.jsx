import React from "react";
import ProgramCard from "../../components/JobsBoard/ProgramCard";

const Programs = (props) => {
    const { programs, redirectToTest } = props;

    const renderPrograms = () => {
        return programs.map(program => 
            <ProgramCard { ...program } redirectToTest={redirectToTest} />
        );
    }

    return (
        <div className="g-d g-col-1 g-gap-32 program-cards-wrapper">
            { renderPrograms() }
        </div>
    )
}

export default Programs;