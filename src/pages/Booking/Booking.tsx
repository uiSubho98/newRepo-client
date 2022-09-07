import React, { useEffect, useState} from "react";
// @ts-ignore
import { Helmet } from 'react-helmet';
import { message } from 'antd';
import axios from "axios";
import { G_API_URL, G_URL } from "../../constants/constants";
import { __getToken } from "../../utils/user-details.util";
import Layout from "../../components/Layout";
import SlotsComponent from "../../components/Payment/Slots";

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

interface IContent {
    timeZones: {
        [zone: string]: ITimeZone;
    }
    slots: {
        [key: string]: ISlot
    };
}

interface IState {
    isLoading: boolean;
    isSpinning: boolean;
}

// interface IMatch {
//     params: {
//         slug: string;
//     }
// }

// interface IProps {
//     match: IMatch
// }

const Booking = (props: any) => {

    const defaultContent = {
        slots: {},
        timeZones:{}
    }

    const defaultState = {
        isLoading: false,
        isSpinning: false
    }

    const [content, setContent] = useState<any>(defaultContent);
    const [state, setState] = useState<IState>(defaultState);


    const handleSubmit = (selectedSlot:any, currentTimeZone:string, 
        selectedSlotValue:string, zoneAbbr:string) => {
        selectedSlot = content.data[selectedSlot];
        let slotId = selectedSlot.slot_id;
        let startTime = selectedSlot.sdt;
        let { slug } = props.match.params;
        axios.post(G_API_URL + "liveclass/book/", {slot_id: slotId, sdt: startTime, slot_type: 2, program: slug}, {
            headers: {
                "Authorization": __getToken()
            }
        }).then((response: any) => {
            response = response.data;
            if(response.status) {
                message.success("Slot Selected Successfully!")
                setTimeout(() => {
                    window.location.href = G_URL+"learning-dashboard/"+slug;
                },2000);
            } else {
                message.error("Something went wrong, Please try again!")
            }
            setState(prev => ({...prev, isSpinning: false}));
        });
        // const headers = {
        //     headers: {
        //         Authorization: __getToken()
        //     }
        // }

        // // const { slug } = props.match.params;

        // const data = {
        //     slotId: selectedSlot,
        //     slot: selectedSlotValue,
        //     zoneAbbr: zoneAbbr,
        //     timeZone:currentTimeZone,
        //     programType: "bootcamp"
        // }

        // setState(prev => ({...prev, isSpinning: true}));

        // axios.post(G_API_URL+"program/booking/", data, headers)
        //     .then((response) => {
                // response = response.data;
                // if(response.status) {
                //     message.success("Slot Selected Successfully!")
                //     setTimeout(() => {
                //         window.location.href = G_URL+"learning-dashboard/bootcamp/";
                //     },2000);
                // } else {
                //     message.error("Something went wrong, Please try again!")
                // }
                // setState(prev => ({...prev, isSpinning: false}));
        // });
    }
    const { slug } = props.match.params;
    useEffect(() => {
        setState(prev => ({...prev, isLoading: true}))
        axios.get(G_API_URL+"slot/user/",{
            params: {
                program: slug,
                slot_type: 2
            },
            headers: {
                Authorization : __getToken()
            }
        }).then((response: any) => {
            response = response.data;
            if(response.status) {
                if(response.data) {
                    response.data = response.data.map((slot: any) => slot.data);
                    response.data = [].concat.apply([], response.data);
                    response.data = response.data.sort((a: any,b: any) => a.slot_validity - b.slot_validity);
                }
                setContent({
                    data: response.data,
                    timeZones: response.timeZones
                });
                setState(prev => (
                    {   
                        ...prev, 
                        isLoading: false
                    }
                ));
            }
        })
    },[slug]);

    return (
        <>
            {
                !state.isLoading &&    
                <Layout>
                    <Helmet>
                        <title>ProGrad | Bootcamp Booking</title>
                    </Helmet>
                    <div className="booking-content-wrapper lr-pad-d lr-pad-m
                    tb-pad-d tb-pad-m w-70">
                        <SlotsComponent 
                            handleSlotConfirm={handleSubmit}
                            slots = {content.data}
                            timeZones = {content.timeZones}
                            isSpinning = {state.isSpinning}
                        />
                    </div>
                </Layout>
            }
            <style jsx>{`

                .booking-content-wrapper .time-standards-wrapper {
                    margin: var(--peaky-gap-24) 0 0;
                }

                .booking-content-wrapper .time-standard-picker
                .ant-select-selection {
                    color: var(--carbon);
                    height:unset;
                    padding:0;
                    min-width:150px;
                }

                .booking-content-wrapper .slots {
                    margin: var(--peaky-gap-32) 0;
                }

                .booking-content-wrapper .slots 
                .slot {
                    grid-template-columns: 1fr 8fr;
                    border: 1px solid var(--snowfall);
                    padding: var(--peaky-pad-16);
                    border-radius: var(--peaky-br-4);
                }

                .booking-content-wrapper .slots 
                .slot.active {
                    border-color: var(--pink);
                }

                .booking-content-wrapper .slots 
                .slot .dot {
                    height:20px;
                    width:20px;
                    border-radius: var(--peaky-br-full);
                    background-color: var(--snowfall);
                }

                .booking-content-wrapper .slots 
                .slot.active .dot {
                    background-color: var(--pink);
                }

                .booking-content-wrapper .action-block {
                    margin: var(--peaky-gap-128) 0 0;
                }

                .booking-content-wrapper .action-block
                .body-caption {
                    color: var(--carbon);
                }

                .booking-content-wrapper .confirm-btn {
                    padding: 0 2rem!important;
                }

                .booking-content-wrapper .course-slots-container 
                .slot-time-container {
                    width: 90%;
                }

                @media only screen and (max-device-width: 760px) {
                    .booking-content-wrapper,
                    .booking-content-wrapper .course-slots-container 
                    .slot-time-container {
                        width: 100%;
                    }
                }

                @media screen and (min-width: 768px) and (max-width: 1023px) 
                and (orientation: portrait) {
                    .booking-content-wrapper,
                    .booking-content-wrapper .course-slots-container 
                    .slot-time-container {
                        width: 100%;
                    }
                }
            `}</style>
        </>
    )
}

export default Booking;