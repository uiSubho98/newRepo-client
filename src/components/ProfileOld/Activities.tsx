import React, { useEffect, useState } from 'react';
import { Timeline } from 'antd';
import { IActivity } from './profile';
import Activity from './Activity';

interface IActivitiesProps {
    activities: Array<IActivity>
}

const Activities = (props: IActivitiesProps) => {
    const { activities } = props;
    const [activitiesRaw, updateActivitiesRaw] = useState<Array<IActivity>>(activities.slice(0, 6));
    const [showAll, toggleShowAll] = useState<Boolean>(false);
    
    useEffect(() => {
        if(!showAll) {
            updateActivitiesRaw(activities.slice(0, 2));
        } else {
            updateActivitiesRaw(activities);
        }
    }, [showAll, activities]);
    
    const renderActivities = () => {
        return activitiesRaw.map((activity: IActivity, index: number) => (
            <Timeline.Item key={index}><Activity data={activity} /></Timeline.Item>
        ))
    }
    return (
        <>
            <div className="activities-wrapper w-100">
                <div className="activities-header f-d f-h-sb">
                    <h2 className="h2-heading">Activities</h2>
                    {
                        showAll ? <span className="c-pointer" onClick={() => {toggleShowAll(false)}}>Show Less</span> : <span className="c-pointer" onClick={() => {toggleShowAll(true)}}>Show All</span>
                    }
                </div>
                <Timeline mode="left">
                    {renderActivities()}
                </Timeline>
            </div>
            <style>
            {`
                .activities-wrapper {
                    margin-top: var(--peaky-gap-64);
                }

                .activities-wrapper > .activities-header > .h2-heading {
                    margin-bottom: var(--peaky-gap-16);
                }
            `}
            </style>
        </>
    )
}

export default Activities;