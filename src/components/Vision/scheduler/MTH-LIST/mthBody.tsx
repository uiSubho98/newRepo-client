import React from "react";
import moment from "moment";
import { displayGG, displayTime, sortDates } from "./mth_utils";
import { Divider, Button, Icon, Switch } from "antd";

const MTHBody = (props: any) => {
    const { events, handleEditMTH, handlePublishStatus } = props;

    const renderEachEvents = (event_obj: any) => {
        const { sdt, edt, gg, slot_type, size, status, slot_id, mentors } = event_obj;
        let no_bookings = event_obj["bookings"].length;
        let no_mentors = mentors.length;

        let switch_name = "";
        let checked = false;
        if (status === 1) {
            switch_name = "switch-true";
            checked = true;
        }

        return (
            <div className="g-d g-col-5 date-obj" key={slot_id}>
                <div className="time">{displayTime(sdt, edt)}</div>
                <div className="f-d f-h-c">{displayGG(gg, slot_type)}</div>
                <div className="f-d f-h-c">
                    {no_bookings} / {size * no_mentors}
                </div>
                <div className="f-d f-h-c">
                    <Button id="edit-btn" onClick={() => handleEditMTH(slot_id)}>
                        Edit
                    </Button>
                </div>
                <div className={`f-d f-h-c ${switch_name}`}>
                    <Switch
                        checked={checked}
                        onChange={(e) => handlePublishStatus(e, slot_id)}
                        checkedChildren={<Icon type="check" />}
                        unCheckedChildren={<Icon type="close" />}
                    />
                </div>
            </div>
        );
    };

    const renderDayEvents = (date: any) => {
        let day_events = events[date];

        let response = [];

        day_events.sort((day1: any, day2: any) => (day1.sdt > day2.sdt ? 1 : day2.sdt > day1.sdt ? -1 : 0));
        response = day_events.map((e_obj: any) => {
            return renderEachEvents(e_obj);
        });

        return response;
    };

    const renderEvents = () => {
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

    return (
        <>
            <div className="lr-pad-d mth-body">
                <div className="g-d g-col-5">
                    <div>Timing</div>
                    <div className="f-d f-h-c">Program</div>
                    <div className="f-d f-h-c">Seats Booked</div>
                    <div className="f-d f-h-c">Actions</div>
                    <div className="f-d f-h-c">Published</div>
                </div>
                {renderEvents()}
            </div>
            <style jsx>{`
                .mth-body {
                    margin-bottom: 6rem;
                }

                .mth-body .date-wrapper {
                    margin-top: 2rem;
                }

                .mth-body .date-wrapper .date-obj {
                    margin-top: 16px;
                }

                .mth-body .date-wrapper .date-header {
                    font-size: 24px;
                    font-weight: 500;
                }

                .mth-body #edit-btn {
                    background-color: var(--pink);
                    border: none;
                    color: var(--dove);
                }

                .switch-true .ant-switch {
                    background-color: var(--purple);
                }
            `}</style>
        </>
    );
};

export default MTHBody;
