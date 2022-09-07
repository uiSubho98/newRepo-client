import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import TicketIcon from "../../assets/icons/svg-icons-v2/ticket.svg";
import { check_login } from "../../utils/login.util";
import { useHistory } from "react-router";
import axios from "axios";
import { G_API_URL, G_URL } from "../../constants/constants";
import { __getEmail, __getToken } from "../../utils/user-details.util";
import Spinner from "../../components/Spinner/spinner";
import moment from "moment-timezone";
import { IWorkshopTime } from "../../components/Workshops/workshops";
import { Popover } from "antd";
import { DownOutlined } from "@ant-design/icons";
import ReactPixel from 'react-facebook-pixel';
import { getGATag } from "../../utils/common.util";

interface IState {
    title?: string;
    description?: string;
    startTime?: number;
    endTime?: number;
    slug?: string;
    joinUrl?: string;
    loading: boolean;
    location: string;
    workshopTimes: Array<IWorkshopTime>;
    attendanceLimit?: string;
}

const WorkshopConfirmation = () => {

    const history = useHistory();

    const defaultState = {
        loading: false,
        location: window.location.href,
        workshopTimes: []
    }

    const [state, setState] = useState<IState>(defaultState);

    useEffect(() => {
        if(check_login()) {
            let searchQuery = window.location.search;
            let urlParams = new URLSearchParams(searchQuery);
            let workshopKey = urlParams.get('workshopKey');
            if(workshopKey) {
                setState(prev => ({
                    ...prev,
                    loading: true
                }));
                axios.get(G_API_URL + "workshops/registration/info", {
                    params: {
                        workshopKey: workshopKey
                    },
                    headers: {
                        Authorization: __getToken()
                    }
                }).then(response => {
                    response = response.data;
                    if(response.status === 1) {
                        setState(prev => ({
                            ...prev,
                            ...response.data,
                            loading: false
                        }));

                        // Send tracking info
                        const platformEnv = process.env.REACT_APP_PLATFORM;
                        let email = __getEmail();
                        if (platformEnv === 'prod') {
                            const tag = getGATag("workshop_registration", "subscribers", "Workshop", 1);
                            document.body.appendChild(tag);

                            // Send Free Experience Registered Event to Pixel
                            ReactPixel.track('Marketing Workshop Registrations', {
                                value: email,
                                content_category: "Workshop"
                            });

                            // Google Ads Events
                            const s1 = document.createElement("script");
                            s1.type = "text/javascript";
                            s1.async = true;
                            s1.innerHTML = "gtag('event', 'conversion', { 'send_to': 'AW-439710104/3qDeCKmys5cCEJjj1dEB','value': " + email + " });";
                            document.body.appendChild(s1);
                        }
                    } else {
                        history.push({
                            pathname: "/"
                        });
                    }
                })
            } else {
                history.push({
                    pathname: "/"
                });
            }
        } else {
            history.push({
                pathname: "/"
            });
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    
    const { workshopTimes } = state;

    const addToCalendar = () => {
        if(state.title && state.joinUrl && 
        state.startTime && state.endTime) {
            if(state.description === undefined) {
                state.description = ""
            }

            let startTime = new Date(state.startTime * 1000).toISOString().split(new RegExp("[" + ["-",":","."].join("") + "]", "g")).join("");
            let endTime = new Date(state.endTime * 1000).toISOString().split(new RegExp("[" + ["-",":","."].join("") + "]", "g")).join("");
            let description = state.description + ( state.description? " " : "" ) + "Join the workshop using this link";
            var calendarUrl = "";
            if(workshopTimes.length === 1) {
                calendarUrl = `https://calendar.google.com/calendar/u/0/r/eventedit?dates=${startTime}/${endTime}&text=${state.title.split(" ").join("+")}&details=${description.split(" ").join("+") + "+-+" + encodeURIComponent(state.joinUrl)}&location=${encodeURIComponent(state.location)}`;
            } else {
                let wtTimes = workshopTimes.sort((a,b) => a.endTime - b.endTime);
                let et = moment(wtTimes[wtTimes.length - 1].endTime * 1000);
                et = moment(et.format("MM-DD-YYYY"), "MM-DD-YYYY")
                let recurUntil = et.format('YYYYMMDD[T000000Z]');
                let freq = "";
                if ((workshopTimes[1].startTime - workshopTimes[0].startTime) === 84600) {
                    freq = "DAILY";
                } else if ((workshopTimes[1].startTime - workshopTimes[0].startTime) === 604800) {
                    freq = "WEEKLY";
                } else {
                    freq = "MONTHLY";
                }

                calendarUrl = `https://calendar.google.com/calendar/u/0/r/eventedit?dates=${startTime}/${endTime}&text=${state.title.split(" ").join("+")}&details=${description.split(" ").join("+") + "+-+" + encodeURIComponent(state.joinUrl)}&location=${encodeURIComponent(state.location)}&&recur=RRULE:FREQ=${freq};UNTIL=${recurUntil}`;
            }
            window.open(calendarUrl, "_blank");
        }
    }


    const wTimes = workshopTimes.map((wt: IWorkshopTime, idx: number) => {
        return (
            <div key={idx}>{moment(wt.startTime * 1000).utcOffset("+05:30").format('DD MMMM Y[,] h:mm A')} to {moment(wt.endTime * 1000).utcOffset("+05:30").format('h:mm A [IST]')}</div>
        )
    });
    
    return (

        <>
            {
                !state.loading ?
                <Layout footer={true}>
                    <div className="tb-pad-d tb-pad-m lr-pad-d lr-pad-m
                    g-d g-h-c workshop-confirmation-wrapper">
                        <h1 className="font-heading text-xl">
                            You’re in!
                        </h1>
                        <span className="f-d description text-faded-2 text-c-m">
                            Your seat is confirmed for this workshop. The details have also been sent to your email
                        </span>
                        <div className="workshop-info">
                            <div className="g-d g-col-2 g-col-1-m g-v-c">
                                <div className="f-d f-v-c">
                                    <img src={TicketIcon} className="ticket-icon" alt="ticket-icon" />
                                    <span className="font-heading text-medium strong-text
                                    title">
                                        { state.title }
                                    </span>
                                </div>
                                <div className="g-d g-h-e details-btn-wrapper">
                                    <span className="details-btn text-primary c-pointer"
                                    onClick={() => window.open(G_URL + "workshops/" + 
                                    state.slug, "_blank")}>
                                        Workshop details
                                    </span>
                                </div>
                            </div>
                            {
                                workshopTimes.length === 1 && 
                                <>
                                    <div className="g-d g-col-2 g-col-1-m">
                                        <div className="f-d f-v-c">
                                            <i className="icon icon-calendar"></i>
                                            <span className="font-heading text-medium">
                                                { 
                                                    state.startTime && 
                                                    moment(state.startTime * 1000).tz("asia/kolkata").format("DD MMM YYYY, dddd")
                                                }
                                            </span>
                                        </div>
                                        <div className="f-d f-v-c timings">
                                            <i className="icon icon-clock"></i>
                                            <span className="font-heading text-medium">
                                                { 
                                                    state.startTime && 
                                                    moment(state.startTime * 1000).tz("asia/kolkata").format("hh:mm A")
                                                } IST
                                            </span>
                                        </div>
                                    </div>
                                </>
                            }
                            {
                                workshopTimes.length > 1 &&
                                <div className="g-d g-col-2 g-col-1-m">
                                    <div className="f-d f-v-c">
                                        <i className="icon icon-calendar"></i>
                                        <span className="font-heading text-medium nowrap">
                                            {workshopTimes.length} sessions 
                                            <Popover placement="bottom" content={wTimes} trigger="click" className="caret-down text-small">
                                                <DownOutlined />
                                            </Popover>
                                        </span>
                                    </div>
                                </div>
                            }
                            <div className="g-d g-col-2 g-col-1-m g-gap-16">
                                <button className="default-blue-btn w-100"
                                onClick={() => window.open(state.joinUrl, "_blank")}>
                                    Join Workshop
                                </button>
                                <button className="default-black-btn w-100"
                                onClick={() => addToCalendar()}>
                                    Add to calendar
                                </button>
                            </div>
                        </div>
                        {
                            state.attendanceLimit &&
                            <div className="g-d g-h-c w-60 important-info">
                                <h3 className="text-medium strong-text text-faded">
                                    IMPORTANT
                                </h3>
                                <span className="f-d text-regular text-faded
                                text-c-d">
                                    This is a free workshop and has a maximum live capacity of {state.attendanceLimit} students. 
                                    Entry is strictly based on first-come first-serve basis only. 
                                </span>
                            </div>
                        }
                    </div>
                    <style jsx>{`
                        .workshop-confirmation-wrapper .description {
                            margin: var(--peaky-gap-8) 0 0;
                        }

                        .workshop-confirmation-wrapper .workshop-info {
                            background-color: var(--primary-bg);
                            margin: var(--peaky-gap-64) 0;
                            padding: var(--peaky-pad-32);
                            width: 48%;
                        }

                        .workshop-confirmation-wrapper .workshop-info > 
                        div:first-of-type .ticket-icon {
                            background-color: var(--secondary-bg);
                            border-radius: var(--peaky-br-4);
                            padding: var(--peaky-pad-16) 12px;
                            margin: 0 var(--peaky-gap-32) 0 0;
                        }

                        .workshop-confirmation-wrapper .workshop-info > 
                        div:first-of-type .title {
                            line-height:20px;
                        }

                        .workshop-confirmation-wrapper .workshop-info > 
                        div:first-of-type .details-btn {
                            text-decoration: underline;
                        }

                        .workshop-confirmation-wrapper .workshop-info > 
                        div:nth-of-type(2) {
                            margin: var(--peaky-gap-32) 0;
                            border-top: 2px solid var(--secondary-bg); 
                            border-bottom: 2px solid var(--secondary-bg); 
                        }

                        .workshop-confirmation-wrapper .workshop-info > 
                        div:nth-of-type(2) i {
                            background-color: var(--secondary-bg);
                            border-radius: var(--peaky-br-4);
                            color: rgba(255, 255, 255, 0.87);
                            font-size: 21px;
                            padding: 12px;
                            margin: 0 var(--peaky-gap-32) 0 0;
                        }


                        .workshop-confirmation-wrapper .workshop-info > 
                        div:nth-of-type(2) > div {
                            padding: var(--peaky-pad-32) 0;
                        }

                        .workshop-confirmation-wrapper .workshop-info > 
                        div:nth-of-type(2) .timings {
                            border-left: 2px solid var(--secondary-bg); 
                            padding: 0 0 0 var(--peaky-pad-32);
                        }

                        .workshop-confirmation-wrapper .workshop-info .caret-down {
                            margin-left: var(--peaky-gap-8);
                        }

                        .ant-popover-arrow {
                            display: none;
                        }
                        .ant-popover-inner {
                            border-radius: 0;
                        }
                        .ant-popover-inner-content {
                            background-color: var(--spider);
                            color: var(--dove);
                        }
                        .ant-popover-inner-content > div:not(:last-child) {
                            margin-bottom: var(--peaky-gap-8);
                        }
                        
                        .workshop-confirmation-wrapper .important-info > span {
                            margin: var(--peaky-gap-16) 0 0;
                        }

                        .nowrap {
                            white-space: nowrap;
                        }
                        
                        @media only screen and (max-device-width: 760px) {
                            .workshop-confirmation-wrapper .workshop-info {
                                padding: var(--peaky-pad-32) var(--peaky-pad-16);
                                width: 100%;
                            }

                            .workshop-confirmation-wrapper .workshop-info > div:nth-of-type(2) 
                            .timings {
                                border-left: unset;
                                padding: 0 0 var(--peaky-pad-32) 0;
                            }
                            .workshop-confirmation-wrapper .workshop-info
                            .details-btn-wrapper {
                                margin: var(--peaky-gap-16) 0 0;
                            }

                            .workshop-confirmation-wrapper .important-info {
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

export default WorkshopConfirmation;