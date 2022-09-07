import { Popover } from 'antd';
import React from 'react';
import { titleCase } from '../../utils/common.util';
import { __getFirstName, __getPrograms } from '../../utils/user-details.util';

interface IProps {
    mode: number;
    isPopoverVisible: boolean;
    changeMode: Function;
    setPopoverVisible: Function;
}

const Modes = (props: IProps) => {

    const { mode, isPopoverVisible, changeMode, setPopoverVisible } = props;
    const subscribedPrograms = __getPrograms();
    let programs = [
        {
            id: 0,
            name: "Microdegree",
        },
        {
            id: 1,
            name: "MERN Stack Development (Part-Time)"
        },
        {
            id: 2,
            name: "MERN Stack Development (Full-Time)"
        },
        {
            id: 3,
            name: "Foundations of Front End Development"
        },
        {
            id: 4,
            name: "Foundations of Front End Development Demo"
        },
        {
            id: 5,
            name: "Launchpad (Career Services)"
        }
    ];

    const handleProgramChange = (key: number) => {
        changeMode(key);
        setPopoverVisible(false);
    }

    const renderPrograms = () => {
        return programs.filter(program => {
            if(program.id === 3) {
                if(subscribedPrograms && 
                subscribedPrograms.includes("frontend-development-bootcamp")) {
                    return program;
                }
                return null;
            } else if(program.id === 4) {
                if(subscribedPrograms && 
                subscribedPrograms.includes(
                "frontend-development-bootcamp-demo")) {
                    return program;
                }
                return null;
            }
            return program;
        }).map((program, key) => {
            let isActive = mode === program.id;
            return (
                <div className="f-d f-v-c f-h-sb program c-pointer"
                key={key} onClick={() => handleProgramChange(program.id)}>
                    <span className={isActive ? "strong-text" : ""}>
                        {program.name}
                    </span>
                    {
                        isActive && (
                            <i className="icon icon-check"></i>
                        )
                    }
                </div>
            )
        })
    }

    const content = (
        <div className="popover-content-wrapper">
            { renderPrograms() }
        </div>
    );

    return (
        <>
            <div className="program-modes-wrapper">
                <h1 className="f-d f-v-c font-heading text-large 
                welcome-text">
                    Howdy,&nbsp;
                    <span className="username">
                        { titleCase(__getFirstName()) }
                    </span>!
                </h1>
                <span className="f-d text-regular active-program">
                    You’re viewing&nbsp;
                    <Popover 
                        placement="bottom" 
                        content={content} 
                        trigger="contextMenu"
                        visible={ isPopoverVisible }
                    >
                        <span className="f-d f-v-c change-btn c-pointer"
                        onClick={() => setPopoverVisible(true)}>
                            <span className="strong-text">
                                { programs[mode].name }
                            </span>
                            <i className="icon icon-chevron-down"></i>
                        </span>
                    </Popover>
                </span>
            </div>
            <style>{`
                .program-modes-wrapper .welcome-text {
                    margin: 0 0 12px;
                }

                .program-modes-wrapper .welcome-text 
                .username {
                    max-width: 280px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .program-modes-wrapper .active-program
                .change-btn {
                    color: var(--primary);
                }

                .program-modes-wrapper .active-program
                .change-btn .icon {
                    font-size: 18px;
                    margin: 4px 0 0;
                }

                .ant-popover-placement-bottom > .ant-popover-content > .ant-popover-arrow {
                    display: none;
                }

                .ant-popover-inner {
                    background: linear-gradient(180deg, #2E2E2E 0%, #1E1E1E 100%);
                    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
                    border-radius: 2px;
                }

                .ant-popover-inner-content {
                    color: var(--dove);
                    padding-top: var(--peaky-pad-16);
                    padding-bottom: var(--peaky-pad-16);
                    width: 350px;
                }

                .popover-content-wrapper .program {
                    padding: 0 0 8px;
                }

                .popover-content-wrapper .program:last-child {
                    padding-bottom: unset;
                }

                .popover-content-wrapper .program .icon {
                    color: var(--primary);
                    font-size: 16px;
                }

                .ant-popover-placement-bottom {
                    padding-top: unset;
                    padding-left: 0;
                    left: 240px !important;
                }

                .ant-modal-wrap {
                    position: fixed;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    overflow: auto;
                    outline: 0;
                    -webkit-overflow-scrolling: touch;
                    z-index: 1000;
                }

                .program-modes-wrapper .active-program,
                .program-modes-wrapper .active-program .change-btn {
                    display: inline;
                }

                .program-modes-wrapper .active-program 
                .change-btn .icon {
                    display: inline-block;
                    vertical-align: -5px;
                }

                @media only screen and (max-device-width: 760px) {
                    .ant-popover-placement-bottom {
                        left: 0 !important;
                        right: 0;
                        width: max-content;
                        margin-left: auto;
                        margin-right: auto;
                    }
                    
                }

                @media only screen and (max-device-width: 360px) {
                    .ant-popover-inner-content {
                        width: 335px;
                    }
                }
            `}</style>
        </>
    )
}

export default Modes;