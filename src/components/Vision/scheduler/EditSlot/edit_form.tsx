import React, { useEffect, useState } from "react";
import { Form, Button, Icon, Switch } from "antd";
import { FormInput, FormInputSelectMultiple, FormInputSelect, FormInputNumber } from "../../../Form/input";
import { notRequired } from "../rules";
import { time } from "../data";

interface IState {
    checked: boolean;
}

const EditFormBody = (props: any) => {
    const defaultState = {
        checked: false,
    };

    const [state, setState] = useState<IState>(defaultState);
    const { published } = props;
    useEffect(() => {
        setState(prev => ({ ...prev, checked: published }));
    }, [published]);

    // componentDidMount() {

    // }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        props.form.validateFieldsAndScroll(async (err: any, values: any) => {
            if (!err) {
                const { handleEditFormSumbit, g_mentors } = props;
                values["g_mentors"] = g_mentors;
                values["status"] = 0;
                if (state.checked) values["status"] = 1;

                handleEditFormSumbit(values);
            }
        });
    };

    const onChange = (e: any, type: any) => {
        if (type === "select") {
            setState({ checked: e });
        }
    };

    const { getFieldDecorator } = props.form;
    const { extra_mentors, slot_validity, batch_size, title, handleDeleteSlot, bookings, slotType } = props;
    const { checked } = state;

    let switch_className = "";

    if (checked) switch_className = "switch-true";

    let delete_slot_jsx: any = (
        <div className="c-pointer custom-date" onClick={handleDeleteSlot}>
            Delete Slot
        </div>
    );

    let FlexClassName = "f-h-sb";

    if (bookings !== 0) {
        delete_slot_jsx = null;
        FlexClassName = "f-h-e";
    }

    return (
        <>
            <Form onSubmit={handleSubmit} id={"edit-form-wrapper"}>
                <FormInputSelectMultiple
                    label={"Mentors"}
                    getFieldDecorator={getFieldDecorator}
                    placeholder={"Add mentors in order of priority"}
                    name={"extra_mentors"}
                    options={["Rushil", "HMC"]}
                    rules={notRequired("mentors")}
                    select_options={extra_mentors}
                />
                <FormInput
                    label={"Title"}
                    getFieldDecorator={getFieldDecorator}
                    placeholder={"Add Title"}
                    name={"title"}
                    //rules={commonRules("title")}
                    defaultValue={title}
                />

                <div className="g-d g-col-2">
                    {
                        slotType === 1 &&
                        <div className="user-book f-d f-h-sb f-v-c">
                            <FormInputSelect
                                label={"Users can book the slot "}
                                getFieldDecorator={getFieldDecorator}
                                placeholder={"Time (hrs)"}
                                name={"edit_bs_time"}
                                options={time}
                                rules={notRequired("book slot time")}
                                value={slot_validity}
                            />
                            <div>before the start of the session.</div>
                        </div>
                    }

                    <div className={`f-d ${slotType === 1 ? "f-h-e" : ""}`}>
                        <FormInputNumber
                            label={"Batch Size"}
                            getFieldDecorator={getFieldDecorator}
                            name={"batch_size"}
                            defaultValue={batch_size}
                            rules={notRequired("batch size")}
                            placeholder={"0"}
                        />
                    </div>
                </div>

                <div className={`modal-footer-wrapper f-d ${FlexClassName} f-v-c`}>
                    {delete_slot_jsx}
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
                                Apply
                            </Button>
                        </Form.Item>
                    </div>
                </div>
            </Form>
            <style jsx>
                {`
                    #edit-form-wrapper {
                        margin-top: 2rem;
                    }
                `}
            </style>
        </>
    );
}

const EditForm = Form.create<any>({ name: "edit-form" })(EditFormBody);
export default EditForm;
