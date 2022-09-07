import React from "react";
import {
    FormInput,
    FormInputNumber,
    FormInputSelect,
    FormInputSelectMultiple,
    FormInputTimePicker,
} from "../../Form/input";
import { programs, time } from "./data";
import { commonRules } from "./rules";
import { renderBatches, renderGGOptions } from "./utils";

const config = {
    rules: [{ type: "object", required: true, message: "Please select time!" }],
};

const format = "HH:mm";

const NewSlotForm = ({ getFieldDecorator, mentors_list, batch_list, slotType }: any) => {
    // const [slotType, setSlotType] = useState<any>(1);

    // const handleSlotChange = (slotType:any) => {
    //     slotType = slotType === "workshop" ? 1 : 2;
    //     setSlotType(slotType);
    // }

    return (
        <>
            <div className="form-wrapper f-d f-h-sb">
                <div className="left-form">
                    <div className="time-wrapper f-d f-h-sb">
                        <FormInputTimePicker
                            label="From"
                            placeholder="HH:MM"
                            config={config}
                            format={format}
                            getFieldDecorator={getFieldDecorator}
                            name={"start_time"}
                        />

                        <FormInputTimePicker
                            label="To"
                            placeholder="HH:MM"
                            config={config}
                            format={format}
                            getFieldDecorator={getFieldDecorator}
                            name={"end_time"}
                        />
                    </div>

                    {
                        slotType === 1 &&
                        <div className="user-book f-d f-h-sb f-v-c">
                            <FormInputSelect
                                label={"Users can book the slot "}
                                getFieldDecorator={getFieldDecorator}
                                placeholder={"Time (hrs)"}
                                name={"bs_time"}
                                options={time}
                                rules={commonRules("book slot time")}
                                value={1}
                            />
                            <div>before the start of the session.</div>
                        </div>
                    }

                    {/* <FormInputSelect
                        label={"Slot Type"}
                        getFieldDecorator={getFieldDecorator}
                        placeholder={"Select a slot type"}
                        name={"slot_type"}
                        options={slotTypes}
                        handleChange={handleSlotChange}
                        rules={commonRules("slot type")}
                        select_options={renderSlotTypes()}
                    /> */}
                    { 
                        slotType === 2 &&
                        <FormInputSelect
                            label={"Batch"}
                            getFieldDecorator={getFieldDecorator}
                            slotType={slotType}
                            placeholder={"Select a batch"}
                            name={"batch_id"}
                            options={batch_list}
                            rules={commonRules("batch")}
                            select_options={renderBatches(batch_list)}
                        />
                    }
                    {
                        slotType === 2 &&
                        <FormInput
                            label = {"Title"}
                            getFieldDecorator = {getFieldDecorator}
                            placeholder = {"Add Title"}
                            name = {"title"}
                            rules = {commonRules("title")}
                        />
                    }
                </div>

                <div className="right-form">
                {
                    slotType === 2 &&
                    <FormInputSelect
                        label={"Program"}
                        getFieldDecorator={getFieldDecorator}
                        placeholder={"Select a program"}
                        name={"gg"}
                        options={programs}
                        rules={commonRules("year")}
                        select_options={renderGGOptions()}
                    />
                }

                    <FormInputSelectMultiple
                        label={"Mentors"}
                        getFieldDecorator={getFieldDecorator}
                        placeholder={"Add mentors in order of priority"}
                        name={"mentors"}
                        options={mentors_list}
                        rules={commonRules("mentors")}
                    />


                    <FormInputNumber
                        label={"Batch Size"}
                        getFieldDecorator={getFieldDecorator}
                        name={"batch_size"}
                        defaultValue={8}
                        rules={commonRules("batch size")}
                        placeholder={"0"}
                    />
                </div>
            </div>
            <style jsx>{`
                .form-wrapper .left-form {
                    width: 45%;
                }

                .form-wrapper .right-form {
                    width: 45%;
                }

                #new-slot_bs_time {
                    width: 80%;
                }

                .time-wrapper .ant-row {
                    width: 45%;
                }

                .form-wrapper .ant-time-picker {
                    width: 100% !important;
                }
            `}</style>
        </>
    );
};

export default NewSlotForm;
