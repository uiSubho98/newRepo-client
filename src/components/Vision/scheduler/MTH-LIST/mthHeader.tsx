import React from "react";
import { Button, Icon } from "antd";

const MTHHeader = (props: any) => {
    const { date, handleMonthChange, handleFCVisible } = props;
    return (
        <>
            <div className="mth-header lr-pad-d f-d f-h-sb f-v-c">
                <div className="f-d  f-v-c">
                    <div className="date">{date}</div>
                    <div className="btn-group f-d">
                        <Button className="prev" onClick={() => handleMonthChange("prev")}>
                            <Icon type="left" />
                        </Button>
                        <Button className="right" onClick={() => handleMonthChange("next")}>
                            <Icon type="right" />
                        </Button>
                    </div>
                </div>

                <div className="show-calendar">
                    <Button onClick={handleFCVisible} id="calendar-btn">
                        <Icon type="calendar" theme="filled" />
                    </Button>
                </div>
            </div>

            <style jsx>{`
                .mth-header .date {
                    width: 300px;
                }

                .mth-header .btn-group {
                    margin-left: 16px;
                }

                .mth-header .date {
                    font-size: 32px;
                }

                .mth-header #calendar-btn {
                    background-color: var(--purple);
                    color: var(--dove);
                    border: none;
                }
            `}</style>
        </>
    );
};

export default MTHHeader;
