import { Divider, Icon } from "antd";
import React, { useEffect, useState } from "react";
import VisionLayout from "../../../../components/Vision/Layout/vision_layout";
import { resetTime } from "../../../../components/Vision/scheduler/utils";
import { getEventsData, getMonthLimits } from "../MTH-LIST/mth_utils";
import moment from "moment";
import {
    sortDates,
    displayTime,
    displayGG,
} from "../../../../components/Vision/scheduler/MTH-LIST/mth_utils";
// @ts-ignore
import jwtDecode from "jwt-decode";
import { __getToken } from "../../../../utils/user-details.util";
import { G_HOME_URL } from "../../../../constants/constants";
import { LinkShare } from "../../../../components/Vision/MediaShare";

interface IState {
    events: any;
}

const VisionClassroom = (props: any) => {
    const defaultState = {
        events: [],
    };

    const { slot_type: mode } = props.match.params;

    const [state, setState] = useState<IState>(defaultState);
    const slotType = (mode === "freeclass" ? 1 : 2);
    const {type, show} = props;

    const initClassroom = async (slot_type: Number = slotType) => {
        let today_date: any = new Date();
        today_date = resetTime(today_date).valueOf();
        let end_date = getMonthLimits(new Date());

        today_date = Math.round(today_date / 1000);
        // end_date = Math.round(end_date / 1000);

        let events = await getEventsData({
            sdt: today_date,
            edt: end_date["edt"],
            type: type,
            slot_type: slot_type
        });

        setState(prev => ({ ...prev, events: events }));
    }

    useEffect(() => {
        initClassroom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type])

    const renderEachEvents = (event_obj: any) => {
        let { sdt, edt, gg, slot_type, status, slot_id, mentors, bookings, size } = event_obj;
        let batch_size = size;
        bookings = bookings.length;

        if (status === 1) {
            let seats_booked = 0;

            return mentors.map(({ userName, uid }: any, idx: any) => {

                const { type } = props;
                let grid_class = "g-col-6";
                let grid_class1 = "g-col-5";
                let join_link = null;
                let program = "freeclass";

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

                if(slot_type === 2) program = "liveclass";

                join_link = G_HOME_URL + "mentor/join/" + program + "/" + slot_id + "/";
                let student_join_link = G_HOME_URL + "student/join/" + program + "/" + slot_id + "/$@m" + uid;

                let response = (
                    <div className={`g-d ${show ? grid_class : grid_class1} date-obj f-v-c`} key={slot_id + uid}>
                        <div className="time">{displayTime(sdt, edt)}</div>
                        <div className="f-d f-h-c">{displayGG(gg, slot_type)}</div>
                        <div className="f-d f-h-c">{userName}</div>
                        {show && <div className="f-d f-h-c">
                            {seats_booked} / {batch_size}
                        </div>}
                        {/* {show && <div className="link">{join_link}</div> } */}
                        <div className="link f-d f-h-c">
                            <LinkShare
                                url={join_link}
                                icon={
                                    <Icon
                                        type="copy"
                                        style={{ fontSize: 20, color: "var(--dove)" }}
                                        theme="filled"
                                    />
                                }
                                type={"copy-link"}
                                backColor="var(--pink)"
                            />
                        </div>
                        <div className="link f-d f-h-c">
                            <LinkShare
                                url={student_join_link}
                                icon={
                                    <Icon
                                        type="copy"
                                        style={{ fontSize: 20, color: "var(--dove)" }}
                                        theme="filled"
                                    />
                                }
                                type={"copy-link"}
                                backColor="var(--greenapple)"
                            />
                        </div>
                        {/* <div className="f-d f-h-c">
                            <Button
                                id="join-btn"
                                onClick={() => window.open(mod_join_links[idx], "_blank")}
                                // onClick={() => window.open(join_link, "_blank")}
                            >
                                Join
                            </Button>
                        </div> */}
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
            dates = sortDates(dates);
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

    // const handleFilter = (key: string) => {
    //     let slotType = parseInt(key);
    //     setSlotType(slotType);
    //     initClassroom(slotType);
    // }


    let grid_class = "g-col-6";
    let grid_class1 = "g-col-5";

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
                <div className="classroom-wrapper lr-pad-d">
                    <div className="f-d f-v-c f-h-sb header">
                        <div className="title">Scheduled Classes</div>
                        {/* <Dropdown overlay={menu} placement="bottomCenter">
                            <div className="f-d f-v-c filter-btn c-pointer">
                                <Icon type="filter" theme="filled" />
                                <span className="filter-slot-btn">{slot_type}</span>
                            </div>
                        </Dropdown> */}
                    </div>
                    <Divider />
                    <div className="body">
                        <div className={`g-d ${show ? grid_class : grid_class1}`}>
                            <div>Timing</div>
                            <div className="f-d f-h-c">Program</div>
                            <div className="f-d f-h-c">Mentor</div>
                            {show && <div className="f-d f-h-c">Seats Booked</div>}
                            <div className="f-d f-h-c">Mentors Link</div>
                            <div className="f-d f-h-c">Student Link</div>
                            {/* <div className="f-d f-h-c">Join</div> */}
                        </div>
                        {renderEvents()}
                    </div>
                </div>
                <style jsx>{`
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

                    .classroom-wrapper .header .filter-btn {
                        background-color: #2C3E50;
                        color: var(--dove);
                        padding: 0 var(--peaky-pad-16);
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

export default VisionClassroom;
