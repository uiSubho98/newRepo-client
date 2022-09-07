import { Modal, Form, Button } from "antd";
import React from "react";
import { __getToken } from "../../../../utils/user-details.util";
import { FormInputSelect } from "../../../Form/input";
import { commonRules } from "../rules";
import axios from "axios";
import { G_API_URL } from "../../../../constants/constants";
import { openNotification } from "../../../../utils/common.util";

const EditBookDetials = (props: any) => {

    const renderAttStatus = (userData: any) => {
        let att_status = <div className="att-notmarked">NOT MARKED</div>;
        if (userData && userData.att && userData.att === "P")
            att_status = <div className="att-present">PRESENT</div>;
        else if (userData && userData.att && userData.att === "A")
            att_status = <div className="att-absent">ABSENT</div>;
        return att_status;
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        props.form.validateFieldsAndScroll(async (err: any, values: any) => {
            if (!err) {
                let att = "A";
                if (values.att === "Present") att = "P";
                let data = {
                    att: att,
                    uid: props.userData.uid,
                };

                axios
                    .put(G_API_URL + "slot/update-att/", data, {
                        headers: { Authorization: __getToken() },
                    })
                    .then((res) => {
                        if (res.data.status === 1) {
                            openNotification("success", "Attd. updated successfully");
                            props.ModalCancel("edit-modal");
                        } else {
                            openNotification("fail", "Attd. could not be updated");
                            props.ModalCancel("edit-modal");
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        });
    };


    const { title, visible, ModalCancel, userData } = props;
    const { getFieldDecorator } = props.form;
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
                <div className="edit-book-wrapper">
                    <div className="att-status f-d f-h-c">
                        <div className="heading">Attendance Status:</div>
                        {renderAttStatus(userData)}
                    </div>
                </div>

                <Form onSubmit={handleSubmit} id={"edit-book-form"}>
                    <FormInputSelect
                        label={"Update Attendance"}
                        getFieldDecorator={getFieldDecorator}
                        placeholder={"Mark Present/Absent"}
                        name={"att"}
                        options={["Present", "Absent"]}
                        rules={commonRules("attendance")}
                    />

                    <Form.Item>
                        <Button type="primary" htmlType="submit" id="submitbtn">
                            UPDATE
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <style jsx>
                {`
                    .edit-book-wrapper .att-status {
                        margin-top: 2rem;
                        margin-bottom: 2rem;
                    }

                    .edit-book-wrapper .att-status .heading {
                        margin-right: 16px;
                    }
                `}
            </style>
        </>
    );
}

const EditBook = Form.create<any>({ name: "edit-book" })(EditBookDetials);
export default EditBook;
