import { Button, Form } from "antd";
import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import About from "../../components/ProgramGuide/About";
import Email from "../../components/ProgramGuide/Email";
import Program from "../../components/ProgramGuide/Program";
import Studies from "../../components/ProgramGuide/Studies";
import { G_API_URL } from "../../constants/constants";
import { getGATag } from "../../utils/common.util";
import { check_login } from "../../utils/login.util";

interface IProgram {
    name: string;
    duration: string;
    type: string;
    mode: string;
    slug: string;
}

interface IState {
    isLoggedIn: boolean;
    isLoading: boolean;
    program?: IProgram;
    isUpdated: boolean;
}

const ProgramGuideForm = (props: any) => {
    const defaultState = {
        isLoggedIn: false,
        isLoading: false,
        isUpdated: true
    }

    const [mode, setMode] = useState<number>(0);
    const [state, setState] = useState<IState>(defaultState);

    const { setActive } = props;

    const { getFieldDecorator } = props.form;

    const { isLoggedIn, isLoading, program, isUpdated } = state;

    useEffect(() => {
        if(check_login()) {
            setMode(1);
            setState(prev => ({
                ...prev,
                isLoggedIn: true
            }));
        }
    }, []);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        props.form.validateFields((err: any, values: any) => {
            if(!err) {
                setMode(3);
                setState(prev => ({
                    ...prev,
                    isLoading: true
                }));

                let params = {
                    ...values,
                    program: (values.year && [1, 2].includes(values.year)) ? "Microdegree" : "Bootcamp",
                    existingUser: isLoggedIn
                }

                axios.post(G_API_URL + 'tracker/program-guide', params)
                .then((res: AxiosResponse) => {
                    const response = res.data;
                    if(response.status === 1) {
                        setTimeout(() => {
                            setState(prev => ({
                                ...prev,
                                program: response.program,
                                isLoading: false
                            }))
                        }, 1000);

                        // Env
                        const platformEnv = process.env.REACT_APP_PLATFORM;

                        if (platformEnv === 'prod') {
                            const tag = getGATag("program_guide_explored",
                            "subscribers", response.program.name);
                            document.body.appendChild(tag);
                        }
                    } else {
                        setMode(2);
                        setState(prev => ({
                            ...prev,
                            isLoading: false
                        }));
                    }
                }).catch((err) => {
                    console.log(err);
                })
            } else {
                console.log(err)
            }
        })
    }

    const submit = () => {
        const buttonElement = document.getElementById("submit-btn");
        if(buttonElement) {
            buttonElement.click();
        }
    }

    const update = () => {
        props.form.resetFields();
        setState(prev => ({
            ...prev,
            isUpdated: !isUpdated
        }))
        setMode(isLoggedIn ? 1 : 0);
    }
    
    return (
        <>
            <div className="program-guide-wrapper lr-pad-d lr-pad-m
            tb-pad-m">
                <div className="f-d f-h-e">
                    <i className="icon icon-x close-icon c-pointer"
                    onClick={() => setActive(false)}>
                    </i>
                </div>
                <Form className="program-guide-form" onSubmit={handleSubmit}>
                    <Email mode={mode} setMode={setMode} getFieldDecorator={getFieldDecorator} />
                    <About mode={mode} setMode={setMode} getFieldDecorator={getFieldDecorator} submit={submit} />
                    <Studies mode={mode} setMode={setMode} getFieldDecorator={getFieldDecorator} submit={submit} isUpdated={isUpdated} />
                    <Program mode={mode} setMode={setMode} isLoading={isLoading} program={program} update={update}/>
                    <Button
                        className="hide-d hide-m"
                        htmlType="submit"
                        id="submit-btn"
                    >
                        Submit
                    </Button>
                </Form>
            </div>
            <style jsx>{`
                #root {
                    margin: 0;
                }

                .program-guide-wrapper .close-icon {
                    background-color: #2E2E2E;
                    border-radius: var(--peaky-br-full);
                    font-size: 32px;
                    font-weight: 100;
                    opacity: 0.87;
                    margin: var(--peaky-gap-32) 0 0;
                    padding: 8px;
                }

                .program-guide-wrapper .email-block-wrapper {
                    margin: var(--peaky-gap-32) 0 0;
                }

                .program-guide-wrapper .program-guide-form .form-block,
                .program-guide-wrapper .program-guide-form .action-block {
                    width: 300px;
                }

                .program-guide-wrapper .program-guide-form .form-block input {
                    background-color: #383838;
                    border-radius: var(--peaky-br-2);
                    color: var(--dove);
                    font-weight: 300;
                    height: 50px;
                    padding: 0 var(--peaky-pad-16);
                }

                .program-guide-wrapper .program-guide-form .form-block input:focus {
                    background-color: #383838 !important;
                }

                .program-guide-wrapper .program-guide-form .form-block input::placeholder,
                .program-guide-wrapper .program-guide-form .intl-tel-input input::placeholder {
                    color: var(--dove);
                    opacity: 0.38;
                }

                .program-guide-wrapper .program-guide-form .ant-input {
                    border: unset;
                    border-radius: unset;
                    font-size: 16px;
                }

                .program-guide-wrapper .program-guide-form .ant-input:focus {
                    box-shadow: none;
                }
                
                .program-guide-wrapper .program-guide-form input:-webkit-autofill,
                .program-guide-wrapper .program-guide-form input:-webkit-autofill:hover,
                .program-guide-wrapper .program-guide-form input:-webkit-autofill:focus,
                .program-guide-wrapper .program-guide-form input:-webkit-autofill:active {
                    -webkit-transition: "color 9999s ease-out, background-color 9999s ease-out";
                    -webkit-transition-delay: 9999s;
                }

                @media only screen and (max-device-width: 760px) {
                    .program-guide-wrapper .close-icon {
                        margin: 0;
                    }
                }
            `}</style>
        </>
    )
}

const ProgradGuide = Form.create<any>()(ProgramGuideForm);
export default ProgradGuide;