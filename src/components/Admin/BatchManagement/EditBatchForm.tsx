import React from 'react';
import { DatePicker, Form, Input, Button } from 'antd';
import axios, { AxiosResponse } from "axios";
import { FormComponentProps } from "antd/lib/form/Form";
import { G_API_URL } from '../../../constants/constants';
import { openNotification } from '../../../utils/common.util';
import queryString from "query-string";
import { Moment } from 'moment-timezone';
import { __getToken } from '../../../utils/user-details.util';

interface IBatch {
    batchId: number;
    batchName: string;
    group_id: number;
    startDate: Moment;
    endDate: Moment;
}

interface EditCouponFormProps extends FormComponentProps{
    batchDetails?: IBatch;
}

const EditCouponForm = (props: EditCouponFormProps) => {
    const { batchDetails } = props;
    const { getFieldDecorator } = props.form;
    
    // Add coupon form submit handler
    const handleEditBatchFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        props.form.validateFields((err: Error, values: IBatch) => {
            if (!err) {
                // let discount = values.discount
                // discount = discount + (discount.charAt(discount.length - 1) === '%' ? '' : "%") + '';
                let data = {
                    batchId: values.batchId,
                    batchName: values.batchName,
                    group_id: values.group_id,
                    startDate: values.startDate.unix(),
                    endDate: values.endDate.unix()
                };

                console.log(data)

                axios
                    .put(G_API_URL + "admin/batches/update", queryString.stringify(data), {headers:{Authorization:__getToken()}})
                    .then((response: AxiosResponse) => {
                        if (response.data.status === 1) {
                            openNotification('success', "Batch Details updated successfully", 2);
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
        <Form onSubmit={handleEditBatchFormSubmit} className="edit-coupon-form" name="edit-coupon-form">
            <Form.Item label="Batch ID" {...formItemLayout}>
                {getFieldDecorator('batchId', {
                    rules: [{ required: true, message: 'Please input batch id!' }],
                    initialValue: batchDetails && batchDetails.batchId
                })(
                    <Input disabled={true}/>
                )}
            </Form.Item>
            <Form.Item label="Batch Name" {...formItemLayout}>
                {getFieldDecorator('batchName', {
                    rules: [{ required: true, message: 'Please enter batch name!' }],
                    initialValue: batchDetails && batchDetails.batchName
                })(
                    <Input />
                )}
            </Form.Item>
            <Form.Item label="Group ID" {...formItemLayout}>
                {getFieldDecorator('group_id', {
                    rules: [{ required: true, message: 'Please enter group id!' }],
                    initialValue: batchDetails && batchDetails.group_id
                })(
                    <Input disabled={true} />
                )}
            </Form.Item>
            <Form.Item label="Start Date" {...formItemLayout}>
                {getFieldDecorator('startDate', {
                    rules: [{ required: true, message: 'Please input start date!' }],
                    initialValue: batchDetails && batchDetails.startDate
                })(
                    <DatePicker showTime={true} />,
                )}
            </Form.Item>
            <Form.Item label="End Date" {...formItemLayout}>
                {getFieldDecorator('endDate', {
                    rules: [{ required: true, message: 'Please input end date!' }],
                    initialValue: batchDetails && batchDetails.endDate
                })(
                    <DatePicker showTime={true} />,
                )}
            </Form.Item>
            <Form.Item {...formTailLayout}>
                <Button type="primary" htmlType="submit">
                    Update
                </Button>
            </Form.Item>
        </Form>
    )
}
export default Form.create<EditCouponFormProps>({ name: 'add-bootcamp-coupons' })(EditCouponForm);