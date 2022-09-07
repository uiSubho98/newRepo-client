import React, {useState} from 'react';
import {Timeline} from 'antd';
import CourseDetails from './CourseDetails';
import CourseTerms from './CourseTerms';
import CourseMoreIcon from './CourseMoreIcon';
import { ICountryData, IUserProgress } from './microdegreeDashboard';

interface IProps {
    courseContent?: any
    userProgress: IUserProgress
    activeCourse?: any
    is_logged_in: boolean
    learningContent?: any
    userGroup?: Array<number>
    countryData?: ICountryData
    timeZones?: object
    onetimePrice?: object
}

const CourseBlock = (props: IProps) => {
    const { courseContent, userProgress, is_logged_in, userGroup, countryData, timeZones, onetimePrice, learningContent} = props;
    const [courseExpand, setCourseExpand] = useState(false);

    const {progress} = userProgress;

    if (progress !== undefined) {
        // let {coursesCompleted} = progress;
        // var isCourseCompleted = coursesCompleted !== undefined ? coursesCompleted.find(cid => cid === courseContent.courseId) : undefined;
        let {termsCompleted} = progress;
        let queryId = `T${courseContent.courseId + 1}`;
        var isTermCompleted = termsCompleted !== undefined ? termsCompleted.find((t: string) => t === queryId) : undefined;
    }

    // Select time slots
    // var { slots } = Object.entries(courseContent.termsContent).filter((key, index) => index === 0)[0][1];

    return (
        <>
            <div className={`course-container ${courseExpand ? 'active' : ''} lr-pad-d lr-pad-m`}>
                <Timeline.Item 
                    className={`course-dot-circle ${isTermCompleted !== undefined ? 'complete' : 'incomplete'}`}
                    dot={<CourseMoreIcon/>}
                >
                    <CourseDetails
                        courseName={courseContent.name}
                        courseContent={courseContent}
                        courseExpanded={courseExpand}
                        setCourseExpand={() => setCourseExpand(!courseExpand)}
                        userProgress={userProgress}
                        learningPath={learningContent.learningPath.slice(1)}
                        countryData={countryData}
                        onetimePrice={onetimePrice}
                        timeZones={timeZones}
                    />
                </Timeline.Item>
                <CourseTerms 
                    termsContent={courseContent.termsContent}
                    courseId={courseContent.courseId}
                    is_logged_in={is_logged_in}
                    userGroup={userGroup}
                    userProgress={userProgress}
                    courseContent={courseContent}
                    countryData={countryData}
                    timeZones={timeZones}
                    onetimePrice={onetimePrice}
                    learningPath={learningContent.learningPath.slice(1)}
                />
            </div>
        </>
    );
}

export default CourseBlock;
