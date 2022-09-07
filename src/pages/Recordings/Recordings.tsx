import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Helmet } from "react-helmet";
import { Table } from 'antd';
import { BBB_API_URL, G_API_URL } from "../../constants/constants";
import axios from "axios";
import { __getToken } from "../../utils/user-details.util";
import { convert_time_into_string, openNotification } from "../../utils/common.util";
import moment from "moment";
import Spinner from "../../components/Spinner/spinner";
import { isMobile } from "react-device-detect";
import { useHistory } from "react-router";


const Recordings = () => {
    const [recordings, setRecordings] = useState<any>([]);
    const [isLoading, setLoading] = useState<boolean>(false);
    const history = useHistory();

    const config = {
        headers: {
            Authorization: __getToken()
        }
    };

    let columns: any = [
        {
            title: 'Date of The Session',
            dataIndex: 'date',
            key: 'date',
            fixed: 'left',
            width: isMobile ? "125px" : "unset"
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            width: isMobile ? "125px" : "unset"
        },
        {
            title: 'Session Time',
            dataIndex: 'time',
            key: 'time',
            width: isMobile ? "125px" : "unset"
        },
        {
            title: 'Session',
            dataIndex: 'session',
            key: 'session',
            width: isMobile ? "125px" : "unset"
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            key: 'duration',
            width: isMobile ? "125px" : "unset"
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            fixed: 'right',
            render: (arg1 = {}, obj: any) => {
                const { slot_id } = obj.action;
                return (
                    <div className="watch-btn c-pointer" onClick={() =>
                        watchRecordings(slot_id, "copy")}>
                        Watch
                    </div>
                )
            }
        }
    ];

    const watchRecordings = async (meet_id: any, type: any = "open") => {
        const config = {
            params: {
                meetingID: meet_id,
            },
        };
        let response = await axios.get(BBB_API_URL + "record/getRecordings/", config);
        if (type === "open") {
            if (response.data.data) {
                let record_url = response.data.data.bbb_url;
                window.open(record_url, "_blank");
            }
        }

        if (type === "copy") {
            if (response.data.data) {
                let record_details = response.data.data.response;
                if (record_details) {
                    if (record_details["recordings"] && record_details["recordings"][0]) {
                        let record_url = record_details["recordings"][0];
                        record_url = record_url["recording"][0];
                        // record_url = G_URL + "recording/player/" + record_url["internalMeetingID"];
                        record_url = record_url["playback"][0];
                        record_url = record_url["format"][0]["url"][0];
                        window.open(record_url, "_blank");
                        // navigator.clipboard.writeText(record_url);
                        // openNotification("success", "Rec. Link Copied", 6);
                    } else if (record_details["message"] && record_details["message"][0]) {
                        let message = record_details["message"][0];
                        openNotification("fail", message, 6);
                    }
                }
            }
        }
    };

    useEffect(() => {
        setLoading(true);
        axios.get(G_API_URL + "vision/recordings/", config)
            .then((response) => {
                response = response.data;
                if (response.status) {
                    let recordings: any = [];
                    response.data.forEach((booking: any, key: any) => {
                        recordings.push(
                            {
                                key: `${key + 1}`,
                                date: moment(new Date(booking.sdt * 1000)).format("DD MMM YYYY"),
                                time: moment(new Date(booking.sdt * 1000)).format("HH:mm A") + " - " + moment(new Date(booking.edt * 1000)).format("HH:mm A"),
                                session: booking.session,
                                title: booking.title || "-",
                                duration: convert_time_into_string(booking.duration, 2),
                                action: {
                                    slot_id: booking.slot_id
                                }
                            }
                        )
                    });
                    setRecordings(recordings);
                    setLoading(false);
                }
            }).catch((error) => console.log(error))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let program = window.location.hash;

    const goToDashboard = () => {
        if (program && program.split("#")[1] &&
            ["microdegree", "bootcamp"].includes(program.split("#")[1])) {
            program = program.split("#")[1];
            history.push({
                pathname: '/learning-dashboard/' + program
            });
        } else {
            history.push({
                pathname: '/learning-dashboard/microdegree'
            });
        }
    }

    return (
        !isLoading ?
            <Layout navAction={"Recordings"}>
                <Helmet>
                    <title>ProGrad | Recordings</title>
                </Helmet>
                <div className="lr-pad-d lr-pad-m tb-pad-d tb-pad-m
            recordings-wrapper">
                    {
                        program &&
                        <div className="f-v-c learning-dashboard-btn strong-text
                    cap-letter" onClick={() => goToDashboard()}>
                            <i className="icon icon-chevron-left"></i> Learning Dashboard
                        </div>
                    }
                    <h2 className="font-heading text-large">
                        Session Recordings
                    </h2>
                    <span className="body-regular description text-regular">
                        Now watch your session recordings anytime!
                    </span>
                    <Table
                        className="w-80 recordings-table"
                        columns={columns}
                        dataSource={recordings}
                        scroll={isMobile ? { x: true } : {}}
                    />
                </div>
                <style jsx>{`

                .recordings-wrapper .title {
                    color: var(--granite);
                }

                 
                .recordings-wrapper .description {
                    color: var(--sandstone);
                }

                .recordings-wrapper .recordings-table {
                    margin: var(--peaky-gap-32) 0 0;
                }

                .recordings-wrapper .recordings-table .watch-btn {
                    color: var(--primary);
                }

                .recordings-wrapper .recordings-table 
                .ant-table-thead > tr > th {
                    padding-top: var(--peaky-gap-24);
                    padding-bottom: var(--peaky-gap-24);
                }

                .recordings-wrapper .recordings-table 
                .ant-table-thead > tr > th,
                .recordings-wrapper .recordings-table
                .ant-table-tbody > tr > td {
                    color: var(--dove);
                    background-color: var(--primary-bg);
                }

                .ant-table-thead > tr.ant-table-row-hover:not(.ant-table-expanded-row):not(.ant-table-row-selected) > td,
                .ant-table-tbody > tr.ant-table-row-hover:not(.ant-table-expanded-row):not(.ant-table-row-selected) > td,
                .ant-table-thead > tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected) > td, 
                .ant-table-tbody > tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected) > td {
                    background-color: var(--carbon);
                }

                .recordings-wrapper .learning-dashboard-btn {
                    display: none;   
                }

                @media only screen and (max-device-width: 760px) {
                    .recordings-wrapper .recordings-table {
                        width: 100%;
                    }

                    .recordings-wrapper .learning-dashboard-btn {
                        display: flex;
                        margin: 0 0 var(--peaky-gap-24);
                    }

                    .recordings-wrapper .learning-dashboard-btn .icon {
                        color: var(--primary);
                        font-size: 24px;
                    }
                }
            `}</style>
            </Layout> :
            <Spinner />
    )
}

export default Recordings;