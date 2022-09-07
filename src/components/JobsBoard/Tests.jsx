import React from "react";
import { Divider } from "antd";
import TestCard from "./TestCard";

const Tests = (props) => {
    const { title, tests, divider, type, redirectToTest } = props;
    const renderTestCards = () => {
        return tests.map(test => <TestCard {...test} type={type} redirectToTest={redirectToTest} />)
    }
    return (
        <>
            <h2 className="text-big strong-text">
                { title }
            </h2>
            <div className="g-d g-col-2 g-col-1-m g-gap-48 test-cards-wrapper">
                { renderTestCards() }
            </div>
            { divider && <Divider /> }
        </>
    )
}

export default Tests;