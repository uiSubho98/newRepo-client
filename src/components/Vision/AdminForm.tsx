import React, {useState} from "react";
import {Button, Col, Form, Input, Modal, Row, Select} from "antd";
// @ts-ignore
import jwtDecode from "jwt-decode";
import {__getCookie} from "../../utils/cookie.util";
import keys from "../../config/keys";

const {Option} = Select;
const decodedToken = jwtDecode(__getCookie(keys.cookiePrefix + "ut").cookieValue);

interface IState {
    att: string
}

const AdminForm = (props: any) => {
    const defaultState = {
        att: ''
    }

    const [state, setState] = useState<IState>(defaultState);

    const handleAttendanceChange = (e:any) => {
        setState({att: e});
        props.form.setFieldsValue({attendance: e})

    }

    const getGradeOptions = () => {
        let gradeOptions = [];
        gradeOptions.push(<Option key='A' value='A'>A</Option>);
        gradeOptions.push(<Option key='B' value='B'>B</Option>);
        gradeOptions.push(<Option key='C' value='C'>C</Option>);
        gradeOptions.push(<Option key='D' value='D'>D</Option>);
        return gradeOptions;
    }

    const handleSubmit = (e: any) => {
        const {parent_email, parent_name, student_email, bookedAt,slot_ts, student_name, college, uid, gg, slot_type} = props;
        e.preventDefault();
        props.form.validateFields((err:any, values:any) => {
            if (!err) {
                values.uid = uid;
                values.parent_name = parent_name;
                values.bookedAt = bookedAt;
                values.slot_ts = slot_ts;
                values.gg = gg;
                values.slot_type = slot_type;
                values.college = college;
                if (state.att === 'A' || gg === 2) {
                    values.parent_email = parent_email;
                    values.student_email = student_email;
                    values.student_name = student_name;
                    values.mentor = decodedToken.name;
                }
                props.handleSubmit(values)
            }
        });
    }



    const {modalVisible, student_email, student_name, handleClose,btnTxt,isSubmitting, slot_type, gg} = props;
    const {getFieldDecorator} = props.form;
    const {att} = state;
    return (
        <>
            <Modal
                className="add-webinar-modal"
                footer={null}
                width='720px'
                centered
                destroyOnClose={true}
                visible={modalVisible}
                onCancel={() => {
                    handleClose();
                    setState(prev => ({...prev, att: ''}));
                }}
            >
                <Form className={"info-form"} onSubmit={handleSubmit}>
                    <Form.Item label='Update Attendance'>
                        {getFieldDecorator('attendance', {
                            rules: [{required: true, message: 'Please select attendance'}]
                        })(
                            <>
                                <Select placeholder="Update Attendance" onChange={handleAttendanceChange}>
                                    <Option key='P' value='P'>Present</Option>
                                    <Option key='A' value='A'>Absent</Option>
                                </Select>
                            </>
                        )}
                    </Form.Item>
                    {att === 'P' && slot_type !== 2 && gg === 1 &&
                    <>
                        <Row gutter={[16, 16]}>
                            <Col span={8}>
                                <Form.Item label='Session Taken by'>
                                    {getFieldDecorator('mentor', {
                                        initialValue: decodedToken.name,
                                        rules: [{required: true, message: 'Mentor Name cannot be empty!'}],
                                    })(
                                        <Input placeholder="Enter Mentor Name"/>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label='Project Source'>
                                    {getFieldDecorator('project', {
                                        initialValue: "",
                                        rules: [{required: true, message: 'Project source cannot be empty!'}],
                                    })(
                                        <Input placeholder="Enter Project Source"/>
                                    )}
                                </Form.Item>
                            </Col>
                            {/* <Col span={8}>
                                <Form.Item label='Select project'>
                                    {getFieldDecorator('project', {
                                        rules: [{required: true, message: 'Please select project'}]
                                    })(
                                        <Select placeholder="Select project">
                                            <Option key='1' value='1'>Iron Man</Option>
                                            <Option key='2' value='2'>Pikachu</Option>
                                            <Option key='3' value='3'>Ronaldo</Option>
                                            <Option key='4' value='4'>Super Man</Option>
                                            <Option key='5' value='5'>Messi</Option>
                                            <Option key='6' value='6'>Harry</Option>
                                            <Option key='7' value='7'>MJ</Option>
                                            <Option key='8' value='8'>Elsa</Option>
                                            <Option key='9' value='9'>Minion</Option>
                                            <Option key='10' value='10'>Wonder Woman</Option>
                                            <Option key='11' value='11'>Greetn</Option>
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col> */}
                            <Col span={8}>
                                <Form.Item label='Select profile'>
                                    {getFieldDecorator('profile_type', {
                                        rules: [{required: true, message: 'Please select profile'}]
                                    })(
                                        <Select placeholder="Select profile">
                                            <Option key='1' value='1'>Architect</Option>
                                            <Option key='2' value='2'>Commander</Option>
                                            <Option key='3' value='3'>Explorer</Option>
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={[16, 16]}>
                            <Col span={8}>
                                <Form.Item label='Comprehension Grade'>
                                    {getFieldDecorator('co_grade', {
                                        rules: [{required: true, message: 'Please select grade for Comprehension'}]
                                    })(
                                        <Select placeholder="Comprehension Grade">
                                            {getGradeOptions()}
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label='Computer Grade'>
                                    {getFieldDecorator('c_grade', {
                                        rules: [{required: true, message: 'Please select grade for Computer'}]
                                    })(
                                        <Select placeholder="Computer Grade">
                                            {getGradeOptions()}
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label='Design Grade'>
                                    {getFieldDecorator('d_grade', {
                                        rules: [{required: true, message: 'Please select grade for Design'}]
                                    })(
                                        <Select placeholder="Design Grade">
                                            {getGradeOptions()}
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={[16, 16]}>
                            <Col span={12}>
                                <Form.Item label="Student's Full Name">
                                    {getFieldDecorator('student_name_full', {
                                        initialValue: student_name,
                                        rules: [{required: true, message: 'Student Name cannot be empty!'}],
                                    })(
                                        <Input placeholder="Enter Student Name"/>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Student’s first name for the report">
                                    {getFieldDecorator('student_name', {
                                        initialValue: student_name.split(" ")[0],
                                        rules: [{required: true, message: 'Kid first Name cannot be empty!'}],
                                    })(
                                        <Input placeholder="Enter Kid first Name"/>
                                    )}
                                </Form.Item>

                            </Col>
                        </Row>
                        <Form.Item label="Student’s email (Edit this only if you have an updated email id of the
                                    student)">
                            {getFieldDecorator('student_email', {
                                initialValue: student_email,
                                rules: [{required: true, message: 'Student’s email cannot be empty!'}],
                            })(
                                <Input placeholder="Enter Student’s email"/>
                            )}
                        </Form.Item>
                    </>
                    }

                    <Form.Item label='Comments'>
                        {getFieldDecorator('comments', {})(
                            <Input placeholder="Enter comments"/>
                        )}
                    </Form.Item>

                    <Button type="primary" htmlType="submit" loading={isSubmitting}>
                        {btnTxt}
                    </Button>
                </Form>
            </Modal>
        </>
    );
}

const VisionAdminForm = Form.create<any>({name: ""})(AdminForm);
export default VisionAdminForm;
