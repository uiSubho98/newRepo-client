import { Button, Form, Input } from "antd";
import React from "react";
import { __getEmail } from "../../utils/user-details.util";

const Email = (props: any) => {

    const { mode, setMode, getFieldDecorator } = props;

    const isActive = mode === 0;

    return (
        <>
            <div className={`f-d f-vt f-v-c email-block-wrapper
            ${ isActive ? "" : "inactive" }`}>
                <h1 className="font-heading text-xxl text-c-d
                heading">
                    Your Email address
                </h1>
                <div className="form-block">
                    <Form.Item>
                        {getFieldDecorator('email', {
                            rules: [{ 
                                required: true, 
                                message: 'Email cannot be empty!' }],
                                initialValue: __getEmail()
                        }) ( 
                            <Input placeholder="Enter your email" autoComplete="email"/>
                        )}
                    </Form.Item>
                </div>
                <div className="action-block">
                    <Button 
                        className="default-blue-btn btn-small w-100" 
                        onClick={() => setMode(1)}
                    >
                        Start
                    </Button>
                </div>
            </div>
            <style jsx>{`
                .program-guide-wrapper .program-guide-form 
                .email-block-wrapper .form-block {
                    margin: var(--peaky-gap-48) 0 0;
                }

                .program-guide-wrapper .program-guide-form 
                .email-block-wrapper .form-block input:focus {
                    border: 2px solid var(--primary);
                }

                .program-guide-wrapper .program-guide-form 
                .email-block-wrapper .action-block {
                    margin: var(--peaky-gap-8) 0 0;
                }

                .program-guide-wrapper .program-guide-form 
                .email-block-wrapper.inactive {
                    display: none;
                }

                @media only screen and (max-device-width: 760px) {
                    .program-guide-wrapper .program-guide-form 
                    .email-block-wrapper .heading {
                        line-height: 50px;
                    }
                }
            `}</style>
        </>
    )
}

export default Email;