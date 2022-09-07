import React, { useEffect, useState } from "react";
import Hero from "../../components/Dashboard/Hero";
import Layout from "../../components/Layout";
// import Curriculum from "../../components/Dashboard/Curriculum";
import axios, { AxiosResponse } from "axios";
import { G_API_URL } from "../../constants/constants";
import { __getSubscriptions, __getToken, __getUID } from "../../utils/user-details.util";
import { IState } from "../../interfaces/dashboard";
import Spinner from "../../components/Spinner/spinner";
import RedirectForm from "../../components/BootcampDashboard/RedirectForm";
// @ts-ignore
import { useHistory } from "react-router-dom";
import { getGATag } from "../../utils/common.util";
import { Helmet } from "react-helmet";

const Dashboard = (props: any) => {

    /**
     * * Available Modes
     *      * 0 - Microdegree
     *      * 1 - MERN Full Stack Development Bootcamp (Part-Time)
     *      * 2 - MERN Full Stack Development Bootcamp (Full-Time)
     *      * 3 - Foundations of Front End Development Bootcamp
     *      * 4 - Foundations of Front End Development Bootcamp Demo
     *      * 5 - Launchpad (Career Services)
     * 
     * * Default Mode - 0
     */

    const { slug } = props.match.params;

    const defaultState = {
        activeTab: 1,
        isLoading: false,
        isPopoverVisible: false
    }

    let activeMode = 0;

    const getHash = () => {
        let hash = window.location.hash;
        if(hash) {
            hash = hash.split("#")[1];
        }
        return hash;
    }

    if( slug === "bootcamp" ) {
        let hash = getHash();
        activeMode = hash === "MERN-Full-stack-development-part-time" ? 1 : 
        hash === "MERN-Full-stack-development-full-time" ? 2 : 
        hash === "foundations-of-front-end-development" ? 3 : 4;
    } else if( slug === "launchpad" ) {
        activeMode = 5;
    }

    const [mode, setMode] = useState<number>(activeMode);
    const [state, setState] = useState<IState>(defaultState);

    const history = useHistory();

    const enroll = () => {
        // Fetch user's profile
        axios.get(
            G_API_URL+"profile/?uid="+__getUID()
        ).then((response: AxiosResponse) => {
            const resp = response.data;
            if(resp.status === 1 || resp.status === 2) {
                history.push({
                    pathname: '/enrollment-form',
                    state: {
                        profile: resp.profile,
                        skip: (resp.profile.subscriptions && resp.profile.subscriptions.microdegree !== undefined && resp.profile.subscriptions.microdegree === true) ? true: false,
                        programType: "bootcamp"
                    }
                });
            } else {
                history.push('/');
            }
        });
        return;
    }

    const getContent = (mode:number = 0) => {

        const subscriptions = __getSubscriptions();

        let hash = getHash();

        if(mode === 5 && (!subscriptions || !subscriptions.lauchpad)) {
            history.push({
                pathname: "/career-services"
            });
            return;
        }

        setState(prev => ({
            ...prev,
            isLoading: true
        }))

        let config:any = {
            params: {
                mode: mode
            },
            headers: {
                Authorization: __getToken()
            }
        }

        if([1,2,3,4].includes(mode) && hash) {
            config["params"]["hash"] = hash.toLowerCase();
        }

        axios.get(G_API_URL + "resource/dashboard-content/", config)
        .then((response: any) => {
            response = response.data;
            if(response.status === 1) {
                if(!subscriptions && response.hasPurchased) {
                    if(mode === 0) {
                        if(!subscriptions || !subscriptions.microdegree) {
                            history.push({
                                pathname: "/enroll/microdegree"
                            });
                            return;
                        }
                    } else if([1,2,3].includes(mode)) {
                        enroll();
                    }
                } else {
                    if(mode === 0) {
                        if(!subscriptions || !subscriptions.microdegree) {
                            history.push({
                                pathname: "/microdegree"
                            });
                            return;
                        }
                    } else if([1,2,3,4].includes(mode)) {
                        if((subscriptions && !subscriptions.bootcamp) && 
                        response.hasPurchased) {
                           enroll();
                        } else if((subscriptions && subscriptions.bootcamp && 
                            !subscriptions.bcRegTime) && !response.hasPurchased) {
                            history.push({
                                pathname: "/bootcamp/" + (hash ? hash : "")
                            });
                            return; 
                        } else if (!subscriptions || !response.hasPurchased) {
                            history.push({
                                pathname: "/bootcamp/" + (hash ? hash : "")
                            });
                            return; 
                        } else {
                            if(response.hasPurchased) {
                                if(!hash) {
                                    if(response.purchaseStatus === 0) {
                                        history.push({
                                            pathname: '/bootcamp/MERN-Full-stack-development-part-time'
                                        });
                                    } else if(response.purchaseStatus === 1) {
                                        window.location.hash = 'MERN-Full-stack-development-part-time';
                                        setMode(1)
                                    } else if(response.purchaseStatus === 2) {
                                        window.location.hash = 'MERN-Full-stack-development-full-time';
                                        setMode(2)
                                    } else if(response.purchaseStatus === 3) {
                                        window.location.hash = 'foundations-of-front-end-development';
                                        setMode(3)
                                    } else if(response.purchaseStatus === 4) {
                                        window.location.hash = 'foundations-of-front-end-development-demo';
                                        setMode(4)
                                    }
                                } else {
                                    if(response.purchaseStatus !== mode) {
                                        history.push({
                                            pathname: "/bootcamp/" + (hash ? hash : "")
                                        });
                                    }
                                }
                            }
                        }
                    }
                }

                if(response.isGAEventTriggered === false) {
                    let type = 2;
                    let action = "microdegree_workshop_not_attended";

                    if(workshopInfo && workshopInfo.att &&
                    workshopInfo.att !== "false" && workshopInfo.details 
                    && workshopInfo.details.att === "P") {
                        type = 1;
                        action = "microdegree_workshop_attended";
                    }

                    axios.post(G_API_URL + "tracker/ga-event-triggered/", {
                        type: type
                    }, 
                    {
                        headers: {
                            Authorization: __getToken()
                        }
                    }).then((response) => {
                        response = response.data;
                        if(response.status === 1) {
                            // Env
                            const platformEnv = process.env.REACT_APP_PLATFORM;

                            if (platformEnv === 'prod') {
                                const tag = getGATag(action,
                                "subscribers", "Microdegree");
                                document.body.appendChild(tag);
                            }
                        }
                    }).catch((error) => {
                        console.log(error);
                    });
                }

                setState(prev => ({
                    ...prev,
                    ...response,
                    isLoading: false
                }));
            }
        }).catch(err => {
        });
    }

    useEffect(() => {
        getContent(mode);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const changeMode = (mode: number) => {
        if(mode === 0) {
            history.push({
                pathname: "/learning-dashboard/microdegree"
            });
        } else if(mode === 1) {
            history.push({
                pathname: "/learning-dashboard/bootcamp#MERN-Full-stack-development-part-time"
            });
        } else if(mode === 2) {
            history.push({
                pathname: "/learning-dashboard/bootcamp#MERN-Full-stack-development-full-time"
            });
        } else if(mode === 3) {
            history.push({
                pathname: "/learning-dashboard/bootcamp#foundations-of-front-end-development"
            });
        } else if(mode === 4) {
            history.push({
                pathname: "/learning-dashboard/bootcamp#foundations-of-front-end-development-demo"
            });
        } else {
            history.push({
                pathname: "/career-services"
            });
        }
        setMode(mode);
        setState(prev => (
            {
                ...prev,
                activeTab: 0
            }
        ));
        getContent(mode);
    }

    const switchTab = (value: string) => {
        setState(prev => (
            {
                ...prev,
                activeTab: parseInt(value)
            }
        ));
    }

    const redirect = (r_path: string) => {
        // Update the value of r_path
        (document.getElementById('r_path') as 
        HTMLInputElement).value = r_path;
        (document.getElementById('learning_redirect') as 
        HTMLFormElement).submit();
    }

    const setPopoverVisible = () => {
        setState(prev => ({
            ...prev,
            isPopoverVisible: !state.isPopoverVisible
        }));
    }

    const { isLoading, progress, content, hasPurchased, workshopInfo, workshopSources, liveclassInfo, isPopoverVisible, activeTab } = state;

    return (
        <>
            {
                !isLoading ?
                <Layout>
                    <Helmet>
                        <title>ProGrad | Learning Dashboard</title>
                    </Helmet>
                    <div className={`lr-pad-m tb-pad-m 
                    dashboard-container tab-${activeTab}`}>
                        <Hero 
                            mode={mode} 
                            progress={progress}
                            milestone={content?.milestoneBlock}
                            ongoing={progress?.ongoing}
                            workshopInfo = {workshopInfo}
                            workshopSources = {workshopSources}
                            hasPurchased = {hasPurchased}
                            content={content}
                            liveclassInfo = {liveclassInfo}
                            isPopoverVisible = { isPopoverVisible }
                            changeMode={ changeMode } 
                            setPopoverVisible = {setPopoverVisible}
                            redirect = { redirect }
                            activeTab = { activeTab }
                            switchTab = {switchTab}
                        />
                    </div>
                    <RedirectForm />
                </Layout> :
                <Spinner />
            }
            <style jsx>{`
                @media only screen and (max-device-width: 760px) {
                    .dashboard-container.tab-1 .milestone-content-wrapper,
                    .dashboard-container.tab-1 .curriculum-content-wrapper,
                    .dashboard-container.tab-2 .achievements-wrapper,
                    .dashboard-container.tab-2 .enrol-block-wrapper,
                    .dashboard-container.tab-2 .coursework-content-wrapper,
                    .dashboard-container.tab-2 .workshop-rewards-wrapper {
                        display: none;
                    }
                }
            `}</style>
        </>
    )
}

export default Dashboard;