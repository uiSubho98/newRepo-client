import moment from "moment";
import axios from "axios";
import { G_API_URL } from "../../../constants/constants";
import { openNotification } from "../../../utils/common.util";
import { __getToken } from "../../../utils/user-details.util";

const refactor_events = (events_list: any) => {
    let response: any = [];

    events_list.map((event_obj: any) => {
        let start_date = event_obj["sdt"];
        start_date = start_date * 1000;

        let start = moment(start_date).format("YYYY-MM-DD");

        let start_time = moment(start_date).format("HH:mm");

        let end_date = event_obj["edt"];
        end_date = end_date * 1000;

        let end_time = moment(end_date).format("HH:mm");

        let no_mentors = event_obj['mentors'].length
        let no_bookings = 0
        if(event_obj['bookings']) {
           no_bookings =  event_obj['bookings'].length;
        }
        
        let display_title = start_time + "-" + end_time;
        display_title += " [" + no_bookings + " / " + event_obj["size"] * no_mentors + "]";

        let event_color = "var(--purple)";

        if (event_obj["slot_type"] === 1 && event_obj["gg"] === 1) {
            event_color = "var(--pink)";
        } else if (event_obj["slot_type"] === 2 && event_obj["gg"] === 1) {
            event_color = "var(--go)";
        } else if (event_obj["slot_type"] === 2 && event_obj["gg"] === 2) {
            event_color = "var(--joy)";
        }

        if (event_obj["status"] === 0) event_color = "rgba(95, 39, 205, 0.4)";

        if (event_obj["status"] === 0 && event_obj["slot_type"] === 1 && 
        event_obj["gg"] === 1) {
            event_color = "rgba(245, 10, 95, 0.4)";
        } else if (event_obj["status"] === 0 && event_obj["slot_type"] === 2 &&
        event_obj["gg"] === 1) {
            event_color = "rgba(39, 174, 96, 0.4)";
        } else if (event_obj["status"] === 0 && event_obj["slot_type"] === 2 && 
        event_obj["gg"] === 2) {
            event_color = "rgba(240, 175, 54, 0.4)";
        }

        let slot_type = event_obj['slot_type'];

        response.push({
            title: display_title,
            start: start,
            slot_id: event_obj["slot_id"],
            slot_type: slot_type,
            backgroundColor: event_color,
            borderColor: event_color,
        });

        return null;
    });

    return response;
};

const getEventLimits = async (e_date: any, type: any, slot_type: any = undefined) => {
    e_date = moment(e_date);
    e_date = e_date.startOf("month");

    if (type === "prev") e_date = e_date.subtract(1, "months");
    if (type === "next") e_date = e_date.add(1, "months");

    let previous_month: any = moment(e_date).subtract(1, "months");
    let next_month: any = moment(e_date)
        .add(1, "months")
        .endOf("month");

    previous_month = Math.round(previous_month.valueOf() / 1000);
    next_month = Math.round(next_month.valueOf() / 1000);

    let params: any = {
        qtype: 2,
        prev_month: previous_month,
        next_month: next_month,
    };

    if(slot_type && slot_type !== 3) {
        params.slot_type = slot_type;
    }

    try {
        let response = await axios.get(G_API_URL + "slot/bookings", {
            params: params,
            headers: { Authorization: __getToken() },
        });
        let events = [];
        if (response.data.data) {
            let bookings_details = response.data.data;
            events = refactor_events(bookings_details);
        }

        return events;
    } catch (error) {
        if (error.response) {
            openNotification("fail", error.response.data.message);
        }
    }
};

const fetchSlotDetails = async (slot_id: any, slot_type: any = 1) => {
    let params = { slot_id: slot_id, slot_type: slot_type };

    try {
        let response = await axios.get(G_API_URL + "slot/details", {
            params: params,
            headers: { Authorization: __getToken() },
        });

        let slot_details = response.data.data;
        return slot_details;
    } catch (error) {
        if (error.response) {
            openNotification("fail", error.response.data.message);
        }
    }
};

export { refactor_events, getEventLimits, fetchSlotDetails };
