import React, { useEffect, useState } from "react";
// import VisionNav from "../../../components/header/VisionNav";
import { Button, Icon, Input, message, Modal, Select, Table, Tabs } from "antd";
import { G_API_URL, G_URL } from "../../../constants/constants";
import { __getCookie } from "../../../utils/cookie.util";
import keys from "../../../config/keys";
import axios from "axios";
// @ts-ignore
import Highlighter from "react-highlight-words";
// @ts-ignore
import { CSVLink } from "react-csv";
import edit_icon from "../../../assets/icons/svg_icons/edit.svg";
import VisionAdminForm from "../../../components/Vision/AdminForm";
import queryString from "query-string";
import VisionLayout from "../../../components/Vision/Layout/vision_layout";
import { __getUserType, __getUID } from "../../../utils/user-details.util";
import { exportToXlsx } from "../../../utils/csv.util";
import moment from "moment";

const { TabPane } = Tabs;
const config = {
    headers: {
        Authorization: __getCookie(keys.cookiePrefix + "ut").cookieValue,
    },
};

interface IState {
    data: any;
    loading: any;
    key: any;
    absentee_data: any;
    export_data: any;
    incoming_data: any;
    modalVisible: any;
    parent_email: any;
    student_name: any;
    student_email: any;
    college: any;
    uid: any;
    gg: any;
    parent_name: any;
    bookedAt: any;
    slot_ts: any;
    isSubmitting: any;
    btnTxt: any;
    searchedColumn: any;
    searchText: any;
    slot_type: number;
    isExportModalVisible: boolean;
    isBulkUpdateModalVisible: boolean;
    programType: number;
    availableSlots: any;
    activeSlots: Array<any>;
    mentors: Array<any>;
    selectedSlot?: number;
    selectedSlotTs?: number;
    selectedMentor?: number;
    studentsList: any;
    absentees: any;
    userType: number;
    mentor_uid: number;
}

const VisionAdmin = (props: any) => {

    const {slot_type: mode} = props.match.params;

    const defaultState = {
        data: [],
        loading: false,
        key: 0,
        absentee_data: [],
        export_data: [],
        incoming_data: [],
        modalVisible: false,
        parent_email: "",
        student_name: "",
        student_email: "",
        college: "",
        uid: "",
        gg: "",
        parent_name: "",
        bookedAt: "",
        slot_ts: "",
        isSubmitting: false,
        btnTxt: "Save",
        searchedColumn: "",
        searchText: "",
        slot_type: mode === "freeclass" ? 1 : 2,
        studentsList: [],
        isExportModalVisible: false,
        isBulkUpdateModalVisible: false,
        absentees: [],
        programType: 1,
        availableSlots: {
            microdegree: [],
            bootcamp: []
        },
        activeSlots: [],
        mentors: [],
        userType: __getUserType(),
        mentor_uid: __getUID()
    };

    const [state, setState] = useState<IState>(defaultState);

    const { Option } = Select;

    let ref: any = React.createRef();
    let searchInput: Input | null;

    /*

    Search name and Email Fuctionalities

    */

    const getColumnSearchProps = (dataIndex: any) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
            <div style={{ padding: 8 }}>
                {/* {(clear_global_filters = clearFilters)} */}

                <Input
                    ref={(node) => {
                        searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
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
        filterIcon: (filtered: any) => (
            <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
        ),
        onFilter: (value: any, record: any) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible: any) => {
            if (visible) {
                setTimeout(() => searchInput && searchInput.select());
            }
        },
        render: (text: any) =>
            state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                    searchWords={[state.searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ) : (
                text
            ),
    });

    const handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
        confirm();
        setState(prev => ({
            ...prev,
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        }));
    };

    const handleReset = (clearFilters: any) => {
        clearFilters();
        setState(prev => ({ ...prev, searchText: "" }));
    };

    const onTabChange = (key: any) => {
        setState(prev => ({
            ...prev,
            key: parseInt(key),
        }));
        fetchData(parseInt(key));
    };

    const exportData = () => {
        const params:any = {
            params: {
                mode: state.key,
                slot_type: state.slot_type
            }
        }

        if(state.selectedSlot !== undefined) {
            params.params["slot_ts"] = state.activeSlots[state.selectedSlot].sdt;
        }

        if(state.mentors.length && state.selectedMentor !== undefined) {
            params.params["mentor_uid"] = state.mentors[state.selectedMentor].uid;
        } else if(state.selectedSlot && [8,9].includes(state.userType)) {
            message.error("Please select a mentor!")
            return;
        }

        axios.get(G_API_URL + `vision/data/export/`, { 
            ...params, 
            ...config 
        }).then((response) => {
            response = response.data;
            if (response.status === 1) {
                setState(prev => ({
                    ...prev,
                    export_data: response.data,
                    isExportModalVisible: false,
                    programType: 1,
                    activeSlots: state.availableSlots["microdegree"],
                    selectedSlot: undefined,
                    selectedSlotTs: undefined,
                    selectedMentor: undefined,
                    mentors: [],
                }));
                let fileName = "incoming_users_list";
                if(state.key === 1) {
                    fileName = "present_users_list"
                } else if(state.key === 2) {
                    fileName = "absentees_list"
                }
                if(response.data.length > 0) {
                    exportToXlsx(response.data, fileName);
                } else {
                    message.error("No users found to export in the given slot!");
                }
                
                // if (ref && ref.current && ref.current.link) {
                //     ref.current.link.click();
                //     ref = null;
                // }
            }
        });
    };

    // const updateData = () => {
    //     const { absentees } = state;
    //     const params:any = {
    //             uids: absentees
    //     }

    //     if(state.selectedSlot !== undefined) {
    //         params["slot_id"] = state.activeSlots[state.selectedSlot].slot_id;
    //     }

    //     if(absentees.length > 0) {
    //         axios.post(G_API_URL + `vision/bulk/attendance/`, 
    //         params, config).then((response) => {
    //             response = response.data;

    //             if(response.status === 1) {
    //                 message.success("Attendance marked successfully!");
    //                 setState(prev => ({
    //                     ...prev,
    //                     isBulkUpdateModalVisible: false,
    //                     selectedSlot: undefined,
    //                     selectedMentor: undefined,
    //                     absentees: []
    //                 }));

    //                 setTimeout(() => {
    //                     window.location.reload();
    //                 }, 1000)
    //             } else {
    //                 message.error("Something went wrong. Try again!" );
    //             }
    //         });
    //     } else {
    //         message.error("Please select atleast one absentee!");
    //     }
    // }

    // onClearTable() {
    //     const slug = (this.state.key === 1) ? 'comp-off/' : (this.state.key === 2) ? 'over-time/' : 'working-hours/';
    //     axios({
    //         url: G_API_URL + slug,
    //         method: 'delete',
    //     }).then((response) => {
    //         response = response.data;
    //         if (response.status === 1) {
    //             this.setState({
    //                 co_update: true,
    //                 ot_update: true,
    //                 wh_update: true
    //             });
    //             message.success(response.message);
    //             this.setState({
    //                 co_update: false,
    //                 ot_update: false,
    //                 wh_update: false
    //             });
    //         }
    //     }).catch(function (e) {
    //         console.log(e);
    //     });
    //
    // }

    let visionColumns: any = [
        {
            title: "Student Name",
            dataIndex: "student_name",
            ...getColumnSearchProps("student_name"),
            width: 180,
            fixed: "left"
        },
        {
            title: "Student Email",
            dataIndex: "student_email",
            ...getColumnSearchProps("student_email"),
            width: 180,
            fixed: "left"
        },
        {
            title: "Student Mobile",
            dataIndex: "mobile",
            ...getColumnSearchProps("mobile"),
            width: 180,
            fixed: "left"
        },
        {
            title: "College",
            dataIndex: "college",
            ...getColumnSearchProps("college"),
            width: 250
        },
        {
            title: "Program",
            dataIndex: "gg",
            render: (text: any, record: any) => {
                if(text === 1) {
                    return (
                        <div className="f-d f-v-c">
                            <div className="dot" style={{width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "var(--pink)", marginRight: "12px"}}>
                            </div>microdegree
                        </div>
                    )
                } else {
                    return (
                        <div className="f-d f-v-c">
                            <div className="dot" style={{width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "var(--purple)", marginRight: "12px"}}>
                            </div>bootcamp
                        </div>
                    )
                }
            },
            width: 150
        },
        {
            title: "Mentor",
            dataIndex: "mentor",
            ...getColumnSearchProps("mentor"),
            width: 150
        },
        {
            title: "Slot",
            dataIndex: "slot",
            ...getColumnSearchProps("slot"),
            width: 200
        },
        {
            title: "Links",
            key: "slug",
            // fixed: "right",
            dataIndex: "slug",
            render: (obj: any, data: any) => {
                return (
                    <>
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={G_URL + "vision/project/" + obj}
                        >
                            {" "}
                            Project
                        </a>{" "}
                        |{" "}
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={G_URL + "vision/certificate/" + obj}
                        >
                            {" "}
                            Certificate
                        </a>{" "}
                        |{" "}
                        {parseInt(data.status) === 1 && (
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={G_URL + "vision/report/" + obj}
                            >
                                {" "}
                                Report
                            </a>
                        )}
                    </>
                );
            },
            width: 250
        },
        {
            title: "Workshop Details",
            render: (text: any, record: any) => (
                <div className="vision-big-row">
                    <div>
                        <span className="vision-table-span">Comprehension Grade:&nbsp;</span>
                        <span>{record.c_score}</span>
                    </div>
                    <div>
                        <span className="vision-table-span">Computer Proficiency Grade:&nbsp;</span>
                        <span>{record.cp_score}</span>
                    </div>
                    <div>
                        <span className="vision-table-span">Design Thinking Grade:&nbsp;</span>
                        <span>{record.dt_score}</span>
                    </div>
                    <div>
                        <span className="vision-table-span">Average:&nbsp;</span>
                        <span>{record.avg}</span>
                    </div>
                    <div>
                        <span className="vision-table-span">Percentile:&nbsp;</span>
                        <span>{record.ptile}</span>
                    </div>
                    <div>
                        <span className="vision-table-span">Profile Type:&nbsp;</span>
                        <span>
                            {parseInt(record.profile_type) === 1
                                ? "Architect"
                                : parseInt(record.profile_type) === 2
                                ? "Commander"
                                : "Explorer"}
                        </span>
                    </div>
                </div>
            ),
            width: 250
        },
        // {
        //     title: "Calendly Data",
        //     render: (text, record) => (
        //         <div className="vision-big-row">
        //             <div>
        //                 <span className="vision-table-span">Name:&nbsp;</span>
        //                 <span>{record.parent_name_cly}</span>
        //             </div>
        //             <div>
        //                 <span className="vision-table-span">Email:&nbsp;</span>
        //                 <span>{record.parent_email_cly}</span>
        //             </div>
        //             <div>
        //                 <span className="vision-table-span">Mobile:&nbsp;</span>
        //                 <span>{record.mobile}</span>
        //             </div>
        //             <div>
        //                 <span className="vision-table-span">Child Name:&nbsp;</span>
        //                 <span>{record.student_name_cly}</span>
        //             </div>
        //             <div>
        //                 <span className="vision-table-span">Child's Grade:&nbsp;</span>
        //                 <span>{record.grade}</span>
        //             </div>
        //             <div>
        //                 <span className="vision-table-span">Reminder No:&nbsp;</span>
        //                 <span>{record.rem_mobile}</span>
        //             </div>
        //         </div>
        //     ),
        // },
        {
            title: "UTM Params",
            render: (text: any, record: any) => (
                <div className="vision-big-row">
                    <div>
                        <span className="vision-table-span">Content:&nbsp;</span>
                        <span>{record.utm_content}</span>
                    </div>
                    <div>
                        <span className="vision-table-span">Source:&nbsp;</span>
                        <span>{record.utm_source}</span>
                    </div>
                    <div>
                        <span className="vision-table-span">Medium:&nbsp;</span>
                        <span>{record.utm_medium}</span>
                    </div>
                    <div>
                        <span className="vision-table-span">Term:&nbsp;</span>
                        <span>{record.utm_term}</span>
                    </div>
                    <div>
                        <span className="vision-table-span">Campaign:&nbsp;</span>
                        <span>{record.utm_campaign}</span>
                    </div>
                </div>
            ),
            width: 250
        },
        {
            title: "Comments",
            dataIndex: "comments",
            width: 200
        },

        // {
        //     title: 'Report Status',
        //     dataIndex: 'status',
        //     render: (obj) => {
        //         return (
        //             <>
        //                 <Popconfirm placement="topLeft" title="Are you sure you want to deactivate this report?"
        //                             cancelText="Yes"
        //                             onCancel={this.onClearTable}
        //                             okText="No">
        //                     <Button type="primary" className='deactivate-btn' icon="poweroff"></Button>
        //                 </Popconfirm>
        //             </>
        //         )
        //     }
        // }
    ];

    const visionAbsenteeColumns: any = [
        {
            title: "Student Name",
            dataIndex: "student_name",
            ...getColumnSearchProps("student_name"),
            width: 180,
            fixed: "left"

        },
        {
            title: "Student Email",
            dataIndex: "student_email",
            ...getColumnSearchProps("student_email"),
            width: 180,
            fixed: "left"
        },
        {
            title: "Student Mobile",
            dataIndex: "mobile",
            ...getColumnSearchProps("mobile"),
            width: 180,
            fixed: "left"
        },
        {
            title: "College",
            dataIndex: "college",
            ...getColumnSearchProps("college"),
            width: 250
        },
        {
            title: "Program",
            dataIndex: "gg",
            render: (text: any, record: any) => {
                if(text === 1) {
                    return (
                        <div className="f-d f-v-c">
                            <div className="dot" style={{width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "var(--pink)", marginRight: "12px"}}>
                            </div>microdegree
                        </div>
                    )
                } else {
                    return (
                        <div className="f-d f-v-c">
                            <div className="dot" style={{width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "var(--purple)", marginRight: "12px"}}>
                            </div>bootcamp
                        </div>
                    )
                }
            },
            width: 150
        },
        {
            title: "Mentor",
            dataIndex: "mentor",
            ...getColumnSearchProps("mentor"),
            width: 150
        },
        {
            title: "Slot",
            dataIndex: "slot",
            ...getColumnSearchProps("slot"),
            width: 200
        },

        // {
        //     title: "Calendly Data",
        //     render: (text, record) => (
        //         <div className="vision-big-row">
        //             <div>
        //                 <span className="vision-table-span">Name:&nbsp;</span>
        //                 <span>{record.parent_name_cly}</span>
        //             </div>
        //             <div>
        //                 <span className="vision-table-span">Email:&nbsp;</span>
        //                 <span>{record.parent_email_cly}</span>
        //             </div>
        //             <div>
        //                 <span className="vision-table-span">Mobile:&nbsp;</span>
        //                 <span>{record.mobile}</span>
        //             </div>
        //             <div>
        //                 <span className="vision-table-span">Child Name:&nbsp;</span>
        //                 <span>{record.student_name_cly}</span>
        //             </div>
        //             <div>
        //                 <span className="vision-table-span">Child's Grade:&nbsp;</span>
        //                 <span>{record.grade}</span>
        //             </div>
        //             <div>
        //                 <span className="vision-table-span">Reminder No:&nbsp;</span>
        //                 <span>{record.rem_mobile}</span>
        //             </div>
        //         </div>
        //     ),
        // },
        {
            title: "UTM Params",
            render: (text: any, record: any) => (
                <div className="vision-big-row">
                    <div>
                        <span className="vision-table-span">Content:&nbsp;</span>
                        <span>{record.utm_content}</span>
                    </div>
                    <div>
                        <span className="vision-table-span">Source:&nbsp;</span>
                        <span>{record.utm_source}</span>
                    </div>
                    <div>
                        <span className="vision-table-span">Medium:&nbsp;</span>
                        <span>{record.utm_medium}</span>
                    </div>
                    <div>
                        <span className="vision-table-span">Term:&nbsp;</span>
                        <span>{record.utm_term}</span>
                    </div>
                    <div>
                        <span className="vision-table-span">Campaign:&nbsp;</span>
                        <span>{record.utm_campaign}</span>
                    </div>
                </div>
            ),
            width: 250
        },
        {
            title: "Comments",
            dataIndex: "comments",
            width: 200
        },
    ];

    const visionIncomingColumns: any = [
        {
            title: "UID",
            dataIndex: "uid",
            ...getColumnSearchProps("uid"),
            width: 80,
            fixed: "left"
        },
        {
            title: "Student’s Name",
            dataIndex: "student_name",
            ...getColumnSearchProps("student_name"),
            width: 180,
            fixed: "left"
        },

        {
            title: "Student’s Email",
            dataIndex: "student_email",
            ...getColumnSearchProps("student_email"), 
            width: 180,
            fixed: "left"
        },
        {
            title: "Student’s Mobile",
            dataIndex: "mobile",
            ...getColumnSearchProps("mobile"),
            width: 170,
            fixed: "left"
        },
        {
            title: "College",
            dataIndex: "college",
            ...getColumnSearchProps("college"),
            width: 250
        },
        {
            title: "Program",
            dataIndex: "gg",
            render: (text: any, record: any) => {
                if(text === 1) {
                    return (
                        <div className="f-d f-v-c">
                            <div className="dot" style={{width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "var(--pink)", marginRight: "12px"}}>
                            </div>microdegree
                        </div>
                    )
                } else {
                    return (
                        <div className="f-d f-v-c">
                            <div className="dot" style={{width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "var(--purple)", marginRight: "12px"}}>
                            </div>bootcamp
                        </div>
                    )
                }
            },
            width: 150
        },

        // {
        //     title: "Parent’s Details",
        //     dataIndex: "parent_name",
        //     key: "parent_details",
        //     ...getColumnSearchProps("parent_name"),
        //     render: (text: any, obj: any) => {
        //         let { parent_name, mobile, parent_email } = obj;

        //         return (
        //             <div className="parent-details-wrapper">
        //                 <div className="heading">Name:</div>
        //                 <div className="details">{parent_name}</div>
        //                 <div className="heading">Mobile:</div>
        //                 <div className="details">{mobile}</div>
        //                 <div className="heading">Email:</div>
        //                 <div className="details">{parent_email}</div>
        //             </div>
        //         );
        //     },
        //     width: 200,
        // },

        // {
        //     title: 'Parent Name',
        //     dataIndex: 'parent_name',
        //     ...this.getColumnSearchProps("parent_name"),
        //     width:'100'
        // },
        // {
        //     title: 'Parent Email',
        //     dataIndex: 'parent_email',
        //     ...this.getColumnSearchProps("parent_email"),
        //     width:'200'
        // },
        {
            title: "Mentor",
            dataIndex: "mentor",
            ...getColumnSearchProps("mentor"),
            width: 150
        },
        {
            title: "Slot",
            dataIndex: "slot",
            ...getColumnSearchProps("slot"),
            width: 200
        },
        // {
        //     title: 'User Type',
        //     dataIndex: 'user_type',
        //     width:'100',
        //     render: (obj) => {
        //         return parseInt(obj) === 1 ? 'Junior' : parseInt(obj) === 2 ? 'Parent' : '';
        //     }
        // },
        // {
        //     title: "Calendly Data",
        //     render: (text, record) => (
        //         <div className="vision-big-row">
        //             <div>
        //                 <span className="vision-table-span">Name:&nbsp;</span>
        //                 <span>{record.parent_name_cly}</span>
        //             </div>
        //             <div>
        //                 <span className="vision-table-span">Email:&nbsp;</span>
        //                 <span>{record.parent_email_cly}</span>
        //             </div>
        //             <div>
        //                 <span className="vision-table-span">Mobile:&nbsp;</span>
        //                 <span>{record.mobile}</span>
        //             </div>
        //             <div>
        //                 <span className="vision-table-span">Child Name:&nbsp;</span>
        //                 <span>{record.student_name_cly}</span>
        //             </div>
        //             <div>
        //                 <span className="vision-table-span">Child's Grade:&nbsp;</span>
        //                 <span>{record.grade}</span>
        //             </div>
        //             <div>
        //                 <span className="vision-table-span">Reminder No:&nbsp;</span>
        //                 <span>{record.rem_mobile}</span>
        //             </div>
        //         </div>
        //     ),
        // },
        {
            title: "UTM Params",
            render: (text: any, record: any) => (
                <div className="vision-big-row">
                    <div>
                        <span className="vision-table-span">Content:&nbsp;</span>
                        <span>{record.utm_content}</span>
                    </div>
                    <div>
                        <span className="vision-table-span">Source:&nbsp;</span>
                        <span>{record.utm_source}</span>
                    </div>
                    <div>
                        <span className="vision-table-span">Medium:&nbsp;</span>
                        <span>{record.utm_medium}</span>
                    </div>
                    <div>
                        <span className="vision-table-span">Term:&nbsp;</span>
                        <span>{record.utm_term}</span>
                    </div>
                    <div>
                        <span className="vision-table-span">Campaign:&nbsp;</span>
                        <span>{record.utm_campaign}</span>
                    </div>
                </div>
            ),
            width: 250
        },
        {
            title: "EDIT",
            render: (text: any, record: any) => (
                <Button
                    className="editBtn"
                    onClick={() => {
                        handleUpdate(record);
                    }}
                >
                    <img src={edit_icon} width="12" height="12" alt="" />
                </Button>
            ),
            width: 100,
            fixed: "right"
        },
    ];

    const headers = [
        { label: "Student Name", key: "student_name" },
        { label: "Parent Name", key: "parent_name" },
        { label: "Parent Email", key: "parent_email" },
        { label: "Mentor", key: "mentor" },
        { label: "Attendance", key: "attendance" },

        { label: "UTM Content", key: "utm_content" },
        { label: "UTM Source", key: "utm_source" },
        { label: "UTM Medium", key: "utm_medium" },
        { label: "UTM Term", key: "utm_term" },
        { label: "UTM Campaign", key: "utm_campaign" },

        { label: "Calendly Name", key: "parent_name_cly" },
        { label: "Calendly Email", key: "parent_email_cly" },
        { label: "Calendly Child Name", key: "student_name_cly" },
        { label: "Calendly Child's Grade", key: "grade" },
        { label: "Calendly Reminder No", key: "rem_mobile" },
        { label: "Calendly Slot", key: "slot" },

        { label: "Comprehension Grade", key: "c_score" },
        { label: "Computer Proficiency Grade", key: "cp_score" },
        { label: "Design Thinking Grade", key: "dt_score" },
        { label: "Average", key: "avg" },
        { label: "Percentile", key: "ptile" },
        { label: "Profile Type", key: "profile_type" },
        { label: "Project", key: "project" },

        { label: "Project Link", key: "project_link" },
        { label: "Certificate Link", key: "cert_link" },
        { label: "Report Link", key: "report_link" },

        { label: "Comments", key: "comments" },
    ];

    useEffect(() => {
        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    // const onChange = (info: any) => {
    //     if (info.file.status !== "uploading") {
    //         // console.log(info.file, info.fileList);
    //     }
    //     if (info.file.status === "done") {
    //         fetchData();
    //         if (info.file.response.status !== null && info.file.response.status !== undefined) {
    //             switch (parseInt(info.file.response.status)) {
    //                 case 0:
    //                     message.error(info.file.response.message);
    //                     break;
    //                 case 1:
    //                     message.success(info.file.response.message);
    //                     break;
    //                 case 2:
    //                     message.warning(info.file.response.message);
    //                     break;
    //                 default:
    //                     break;
    //             }
    //         }
    //     } else if (info.file.message === "error") {
    //         message.error("File upload failed!");
    //     }
    // };

    const fetchData = (key: any = null, slotType: any = state.slot_type) => {
        setState(prev => ({ ...prev, loading: true }));
        key = key !== undefined && key !== null ? key : state.key;

        const {type} = props;
        let config = {
            params: {
                type: type,
                slot_type: slotType
            },
            headers: {
                Authorization: __getCookie(keys.cookiePrefix + "ut").cookieValue,
            },
        };
        let slug = "vision/data";
        if(slotType === 2 && (key === 1 || key === 2)) {
            slug = "liveclass"
        }

        axios
            .get(
                G_API_URL +
                    `${slug}${key === 0 ? "/incoming/" : key === 1 ? "/admin/" : "/absentee/"}`,
                config
            )
            .then((response: any) => {
                response = response.data;
                let data:any = {
                    loading: false,
                    incoming_data: response.data,
                    availableSlots: response.slots,
                    activeSlots: response.slots && response.slots.microdegree ?
                    response.slots.microdegree : [],
                }

                if (key === 0) {
                    data.incoming_data = response.data;
                } else if (key === 1) {
                    data.data = response.data;
                } else if (key === 2) {
                    data.absentee_data = response.data;
                }
                setState(prev => ({
                    ...prev,
                    ...data
                }));
            });
    };
    const handleUpdate = (record: any) => {
        setState(prev => ({
            ...prev,
            modalVisible: true,
            parent_email: record.parent_email !== undefined ? record.parent_email : "",
            student_name: record.student_name !== undefined ? record.student_name : "",
            student_email: record.student_email !== undefined ? record.student_email : "",
            uid: record.uid !== undefined ? record.uid : "",
            gg: record.gg !== undefined ? record.gg : "",
            college: record.college !== undefined ? record.college : "",
            parent_name: record.parent_name !== undefined ? record.parent_name : "",
            bookedAt: record.bookedAt !== undefined ? record.bookedAt : "",
            slot_ts: record.slot_ts !== undefined ? record.slot_ts : "",
        }));
    };

    const handleClose = () => {
        setState(prev => ({
            ...prev,
            modalVisible: false,
            student_email: "",
            student_name: "",
            college: "",
            parent_name: "",
            isSubmitting: false,
            btnTxt: "Save",
        }));
    };

    const handleSubmit = (values: any) => {
        setState(prev => ({ ...prev, btnTxt: "Saving data...", isSubmitting: true }));
        axios
            .post(G_API_URL + `vision/attendance/`, queryString.stringify(values), config)
            .then((response: any) => {
                response = response.data;
                handleClose();
                if (response.status === 1) {
                    message.success(response.message);
                    fetchData(0);
                } else {
                    message.error(response.message);
                }
            })
            .catch((err) => {
                // Do somthing
                console.log(err);
            });
    };

    // const handleFilter = (e: any) => {
    //     const slotType = parseInt(e);
    //     setState(prev => ({
    //         ...prev,
    //         slot_type: slotType
    //     }));

    //     fetchData(null, slotType);
    // }

    // const radioChange = (e: any) => {
    //     let programType = e.target.value === 1? "microdegree": "bootcamp";
    //     setState(prev => ({
    //         ...prev,
    //         programType: e.target.value,
    //         activeSlots: state.availableSlots[programType],
    //         selectedSlot: undefined,
    //         selectedMentor: undefined
    //     }))
    // }

    const renderSlots = () => {
        return state.activeSlots.map((slot: any, key) => 
        <Option value={key}>{
            moment(slot.sdt * 1000).format("D MMM YYYY, h:mm A") 
            + " - " + moment(slot.edt * 1000).format(" h:mm A")
        }</Option>);
    }

    const renderMentors = () => {
        let mentors = state.mentors.map((mentor,key) => 
            <Option value={key}>
                { mentor.userName }
            </Option>
        );
        return mentors;
    }

    const handleSlotChange = (e: any) => {
        setState(prev => ({
            ...prev,
            mentors: state.activeSlots[e].mentors,
            selectedSlot: e,
            selectedSlotTs: state.activeSlots[e].sdt,
            selectedMentor: undefined,
            absentees: []
        }))
        if(state.userType === 7) renderStudents(state.mentor_uid);
    }

    const renderStudents = (mentor_id: number) => {
        let students = state.incoming_data.filter((data: any) => 
        parseInt(data.mentor_id) === mentor_id && 
        data.slot_ts === state.selectedSlotTs).map((data: any) => {
            return {
                label: data.student_name,
                value: data.uid
            }
        });
        setState(prev => ({
            ...prev,
            studentsList: students
        }));
    }

    const handleMentorChange = (e: any, type: any) => {
        setState(prev => ({
            ...prev,
            selectedMentor: e,
            absentees: []
        }));
        if(type === 2) renderStudents(state.mentors[e].uid);
    }

    const closeModal = () => {
        setState(prev => (
            { 
                ...prev, 
                isExportModalVisible: false,
                programType: 1,
                activeSlots: state.availableSlots["microdegree"],
                selectedSlot: undefined,
                selectedMentor: undefined,
                mentors: []
            })
        )
    }

    // const openBulkUpdateModal = () => {
    //     setState(prev => ({
    //         ...prev,
    //         isBulkUpdateModalVisible: true
    //     }));
    // }

    // const closeBulkUpdateModal = () => {
    //     setState(prev => ({
    //         ...prev,
    //         isBulkUpdateModalVisible: false,
    //         programType: 1,
    //         activeSlots: state.availableSlots["microdegree"],
    //         selectedSlot: undefined,
    //         selectedMentor: undefined,
    //         mentors: [],
    //         absentees: []
    //     }));
    // }

    // const handleCheck = (checkedValues: any) => {
    //     setState(prev => ({
    //         ...prev,
    //         absentees: checkedValues
    //     }))
    // }
    // render() {
        // const visionUploadParams = {
        //     name: 'file',
        //     action: G_API_URL + "vision/upload/",
        //     method: 'post',
        //     accept: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        //     showUploadList: false,
        //     onChange: this.onChange,
        //     headers: {
        //         authorization: __getCookie(keys.cookiePrefix + "ut").cookieValue,
        //     }
        // };
    const {
        data,
        absentee_data,
        loading,
        export_data,
        incoming_data,
        modalVisible,
        parent_email,
        student_name,
        student_email,
        college,
        uid,
        gg,
        parent_name,
        bookedAt,
        slot_ts,
        btnTxt,
        isSubmitting,
        slot_type
    } = state;

    // let slotType = slot_type === 1 ? "Workshop" : "Live Class";

    // const menu = (
    //     <Menu onClick={(e) => handleFilter(e.key)}>
    //         <Menu.Item key="1">
    //             Workshop
    //         </Menu.Item>
    //         <Menu.Item key="2">
    //             Live Class
    //         </Menu.Item>
    //     </Menu>
    // );

    if(slot_type === 2) {
        let columnsToBeRemoved = ["Links", "Workshop Details"];
        visionColumns = visionColumns.filter((column: any) => !columnsToBeRemoved.includes(column.title))
    }

    return (
        <>
            {/* <VisionNav/> */}
            <VisionLayout slot_type={mode}>
                <div className=" lr-pad-d registrations">
                    {/* <Row>
                        <Col> */}
                            {/*<Upload {...visionUploadParams}>*/}
                            {/*    <Button className='upload-btn'>*/}
                            {/*        <Icon type="cloud-upload"/> Upload Excel sheet*/}
                            {/*    </Button>*/}
                            {/*</Upload>*/}
                            <div className="f-d f-h-e f-v-c">
                                {/* <Dropdown overlay={menu} placement="bottomCenter">
                                    <div className="f-d f-v-c filter-btn c-pointer">
                                        <Icon type="filter" theme="filled" />
                                        <span className="filter-slot-btn">{slotType}</span>
                                    </div>
                                </Dropdown> */}
                                {/* {
                                    state.key === 0 &&
                                    <div className="f-d f-v-c bulk-update-btn c-pointer"
                                    onClick={() => openBulkUpdateModal()}>
                                        Bulk Update
                                    </div>
                                } */}
                                <div
                                    className="default-blue-btn btn-small export-data-btn"
                                    onClick={() => setState(prev => (
                                        {...prev, isExportModalVisible: true}
                                    ))}
                                >
                                    <CSVLink
                                        filename={"Vision Data.csv"}
                                        data={export_data}
                                        asyncOnClick={false}
                                        ref={ref}
                                        headers={headers}
                                    />
                                    Export Data
                                </div>
                            </div>
                        {/* </Col>
                    </Row> */}
                    <VisionAdminForm
                        modalVisible={modalVisible}
                        parent_email={parent_email}
                        student_email={student_email}
                        student_name={student_name}
                        college={college}
                        uid={uid}
                        gg={gg}
                        slot_type={slot_type}
                        parent_name={parent_name}
                        bookedAt={bookedAt}
                        slot_ts={slot_ts}
                        handleClose={handleClose}
                        handleSubmit={handleSubmit}
                        isSubmitting={isSubmitting}
                        btnTxt={btnTxt}
                    />

                    <Tabs defaultActiveKey="0" onChange={onTabChange}>
                        <TabPane tab="Incoming" key="0">
                            <Table
                                className="vision-table"
                                columns={visionIncomingColumns}
                                rowKey={(record:any) => record._id}
                                dataSource={incoming_data}
                                loading={loading}
                                scroll={{ x: 1500, y: 500 }}
                            />
                        </TabPane>
                        <TabPane tab="Present" key="1">
                            <Table
                                className="vision-table"
                                columns={visionColumns}
                                rowKey={(record: any) => record._id}
                                dataSource={data}
                                loading={loading}
                                scroll={{ x: 1500, y: 500 }}
                            />
                        </TabPane>
                        <TabPane tab="Absent" key="2">
                            <Table
                                className="vision-table"
                                columns={visionAbsenteeColumns}
                                rowKey={(record:any) => record._id}
                                dataSource={absentee_data}
                                loading={loading}
                                scroll={{ x: 1500, y: 500 }}
                            />
                        </TabPane>
                    </Tabs>
                </div>
                <Modal
                    title="Export Data"
                    className="export-modal"
                    visible={state.isExportModalVisible}
                    onOk={exportData}
                    okText={"Export"}
                    onCancel={() => closeModal()}
                    destroyOnClose={true}
                >
                    {/* <h5 className="h5-heading">Program</h5>
                    <Radio.Group 
                    onChange={(e) => radioChange(e)} 
                    value={state.programType}>
                        <Radio value={1}>Microdegree</Radio>
                        <Radio value={2}>Bootcamp</Radio>
                    </Radio.Group> */}
                    <h5 className="h5-heading ">Slot</h5>
                    <Select className="w-60" 
                    onChange={(e: any) => handleSlotChange(e)}
                    value={state.selectedSlot}>
                        { renderSlots() }
                    </Select>
                    {
                        [8,9].includes(state.userType) && 
                        state.mentors.length > 0 &&
                        <>
                            <h5 className="h5-heading mr-top">Mentor</h5>
                            <Select className="w-60"
                            onChange={(e: any) => handleMentorChange(e, 1)}
                            value={state.selectedMentor}>
                                { renderMentors() }
                            </Select>
                        </>
                    }
                </Modal>
                {/* <Modal
                    title="Bulk Update"
                    className="bulk-update-modal"
                    visible={state.isBulkUpdateModalVisible}
                    onOk={updateData}
                    okText={"Update"}
                    onCancel={() => closeBulkUpdateModal()}
                    destroyOnClose={true} 
                > */}
                    {/* <h5 className="h5-heading">Program</h5>
                    <Radio.Group 
                    onChange={(e) => radioChange(e)} 
                    value={state.programType}>
                        <Radio value={1}>Microdegree</Radio>
                        <Radio value={2}>Bootcamp</Radio>
                    </Radio.Group> */}
                    {/* <h5 className="h5-heading">Slot</h5>
                    <Select className="w-60" 
                    onChange={(e: any) => handleSlotChange(e)}
                    value={state.selectedSlot}>
                        { renderSlots() }
                    </Select>
                    {
                        [8,9].includes(state.userType) && 
                        state.mentors.length > 0 &&
                        <>
                            <h5 className="h5-heading mr-top">Mentor</h5>
                            <Select className="w-60"
                            onChange={(e: any) => handleMentorChange(e, 2)}
                            value={state.selectedMentor}>
                                { renderMentors() }
                            </Select>
                        </>
                    }
                {
                    (state.selectedMentor !== undefined || (state.userType === 7 && state.selectedSlot !== undefined )) &&
                    <>
                        <h5 className="h5-heading mr-top">Mark Absent Users</h5>
                        <Checkbox.Group 
                            className="students-list"
                            options={state.studentsList} 
                            onChange={handleCheck} 
                        />
                    </>
                } */}
                {/* </Modal> */}
            </VisionLayout>
            <style jsx>
                {`
                    .body-container {
                        padding-left: 2rem;
                        padding-right: 2rem;
                    }

                    .body-container .upload-btn {
                        display: flex;
                        align-items: center;
                    }
                    .body-container .vision-table {
                        margin-top: 2rem;
                    }
                    .body-container .upload-btn:hover,
                    .body-container .upload-btn:focus,
                    .body-container .upload-btn:active,
                    .body-container .upload-btn.active {
                        color: var(--purple);
                        border-color: var(--purple);
                    }
                    .body-container .deactivate-btn:hover,
                    .body-container .deactivate-btn:focus {
                        color: var(--purple);
                        background-color: var(--dove) !important;
                    }
                    .body-container .deactivate-btn {
                        background-color: var(--purple);
                        border-color: var(--purple);
                    }
                    .body-container .export-data-btn {
                        margin-top: 1rem;
                        width: 100%;
                        height: 35px !important;
                    }
                    .vision-table-span {
                        font-weight: bold;
                    }
                    .ant-table-row-cell-break-word,
                    .vision-big-row {
                        font-family: "OpenSans";
                    }

                    .parent-details-wrapper .heading {
                        font-weight: 500;
                        color: var(--carbon);
                    }

                    .parent-details-wrapper .details {
                        margin-bottom: 3px;
                    }

                    .registrations .filter-btn,
                    .registrations .bulk-update-btn {
                        background-color: #2C3E50;
                        color: var(--dove);
                        padding: 0 var(--peaky-pad-16);
                        border-radius: var(--peaky-br-4);
                        height: 35px;
                        margin: 0 var(--peaky-gap-32) 0 0;
                    }

                    .students-list {
                        display: grid;
                    }

                    .students-list .ant-checkbox-group-item {
                        margin-top: 8px;
                    }

                    .registrations .filter-slot-btn {
                        margin-left: 10px;
                    }

                    .export-modal .mr-top,
                    .bulk-update-modal .mr-top {
                        margin: var(--peaky-gap-32) 0 var(--peaky-gap-4);
                    }

                    .registrations .ant-tabs {
                        color: var(--dove);
                    }

                    .vision-table .ant-table-thead > tr > th,
                    .vision-table .ant-table-tbody > tr > td {
                        color: var(--dove);
                        background: var(--primary-bg);
                    }

                    .vision-table .ant-table-thead > tr.ant-table-row-hover:not(.ant-table-expanded-row):not(.ant-table-row-selected) > td, 
                    .vision-table .ant-table-tbody > tr.ant-table-row-hover:not(.ant-table-expanded-row):not(.ant-table-row-selected) > td, 
                    .vision-table .ant-table-thead > tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected) > td, 
                    .vision-table .ant-table-tbody > tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected) > td {
                        background: var(--spider);
                    }
                `}
            </style>
        </>
    );
    // }
}

export default VisionAdmin;
