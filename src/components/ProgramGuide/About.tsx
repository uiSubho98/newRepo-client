import { Form, Radio } from "antd";
import React from "react";

const About = (props: any) => {

    const { mode, setMode, submit, getFieldDecorator } = props;

    const isActive = mode === 1;

    return (
        <>
            <div className={`f-d f-vt f-v-c status-wrapper
            ${isActive ? "" : "inactive"}`}>
                <h1 className="font-heading text-xxl 
                text-c-d title">
                    Tell us a bit about yourself
                </h1>
                <Form.Item className="w-60">
                    {getFieldDecorator('accountType'
                    )(
                    <Radio.Group className="w-100 radio-group"
                    onChange={(e) => 
                        setTimeout(() => {
                            if(e.target.value === 1) {
                                setMode(2);
                            } else {
                                submit();
                            }
                        }, 200)}
                    >
                        <div className="f-d f-h-sb f-vt-m w-100 radio-block">
                            <Radio value={1}>I’m currently studying</Radio>
                            <Radio value={2}>I’m working</Radio>
                        </div>
                        <div className="f-d f-h-c radio-block">
                            <Radio value={3}>I finished my studies and am looking for a job</Radio>
                        </div>
                    </Radio.Group>
                    )}
                </Form.Item>
            </div>
            <style jsx>{`
                .status-wrapper {
                    margin: var(--peaky-gap-32) 0;
                }

                .status-wrapper .ant-radio-wrapper {
                    align-items: center;
                    background-color: var(--secondary-bg);
                    color: var(--dove);
                    display: grid;
                    height: 130px;
                    justify-content: center;
                    width: 45%;
                }

                .status-wrapper .ant-radio-wrapper
                .ant-radio {
                    display: none;
                }

                .status-wrapper .ant-radio-wrapper-checked {
                    border: 2px solid var(--primary);
                }

                .status-wrapper .radio-block:nth-of-type(2) {
                    margin: var(--peaky-gap-48) 0 0;
                }

                .status-wrapper .radio-group {
                    margin: var(--peaky-gap-48) 0 0; 
                }

                .status-wrapper .ant-radio-wrapper > span {
                    font-size: 18px;
                    font-weight: 200;
                    opacity: 0.87;
                }

                .status-wrapper .ant-radio-wrapper > span:nth-of-type(2) {
                    white-space: pre-line;
                    text-align: center;
                    padding: 0 var(--peaky-pad-32);
                }

                .status-wrapper.inactive {
                    display: none;
                }

                @media only screen and (max-device-width: 760px) {
                    .status-wrapper .title {
                        line-height: 50px;
                    }

                    .status-wrapper .ant-form-item {
                        width: 100%;
                    }

                    .status-wrapper .ant-radio-wrapper {
                        width: 100%;
                    }

                    .status-wrapper .ant-radio-wrapper {
                        margin: var(--peaky-pad-16) 0 0;
                    }

                    .status-wrapper .radio-block:nth-of-type(2) {
                        margin: 0;
                    }
                }
            `}</style>
        </>
    )
}

export default About;