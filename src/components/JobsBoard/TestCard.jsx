import React from "react";
import { Button } from "antd";
import moment from "moment-timezone";
import axios from "axios";
import { calcDuration } from "../../utils/common.util";
import { __getToken } from "../../utils/user-details.util";
import { G_PR_URL } from "../../constants/constants";

const TestCard = (props) => {
    const { title, duration, type, round, start_date, end_date, instance_id, o_id, redirectToTest } = props;
    const testDuration = `${ calcDuration(duration).hrs === 0 ? '' : `${ calcDuration(duration).hrs }h` } ${ calcDuration(duration).mins}m`;
    const currentTime = moment().utcOffset("+05:30");
    let status = 0;
    if (currentTime.unix() < start_date) {
        status = 2;
    } else if (((currentTime.unix() > start_date) && (currentTime.unix() < end_date)) || (currentTime.unix() > start_date) || (currentTime.unix() < end_date)) {
        status = 1;
    }

    const takeTest = () => {
        axios.get(G_PR_URL + "test/take-test", {
            params: {
                instance_id,
                o_id
            },
            headers: {
                Authorization: __getToken()
            }
        }).then(response => {
            response = response.data;
            if(response.status === 1) {
                redirectToTest(response.payloadEnc, response.authToken);
            }
        }).catch(error => {
            console.log(error);
        })
    }

    const renderButton = () => {
        switch(type) {
            case 1:
                return (
                    <Button className="action-btn arrow-btn"
                    onClick={() => takeTest()}>
                        <i className="icon icon-arrow-right" />
                    </Button>
                )
            case 2:
                return (
                    <Button className="action-btn loader-btn">
                        <i className="icon icon-loader" />
                    </Button>
                )
            case 3:
                return (
                    <Button className="action-btn check-btn">
                        <i className="icon icon-check" />
                    </Button>
                )
            case 4:
                return (
                    <Button className="action-btn closed-loader-btn">
                        <i className="icon icon-loader" />
                    </Button>
                )
            default:
                    return (<></>)
        }
    }
    return (
        <div className="f-d test-card">
            <div className="test-card-details">
                <h3 className="font-heading text-big title">
                    { title }
                </h3>
                <div className="g-d g-col-2 g-gap-8 info">
                    <div className="f-d f-v-s">
                        <i className="icon icon-clock" />
                        <p className="f-d f-vt">
                            <span className="strong-text">Duration</span>
                            <span className="light-text">
                                { testDuration }
                            </span>
                        </p>
                    </div>
                    <div className="f-d f-v-s">
                        <i className="icon icon-calendar" />
                        <p className="f-d f-vt">
                            <span className="strong-text">
                                { status === 1 ? "Start Date" : "Deadline" }
                            </span>
                            <span className="light-text">
                                { 
                                    status === 0 ? (
                                        moment(end_date * 1000).utcOffset("+05:30").format('D MMM YYYY, hh:mm A')
                                    ) : status === 1 ? (
                                        end_date !== -1 ? moment(end_date * 1000).format('D MMM YYYY, hh:mm A') :
                                        `Always Active`
                                    ) : (
                                        moment(start_date * 1000).utcOffset("+05:30").format('D MMM YYYY, hh:mm A')
                                    )
                                }
                            </span>
                        </p>
                    </div>
                    <div className="f-d f-v-s">
                        <i className="icon icon-clipboard" />
                        <p className="f-d f-vt">
                            <span className="strong-text">Test type</span>
                            <span className="light-text">{ round }</span>
                        </p>
                    </div>
                </div>
            </div>
            { renderButton() }
        </div>
    )
}

export default TestCard;