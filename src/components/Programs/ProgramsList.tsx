import React from "react";
import Program from "../Programs/Program";
import { IPrograms } from "../../interfaces/students";


interface IProps {
    data: IPrograms;
}

const ProgramsList = (props: IProps) => {
    const { title, list } = props.data;

    const renderPrograms = () => {
        return list.map((program, key) => <Program key={key} data={program} />);
    }

    return (
        <>
            <div className="g-d g-h-c programs-wrapper lr-pad-d lr-pad-m 
            tb-pad-d tb-pad-m" id={"programs"}>
                <h3 className="font-heading text-xl">{ title }</h3>
                <div className="g-d g-gap-32 g-gap-16-m programs-list">
                    { renderPrograms() }
                </div>
            </div>
            <style jsx>{`
                .programs-wrapper .programs-list {
                    margin: var(--peaky-gap-48) 0 0;
                }

                .programs-wrapper .programs-list .program {
                    background-color: var(--spider);
                    border-radius: var(--peaky-br-4);
                    position: relative;
                }

                .programs-wrapper .programs-list .program .info {
                    padding: var(--peaky-pad-32);
                }

                .programs-wrapper .programs-list .program 
                .company-logo-wrapper {
                    top: 0;
                    right: 0;
                    height: 35px;
                    display: flex;
                    align-items: center;
                    position: absolute;
                    width: 180px;
                    background-color: var(--dove);
                    border-bottom-left-radius: 4px;
                    border-top-right-radius: 4px;
                }

                .programs-wrapper .programs-list .program 
                .company-logo-wrapper .company-logo {
                    height: 20px;
                    width: 100%;
                }

                .programs-wrapper .programs-list .program:nth-of-type(1)
                .company-logo-wrapper .company-logo {
                    height: 25px;
                }

                .programs-wrapper .programs-list .program .name {
                    font-weight: 800;
                }

                .programs-wrapper .programs-list .program .gist {
                    white-space: pre-wrap;
                }

                .programs-wrapper .programs-list .program .action-block {
                    margin: var(--peaky-gap-48) 0 0;
                }

                .programs-wrapper .programs-list .program .learn-more-btn {
                    background-color: transparent;
                    border: none;
                    margin: 0 0 0 var(--peaky-gap-16);
                    text-decoration: underline;
                }

                .programs-wrapper .programs-list .program .apply-now-btn:disabled,
                .programs-wrapper .programs-list .program .learn-more-btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                    color: var(--dove);
                }

                .programs-wrapper .programs-list .program .status {
                    font-size: 10px;
                    margin-top: 12px;
                }

                .programs-wrapper .programs-list .program .status.active {
                    color: black;
                    font-weight: 700;
                    background: var(--joy);
                    padding: 2px 32px 2px 8px;
                    width: max-content;
                    position: relative;
                    border-radius: 0;
                }

                .programs-wrapper .programs-list .program .status.active:after {
                    content: "";
                    width: 20px;
                    height: 20px;
                    background: var(--spider);
                    position: absolute;
                    top: 0;
                    transform: rotate(45deg);
                    right: -6px;
                }

                @media only screen and (max-device-width: 760px) {
                    .programs-wrapper .programs-list .program .info {
                        margin: var(--peaky-gap-32) 0 0;
                        padding: var(--peaky-pad-32) var(--peaky-pad-16) var(--peaky-pad-16);
                    }

                    .programs-wrapper .programs-list .program .name {
                        line-height: 24px;
                    }

                    .programs-wrapper .programs-list .program .gist {
                        margin: var(--peaky-gap-16) 0 0;
                        white-space: unset;
                    }
                }
            `}</style>
        </>
    )
}

export default ProgramsList;