import React, { useEffect, useRef, useState } from "react";
import MTHBody from "../../../../components/Vision/scheduler/MTH-LIST/mthBody";
import MTHHeader from "../../../../components/Vision/scheduler/MTH-LIST/mthHeader";
import {
    formatDate,
    getCurDate,
    getEventsData,
    getMonthLimits,
    nextMonth,
    prevMonth,
} from "./mth_utils";
import { Divider } from "antd";
import axios from "axios";
import { G_API_URL } from "../../../../constants/constants";
import { __getToken } from "../../../../utils/user-details.util";
import { openNotification } from "../../../../utils/common.util";

interface IState {
    date: any;
    events: any;
    month_limits: any;
}

const MTHList = (props: any) => {
    const defaultState = {
        date: null,
        events: {},
        month_limits: {},
    };

    const [state, setState] = useState<IState>(defaultState);

    const initMTHList = async () => {
        let date = getCurDate();
        let month_limits = getMonthLimits(date);
        let events = await getEventsData(month_limits);
        setState({ date, events: events, month_limits: month_limits });
    }

    useEffect(() => {
        initMTHList();
    }, []);

    const updateEvents = async () => {
        let { month_limits } = state;
        let events = await getEventsData(month_limits);
        setState(prev => ({ ...prev,events: events, month_limits: month_limits }));
    };

    const usePrevious = async (value: any) => {
        const ref = useRef();
        useEffect(() => {
          ref.current = value;
        }, [value]);
        return ref.current;
    }

    const prevProps:any = usePrevious(props);

    useEffect(() => {
        if (prevProps.edit_counter !== props.edit_counter) {
            updateEvents();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [prevProps.edit_counter, props.edit_counter])


    const handleMonthChange = async (type: any) => {
        const { date } = state;

        if (type === "prev") {
            let mod_date = prevMonth(date);
            let month_limits = getMonthLimits(mod_date);
            let events = await getEventsData(month_limits);
            setState(prev => ({ ...prev, date: mod_date, events: events, month_limits: month_limits }));
        }

        if (type === "next") {
            let mod_date = nextMonth(date);
            let month_limits = getMonthLimits(mod_date);
            let events = await getEventsData(month_limits);
            setState(prev => ({ ...prev, date: mod_date, events: events, month_limits: month_limits }));
        }
    };

    const handlePublishStatus = (e: any, slot_id: any) => {
        let status = 0;
        if (e) status = 1;

        let data = {
            slot_id: slot_id,
            status: status,
            mode: "status",
        };

        axios
            .put(G_API_URL + "slot/", data, { headers: { Authorization: __getToken() } })
            .then((res) => {
                res = res.data;
                if (res.status && res.status === 1) {
                    updateEvents();
                }
            })
            .catch((error) => {
                if (error.response) {
                    openNotification("fail", error.response.data.message);
                }
            });
    };


    const { visible, handleEditMTH, handleFCVisible } = props;
    const { date, events } = state;

    let style: any = { display: "none" };
    if (visible) style = {};

    return (
        <>
            <div className="month-list-wrap" style={style}>
                <MTHHeader
                    date={formatDate(date)}
                    handleMonthChange={handleMonthChange}
                    handleFCVisible={handleFCVisible}
                />
                <Divider />
                <MTHBody
                    events={events}
                    handleEditMTH={handleEditMTH}
                    handlePublishStatus={handlePublishStatus}
                />
            </div>
        </>
    );
}

export default MTHList;
