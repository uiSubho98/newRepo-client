import React, { useEffect, useState } from 'react'

interface ITimeCounterProps {
    days: number;
    hours: number;
    min: number;
    sec: number;
}

const TimeCounter = (props: ITimeCounterProps) => {
    const [time, setTime] = useState<ITimeCounterProps>(props);


    const tick = () => {
        if (time.days === 0 && time.hours === 0 && time.min === 0 && time.sec === 0) {
            window.location.reload();
        } else if (time.hours === 0 && time.min === 0 && time.sec === 0) {
            setTime({ days: time.days - 1, hours: 23, min: 59, sec: 59 });
        } else if (time.min === 0 && time.sec === 0) {
            setTime({ days: time.days, hours: time.hours - 1, min: 59, sec: 59 });
        } else if (time.sec === 0) {
            setTime({ days: time.days, hours: time.hours, min: time.min - 1, sec: 59 });
        } else {
            setTime({ days: time.days, hours: time.hours, min: time.min, sec: time.sec - 1 });
        }
    };

    useEffect(() => {
        const timerId = setInterval(() => tick(), 1000);
        return () => clearInterval(timerId);
    });

    const addLeadingZeros = (value: number) => {
        var val = String(value);
        while (val.length < 2) {
            val = '0' + val;
        }
        return val;
    }

    return (
        <>
            <div className="count-down-container f-d f-v-c f-h-sa">

                <div className="counter-block f-d f-vt f-v-c">
                    <div className="counter-holder text-xxl font-heading">{addLeadingZeros(time.days)}</div>
                    <div className="counter-title text-faded-2">{time.days === 1 ? 'day' : 'days'}</div>
                </div>

                <div className="counter-block f-d f-vt f-v-c">
                    <div className="counter-holder text-xxl font-heading">{addLeadingZeros(time.hours)}</div>
                    <div className="counter-title text-faded-2">hrs</div>
                </div>

                <div className="counter-block f-d f-vt f-v-c">
                    <div className="counter-holder text-xxl font-heading">{addLeadingZeros(time.min)}</div>
                    <div className="counter-title text-faded-2">{time.min === 1 ? 'min' : 'mins'}</div>
                </div>

                <div className="counter-block f-d f-vt f-v-c">
                    <div className="counter-holder text-xxl font-heading">{addLeadingZeros(time.sec)}</div>
                    <div className="counter-title text-faded-2">{time.sec === 1 ? 'sec' : 'secs'}</div>
                </div>

            </div>

            <style jsx>
                {`

                .count-down-container {
                    width: 400px;
                }

                .count-down-container .counter-holder {
                    color: var(--primary);
                }
                
                @media only screen and (max-device-width: 760px) {
                    .count-down-container {
                        width: 100%;
                    }
                }
                `}
            </style>
        </>
    );
}
export default TimeCounter;
