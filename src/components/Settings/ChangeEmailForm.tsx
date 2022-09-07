import { Button, Form, Input } from "antd";
import { FormComponentProps } from "antd/lib/form";
import React from "react";

interface IProps extends FormComponentProps {
    isDisabled: boolean;
    defaultValue: string;
    isLoading: boolean;
    sendOtp: Function;
}

const FormBlock = (props: IProps) => {

    const { isDisabled, isLoading, defaultValue, sendOtp } = props

    const { getFieldDecorator } = props.form;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        props.form.validateFields((err: Error, values: {email: string}) => {
            if (!err) {
                sendOtp(values.email, "email", "update")
            }
        });
    }

    return (
        <>
            <Form className="change-email-form f-d f-vt-m" onSubmit={(e) => handleSubmit(e)}>
                <div className="form-block">
                    <Form.Item>
                        {getFieldDecorator('email', {
                            rules: [{required: true, message: 'Email cannot be empty!'}],
                            initialValue: defaultValue
                        })(
                            <Input type="email" placeholder="Enter Email Address" disabled={isDisabled}/>
                        )}
                    </Form.Item>
                </div>
                <Button
                    className="change-email-btn default-blue-btn btn-small"
                    type="primary"
                    htmlType="submit"
                    disabled={isDisabled}
                    loading={isLoading}
                >
                    Update
                </Button>
            </Form>
            <style jsx>{`
                .change-email-form .form-block input {
                    height: 50px;
                    font-weight: 300;
                    color: var(--dove);
                    background-color: #383838;
                    border-radius: var(--peaky-br-2);
                    border: unset;
                    font-size: 16px;
                }

                .change-email-form .form-block .ant-input {
                    border: none;
                    border-radius: 2px;
                    outline: none;
                }
                
                .change-email-form .form-block .ant-input:focus {
                    box-shadow: 0 0 0 2px var(--primary);
                    outline: none;
                }

                .change-email-form .form-block {
                    margin: 0 var(--peaky-gap-16) 0 0;
                    width: 35%;
                }

                .change-email-form input:-webkit-autofill,
                .change-email-form input:-webkit-autofill:hover,
                .change-email-form input:-webkit-autofill:focus,
                .change-email-form input:-webkit-autofill:active {
                    -webkit-transition: "color 9999s ease-out, background-color 9999s ease-out";
                    -webkit-transition-delay: 9999s;
                }

                @media only screen and (max-device-width: 760px) {
                    .change-email-form .form-block {
                        width: 100%;
                    }
                }
            `}</style>
        </>
    )
}

const ChangeEmailForm = Form.create<IProps>()(FormBlock);
export default ChangeEmailForm;