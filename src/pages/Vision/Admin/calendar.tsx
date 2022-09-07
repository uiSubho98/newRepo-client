import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import NewSlot from "../../../components/Vision/scheduler/NewSlot";
import { DatePicker, Icon, Popover } from "antd";
import moment, { Moment } from "moment";
import { fetchSlotDetails, getEventLimits } from "./calendar_utils";
import { groupMentorUidName, resetTime } from "../../../components/Vision/scheduler/utils";
import EditSlot from "../../../components/Vision/scheduler/EditSlot/EditSlot";
import axios from "axios";
import { G_API_URL } from "../../../constants/constants";
import MTHList from "./MTH-LIST/MTHList";
import momentPlugin from "@fullcalendar/moment";
import { __getToken } from "../../../utils/user-details.util";
import { openNotification } from "../../../utils/common.util";
import VisionLayout from "../../../components/Vision/Layout/vision_layout";
// import { UserOutlined } from "@ant-design/icons";

const dateFormat = "DD-MM-YYYY";

interface IState {
    Modaltitle: any;
    visible: any;
    date: any;
    events: any;
    editModalVisible: any;
    slot_details: any;
    asg_mentors: any;
    fc_visible: any;
    edit_counter: any;
    slot_type: any;
}

const VisionAdminCalendar = (props: any) => {
    const { slot_type: mode } = props.match.params;
    const defaultState = {
        Modaltitle: "New Slot",
        visible: false,
        date: null,
        events: [],
        editModalVisible: false,
        slot_details: {},
        asg_mentors: [],
        fc_visible: true,
        edit_counter: 0,
        slot_type: mode === "freeclass" ? 1 : 2
    };

    const [state, setState] = useState<IState>(defaultState);

    // Ref for Full Calendar
    const calendarRef: React.RefObject<FullCalendar> = React.createRef();

    const setCalendarEvents = async (slotType: any = state.slot_type) => {
        let date: Date = new Date();
        let today_date: Moment = moment(date);

        let events = await getEventLimits(today_date, "today", slotType);
        setState(prev => ({ ...prev, events }));
    };

    useEffect(() => {
        setCalendarEvents();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // componentDidMount = async () => {
    //     this.setCalendarEvents();

    //     // let response = await axios.get(G_API_URL + "slot/bookings");
    //     // if (response.data.data) {
    //     //     let bookings_details = response.data.data;
    //     //     let events = refactor_events(bookings_details);
    //     //     this.setState({ events });
    //     // }
    // };

    const modalCancel = (modal_name: any) => {
        if (modal_name === "new-modal")
            setState(prev => ({
                ...prev,
                visible: false,
            }));

        if (modal_name === "edit-modal") setState(prev => ({ ...prev, editModalVisible: false }));
    };

    const handleDateClick = (arg: any, type: any) => {
        // alert(arg.dateStr);
        let new_date = new Date();
        new_date = resetTime(new_date);

        if (type !== "createbtn") new_date = new Date(arg.date);

        let Modaltitle = (
            <div className="f-d modal-wrapper f-v-c">
                <p className="modal-title">New Slot</p>
                <DatePicker
                    onChange={onChange}
                    defaultValue={moment(new_date)}
                    format={dateFormat}
                    allowClear={false}
                />
            </div>
        );

        let todays_date = resetTime(new Date()).valueOf();

        if (todays_date <= new_date.valueOf())
            setState(prev => ({ ...prev, visible: true, Modaltitle: Modaltitle, date: moment(new_date) }));
    };

    // const handleFilter = async (key: any) => {
    //     const slotType = parseInt(key);
    //     setState(prev => ({
    //         ...prev,
    //         slot_type: slotType
    //     }));

    //     setCalendarEvents(slotType);
    // }

    const onChange = (date: any, dateString: any) => {
        console.log("Date change to", date);
        setState(prev => ({ ...prev, date: date }));
    };

    // Opens Edit modal on Event Click

    const handleEventClick = async ({ event, el }: any) => {
        let { slot_id, slot_type } = event.extendedProps;
        let slot_details = await fetchSlotDetails(slot_id, slot_type);
        setState(prev => ({
            ...prev,
            editModalVisible: true,
            slot_details: slot_details,
            asg_mentors: slot_details["mentors"],
        }));
    };

    const handlePrevious = async () => {
        let calendarApi = calendarRef.current && calendarRef.current.getApi();
        let event_date = calendarApi && calendarApi.currentDataManager && calendarApi.currentDataManager.getCurrentData().currentDate;
        let events = await getEventLimits(event_date, "prev", state.slot_type);
        setState(prev => ({ ...prev, events }));
        calendarApi && calendarApi.prev();
    };

    const handleNext = async () => {
        let calendarApi = calendarRef.current && calendarRef.current.getApi();
        let event_date = calendarApi && calendarApi.currentDataManager && calendarApi.currentDataManager.getCurrentData().currentDate;
        let events = await getEventLimits(event_date, "next", state.slot_type);
        setState(prev => ({ ...prev, events }));
        calendarApi && calendarApi.next();
    };

    // Edit Modal Functions below

    const handleSelectChange = (prevValue: any, nextValue: any, g_mentors: any) => {
        let { asg_mentors } = state;

        let nextValueObj = {};

        // Get the details of next Mentor Obj
        for (let index = 0; index < g_mentors.length; index++) {
            const gm_obj = g_mentors[index];

            if (gm_obj["uid"] === nextValue) {
                nextValueObj = gm_obj;
                break;
            }
        }
        let new_asg_mentors: any = [];

        asg_mentors.map((asg_obj: any) => {
            if (asg_obj["uid"] === prevValue) {
                console.log(nextValueObj);
                new_asg_mentors.push(nextValueObj);
            } else {
                new_asg_mentors.push(asg_obj);
            }
            return null;
        });

        setState(prev => ({ ...prev, asg_mentors: new_asg_mentors }));
    };

    const handleDeleteMentors = (uid: any) => {
        let { asg_mentors } = state;
        let new_asg_mentors: any = [];
        asg_mentors.map((asg_obj: any) => {
            if (asg_obj["uid"] === uid) {
                return null;
            } else {
                new_asg_mentors.push(asg_obj);
            }
            return null;
        });
        setState(prev => ({ ...prev, asg_mentors: new_asg_mentors }));
    };

    const handleEditFormSumbit = async (values: any) => {
        const { asg_mentors, slot_details, edit_counter } = state;
        let data = {
            slot_id: slot_details["slot_id"],
            mentors: asg_mentors,
            size: slot_details["size"],
            slot_validity: slot_details["slot_validity"],
            slot_type: slot_details["slot_type"],
            status: 0,
            title: values["title"],
        };

        if (values["batch_size"]) data["size"] = parseInt(values["batch_size"]);
        if (values["extra_mentors"]) {
            let extra_mentors = groupMentorUidName(values["extra_mentors"], values["g_mentors"]);
            let mentors = [...asg_mentors, ...extra_mentors];
            data["mentors"] = mentors;
        }
        if (values["edit_bs_time"])
            data["slot_validity"] = Math.round(values["edit_bs_time"] * 60 * 60);
        if (values["status"]) data["status"] = values["status"];
        axios
            .put(G_API_URL + "slot/", data, { headers: { Authorization: __getToken() } })
            .then((res: any) => {
                res = res.data;
                if (res.status && res.status === 1) {
                    openNotification("success", "Slot updated successfully");
                    setState(prev => ({ ...prev, editModalVisible: false }));
                }

                if (state.fc_visible === false) {
                    setState(prev => ({ ...prev, edit_counter: edit_counter + 1 }));
                }

                if (res.collison && res.collison.length > 0) {
                    openNotification("fail", res.collison.collison[0]);
                }

                setCalendarEvents();
            })
            .catch((error) => {
                if (error.response) {
                    openNotification("fail", error.response.data.message);
                }
            });
    };

    const handleDeleteSlot = () => {
        const { slot_details } = state;

        let data = {
            slot_id: slot_details["slot_id"],
            mode: "delete",
            slot_type: slot_details["slot_type"]
        };

        axios
            .put(G_API_URL + "slot/", data, { headers: { Authorization: __getToken() } })
            .then((res) => {
                res = res.data;
                if (res.status && res.status === 1) {
                    setState(prev => ({ ...prev, editModalVisible: false }));
                    openNotification("success", "Slot deleted successfully");
                    setCalendarEvents();
                }
            })
            .catch((error) => {
                if (error.response) {
                    openNotification("fail", error.response.data.message);
                }
            });
    };

    const handleDisplayCalendar = () => {
        setState(prev => ({ ...prev, fc_visible: false }));
    };

    const handleEditMTH = async (slot_id: any) => {
        let slot_details = await fetchSlotDetails(slot_id);
        setState(prev => ({
            ...prev,
            editModalVisible: true,
            slot_details: slot_details,
            asg_mentors: slot_details["mentors"],
        }));
    };


    const {
        Modaltitle,
        visible,
        date,
        editModalVisible,
        slot_details,
        asg_mentors,
        fc_visible,
        edit_counter,
        slot_type
    } = state;

    let style: any = { display: "none" };
    // let slotType = slot_type === 1 ? "Workshop" : 
    // slot_type === 2 ? "Live Class" : "All";
    if (fc_visible) style = {};

    // const menu = (
    //     <Menu onClick={(e) => handleFilter(e.key)}>
    //         <Menu.Item key="1">
    //             Workshop
    //         </Menu.Item>
    //         <Menu.Item key="2">
    //             Live Class
    //         </Menu.Item>
    //         <Menu.Item key="3">
    //             All
    //         </Menu.Item>
    //     </Menu>
    // );

    const content = (
        <div className="legend-wrapper">
            {/* <h4>Workshop</h4>
            <div className="f-d f-v-c element">
                <div className="pink-square square"></div>
                <span className="type">Microdegree</span>
            </div>
            <div className="f-d f-v-c element">
                <div className="purple-square square"></div>
                <span className="type">Bootcamp</span>
            </div>
            <br /> */}
            <h4>Live Class</h4>
            <div className="f-d f-v-c element">
                <div className="green-square square"></div>
                <span className="type">Microdegree</span>
            </div>
            <div className="f-d f-v-c element">
                <div className="yellow-square square"></div>
                <span className="type">Bootcamp</span>
            </div>
        </div>
    )

    return (
        <VisionLayout slot_type={mode}>
            <div className="body-container lr-pad-d lr-pad-m" style={style}>
                {
                    // @ts-ignore
                    <FullCalendar
                        plugins={[dayGridPlugin, listPlugin, interactionPlugin, momentPlugin]}
                        initialView={"dayGridWeek"}
                        headerToolbar={{
                            start: "title prevBtn nextBtn",
                            // center: "prevBtn nextBtn createSlotBtn",
                            // center: "title",
                            end: `${mode === "liveclass" ? "legendBtn " : ""}createSlotBtn dayGridMonth dayGridWeek monthList`,
                        }}
                        // defaultView="dayGridMonth"
                        views={{
                            dayGrid: {
                                // options apply to dayGridMonth, dayGridWeek, and dayGridDay views
                            },
                            timeGrid: {
                                // options apply to timeGridWeek and timeGridDay views
                            },
                            week: {
                                // options apply to dayGridWeek and timeGridWeek views
                                weekNumberFormat: "ddd",
                                dayHeaderFormat: "ddd, DD - MMM",
                            },
                            day: {
                                // options apply to dayGridDay and timeGridDay views
                            },
                        }}
                        dateClick={handleDateClick}
                        events={state.events}
                        eventClick={handleEventClick}
                        ref={calendarRef}
                        customButtons={{
                            prevBtn: {
                                text: <Icon type="left" />,
                                click: handlePrevious,
                            },
                            nextBtn: {
                                text: <Icon type="right" />,
                                click: handleNext,
                            },
                            createSlotBtn: {
                                text: (
                                    <div className="f-d f-v-c">
                                        <Icon type="plus-square" theme="filled" />
                                        <span className="create-slot-btn">Slot</span>
                                    </div>
                                ),
                                click: () => handleDateClick(null, "createbtn"),
                            },
                            // filterSlotBtn: {
                            //     text: (
                            //         <Dropdown overlay={menu} placement="bottomCenter">
                            //             <div className="f-d f-v-c filter-btn">
                            //                 <Icon type="filter" theme="filled" />
                            //                 <span className="filter-slot-btn">{slotType}</span>
                            //             </div>
                            //         </Dropdown>
                            //     )
                            // },
                            legendBtn: {
                                text: (
                                    <Popover content={content} title="Legend" trigger="hover">
                                        <div className="f-d f-v-c">
                                            <span>Legend</span>
                                        </div>
                                    </Popover>
                                )
                            },
                            monthList: {
                                text: <Icon type="database" theme="filled" />,
                                click: () => handleDisplayCalendar(),
                            },
                        }}
                    />
                }
                <NewSlot
                    title={Modaltitle}
                    visible={visible}
                    ModalCancel={modalCancel}
                    date={date}
                    setCalendarEvents={setCalendarEvents}
                    slotType={slot_type}
                />
                <EditSlot
                    title={"Edit Slot"}
                    visible={editModalVisible}
                    ModalCancel={modalCancel}
                    slot_details={slot_details}
                    asg_mentors={asg_mentors}
                    handleSelectChange={handleSelectChange}
                    handleEditFormSumbit={handleEditFormSumbit}
                    handleDeleteMentors={handleDeleteMentors}
                    handleDeleteSlot={handleDeleteSlot}
                />
            </div>

            <MTHList
                visible={!fc_visible}
                handleEditMTH={handleEditMTH}
                handleFCVisible={() => {
                    setState(prev => ({ ...prev, fc_visible: !fc_visible }));
                    setCalendarEvents();
                }}
                edit_counter={edit_counter}
            />

            <style jsx>{`
                .fc-toolbar-title {
                    color: var(--dove);
                }

                .fc-header-toolbar > :first-child {
                    width: 34%;
                }

                .fc-header-toolbar .fc-toolbar-title {
                    width: 60%;
                }

                .fc-header-toolbar .fc-toolbar-chunk {
                    display: flex;
                }

                .modal-wrapper .modal-title {
                    margin-right: 2rem;
                    margin-bottom: unset;
                }

                .modal-wrapper .modal-date {
                    font-size: 18px;
                    font-weight: 300;
                }
                .modal-wrapper .ant-calendar-picker-input {
                    height: 45px;
                }

                .create-slot-btn, .filter-slot-btn {
                    margin-left: 10px;
                }

                .filter-btn {
                    min-width: 50px;
                }

                .legend-wrapper .square { 
                    height: 15px;
                    width: 15px;
                }

                .legend-wrapper .type {
                    margin-left: 5px;
                }

                .legend-wrapper .purple-square {
                    background-color: var(--purple);
                }

                .legend-wrapper .pink-square {
                    background-color: var(--pink);
                }

                .legend-wrapper .green-square {
                    background-color: var(--go);
                }

                .legend-wrapper .yellow-square {
                    background-color: var(--joy);
                }

                .legend-wrapper .element {
                    margin: 0 0 2px;
                }
            `}</style>
        </VisionLayout>
    );
}
export default VisionAdminCalendar;
