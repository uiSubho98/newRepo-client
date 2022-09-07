import { DoubleRightOutlined } from '@ant-design/icons';
import React from 'react';
import { IActivity } from './profile';

interface IActivityProps {
    data: IActivity
}

const Activity = (props: IActivityProps) => {
    const { data } = props;

    const renderActivityLogs = () => {
        return data.logs.map((log: string, index: number) => <div className="body-regular f-d f-v-c" key={index} ><DoubleRightOutlined /><span className="log">{log}</span></div>)
    }

    return (
        <>
            <div className="activity-wrapper">
                <h3 className="h3-heading">{data.date}</h3>
                {renderActivityLogs()}
            </div>
            <style jsx>
            {`
                .activity-wrapper .log {
                    margin-left: var(--peaky-gap-8);
                }
            `}
            </style>
        </>
    )
}

export default Activity;