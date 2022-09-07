import React from "react";
import Form, { FormComponentProps } from "antd/lib/form"
import { Input, Modal } from "antd";
import { EditOutlined } from "@ant-design/icons";

interface DescriptionProps extends FormComponentProps{
    isEditDescModalVisible: boolean
    updateEditDescModalVisible: (val: boolean) => void
    desc: string
    updateDesc: (desc: string) => void
    allowEditing: Boolean
}

const DescriptionForm = (props: DescriptionProps) => {
    const {getFieldDecorator} = props.form;
    const {isEditDescModalVisible, updateEditDescModalVisible, desc, updateDesc, allowEditing} = props;
    const updateDescription = () => {
        updateDesc(props.form.getFieldValue('desc'))
        updateEditDescModalVisible(false)
    }
    return (
        <>
            <span className="body-small">{desc}</span>
            {allowEditing && <EditOutlined onClick={() => {updateEditDescModalVisible(true)}}/>}
            <Modal 
                title="Edit Short Description" 
                visible={isEditDescModalVisible} 
                onOk={()=> {updateDescription()}} onCancel={()=> {updateEditDescModalVisible(false)}}
                destroyOnClose={true}
            >
                {getFieldDecorator('desc', {
                    rules: [{ required: true, message: 'Please description!' }],
                    initialValue: desc
                })(
                    <Input />,
                )}
            </Modal>
        </>
    );
}

export default Form.create<DescriptionProps>({ name: 'description_form' })(DescriptionForm);