import { Button, Radio } from 'antd';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import moment from "moment-timezone";
import React, { ReactElement, useEffect, useState } from 'react';
import keys from '../../config/keys';
import { G_API_URL } from '../../constants/constants';
import { __getCookie } from '../../utils/cookie.util';
import jstz from "jstz";
import { RadioChangeEvent } from 'antd/lib/radio';
import { getGATag, openNotification } from '../../utils/common.util';
import ReactPixel from 'react-facebook-pixel';

interface ITimeZone {
    abbreviation: string;
    name: string;
    offset: string;
    utc: string;
}

interface ISlot {
    edt: number
    sdt: number
    slot_id: string
    slot_validity: number
}

interface IData {
    _id: number;
    data: Array<ISlot>;
}

interface IState {
    currentTimeZone: string;
    zoneAbbr: string;
    timeZones: Array<ITimeZone>;
    data: Array<IData>;
    activeDate: number;
    isBooking: boolean;
    hasScheduled: boolean;
    selectedSlot: string;
}

interface IProps {
    isWorkshopScheduled: boolean;
    mode?: string;
    updateStep: Function;
}

const Schedule = (props: IProps) => {

    const defaultState = {
        currentTimeZone: '',
        zoneAbbr: '',
        timeZones: [],
        data: [],
        activeDate: 0,
        isBooking: false,
        hasScheduled: false,
        selectedSlot: ""
    };

    const [state, setState] = useState<IState>(defaultState);
    const [isLoading, setLoading] = useState<boolean>(false);

    const { mode, isWorkshopScheduled ,updateStep } = props;

    useEffect(() => {
        const config: AxiosRequestConfig = {
            headers: {
                "Authorization": __getCookie(keys.cookiePrefix + "ut").cookieValue
            }
        };
        const getSlots = () => {
            const detectedTimeZone = jstz.determine().name();
            const detectedAbbr = moment().tz(detectedTimeZone).zoneAbbr();
            config.params = {
                program: "microdegree",
                slot_type: 1
            }
            setLoading(true);
            axios.get(G_API_URL + `slot/user`, config)
                .then((res: AxiosResponse) => {
                    let response = res.data;
                    setState(prev => ({
                        ...prev,
                        data: response.data,
                        currentTimeZone: detectedTimeZone,
                        timeZones: response.timeZones,
                        zoneAbbr: detectedAbbr
                }));
                setLoading(false);
            });
        }

        if (isWorkshopScheduled) {
            updateStep();
        } else {
            getSlots();
        }
    }, [isWorkshopScheduled]);// eslint-disable-line react-hooks/exhaustive-deps

    const bookSlot = () => {
        const {selectedSlot}: {selectedSlot: string} = state;
        setState(prev => ({...prev, isBooking: true}));
        axios.post(G_API_URL + "slot/book", {slot_id: selectedSlot, slot_type: 1}, {
            headers: {
                "Authorization": __getCookie(keys.cookiePrefix + "ut").cookieValue
            }
        }).then((res: AxiosResponse) => {
            let response = res.data;
            if (response.status === 1) {
                // Env
                const platformEnv = process.env.REACT_APP_PLATFORM;

                if (platformEnv === 'prod') {
                    const tag = getGATag("microdegree_workshop_booked",
                    "subscribers", "Microdegree");
                    document.body.appendChild(tag);

                    // Send Free Experience Registered Event to Pixel
                    ReactPixel.track('Microdegree Free Session Booked', {
                        content_category: "Microdegree",
                        content_type: "free session booked"
                    });

                    // Google Ads Events
                    const s1 = document.createElement("script");
                    s1.type = "text/javascript";
                    s1.async = true;
                    s1.innerHTML =
                        "gtag('event', 'conversion', { 'send_to': 'AW-439710104/CwnbCKCm-IkCEJjj1dEB' });";
                    document.body.appendChild(s1);
                }
                setState(prev => ({
                    ...prev, 
                    isBooking: false, 
                    hasScheduled: true
                }));
                updateStep();
            } else {
                setState(prev => ({
                    ...prev, 
                    isBooking: false
                }));
                openNotification("fail", "Something went wrong. Please try again!", 3);
            }
        }).catch(err => {
            console.log(err);
        })
    }

    const generateSlots = () => {
        const {currentTimeZone, data, activeDate} = state;
        let holdSlots: Array<ReactElement> = [];
        if (currentTimeZone && data && data[activeDate]) {
            Object.entries(data[activeDate].data).forEach(([key, value]: any) => {
                let tzCSTime = moment(value.sdt * 1000).tz(currentTimeZone);
                let tzCETime = moment(value.edt * 1000).tz(currentTimeZone);
                holdSlots.push(
                    <Radio
                        value={value.slot_id} key={key}
                        className="slot-time-container sh2-heading f-v-c"> {tzCSTime.format('hh:mm A')} - {tzCETime.format('hh:mm A')} IST (UTC+5:30)
                    </Radio>
                )
            })
        }
        return holdSlots;
    }

    const onChange = (e: RadioChangeEvent) => {
        setState(prev => ({...prev, selectedSlot: e.target.value}))
    }

    const {data, currentTimeZone, activeDate, isBooking, hasScheduled} = state;

    const slots = data.map((slot: IData, i: number) => (
        <div className={`date-container f-d f-vt f-v-c f-h-c c-pointer ${i === activeDate ? 'active' : ''}`}
                onClick={() => setState(prev => ({...prev, activeDate: i}))}
                key={i}>
            <div className='month cap-letter strong-text text-small'>
                {moment(slot.data[0].slot_validity * 1000).format("MMM")}
            </div>
            <div className='date strong-text text-large'>
                {moment(slot.data[0].slot_validity * 1000).format("D")}
            </div>
        </div>))

    return (
        <>
            {
            !isLoading &&
            <div className="w-80 schedule-container">
                {
                    mode &&
                    <h1 className="font-heading text-xl">
                        { mode === "booking" ? "Schedule" : "Reschedule" } your live code-along class
                    </h1>
                }
                <span className="text-regular description">
                    As part of the free experience, you get a 120 min live code-along class. 
                    In this, you’ll build your very first app with the assistance of an expert mentor. 
                    Schedule this class at a time convenient for you.
                </span>
                <div className='date-container-holder f-d'>
                    {slots}
                </div>
                <div className="divider"></div>
                <Radio.Group className={`time-slots-container f-vt-m`}
                onChange={(e) => onChange(e)}>
                    {
                        currentTimeZone &&
                        generateSlots()
                    }
                </Radio.Group>
                <div className="f-d f-h-e f-v-c action-elements-wrapper">
                    <span className="skip-btn text-regular c-pointer"
                    onClick={() => updateStep()}>
                        Skip for now
                    </span>
                    <Button
                        className="schedule-btn default-blue-btn btn-small"
                        loading={isBooking}
                        onClick={() => !hasScheduled && bookSlot()}
                    >
                        Schedule and continue
                    </Button>
                </div>
            </div>
            }
            <style jsx>{`
                .schedule-container {
                    background-color: var(--primary-bg);
                    padding: var(--peaky-pad-32);
                }

                .schedule-container .description {
                    opacity: 0.87;
                }

                .date-container-holder {
                    margin-top: 16px;
                }
                
                .date-container-holder .date-container {
                    border: 1px solid var(--dove);
                    border-radius: 2px;
                    color: var(--dove);
                    font-family: 'Open Sans', sans-serif;
                    font-weight: 500;
                    height: 64px;
                    margin-right: var(--peaky-gap-16);
                    opacity: 0.57;
                    width: 64px;
                }
                
                .date-container-holder .date-container.active {
                    background: linear-gradient(180deg, #0E7DED 1.47%, #1739E6 101.42%);
                    color: var(--dove);
                    opacity: unset;
                    border: none;
                }

                .date-container-holder .date-container .month {
                    line-height: 19px;
                }
                
                .date-container-holder .date-container .date {
                    line-height: 34px;
                }

                .schedule-container .divider {
                    background-color: var(--dove);
                    height: 1px;
                    margin: var(--peaky-gap-16) 0 var(--peaky-gap-32);
                    opacity: 0.1;
                    width: 100%;
                }

                .schedule-container .time-slots-container {
                    display: flex !important;
                    flex-wrap: wrap;
                }

                .schedule-container .slot-time-container {
                    display: flex !important;
                    width: fit-content;
                    padding: 12px var(--peaky-gap-48) 12px var(--peaky-pad-16);
                    border: 2px solid rgba(255, 255, 255, 0.54);
                    border-radius: var(--peaky-br-2);
                    color: var(--dove);
                    transition: all 0.4s;
                    box-sizing: border-box;
                }

                .schedule-container .slot-time-container:hover,
                .schedule-container .slot-time-container:focus {
                    border: 2px solid var(--primary);
                    outline: none;
                    box-shadow: none;
                }
                
                .schedule-container .slot-time-container.ant-radio-wrapper-checked {
                    border: 2px solid var(--primary);
                    outline: none;
                    box-shadow: none;
                }

                .schedule-container .ant-form-item-required,
                .schedule-container .ant-radio-wrapper {
                    font-weight: 400;
                    font-size: 16px;
                    font-family: 'Open Sans', sans-serif;
                    color: var(--dove);
                }

                .schedule-container .ant-radio-wrapper {
                    margin: 0 0 var(--peaky-gap-32);
                }

                .schedule-container .ant-radio-inner {
                    border: 2px solid var(--dove);
                    background-color: var(--spider);
                    height: 20px;
                    width: 20px;
                }

                .schedule-container .ant-radio-checked 
                .ant-radio-inner {
                    border: 2px solid var(--primary);
                }

                .schedule-container .ant-radio-inner::after {
                    height: 10px;
                    width: 10px;
                }

                .schedule-container .ant-radio-wrapper {
                    margin-right: 30px;
                }

                .schedule-container .ant-radio-wrapper 
                span.ant-radio + * {
                    padding-left: var(--peaky-pad-16);
                    padding-right: var(--peaky-pad-16);
                }

                .schedule-container .action-elements-wrapper {
                    margin: var(--peaky-gap-8) 0 0;
                }

                .schedule-container .skip-btn {
                    text-decoration: underline;
                    margin:0 var(--peaky-gap-32) 0 0;
                }

                @media only screen and (max-device-width: 760px) {
                    .schedule-container {
                        width: 100%;
                        padding: var(--peaky-pad-16);
                    }

                    .schedule-container .action-elements-wrapper {
                        flex-direction: column-reverse;
                    }

                    .schedule-container .slot-time-container {
                        font-size: 14px;
                        padding: 12px var(--peaky-pad-16);
                    }

                    .schedule-container .ant-radio-wrapper {
                        margin-right: unset;
                    }

                    .schedule-container .ant-radio-wrapper span.ant-radio + * {
                        padding-left: 8px;
                        padding-right: 8px;
                    }

                    .schedule-container .skip-btn {
                        margin: var(--peaky-gap-24) 0 0;
                    }
                }
            `}</style>
        </>
    )
}

export default Schedule;