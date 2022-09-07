import React, { useEffect, useState } from "react";
import { Steps } from "antd";
import Layout from "../../components/Layout";
import Schedule from "../../components/Onboard/Schedule";
import Community from "../../components/Onboard/Community";
import Lessons from "../../components/Onboard/Lessons";
import { G_API_URL, G_URL } from "../../constants/constants";
import axios, { AxiosRequestConfig } from "axios";
import { decodeToken, __getUserName } from "../../utils/user-details.util";
import { check_login } from "../../utils/login.util";
import { __getCookie } from "../../utils/cookie.util";
import keys from "../../config/keys";
import Spinner from "../../components/Spinner/spinner";
// @ts-ignore
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";

const { Step } = Steps;

interface IState {
    isLoading: boolean;
    activeStep : number;
    isWorkshopScheduled: boolean;
    isInviteUsed: number;
    hasStartedLearning: boolean;
}

const Walkthrough = () => {

    const defaultState = {
        isLoading: false,
        activeStep: 0,
        isWorkshopScheduled: false,
        isInviteUsed: 0,
        hasStartedLearning: false
    }

    const [state, setState] = useState<IState>(defaultState);
    const history = useHistory();

    const { isLoading, activeStep, isInviteUsed, hasStartedLearning, isWorkshopScheduled } = state;

    useEffect(() => {

        if (check_login()) {

            const token = decodeToken();

            if(token?.subscriptions?.microdegree) {
                const config: AxiosRequestConfig = {
                    params: {
                        programType: "microdegree"
                    }, 
                    headers: {
                        "Authorization": __getCookie(keys.cookiePrefix + "ut").cookieValue
                    }
                };
        
                let onboardStatusApi = axios.get(G_API_URL + "auth/onboard/status/", config);
        
                let visionDetailsApi = axios.get(G_API_URL + "vision/details", config);

                setState(prev => ({
                    ...prev,
                    isLoading: true
                }));
        
                Promise.all([
                    visionDetailsApi,
                    onboardStatusApi
                ]).then((response: any) => {
                    const visionResponse = response[0].data;
                    const onboardResponse = response[1].data;
                    let isOnboarded = true;
                    if(visionResponse.status === 1) {
                        if (visionResponse.data === 'redr' || visionResponse.data === 'resc') {
                            setState(prev => ({
                                ...prev,
                                isWorkshopScheduled: true
                            }));
                        } else {
                            isOnboarded = false;
                        }
                    }

                    if(onboardResponse.status === 1) {
                        setState(prev => ({
                            ...prev,
                            isInviteUsed: onboardResponse.data.isInviteUsed,
                            hasStartedLearning: onboardResponse.data.hasStartedLearning
                        }));

                        if(!onboardResponse.data.isInviteUsed ||
                            !onboardResponse.data.hasStartedLearning) {
                            isOnboarded = false;
                        }
                    }

                    if(!isOnboarded) {
                        setState(prev => ({
                            ...prev,
                            isLoading: false
                        }));
                    } else {
                        history.push({
                            pathname: "/learning-platform/"
                        })
                    }
                }).catch(err => {
                    console.log(err);
                })
            } else {
                history.push({
                    pathname: "/register"
                })
            }
        } else {
            // if not logged in redirect to login
            history.push({
                pathname: "/login?rurl=/onboard/"
            })
        }
    }, [history]);


    const updateStep = () => {
        if(activeStep < 2) {
            setState(prev => ({
                ...prev,
                activeStep: activeStep + 1
            }));
        } else {
            window.location.href = G_URL + "learning-dashboard/microdegree";
        }
    }

    const renderSteps = () => {
        return [
            "Schedule\nlive class", 
            "Join\ncommunity", 
            "Start\nlessons"
        ].map(step => <Step title={ step } />)
    }

    const getActionBlock = () => {
        switch(activeStep) {
            case 1:
                return <Community 
                            isInviteUsed= { isInviteUsed } 
                            updateStep={ updateStep } 
                        />;
            case 2:
                return <Lessons 
                            hasStartedLearning={ hasStartedLearning } 
                            updateStep={ updateStep } 
                        />;
            default:
                return <Schedule 
                            isWorkshopScheduled = { isWorkshopScheduled } 
                            updateStep={ updateStep } 
                        />;
        }
    }

    return (
        <>
        {   !isLoading ?
            <Layout redirectDisable={true}>
                <Helmet>
                    <title>ProGrad | Onboard</title>
                </Helmet>
                <div className="g-d g-h-c tb-pad-d tb-pad-m lr-pad-d lr-pad-m 
                walkthrough-page-container">
                    <h1 className="font-heading text-xxl text-c-d heading">
                        Welcome, { __getUserName() }!
                    </h1>
                    <span className="text-medium description text-c-d">
                        Let’s make the most of your free experience of the {" "}
                        <span className="strong-text">ProGrad microdegree</span>
                    </span>
                    <div className="steps-wrapper">
                        <Steps progressDot current={activeStep} size="default">
                            { renderSteps() }
                        </Steps>
                    </div>
                    <div className="g-d g-h-c action-block-wrapper">
                        { getActionBlock() }
                    </div>
                </div>
                <style jsx>{`
                    .walkthrough-page-container .description {
                        font-weight: 300;
                        opacity: 0.97;
                        margin: var(--peaky-gap-24) 0 0;
                    }

                    .walkthrough-page-container .steps-wrapper {
                        margin: var(--peaky-gap-32) 0 var(--peaky-gap-64);
                    }

                    .walkthrough-page-container .ant-steps {
                        width: 675px;
                    }

                    .walkthrough-page-container .ant-steps-dot 
                    .ant-steps-item-icon {
                        height: 25px;
                        width: 25px;
                        margin-left: 60px;
                        color: var(--primary-grad);
                    }

                    .walkthrough-page-container .ant-steps-dot 
                    .ant-steps-item-tail {
                        top: 10px;
                        margin: 0 0 0 60px;
                    }

                    .walkthrough-page-container .ant-steps-dot 
                    .ant-steps-item-tail::after {
                        width: 100%;
                    }

                    .walkthrough-page-container .ant-steps-item-finish 
                    .ant-steps-item-icon > .ant-steps-icon .ant-steps-icon-dot,
                    .walkthrough-page-container .ant-steps-item-finish > 
                    .ant-steps-item-container > .ant-steps-item-tail::after,
                    .walkthrough-page-container .ant-steps-item-process 
                    .ant-steps-item-icon > .ant-steps-icon .ant-steps-icon-dot {
                         background: #E6BE2E;
                        transition: background 0.5s ease;
                    }

                    .walkthrough-page-container .ant-steps-item-finish > 
                    .ant-steps-item-container > .ant-steps-item-content > 
                    .ant-steps-item-title, .walkthrough-page-container 
                    .ant-steps-item-process > .ant-steps-item-container > 
                    .ant-steps-item-content > .ant-steps-item-title,
                    .walkthrough-page-container .ant-steps-item-wait > 
                    .ant-steps-item-container > .ant-steps-item-content > 
                    .ant-steps-item-title {
                        color: var(--dove);
                        font-size: 14px;
                        font-weight: 600;
                        opacity: 0.57;
                    }

                    .walkthrough-page-container .ant-steps-item-active > 
                    .ant-steps-item-container > .ant-steps-item-content > 
                    .ant-steps-item-title {
                        opacity: unset;
                    }

                    .walkthrough-page-container .ant-steps-dot 
                    .ant-steps-item-content {
                        white-space: pre-wrap;
                    }

                    .walkthrough-page-container .ant-steps-item-process > 
                    .ant-steps-item-container > .ant-steps-item-tail::after,
                    .walkthrough-page-container .ant-steps-item-wait > 
                    .ant-steps-item-container > .ant-steps-item-tail::after,
                    .walkthrough-page-container .ant-steps-item-wait 
                    .ant-steps-item-icon > .ant-steps-icon .ant-steps-icon-dot{
                        background-color: var(--secondary-bg);
                        color : var(--primary-grad);
                    }

                    @media only screen and (max-device-width: 760px) {
                        .walkthrough-page-container .heading {
                            line-height: 3rem;
                        }

                        .walkthrough-page-container .ant-steps {
                            width: unset;
                        }

                        .walkthrough-page-container .ant-steps-dot 
                        .ant-steps-item-tail {
                            margin: 0;
                        }

                        .walkthrough-page-container .ant-steps-dot 
                        .ant-steps-item-icon {
                            margin-left: 10px;
                        }

                        .walkthrough-page-container .ant-steps-dot 
                        .ant-steps-item-content {
                            width: unset;
                            text-align: unset;
                        }

                        .walkthrough-page-container .steps-wrapper  {
                            width: 100%;
                        }
                    }
                `}</style>
            </Layout> :
            <Spinner />
            }
        </>
    )
}

export default Walkthrough;