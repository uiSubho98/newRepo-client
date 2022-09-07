import React, {Component} from 'react';
import {Button, Col, Icon, Input, Row, Table} from 'antd';
import {G_API_URL, G_URL} from "../../constants/constants";
import {__getCookie} from "../../utils/cookie.util";
import keys from "../../config/keys";
import axios from "axios";
import Highlighter from "react-highlight-words";
import {CSVLink} from "react-csv";


const config = {
    headers: {
        "Authorization": __getCookie(keys.cookiePrefix + "ut").cookieValue
    }
};

class DataDashboard extends Component {
    state = {
        data: [],
        loading: false,
    };

    clear_global_filters;

    /*

    Search name and Email Fuctionalities

    */

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>
                {(this.clear_global_filters = clearFilters)}

                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{width: 188, marginBottom: 8, display: "block"}}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    icon="search"
                    size="small"
                    style={{width: 90, marginRight: 8}}
                >
                    Search
                </Button>
                <Button
                    onClick={() => this.handleReset(clearFilters)}
                    size="small"
                    style={{width: 90}}
                >
                    Reset
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{color: filtered ? "#1890ff" : undefined}}/>
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{backgroundColor: "#ffc069", padding: 0}}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ) : (
                text
            )
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({searchText: ""});
    };

    Columns = [
        {
            title: 'UID',
            dataIndex: 'uid',
            ...this.getColumnSearchProps("uid"),

        },
        {
            title: 'Name',
            dataIndex: 'userName',
            ...this.getColumnSearchProps("userName"),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            ...this.getColumnSearchProps("email"),
        },
        {
            title: 'Sign Up Details',
            render: (text, record) => <div className='vision-big-row'>
                <div><span
                    className='vision-table-span'>Sign Up Date:&nbsp;</span><span>{record.registrationTime}</span>
                </div>
                <div><span className='vision-table-span'>Sign Up Source:&nbsp;</span><span>{record.regSrc}</span>
                </div>
            </div>
        },
        {
            title: 'Other Details',
            render: (text, record) => <div className='vision-big-row'>
                <div><span className='vision-table-span'>Mobile:&nbsp;</span><span>{record.mobile}</span></div>
                <div><span className='vision-table-span'>College:&nbsp;</span><span>{record.college}</span></div>
                <div><span className='vision-table-span'>Degree:&nbsp;</span><span>{record.degree}</span></div>
                <div><span className='vision-table-span'>Stream:&nbsp;</span><span>{record.stream}</span></div>
                <div><span className='vision-table-span'>YOP:&nbsp;</span><span>{record.yop}</span></div>
            </div>
        },
        {
            title: 'UTM Params',
            render: (text, record) => <div className='vision-big-row'>
                <div><span className='vision-table-span'>Content:&nbsp;</span><span>{record.utm_content}</span></div>
                <div><span className='vision-table-span'>Source:&nbsp;</span><span>{record.utm_source}</span></div>
                <div><span className='vision-table-span'>Medium:&nbsp;</span><span>{record.utm_medium}</span></div>
                <div><span className='vision-table-span'>Term:&nbsp;</span><span>{record.utm_term}</span></div>
                <div><span className='vision-table-span'>Campaign:&nbsp;</span><span>{record.utm_campaign}</span></div>
            </div>
        },
        {
            title: 'Free Experience Registered',
            render: (text, record) => <div className='vision-big-row'>
                <div>
                    <span className='vision-table-span'>
                        {(!record.bookedAt || record.bookedAt === "-") ? "N" : "Y" }
                    </span>
                </div>
            </div>
        },
        {
            title: 'Free Experience Details (Microdegree)',
            render: (text, record) => <div className='vision-big-row'>
                <div><span className='vision-table-span'>Booking Date:&nbsp;</span><span>{record.bookedAt}</span></div>
                <div><span className='vision-table-span'>Booked Slot:&nbsp;</span><span>{record.booked_slot}</span>
                </div>
                <div><span className='vision-table-span'>Attendance:&nbsp;</span><span>{record.att}</span></div>
                <div><span className='vision-table-span'>Attended Slot:&nbsp;</span><span>{record.slot}</span></div>
            </div>
        },
        {
            title: 'Reschedule Details',
            render: (text, record) => <div className='vision-big-row'>
                <div><span
                    className='vision-table-span'>Reschedule Count:&nbsp;</span><span>{record.reschedule_count}</span>
                </div>
                <div><span
                    className='vision-table-span'>Reschedule Date:&nbsp;</span><span>{record.reschedule_booked_at}</span>
                </div>
                <div><span
                    className='vision-table-span'>Reschedule Slot:&nbsp;</span><span>{record.reschedule_slot}</span>
                </div>
                <div><span className='vision-table-span'>Attendance:&nbsp;</span><span>{record.reschedule_status}</span>
                </div>
            </div>
        },
        {
            title: 'Microdegree Payment Details',
            render: (text, record) => <div className='vision-big-row'>
                <div><span
                    className='vision-table-span'>Date:&nbsp;</span><span>{record.orderCompletionTime}</span>
                </div>
                <div><span
                    className='vision-table-span'>Coupon:&nbsp;</span><span>{record.couponUsed}</span>
                </div>
                <div><span
                    className='vision-table-span'>Amount Paid:&nbsp;</span><span>{record.amountPaid}</span>
                </div>
                <div><span className='vision-table-span'>Vendor:&nbsp;</span><span>{record.paymentPortal}</span>
                </div>
                <div><span
                    className='vision-table-span'>Order ID:&nbsp;</span><span>{record.externalOrderId}</span>
                </div>
                <div><span className='vision-table-span'>Plan:&nbsp;</span><span>{record.purchaseMode}</span>
                </div>
            </div>
        },
        {
            title: 'Bootcamp Payment Details',
            render: (text, record) => <div className='vision-big-row'>
                <div><span
                    className='vision-table-span'>Date:&nbsp;</span><span>{record.igOrderCompletionTime}</span>
                </div>
                <div><span
                    className='vision-table-span'>Coupon:&nbsp;</span><span>{record.igCouponUsed}</span>
                </div>
                <div><span
                    className='vision-table-span'>Amount Paid:&nbsp;</span><span>{record.igAmountPaid}</span>
                </div>
                <div><span className='vision-table-span'>Vendor:&nbsp;</span><span>{record.igPaymentPortal}</span>
                </div>
                <div><span
                    className='vision-table-span'>Order ID:&nbsp;</span><span>{record.igExternalOrderId}</span>
                </div>
                <div><span
                    className='vision-table-span'>Mode:&nbsp;</span><span>{record.igMode}</span>
                </div>
            </div>
        },
    ];

    headers = [
        {label: "UID", key: "uid"},
        {label: "Name", key: "userName"},
        {label: "Email", key: "email"},

        {label: "Sign Up Date", key: "registrationTime"},
        {label: "Sign Up Source", key: "regSrc"},

        {label: "College", key: "college"},
        {label: "Degree", key: "degree"},
        {label: "Stream", key: "stream"},
        {label: "YOP", key: "yop"},
        {label: "Mobile", key: "mobile"},

        {label: "UTM Content", key: "utm_content"},
        {label: "UTM Source", key: "utm_source"},
        {label: "UTM Medium", key: "utm_medium"},
        {label: "UTM Term", key: "utm_term"},
        {label: "UTM Campaign", key: "utm_campaign"},

        {label: "Free Experience Registration", key: "bookedAt"},
        {label: "Free Experience Attendance", key: "att"},
        {label: "Free Experience Attended Slot", key: "slot"},
        {label: "Free Experience Booked Slot", key: "booked_slot"},

        {label: "Reschedule Count", key: "reschedule_count"},
        {label: "Reschedule Date", key: "reschedule_booked_at"},
        {label: "Reschedule Attendance", key: "reschedule_status"},
        {label: "Reschedule Slot", key: "reschedule_slot"},

        {label: "Microdegree Payment Date", key: "orderCompletionTime"},
        {label: "Microdegree Coupon Used", key: "couponUsed"},
        {label: "Microdegree Amount Paid", key: "amountPaid"},
        {label: "Microdegree Payment Portal", key: "paymentPortal"},
        {label: "Microdegree Order ID", key: "externalOrderId"},
        {label: "Microdegree Plan", key: "purchaseMode"},

        {label: "Bootcamp Payment Date", key: "igOrderCompletionTime"},
        {label: "Bootcamp Coupon Used", key: "igCouponUsed"},
        {label: "Bootcamp Amount Paid", key: "igAmountPaid"},
        {label: "Bootcamp Payment Portal", key: "igPaymentPortal"},
        {label: "Bootcamp Order ID", key: "igExternalOrderId"},
        {label: "Bootcamp Mode", key: "igMode"},
    ];

    componentDidMount() {
        this.fetchData();
    }


    fetchData = () => {
        this.setState({loading: true});
        axios.get(G_API_URL + 'auth/data-dashboard', config)
            .then(response => {
                response = response.data;
                if (response.status === 1) {
                    this.setState({
                        loading: false,
                        data: response.data
                    });
                } else
                    window.location.href = G_URL
            });
    };


    render() {
        const {loading, data} = this.state;
        return (
            <>

                <div className="body-container">
                    <Row>
                        <Col span={4} offset={20}>
                            <CSVLink
                                filename={"Data.csv"}
                                data={data}
                                className="default-blue-btn export-data-btn"
                                headers={this.headers}
                            >
                                Export Data
                            </CSVLink>
                        </Col>
                    </Row>

                    <Table className='vision-table'
                           columns={this.Columns}
                           rowKey={record => record._id}
                           dataSource={data}
                           loading={loading}
                           scroll={{y: 500}}
                    />
                </div>
                <style jsx={"true"}>
                    {`
                      .body-container {
                        padding-left: 2rem;
                        padding-right: 2rem;
                      }

                      .body-container .upload-btn {
                        display: flex;
                        align-items: center
                      }

                      .body-container .vision-table {
                        margin-top: 2rem;
                      }

                      .body-container .upload-btn:hover, .body-container .upload-btn:focus, .body-container .upload-btn:active, .body-container .upload-btn.active {
                        color: var(--purple);
                        border-color: var(--purple);
                      }

                      .body-container .deactivate-btn:hover, .body-container .deactivate-btn:focus {
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

                      .ant-table-row-cell-break-word, .vision-big-row, body .vision-table {
                        font-family: 'OpenSans' !important;
                      }

                    `}
                </style>
            </>
        );
    }
}

export default DataDashboard;
