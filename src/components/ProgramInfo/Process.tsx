import React from "react";
import { Steps, Icon } from "antd";
import { IProcess } from "../../interfaces/program-info";

interface IProps {
    list: Array<IProcess>;
}

const { Step } = Steps;

const Process = (props: IProps) => {
    const { list } = props;

    const renderSteps = () => {
        return list.map((listItem, idx) => 
            <Step
                title={listItem.name}
                description={listItem.desc}
                key={idx}
                icon={<Icon type="caret-right" style={{ color: "var(--primary)" }} />}
            />
        )
    }

    return (
        <>
            <div className="process">
                <Steps current={-1}>
                    { renderSteps() }
                </Steps>
            </div>
        </>
    )
}

export default Process;