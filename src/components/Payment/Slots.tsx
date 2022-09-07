import React,{ ReactNode, useEffect, useState } from "react";
import { Button, Radio, Select} from 'antd';
import jstz from 'jstz';
import moment from 'moment-timezone';
import { RadioChangeEvent } from "antd/lib/radio";

interface ISlot {
    st: string;
    et: string;
    day: string;
    group_id: number;
}

interface ITimeZone {
    abbreviation: string;
    name: string;
    offset: string;
    utc: string;
}

interface IActiveSlot {
    slot: string;
    slotId: string;
    zoneAbbr: string;
    timeZone: string;
}

interface IProps {
    // slots: {
    //     [key: string]: ISlot
    // };
    slots: any;
    timeZones: {
        [key: string]: ITimeZone
    };
    isSpinning: boolean;
    activeSlot?: IActiveSlot
    handleSlotConfirm: Function;
}

interface IState {
    currentTimeZone: string;
    zoneAbbr: string;
    timeSlots: Array<string>;
    selectedSlot: string;
    selectedSlotValue: string;
}

const { Option } = Select;

const PaymentOptions = (props: IProps) => {

    const { handleSlotConfirm, activeSlot } = props;

    const defaultState = {
        currentTimeZone: '',
        zoneAbbr: '',
        timeSlots: [],
        selectedSlot: '',
        selectedSlotValue: ''
    }

    const [ state, setState ] = useState<IState>(defaultState);
    
    useEffect(() => {
        if(!activeSlot) {
            const detectedTimeZone = jstz.determine().name();
            const detectedAbbr = moment().tz(detectedTimeZone).zoneAbbr();
            setState(prev => ({
                ...prev,
                currentTimeZone: detectedTimeZone,
                zoneAbbr: detectedAbbr
            }));
        } else {
            setState(prev => ({
                ...prev,
                currentTimeZone: activeSlot.timeZone,
                zoneAbbr: activeSlot.zoneAbbr,
                selectedSlot: activeSlot.slotId,
                selectedSlotValue: activeSlot.slot
            })); 
        }
    },[ activeSlot ]);

    const generateSlots = () => {
        const { slots } = props;
        const { currentTimeZone, selectedSlot } = state;
        let holdSlots: any = [];
        if (currentTimeZone) {
            slots.forEach((slot: any,key: any) => {
                let slotTimeStart = slot.sdt * 1000;
                let slotTimeEnd = slot.edt * 1000;
                let momentStart = moment(slotTimeStart);
                let momentEnd = moment(slotTimeEnd);
                let tzCSTime = momentStart.tz(currentTimeZone);
                let tzCETime = momentEnd.tz(currentTimeZone);
                let time = `${tzCSTime.format('Do MMM YYYY')}, ${tzCSTime.format('h:mm A')} to ${tzCETime.format('h:mm A')}`;
                let isRadioChecked = false;
                if(key === selectedSlot) {
                    isRadioChecked = true;
                }
                holdSlots.push(
                    <Radio 
                        value={key} key={key} data-time = {time} checked={isRadioChecked}
                        className="slot-time-container sh2-heading f-v-c">{time}
                    </Radio>
                )
            })

                // let value = slots[key];
                // let slotTimeStart = value.st;
                // let slotTimeEnd = value.et;
                // let momentStart = moment(slotTimeStart);
                // let momentEnd = moment(slotTimeEnd);
                // let tzCSTime = momentStart.tz(currentTimeZone);
                // let tzCETime = momentEnd.tz(currentTimeZone);
                // let time = `${value.day}, ${tzCSTime.format('h:mm A')} to ${tzCETime.format('h:mm A')} starts ${tzCSTime.format('Do MMM')}`;
            //     let isRadioChecked = false;
            //     if(key === selectedSlot) {
            //         isRadioChecked = true;
            //     }
            //     holdSlots.push(
            //         <Radio 
            //             value={key} key={key} data-time = {time} checked={isRadioChecked}
            //             className="slot-time-container sh2-heading f-v-c">{time}
            //         </Radio>
            //     )
            // }
        }
        return holdSlots;
    }

    const changeTimeZone = (value:string) => {
        const { timeZones } = props;
        Object.keys(timeZones).forEach((zone) => {
            if (timeZones[zone].abbreviation === value) {
                setState(prev => (
                    {
                        ...prev,
                        currentTimeZone: timeZones[zone].utc
                    }
                ))
            }
        })
    }

    const getZoneOptions = () => {
        const { zoneAbbr } = state;
        const { timeZones } = props;
        let zoneOptions:Array<ReactNode> = [];
        Object.keys(timeZones).forEach((zone) => {
            let abbr = timeZones[zone].abbreviation;
            let offset = timeZones[zone].offset;
            zoneOptions.push(<Option key={abbr} value={abbr}>
                {`${abbr === zoneAbbr ? `Local time ${abbr}` : abbr} (UTC ${offset})`}
                </Option>)
        })
        return zoneOptions;
    }

    const onChange = (e: RadioChangeEvent) => {
        setState(prev => ({
            ...prev,
            selectedSlot: e.target.value,
            // @ts-ignore
            selectedSlotValue: e.target["data-time"]
        }));
    }

    const { currentTimeZone, zoneAbbr, selectedSlot, selectedSlotValue } = state;

    return (
        <>
          <div className="course-slots-container">
                <h1 className="slot-header h1-heading">Choose Live class timings</h1>
                <div className="desc body-regular">
                    Each week, there will be one Live class (3 hrs) where mentors and 
                    the prograds will build interesting projects together. 
                    <b>Please note, this will be the slot for the whole term.</b>
                </div>
                <div className="timezone-container f-d f-vt-m f-v-c">
                    <div className="desc body-regular">Showing available slots in </div>
                    <div className="timezone-drop-container">
                        {
                            zoneAbbr &&
                            <Select 
                                style={{width: 260}} 
                                defaultValue={zoneAbbr} 
                                onChange={(value:string) => changeTimeZone(value)}
                            >
                                {getZoneOptions()}
                            </Select>
                        }
                    </div>
                </div>
                <Radio.Group 
                    className="time-slots-container g-col-2 g-col-1-m g-gap-16" 
                    onChange={onChange}>
                    {
                        currentTimeZone &&
                        generateSlots()
                    }
                </Radio.Group>

                <div className="slots-footer f-d f-vt-m f-v-c f-h-sb">
                    <div className="enquiry-info">
                        For any queries regarding live class slots, please 
                        reach out to our Admission Counselors
                    </div>
                    <Button
                        className={`confirm-slot-btn ${ selectedSlot !== '' ?
                        'default-pink-btn filled-pink':'default-inactive-btn fill-inactive'}`}
                        loading={props.isSpinning}
                        onClick={() => selectedSlot !== '' ? 
                        handleSlotConfirm(selectedSlot, currentTimeZone, selectedSlotValue, zoneAbbr) : null}
                    >
                        Confirm and proceed
                    </Button>
                </div>
            </div>
            <style jsx>
            {`
            .ant-modal {
                width: 800px !important;
            }

            .course-slots-container .slot-time-container {
                display: flex !important;
                width: 100%;
                padding: var(--peaky-pad-16);
                border: 1px solid var(--snowfall);
                border-radius: var(--peaky-br-4);
                color: var(--carbon);
                transition: all 0.4s;
            }

            .course-slots-container .timezone-container {
                margin-top: 2rem;
                margin-bottom: 2rem;
            }
            
            .course-slots-container .slot-time-container:hover,
            .course-slots-container .slot-time-container:focus {
                border-color: var(--pink);
            }

            .course-slots-container 
            .slot-time-container.ant-radio-wrapper-checked {
                border: 1px solid var(--pink);
            }

            .timezone-container .timezone-drop-container {
                margin-left: 10px;
            }

            .timezone-container .ant-select-selection--single {
                height: 36px;
                width: 260px;
            }

            .timezone-container .ant-select-selection__rendered {
                line-height: 36px;
            }

            .timezone-container .ant-select-selection:hover {
                border-color: var(--pink);
            }

            .timezone-container .ant-select-selection:focus,
            .timezone-container .ant-select-selection:active {
                border-color: var(--pink);
                box-shadow: none;
            }

            .course-slots-container .time-zone-converted {
                margin-top: 8px;
            }

            .slots-footer .enquiry-info {
                width: 60%;
                font-size: 14px!important;
                line-height: 1.5!important;
                font-family: "Open Sans", sans-serif!important;
                font-weight: 400;
                color: var(--carbon);
            }

            .slots-footer .enquiry-info b {
                margin-left: 4px;
            }
            
            .enquiry-info b {
                font-weight: 800;
            }

            .course-slots-container .slots-footer {
                margin-top: 4rem;
            }
            
            .confirm-slot-btn{
                font-family: Poppins;
                font-size: 18px; 
                padding: 0 2rem;
                background-color: var(--snowfall);
            }

            .confirm-slot-btn:hover,
            .confirm-slot-btn:focus {
                color:unset;
                background-color: var(--snowfall);
                border-color: var(--snowfall);
                box-shadow: unset;
            }
            
            .course-slots-container .ant-radio-checked .ant-radio-inner,
            .course-slots-container .ant-radio-wrapper:hover .ant-radio,
            .course-slots-container .ant-radio:hover .ant-radio-inner, 
            .course-slots-container .ant-radio-input:focus + .ant-radio-inner {
                border-color: var(--pink);
            }
            
            .course-slots-container .ant-radio-inner::after{
                background-color: var(--pink);
            }

            .course-slots-container .time-slots-container {
                display: grid !important;
            }

            .course-slots-container .slot-time-container 
            span:nth-of-type(2) {
                white-space: pre-wrap;
            }

            .timezone-drop-container .ant-select-selection {
                padding:unset;
            }

            @media only screen and (max-device-width: 760px) {
                .course-slots-container .slots-footer {
                    align-items: baseline;
                }

                .slots-footer .enquiry-info {
                    width: 100%;
                    margin-bottom: 1rem;
                }

                .course-slots-container .timezone-container {
                    align-items: baseline;
                }

                .course-slots-container .timezone-container .desc {
                    margin-bottom: 1rem;
                }

                .timezone-container .timezone-drop-container {
                    margin-left: unset;
                }
            }
            `}
        </style>
    </>
    )
}

export default PaymentOptions;