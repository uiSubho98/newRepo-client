import React,{ useEffect,useState } from "react";
import { Input, Modal, message } from "antd";
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import FloatLabel from '../Form/FloatLabel';
import { G_URL, G_API_URL, G_API_DISCORD }from "../../constants/constants";
import jstz from 'jstz';
import moment from 'moment-timezone';
import axios, { AxiosResponse } from "axios";
import { __getToken, __getUID } from "../../utils/user-details.util";
// import DiscordIcon from "../../assets/icons/svg_icons/discord-icon.svg";
import DiscordUserName from "../../assets/imgs/Dashboard/discord-username.svg";
import Countdown from "react-countdown";
// import { isMobile } from "react-device-detect";

interface IDecodedToken {
    uid?: number;
    name?: string;
}

interface IStep {
    title?: string;
    description?: string;
    action?: string;
    altAction?: string;
    groupName?: string;
    discordRole?: string;
    link?: string;
    altLink?: string;
    info?: string;
}

interface IProject {
    projectId?: number;
    name?: string;
}

interface IProjectContent {
    title?: string;
    topic?: string;
    duration?: string;
    mode?: string;
    slug?: string;
    totalProjects?: string;
    project?: IProject;
}

interface IPrerequisites {
    steps: Array<IStep>;
    projectContent: IProjectContent;
}

interface IBannerContent {
    title?: string;
    subTitle?: string;
    description?: string;
}

interface IOnboardStatus {
    slotsSelected?: boolean;
    discordInviteUsed?: boolean;
    projectsCompleted?: boolean;
    slot?: string;
}

interface IModule {
    mainTopic: string;
    moduleId: string;
}

interface ITopic {
    title: string;
    topic: string;
    moduleId: string;
    content: Array<IModule>;
}

interface ILearningContent {
    learningPath?: Array<ITopic>;
}

interface IOngoingSprint {
    moduleId: string;
    sprintName: string;
}

interface INextStep {
    moduleId: string;
    moduleName: string;
    child: {
        moduleId: string;
        moduleName: string; 
    }
}

interface IProgress {
    ongoing?: IOngoingSprint;
    modulesCompleted?: Array<string>;
    nextStep?: INextStep;
}

interface IContent {
    title?: string;
    preRequisites?:IPrerequisites;
    bannerContent?: IBannerContent;
}

interface IDetails {
    slot_ts: number;
    slot_id: string;
    att: string;
}

interface IWorkshopInfo {
    att: string;
    details: IDetails | null;
}

// interface IWorkshopSources {
//     certificate?: string;
//     report?: string;
//     project?: string;
//     view_status?: number;
// }

interface IHero {
    programType?: string;
    decodedToken?: IDecodedToken;
    isProjectSubmitted?: boolean;
    hasStartedLearning?: boolean;
    workshopInfo?: IWorkshopInfo;
    // workshopSources?: IWorkshopSources;
    liveclassInfo?: any;
    onboardStatus?: IOnboardStatus;
    hasPurchased?: boolean;
    progress?: IProgress;
    learningContent?: ILearningContent;
    data?: IContent;
    discordId?: string;
    redirect: Function;
}

interface IState {
    isLoading: boolean;
    isDiscordInfoUpdated: boolean;
    hasJoinedDiscordGroup: boolean;
    discordUserId: string;
    discordUsername: string;
    discordGroupName: string;
    discordRoleId: string;
}

const Hero = (props: IHero) => {

    const { 
        programType,
        decodedToken, 
        // isProjectSubmitted, 
        workshopInfo,
        // workshopSources,
        data, 
        hasPurchased, 
        progress, 
        // onboardStatus,
        liveclassInfo,
        hasStartedLearning,
        discordId } = props;

    const defaultState = {
        isLoading: false,
        isDiscordInfoUpdated: false,
        hasJoinedDiscordGroup: false,
        discordUserId:"",
        discordUsername:"",
        discordGroupName: "",
        discordRoleId:""
    }

    // var isWorkshopScheduled = workshopInfo && workshopInfo.att === "true" && 
    // workshopInfo.details && workshopInfo.details.att;

    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const [state, setState] = useState<IState>(defaultState);

    const {redirect} = props;

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    useEffect(() => {
        let groupName = "";
        let discordRoleId = "";
        data?.preRequisites?.steps.forEach(step => {
            if(step.groupName) {
                groupName = step.groupName;
                discordRoleId = step.discordRole ?? "";
                setState(prev => (
                    {
                        ...prev,
                        discordUserId: discordId ?? "",
                        discordGroupName: groupName,
                        discordRoleId: discordRoleId
                     }
                ))
            }
        });
    },[data,discordId]);


    const handleClick = (action?:string,link:string="") => {
        switch (action) {
            case "Book Now": 
            case "Reschedule":
                window.location.href = G_URL + link;
                break;
            case "Join Now":
                window.open(link, '_blank');
                setModalVisible(true);
                break;
            case "Visit Discord":
                window.open(link, '_blank');
                break;
            case "Start Learning":
                redirect(link);
                break;
            case "Continue Learning":
            case "Go To Lesson":
                if(progress?.nextStep?.child?.moduleId) {
                    redirect("prograd-fsd/learning/"+progress?.nextStep?.child?.moduleId+"/");
                }
                break;
            case "Join Class":
                window.location.href = link;
                break;
        }
    }

    const renderSteps = (steps?:Array<IStep>) => {
        const detectedTimeZone = jstz.determine().name();
        // return steps &&
        // steps.map((step,key) => {
        //     let completedClass:string = "";
        //     let cursorClass:string = "";
        //     if(onboardStatus) {
        //         if(key === 0 && workshopInfo) {
        //             let isWorkshopScheduled = workshopInfo.att === "true";
        //             let details = workshopInfo.details;
        //             if(isWorkshopScheduled && details) {
        //                 let schedule_time = moment(details.slot_ts * 1000)
        //                 .tz(detectedTimeZone)
        //                 .format("DD MMM YYYY, h:mm A");
        //                 if(details.att) {
        //                     completedClass = "completed";
        //                     step.action = "";
        //                     step.description = "You’ve attended the session on " + 
        //                     schedule_time + ".";
        //                 } else if(!details.att) {
        //                     step.action = "Join Class"
        //                     step.link = G_URL + "student/join/workshop/" + details.slot_id + "/" + __getUID();
        //                     step.description = "Scheduled for " + schedule_time;
        //                 }
        //             } else {
        //                 step.action = "Reschedule";
        //                 step.description = "You were absent the last time. Reschedule your free session at a time convenient for you.";
        //             } 
        //         } else if(key === 1 && onboardStatus.slotsSelected && 
        //             onboardStatus.slot) {
        //             completedClass = "completed";
        //             step.action = "Change Slot";
        //             step.description = "You have booked a "+onboardStatus.slot+
        //             " slot for live classes";
        //         } else if(key === 2 && onboardStatus.discordInviteUsed) {
        //             completedClass = "completed";
        //             step.action = "Visit Discord";
        //             step.link = step.altLink;
        //         }
        //     }
        //     return (
        //         <div className={`g-d g-v-c step ${completedClass}`}>
        //             <div className="f-d f-h-c f-v-c check-icon">
        //                 <i className="icon icon-check"></i>
        //             </div>
        //             <div className="info">
        //                 <span className="body-small strong-text">
        //                     { step.title } {" "}
        //                     {   step.action &&
        //                         <span className={`action c-pointer
        //                         ${cursorClass}`} onClick={() => 
        //                         handleClick(step.action,step.link)}>
        //                             { step.action }
        //                         </span>
        //                     }
        //                 </span>
        //                 <span className="f-d body-caption description">
        //                     { step.description }
        //                 </span>
        //             </div>
        //         </div>
        //     )
        // })

        // const handleView = (type?: string, link?: string) => {
        //     axios.post(G_API_URL+"vision/view/status",{
        //         type,
        //         gg: 2
        //     }, {
        //         headers: {
        //             Authorization: __getToken()
        //         }
        //     }).then((response: any) => {
        //         response = response.data;
        //         if(response.status && response.view_status) {
        //             window.location.reload();
        //         }
        //     }).catch((error) => {
        //         console.log(error);
        //     });
        //     window.open(link, "_blank");
        // }

        return steps &&
        steps.map((step: IStep, index:number) => {
            // let completedClass:string = "";
            if(index === 0 && workshopInfo) {
                let isWorkshopScheduled = workshopInfo.att === "true";
                let details = workshopInfo.details;
                if(isWorkshopScheduled && details) {
                    let schedule_time = moment(details.slot_ts * 1000)
                    .tz(detectedTimeZone)
                    .format("DD MMM YYYY, h:mm A");
                    // completedClass = "complete";
                    if(details.att) {
                        step.action = "";
                        step.info = "You’ve attended the session on " + 
                        schedule_time + ".";
                    } else if(!details.att) {
                        step.action = "Join Class"
                        step.link = G_URL + "student/join/workshop/" + details.slot_id + "/" + __getUID();
                        step.info = "Scheduled for " + schedule_time;
                    }
                } else {
                    step.action = "Reschedule";
                    step.description = "You were absent the last time. Reschedule your free session at a time convenient for you.";
                } 
            }

            if(index === 1 && hasStartedLearning) {
                step.action = "Continue Learning";
            }
            return(
            <div className="g-d step" key={index}>
                <div className="g-d g-v-c info">
                    {/* <div className={`f-d f-h-c f-v-c check-icon ${completedClass}`}>
                        <i className="icon icon-check"></i>
                    </div> */}
                    {/* <div className="info"> */}
                        <div>
                            <span className="f-d body-small strong-text">
                                {step.title}
                            </span>
                            <span className="f-d body-small">
                                { step.description }
                            </span>
                        </div>
                        {/* <span className="f-d body-caption description">
                            { step && step.description }
                        </span> */}
                        <div>
                            { 
                                step.info &&
                                <span className="body-small">
                                    { step.info + " " }
                                </span>
                            }
                            {/* {
                                index === 0 && isWorkshopScheduled &&
                                <div className="f-d f-ht f-v-c action-elements">
                                    <span className="body-small strong-text action c-pointer" 
                                    onClick={() => handleView("certificate", workshopSources?.certificate )}>
                                        { isMobile ? "Certificate" : "Get Certificate" }
                                    </span>
                                    <span className="f-d divider"></span>
                                    <span className="body-small strong-text action c-pointer" 
                                    onClick={() => handleView("report", workshopSources?.report )}>
                                        { isMobile ? "Report" : "View My Report" }
                                    </span>
                                    <span className="f-d divider"></span>
                                    <span className="body-small strong-text action c-pointer" 
                                    onClick={() => handleView("project", workshopSources?.project )}>
                                        { isMobile ? "Project" : "View My Project" }
                                    </span>
                                </div>
                            } */}
                            <span className={`f-d body-small strong-text prereq-action c-pointer`} 
                            onClick={()=> handleClick(step.action, step?.link)}>
                                { step.action }
                            </span>
                        </div>
                    {/* </div> */}
                </div>
            </div>)
        })
    }

    // const renderBanner = (bannerContent?: IBannerContent) => {
    //     return (
    //         <div className="banner-content">
    //             <h3 className="h3-heading">
    //                 { bannerContent && bannerContent.title }
    //             </h3>
    //             <span className="f-d body-small strong-text sub-title">
    //                 { bannerContent && bannerContent.subTitle }
    //             </span>
    //             <span className="body-small">
    //                 { bannerContent && bannerContent.description }
    //             </span>
    //         </div>
    //     )
    // }

    // const renderProjectInfo = (projectContent?:IProjectContent) => {
    //     // const renderProject = (project?: IProject) => {

    //     //     const handleClick = (project:number) => {
    //     //         window.location.href = G_URL+"project/"+project;
    //     //     }

    //     //     return project && 
    //     //     (
    //     //         <div className="f-d f-h-sb body-small strong-text 
    //     //         name c-pointer" onClick={() => handleClick(project.projectId ?? 0) }>
    //     //             <span className="f-d">
    //     //                 { project.name }
    //     //             </span>
    //     //             {
    //     //                 isProjectSubmitted &&
    //     //                 <span className="f-d f-v-c status body-caption
    //     //                 strong-text">
    //     //                     Submitted
    //     //                     <span className="f-d f-v-c f-h-c
    //     //                     check-icon-wrapper">
    //     //                         <i className="icon icon-check"></i>
    //     //                     </span>
    //     //                 </span>
    //     //             }
    //     //         </div>
    //     //     )
    //     // }

    //     return (
    //         <div className="g-d project-info">
    //             <div></div>
    //             <div>
    //                 <div className="f-d f-vt-m f-h-sb">
    //                     <div className="content">
    //                         <h4 className="h4-heading">
    //                             { projectContent && projectContent.title }
    //                         </h4>
    //                         <span className="f-d body-small">
    //                             { projectContent && projectContent.topic }
    //                         </span>
    //                         <span className="f-d body-small constraints">
    //                             {/* { projectContent && 
    //                             projectContent.duration+" " }&middot;
    //                             { " "+(projectContent && 
    //                                 projectContent.mode)+" " }&middot; */}
    //                             { (projectContent && 
    //                                 projectContent.totalProjects)}
    //                         </span>
    //                     </div>
    //                     <div className="g-d g-v-c g-h-e action-block">
    //                         <button className="default-pink-btn filled-pink"
    //                         onClick={() => redirect(projectContent? 
    //                         projectContent.slug : "")}>
    //                             Start Now
    //                         </button>
    //                     </div>
    //                 </div>
    //                 {/* <div className="f-d f-h-sb projects">
    //                     { projectContent && renderProject( projectContent &&
    //                         projectContent.project ) }
    //                 </div> */}
    //             </div>
    //         </div>
    //     )
    // }

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setState(prev => (
            {...prev,discordUsername: value}
        ));
    }

    const handleSubmit = async() => {
        const headers = {
            headers: {
                Authorization: __getToken()
            }
        }

        const data = {
            username: state.discordUsername,
            programType: programType,
            discordID: ""
        }

        let isUserVerified = false;

        setState(prev => ({...prev,isLoading: true}));

        const encodedDiscordUserName = encodeURIComponent(state.discordUsername);
        await axios.get(
            G_API_DISCORD+"verify-user?user_tag="+encodedDiscordUserName
        ).then((response: AxiosResponse) => {
            const resp = response.data;
            if(resp.status) {
                isUserVerified = true;
                data.discordID = resp.userid;
            } else {
                setState(prev => (
                    {
                        ...prev, 
                        isLoading:false
                    }
                ));
                message.error("Please enter a valid username");
            }
        });

        if(isUserVerified) {
            axios.put(G_API_URL+"progress/update/discord/", data, headers)
            .then((response: AxiosResponse) => {
                const resp = response.data;
                if(resp.status) {
                    setTimeout(() => {
                        setState(prev => (
                            {
                                ...prev, 
                                isDiscordInfoUpdated:true,
                                isLoading:false
                            }
                        ));
                        joinDiscordGroup(data.discordID);
                    }, 1500);
                } else {
                    setState(prev => (
                        {
                            ...prev, 
                            isLoading:false
                        }
                    ))
                    message.error("Something went wrong, please try again!");
                }
            });
        }
    }

    const joinDiscordGroup = (discordId:string) => {
        axios.post(G_API_DISCORD + 'add-user-to-channel/', {
            "user_id": discordId,
            "custom_role": state.discordRoleId
        }).then((response: AxiosResponse) => {
            const resp = response.data;
            if(resp.status === 1) {
                setTimeout(() => {
                    setState(prev => ({
                        ...prev,
                        hasJoinedDiscordGroup: true
                    }));
                    setTimeout(() => {
                        window.location.reload();
                    },3000);
                },3000);
            }
        }).catch(err => 
            console.log(err)
        )}

    const renderNextStep = () => {

        // let groupName = "";
        // let discordLink = "";
        let slotDescription;
        // let action = "Book Now";
        let joinLink = "";
        let count_down = 0;
        if(liveclassInfo) {
            let slot = liveclassInfo.slot;
            let endDate: any = new Date(slot.split("-")[0]);
            endDate = endDate.getFullYear()+'/'+(endDate.getMonth()+1)+'/'+endDate.getDate();
            let endTime = slot.split("-")[1];
            let endTimestamp = new Date(endDate+ " " + endTime).getTime();
            let startTimestamp = new Date(slot.split("-")[0]).getTime();
            let currentTimestamp = new Date().getTime();
            if(endTimestamp >= currentTimestamp) {
                count_down = startTimestamp;
                joinLink = G_URL+"student/join/liveclass/"+liveclassInfo.slot_id+"/"+__getUID();
                slotDescription = "Your next live class has been scheduled on";
                // action = "Change Slot";
            }
        }

        const renderer = ({days, hours, minutes, seconds, completed}: any) => {
            const status = "Session in progress";
            if (completed) {
                // Render a complete state
                return <span className="counter-down body-small">{status}</span>;
    
            } else {
                // Render a countdown
                return (
                    <span className="counter-down body-small">
                        Session starting in {days} Days {hours} Hrs {minutes} mins {seconds} sec
                    </span>
                );
            }
        };

        // data?.preRequisites?.steps?.forEach(step => {
        //     if(step.altAction === "Visit Discord") {
        //         groupName = step?.groupName ?? "";
        //         discordLink = step?.altLink ?? "";
        //     }
        // })

        return (
            <div className="utility-wrapper w-70">
                <div className="top-pane">
                    <span className="f-d body-small cap-letter">
                        In Progress
                    </span>
                    <span className="f-d topic body-large cap-letter">
                        {progress?.nextStep?.moduleName}
                    </span>
                    <span className="f-d body-small">
                        {progress?.nextStep?.child?.moduleName}
                    </span>
                    <div className="f-d f-vt-m f-v-c action-block">
                        <button className="default-pink-btn filled-pink c-pointer 
                        go-to-lesson-btn" onClick={() => handleClick("Go To Lesson", 
                        progress?.nextStep?.child?.moduleId )}>
                            Go To Lesson
                        </button>
                        {/* <span className="f-d  f-v-c discord-navigation-block">
                            <span className="f-d f-v-c hop-on-discord-btn
                            body-small strong-text c-pointer" 
                            onClick={() => handleClick("Visit Discord", 
                            discordLink)}>
                                <img className="discord-icon" src={DiscordIcon}
                                alt="" />
                                Hop On Discord
                            </span>&nbsp;
                            <span className="squad body-caption">
                                {"("+groupName+")"}
                            </span>
                        </span> */}
                    </div>
                </div>
                {
                liveclassInfo &&
                <div className="bottom-pane">
                    <div>
                        <span>
                            <span className="body-small">
                                {slotDescription}
                            </span>&nbsp;
                            <span className="body-small strong-text">
                                {liveclassInfo.slot}
                            </span>
                        </span>
                        {/* <span className="body-small change-slot-btn
                        strong-text c-pointer" onClick={
                            () => handleClick(action)}>
                            {action}
                        </span> */}
                    </div>
                    {
                        joinLink &&
                        <div className="session-info">
                            <Countdown date={count_down} renderer={renderer}/>
                            <span className="body-small join-class-btn
                            strong-text c-pointer" onClick={() => {
                                window.location.href = joinLink
                            }}>
                                Join Class
                            </span>
                        </div>
                    }
                </div>
                }
            </div>
        )
    }
    // let isWorkshopAttended = (workshopInfo && workshopInfo.att === "true" && 
    // workshopInfo.details && workshopInfo.details.att) ? true : false;

    let isWorkshopAttended = false;
    if(workshopInfo && workshopInfo.att === "true" && 
    workshopInfo.details && workshopInfo.details.att === "P") {
        isWorkshopAttended = true;
    }

    return (
        <>
            <div className="hero-content-wrapper lr-pad-d lr-pad-m 
            tb-pad-d tb-pad-m">
                <h1 className="h1-heading">
                    Hi { decodedToken && decodedToken.name}. Welcome to <span className="brand-name">ProGrad</span>!
                </h1>
                {
                    (!isWorkshopAttended || !hasPurchased) ?
                    <div className="g-d g-col-b-s g-col-1-m pre-requisites">
                        <div className="left-pane">
                            {/* <span className="f-d body-small strong-text">
                                { data && data.title }
                            </span>
                            <div className="steps">
                                { data && data.preRequisites &&
                                renderSteps( data.preRequisites.steps ) }
                            </div>
                            { data && data.preRequisites &&
                            renderProjectInfo(data.preRequisites.projectContent) } */}
                            <div className="getting-started-block">
                                <span className="f-d body-regular 
                                cap-letter strong-text">
                                    GETTING STARTED
                                </span>
                                <span className="f-d body-small description">
                                Experience ProGrad’s MERN Stack Bootcamp through this module on Introduction to Web
                                Development. Get a fun intro to Web Dev, build an impressive web project, and learn how to the
                                ProGrad Bootcamp can help you kickstart an awesome career as a professional developer!
                                </span>
                            </div>
                            <div className="steps">
                                {renderSteps( data?.preRequisites?.steps )}
                            </div>
                        </div>
                        <div className="right-pane">
                            {/* { 
                                data && 
                                renderBanner( data.bannerContent ) 
                            } */}
                        </div>
                    </div> :
                    renderNextStep()
                }
            </div>
            <Modal 
                footer = {null}
                className="discord-modal"
                centered
                onCancel={() => setModalVisible(false)}
                destroyOnClose={true}
                visible={isModalVisible}
            >

            { 
                !state.isDiscordInfoUpdated ?
                <>
                    <div className="info-block">
                        <i className="icon icon-info"></i>
                        <span className="f-d body-small">
                            You will find your user id on the bottom left corner.
                            Click and there you get your user ID copied. 
                            Paste it here and you are good to go!
                        </span>
                        <span className="f-d body-small">
                            Example:
                        </span>
                        <img src={DiscordUserName} className="discord-info-image" 
                        alt="discord info" />
                        <span className="f-d">
                            Before that make sure you verified the email 
                            address for Discord!
                        </span>
                    </div>
                    <div className="modal-content-wrapper">
                        <span className="f-d body-small strong-text">
                            Enter your community user name
                        </span>
                        <div className="g-d input-block">
                            <FloatLabel label="User name">
                                <Input 
                                    className="discord-username" 
                                    placeholder="Enter Email" 
                                    onChange={(event) => handleChange(event)}
                                />
                            </FloatLabel>
                            <span className="f-d f-v-c f-h-e c-pointer
                            proceed-btn" onClick={() => handleSubmit()}>
                                {
                                    !state.isLoading ?
                                    <i className="icon icon-arrow-right"></i> :
                                    <Spin 
                                        indicator={antIcon} 
                                        style={{color: "var(--pink)"}} 
                                    />
                                }
                            </span>
                        </div>
                    </div>
                </> : 
                <>
                {
                    !state.hasJoinedDiscordGroup ?
                    <div className="g-d g-h-c g-v-c squad-info-block">
                        <span className="g-d body-big
                        text-info">
                            Please wait while we connect you
                            to team&nbsp;
                            <span className="strong-text cap-letter">
                                {state.discordGroupName}
                            </span>
                        </span>
                        <div className="spinner-block">
                            {antIcon}
                        </div>
                    </div> :
                    <div className="g-d g-h-c g-v-c squad-info-block">
                        <span className="g-d body-big
                        text-info">
                            Congrats, You are now part of ProGrad Discord Community!
                        </span>
                    </div>
                }
                </>
            }
            </Modal>
            <style jsx>{`

                .hero-content-wrapper {
                    padding-bottom: 0;
                }

                .hero-content-wrapper .brand-name {
                    color: var(--pink);
                }

                .hero-content-wrapper .pre-requisites {
                    margin: var(--peaky-gap-32) 0 0;
                }

                .hero-content-wrapper .pre-requisites
                .left-pane  {
                    width: 95%;
                }

                .hero-content-wrapper .pre-requisites 
                .steps .step .check-icon {
                    background-color: var(--dove);
                    border-radius: var(--peaky-br-full);
                    border: 1px solid var(--carbon);
                    height:25px;
                    width:25px;
                    margin: 0 auto;
                }

                .hero-content-wrapper .pre-requisites 
                .steps .step.completed .check-icon {
                    background-color: var(--greenapple);
                    color: var(--dove);
                    border-color: var(--greenapple);
                }

                .hero-content-wrapper .pre-requisites 
                .steps .step .check-icon .icon {
                    font-size: 18px;
                }

                .hero-content-wrapper .pre-requisites 
                .steps {
                    // margin: var(--peaky-gap-32) 0 0;
                }

                .hero-content-wrapper .pre-requisites 
                .steps .step {
                    // grid-template-columns: 1fr 10fr;
                    // margin: var(--peaky-gap-16) 0 0;
                }

                .hero-content-wrapper .pre-requisites 
                .steps .step .info {
                    background-color: var(--smoke);
                    box-shadow: var(--peaky-shadow-high);
                    padding: var(--peaky-pad-24);
                    margin: var(--peaky-gap-24) 0 0;
                }

                .hero-content-wrapper .pre-requisites 
                .steps .step .info .prereq-action {
                    margin: var(--peaky-gap-4) 0 0;
                    color: var(--pink);
                }

                .hero-content-wrapper .pre-requisites 
                .steps .step .info .action.default {
                    cursor:default;
                }

                .hero-content-wrapper .pre-requisites 
                .steps .step .info .description {
                    margin: var(--peaky-gap-4) 0 0;
                    color: var(--carbon);
                }

                .hero-content-wrapper .pre-requisites
                .right-pane .banner-content {
                    background-color: var(--smoke);
                    margin: var(--peaky-gap-64) 0 0;
                    padding: var(--peaky-pad-32);
                }

                .hero-content-wrapper .pre-requisites
                .right-pane .banner-content .sub-title {
                    margin:0 0 var(--peaky-gap-8);
                }

                .hero-content-wrapper .pre-requisites
                .left-pane .project-info {
                    grid-template-columns: 1fr 10fr;
                    padding: var(--peaky-pad-16) 0 var(--peaky-pad-16)
                    var(--peaky-pad-16);
                    margin: var(--peaky-gap-16) 0 0;
                }

                .hero-content-wrapper .left-pane 
                .getting-started-block .description {
                    margin: var(--peaky-gap-8) 0 0;
                    white-space: pre-wrap;
                }

                .hero-content-wrapper .pre-requisites
                .left-pane .project-info .content
                .constraints {
                    margin: var(--peaky-gap-16) 0 0;
                    color: var(--granite);
                }

                .hero-content-wrapper .pre-requisites
                .left-pane .project-info .projects {
                    margin: var(--peaky-gap-48) 0 0;
                }

                .hero-content-wrapper .pre-requisites
                .left-pane .project-info .projects 
                .name {
                    background-color: var(--smoke);
                    border-radius: var(--peaky-br-4);
                    box-shadow : var(--peaky-shadow);
                    padding: var(--peaky-pad-24) var(--peaky-pad-16);
                    width: 45%;
                }

                .hero-content-wrapper .pre-requisites
                .left-pane .project-info .projects 
                .status {
                    color: var(--greenapple);
                }

                .hero-content-wrapper .pre-requisites
                .left-pane .project-info .projects 
                .status .check-icon-wrapper {
                    height: 25px;
                    width:25px;
                    margin: 0 0 0 var(--peaky-gap-8);
                    border-radius: var(--peaky-br-full);
                    border: 1px solid var(--greenapple);
                    color: var(--greenapple);
                }

                .hero-content-wrapper .pre-requisites
                .left-pane .project-info .projects 
                .status .check-icon-wrapper .icon {
                    font-size:18px;
                }

                .hero-content-wrapper .utility-wrapper {
                    margin: var(--peaky-gap-32) 0 0;
                    box-shadow: var(--peaky-shadow-high);
                }

                .hero-content-wrapper .utility-wrapper
                .top-pane {
                    background-color: var(--smoke);
                    padding: var(--peaky-pad-32) var(--peaky-pad-32);
                }

                .hero-content-wrapper .utility-wrapper
                .top-pane .topic {
                    margin: var(--peaky-gap-4) 0;
                }

                .hero-content-wrapper .utility-wrapper
                .top-pane .action-block {
                    margin: var(--peaky-gap-24) 0 0;
                }

                .hero-content-wrapper .pre-requisites 
                .steps .step .info .action-elements .action {
                    color: var(--pink);
                }

                .hero-content-wrapper .pre-requisites 
                .steps .step .info .action-elements {
                    margin: var(--peaky-gap-4) 0 0;
                }

                .hero-content-wrapper .pre-requisites 
                .steps .step .info .action-elements .divider {
                    margin: 0 var(--peaky-gap-16);
                    width: 2px;
                    height: 15px;
                    background-color: var(--carbon);
                }

                .hero-content-wrapper .utility-wrapper
                .top-pane .action-block .discord-navigation-block {
                    margin: 0 0 0 var(--peaky-gap-48);
                }

                .hero-content-wrapper .utility-wrapper
                .top-pane .action-block .discord-navigation-block 
                .hop-on-discord-btn {
                    color: var(--pink);
                }

                .top-pane .action-block .discord-navigation-block 
                .hop-on-discord-btn .discord-icon {
                    width: 32px;
                    margin: 0 var(--peaky-gap-4) 0 0;
                }

                .hero-content-wrapper .utility-wrapper
                .top-pane .action-block .discord-navigation-block
                .squad {
                    color: var(--carbon);
                }

                .hero-content-wrapper .utility-wrapper
                .bottom-pane {
                    background-color: var(--white-smoke);
                    padding: var(--peaky-pad-24) var(--peaky-pad-32);
                }

                .hero-content-wrapper .utility-wrapper
                .bottom-pane .change-slot-btn,
                .hero-content-wrapper .utility-wrapper
                .bottom-pane .join-class-btn {
                    margin: 0 0 0 var(--peaky-gap-8);
                    color: var(--pink);
                }

                .hero-content-wrapper .utility-wrapper
                .bottom-pane .session-info {
                    margin: var(--peaky-gap-4) 0 0;
                }

                .hero-content-wrapper .utility-wrapper
                .bottom-pane .counter-down {
                    color: var(--bluelagoon);
                }

                .discord-modal .ant-modal-body {
                    padding:0;
                }

                .discord-modal .ant-modal-close-x {
                    color: var(--carbon);
                }

                .discord-modal .info-block {
                    background-color: var(--pink);
                    padding: var(--peaky-pad-24) var(--peaky-pad-32);
                }

                .discord-modal .info-block .icon-info {
                    color: var(--dove);
                    font-size: 21px;
                }

                .discord-modal .info-block .discord-info-image {
                    height: 70px;
                }

                .discord-modal .info-block > span {
                    color: var(--dove);
                }

                .discord-modal .info-block > span:nth-of-type(1) {
                    margin: var(--peaky-gap-16) 0 0;
                }

                .discord-modal .info-block > span:nth-of-type(2) {
                    margin: var(--peaky-gap-24) 0 var(--peaky-gap-8);
                }

                .discord-modal .info-block > span:nth-of-type(3) {
                    margin: var(--peaky-gap-16) 0 0;
                }

                .discord-modal .squad-info-block {
                    padding: var(--peaky-pad-32);
                }

                .discord-modal .squad-info-block .text-info {
                    margin: var(--peaky-gap-64) 0;
                }

                .discord-modal .squad-info-block .spinner-block {
                    color: var(--pink);
                    padding: var(--peaky-pad-16) 0 var(--peaky-pad-48);
                }

                .discord-modal .squad-info-block .spinner-block
                .anticon-loading {
                    font-size: 32px !important;
                }

                .discord-modal .modal-content-wrapper {
                    padding: var(--peaky-pad-24) var(--peaky-pad-32) 64px;
                }

                .discord-modal .input-block {
                    grid-template-columns: 8fr 1fr;
                    margin: var(--peaky-gap-16) 0 0;
                }

                .discord-modal .ant-input.discord-username {
                    height:60px;
                }

                .discord-modal .ant-input.discord-username:hover,
                .discord-modal .ant-input.discord-username:focus {
                    border-color: var(--pink);
                    box-shadow: none;
                }

                .discord-modal .input-block .proceed-btn {
                    font-size: 36px;
                    color: var(--pink);
                }

                .discord-modal .input-block .label {
                    line-height: 50px;
                    font-size:14px;
                }

                @media only screen and (max-device-width: 760px) {

                    .hero-content-wrapper .pre-requisites
                    .left-pane {
                        order: 2;
                        width: 100%;
                    }

                    .hero-content-wrapper .pre-requisites
                    .left-pane .project-info .action-block {
                        justify-content: start;
                        margin: var(--peaky-gap-24) 0 0;
                    }

                    .hero-content-wrapper .pre-requisites 
                    .left-pane .project-info .projects .name {
                        width: 100%;
                    }

                    .hero-content-wrapper .utility-wrapper {
                        width: 100%;
                    }

                    .hero-content-wrapper .pre-requisites 
                    .right-pane .banner-content {   
                        margin : 0 0 var(--peaky-gap-32);
                        padding: var(--peaky-pad-24);
                    }

                    .hero-content-wrapper .utility-wrapper
                    .top-pane {
                        padding-bottom: var(--peaky-gap-32);
                    }

                    .hero-content-wrapper .utility-wrapper
                    .top-pane .action-block {
                        align-items: flex-start;
                    }

                    .hero-content-wrapper .utility-wrapper
                    .top-pane .action-block .discord-navigation-block {
                        margin: var(--peaky-gap-16) 0 0;
                    }
                }

                @media screen and (min-width: 768px) and (max-width: 1023px) 
                and (orientation: portrait) {
                    .hero-content-wrapper .utility-wrapper {
                        width: 95%;
                    }

                    .hero-content-wrapper .pre-requisites {
                        grid-template-columns: 1fr;
                    }

                    .hero-content-wrapper .pre-requisites 
                    .right-pane .banner-content {
                        width: 95%;
                    }
                }

            `}</style>
        </>
    )
}

export default Hero;