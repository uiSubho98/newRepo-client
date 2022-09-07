import React, { useEffect, useState } from "react";
import VisionLayout from "../../../../components/Vision/Layout/vision_layout";
import { Tabs, Button } from "antd";
import VisionTable from "../../../../components/Vision/Table/visionTable";
import axios from "axios";
import { G_API_URL } from "../../../../constants/constants";
import { __getToken } from "../../../../utils/user-details.util";
import EditBook from "../../../../components/Vision/scheduler/EditBookDetails/EditBook";

const { TabPane } = Tabs;

interface IState {
    loading: any;
    data: any;
    visible: any;
    userData: any;
    key: any; 
}

const VisionRegistration = (props: any) => {
    const defaultState = {
        loading: [true, true, true],
        data: { "0": [], "1": [], "2": [] },
        visible: false,
        userData: {},
        key: "all",
    };

    const [state, setState] = useState<IState>(defaultState);

    const columns = [
        {
            title: "UID",
            dataIndex: "uid",
            key: "uid",
            search: true,
        },
        {
            title: "Student’s Name",
            dataIndex: "student_name",
            key: "student_name",
            search: true,
        },
        {
            title: "Grade",
            dataIndex: "grade",
            key: "grade",
        },
        {
            title: "Parent’s Details",
            dataIndex: "p_details",
            key: "parent_details",
            render: (text: any, obj: any) => {
                let { parent_name, mobile, parent_email } = obj;

                return (
                    <div className="parent-details-wrapper">
                        <div className="heading">Name:</div>
                        <div className="details">{parent_name}</div>
                        <div className="heading">Mobile:</div>
                        <div className="details">{mobile}</div>
                        <div className="heading">Email:</div>
                        <div className="details">{parent_email}</div>
                    </div>
                );
            },
        },
        {
            title: "Slot Details",
            dataIndex: "slot",
            key: "slot",
            search: true,
        },
        {
            title: "Assigned Mentor",
            dataIndex: "mentor",
            key: "mentor",
            search: true,
        },
        {
            title: "Actions",
            dataIndex: "uid",
            key: "edit",
            render: (uid: any) => {
                return (
                    <Button
                        type="primary"
                        shape="circle"
                        icon="edit"
                        onClick={() => handleClick("edit", uid)}
                    />
                );
            },
        },
    ];

    useEffect(() => {
        fetchBookingDetails("all");
    }, [])

    const fetchBookingDetails = (mode: any) => {
        const { type } = props;

        let state_details = [0, "0"];

        if (mode === "all") state_details = [0, "0"];
        else if (mode === "present") state_details = [1, "1"];
        else if (mode === "absent") state_details = [2, "2"];

        let config = {
            params: {
                mode: mode,
                type: type,
            },
            headers: {
                Authorization: __getToken(),
            },
        };

        axios.get(G_API_URL + "slot/prg-bookings", config).then((res) => {
            let response = res.data.data;
            let { loading, data } = state;
            loading[state_details[0]] = false;
            data[state_details[1]] = response;
            setState(prev => ({ ...prev, loading, data }));
        });
    };

    const handleClick = (type: any, uid: any) => {
        let config = {
            params: {
                uid: uid,
            },
            headers: {
                Authorization: __getToken(),
            },
        };
        axios.get(G_API_URL + "slot/booking-details/", config).then((res) => {
            setState(prev => ({ ...prev, visible: true, userData: res.data.data }));
        });
    };

    const callback = (key: any) => {
        setState(prev => ({ ...prev, key: key }));
        fetchBookingDetails(key);
    };

    const ModalCancel = (modal_name: any) => {
        if (modal_name === "edit-modal") {
            setState(prev => ({ ...prev, visible: false }));
            fetchBookingDetails(state.key);
        }
    };


    const { loading, data, visible, userData } = state;
    return (
        <>
            <VisionLayout>
                <div className="vision-reg-wrapper lr-pad-d lr-pad-m">
                    <Tabs defaultActiveKey="all" onChange={callback}>
                        <TabPane tab="Incoming" key="all">
                            <VisionTable
                                columns={columns}
                                data={data["0"]}
                                loading={loading[0]}
                            />
                        </TabPane>
                        <TabPane tab="Present" key="present">
                            <VisionTable
                                columns={columns}
                                data={data["1"]}
                                loading={loading[1]}
                                edit={"false"}
                            />
                        </TabPane>
                        <TabPane tab="Absent" key="absent">
                            <VisionTable
                                columns={columns}
                                data={data["2"]}
                                loading={loading[2]}
                                edit={"false"}
                            />
                        </TabPane>
                    </Tabs>
                </div>
                <EditBook
                    visible={visible}
                    title={"Edit user Details"}
                    ModalCancel={ModalCancel}
                    userData={userData}
                />
            </VisionLayout>
            <style jsx>{`
                .parent-details-wrapper .heading {
                    font-weight: 500;
                    color: var(--carbon);
                }

                .parent-details-wrapper .details {
                    margin-bottom: 3px;
                }
            `}</style>
        </>
    );
}

export default VisionRegistration;
