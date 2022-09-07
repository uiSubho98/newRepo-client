import React from "react";
import Form, { FormComponentProps } from "antd/lib/form"
import { Input, message, Modal } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { G_API_URL, G_URL } from "../../constants/constants";
import axios from "axios";
import { __getToken } from "../../utils/user-details.util";
import { login_user } from "../../utils/login.util";

interface UsernameProps extends FormComponentProps{
    isEditUnameModalVisible: boolean
    updateEditUnameModalVisible: (val : boolean) => void
    uname: string
    allowEditing: Boolean
}

const UsernameForm = (props: UsernameProps) => {
    const {getFieldDecorator} = props.form;
    const {isEditUnameModalVisible, updateEditUnameModalVisible, uname, allowEditing} = props;
    const updateUsername = () => {
        let username = props.form.getFieldValue('username')
        // Update username, get new token and page redirect
        axios.post(G_API_URL+"profile/update-username", {
            username
        },{
            headers: {
                Authorization: __getToken()
            }
        }).then(response => {
            response = response.data;
            if(response.status) {
                // Set token
                login_user(response);

                // Redirect to new username
                window.location.href = G_URL + 'profile/' + username;
            } else {
                message.error("This username is not available");
            }
        }).catch(err => console.log(err))
    }
    return (
        <>
            <h5 className="h5-heading">
                ({uname})
                {allowEditing && <EditOutlined onClick={() => {updateEditUnameModalVisible(true)}}/>}
            </h5>
            <Modal 
                title="Edit Username" 
                visible={isEditUnameModalVisible} 
                onOk={()=> {updateUsername()}} onCancel={()=> {updateEditUnameModalVisible(false)}}
                destroyOnClose={true}
            >
                {getFieldDecorator('username', {
                    rules: [{ required: true, message: 'Please enter username!' }],
                    initialValue: uname
                })(
                    <Input />,
                )}
            </Modal>
        </>
    );
}

export default Form.create<UsernameProps>({ name: 'username_form' })(UsernameForm);