import React from 'react';
import {Timeline} from 'antd';
import clock_icon from '../../assets/icons/svg_icons/clock.svg';
import projects_icon from '../../assets/icons/svg_icons/projects.svg';
import labs_icon from '../../assets/icons/svg_icons/labs.svg';
import lock_icon from '../../assets/icons/svg_icons/lock.svg';
import CompletionCheckIcon from '../BootcampDashboard/CompletionCheckIcon';
import {G_URL, LEARN_PLAT_URL} from '../../constants/constants';
import { __getCookie } from '../../utils/cookie.util';
import keys from '../../config/keys';
import CourseStar from './CourseStar';
import CompletionStarIcon from '../BootcampDashboard/CompletionStarIcon';
// @ts-ignore
// import { useDispatch } from 'react-redux';
// import { updatePlan } from '../../actions';
import { ICountryData } from './microdegreeDashboard';

interface IProps {
    termsContent?: any
    courseId?: string
    userProgress?: any
    userGroup?: Array<number>
    is_logged_in: boolean
    courseContent?: any
    countryData?: ICountryData
    timeZones?: object
    onetimePrice?: any
    learningPath?: Array<any>
}

const CourseTerms = (props: IProps) => {
    const { termsContent, courseId, userProgress, userGroup, is_logged_in } = props;

    const {progress, purchase} = userProgress;
    const userToken = __getCookie(keys.cookiePrefix + "ut").cookieValue;

    let redirectToLearningPlatform = (r_path: string) => {
        // Update the value of r_path
        (document.getElementById('r_path') as HTMLInputElement).value = r_path.substr(1);
        (document.getElementById('learning_redirect') as HTMLFormElement).submit();
    }

    let redirectToLogin = () => {
        window.location.href = G_URL + 'login';
    }

    const selectLink = (arr: Array<number>, obj: any) => arr.reduce((r, e: number) => Object.assign(r, obj[e] ? {[e]: obj[e]} : null), {});

    // const dispatch = useDispatch();

    // const handlePayment = (type: string, symbol?: string, international_status?: boolean, country?: string, countryCode?: string, timeZones?: object, paymentOptions?: object, slots?: object) => {
    //     // Update Store
    //     dispatch(updatePlan({
    //         type,
    //         symbol,
    //         international_status,
    //         country,
    //         countryCode,
    //         timeZones,
    //         paymentOptions,
    //         slots
    //     }));

    //     // Redirect to Payment Page
    //     setTimeout(() => {
    //         window.location.href = `/payment/microdegree`;
    //     }, 300)
    // }

    let renderTermActionBtn = (termData: any, isTermCompleted: boolean) => {
        let {termId, link} = termData;

        // check User Cohorts ID
        let groupIds = userGroup !== undefined ? userGroup : [0];
        let selectedLink = selectLink(groupIds, link);
        let userLink = Object.values(selectedLink)[0];
        link = userLink !== undefined ? userLink : link['0'];

        if (purchase !== undefined && courseId !== undefined) {
            // var isTermsPurchased = purchase !== undefined ? purchase.find(cid => cid === courseContent.courseId) : undefined;
            let purchasedTerms = purchase[courseId] !== undefined ? purchase[courseId].terms : '';
            var isTermPurchased = purchasedTerms.includes(termId) ? purchasedTerms.includes(termId) : undefined;
        }

        let actionBtn = [];
        let defaultBtn = (
            <>
                <div className="term-action-btn default-inactive-btn fill-inactive f-d f-v-c">
                    <div className="lock-icon bg-image-full" style={{backgroundImage: 'url(' + lock_icon + ')'}}></div>
                </div>
                <div className="unlock-message">
                    {
                    isTermPurchased !== undefined  ?
                    'Will be unlocked upon completion of previous terms.'
                    :
                    'Will be unlocked upon paying the term fee. Subject to completion of previous terms.'
                    }
                </div>
            </>
        )
        // if (progress !== null && progress !== undefined && progress['ongoing'].term === termId) {
        if (progress !== null && progress !== undefined) {
            if (isTermPurchased !== undefined && isTermCompleted !== undefined) {
                actionBtn.push(
                    <div className="course-action-container" key={termId}>
                        <div onClick={() => {is_logged_in ? redirectToLearningPlatform(`/${link}`) : redirectToLogin()}}
                            className="term-action-btn default-pink-btn filled-pink f-d f-v-c">
                            {progress['ongoing'].term === termId ? 'Continue' : 'View'}
                        </div>
                    </div>
                );
            } else if (isTermPurchased !== undefined && progress['ongoing'].term === termId && isTermCompleted === undefined) {
                actionBtn.push(
                    <div className="course-action-container" key={termId}>
                        <div onClick={() => {is_logged_in ? redirectToLearningPlatform(`/${link}`) : redirectToLogin()}}
                            className="term-action-btn default-pink-btn filled-pink f-d f-v-c">
                            Start
                        </div>
                    </div>
                );
            } else if (progress['ongoing'].term === termId) {
                actionBtn.push(
                    <div className="course-action-container" key={termId}>
                        <div onClick={() => {is_logged_in ? redirectToLearningPlatform(`/${link}`) : redirectToLogin()}}
                            className="term-action-btn default-pink-btn filled-pink f-d f-v-c">
                            Start
                        </div>
                    </div>
                );
            } else if (termId === 'T1001') {
                actionBtn.push(
                    <div className="course-action-container" key={termId}>
                        <div onClick={() => {is_logged_in ? redirectToLearningPlatform(`/${link}`) : redirectToLogin()}}
                            className="term-action-btn default-pink-btn filled-pink f-d f-v-c">
                            View
                        </div>
                    </div>
                );
            }
        }
        return actionBtn.length > 0 ? actionBtn : defaultBtn;
    }

    let renderCourseTerms = () => {
        let termsHolder = [];
        Object.keys(termsContent).forEach((term, index) => {
            let {duration, labs, projects} = termsContent[term].details;
            let {completionStar} = termsContent[term];
            if (progress !== undefined) {
                let {termsCompleted} = progress;
                var isTermCompleted = termsCompleted !== undefined ? termsCompleted.find((t: string) => t === termsContent[term].termId) : undefined;
            }
            if (termsContent[term] !== undefined) {
                termsHolder.push(
                    <div key={index}>
                    <Timeline.Item
                        className={`completion-check ${isTermCompleted !== undefined ? 'complete' : 'incomplete'}`}
                        key={index}
                        dot={
                            <CompletionCheckIcon status={isTermCompleted !== undefined ? 'complete' : 'incomplete'}/>
                        }
                    >
                        <div className="term-block">
                            <div className="term-tag">{term}</div>
                            <h2 className="term-name h2-heading">{termsContent[term].name}</h2>
                            <div className="term-desc">{termsContent[term].desc}</div>
                            <div className="term-details-container f-d f-vt-m f-v-c">
                                {duration ? <div className="term-detail-block f-d f-v-c">
                                    <div className="detail-icon bg-image-full"
                                         style={{backgroundImage: 'url(' + clock_icon + ')'}}></div>
                                    <div className="detail-value body-regular">{duration}</div>
                                </div> : ''}
                                {labs ? <div className="term-detail-block f-d f-v-c">
                                    <div className="detail-icon bg-image-full"
                                         style={{backgroundImage: 'url(' + labs_icon + ')'}}></div>
                                    <div className="detail-value body-regular">{labs}</div>
                                </div> : ''}
                                {projects ? <div className="term-detail-block f-d f-v-c">
                                    <div className="detail-icon bg-image-full"
                                         style={{backgroundImage: 'url(' + projects_icon + ')'}}></div>
                                    <div className="detail-value body-regular">{projects}</div>
                                </div> : ''}
                            </div>
                            <div className="term-action-container">
                                {
                                    // <div
                                    //     onClick={() => {is_logged_in ? redirectToLearningPlatform(`/dashboard?p=introduction-to-coding#curriculum`) : redirectToLogin()}}
                                    //     className="term-action-btn default-pink-btn filled-pink btn-small f-d f-v-c"
                                    // >
                                    //     {isTermCompleted !== undefined ? 'View' : 'Start'}
                                    // </div>
                                    <>
                                        {renderTermActionBtn(termsContent[term], isTermCompleted)}
                                    </>
                                }
                            </div>
                        </div>
                    </Timeline.Item>
                    <Timeline.Item
                        className={`earn-a-star ${isTermCompleted !== undefined ? 'complete' : 'incomplete'}`}
                        dot={<CompletionStarIcon status={isTermCompleted !== undefined ? 'complete' : 'incomplete'}/>}>
                        <CourseStar courseStar={completionStar} status={isTermCompleted} userProgress={userProgress} 
                        termName = {termsContent[term].name} term={term}/>
                    </Timeline.Item>
                    </div>
                )
            }
        });
        let redirectForm = (
            <form
                key={'redirect'}
                method="POST"
                action={LEARN_PLAT_URL+'auth/'}
                name="learning_redirect"
                id="learning_redirect"
            >
                <input
                    className="hidden"
                    type="hidden"
                    name="t"
                    placeholder="entity"
                    value="set_token"
                />
                <input
                    className="hidden"
                    type="hidden"
                    name="token"
                    placeholder="token"
                    value={userToken}
                />
                <input
                    className="hidden"
                    type="hidden"
                    name="r_path"
                    placeholder="r_path"
                    value=""
                    id="r_path"
                />
            </form>
        );
        termsHolder.push(redirectForm);

        return termsHolder;
    }

    return (
        <>
            {renderCourseTerms()}
        </>
    );
}

export default CourseTerms;
