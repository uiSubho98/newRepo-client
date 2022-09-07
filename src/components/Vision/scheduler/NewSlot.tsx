import React, { useEffect, useState } from "react";
import { Modal, Form, Button, Switch, Icon } from "antd";
import NewSlotForm from "./NewSlotForm";
import axios from "axios";
import { G_API_URL } from "../../../constants/constants";
import { __getToken } from "../../../utils/user-details.util";
import { convertDateToValue, groupMentorUidName, resetTime } from "./utils";
import { DateUtils } from "react-day-picker";
import CustomDates from "./customDates/customDates";
import { openNotification } from "../../../utils/common.util";

interface IState {
    checked: boolean; 
    mentors_list: any;
    batch_list: any;
    selectedDays: any;
    cdMVisible: boolean;
}

const NewSlotModal = (props: any) => {
    const defaultState = { 
        checked: false, 
        mentors_list: [], 
        batch_list: [],
        selectedDays: [], 
        cdMVisible: false 
    };

    const [state, setState] = useState<IState>(defaultState);

    useEffect(() => {
        const headers = {
            headers: {
                Authorization: __getToken(),
            }
        };
        let mentors_api = axios.get(G_API_URL + "auth/mentors", headers);
        let batches_api = axios.get(G_API_URL + "program/batches", headers);

        Promise.all([
            mentors_api,
            batches_api
        ]).then(response => {
            let mentors_list = response[0].data.data;
            let batch_list = response[1].data;
            setState(prev => ({ ...prev, mentors_list, batch_list }));
        }).catch(err => {
            console.log(err);
        });

        // axios
        //     .get(mentors_api, {
        //         headers: {
        //             Authorization: __getToken(),
        //         },
        //     })
        //     .then((res) => {
        //         let mentors_list = res.data.data;
        //         setState(prev => ({ ...prev, mentors_list }));
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
    },[]);

    // make mentors obj by matching uid with the state

    const handleSubmit = (e: any) => {
        e.preventDefault();

        props.form.validateFieldsAndScroll(async (err: any, values: any) => {
            if (err) {
                openNotification("fail", "Error Please fill the form fields");
            }

            if (!err) {
                // For Publish Status
                let pb_status = 0;
                let gg = 1;
                let slot_type = props.slotType;
                if (state.checked) pb_status = 1;
                if (values["gg"] === "bootcamp") gg = 2;
                if(!values["bs_time"]) values["bs_time"] = 1;
                let stdh = values["start_time"].format("HH");
                let stdm = values["start_time"].format("mm");

                let etdh = values["end_time"].format("HH");
                let etdm = values["end_time"].format("mm");
                stdh = parseInt(stdh);
                etdh = parseInt(etdh);
                stdm = parseInt(stdm);
                etdm = parseInt(etdm);
                let title = values["title"];

                let date = props.date;

                let st = stdh * 60 * 60 + stdm * 60;
                let et = etdh * 60 * 60 + etdm * 60;

                date = date.valueOf() / 1000;
                date = Math.round(date);

                let slot_validity = parseInt(values["bs_time"]) * 60 * 60;

                let selected_days = convertDateToValue(state.selectedDays);
                selected_days.push(date);

                let slot_create_api = G_API_URL + "slot/create/";
                let data: any = {
                    gg: gg,
                    slot_type: slot_type,
                    st: st,
                    et: et,
                    days: selected_days,
                    mentors: groupMentorUidName(values["mentors"], state.mentors_list),
                    status: pb_status,
                    slot_validity: slot_validity,
                    size: values["batch_size"],
                    title
                };

                if(slot_type === 2) {
                    data.batch_id = values["batch_id"]
                }
                // console.log("Data", data);

                // Create SLOT API CALL
                try {
                    let slot_api_call = await axios.post(slot_create_api, data, {
                        headers: { Authorization: __getToken() },
                    });
                    console.log("Response from save api", slot_api_call);

                    // Update the events after saving
                    props.setCalendarEvents();

                    // Uncomment below line to close modal function call

                    if (
                        slot_api_call.data &&
                        slot_api_call.data.collison &&
                        slot_api_call.data.collison.length > 0
                    ) {
                        openNotification("fail", slot_api_call.data.collison[0]);
                    }

                    props.ModalCancel("new-modal");
                    deleteDays();
                    setState(prev => ({ ...prev, cdMVisible: false }));
                } catch (error) {
                    if (error.response) {
                        openNotification("fail", error.response.data.message);
                    }
                }
            }
        });
    };

    const onChange = (e: any, type: any) => {
        if (type === "select") {
            setState(prev => ({ ...prev,checked: e }));
        }
    };

    // Select Custom Dates Handler

    const handleDayClick = (day: Date, modifiers:any = {}) => {
        const { selectedDays } = state;

        day = resetTime(day);
        let disabled_day = props.date;
        disabled_day = resetTime(disabled_day);

        if (day.valueOf() !== disabled_day.valueOf()) {
            if (modifiers.selected) {
                const selectedIndex = selectedDays.findIndex((selectedDay: any) =>
                    DateUtils.isSameDay(selectedDay, day)
                );
                selectedDays.splice(selectedIndex, 1);
            } else if (modifiers.disabled) {
                console.log("day disbaled");
            } else {
                selectedDays.push(day);
            }
        }

        setState(prev => ({ ...prev,selectedDays }));
    };

    const showCdModal = () => {
        let cdMVisible = state.cdMVisible;
        setState(prev => ({ ...prev, cdMVisible: !cdMVisible }));
    };

    const hideCdModal = () => {
        setState(prev => ({ ...prev, cdMVisible: false }));
    };

    // Delete Days from State on Close
    const deleteDays = () => {
        setState(prev => ({ ...prev, selectedDays: [] }));
    };

    const { getFieldDecorator } = props.form;
    const { title, visible, ModalCancel, slotType } = props;
    const { checked, mentors_list, batch_list, cdMVisible, selectedDays } = state;
    let switch_className = "";

    if (checked) switch_className = "switch-true";

    return (
        <>
            <Modal
                title={title}
                visible={visible}
                onCancel={() => {
                    ModalCancel("new-modal");
                    deleteDays();
                }}
                footer={null}
                width={900}
                destroyOnClose={true}
            >
                <Form onSubmit={handleSubmit}>
                    <NewSlotForm
                        getFieldDecorator={getFieldDecorator}
                        mentors_list={mentors_list}
                        batch_list={batch_list}
                        slotType={slotType}
                    />

                    <div className={`modal-footer-wrapper f-d ${slotType === 1 ? 
                    "f-h-sb" : "f-h-e"} f-v-c`}>
                        {
                            slotType === 1 &&
                            <div className="c-pointer custom-date" onClick={showCdModal}>
                                Apply to custom dates
                            </div>
                        }

                        <div className="modal-footer-right f-d f-v-c f-h-e">
                            <div className={`publish-check ${switch_className}`}>
                                <div className="msg">Published</div>
                                <Switch
                                    checked={checked}
                                    onChange={(e) => onChange(e, "select")}
                                    checkedChildren={<Icon type="check" />}
                                    unCheckedChildren={<Icon type="close" />}
                                />
                            </div>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" id="submitbtn">
                                    Apply to current date
                                </Button>
                            </Form.Item>
                        </div>
                    </div>
                </Form>

                {/* Custom Dates Modal */}

                <CustomDates
                    visible={cdMVisible}
                    ModalCancel={hideCdModal}
                    selectedDays={selectedDays}
                    handleDayClick={handleDayClick}
                    disableDate={props.date}
                    handleApplyBtn={handleSubmit}
                    published_status={checked}
                    onChange={onChange}
                />
            </Modal>

            <style jsx>
                {`
                    .switch-true .ant-switch {
                        background-color: var(--purple);
                    }

                    .modal-footer-right .publish-check {
                        display: flex;
                        margin-right: 3rem;
                    }

                    .modal-footer-right .publish-check .msg {
                        margin-right: 16px;
                    }

                    .modal-footer-right .ant-form-item {
                        margin-bottom: unset;
                    }

                    .modal-footer-right #submitbtn {
                        background-color: var(--purple);
                        outline: none;
                        border: none;
                    }

                    .modal-footer-wrapper .custom-date {
                        color: var(--purple);
                        font-weight: 500;
                    }
                `}
            </style>
        </>
    );
}

const NewSlot = Form.create<any>({ name: "new-slot" })(NewSlotModal);
export default NewSlot;
