import { Button } from "antd";
import moment from "moment";
import { Moment } from "moment-timezone";
import React from "react";
import { check_login } from "../../../utils/login.util";
import TimeCounter from "./TimeCounter";

interface ITimerBlockProps {
    startTime: Moment;
    price: number;
    handleRegister: Function;
    joinUrl?: string;
    bookingText?: string;
}

const TimerBlock = (props: ITimerBlockProps) => {
    const { startTime, price, handleRegister, joinUrl, bookingText } = props;
    const loggedIn = check_login();
    const timediff = startTime.diff(moment(), 'seconds');
    const time = {
        days: Math.floor(timediff / (3600 * 24)),
        hours: Math.floor(timediff % (3600*24) / 3600),
        min: Math.floor(timediff % 3600 / 60),
        sec: Math.floor(timediff % 60)
    }

    return (
        <>
            <div className="timer-wrapper f-d f-h-sb f-v-c f-vt-m">
                <TimeCounter days={time.days} hours={time.hours} min={time.min} sec={time.sec} />
                <div className="f-d f-vt f-v-e action-block">
                    <div className="f-d register-wrapper f-vt-m">
                        {
                            joinUrl ?
                            <Button type="primary" htmlType="submit" className="default-blue-btn save-btn" onClick={() => { window.open(joinUrl) }}>
                                Join Workshop
                            </Button>
                            :
                            <>
                                <div className="price text-large font-heading f-d f-v-c f-h-c-m">{price === 0 ? 'FREE' : `INR ${price / 100}`}</div>
                                <Button type="primary" htmlType="submit" className="default-blue-btn save-btn"
                                    onClick={() => handleRegister()}>
                                    {bookingText}
                                </Button>
                            </>
                        }
                    </div>
                    {
                        !loggedIn && 
                        <div className="text-faded text-small text-c-d login-wrapper">
                            Already registered? <u className="c-pointer" onClick={() => { handleRegister(0) }}>Log in</u>
                        </div>
                    }
                </div>
            </div>
            <style jsx>
                {`
                    .timer-wrapper {
                        width: 100%;
                        background-color: var(--primary-bg);
                        padding: 2rem 4rem;
                    }
                    .timer-wrapper .register-wrapper {
                        margin-bottom: var(--peaky-gap-16);
                    }
                    .timer-wrapper .save-btn {
                        margin-left: var(--peaky-gap-32);
                        width: 300px;
                    }
                    .timer-wrapper .login-wrapper {
                        width: 300px;
                    }
                    @media only screen and (max-device-width: 760px) {
                        .timer-wrapper {
                            background-color: inherit;
                            padding: 2rem 1rem;
                        }

                        .timer-wrapper .action-block {
                            width: 100%;
                        }
                        
                        .timer-wrapper .register-wrapper {
                            margin-top: var(--peaky-gap-32);
                            width: 100%;
                            background-color: inherit;
                        }

                        .timer-wrapper .save-btn {
                            margin-top: var(--peaky-gap-16);
                            margin-left: 0;
                            width: 100%;
                        }

                        .timer-wrapper .login-wrapper {
                            width: 100%;
                            margin-top: var(--peaky-gap-16);
                        }
                    }
            `}
            </style>
        </>
    )
}
export default TimerBlock;