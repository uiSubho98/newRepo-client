import React, { useEffect, useState } from "react";
import CompletionStarIcon from "../../assets/icons/svg_icons/completion_star.svg";
import { G_API_URL, G_URL } from "../../constants/constants";
import { IMilestoneBlock, IOngoing, IWorkshopInfo } from "../../interfaces/dashboard";
import { __getToken, __getUID } from "../../utils/user-details.util";
import moment from "moment-timezone";
import { Progress } from "antd";
//@ts-ignore
import { useHistory } from "react-router-dom";
import axios from "axios";
import { openNotification } from "../../utils/common.util";
import { isMobile } from "react-device-detect";

interface IProps {
    mode: number;
    ongoing?: IOngoing;
    milestone?: IMilestoneBlock;
    hasPurchased?: boolean;
    workshopInfo?: IWorkshopInfo;
    liveclassInfo?: any;
    isSlackInviteGrabbed: boolean;
    isTrialActivated?: boolean;
    redirect: Function;
}

interface IEvent {
    title: string;
    description: string;
    link: string;
    startTime: any;
    endTime: any;
    active: boolean;
    location: string;
}

const Milestone = (props: IProps) => {

    const { mode, ongoing, milestone, hasPurchased, workshopInfo, liveclassInfo, isSlackInviteGrabbed, isTrialActivated, redirect } = props;
    
    const history = useHistory();

    const isWorkshopScheduled = workshopInfo && workshopInfo.att === "true";

    const [event, setEvent] = useState<IEvent>({
        title: 'ProGrad Live Code-along Class',
        description: 'Join the class using this link',
        link: "https://prograd.org/",
        startTime: new Date().toISOString(),
        endTime: new Date().toISOString(),
        active: false,
        location: G_URL + "learning-dashboard/" + (mode === 0 ? "microdegree" : "bootcamp")
    });

    useEffect(() => {
        if( hasPurchased || mode !== 0 || isTrialActivated === false) {
            if(liveclassInfo) {
                let startTime = new Date(liveclassInfo.slot.split("-")[0]);
                let endTime = new Date(liveclassInfo.slot.split("-")[0]);
                endTime.setHours(endTime.getHours() + 2);
                setEvent(prev => ({
                    ...prev,
                    startTime: startTime.toISOString().split(new RegExp("[" + ["-",":","."].join("") + "]", "g")).join(""),
                    endTime: endTime.toISOString().split(new RegExp("[" + ["-",":","."].join("") + "]", "g")).join(""),
                    link: G_URL + "student/join/liveclass/" + 
                    liveclassInfo.slot_id + "/" + __getUID(),
                    active: true
                }))
            }
        } else {
            if(workshopInfo && isWorkshopScheduled) {
                let details = workshopInfo?.details;
                
                if(details && !details.att) {
                    let startTime = new Date(details.slot_ts * 1000);
                    let endTime = new Date(details.slot_ts * 1000);
                    endTime.setHours(endTime.getHours() + 2);
                    setEvent(prev => ({
                        ...prev,
                        startTime: startTime.toISOString().split(new RegExp("[" + ["-",":","."].join("") + "]", "g")).join(""),
                        endTime: endTime.toISOString().split(new RegExp("[" + ["-",":","."].join("") + "]", "g")).join(""),
                        link: G_URL + "student/join/workshop/" + 
                        details?.slot_id + "/" + __getUID(),
                        active: true
                    }))
                }
            }
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    // const isWorkshopAttended = isWorkshopScheduled && workshopInfo?.details && 
    // workshopInfo.details.att === "P";
    let isActive = 0;
    let isLiveclassInActive = false;

    const renderSteps = () => {

        const viewRecordings = () => {
            if(!isMobile) {
                history.push("/recordings");
            } else {
                let program = mode === 0 ? "microdegree" : "bootcamp";
                history.push("/recordings#"+program);
            }
        }

        const addToCalendar = () => {
            const calendarUrl = `https://calendar.google.com/calendar/u/0/r/eventedit?dates=${event.startTime}/${event.endTime}&text=${event.title.split(" ").join("+")}&details=${event.description.split(" ").join("+") + "+-+" + encodeURIComponent(event.link)}&location=${encodeURIComponent(event.location)}`;
            window.open(calendarUrl, "_blank");
        }

        const goToSlack = (link: string) => {
            if(!isSlackInviteGrabbed) {
                axios.post(G_API_URL + "/tracker/grab/invite/",{program: mode + 1}, {
                    headers: {
                        Authorization: __getToken()
                    }
                }).then((response: any) => {
                    response = response.data;
                    if(response.status === 1) {
                        window.open(link, "_blank");
                        window.location.reload();
                    } else {
                        openNotification('fail', 'Something went wrong!');
                    }
                })
            } else {
                window.open(link, "_blank");
            }
        }

        const handleClick = (id:number, link:string) => {

            switch (id) {
                case 0:
                    window.location.href = link;
                    break;
                case 1:
                    redirect("dashboard/?p="+ongoing?.program)
                    break;
                case 2:
                    redirect("dashboard/?p="+ongoing?.programFop)
                    break;
                case 3:
                    goToSlack(link)
                    break;
                default:
                    break;
            }

        }

        return milestone?.steps.map((step, key) => {

            if(step.id === 0) {
                let details = workshopInfo?.details;
                if( hasPurchased || mode !== 0 || 
                isTrialActivated === false) {
                    step.title = "Upcoming live sessions";
                    if(!liveclassInfo) {
                        isLiveclassInActive = true;
                        step.info = "There are no sessions scheduled at the moment.";
                        step.action = "";
                        isActive = 3;
                    } else {
                        step.info = "Your session is scheduled for\n" +
                        liveclassInfo.slot.split("-")[0] + " IST (UTC+5:30)";
                        step.link = G_URL + "student/join/liveclass/" + 
                        liveclassInfo.slot_id + "/" + __getUID();
                        step.action = "Join Class";
                        isActive = 1;
                    }

                } else {
                    if(workshopInfo) {
                        if(isWorkshopScheduled && details) {
                            let schedule_time = moment(details.slot_ts * 1000)
                            .tz("Asia/Calcutta")
                            .format("DD MMM YYYY, h:mm A");
                            if(details.att) {
                                step.action = "";
                                step.info = "You’ve already attended the session.";
                                isActive = 2
                            } else if(!details.att) {
                                step.action = "Join Class"
                                step.link = G_URL + "student/join/workshop/" + 
                                details.slot_id + "/" + __getUID();
                                step.info = "Your class is scheduled for\n" + 
                                schedule_time + " IST (UTC+5:30)";
                                isActive = 1;
                            }
                        } else {
                            step.action = "Reschedule";
                            step.info = "Reschedule your free session at a time convenient for you.";
                            step.link = G_URL + "vision/booking/microdegree";
                        } 
                    } else {
                        step.link = G_URL + "vision/booking/microdegree";
                    }
                }
            } 
            
            if(step.id === 1 && mode === 0) {
                step.info = "Finish your lessons on ‘" + ongoing?.topic + "’.";
            }


            return (
                <div className="f-d f-ht step-wrapper" key={key}>
                    <div className="joint"></div>
                    <div className="step w-40">
                        <span className="f-d heading text-medium strong-text">
                            { step.title }
                        </span>
                        <span className="f-d text-regular description">
                            <span>
                                <span className="info">{ step.info }</span>
                                {
                                    step.id === 0 && isLiveclassInActive &&
                                    <>
                                        &nbsp;
                                        <span className="c-pointer view-recordings-btn"
                                        onClick={() => viewRecordings()}>
                                            View past recordings
                                        </span>
                                    </>
                                }
                                {
                                    step.id === 0 && event.active &&
                                    <>
                                        &nbsp;
                                        <span className="f-d c-pointer add-to-calendar-btn"
                                        onClick={() => addToCalendar()}>
                                            Add to calendar
                                        </span>
                                    </>
                                }
                            </span>
                        </span>
                        {
                            step.id === 1 &&
                            <Progress 
                                className="progress-bar"
                                percent= { ongoing?.completion } 
                                size="small" 
                                status="active" 
                                strokeColor="var(--pekachu)" 
                            />
                        }
                    </div>
                    {
                        step?.action &&
                        <div className="f-d f-h-e f-v-c action-block w-30">
                            <span className="f-d f-v-c text-regular 
                            strong-text cap-letter c-pointer" 
                            onClick={() => handleClick(step?.id, step?.link)}>
                                { step.action } <i className="icon icon-chevron-right"></i>
                            </span>
                        </div>
                    }
                    <div className="horizontal-line-1"></div>
                </div>
            )
        })
    }

    let description = milestone?.description;
    let title = milestone?.title;
    if(mode === 0) {
        title = `${ milestone?.title }: Complete ${ ongoing?.name }`;
        description =  `Unlock certificate of completion in ${ ongoing?.name }: ${ongoing?.topic} ${milestone?.description}`;
    }

    if(event.active) {
        isActive = 1;
    }

    return (
        <> 
            <div className="milestone-content-wrapper">
                <div className="f-d f-ht">
                    <div 
                        className="bg-image-full star-icon w-10"
                        style={{ 
                        backgroundImage: 'url('+ CompletionStarIcon +')' 
                    }}>
                    </div>
                    <div className="milestone-info w-90">
                        <span className="heading text-big strong-text">
                            { title }
                        </span>
                        <span className="f-d text-regular description">
                            { description }
                        </span>
                    </div>
                </div>
                { renderSteps() }
                <div className={`vertical-line ${ isActive ? "mode-" + isActive : "" }`}></div>
            </div>
            <style jsx>{`

                .milestone-content-wrapper {
                    position: relative;
                    width: 85%;
                    margin: 0 0 84px;
                }

                .milestone-content-wrapper .star-icon {
                    height: 50px;
                }

                .milestone-content-wrapper .milestone-info {
                    margin-left: 20px;
                }

                .milestone-content-wrapper .milestone-info
                .heading,
                .milestone-content-wrapper .step
                .heading{
                    font-family: Inconsolata;
                }

                .milestone-content-wrapper .milestone-info
                .description,
                .milestone-content-wrapper .step
                .description .info {
                    opacity: 0.54;
                }

                .milestone-content-wrapper .step
                .description .info {
                    white-space: pre-wrap;
                }

                .milestone-content-wrapper .step
                .description .view-recordings-btn,
                .milestone-content-wrapper .step
                .description .add-to-calendar-btn {
                    text-decoration: underline;
                    color: var(--primary);
                }

                .milestone-content-wrapper .step-wrapper {
                    margin: var(--peaky-gap-64) 0 0;
                }

                .milestone-content-wrapper .step {
                    margin:  0 0 0 120px;
                }

                .milestone-content-wrapper .vertical-line {
                    height: 77.2%;
                    width: 2px;
                    background-color: rgba(255, 255, 255, 0.1);
                    position: absolute;
                    top: 13%;
                    left: 5%;
                }

                .milestone-content-wrapper .vertical-line.mode-1{
                    height: 76.2%;
                }

                .milestone-content-wrapper .horizontal-line-1,
                .milestone-content-wrapper .horizontal-line-2,
                .milestone-content-wrapper .horizontal-line-3 {
                    height: 2px;
                    width: 70px;
                    background-color: rgba(255, 255, 255, 0.1);
                    position: absolute;
                    left: 5%;
                    margin-top: 1.8%;
                }

                .milestone-content-wrapper .action-block {
                    // margin: 0 0 0 auto;
                }

                .milestone-content-wrapper .action-block
                .icon {
                    font-size: 21px;
                    color: var(--primary);
                }

                .ant-progress-text {
                    color: var(--dove);
                }

                .ant-progress-line {
                    width: 200px;
                }

                .ant-progress-bg {
                    height: 4px!important;
                }

                .ant-progress-inner {
                    background-color: var(--primary-bg);
                }

                @media only screen and (max-device-width: 760px) {
                    .milestone-content-wrapper {
                        margin-top: 0;
                        width: 100%;
                    }

                    .milestone-content-wrapper .step-wrapper {
                        display: grid;
                    }

                    .milestone-content-wrapper .step
                    .description .info {
                        white-space: unset;
                    }

                    .milestone-content-wrapper .step,
                    .milestone-content-wrapper .action-block {
                        margin: 0 0 0 25%;
                    }

                    .milestone-content-wrapper .step {
                        width: 75%;
                    }

                    .milestone-content-wrapper .action-block {
                        justify-content: unset;
                        margin-top: 5%;
                        width: unset;
                    }

                    .milestone-content-wrapper .vertical-line {
                        top: 8%;
                        height: 72.5%;
                    }

                    .milestone-content-wrapper .vertical-line.mode-1 {
                        height: 73%;
                    }

                    .milestone-content-wrapper .vertical-line.mode-2{
                        height: 71.5%;
                    }

                    .milestone-content-wrapper .vertical-line.mode-3{
                        height: 72%;
                    }

                    .milestone-content-wrapper .horizontal-line-1, 
                    .milestone-content-wrapper .horizontal-line-2, 
                    .milestone-content-wrapper .horizontal-line-3 {
                        margin-top: 3.5%;
                        width: 55px;
                    }
                }

            `}</style>
        </>
    )
}

export default Milestone;