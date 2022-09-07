import React from "react";
import { Button, Checkbox, DatePicker, Form, Input, InputNumber, Select } from "antd";
import { FormComponentProps } from "antd/lib/form/Form";
import moment from "moment";

interface IProps extends FormComponentProps {
    data?: any;
    id?: number;
    isDeletable: boolean;
    setCompanies: Function;
    deleteCompany: Function;
}

// const { TextArea } = Input;
const { Option } = Select;

const WorkExperienceForm = (props: IProps) => {
    const { data, id, isDeletable, form, setCompanies, deleteCompany } = props;
    const { getFieldDecorator, getFieldValue } = form;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        e.stopPropagation(); 
        props.form.validateFields((err: Error, values: any) => {
            if(!err) {
                values.startDate = values.startDate.unix();
                if(values.endDate) values.endDate = values.endDate.unix();
                setCompanies(values, id)
            }
        });
    }

    return (
        <>
            <Form className="work-experience-form" onSubmit={handleSubmit}>
                <div className="input-group g-d g-col-2 g-col-1-m">
                    <div className="form-block">
                        <Form.Item label="Name of the Company">
                            {getFieldDecorator('company', {
                                rules: [{ required: true, 
                                message: 'Company Name cannot be empty!' }],
                                initialValue: data?.company
                            }) ( 
                                <Input placeholder="Google India Pvt. Ltd" autoComplete="company"/>
                            )}
                        </Form.Item>
                    </div>

                    <div className="form-block">
                        <Form.Item label="Your Designation">
                            {getFieldDecorator('designation', {
                                rules: [{ required: true, 
                                message: 'Designation cannot be empty!' }],
                                initialValue: data?.designation
                            }) ( 
                                <Input placeholder="Software Developer" autoComplete="designation"/>
                            )}
                        </Form.Item>
                    </div>

                    <div className="form-block">
                        <Form.Item label="Employment type">
                            {getFieldDecorator('employmentType', {
                                rules: [{required: true, 
                                    message: 'Please select your employment type'}],
                                    initialValue: data?.employmentType
                            })(
                                <Select placeholder="Full-time">
                                    <Option value="Full-time">Full-time</Option>
                                    <Option value="Part-time">Part-time</Option>
                                    <Option value="Self-Employed">Self-Employed</Option>
                                    <Option value="Freelance">Freelance</Option>
                                    <Option value="Internship">Internship</Option>
                                    <Option value="Trainee">Trainee</Option>
                                </Select>
                            )}
                        </Form.Item>
                    </div>

                    <div className="form-block">
                        <Form.Item label="Location">
                            {getFieldDecorator('location', {
                                rules: [{ required: true, 
                                message: 'Location cannot be empty!' }],
                                initialValue: data?.location
                            }) ( 
                                <Input placeholder="Bangalore" autoComplete="location"/>
                            )}
                        </Form.Item>
                    </div>

                    <div className="form-block">
                        <Form.Item label="">
                            {getFieldDecorator('currentCompany', {
                                initialValue: data?.currentCompany
                            }) ( 
                                <Checkbox>I am currently working in this role</Checkbox>
                            )}
                        </Form.Item>
                    </div>
                </div>

                {
                    getFieldValue("currentCompany") && getFieldValue("employmentType") && 
                    <div className="input-group g-d g-col-2 g-col-1-m">
                        {
                            (getFieldValue("employmentType") && 
                            getFieldValue("employmentType") === "Internship") &&
                            <>
                                <div className="form-block">
                                    <Form.Item label="Internship Stipend per Month">
                                        {getFieldDecorator('stipend', {
                                            rules: [{ required: true, 
                                            message: 'Internship Stipend cannot be empty!' }],
                                            initialValue: data?.stipend
                                        }) ( 
                                            <InputNumber placeholder="25000" autoComplete="stipend" min={0}/>
                                        )}
                                    </Form.Item>
                                </div>
                                <div className="form-block">
                                    <Form.Item label="Full-time CTC offered on conversion">
                                        {getFieldDecorator('ctc', {
                                            rules: [{ required: true, 
                                            message: 'Full-time CTC cannot be empty!' }],
                                            initialValue: data?.ctc
                                        }) ( 
                                            <InputNumber placeholder="50000" autoComplete="ctc" />
                                        )}
                                    </Form.Item>
                                </div>
                            </>
                        }
                        {
                            (getFieldValue("employmentType") && 
                            getFieldValue("employmentType") === "Full-time") &&
                            <>
                                <div className="form-block">
                                    <Form.Item label="Experience in Months">
                                        {getFieldDecorator('experience', {
                                            rules: [{ required: true, 
                                            message: 'Experience cannot be empty!' }],
                                            initialValue: data?.experience
                                        }) ( 
                                            <InputNumber placeholder="24" autoComplete="experience"/>
                                        )}
                                    </Form.Item>
                                </div>
                                <div className="form-block">
                                    <Form.Item label="Fixed Component of CTC">
                                        {getFieldDecorator('fixedCtc', {
                                            rules: [{ required: true, 
                                            message: 'Fixed component of CTC cannot be empty!' }],
                                            initialValue: data?.fixedCtc
                                        }) ( 
                                            <InputNumber placeholder="100000" />
                                        )}
                                    </Form.Item>
                                </div>
                                <div className="form-block">
                                    <Form.Item label="Variable Component of CTC">
                                        {getFieldDecorator('variableCtc', {
                                            rules: [{ required: true, 
                                            message: 'Variable component of CTC cannot be empty!' }],
                                            initialValue: data?.variableCtc
                                        }) ( 
                                            <InputNumber placeholder="50000" />
                                        )}
                                    </Form.Item>
                                </div>
                            </>
                        }

                        {
                            (getFieldValue("employmentType") && 
                            ["Full-time", "Part-time", "Internship"].includes(getFieldValue("employmentType"))) &&
                            <div className="form-block">
                                <Form.Item label="Notice Period">
                                    {getFieldDecorator('noticePeriod', {
                                        rules: [{ required: true, 
                                        message: 'Notice Period cannot be empty!' }],
                                        initialValue: data?.noticePeriod
                                    }) ( 
                                        <InputNumber placeholder="Notice period in days" autoComplete="noticePeriod" min={0} />
                                    )}
                                </Form.Item>
                            </div>
                        }
                    </div>
                }

                <div className="input-group g-d g-col-2 g-col-1-m">
                    <div className="form-block">
                        <Form.Item label="Start date">
                            {getFieldDecorator('startDate', {
                                rules: [{ required: true, 
                                message: 'Start date cannot be empty!' }],
                                initialValue: data?.startDate ? moment(data?.startDate * 1000) : ""
                            }) ( 
                                <DatePicker placeholder="Start date" />
                            )}
                        </Form.Item>
                    </div>

                    {
                        !getFieldValue("currentCompany") && 
                        <div className="form-block">
                            <Form.Item label="End date">
                                {getFieldDecorator('endDate', {
                                    rules: [{ required: true, 
                                    message: 'End date cannot be empty!' }],
                                    initialValue: data?.endDate ? moment(data?.endDate * 1000) : ""
                                }) ( 
                                    <DatePicker placeholder="End date" />
                                )}
                            </Form.Item>
                        </div>
                    }
                </div>
                <div className="f-d f-h-e g-gap-16">
                    {
                        isDeletable &&
                        <Button className="default-blue-btn btn-small" 
                        onClick={() => deleteCompany(id)}>
                            Delete Experience
                        </Button>
                    }
                    <Button className="default-blue-btn btn-small" htmlType="submit">
                        Save Experience
                    </Button>
                </div>
            </Form>
        </>
    )
}

const WorkExperience = Form.create<IProps>({ name: "" })(WorkExperienceForm);
export default React.memo(WorkExperience);