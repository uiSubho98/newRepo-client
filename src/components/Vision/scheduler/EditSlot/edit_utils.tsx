import React, { useEffect, useState } from "react";
import moment from "moment";
import { Select, Button } from "antd";
import EditForm from "./edit_form";

const { Option } = Select;

const SlotDetails = (props: any) => {
    const { gg, slot_type, sdt, edt } = props;
    let m_sdt = moment(sdt * 1000);
    let m_edt = moment(edt * 1000);

    let gg_disp = <></>;
    let dot_color = slot_type === 1 ? "dot-pink" : "dot-green";
    // let slot_type_disp = <></>;
    // let square_color = "square-pink";

    if (gg === 1)
        gg_disp = (
            <div className="f-d f-v-c">
                <div className={`dot ${dot_color}`}></div>
                <div>microdegree</div>
            </div>
        );
    else if (gg === 2) {
        dot_color = slot_type === 1 ? "dot-purple" : "dot-yellow";
        gg_disp = (
            <div className="f-d f-v-c">
                <div className={`dot ${dot_color}`}></div>
                <div>bootcamp</div>
            </div>
        );
    }

    // if(slot_type === 1) {
    //     slot_type_disp = (
    //         <div className="f-d f-v-c">
    //             <div className={`square ${square_color}`}></div>
    //             <div>workshop</div>
    //         </div> 
    //     )
    // } else {
    //     dot_color = "square-purple";
    //     slot_type_disp = (
    //         <div className="f-d f-v-c">
    //             <div className={`square ${square_color}`}></div>
    //             <div>live class</div>
    //         </div>
    //     );
    // }

    return (
        <>
            <div className="f-d edit-modal-header">
                Slot Details | {m_sdt.format("ddd DD MMM YYYY")} | {m_sdt.format("hh:mm A")} -{" "}
                {m_edt.format("hh:mm A")} | {gg_disp}
            </div>
            <style jsx>
                {`
                    .edit-modal-header {
                        margin-bottom: 2rem;
                    }

                    .edit-modal-header .dot,
                    .edit-modal-header .square {
                        width: 10px;
                        height: 10px;
                        border-radius: 50%;
                        margin-left: 8px;
                        margin-right: 8px;
                    }

                    .edit-modal-header .square {
                        border-radius: 4%;
                    }

                    .edit-modal-header .dot-purple,
                    .edit-modal-header .square-purple {
                        background-color: var(--purple);
                    }

                    .edit-modal-header .dot-pink,
                    .edit-modal-header .square-pink {
                        background-color: var(--pink);
                    }

                    .edit-modal-header .dot-green {
                        background-color: var(--go);
                    }

                    .edit-modal-header .dot-yellow {
                        background-color: var(--joy);
                    }
                `}
            </style>
        </>
    );
};

const MentorSelectField = (value: any, g_mentors: any, disabled: any, handleSelectChange: any, asg_uid: any) => {
    return (
        <Select
            defaultValue={value.uid}
            style={{ width: 120 }}
            disabled={disabled}
            onChange={(ch_value: any) => handleSelectChange(value.uid, ch_value, g_mentors)}
        >
            {g_mentors.map((m_obj: any) => (
                <Option value={m_obj.uid} key={m_obj.uid} disabled={asg_uid.has(m_obj.uid)}>
                    {m_obj.userName}
                </Option>
            ))}
        </Select>
    );
};

const getASGUidSet = (asg_mentors: any) => {
    let asg_uid: any = [];

    asg_mentors.map(({ uid }: any) => {
        asg_uid.push(uid);
        return null;
    });

    return asg_uid;
};

interface IState {
    disabled: any;
}

const RenderMentors = (props: any) => {
    const defaultState = {
        disabled: [],
    };

    const [state, setState] = useState<IState>(defaultState);
    const {asg_mentors} = props;
    useEffect(() => {
        let asg_len = asg_mentors.length;
        let disabled = Array(asg_len).fill(true);
        setState(prev => ({ ...prev, disabled }));
    }, [asg_mentors])

    // componentDidMount() {

    // }

    const handleClick = (value: number, from: string) => {
        if (from === "reassign") {
            let disabled: Array<Boolean> = state.disabled;
            disabled[value] = false;
            setState(prev => ({ ...prev, disabled }));
        }
    };

    const renderASGMentors = () => {
        let {
            asg_mentors,
            g_mentors,
            handleSelectChange,
            batch_size,
            handleDeleteMentors,
            bookings
        } = props;
        const { disabled } = state;
        let seats_booked = bookings;
        let asg_uid = getASGUidSet(asg_mentors);

        return asg_mentors.map((mentor_obj: any, idx: any) => {

            if(bookings >= batch_size) seats_booked = batch_size;
            else if(bookings <= 0) seats_booked = 0;
            else if(bookings < batch_size ) seats_booked = bookings


            let response = (
                <div
                    className={`g-d g-col-3 mentor-${mentor_obj["uid"]} mentors-wrapper`}
                    id={mentor_obj["uid"]}
                    key={mentor_obj["uid"]}
                >
                    <div className="f-d f-h-c">
                        {MentorSelectField(
                            mentor_obj,
                            g_mentors,
                            disabled[idx],
                            handleSelectChange,
                            new Set(asg_uid)
                        )}
                    </div>
                    <div className="f-d f-h-c">{seats_booked} / {batch_size}</div>
                    <div className="f-d f-h-c">
                        <Button id="reassign-btn" onClick={() => handleClick(idx, "reassign")}>
                            Reassign
                        </Button>
                        {!seats_booked && <Button
                            type="danger"
                            onClick={() => handleDeleteMentors(mentor_obj["uid"])}
                        >
                            Delete
                        </Button>}
                    </div>
                </div>
            );
        
            bookings = bookings - batch_size;

            return response;
        
        });
    };

    // render() {
        return <>{renderASGMentors()}</>;
    // }
}

const EditMentors = (props: any) => {
    const {
        asg_mentors,
        g_mentors,
        handleSelectChange,
        slot_validity,
        batch_size,
        title,
        published,
        handleEditFormSumbit,
        handleDeleteMentors,
        handleDeleteSlot,
        bookings,
        slotType
    } = props;
    let extra_mentors = renderExtraMentors(asg_mentors, g_mentors);

    return (
        <>
            <div className="edit-mentors-wrapper">
                <div className="g-d g-col-3">
                    <div className="f-d f-h-c">Mentors</div>
                    <div className="f-d f-h-c">Seats booked</div>
                    <div className="f-d f-h-c">Actions</div>
                </div>
                <RenderMentors
                    asg_mentors={asg_mentors}
                    g_mentors={g_mentors}
                    handleSelectChange={handleSelectChange}
                    batch_size={batch_size}
                    handleDeleteMentors={handleDeleteMentors}
                    bookings={bookings}
                />
                <EditForm
                    extra_mentors={extra_mentors}
                    slot_validity={slot_validity}
                    batch_size={batch_size}
                    title = {title}
                    published={published}
                    handleEditFormSumbit={handleEditFormSumbit}
                    g_mentors={g_mentors}
                    handleDeleteSlot={handleDeleteSlot}
                    bookings={bookings}
                    slotType={slotType}
                />
            </div>
            <style jsx>
                {`
                    .edit-mentors-wrapper .mentors-wrapper {
                        margin-top: 2rem;
                    }

                    #reassign-btn {
                        background-color: var(--purple);
                        color: var(--dove);
                        margin-right: 8px;
                        border: none;
                    }
                `}
            </style>
        </>
    );
};

const renderExtraMentors = (asg_mentors: any, g_mentors: any) => {
    let asg_uids = getASGUidSet(asg_mentors);
    asg_uids = new Set(asg_uids);

    const select_options = g_mentors.map(({ uid, userName }: any) => {
        return (
            <Option value={uid} key={uid} disabled={asg_uids.has(uid)}>
                {userName}
            </Option>
        );
    });

    return select_options;
};

export { SlotDetails, EditMentors };
