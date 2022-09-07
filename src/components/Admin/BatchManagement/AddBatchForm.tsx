import React from 'react';
import { DatePicker, Form, Input, Button } from 'antd';
import axios, { AxiosResponse } from "axios";
import { FormComponentProps } from "antd/lib/form/Form";
import { G_API_URL } from '../../../constants/constants';
import { openNotification } from '../../../utils/common.util';
import queryString from "query-string";
import { Moment } from 'moment-timezone';
// import { ICoupon } from './coupon';
import { __getToken } from '../../../utils/user-details.util';

interface IBatch {
    batchId: number;
    batchName: string;
    group_id: number;
    startDate: Moment;
    endDate: Moment;
}

interface AddCouponFormProps extends FormComponentProps{
    batches: Array<IBatch>;
    programType: number;
}

const AddCouponForm = (props: AddCouponFormProps) => {
    const { batches, programType } = props;
    const { getFieldDecorator } = props.form;
    
    // Add coupon form submit handler
    const handleAddCouponFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        props.form.validateFields((err: Error, values: any) => {
            if (!err) {

                let data = {
                    batchId: values.batchId,
                    batchName: values.batchName,
                    // group_id: values.group_id,
                    startDate: values.startDate.unix(),
                    endDate: values.endDate.unix(),
                    program_type: programType,
                    status: 1
                };

                axios
                    .post(G_API_URL + "admin/batches/add", queryString.stringify(data), {headers:{Authorization:__getToken()}})
                    .then((response: AxiosResponse) => {
                        if (response.data.status === 1) {
                            openNotification('success', "Coupon added successfully", 2);
                            setTimeout(() => {
                                window.location.reload();
                            }, 2000);
                        } else {
                            openNotification('fail', response.data.message, 6)
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        })
    }

    const formItemLayout = {
        labelCol: { span: 7 },
        wrapperCol: { span: 14 },
    };

    const formTailLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 8, offset: 7 },
    };

    return (
        <Form onSubmit={handleAddCouponFormSubmit} className="add-coupon-form" name="add-coupon-form">
            <Form.Item label="Batch ID" {...formItemLayout}>
                {getFieldDecorator('batchId', {
                    initialValue: batches.length !== 0 && batches[batches.length - 1].batchId + 1
                })(
                    <Input disabled={true}/>,
                )}
            </Form.Item>
            <Form.Item label="Batch Name" {...formItemLayout}>
                {getFieldDecorator('batchName', {
                    rules: [{ required: true, message: 'Please enter batch name!' }]
                })(
                    <Input style={{textTransform: 'uppercase'}} />,
                )}
            </Form.Item>
            {/* <Form.Item label="Group Id" {...formItemLayout}>
                {getFieldDecorator('group_id', {
                    rules: [{ required: true, message: 'Please enter group id!' }]
                })(
                    <Input />,
                )}
            </Form.Item> */}
            <Form.Item label="Start Date" {...formItemLayout}>
                {getFieldDecorator('startDate', {
                    rules: [{ required: true, message: 'Please input start date!' }]
                })(
                    <DatePicker showTime={true} />,
                )}
            </Form.Item>
            <Form.Item label="End Date" {...formItemLayout}>
                {getFieldDecorator('endDate', {
                    rules: [{ required: true, message: 'Please input expiry date!' }]
                })(
                    <DatePicker showTime={true} />,
                )}
            </Form.Item>
            <Form.Item {...formTailLayout}>
                <Button type="primary" htmlType="submit">
                    Add
                </Button>
            </Form.Item>
        </Form>
    )
}
export default Form.create<AddCouponFormProps>({ name: 'add-bootcamp-coupons' })(AddCouponForm);