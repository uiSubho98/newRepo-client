import React, { useEffect, useState } from 'react';
import { DatePicker, Form, Input, Button, InputNumber, Select } from 'antd';
import axios, { AxiosResponse } from "axios";
import { FormComponentProps } from "antd/lib/form/Form";
import { G_API_URL } from '../../../constants/constants';
import { openNotification } from '../../../utils/common.util';
import queryString from "query-string";
import { Moment } from 'moment-timezone';
import { ICoupon } from './coupon';
import { __getToken } from '../../../utils/user-details.util';
const { Option } = Select;

interface EditCouponFormProps extends FormComponentProps {
    activeCouponDetails: ICoupon
}

interface IBootCampCouponsForm {
    coupon_id: number,
    coupon_code: string,
    discount: string,
    reuse_limit: number,
    start_date: Moment,
    course_id: number,
    expiry_date: Moment
}

const EditCouponForm = (props: EditCouponFormProps) => {
    const { activeCouponDetails } = props;
    const { getFieldDecorator } = props.form;

    const [courses, setCourses] = useState([])
    //const [courseId, setCourseId] = useState("")
    // Add coupon form submit handler
    const handleEditCouponFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        props.form.validateFields((err: Error, values: IBootCampCouponsForm) => {
            if (!err) {
                console.log(values);
                let discount = values.discount
                discount = discount + (discount.charAt(discount.length - 1) === '%' ? '' : "%") + '';
                let data = {
                    couponId: values.coupon_id,
                    couponCode: values.coupon_code,
                    startDate: values.start_date.unix(),
                    courseId: values.course_id,
                    expiryDate: values.expiry_date.unix(),
                    discount: discount,
                    reuseLimit: values.reuse_limit
                };


                axios
                    .post(G_API_URL + "admin/coupon/bootcamp/edit", queryString.stringify(data), { headers: { Authorization: __getToken() } })
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
    useEffect(() => {
        axios.get(G_API_URL + "coupon/courses/bootcamp", { headers: { Authorization: __getToken() } })
            .then((response: AxiosResponse) => {
                setCourses(response.data)
                // if (activeCouponDetails && activeCouponDetails.course_id)
                //     setCourseId(activeCouponDetails.course_id)
            })
            .catch(err => {
                console.log(err);
            });
    }, [])
    // const handleChange = (value: string) => {
    //     setCourseId(value)

    // }

    const formItemLayout = {
        labelCol: { span: 7 },
        wrapperCol: { span: 14 },
    };

    const formTailLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 8, offset: 7 },
    };

    return (
        <Form onSubmit={handleEditCouponFormSubmit} className="edit-coupon-form" name="edit-coupon-form">
            <Form.Item label="Coupon ID" {...formItemLayout}>
                {getFieldDecorator('coupon_id', {
                    rules: [{ required: true, message: 'Please input coupon id!' }],
                    initialValue: activeCouponDetails && activeCouponDetails.coupon_id
                })(
                    <Input disabled={true} />,
                )}
            </Form.Item>
            <Form.Item label="Coupon Code" {...formItemLayout}>
                {getFieldDecorator('coupon_code', {
                    rules: [{ required: true, message: 'Please enter coupon code!' }],
                    initialValue: activeCouponDetails && activeCouponDetails.coupon_code
                })(
                    <Input disabled={true} />,
                )}
            </Form.Item>
            <Form.Item label="Course Name" {...formItemLayout}>
                {getFieldDecorator('course_id', {
                    rules: [{ required: true, message: 'Please enter a Course Name!' }],
                    initialValue: activeCouponDetails && activeCouponDetails.course_id
                })(
                    <Select id="courses" placeholder="Select a Course Name"   >
                        {
                            courses.length > 0 && courses.filter(({ courseName }) => Boolean(courseName)).map(({ courseName, courseId }) => {
                                return (
                                    <Option value={courseId}>{courseName}</Option>
                                )

                            })
                        }

                    </Select>
                )}
            </Form.Item>
            <Form.Item label="Discount" {...formItemLayout}>
                {getFieldDecorator('discount', {
                    rules: [{ required: true, message: 'Please enter discount!' }],
                    initialValue: activeCouponDetails && activeCouponDetails.discount
                })(
                    <Input />,
                )}
            </Form.Item>
            <Form.Item label="Reuse Limit" {...formItemLayout}>
                {getFieldDecorator('reuse_limit', {
                    rules: [{ type: 'number', required: true, message: 'Please input reuse limit!' }],
                    initialValue: activeCouponDetails && activeCouponDetails.reuse_limit
                })(
                    <InputNumber />,
                )}
            </Form.Item>
            <Form.Item label="Start Date" {...formItemLayout}>
                {getFieldDecorator('start_date', {
                    rules: [{ required: true, message: 'Please input start date!' }],
                    initialValue: activeCouponDetails && activeCouponDetails.start_date
                })(
                    <DatePicker showTime={true} />,
                )}
            </Form.Item>
            <Form.Item label="Expiry Date" {...formItemLayout}>
                {getFieldDecorator('expiry_date', {
                    rules: [{ required: true, message: 'Please input expiry date!' }],
                    initialValue: activeCouponDetails && activeCouponDetails.expiry_date
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