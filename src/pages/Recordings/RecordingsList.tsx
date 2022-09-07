import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { BBB_API_URL, G_URL } from '../../constants/constants';
import { Button, Icon, Table } from 'antd';
import { openNotification } from '../../utils/common.util';
import moment from 'moment';
import VisionLayout from '../../components/Vision/Layout/vision_layout';

const RecordingsList = (props: any) => {
    const [recordings, setRecordings] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { slug, slot_type } = props.match.params;

    const copyLink = (recordLink: string) => {
        navigator.clipboard.writeText(recordLink);
        openNotification("success", "Rec. Link Copied", 6);
    }

    useEffect(() => {
        const getRecordingsList = async() => {
            setLoading(true);
            const config: any = {
                params: {
                    meetingID: slug
                }
            };
    
            let response: any = await Axios.get(BBB_API_URL + "record/getRecordings/", config);
            if(response.data && response.data.data && 
                response.data.data.response) {
                setLoading(false);
                response = response.data.data.response;
                if(response.recordings && response.recordings.length) {
                    if(response.recordings[0].recording) {
                        let recordings = response.recordings[0].recording;
                        recordings = recordings.map((recording: any) => {
                            return {
                                startTime: moment(parseInt(recording.startTime[0])).format('D MMM YYYY, H:MM a'),
                                endTime: moment(parseInt(recording.endTime[0])).format("D MMM YYYY H:MM a"),
                                state: recording.state[0],
                                participants: parseInt(recording.participants[0]),
                                recordLink: recording.playback[0].format[0].url[0]
                            };
                        });
                        setRecordings(recordings);
                    } else {
                        setRecordings([]);
                    }
                }            
            }
        }
        getRecordingsList();
    }, [slug])

    const columns = [
        {
            title: 'Start Time',
            dataIndex: 'startTime',
            key: 'startTime'
        },
        {
            title: 'End Time',
            dataIndex: 'endTime',
            key: 'endTime'
        },
        {
            title: 'State',
            dataIndex: 'state',
            key: 'state'
        },
        {
            title: 'Participants',
            dataIndex: 'participants',
            key: 'participants'
        },
        {
            title: 'Record Link',
            dataIndex: 'recordLink',
            key: 'recordLink',
            render: (value:string ) => {
                return (
                    <div className="f-d f-h-s">
                    <Button
                        id="copy-btn"
                        onClick={() => copyLink(value)}
                    >
                        <Icon
                            type="copy"
                            style={{ fontSize: 20, color: "var(--dove)" }}
                            theme={"filled"}
                        />
                    </Button>
                </div>
                )
            }
        }
    ];

    const handleGoBack = () => {
        if(slot_type === "freeclass") {
            window.location.href = G_URL + "vision/admin/freeclass/recordings";
        } else {
            window.location.href = G_URL + "admin/liveclass/recordings";
        }
    }

    return (
        <VisionLayout>
            <div className="lr-pad-d lr-pad-m tb-pad-m 
            recordings-list">
                <div className="go-back-btn c-pointer f-d f-v-c" 
                onClick={() => handleGoBack()}>
                    <i className="icon icon-arrow-left"></i>
                    Back
                </div>
                <h1 className="h1-heading title">
                    Recordings
                </h1>
                <Table 
                    dataSource={recordings} 
                    columns={columns} 
                    loading={loading} 
                    pagination={{ position: "bottom" }} 
                    scroll={{ x: true }}
                />
            </div>
            <style jsx>{`
                #root {
                    margin-top: 0;
                }

                #copy-btn {
                    border-radius: 50%;
                    height: 40px;
                    width: 40px;
                    background-color: var(--pink);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: none;
                }

                .title {
                    color: var(--dove);
                }

                .go-back-btn {
                    margin-bottom: 2rem;
                    font-weight: 300;
                    color: var(--dove);
                    font-size: 18px;
                    width: max-content;
                    text-transform: uppercase;
                }

                .go-back-btn:hover {
                    color: var(--primary);
                }

                .go-back-btn .icon {
                    padding: 4px;
                    margin-right: 8px;
                    border: 1px solid var(--snowfall);
                    border-radius: var(--peaky-br-full);
                }

                .ant-table-tbody>tr {
                    color: var(--dove);
                }

                .ant-table-thead > tr.ant-table-row-hover:not(
                .ant-table-expanded-row):not(.ant-table-row-selected) > td, 
                .ant-table-tbody > tr.ant-table-row-hover:not(
                .ant-table-expanded-row):not(.ant-table-row-selected) > td, 
                .ant-table-thead > tr:hover:not(
                .ant-table-expanded-row):not(.ant-table-row-selected) > td, 
                .ant-table-tbody > tr:hover:not(
                .ant-table-expanded-row):not(.ant-table-row-selected) > td {
                    background: var(--spider);
                }
            `}</style>
        </VisionLayout>
    )
}

export default RecordingsList;