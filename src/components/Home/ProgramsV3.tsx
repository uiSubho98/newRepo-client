import React from "react";
import { useHistory } from "react-router";
import { IProgramV3 } from "./home";

interface Props {
    data: {
        title: string;
        programsList: Array<IProgramV3>;
    }
}

const ProgramsV3 = (props: Props) => {

    const { title, programsList } = props.data;

    const history = useHistory();

    const renderPrograms = () => {
        return programsList?.map((program, key) => 
            <div className="program" key={key}>
                <div className="text-regular type">
                    { program.label }
                </div>
                <div className="info">
                    <p className="font-inconsolata name text-large">
                        { program.name }
                    </p>
                    <p className="text-medium description">
                        { program.description }
                    </p>
                    <p className="f-d f-v-c learn-more c-pointer" 
                    onClick={() => history.push(program.slug)}>
                        LEARN MORE <i className="icon icon-chevron-right"></i>
                    </p>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="f-d f-vt f-v-c programs-wrapper lr-pad-d lr-pad-m 
            tb-pad-d tb-pad-m" id="programs">
                <h2 className="text-xl font-heading text-c-d">
                    { title }
                </h2>
                <div className="g-d g-col-2 g-col-1-m g-gap-64 programs-list">
                    { renderPrograms() }
                </div>
            </div>
            <style jsx>{`
                .programs-wrapper .programs-list {
                    margin: var(--peaky-gap-64) 0 0;
                    width: 65%;
                }

                .programs-wrapper .programs-list .program {
                    background-color: var(--primary-bg);
                    border-radius: var(--peaky-br-4);
                }

                .programs-wrapper .programs-list .program .type {
                    color: black;
                    font-weight: 700;
                    background: var(--joy);
                    margin-top: var(--peaky-gap-16);
                    padding: 2px 0 2px 8px;
                    width: 170px;
                    position: relative;
                    border-radius: 0;
                }

                .programs-wrapper .programs-list .program .type:after {
                    content: "";
                    width: 30px;
                    height: 30px;
                    background: var(--primary-bg);
                    position: absolute;
                    top: 0;
                    transform: rotate(45deg);
                    right: -15px;
                }

                .programs-wrapper .programs-list .program .info {
                    padding: var(--peaky-pad-16) var(--peaky-pad-16) 12px; 
                }

                .programs-wrapper .programs-list .program .info .name {
                    font-weight: 800;
                    line-height: 36px;
                    margin: 0;
                }

                .programs-wrapper .programs-list .program .info .description {
                    font-weight: 200;
                    margin: var(--peaky-gap-16) 0;
                    opacity: 0.87;
                }

                .programs-wrapper .programs-list .program .learn-more {
                    font-weight: 700;
                }

                .programs-wrapper .programs-list .program .learn-more
                .icon-chevron-right {
                    color: var(--primary);
                    font-size: 21px;
                    font-weight: 700;
                }

                @media only screen and (max-device-width: 760px) {
                    .programs-wrapper .programs-list {
                        grid-row-gap: var(--peaky-gap-16);
                        margin: var(--peaky-gap-32) 0 0;
                        width: 100%;
                    }

                    .programs-wrapper .programs-list .program {
                        width: unset;
                    }
                }
            `}</style>
        </>
    )
}

export default ProgramsV3;