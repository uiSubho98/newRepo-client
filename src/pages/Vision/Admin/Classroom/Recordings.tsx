import { Divider, Button, Icon } from "antd";
import React, { useEffect, useState} from "react";
import VisionLayout from "../../../../components/Vision/Layout/vision_layout";

import {
    formatDate,
    getCurDate,
    getEventsData,
    getMonthLimits,
    nextMonth,
    prevMonth,
} from "../MTH-LIST/mth_utils";
import moment from "moment";
import {
    sortDates,
    displayTime,
    displayGG,
} from "../../../../components/Vision/scheduler/MTH-LIST/mth_utils";
// @ts-ignore
import jwtDecode from "jwt-decode";
import { __getToken } from "../../../../utils/user-details.util";
import { BBB_API_URL, G_URL } from "../../../../constants/constants";
import MTHHeader from "../../../../components/Vision/scheduler/MTH-LIST/mthHeader";
import Axios from "axios";
import { openNotification } from "../../../../utils/common.util";

interface IState {
    events: any;
    date: any;
}

const VisionRecording = (props: any) => {
    const defaultState = {
        events: [],
        date: null,
    };

    const { type } = props;
    const { slot_type: mode } = props.match.params;

    const [state, setState] = useState<IState>(defaultState);
    // const [slotType, setSlotType] = useState<Number>( mode === "workshop" ? 1 : 2 );
    const slotType = mode === "freeclass" ? 1 : 2;

    const initRecording = async(slot_type: Number = slotType) => {
        let day_limits = getMonthLimits(new Date());
        let events = await getEventsData({
            sdt: day_limits["sdt"],
            edt: day_limits["edt"],
            type: type,
            slot_type: slot_type
        });

        let date = getCurDate();

        setState({ date, events: events });
    }

    useEffect(() => {
        initRecording();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type]);

    const getRecordings = async (meet_id: any, type: any = "open") => {
        const config = {
            params: {
                meetingID: meet_id,
            },
        };
        
        if (type === "open") {
            let record_url = G_URL + "vision/" + props.type + "/" + mode + "/recordings/" + meet_id;
            window.open(record_url, "_blank");
            return;
        }

        let response = await Axios.get(BBB_API_URL + "record/getRecordings/", config);

        if (type === "copy") {
            if (response.data.data) {
                let record_details = response.data.data.response;
                if (record_details) {
                    if (record_details["recordings"] && record_details["recordings"][0]) {
                        let record_url = record_details["recordings"][0];
                        record_url = record_url["recording"][0];
                        // record_url = G_URL + "recording/player/" + record_url["internalMeetingID"];
                        record_url = record_url["playback"][0];
                        record_url = record_url["format"][0]["url"][0];
                        navigator.clipboard.writeText(record_url);
                        openNotification("success", "Rec. Link Copied", 6);
                    } else if (record_details["message"] && record_details["message"][0]) {
                        let message = record_details["message"][0];
                        openNotification("fail", message, 6);
                    }
                }
            }
        }
    };

    const renderEachEvents = (event_obj: any) => {
        let { sdt, edt, gg, slot_type, status, slot_id, mentors, bookings, size } = event_obj;
        let batch_size = size;
        bookings = bookings.length;

        if (status === 1) {
            let seats_booked = 0;

            return mentors.map(({ userName, uid }: any, idx: any) => {
                const { type } = props;
                let grid_class = "g-col-6";

                if (type === "mentor") {
                    if(uid !== jwtDecode(__getToken()).uid) return null;
                    else {
                        let mentor_position = mentors.map((mentor: any) => 
                        mentor.uid).indexOf(uid);
                        bookings = bookings - (batch_size * mentor_position);
                    }
                }

                if (bookings >= batch_size) seats_booked = batch_size;
                else if (bookings <= 0) seats_booked = 0;
                else if (bookings < batch_size) seats_booked = bookings;

                // if (type === "mentor" && uid !== jwtDecode(__getToken()).uid) return null;
                let meet_id = slot_id + uid;

                let response = (
                    <div className={`g-d ${grid_class} date-obj f-v-c`} key={slot_id + uid}>
                        <div className="time">{displayTime(sdt, edt)}</div>
                        <div className="f-d f-h-c">{displayGG(gg, slot_type)}</div>
                        <div className="f-d f-h-c">{userName}</div>
                        <div className="f-d f-h-c">
                            {seats_booked} / {batch_size}
                        </div>
                        {/* <div className="link">{join_link}</div> */}
                        <div className="f-d f-h-c">
                            <Button id="join-btn" onClick={() => getRecordings(meet_id)}>
                                Recording
                            </Button>
                        </div>

                        <div className="f-d f-h-c">
                            <Button
                                id="copy-btn"
                                onClick={() => getRecordings(meet_id, "copy")}
                            >
                                <Icon
                                    type="copy"
                                    style={{ fontSize: 20, color: "var(--dove)" }}
                                    theme={"filled"}
                                />
                            </Button>
                        </div>
                    </div>
                );

                bookings = bookings - batch_size;

                return response;
            });
        }
    };

    const renderDayEvents = (date: any) => {
        const { events } = state;
        let day_events = events[date];

        let response = [];

        day_events.sort((day1: any, day2: any) => (day1.sdt > day2.sdt ? 1 : day2.sdt > day1.sdt ? -1 : 0));

        response = day_events.map((e_obj: any) => {
            return renderEachEvents(e_obj);
        });

        return response;
    };

    const renderEvents = () => {
        const { events } = state;

        let dates = Object.keys(events);
        let result: any = [];

        if (dates.length > 0) {
            dates = sortDates(dates, 1);
            result = dates.map((date) => {
                return (
                    <div className="date-wrapper" id={date} key={date}>
                        <div className="date-header">{moment(date).format("ddd, DD MMM YYYY")}</div>
                        <div className="date-body">{renderDayEvents(date)}</div>
                        <Divider />
                    </div>
                );
            });
        }

        return result;
    };

    const handleMonthChange = async (type: any) => {
        const { date } = state;

        if (type === "prev") {
            let mod_date = prevMonth(date);
            let month_limits = getMonthLimits(mod_date);
            let events = await getEventsData({ ...month_limits, slot_type: slotType });
            setState(prev => ({ ...prev, date: mod_date, events: events, month_limits: month_limits }));
        }

        if (type === "next") {
            let mod_date = nextMonth(date);
            let month_limits = getMonthLimits(mod_date);
            let events = await getEventsData({ ...month_limits, slot_type: slotType });
            setState(prev => ({ ...prev, date: mod_date, events: events, month_limits: month_limits }));
        }
    };

    // const handleFilter = (key: string) => {
    //     let slotType = parseInt(key);
    //     setSlotType( slotType );
    //     initRecording( slotType );
    // }


    let grid_class = "g-col-6";
    // let slot_type = slotType === 1 ? "Workshop" : 
    // slotType === 2 ? "Live Class" : "All";
    const { date } = state;

    // const menu = (
    //     <Menu onClick={(e) => handleFilter(e.key)}>
    //         <Menu.Item key="1">
    //             Workshop
    //         </Menu.Item>
    //         <Menu.Item key="2">
    //             Live Class
    //         </Menu.Item>
    //         <Menu.Item key="3">
    //             All
    //         </Menu.Item>
    //     </Menu>
    // );

    return (
        <>
            <VisionLayout slot_type={mode}>
                <div className="classroom-wrapper lr-pad-d" id="record-wrap">
                    <div className= "f-d f-v-c f-h-sb header">
                        <MTHHeader
                            date={formatDate(date)}
                            handleMonthChange={handleMonthChange}
                        />
                        {/* <Dropdown overlay={menu} placement="bottomCenter">
                            <div className="f-d f-v-c filter-btn c-pointer">
                                <Icon type="filter" theme="filled" />
                                <span className="filter-slot-btn">{slot_type}</span>
                            </div>
                        </Dropdown> */}
                    </div>
                    <div></div>
                    <Divider />
                    <div className="body">
                        <div className={`g-d ${grid_class}`}>
                            <div>Timing</div>
                            <div className="f-d f-h-c">Program</div>
                            <div className="f-d f-h-c">Mentor</div>
                            <div className="f-d f-h-c">Seats Booked</div>
                            <div className="f-d f-h-c">Recording</div>
                            <div className="f-d f-h-c">Record Link</div>
                        </div>
                        {renderEvents()}
                    </div>
                </div>
                <style jsx>{`
                    #record-wrap .mth-header {
                        padding: unset;
                    }

                    #record-wrap .show-calendar {
                        display: none;
                    }

                    .classroom-wrapper .title {
                        font-size: 32px;
                        font-weight: 500;
                    }

                    .classroom-wrapper .date-wrapper {
                        margin-top: 2rem;
                    }

                    .classroom-wrapper .date-wrapper .date-obj {
                        margin-top: 32px;
                    }

                    .classroom-wrapper .date-wrapper .date-header {
                        font-size: 24px;
                        font-weight: 500;
                    }

                    .classroom-wrapper #copy-btn {
                        border-radius: 50%;
                        height: 40px;
                        width: 40px;
                        background-color: var(--pink);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border: none;
                    }

                    .classroom-wrapper .header .filter-btn {
                        background-color: #2C3E50;
                        color: var(--dove);
                        padding: 12px var(--peaky-pad-16);
                        border-radius: var(--peaky-br-4);
                        height: 35px;
                    }

                    .classroom-wrapper .header .filter-btn .filter-slot-btn {
                        margin: 0 0 0 var(--peaky-gap-8);
                    }
                `}</style>
            </VisionLayout>
        </>
    );
}

export default VisionRecording;
