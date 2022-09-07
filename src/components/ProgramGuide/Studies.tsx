import { Form, Radio } from "antd";
import React, { Fragment, useEffect, useState } from "react";

const Studies = (props: any) => {

    const [type, setType] = useState<any>(0);

    const { mode, submit, getFieldDecorator, isUpdated } = props;

    const isActive = mode === 2;
    
    useEffect(() => {
        setType(0)
    }, [isUpdated])

    const renderYears = () => {
        const years = [ 
            <Fragment>&#8544;</Fragment>,
            <Fragment>&#8545;</Fragment>,
            <Fragment>&#8546;</Fragment>,
            <Fragment>&#8547;</Fragment>,
            <Fragment>&#8548;</Fragment>,
        ];

        return years.map((year,key) => 
            <Radio className="year" 
            value={key + 1}>
                { year }
            </Radio>
        );
    }

    const handleChange = (e: any) => {
        const value = parseInt(e.target.value);
        if(value === 2) {
            setTimeout(() => {
                submit();
            }, 200);
        } else {
            setType(value);
        }
    }

    return (
        <>
            <div className={`f-d f-vt f-v-c studies-wrapper
            ${ isActive ? "" : "inactive" }`}>
                <h1 className="font-heading text-xxl text-c-d
                title">
                    Tell us a bit about your studies
                </h1>
                <Form.Item className="w-60">
                    {getFieldDecorator('graduation-type'
                    )(
                    <Radio.Group className="w-100 radio-group"
                    onChange={(e) => handleChange(e)}>
                        <div className="f-d f-h-sb f-vt-m w-100 radio-block">
                            <Radio value={1}>I’m doing my UG studies</Radio>
                            <Radio value={2}>I’m doing my PG studies</Radio>
                        </div>
                    </Radio.Group>
                    )}
                </Form.Item>
                {
                    type === 1 &&
                    <div className="w-60 f-d f-vt year-block">
                        <span className="text-big year-label strong-text">
                            Which Year are you in?
                        </span>
                        <Form.Item>
                            {getFieldDecorator('year'
                            )(
                            <Radio.Group className="f-d f-ht year-group"
                            onChange={() => {
                                setTimeout(() => {
                                    submit();
                                }, 200);
                            }}>
                                { renderYears() }
                            </Radio.Group>
                            )}
                        </Form.Item>
                    </div>
                }
            </div>
            <style jsx>{`
                .studies-wrapper {
                    margin: var(--peaky-gap-32) 0 0;
                }

                .studies-wrapper.inactive {
                    display: none;
                }

                .studies-wrapper .radio-group .ant-radio-wrapper,
                .studies-wrapper .year-group .ant-radio-wrapper {
                    align-items: center;
                    background-color: var(--secondary-bg);
                    border-radius: var(--peaky-br-2);
                    color: var(--dove);
                    display: grid;
                    height: 130px;
                    justify-content: center;
                    width: 45%;
                }

                .studies-wrapper .year-group {
                    margin: var(--peaky-gap-32) 0 0;
                }

                .studies-wrapper .year-group .ant-radio-wrapper {
                    height: 80px;
                    width: 10%;
                    margin-right: var(--peaky-gap-24);
                }

                .studies-wrapper .ant-radio-wrapper
                .ant-radio {
                    display: none;
                }

                .studies-wrapper .ant-radio-wrapper-checked {
                    border: 2px solid var(--primary);
                }

                .studies-wrapper .radio-block:nth-of-type(2) {
                    margin: var(--peaky-gap-48) 0 0;
                }

                .studies-wrapper .radio-group {
                    margin: var(--peaky-gap-48) 0 0; 
                }

                .studies-wrapper .ant-radio-wrapper > span {
                    font-size: 18px;
                    font-weight: 200;
                    opacity: 0.87;
                }

                .studies-wrapper .ant-radio-wrapper > span:nth-of-type(2) {
                    white-space: pre-line;
                    text-align: center;
                    padding: 0 var(--peaky-pad-32);
                }

                .studies-wrapper .year-block {
                    margin: var(--peaky-gap-64) 0 0;
                }

                .studies-wrapper .year-block .year-label {
                    font-family: Inconsolata;
                }

                @media only screen and (max-device-width: 760px) {
                    .studies-wrapper .title {
                        line-height: 50px;
                    }

                    .studies-wrapper .ant-form-item {
                        width: 100%;
                    }

                    .studies-wrapper .year-block {
                        margin-top: var(--peaky-gap-8);
                        width: 100%;
                    }

                    .studies-wrapper .year-group {
                        flex-wrap: wrap;
                    }

                    .studies-wrapper .radio-group .ant-radio-wrapper {
                        margin: 0 0 var(--peaky-gap-16);
                        width: 100%;
                    }

                    .studies-wrapper .year-group .ant-radio-wrapper {
                        width: 25%;
                        margin: 0 var(--peaky-gap-16) var(--peaky-gap-16) 0;
                    }
                }
            `}</style>
        </>
    )
}

export default Studies;