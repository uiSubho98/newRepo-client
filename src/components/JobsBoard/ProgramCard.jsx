import React, { useState } from "react";
import { Button, Steps, Tooltip } from "antd";
import axios from "axios";
import moment from "moment-timezone";
import { isTablet, isMobile } from "react-device-detect";
import { __getToken } from "../../utils/user-details.util";
import { G_PR_URL } from "../../constants/constants";

const { Step } = Steps;

const ProgramCard = (props) => {
    const { program_name, progress, rounds, redirectToTest, status } = props;

    const [isLoading, setLoading] = useState(false);

    const activeRound = rounds[progress > rounds.length - 1 ? progress -1 : progress];

    const isActive = status && ![3, 4].includes(activeRound.status) && activeRound.instance_id;

    const takeTest = () => {
        if(isActive) {
            setLoading(true);
            axios.get(G_PR_URL + "test/take-test", {
                params: {
                    instance_id: activeRound.instance_id,
                    o_id: activeRound.o_id
                },
                headers: {
                    Authorization: __getToken()
                }
            }).then(response => {
                response = response.data;
                setTimeout(() => {
                    setLoading(false);
                    if(response.status === 1) {
                        redirectToTest(response.payloadEnc, response.authToken);
                    }
                }, 800);
            }).catch(error => {
                console.log(error);
            })
        }
    }

    const renderSteps = () => {
        const renderIcon = (type, status) => {
            if(status === 2) {
                return <i className={`icon icon-x`} />;
            } else {
                switch (type) {
                    case 1:
                    case 2:
                        return <i className="icon icon-clipboard" />;
                    case 3:
                        return <i className="icon icon-file-text" />;
                    case 4:
                        return <i className="icon icon-monitor" />;
                    default: 
                        return <i className={`icon icon-check`} />;
                }
            }
        }

        return rounds.map((round,key) => {
            return (
                <Step 
                    title={round.name} 
                    icon={
                        [1,2].includes(activeRound.type) && [0,3].includes(round.status) &&
                        activeRound.id === round.id ?
                        <Tooltip placement="top" title={
                            <div>
                                {
                                    round.instance_id ?
                                    <>
                                        <p>
                                            <b>Start Date : </b>
                                            <span>{moment(round.start_date * 1000).utcOffset("+05:30").format('D MMM YYYY, hh:mm A')}</span>
                                        </p>
                                        <p>
                                            <b>End Date : </b>
                                            <span>{moment(round.end_date * 1000).utcOffset("+05:30").format('D MMM YYYY, hh:mm A')}</span>
                                        </p>
                                    </> :
                                    <p>Yet to be Assigned</p>
                                }
                            </div>
                        }>
                            <div className={`f-d f-h-c f-v-c icon-wrapper c-pointer 
                            ${round.status === 3 ? "scheduled" : ""}`}>
                                { renderIcon(progress <= key ? round.type : 0, round.status) }
                            </div>
                        </Tooltip> :
                        <div className={`f-d f-h-c f-v-c icon-wrapper ${round.status === 3 ? 
                        "scheduled" : ""}`}>
                            { renderIcon(progress <= key ? round.type : 0, round.status) }
                        </div>
                    }
                    description={round.status === 4 ? "(Under Review)" : ""} 
                />
            )
        });
    }

    return (
        <div className="f-d f-vt-m program-card">
            <div className="program-card-details">
                <h3 className="font-heading title">
                    { program_name }
                </h3>
                <Steps className={`steps ${ status ? "" : "rejected" }`} current={progress} 
                direction={(isTablet || isMobile) ? "vertical" : "horizontal" } 
                labelPlacement={"vertical"} status={status ? "process" : "error"}>
                    { renderSteps() }
                </Steps>
            </div>
            <Button className={`action-btn arrow-btn ${!isActive ? "inactive" : ""}`} 
            loading={isLoading} onClick={() => takeTest()}>
                <i className="icon icon-arrow-right" />
            </Button>
        </div>
    )
}

export default ProgramCard;