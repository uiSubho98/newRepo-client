import moment from 'moment'
import {Select} from "antd";
import { programs, slotTypes } from "./data";
import React from 'react';

const { Option } = Select;

const groupMentorUidName = (uids: Array<number>, mentors_array: any) => {
    let response: any = [];
    uids.forEach((uid: number) => {
        for (let mentor_index = 0; mentor_index < mentors_array.length; mentor_index++) {
            const mentor_obj = mentors_array[mentor_index];
            let mentor_uid = mentor_obj['uid'];
            if(mentor_uid === uid) {response.push(mentor_obj); break;}    
        }
    });

    return response;
}

const resetTime = (date:any) => {
    date = moment(date);
    let selectedDate = date.format("DD");
    let selectedMonth = date.format("MM");
    let selectedYear = date.format("YYYY");
    selectedMonth = parseInt(selectedMonth) - 1;
    date = new Date(selectedYear, selectedMonth, selectedDate, 0, 0, 0);
    return date
}

const getEndDateTime = (date:any) => {
    date = moment(date).endOf('day');
    return date;
}


const convertDateToValue = (dates: any) => {

    dates = dates.map((date:any) => {
        date = date.valueOf() / 1000;
        date = Math.round(date);
        return date
    })

    return dates
}

const renderGGOptions = () => {
    
    let styles1 = {
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        backgroundColor: "var(--purple)",
        marginRight: "12px"
    }
    
    let styles2 = {...styles1,    backgroundColor: "var(--pink)"}


    const select_options = programs.map((op, idx) => {
        let styles = null
        if((idx+1) % 2 === 0)  {
           styles = styles1
        }
        else styles = styles2

        return <Option value={op} key={idx}>
                    <div className="f-d f-v-c">
                    <div className="dot" style={styles}></div>
                    {op}
                    </div>
                </Option>
    });

    return select_options;
}

const renderSlotTypes = () => {
        
    let styles1 = {
        width: "10px",
        height: "10px",
        borderRadius: "4%",
        backgroundColor: "var(--go)",
        marginRight: "12px"
    }
    
    let styles2 = {...styles1,    backgroundColor: "var(--purple)"}


    const select_options = slotTypes.map((op, idx) => {
        let styles = null
        if((idx+1) % 2 === 0)  {
           styles = styles1
        }
        else styles = styles2

        return <Option value={op} key={idx}>
                    <div className="f-d f-v-c">
                    <div className="dot" style={styles}></div>
                    {op}
                    </div>
                </Option>
    });

    return select_options;
}

const renderBatches = (batchList: any) => {

    const select_options = batchList.map((op: any, idx: any) => {
        return <Option value={op.batchId} key={idx}>
                    {op.batch}
                </Option>

    });

    return select_options;

}


export {groupMentorUidName, resetTime, convertDateToValue, renderGGOptions, renderSlotTypes, getEndDateTime, renderBatches}