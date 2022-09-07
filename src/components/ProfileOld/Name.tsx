import React from "react";
import Form, { FormComponentProps } from "antd/lib/form"
import { Input, Modal } from "antd";
import { EditOutlined } from "@ant-design/icons";

interface NameProps extends FormComponentProps{
    isEditNameModalVisible: boolean
    updateEditNameModalVisible: (val: boolean) => void
    profileName: string
    changeName: (name: string) => void
    allowEditing: Boolean
}

const NameForm = (props: NameProps) => {
    const {getFieldDecorator} = props.form;
    const {isEditNameModalVisible, updateEditNameModalVisible, profileName, changeName, allowEditing} = props;
    const updateName = () => {
        changeName(props.form.getFieldValue('name'))
        updateEditNameModalVisible(false)
    }

    return (
        <>
            <h4 className="h4-heading">{profileName}
            {allowEditing && <EditOutlined onClick={() => {updateEditNameModalVisible(true)}}/>}
            </h4>
            <Modal 
                title="Edit Name" 
                visible={isEditNameModalVisible} 
                onOk={()=> {updateName()}} onCancel={()=> {updateEditNameModalVisible(false)}}
                destroyOnClose={true}
            >
                {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'Please enter name!' }],
                    initialValue: profileName
                })(
                    <Input />,
                )}
            </Modal>
        </>
    );
}

export default Form.create<NameProps>({ name: 'name_form' })(NameForm);