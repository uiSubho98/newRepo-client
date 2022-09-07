import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { EditMentors, SlotDetails } from "./edit_utils";
import axios from "axios";
import { G_API_URL } from "../../../../constants/constants";
import { __getToken } from "../../../../utils/user-details.util";

interface IState {
    mentors_list: any;
}

const EditSlot = (props: any) => {
    const defaultState = {
        mentors_list: [],
    };

    const [state, setState] = useState<IState>(defaultState);

    useEffect(() => {
        let mentors_api = G_API_URL + "auth/mentors";

        axios
            .get(mentors_api, {
                headers: {
                    Authorization: __getToken(),
                },
            })
            .then((res) => {
                let mentors_list = res.data.data;
                setState(prev => ({ ...prev, mentors_list }));
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])


    const {
        title,
        visible,
        ModalCancel,
        slot_details,
        asg_mentors,
        handleSelectChange,
        handleEditFormSumbit,
        handleDeleteMentors,
        handleDeleteSlot,
    } = props;

    let h_slot_v = null;
    let batch_size = null;
    let slot_title = null;
    let slot_publish = false;
    let bookings = 0;
    if (slot_details["status"]) slot_publish = true;
    if (slot_details["bookings"]) bookings = slot_details["bookings"].length;

    //    Slot Validity
    if (slot_details["slot_validity"] && slot_details["size"] && slot_details["sdt"]) {
        let { slot_validity, sdt } = slot_details;
        h_slot_v = sdt - slot_validity;
        h_slot_v = h_slot_v / (60 * 60);
        batch_size = slot_details["size"];
        slot_title = slot_details["title"];
    }

    const { mentors_list } = state;
    return (
        <>
            <Modal
                title={title}
                visible={visible}
                onCancel={() => {
                    ModalCancel("edit-modal");
                }}
                footer={null}
                width={900}
                destroyOnClose={true}
            >
                <SlotDetails
                    gg={slot_details["gg"]}
                    sdt={slot_details["sdt"]}
                    edt={slot_details["edt"]}
                    batch_size={slot_details["size"]}
                    slot_type={slot_details["slot_type"]}
                />

                <EditMentors
                    asg_mentors={asg_mentors}
                    g_mentors={mentors_list}
                    handleSelectChange={handleSelectChange}
                    slot_validity={h_slot_v}
                    batch_size={batch_size}
                    published={slot_publish}
                    handleEditFormSumbit={handleEditFormSumbit}
                    handleDeleteMentors={handleDeleteMentors}
                    handleDeleteSlot={handleDeleteSlot}
                    bookings={bookings}
                    title={slot_title}
                    slotType={slot_details["slot_type"]}
                />
            </Modal>
        </>
    );
}

export default EditSlot;
