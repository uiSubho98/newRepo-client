import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { DatePicker, Table, Modal, Radio, message } from 'antd';
import axios from "axios";
import { G_API_URL } from '../../constants/constants';
import { RangePickerValue } from 'antd/lib/date-picker/interface';
import { __getToken } from '../../utils/user-details.util';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { exportToXlsx } from '../../utils/csv.util';

const { RangePicker } = DatePicker;

interface RegistrationsProps {
    
}

interface IRegistrationUser {
    college: string
    informationConsent: boolean
    mobileNumber: string
    parentEmail: string
    parentMobileNumber: string
    parentName: string
    parentPrefix: string
    prefix: string
    userConsent: boolean
    userName: string
    utm_campaign: string
    utm_source: string
    year: string
    email: string
    verified: boolean
    registrationTime: number
    subscriptions: {
        microdegree: boolean
        bootcamp: boolean
        mdSource?: string
    },
    progress: any
    wkshpAtt: {
        mdwss: boolean
        mdatt: boolean
        bcwss: boolean
        bcatt: boolean
    }
}

const Registrations = (props: RegistrationsProps) => {
    const defaultConstraint = {
        verification: 3,
        bootcampSubscription: 3,
        microdegreeSubscription: 3,
        bootcampPayment: 3,
        microdegreePayment: 3,
        mdWorkshopScheduled: 3,
        bcWorkshopScheduled: 3,
        mdWorkshopAttended: 3,
        bcWorkshopAttended: 3
    }
    const [data, setData] = useState<Array<IRegistrationUser>>();
    const [dates, setDate] = useState<RangePickerValue>();
    const [loading, setLoading] = useState<boolean>(false);
    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const [constraints, setConstraints] = useState<any>(defaultConstraint);

    const fetchRegistrationData = () => {
        setLoading(true)
        let payload = {
            params:{
                startTime: dates && dates[0]?.unix(),
                endTime: dates && dates[1]?.unix()
            },
            headers: {
                Authorization: __getToken()
            }
        }

        axios
            .get(G_API_URL + "admin/registrations", payload)
            .then(response => {
                if (response.data.status === 1) {
                    let { data } = response.data;
                    setData(data)
                    setLoading(false)
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    const updateTime = (dates: RangePickerValue, dateStrings: [string, string]) => {
        setDate(dates);
    }

    const CheckIcon = <CheckCircleFilled style={{ fontSize: '32px', color: '#28a745' }} />;
    const CloseIcon = <CloseCircleFilled style={{ fontSize: '32px', color: '#dc3545' }} />;

    const columns = [
        {
            title: 'Name',
            dataIndex: 'userName',
            fixed: true,
            key: 'name',
            width: 100,
            sorter: (a:IRegistrationUser, b:IRegistrationUser) => a.userName > b.userName ? 1 : -1,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            fixed: true,
            key: 'email',
            width: 150,
        },
        {
            title: 'Year',
            dataIndex: 'year',
            key: 'year',
            width: 80,
        },
        {
            title: 'College',
            dataIndex: 'college',
            key: 'college',
            width: 150,
        },
        {
            title: 'Verified',
            dataIndex: 'verified',
            key: 'verified',
            width: 100,
            render: (user: IRegistrationUser) => {
                return user.verified ? CheckIcon : CloseIcon
            },
            filters: [
                {
                    text: 'Verified',
                    value: 'true',
                },
                {
                    text: 'Not Verified',
                    value: 'false',
                }
            ],
            onFilter: (value: string, user: IRegistrationUser) => user.verified.toString() === value
        },
        {
            title: 'Parent Name',
            dataIndex: 'parentName',
            key: 'parentName',
        },
        {
            title: 'Parent Email',
            dataIndex: 'parentEmail',
            key: 'parentEmail',
            width: 150,
        },
        {
            title: 'Prefix',
            dataIndex: 'prefix',
            key: 'prefix',
            width: 100,
        },
        {
            title: 'Mobile Number',
            dataIndex: 'mobileNumber',
            key: 'mobileNumber',
            width: 150,
        },
        {
            title: 'Parent Prefix',
            dataIndex: 'parentPrefix',
            key: 'parentPrefix',
            width: 100,
        },
        {
            title: 'Parent Mobile Number',
            dataIndex: 'parentMobileNumber',
            key: 'parentMobileNumber',
            width: 150,
        },
        {
            title: 'Information Consent',
            dataIndex: 'informationConsent',
            key: 'informationConsent',
            width: 120,
            render: (value: boolean) => {
                return value.toString()
            }
        },
        {
            title: 'User Consent',
            dataIndex: 'userConsent',
            key: 'userConsent',
            width: 100,
            render: (value: boolean) => {
                return value.toString()
            }
        },
        {
            title: 'UTM Campaign',
            dataIndex: 'utm_campaign',
            key: 'utm_campaign',
            width: 110,
        },
        {
            title: 'UTM Source',
            dataIndex: 'utm_source',
            key: 'utm_source',
            width: 100,
        },
        {
            title: 'Registration Time',
            dataIndex: 'registrationTime',
            key: 'registrationTime',
            width: 150,
            sorter: (a:IRegistrationUser, b:IRegistrationUser) => a.registrationTime - b.registrationTime,
            render: (value: number) => {
                return new Date(value * 1000).toLocaleString()
            }
        },
        {
            title: 'Stats',
            children: [
                {
                    title: 'Subscription',
                    children: [
                        {
                            title: 'Microdegree',
                            key: 'subsMicrodegree',
                            width: 150,
                            render: (user: IRegistrationUser) => {
                                return user.subscriptions.microdegree ? CheckIcon : CloseIcon
                            },
                            filters: [
                                {
                                    text: 'Subscribed',
                                    value: 'true',
                                },
                                {
                                    text: 'Not Subscribed',
                                    value: 'false',
                                }
                            ],
                            onFilter: (value: string, user: IRegistrationUser) => user.subscriptions.microdegree.toString() === value
                        },
                        {
                            title: 'Bootcamp',
                            key: 'subsBootcamp',
                            width: 150,
                            render: (user: IRegistrationUser) => {
                                return user.subscriptions.bootcamp ? CheckIcon : CloseIcon
                            },
                            filters: [
                                {
                                    text: 'Subscribed',
                                    value: 'true',
                                },
                                {
                                    text: 'Not Subscribed',
                                    value: 'false',
                                }
                            ],
                            onFilter: (value: string, user: IRegistrationUser) => user.subscriptions.bootcamp.toString() === value
                        }
                    ]
                },
                {
                    title: 'Workshop',
                    children: [
                        {
                            title: 'MD Workshop Slot Selection',
                            key: 'MDWSS',
                            width: 150,
                            render: (user: IRegistrationUser) => {
                                return user.wkshpAtt.mdwss ? CheckIcon : CloseIcon
                            },
                            filters: [
                                {
                                    text: 'Selected',
                                    value: 'true',
                                },
                                {
                                    text: 'Not Selected',
                                    value: 'false',
                                }
                            ],
                            onFilter: (value: string, user: IRegistrationUser) =>  user.wkshpAtt.mdwss.toString() === value
                        },
                        {
                            title: 'MD Workshop Attended',
                            key: 'mdWorkshopAttended',
                            width: 150,
                            render: (user: IRegistrationUser) => {
                                return user.wkshpAtt.mdatt ? CheckIcon : CloseIcon
                            },
                            filters: [
                                {
                                    text: 'Present',
                                    value: 'true',
                                },
                                {
                                    text: 'Absent',
                                    value: 'false',
                                }
                            ],
                            onFilter: (value: string, user: IRegistrationUser) => user.wkshpAtt.mdatt.toString() === value
                        },
                        {
                            title: 'BC Workshop Slot Selection',
                            key: 'BCWSS',
                            width: 150,
                            render: (user: IRegistrationUser) => {
                                return user.wkshpAtt.bcwss ? CheckIcon : CloseIcon
                            },
                            filters: [
                                {
                                    text: 'Selected',
                                    value: 'true',
                                },
                                {
                                    text: 'Not Selected',
                                    value: 'false',
                                }
                            ],
                            onFilter: (value: string, user: IRegistrationUser) => user.wkshpAtt.bcwss.toString() === value
                        },
                        {
                            title: 'BC Workshop Attended',
                            key: 'bcWorkshopAttended',
                            width: 150,
                            render: (user: IRegistrationUser) => {
                                return user.wkshpAtt.bcatt ? CheckIcon : CloseIcon
                            },
                            filters: [
                                {
                                    text: 'Present',
                                    value: 'true',
                                },
                                {
                                    text: 'Absent',
                                    value: 'false',
                                }
                            ],
                            onFilter: (value: string, user: IRegistrationUser) => user.wkshpAtt.bcatt.toString() === value
                        },
                    ]
                }, 
                {
                    title: 'Interested',
                    key: 'interested',
                    width: 150,
                    render: (user: IRegistrationUser) => {
                        return CheckIcon
                    }
                },
                {
                    title: 'Paid',
                    children: [
                        {
                            title: 'Microdegree',
                            key: 'paidMicrodegree',
                            width: 150,
                            render: (user: IRegistrationUser) => {
                                if(user.progress.purchase && Object.keys(user.progress.purchase).length > 0) {
                                    return CheckIcon
                                }
                                return CloseIcon
                            },
                            filters: [
                                {
                                    text: 'Paid',
                                    value: 'true',
                                },
                                {
                                    text: 'Not Paid',
                                    value: 'false',
                                }
                            ],
                            onFilter: (value: string, user: IRegistrationUser) => {
                                if(user.progress.purchase && Object.keys(user.progress.purchase).length > 0) {
                                    return 'true' === value
                                }
                                return 'false' === value
                            }
                        },
                        {
                            title: 'Bootcamp',
                            key: 'paidBootcamp',
                            width: 150,
                            render: (user: IRegistrationUser) => {
                                if(user.progress.bootcampPurchase && Object.keys(user.progress.bootcampPurchase).length > 0) {
                                    return CheckIcon
                                }
                                return CloseIcon
                            },
                            filters: [
                                {
                                    text: 'Paid',
                                    value: 'true',
                                },
                                {
                                    text: 'Not Paid',
                                    value: 'false',
                                }
                            ],
                            onFilter: (value: string, user: IRegistrationUser) => {
                                if(user.progress.bootcampPurchase && Object.keys(user.progress.bootcampPurchase).length > 0) {
                                    return 'true' === value
                                }
                                return 'false' === value
                            }
                        },
                    ]
                }
            ]
        },
    ];

    const radioChange = (e: any, type: any) => {
        setConstraints({...constraints, [type]: parseInt(e.target.value)})
    }

    const exportData = () => {
        let startTime = dates && dates[0]?.unix();
        let endTime = dates && dates[1]?.unix();
        if( startTime && endTime ) {
            axios.post(G_API_URL+"admin/export/data", {
                ...constraints,
                startTime: startTime,
                endTime: endTime
            },{
                headers: {
                    Authorization: __getToken()
                }
            }).then(response => {
                response = response.data;
                if(response.status) {
                    if(response.data && response.data.length > 0) {
                        exportToXlsx(response.data, "registrations");
                        setModalVisible(false);
                    } else {
                        message.error("No data found!");
                    }
                } else {
                    message.error("Something Went Wrong!");
                }
            }).catch(err => console.log(err))
        } else {
            message.error("Start date and End date cannot be empty")
        }
    }

    return (
        <>
            <h2 className="h2-heading">Registrations</h2>
            <div className="f-d f-v-c f-h-sb">
                <div className="f-d f-v-c">
                    <RangePicker showTime onChange={updateTime}/>
                    <div className="default-purple-btn filled-purple go-btn" onClick={()=>fetchRegistrationData()}>Go</div>
                </div>
                <div className="default-purple-btn filled-purple"
                onClick={() => setModalVisible(true)}>
                    Export
                </div>
            </div>
            <div className="count-details">
                Total registrations <span className="strong-text">{data?.length}</span>
                <br/>
                Verified registrations <span className="strong-text">{data?.filter(user=>user.verified).length}</span>
            </div>
            <div className="">
                <Table 
                    dataSource={data} 
                    columns={columns} 
                    loading={loading} 
                    pagination={{ position: "bottom" }} 
                    scroll={{ x: true }}
                    bordered
                    size="middle"
                />
            </div>

            <Modal
                title="Export Data"
                className="export-modal"
                visible={isModalVisible}
                onOk={exportData}
                okText={"Export"}
                onCancel={() => setModalVisible(false)}
                destroyOnClose={true}
            >
                <h5 className="h5-heading">Verification</h5>
                <Radio.Group onChange={(e) => radioChange(e, "verification")} 
                value={constraints.verification}>
                    <Radio value={1}>Verified</Radio>
                    <Radio value={2}>Not Verified</Radio>
                    <Radio value={3}>None</Radio>
                </Radio.Group>
                <h4 className="h4-heading title">Subscription</h4>
                <h5 className="h5-heading sub-title">Microdegree</h5>
                <Radio.Group onChange={(e) => radioChange(e, "microdegreeSubscription")} 
                value={constraints.microdegreeSubscription}>
                    <Radio value={1}>Subscribed</Radio>
                    <Radio value={2}>Not Subscribed</Radio>
                    <Radio value={3}>None</Radio>
                </Radio.Group>
                <h5 className="h5-heading sub-title">Bootcamp</h5>
                <Radio.Group onChange={(e) => radioChange(e, "bootcampSubscription")} 
                value={constraints.bootcampSubscription}>
                    <Radio value={1}>Subscribed</Radio>
                    <Radio value={2}>Not Subscribed</Radio>
                    <Radio value={3}>None</Radio>
                </Radio.Group>
                <h4 className="h4-heading title">Payment</h4>
                <h5 className="h5-heading sub-title">Microdegree</h5>
                <Radio.Group onChange={(e) => radioChange(e, "microdegreePayment")} 
                value={constraints.microdegreePayment}>
                    <Radio value={1}>Paid</Radio>
                    <Radio value={2}>Not Paid</Radio>
                    <Radio value={3}>None</Radio>
                </Radio.Group>
                <h5 className="h5-heading sub-title">Bootcamp</h5>
                <Radio.Group onChange={(e) => radioChange(e, "bootcampPayment")} 
                value={constraints.bootcampPayment}>
                    <Radio value={1}>Paid</Radio>
                    <Radio value={2}>Not Paid</Radio>
                    <Radio value={3}>None</Radio>
                </Radio.Group>
                <h4 className="h4-heading title">Workshop Scheduled</h4>
                <h5 className="h5-heading sub-title">Microdegree</h5>
                <Radio.Group onChange={(e) => radioChange(e, "mdWorkshopScheduled")} 
                value={constraints.mdWorkshopScheduled}>
                    <Radio value={1}>Scheduled</Radio>
                    <Radio value={2}>Not Scheduled</Radio>
                    <Radio value={3}>None</Radio>
                </Radio.Group>
                <h5 className="h5-heading sub-title">Bootcamp</h5>
                <Radio.Group onChange={(e) => radioChange(e, "bcWorkshopScheduled")} 
                value={constraints.bcWorkshopScheduled}>
                    <Radio value={1}>Scheduled</Radio>
                    <Radio value={2}>Not Scheduled</Radio>
                    <Radio value={3}>None</Radio>
                </Radio.Group>
                <h4 className="h4-heading title">Workshop Attended</h4>
                <h5 className="h5-heading sub-title">Microdegree</h5>
                <Radio.Group onChange={(e) => radioChange(e, "mdWorkshopAttended")} 
                value={constraints.mdWorkshopAttended}>
                    <Radio value={1}>Attended</Radio>
                    <Radio value={2}>Not Attended</Radio>
                    <Radio value={3}>None</Radio>
                </Radio.Group>
                <h5 className="h5-heading sub-title">Bootcamp</h5>
                <Radio.Group onChange={(e) => radioChange(e, "bcWorkshopAttended")} 
                value={constraints.bcWorkshopAttended}>
                    <Radio value={1}>Attended</Radio>
                    <Radio value={2}>Not Attended</Radio>
                    <Radio value={3}>None</Radio>
                </Radio.Group>
            </Modal>
            
            <style jsx>
                {`
                    .go-btn {
                        margin-left: var(--peaky-gap-16);
                    }

                    .count-details {
                        margin: var(--peaky-gap-16) 0;
                    }

                    .export-modal .title {
                        margin: var(--peaky-gap-24) 0 var(--peaky-gap-8);
                    }

                    .export-modal .sub-title {
                        margin: var(--peaky-gap-8) 0;
                    }

                    .export-modal .ant-modal-body {
                        max-height: 50vh;
                        overflow-y: auto;
                    }
                `}
            </style>
        </>
    );
}

export default Registrations;
