import React from 'react';
import { DatePicker, Form, Input, Button, InputNumber } from 'antd';
import axios, { AxiosResponse } from "axios";
import { FormComponentProps } from "antd/lib/form/Form";
import { G_API_URL } from '../../../constants/constants';
import { openNotification } from '../../../utils/common.util';
import queryString from "query-string";
import { Moment } from 'moment-timezone';
import { ICoupon } from './coupon';
import { __getToken } from '../../../utils/user-details.util';

interface AddCouponFormProps extends FormComponentProps{
    coupons: Array<ICoupon>
}

interface IWorkshopCouponsForm {
    coupon_id: number,
    coupon_code: string,
    discount: string,
    reuse_limit: number,
    start_date: Moment,
    expiry_date: Moment
}

const AddCouponForm = (props: AddCouponFormProps) => {
    const { coupons } = props;
    const { getFieldDecorator } = props.form;
    
    // Add coupon form submit handler
    const handleAddCouponFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        props.form.validateFields((err: Error, values: IWorkshopCouponsForm) => {
            if (!err) {
                let discount = values.discount
                discount = discount + (discount.charAt(discount.length - 1) === '%' ? '' : "%") + '';
                let data = {
                    couponId: values.coupon_id,
                    couponCode: values.coupon_code.toUpperCase(),
                    startDate: values.start_date.unix(),
                    expiryDate: values.expiry_date.unix(),
                    discount: discount,
                    reuseLimit: values.reuse_limit
                };

                axios
                    .post(G_API_URL + "admin/coupon/workshop/add", queryString.stringify(data), {headers:{Authorization:__getToken()}})
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
            <Form.Item label="Coupon ID" {...formItemLayout}>
                {getFieldDecorator('coupon_id', {
                    initialValue: coupons.length !== 0 && coupons[coupons.length - 1].coupon_id + 1
                })(
                    <Input disabled={true}/>,
                )}
            </Form.Item>
            <Form.Item label="Coupon Code" {...formItemLayout}>
                {getFieldDecorator('coupon_code', {
                    rules: [{ required: true, message: 'Please enter coupon code!' }]
                })(
                    <Input style={{textTransform: 'uppercase'}} />,
                )}
            </Form.Item>
            <Form.Item label="Discount" {...formItemLayout}>
                {getFieldDecorator('discount', {
                    rules: [{ required: true, message: 'Please enter discount!' }]
                })(
                        <Input />,
                )}
            </Form.Item>
            <Form.Item label="Reuse Limit" {...formItemLayout}>
                {getFieldDecorator('reuse_limit', {
                    rules: [{ type: 'number', required: true, message: 'Please input reuse limit!' }]
                })(
                    <InputNumber min={1}/>,
                )}
            </Form.Item>
            <Form.Item label="Start Date" {...formItemLayout}>
                {getFieldDecorator('start_date', {
                    rules: [{ required: true, message: 'Please input start date!' }]
                })(
                    <DatePicker showTime={true} />,
                )}
            </Form.Item>
            <Form.Item label="Expiry Date" {...formItemLayout}>
                {getFieldDecorator('expiry_date', {
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
export default Form.create<AddCouponFormProps>({ name: 'add-workshop-coupons' })(AddCouponForm);