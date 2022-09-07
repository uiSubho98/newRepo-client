import React,{ useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { G_API_URL, G_URL } from "../../constants/constants";
import Spinner from "../../components/Spinner/spinner";
// @ts-ignore
import prograd_pink_logo from "../../assets/brand/FavIcon/favicon.ico";
import { __getToken } from "../../utils/user-details.util";
// @ts-ignore
import { Table, Input, Button, Icon, Modal, Switch, InputNumber, message } from "antd";
// @ts-ignore
import ObjectID from "bson-objectid";
// @ts-ignore
import Highlighter from "react-highlight-words";
// @ts-ignore
import { Helmet } from 'react-helmet';
import axios from "axios";
import TextArea from "antd/lib/input/TextArea";
import { check_login } from "../../utils/login.util";

interface IContent {
    uid: number;
    userName: string;
    mobileNumber: string;
    year: number;
    email: string;
    status: boolean;
    score: number;
    message: string;
    registrationTime: string;
    discordUsername?: string;
    batchId?: string;
}

interface IColumns {
    title: string;
    key: string;
    fixed?: string;
    width: number;
    dataIndex: string;
}

interface IState {
    isLoading: boolean;
    isModalVisible: boolean;
    activeUid: number;
    isEnabled: boolean;
    score: number;
    message: string;
    searchText: string;
    searchedColumn: number
}

const ApplicationTracker = () => {

    const defaultState = {
        isLoading: false,
        isModalVisible: false,
        activeUid: -1,
        isEnabled: false,
        score: 0,
        message:"",
        searchText: "",
        searchedColumn: 2
    }

    const [content, setContent] = useState<Array<IContent>>([]);    
    const [state, setState] = useState<IState>(defaultState);
    useEffect(() => {
        // Check if user is not logged in
        if(!check_login()) {
            window.location.href = G_URL + "login";
        }
        const fetchApplications = () => {

            const payload = {
                headers: {
                    Authorization: __getToken()
                }
            }

            setState(prev => ({...prev,isLoading: true}));
            axios.get(G_API_URL+"tracker/applications/",payload)
            .then((response) => {
                response = response.data;
                if(response.status) {
                    setContent(response.data);
                    setState(prev => ({...prev,isLoading: false}));
                }
            }).catch((error) => {
                if(error.response && error.response.status === 403) {
                    window.location.href = G_URL + "forbidden";
                }
            });
        }
        fetchApplications();
    },[]);

    // let clear_global_filters:any;
    let searchInput:any;
    const getColumnSearchProps = (dataIndex:any) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }:any) => (
            <div style={{ padding: 8 }}>
                {/* {(clear_global_filters = clearFilters)} */}

                <Input
                    ref={node => {
                        searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: "block" }}
                />
                <Button
                    type="primary"
                    onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
                </Button>
                <Button
                    onClick={() => handleReset(clearFilters)}
                    size="small"
                    style={{ width: 90 }}
                >
                    Reset
                </Button>
            </div>
        ),
        filterIcon: (filtered:boolean) => (
            <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
        ),
        onFilter: (value:string, record:Array<number>) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible:boolean) => {
            if (visible) {
                setTimeout(() => searchInput.select());
            }
        },
        render: (text:string) =>
            state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                    searchWords={[state.searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ) : (
                text
            )
    });

    const handleSearch = (selectedKeys:Array<string>, confirm:Function, dataIndex:number) => {
        confirm();
        setState(prev => ({
            ...prev,
            searchText: selectedKeys[0],
            searchedColumn: dataIndex
        }));
    };

    const handleReset = (clearFilters:any) => {
        clearFilters();
        setState(prev => ({ ...prev, searchText: "" }));
    };

    const handleClick = (uid:any = -1 ,status:any = false, score:any = 0, message:any = ""):void => {
        setState(prev => ({
            ...prev, 
            isModalVisible: !state.isModalVisible,
            activeUid: uid,
            isEnabled:status,
            score,
            message
        }));
    }

    const handleChange = (type:string, value:any) => {
        switch (type) {
            case "eligibility":
                setState(prev => ({...prev, isEnabled:value}));
                break;
            case "score":
                setState(prev => ({...prev, score:value}));
                break;
            case "message":
                setState(prev => ({...prev, message:value}));
                break;
        }
    }


    const handleSubmit = () => {
        let date = new Date();
        date.setDate(date.getDate() + 2);
        let lastDate = date.getDate() + "-" + 
        (date.getMonth()+1) + "-" + date.getFullYear();
        
        const headers = {
            headers: {
                Authorization: __getToken()
            }
        }

        const data = {
            userId: state.activeUid,
            status: state.isEnabled,
            score: state.score,
            message: state.message,
            lastDate: lastDate
        }

        axios.put(G_API_URL+"tracker/update/application/",data,headers)
        .then((response) => {
            response = response.data;
            if(response.status) {

                let updatedContent = content.map(data => {
                    if(data.uid === state.activeUid) {
                        data.status = state.isEnabled;
                        data.score = state.score;
                        data.message = state.message;
                    }
                    return data;
                });
                setContent(updatedContent);
                
                setState(prev => ({
                    ...prev,
                    activeUid: -1,
                    isModalVisible: false,
                    isEnabled: false,
                    score: 0,
                    message: ""
                }));

                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                message.error("Something went wrong, please try again!");
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    let columns: any = [
        {
            title: "Candidate Name",
            key: "username",
            fixed: "left",
            width: 170,
            dataIndex: "userName",
            ...getColumnSearchProps("userName")
        },
        {
            title: "Mobile Number",
            key: "mobile_no",
            fixed: "left",
            width: 150,
            dataIndex: "mobileNumber"
        },
        {
            title: "Email Address",
            key: "email",
            fixed: "left",
            width: 250,
            dataIndex: "email",
            ...getColumnSearchProps("email")
        },
        {
            title: "Batch Id",
            key: "batch_id",
            width: 100,
            dataIndex: "batchId"
        },
        {
            title: "Program",
            key: "program",
            width: 200,
            dataIndex: "program"
        },
        {
            title: "Year",
            key: "yop",
            width: 100,
            dataIndex: "year"
        },
        {
            title: "Project Link",
            key: "projectLink",
            width: 250,
            render: (obj:any) => {
                const { projectLink } = obj;
                return (
                    <a href={projectLink}>
                        {projectLink}
                    </a>
                )
            }
        },
        {
            title: "Github Link",
            key: "githubLink",
            width: 250,
            render: (obj:any) => {
                const { githubLink } = obj;
                return (
                    <a href={githubLink} target="_blank" 
                    rel="noopener noreferrer">
                        {githubLink}
                    </a>
                )
            }
        },
        {
            title: "Time of Submission",
            key: "timestamp",
            width: 200,
            // eslint-disable-next-line no-empty-pattern
            render: ({}, obj:any) => {
                const { timestamp } = obj;
                const ObjectId = new ObjectID(timestamp);
                const time:any = ObjectId.getTimestamp();
                const dateReadable = time.toDateString();
                const fullTimeReadable = time.toTimeString();
                const timeRead = fullTimeReadable.substring(0, 9);
                return (
                    <>
                        <div>{dateReadable}</div>
                        <div> {timeRead}</div>
                    </>
                );
            }
        },
        {
            title: "Evaluation",
            key: "status",
            dataIndex: "uid",
            fixed: "right",
            width: 100,
            // eslint-disable-next-line no-empty-pattern
            render: ({},obj:any) => {
                const { uid, status, score, message, updatedBy } = obj;
                return (
                    <>
                        <Button className="default-pink-btn filled-pink
                        btn-small" onClick={() => handleClick(uid, status , score, message)}>
                            { !updatedBy? "Evaluate" : "Review" }
                        </Button>
                    </>
                );
            }
        }
    ];

    return (
        <>
            { 
                !state.isLoading ?
                <Layout navAction={"Account"}>
                    <Helmet>
                        <link 
                            rel="icon" 
                            type="image/png" 
                            href={prograd_pink_logo} 
                            sizes="16x16" 
                        />
                        <title>Application Tracker</title>
                    </Helmet>
                    <div className="application-tracker-content-wrapper
                    lr-pad-d lr-pad-m tb-pad-d tb-pad-m">
                        <h1 className="h1-heading">
                            Application Tracker
                        </h1>

                        <Table 
                            dataSource= { content }
                            columns = { columns }
                            scroll={{ x: 1400 }}
                        />
                    </div>
                    <Modal
                        className="evaluation-modal"
                        centered
                        title={"Evaluation"}
                        okText={"Submit"}
                        onOk={() => handleSubmit()}
                        onCancel={() => handleClick()}
                        destroyOnClose={true}
                        visible={state.isModalVisible}
                    >
                        <div className="evaluation-content-block">
                            <div className="f-d f-h-sb f-v-c">
                                <span className="h4-heading">
                                    Eligible
                                </span>
                                <Switch 
                                    checked={state.isEnabled} 
                                    onChange={(event) => 
                                    handleChange("eligibility", event)} 
                                />
                            </div>
                            <div className="f-d f-h-sb f-v-c">
                                <span className="h4-heading">
                                    Score
                                </span>
                                <InputNumber 
                                    min={0} 
                                    max={10}
                                    className="score" 
                                    placeholder="0 - 10"
                                    value={state.score} 
                                    onChange={(event) => 
                                        handleChange("score", event)}
                                />
                            </div> 
                            <div className="f-d f-vt">
                                <span className="f-d h4-heading">
                                    Message
                                </span>
                                <TextArea 
                                    rows= {5}
                                    className="message"
                                    onChange={(event) => 
                                        handleChange("message", event.target.value)} 
                                    value = {state.message}
                                />
                            </div>
                        </div>
                    </Modal>
                    <style jsx>{`
                        .application-tracker-content-wrapper 
                        .ant-table-body::-webkit-scrollbar {
                            height: 7px;
                        }
 
                        .ant-switch-checked {
                            background-color: var(--pink);
                        }

                        .evaluation-modal .evaluation-content-block {
                            padding: var(--peaky-pad-8);
                        }

                        .evaluation-modal .evaluation-content-block
                        .score {
                            width: 20%;
                        }

                        .evaluation-modal .evaluation-content-block
                        .message {
                            margin: var(--peaky-gap-8) 0 0;
                        }

                        .evaluation-modal .evaluation-content-block > div {
                            margin: 0 0 var(--peaky-gap-24);
                        }
                    `}</style>
                </Layout> :
                <Spinner />
            }
        </>
    )
}

export default ApplicationTracker;