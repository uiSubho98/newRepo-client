import React, {Component} from 'react';
import {G_API_URL, G_HOME_URL} from '../../constants/constants';
import {check_login} from '../../utils/login.util';
import {__getToken} from '../../utils/user-details.util';
import axios from 'axios';
import moment from 'moment';
import {Table, DatePicker, Modal, Select} from 'antd';
import Spinner from "../../components/Spinner/spinner";

const {RangePicker} = DatePicker;
const {Option} = Select;

class Poseidon extends Component {
    constructor(props) {
        super(props);
        const is_logged_in = check_login();
        if (!is_logged_in) {
            window.location.href = G_HOME_URL + 'login';
        }

        this.state = {
            is_logged_in: is_logged_in,
            isLoading: true,
            sd: moment().startOf('month').unix(),
            ed: moment().unix(),
            data: [],
            isDataLoading: true,
            availableFilters: {
                utmSource: [],
                utmMedium: [],
                utmCampaign: [],
                utmContent: []
            },
            filters: {
                utmSource: [],
                utmMedium: [],
                utmCampaign: [],
                utmContent: []
            },
            updateFilters: true,
            showFiltersModal: false,
            total: {
                signup: 0,
                registrations: 0,
                present: 0,
                absent: 0,
                subscribers: 0,
                total_subscribers: 0,
                reg: 0,
            }
        }
    }

    componentDidMount = () => {
        this.fetchData();
    }

    fetchData = () => {
        const {showFiltersModal, updateFilters, filters, sd, ed} = this.state;
        // Close filters modal if it is active
        if (showFiltersModal) {
            this.setState({isDataLoading: true, showFiltersModal: false})
        }

        // Make Call to fetch poseidon data
        axios
            .get(G_API_URL + "auth/cohort-data-dashboard/", {
                params: {
                    f_mode: updateFilters ? 'all' : 'filter',
                    sd: sd,
                    ed: ed,
                    utmSource: filters.utmSource,
                    utmMedium: filters.utmMedium,
                    utmCampaign: filters.utmCampaign,
                    utmContent: filters.utmContent
                },
                headers: {
                    'Authorization': __getToken()
                }
            })
            .then(response => {
                if (response.data.status === 1) {
                    let {data, total, filters, uids} = response.data;

                    if (Object.keys(filters).length > 0)
                        this.setState({
                            availableFilters: filters
                        })

                    this.setState({
                        data: data,
                        total: total,
                        isLoading: false,
                        isDataLoading: false,
                        uids: uids,
                        initial_uids: uids
                    })

                } else if (response.data.status === 2) {
                    window.location.href = G_HOME_URL + 'forbidden-access'
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    parseData = () => {
        return [
            {
                date: `Total`,
                signup: this.state.total.signup,
                registrations: this.state.total.registrations,
                present: this.state.total.present,
                absent: this.state.total.absent,
                subscribers: this.state.total.subscribers,
                total_subscribers: this.state.total.total_subscribers,
                reg: this.state.total.reg,
                key: 'total'
            }
        ].concat(this.state.data.map((row, index) => {
            let d = {
                date: `${moment((this.state.sd+(index*86400)) * 1000).format('D MMM')}`,
                signup: row.signup,
                registrations: row.registrations,
                present: row.present,
                absent: row.absent,
                subscribers: row.subscribers,
                total_subscribers: row.total_subscribers,
                reg: row.reg,
                key: index
            }
            for (let i = 0; i <= 20; i++) {
                d[`wr-${i}`] = row.data[i][0]
                d[`wp-${i}`] = row.data[i][1]
                d[`fer-${i}`] = row.data[i][2]
                d[`p-${i}`] = row.data[i][3]
            }
            return d;
        }))
    }

    onDateRangeChange = (date) => {
        this.setState({
            sd: date[0].startOf('day').unix(),
            ed: date[1].endOf('day').unix(),
            isDataLoading: true,
        }, () => {
            this.fetchData();
        })
    }

    setFiltersModal = (val) => {
        this.setState({
            showFiltersModal: val
        })
    }

    handleFilterChange = (value, type) => {
        this.setState({updateFilters: value.length === 0});
        // Make Call to fetch poseidon data
        let {filters, uids, initial_uids} = this.state;
        switch (type) {
            case 'source':
                this.setState({filters: {...filters, utmSource: value}});
                if (value[0] === undefined)
                    filters.utmSource = []
                else
                    filters.utmSource.push(value[0])
                break;
            case 'medium':
                this.setState({filters: {...filters, utmMedium: value}});
                if (value[0] === undefined)
                    filters.utmMedium = []
                else
                    filters.utmMedium.push(value[0])
                break;
            case 'campaign':
                this.setState({filters: {...filters, utmCampaign: value}});
                filters.utmCampaign.push(value[0])
                if (value[0] === undefined)
                    filters.utmCampaign = []
                else
                    filters.utmCampaign.push(value[0])
                break;
            case 'content':
                this.setState({filters: {...filters, utmContent: value}});
                filters.utmContent.push(value[0])
                if (value[0] === undefined)
                    filters.utmContent = []
                else
                    filters.utmContent.push(value[0])
                break;
            default:
                break;
        }
        if (value[0] === undefined)
            uids = initial_uids
        axios
            .get(G_API_URL + "auth/utm/filters", {
                params: {
                    utmSource: filters.utmSource,
                    utmMedium: filters.utmMedium,
                    utmCampaign: filters.utmCampaign,
                    utmContent: filters.utmContent,
                    uids: uids
                },
                headers: {
                    'Authorization': __getToken()
                }
            })
            .then(response => {
                    if (response.data) {
                        let utmParams = response.data;
                        this.setState({
                            availableFilters: {
                                utmSource: [...new Set(utmParams.map(p => p.utmData.source).filter(x => x !== undefined))],
                                utmMedium: [...new Set(utmParams.map(p => p.utmData.medium).filter(x => x !== undefined))],
                                utmCampaign: [...new Set(utmParams.map(p => p.utmData.campaign).filter(x => x !== undefined))],
                                utmContent: [...new Set(utmParams.map(p => p.utmData.content).filter(x => x !== undefined))]
                            },
                            uids: utmParams.map(p => p.uid)
                        })
                    }
                }
            )
            .catch(err => {
                console.log(err);
            });

    }

    render() {
        const {isLoading, filters} = this.state;

        // Table headers
        var columns = [
            {
                title: 'Date',
                dataIndex: 'date',
                key: 'date',
                fixed: 'left',
                align: 'center',
                width: 85
            },
            {
                title: 'Sign Ups',
                dataIndex: 'signup',
                key: 'signup',
                fixed: 'left',
                align: 'center',
                width: 95
            },
            {
                title: 'Free Experience Registered',
                dataIndex: 'reg',
                key: 'reg',
                fixed: 'left',
                align: 'center',
                width: 130
            },
            {
                title: 'Free Class Registrations',
                dataIndex: 'registrations',
                key: 'registrations',
                fixed: 'left',
                align: 'center',
                width: 130
            },
            {
                title: 'Free Class Present',
                dataIndex: 'present',
                key: 'present',
                fixed: 'left',
                align: 'center',
                width: 110
            },
            {
                title: 'Free Class Absent',
                dataIndex: 'absent',
                key: 'absent',
                fixed: 'left',
                align: 'center',
                width: 110
            },
            {
                title: 'Total Paid',
                dataIndex: 'total_subscribers',
                key: 'total_subscribers',
                fixed: 'left',
                align: 'center',
                width: 70
            },
            {
                title: 'Paid',
                dataIndex: 'subscribers',
                key: 'subscribers',
                fixed: 'left',
                align: 'center',
                width: 70,
            }
        ];

        // Add day headers to table
        for (let i = 0; i <= 20; i++) {
            columns.push({
                title: 'Day ' + i,
                children: [
                    {
                        title: 'FER',
                        dataIndex: 'fer-' + i,
                        key: 'fer-' + i,
                        align: 'center',
                        className: `${i % 2 === 0 ? 'col-bg-1' : 'col-bg-2'}`,
                        width: 60
                    },
                    {
                        title: 'FCR',
                        dataIndex: 'wr-' + i,
                        key: 'wr-' + i,
                        align: 'center',
                        className: `${i % 2 === 0 ? 'col-bg-1' : 'col-bg-2'}`,
                        width: 60
                    },
                    {
                        title: 'FCP',
                        dataIndex: 'wp-' + i,
                        key: 'wp-' + i,
                        align: 'center',
                        className: `${i % 2 === 0 ? 'col-bg-1' : 'col-bg-2'}`,
                        width: 60
                    },
                    {
                        title: 'P',
                        dataIndex: 'p-' + i,
                        key: 'p-' + i,
                        align: 'center',
                        className: `${i % 2 === 0 ? 'col-bg-1' : 'col-bg-2'}`,
                        width: 60
                    },
                ]
            })
        }

        const {availableFilters} = this.state;
        return (
            <>
                {!isLoading ?
                    <div className='body-container'>
                        <div className="filters f-d f-h-e">
                            <div className="filters-btn c-pointer" onClick={() => {
                                this.setFiltersModal(true)
                            }}>Filters
                            </div>
                            <RangePicker
                                onChange={this.onDateRangeChange}
                                format='Do MMM YY'
                                defaultValue={[moment().startOf('month'), moment()]}
                                disabledDate={(curr) => curr.unix() > moment().unix()}
                                className="month-filter"
                            />
                        </div>
                        <Table
                            dataSource={this.parseData()}
                            columns={columns}
                            bordered
                            scroll={{x: '1300px', y: '400px'}}
                            pagination={false}
                            loading={this.state.isDataLoading}
                        />
                    </div>
                    :
                    <div className="spinner f-d f-v-c f-h-c">
                        <Spinner/>
                    </div>
                }
                <Modal
                    centered
                    destroyOnClose={true}
                    visible={this.state.showFiltersModal}
                    onCancel={() => this.setFiltersModal(false)}
                    onOk={this.fetchData}
                    title={'Filters'}
                    width={1000}
                >
                    <div className="filter g-d g-col-s-b-2">
                        <span className="f-d f-v-c">UTM Source</span>
                        <Select
                            mode="multiple"
                            size="large"
                            placeholder="Please select"
                            defaultValue={filters.utmSource}
                            onChange={(value) => this.handleFilterChange(value, 'source')}
                            style={{width: '100%'}}
                        >
                            {availableFilters.utmSource.filter(u => u !== "").map((u, k) => <Option key={k}>{u.replace(/%20/g, ' ')}</Option>)}
                        </Select>
                    </div>
                    <div className="filter g-d g-col-s-b-2">
                        <span className="f-d f-v-c">UTM Medium</span>
                        <Select
                            mode="multiple"
                            size="large"
                            defaultValue={filters.utmMedium}
                            placeholder="Please select"
                            onChange={(value) => this.handleFilterChange(value, 'medium')}
                            style={{width: '100%'}}
                        >
                            {availableFilters.utmMedium.filter(u => u !== "").map((u, k) => <Option key={k}>{u.replace(/%20/g, ' ')}</Option>)}
                        </Select>
                    </div>
                    <div className="filter g-d g-col-s-b-2">
                        <span className="f-d f-v-c">UTM Campaign</span>
                        <Select
                            mode="multiple"
                            size="large"
                            defaultValue={filters.utmCampaign}
                            placeholder="Please select"
                            onChange={(value) => this.handleFilterChange(value, 'campaign')}
                            style={{width: '100%'}}
                        >
                            {availableFilters.utmCampaign.filter(u => u !== "").map((u, k) => <Option key={k}>{u.replace(/%20/g, ' ')}</Option>)}
                        </Select>
                    </div>
                    <div className="filter g-d g-col-s-b-2">
                        <span className="f-d f-v-c">UTM Content</span>
                        <Select
                            mode="multiple"
                            size="large"
                            defaultValue={filters.utmContent}
                            placeholder="Please select"
                            onChange={(value) => this.handleFilterChange(value, 'content')}
                            style={{width: '100%'}}
                        >
                            {availableFilters.utmContent.filter(u => u !== "").map((u, k) => <Option key={k}>{u.replace(/%20/g, ' ')}</Option>)}
                        </Select>
                    </div>
                </Modal>

                <style jsx={"true"}>{`
                  .body-container {
                    padding-left: 2rem;
                    padding-right: 2rem;
                  }

                  .filters {
                    margin-bottom: var(--peaky-gap-16);
                  }

                  .filters-btn {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: linear-gradient(var(--primary), var(--primary-grad));
                    color: var(--dove);
                    padding: 0 10px;
                    border-radius: 5px;
                  }

                  .filter {
                    margin-bottom: var(--peaky-gap-16);
                  }

                  .month-filter {
                    margin-left: 8px;
                  }

                  .col-bg-1 {
                    background-color: var(--pekachu);
                  }

                  .col-bg-2 {
                    background-color: var(--bluelagoon2);
                  }
                `}</style>
            </>
        )
    }
}

export default Poseidon;
