import moment from "moment";
import React from "react";

const sortDates = (dates: any, type = 0) => {
    dates = dates.map((date: any) => parseInt(date));
    dates = dates.sort();
    if(type === 1) {
        dates = dates.reverse();
    }
    return dates;
};

const displayTime = (sdt: any, edt: any) => {
    sdt = sdt * 1000;
    edt = edt * 1000;

    sdt = moment(sdt).format("hh:mm A");
    edt = moment(edt).format("hh:mm A");

    return sdt + " - " + edt;
};

const displayGG = (gg: any, slot_type: any) => {
    let styles1 = {
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        backgroundColor: "var(--purple)",
        marginRight: "12px",
    };

    let styles2 = { ...styles1, backgroundColor: "var(--pink)" };

    let gg_name = "microdegree";
    let styles = styles2;

    if (gg === 2) {
        gg_name = "bootcamp";
    }

    if(slot_type === 1 && gg === 2) {
        styles = styles1;
    } else if(slot_type === 2 && gg === 1) {
        styles = { ...styles1, backgroundColor: "var(--go)" };
    } else if(slot_type === 2 && gg === 2) {
        styles = { ...styles1, backgroundColor: "var(--joy)"};
    }

    return (
        <div className="f-d f-v-c">
            <div className="dot" style={styles}></div>
            {gg_name}
        </div>
    );
};

export { sortDates, displayTime, displayGG };
