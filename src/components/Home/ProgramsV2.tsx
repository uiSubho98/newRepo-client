import React from "react";
import { IProgram, ISubProgram } from "./home";

interface Props {
    data: {
        title: string;
        programsList: Array<IProgram>;
    }
}

interface IState {
    isLoggedIn?: boolean;
    isBootcampSubscribed?: boolean;
}

const Programs = (props: Props) => {
    const {title, programsList} = props.data;

    return (
        <>
            <div className="programs-wrapper lr-pad-d lr-pad-m tb-pad-d tb-pad-m" id="programs">
                <h2 className="text-xl font-heading text-c-d">
                    { title }
                </h2>
                <div className="g-d g-col-2 g-col-1-m g-h-c programs-list w-100 f-vt-m">
                    {programsList.map((program: IProgram, index: number) => {
                        return (
                            <div className="program" key={index}>
                                <h3 className="text-large font-heading program-name">{program.name}</h3>
                                <div className="text-medium program-description text-faded-2">{program.description}</div>
                                {
                                    program.subPrograms ?
                                        <div className="subprograms-wrapper">
                                            {program.subPrograms.map((subProgram: ISubProgram, i: number) => {
                                                return (
                                                    <div className="subprogram" key={i}>
                                                        <h4 className="text-big font-heading subprogram-name">{subProgram.title}</h4>
                                                        <div className="text-regular subprogram-description text-faded-2">{subProgram.desc}</div>
                                                        <div className="f-d f-v-c text-regular learn-more c-pointer" onClick={() => {window.open(subProgram.learnMoreLink)}}>LEARN MORE <i className="icon icon-chevron-right"></i></div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        :
                                        <div className="f-d f-v-c text-regular learn-more c-pointer" onClick={() => {window.open(program.learnMoreLink)}}>LEARN MORE <i className="icon icon-chevron-right"></i></div>
                                }
                            </div>
                        )
                    })}
                </div>
            </div>
            <style jsx>{`
                .programs-wrapper .programs-list {
                    margin-top: var(--peaky-gap-64);
                }

                .programs-wrapper .programs-list .program {
                    max-width: 400px;
                }

                .programs-wrapper .programs-list .program-name {
                    font-weight: 800 !important;
                    margin-bottom: var(--peaky-gap-8);
                }

                .programs-wrapper .programs-list .program-description {
                    font-weight: 200;
                    white-space: pre-wrap;
                    margin-bottom: var(--peaky-gap-32);
                }
                
                .programs-wrapper .programs-list .learn-more {
                    font-weight: 700;
                }

                .programs-wrapper .programs-list .learn-more
                .icon-chevron-right {
                    color: var(--primary);
                    font-size: 21px;
                    font-weight: 600;
                }

                .programs-wrapper .programs-list .subprograms-wrapper .subprogram {
                    border-top: solid 1px grey;
                    padding: var(--peaky-gap-32) 0;
                }

                .programs-wrapper .programs-list .subprograms-wrapper 
                .subprogram:nth-of-type(2) {
                    padding-bottom: 0;
                }

                .programs-wrapper .programs-list .subprograms-wrapper .subprogram-name {
                    font-weight: 800 !important;
                    margin-bottom: var(--peaky-gap-8);
                    line-height: unset;
                }

                .programs-wrapper .programs-list .subprograms-wrapper .subprogram-description {
                    font-weight: 200;
                    margin-bottom: var(--peaky-gap-16);
                }

                @media only screen and (max-device-width: 760px) {
                    .programs-wrapper .programs-list .program:not(:first-child) {
                        margin-top: var(--peaky-gap-64);
                    }

                    .programs-wrapper .programs-list .subprograms-wrapper .subprogram-description {
                        margin-bottom: var(--peaky-gap-32);
                    }
                }

                @media only screen and (max-device-width: 360px) {
                }

                @media only screen and (max-device-width: 320px) {
                }

                @media screen and (min-width: 768px) and (max-width: 1023px) and (orientation: portrait) {
                }

            `}</style>
        </>
    )
}

export default Programs;