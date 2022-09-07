import moment from "moment";
import axios from "axios";
import { G_API_URL } from "../../../../constants/constants";
// @ts-ignore
import { groupBy } from "lodash";
import { __getToken } from "../../../../utils/user-details.util";
import { openNotification } from "../../../../utils/common.util";

const getCurDate = () => {
    let today_date: any = new Date();
    today_date = moment(today_date);

    return today_date;
};

const formatDate = (date: any) => {
    if (date !== null) return date.format("MMMM YYYY");
    else return;
};

const prevMonth = (date: any) => {
    return date.subtract(1, "months");
};

const nextMonth = (date: any) => {
    return date.add(1, "months");
};

const getMonthLimits = (date: any) => {
    let start_date = moment(date).startOf("month");
    let end_date = moment(date).endOf("month");

    return {
        sdt: Math.round(start_date.valueOf() / 1000),
        edt: Math.round(end_date.valueOf() / 1000),
    };
};

const groupEventsByDate = (event_list: any) => {
    let groupedResults = groupBy(event_list, (event_list: any) => {
        let sdt: number = event_list["sdt"] * 1000;
        let sdtMoment = moment(sdt).startOf("day");
        sdt = sdtMoment.valueOf();

        return moment(sdt).valueOf();
    });

    return groupedResults;
};

const getEventsData = async ({ sdt, edt, type="admin", slot_type }: any) => {

    let params: any = {
        qtype: 2,
        prev_month: sdt,
        next_month: edt,
        type: type
    };

    let events = {};

    if(slot_type && slot_type !== 3) {
        params.slot_type = slot_type;
    }

    try {
        let response = await axios.get(G_API_URL + "slot/bookings", {
            params: params,
            headers: { Authorization: __getToken() },
        });
        if (response.data.data) {
            let bookings_details = response.data.data;
            events = groupEventsByDate(bookings_details);
            return events;
        }

        return events;
    } catch (error) {
        if (error.response) {
            openNotification("fail", error.response.data.message);
        }
    }
};

export { getCurDate, formatDate, prevMonth, nextMonth, getMonthLimits, getEventsData };
