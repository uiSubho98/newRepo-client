import React from "react";
import { Checkbox, Form, Input, DatePicker, Button } from "antd";
import moment from "moment";
import { FormComponentProps } from "antd/lib/form/Form";

interface IProps extends FormComponentProps {
    data?: any;
    id?: number;
    setProjects: Function;
}

const { TextArea } = Input;

const ProjectForm = (props: IProps) => {
    const { data, id, form, setProjects } = props;
    const { getFieldDecorator, getFieldValue } = form;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        e.stopPropagation();
        props.form.validateFields((err: Error, values: any) => {
            if(!err) {
                values.startDate = values.startDate.unix();
                if(values.endDate) {
                    values.endDate = values.endDate.unix();
                }
                setProjects(values, id);
            }
        });
    }

    return (
        <>
            <Form className="project-experience-form" onSubmit={handleSubmit}>
                <div className="input-group g-d g-col-1">
                    <div className="form-block">
                        <Form.Item label="Project Name">
                            {getFieldDecorator('projectName', {
                                rules: [{ required: true, 
                                message: 'Project Name cannot be empty!' }],
                                initialValue: data?.projectName
                            }) ( 
                                <Input placeholder="Project Name" autoComplete="project name"/>
                            )}
                        </Form.Item>
                    </div>
                    <div className="form-block">
                        <Form.Item label="Project Description">
                            {getFieldDecorator('description', {
                                rules: [{ required: true, 
                                message: 'Project Description cannot be empty!' }],
                                initialValue: data?.description
                            }) ( 
                                <TextArea 
                                    placeholder="Elucide about your project" 
                                    autoSize={{ minRows: 4, maxRows: 4 }} 
                                />
                            )}
                        </Form.Item>
                    </div>
                    <div className="form-block">
                        <Form.Item label="Field related to the project">
                            {getFieldDecorator('projectField', {
                                rules: [{ required: true, 
                                message: 'Project Field can not be empty!' }],
                                initialValue: data?.projectField
                            }) ( 
                                <Input placeholder="Machine Learning" autoComplete="project field"/>
                            )}
                        </Form.Item>
                    </div>
                </div>
                <div className="form-block">
                    <Form.Item label="">
                        {getFieldDecorator('currentProject', {
                            initialValue: data?.currentProject
                        }) ( 
                            <Checkbox>I am currently working on it</Checkbox>
                        )}
                    </Form.Item>
                </div>
                <div className="input-group g-d g-col-2 g-col-1-m">
                    <div className="form-block">
                        <Form.Item label="Start date">
                            {getFieldDecorator('startDate', {
                                rules: [{ required: true, 
                                message: 'Please select a start date!' }],
                                initialValue: data?.startDate ? moment(data?.startDate * 1000) : ""
                            }) ( 
                                <DatePicker placeholder="Start date" />
                            )}
                        </Form.Item>
                    </div>

                    {
                        !getFieldValue("currentProject") && 
                        <div className="form-block">
                            <Form.Item label="End date">
                                {getFieldDecorator('endDate', {
                                    rules: [{ required: true, 
                                    message: 'Please select a end date!' }],
                                    initialValue: data?.endDate ? moment(data?.endDate * 1000) : ""
                                }) ( 
                                    <DatePicker placeholder="End date" />
                                )}
                            </Form.Item>
                        </div>
                    }
                </div>
                <div className="g-d g-h-e">
                    <Button className="default-blue-btn btn-small" htmlType="submit">
                        Save Project
                    </Button>
                </div>
            </Form>
        </>
    )
}

const Project = Form.create<IProps>({ name: "" })(ProjectForm);
export default Project;