import React, { useEffect, useState } from "react";
import { Input, Modal, message, Spin } from "antd";
import { G_API_URL, G_API_DISCORD, LEARN_PLAT_URL, G_URL } from "../../constants/constants";
import { IStep, IBannerContent, IHero } from './microdegreeDashboard.d'
import { isMobile } from "react-device-detect";
import FloatLabel from "../Form/FloatLabel";
import { __getToken, __getUID } from "../../utils/user-details.util";
import jstz from 'jstz';
import moment from 'moment-timezone';
import axios, { AxiosResponse } from "axios";
import { LoadingOutlined } from "@ant-design/icons";
// import { InlineWidget } from "react-calendly";
import DiscordUserName from "../../assets/imgs/Dashboard/discord-username.svg";
import Countdown from "react-countdown";

interface IState {
    isLoading: boolean;
    isDiscordInfoUpdated: boolean;
    hasJoinedDiscordGroup: boolean;
    discordUsername: string;
    discordGroupName: string;
    discordRoleId: string;
}

const Hero = (props: IHero) => {

    const { decodedToken, data, progress, purchase, workshopInfo, workshopSources, hasStartedLearning, liveclassInfo } = props;

    const defaultState = {
        isLoading: false,
        isDiscordInfoUpdated: false,
        hasJoinedDiscordGroup: false,
        discordUsername: "",
        discordGroupName: "",
        discordRoleId: ""
    }
    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    // const [isWorkshopModalVisible, setWorkshopModalVisible] = useState<boolean>(false);
    const [state, setState] = useState<IState>(defaultState);

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    
    // var workshopTime = workshopInfo?.details?.slot_ts;
    // var onboardingCompletion = [ workshopInfo && workshopInfo.details && workshopInfo.details.att];
    // var showPrerequisites = !(workshopInfo?.details && workshopInfo?.details?.att);
    var isWorkshopScheduled = workshopInfo && workshopInfo.att === "true" && 
    workshopInfo.details && workshopInfo.details.att;
    // useEffect(() => {
        // Show schedule workshop modal if user has not scheduled it yet
        // if(!onboarding.attendFreeWorkshop && localStorage.getItem('woskhopModal') !== 'true') {
        //     localStorage.setItem('woskhopModal', 'true');
        //     setWorkshopModalVisible(true);
        // }
    // },[onboarding.attendFreeWorkshop])

    // var showWorkshopBlock = false;

    //Check if workshop time is in future then show prerequisites
    // if(!showPrerequisites) {
    //     showWorkshopBlock = true;
    // }

    // Subscription date of microdegree
    const subscriptionDate = new Date(decodedToken.subscriptions.mdRegTime * 1000);
    var discountUntilDate = subscriptionDate;
    discountUntilDate.setDate(discountUntilDate.getDate() + 7);
    const showDiscount = discountUntilDate.getTime() > new Date().getTime();

    // const freeWorkshopRegister  = () => {
    //     window.location.href = G_URL + "vision/booking/microdegree";
    // }

    useEffect(() => {
        let groupName = "";
        let discordRoleId = "";
        data && data.preRequisites && data.preRequisites.steps && data.preRequisites.steps.forEach(step => {
            if (step.groupName) {
                groupName = step.groupName;
                discordRoleId = step.discordRole ?? "";
                setState(prev => (
                    {
                        ...prev,
                        discordGroupName: groupName,
                        discordRoleId: discordRoleId
                    }
                ))
            }
        });
    }, [data]);

    const handleView = (type?: string, link?: string) => {
        axios.post(G_API_URL+"vision/view/status",{
            type,
            gg: 1
        }, {
            headers: {
                Authorization: __getToken()
            }
        }).then((response: any) => {
            response = response.data;
            if(response.status && response.view_status) {
                window.location.reload();
            }
        }).catch((error) => {
            console.log(error);
        });
        window.open(link, "_blank");
    }
    
    const handleClick = (action?: string, link: string = "") => {
        switch (action) {
            case "Book Now":    // Register for free workshop
            case "Reschedule":
                window.location.href = G_URL+"vision/booking/microdegree";
                break;
            // case "Join Now":    // Open discord join window & modal
            //     window.open(link, '_blank');
            //     setModalVisible(true);
            //     break;
            // case "Visit Discord":   // Open discord
            //     window.open(link, '_blank');
            //     break;
            // case "Start now":   // Start term 0
            //     window.location.hash = "";
            //     window.location.hash = "learning-path";
            //     break;
            case "Start Learning":
            case "Continue Learning":    // Resume the last lesson
                if(progress?.nextStep) {
                    let link = `/${progress?.nextStep?.child?.programSlug}/learning/${progress?.nextStep?.child?.moduleId}/`;
                    redirectToLearningPlatform(link)
                }
                break;
            case "Join Class":
                window.location.href = link;
                break;
        }
    }

    let redirectToLearningPlatform = (r_path: string) => {
        // Update the value of r_path
        (document.getElementById('r_path') as HTMLInputElement).value = r_path.substr(1);
        (document.getElementById('learning_redirect') as HTMLFormElement).submit();
    }

    const renderSteps = (steps?:Array<IStep>) => {
        const detectedTimeZone = jstz.determine().name();
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
                            {
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
                            }
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

    const renderBanner = (bannerContent?: IBannerContent) => {
        return (
            <div className="banner-content">
                <h2 className="h2-heading">
                    { bannerContent && bannerContent.title }
                </h2>
                {/* <span className="f-d body-small strong-text sub-title">
                    { bannerContent && bannerContent.subTitle }
                </span> */}
                {/* <span className="body-small"> */}
                    { 
                        bannerContent &&
                        bannerContent.description.map((description: any) => {
                            return (
                                <div className="benefit">
                                    <span className="body-regular">
                                        &#128073;
                                    </span>&nbsp;&nbsp;
                                    <span className="body-small">
                                        {description}
                                    </span>
                                </div>
                        )

                        })
                    }
                {/* </span> */}
            </div>
        )
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setState(prev => (
            {...prev,discordUsername: value}
        ));
    }

    const handleSubmit = async () => {
        const headers = {
            headers: {
                Authorization: __getToken()
            }
        }

        const data = {
            username: state.discordUsername,
            programType: "microdegree",
            discordID: ""
        }

        let isUserVerified = false;

        setState(prev => ({ ...prev, isLoading: true }));

        const encodedDiscordUserName = encodeURIComponent(state.discordUsername);
        await axios.get(
            G_API_DISCORD + "verify-user?user_tag=" + encodedDiscordUserName
        ).then((response: AxiosResponse) => {
            const resp = response.data;
            if (resp.status) {
                isUserVerified = true;
                data.discordID = resp.userid;
            } else {
                setState(prev => (
                    {
                        ...prev,
                        isLoading: false
                    }
                ));
                message.error("Please enter a valid username");
            }
        });

        if (isUserVerified) {
            axios.put(G_API_URL + "progress/update/discord/", data, headers)
                .then((response: AxiosResponse) => {
                    const resp = response.data;
                    if (resp.status) {
                        setTimeout(() => {
                            setState(prev => (
                                {
                                    ...prev,
                                    isDiscordInfoUpdated: true,
                                    isLoading: false
                                }
                            ));
                            joinDiscordGroup(data.discordID);
                        }, 1500);
                    } else {
                        setState(prev => (
                            {
                                ...prev,
                                isLoading: false
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
            if (resp.status === 1) {
                setTimeout(() => {
                    setState(prev => ({
                        ...prev,
                        hasJoinedDiscordGroup: true
                    }));
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                }, 3000);
            }
        }).catch(err =>
            console.log(err)
        )
    }

    const renderNextStep = () => {
        // let groupName = "";
        // let discordLink = "";

        // data?.preRequisites?.steps?.forEach(step => {
        //     if (step.altAction === "Visit Discord") {
        //         groupName = step?.groupName ?? "";
        //         discordLink = step?.altActionLink ?? "";
        //     }
        // })


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

        if (progress?.nextStep !== undefined) {
            return (
                <div className="utility-wrapper w-100">
                    <div className="top-pane">
                        <div className="f-d f-vt-m f-h-sb f-v-s in-progress-block">
                            <div>
                                <span className="f-d body-small">
                                    In Progress
                                </span>
                                <span className="f-d topic body-large">
                                    {progress?.nextStep?.moduleName}
                                </span>
                                <span className="f-d body-small">
                                    Module: {progress?.nextStep?.child?.moduleName}
                                </span>
                                <div className="f-d f-v-c action-block body-regular">
                                    <span className="c-pointer go-to-lesson-btn strong-text"
                                        onClick={() => handleClick("Continue Learning",
                                            `/${progress?.nextStep?.child?.programSlug}/learning/${progress?.nextStep?.child?.moduleId}/`)}>
                                        Continue Learning
                                    </span>
                                </div>
                            </div>
                            {/* <span className="f-d  f-v-c discord-navigation-block">
                                <button className="default-pink-btn outline-pink hop-on-discord-btn
                                body-small strong-text c-pointer"
                                    onClick={() => handleClick("Visit Discord",
                                        discordLink)}>
                                    Visit Discord&nbsp;
                                    <span className="squad body-caption">
                                        {"(" + groupName + ")"}
                                    </span>
                                </button>
                            </span> */}
                        </div>
                        {
                            purchase === undefined &&
                            <>
                                <hr/>
                                <div className="pay-now-block">
                                    <h2 className="h2-heading">Start with Frontend Development (Term 1)</h2>
                                    <div className="body-small">Start your hands-on with frontend development. Pay now and get access to term 1, directly.</div>
                                    { showDiscount && <div className="body-small">Pay before <span className="strong-text">{discountUntilDate.toDateString()}</span> and get <span className="strong-text discount-label">10% off!</span> using coupon code: EARLYBIRD.</div> }
                                    <button className="default-pink-btn filled-pink pay-now-btn" onClick={()=>{window.location.href=`${G_URL}payment/microdegree`}}>Pay Now</button>
                                </div>
                            </>
                        }
                    </div>
                    { purchase && slotDescription && liveclassInfo &&
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
                                strong-text c-pointer" onClick={() => {
                                    window.location.href = G_URL + "booking/microdegree"
                                }}>
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
        } else {
            return (<></>);
        }
    }

    // let workshopTime = "";
    let isWorkshopAttended = false;
    if(workshopInfo && workshopInfo.att === "true" && 
    workshopInfo.details && workshopInfo.details.att === "P" &&
    workshopSources?.view_status === 1) {
        isWorkshopAttended = true;
    }
    
    return (
        <>
            <div className="hero-content-wrapper lr-pad-d lr-pad-m 
            tb-pad-d tb-pad-m">
                <h1 className="h1-heading title">
                    Hi { decodedToken && decodedToken.name}. Welcome to <span className="brand-name">ProGrad</span>!
                </h1>
                {
                    <div className="g-d g-col-b-s g-col-1-m 
                    pre-requisites">
                        <div className="left-pane">
                            {
                            !isWorkshopAttended ?
                            <>
                            <div className="getting-started-block">
                                <span className="f-d body-regular 
                                cap-letter strong-text">
                                    { data?.title }
                                </span>
                                <span className="f-d body-small description">
                                    { data?.description }
                                </span>
                            </div>
                            <div className="steps">
                                {renderSteps( data?.preRequisites?.steps )}
                            </div>
                            </> : renderNextStep()
                            }
                        </div>
                        <div className="right-pane">
                            { !isWorkshopAttended && data && renderBanner( data.bannerContent ) }
                        </div>
                    </div>
                }
                {/* {   
                    // showPrerequisites &&
                    <div className="g-d g-col-b-s g-col-1-m pre-requisites">
                        <div className="left-pane">
                            <span className="f-d body-small strong-text">
                                { data && data.title }
                            </span>
                            <div className="steps">
                                { data && data.preRequisites &&
                                !onboarding.attendFreeWorkshop &&
                                renderSteps( data.preRequisites.steps ) }
                                {renderNextStep()}
                            </div>
                        </div>
                        <div className="right-pane">
                            { !isWorkshopScheduled && data && renderBanner( data.bannerContent ) }
                        </div>
                    </div>
                } */}
            </div>

            <Modal
                footer={null}
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
                                                    style={{ color: "var(--pink)" }}
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

            {/* <Modal
                footer={null}
                className="free-workshop-modal"
                centered
                onCancel={() => window.location.reload()}
                destroyOnClose={true}
                visible={isWorkshopModalVisible}
            >
                <InlineWidget url={`${data?.freeWorkshopLink}?name=${decodedToken?.name}&email=${decodedToken?.email}`} />
            </Modal> */}
            <form
                key={'redirect'}
                method="POST"
                action={LEARN_PLAT_URL + 'auth/'}
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
                    value={__getToken()}
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
            <style jsx>{`

                .hero-content-wrapper .title 
                .brand-name {
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
                .steps .step .check-icon.complete {
                    background-color: var(--greenapple);
                    border-radius: var(--peaky-br-full);
                    border: 1px solid var(--greenapple);
                    color: var(--dove);
                    height:25px;
                    width:25px;
                    margin: 0 auto;
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
                .steps .step .info .action-elements .action {
                    color: var(--pink);
                }

                .hero-content-wrapper .pre-requisites 
                .steps .step .info {
                    background-color: var(--smoke);
                    box-shadow: var(--peaky-shadow-high);
                    padding: var(--peaky-pad-24);
                    margin: var(--peaky-gap-24) 0 0;
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

                .hero-content-wrapper .pre-requisites 
                .steps .step .info .prereq-action {
                    margin: var(--peaky-gap-4) 0 0;
                    color: var(--pink);
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
                .right-pane .banner-content .benefit { 
                    margin: var(--peaky-gap-16) 0 0;
                }

                .hero-content-wrapper .utility-wrapper {
                    margin: var(--peaky-gap-32) 0 0;
                }

                .hero-content-wrapper .utility-wrapper
                .top-pane {
                    background-color: var(--smoke);
                    padding: var(--peaky-pad-32);
                }

                .hero-content-wrapper .utility-wrapper
                .top-pane .topic {
                    margin: var(--peaky-gap-4) 0;
                }

                .hero-content-wrapper .utility-wrapper
                .top-pane .action-block {
                    margin: var(--peaky-gap-16) 0;
                }

                .hero-content-wrapper .utility-wrapper
                .top-pane .action-block .go-to-lesson-btn {
                    color: var(--pink);
                }

                .hero-content-wrapper .utility-wrapper
                .top-pane .discord-navigation-block {
                    margin: 0 0 0 var(--peaky-gap-48);
                }

                .hero-content-wrapper .utility-wrapper
                .top-pane .discord-navigation-block 
                .hop-on-discord-btn {
                    color: var(--pink);
                }

                .top-pane .discord-navigation-block 
                .hop-on-discord-btn .discord-icon {
                    width: 32px;
                    margin: 0 var(--peaky-gap-4) 0 0;
                }

                .hero-content-wrapper .utility-wrapper
                .top-pane .discord-navigation-block
                .squad {
                    color: var(--carbon);
                }

                .hero-content-wrapper .utility-wrapper
                .top-pane .pay-now-block {
                    margin: var(--peaky-gap-32) 0 0;
                }

                .hero-content-wrapper .utility-wrapper
                .top-pane .pay-now-block .discount-label{
                    padding: 5px 10px;
                    background-color: var(--discount);
                }

                .hero-content-wrapper .utility-wrapper
                .top-pane .pay-now-block .pay-now-btn{
                    margin: var(--peaky-gap-24) 0 0;
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

                .hero-content-wrapper .workshop-block {
                    padding: var(--peaky-gap-32);
                    background-color: var(--smoke);
                }

                .hero-content-wrapper .getting-started-block 
                .description {
                    margin: var(--peaky-gap-8) 0 0;
                    white-space: pre-wrap;
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
                    .hero-content-wrapper .pre-requisites .left-pane {
                        // order: 2;
                        width: 100%;
                    }

                    .hero-content-wrapper .pre-requisites .right-pane {
                        margin: var(--peaky-gap-48) 0 0;
                    }

                    .hero-content-wrapper .pre-requisites 
                    .right-pane .banner-content {
                        margin: 0 0 var(--peaky-gap-32);
                    }

                    .hero-content-wrapper .pre-requisites .steps 
                    .step .info .prereq-action {
                        margin: 0;
                    }

                    .hero-content-wrapper .utility-wrapper {
                        width: 100%;
                    }

                    .hero-content-wrapper .utility-wrapper 
                    .top-pane .discord-navigation-block {
                        margin: 0 0 var(--peaky-gap-24);
                    }
                }

                @media screen and (min-width: 768px) and (max-width: 1023px) 
                and (orientation: portrait) {
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