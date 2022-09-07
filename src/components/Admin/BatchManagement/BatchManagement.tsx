import { Icon, Modal, Table } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { Moment } from 'moment-timezone';
import React, { useEffect, useState } from 'react';
import { G_API_URL } from '../../../constants/constants';
import { openNotification } from '../../../utils/common.util';
import { __getToken } from '../../../utils/user-details.util';
// import { ICoupon } from '../BootcampCoupons/coupon';
import AddBatchForm from './AddBatchForm';
import EditBatchForm from './EditBatchForm';

interface IBatch {
    batchId: number;
    batchName: string;
    group_id: number;
    startDate: Moment;
    endDate: Moment;
}

interface IState {
    isDeleteModalVisible: boolean;
    batches: Array<IBatch>;
    activeBatch?: IBatch;
    type: number;
    isEditModalVisible: boolean;
    isAddModalVisible: boolean;
    isLoading: boolean;
}

const BatchManagement = () => {

    const defaultState = {
        batches: [],
        activeBatch: undefined,
        type: 1,
        isAddModalVisible: false,
        isEditModalVisible: false,
        isDeleteModalVisible: false,
        isLoading: false
    }

    const [state, setState] = useState<IState>(defaultState);

    const columns = [
        {
            title: 'Batch ID',
            dataIndex: 'batchId',
            key: 'batchId',
        },
        {
            title: 'Batch Name',
            dataIndex: 'batchName',
            key: 'batchName',
        },
        {
            title: 'Group Id',
            dataIndex: 'group_id',
            key: 'groupId'
        },
        {
            title: 'Start Date',
            dataIndex: 'startDate',
            key: 'startDate',
            render: (ts: Moment) => {
                return ts.toLocaleString()
            }
        },
        {
            title: 'End Date',
            dataIndex: 'endDate',
            key: 'endDate',
            render: (ts: Moment) => {
                return ts.toLocaleString()
            }
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (batch: any) => {
                return (
                    <div className="f-d">
                        <div className="c-pointer" onClick={()=>{editBatch(batch)}}>Edit</div>
                        &nbsp;&nbsp;&nbsp;
                        <div className="c-pointer" onClick={()=>{setDeleteModalVisibility(true, batch)}}>Delete</div>
                    </div>
                )
            }
        }
    ];

    useEffect(() => {
        getBatches(1);
    }, []);

    const getBatches = (type: number) => {
        setState(prev => ({
            ...prev,
            isLoading: true
        }));
        axios.get(G_API_URL + "admin/batches", {
            params: {
                type: type
            },
            headers: {
                authorization: __getToken()
            }
        }).then((response) => {
            response = response.data;
            if(response.status === 1) {
                let batchList = response.data;
                batchList = batchList.map((batch: any)=>{
                    batch.startDate = moment(batch.startDate * 1000)
                    batch.endDate = moment(batch.endDate * 1000)
                    return batch;
                });
                setState(prev => ({
                    ...prev,
                    isLoading: false,
                    batches: batchList
                }));
            }
        }).catch((error) => {
            console.error(error);
        })
    }

    const editBatch = (batch: any) => {
        setState(prev => ({
            ...prev,
            activeBatch: batch,
            isEditModalVisible: true
        }));
    }

    const deleteBatch = () => {
        const { activeBatch } = state;
        axios.post(G_API_URL + "admin/batches/delete", {
            batchId: activeBatch?.batchId,
            groupId: activeBatch?.group_id
        },{
            headers: {
                Authorization: __getToken()
            }
        }).then((response: any) => {
            response = response.data;
            if(response.status === 1) {
                openNotification('success', response.message, 6);
                setState(prev => ({
                    ...prev,
                    isDeleteModalVisible: false
                }));
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            } else {
                openNotification('fail', "Something went wrong!", 6);
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    const setAddModalVisibility = (value: boolean) => {
        setState(prev => ({
            ...prev,
            isAddModalVisible: value
        }));
    }

    const setEditModalVisibility = (value: boolean) => {
        setState(prev => ({
            ...prev,
            isEditModalVisible: value
        }));
    }

    const setDeleteModalVisibility = (value: boolean, batch?: IBatch) => {
        setState(prev => ({
            ...prev,
            isDeleteModalVisible: value,
            activeBatch: batch
        }));
    }

    const toggleFilter = () => {
        let programType = state.type === 1 ? 2 : 1;
        setState(prev => ({
            ...prev,
            type: programType
        }));
        getBatches(programType);
    }

    return (
        <>
            <div className="batch-management-wrapper">
                <h2 className="h2-heading">Batch Management</h2>
                <div className="options f-d f-h-e">
                    <div className="default-purple-btn filled-purple
                    filter-btn" onClick={()=>{toggleFilter()}}>
                        <Icon 
                            type="filter" 
                            theme="filled"
                            className="filter-icon"
                        >
                        </Icon>
                        { state.type === 1 ? "Microdegree" : "Bootcamp" }
                    </div>
                    <div className="default-purple-btn filled-purple" 
                    onClick={()=>{setAddModalVisibility(true)}}>
                        Add Batch
                    </div>
                </div>
                <Table 
                    dataSource={state.batches} 
                    columns={columns} 
                    loading={state.isLoading} 
                    pagination={{ position: "bottom" }} 
                    scroll={{ x: true }}
                />
            </div>
            {/* Add Batch Modal */}
            <Modal
                title="Add Batch"
                destroyOnClose={true}
                footer={null}
                visible={state.isAddModalVisible}
                onCancel={() => setAddModalVisibility(false)}
            >
                { 
                    <AddBatchForm 
                        batches = {state.batches} 
                        programType={state.type}
                    /> 
                }
            </Modal>

            {/* Edit Batch Modal */}
            <Modal
                title="Edit Batch"
                destroyOnClose={true}
                footer={null}
                visible={state.isEditModalVisible}
                onCancel={() => setEditModalVisibility(false)}
            >
                {
                    <EditBatchForm batchDetails = {state.activeBatch}/>
                }
            </Modal>

            {/* Delete Batch Modal */}
            <Modal
                title="Are you sure, Do you want to delete batch ?"
                destroyOnClose={true}
                // footer={null}
                visible={state.isDeleteModalVisible}
                okText={"Delete"}
                onOk={() => deleteBatch()}
                onCancel={() => setDeleteModalVisibility(false)}
            >
                <span className="body-regular">The following batch and 
                associated group will get deleted.</span>
                <div className="g-d batch-info w-60">
                    <div className="g-d g-col-2">
                        <span>Batch ID</span> 
                        <span>
                            { state?.activeBatch?.batchId }
                        </span>
                    </div>
                    <div className="g-d g-col-2">
                        <span>Batch Name</span>
                        <span>
                            { state?.activeBatch?.batchName }
                        </span>
                    </div>
                    <div className="g-d g-col-2">
                        <span>Group ID</span> 
                        <span>
                            { state?.activeBatch?.group_id }
                        </span> 
                    </div>
                </div>
            </Modal>
            <style jsx> {`
                .batch-management-wrapper .options {
                    margin-bottom: var(--peaky-gap-16);
                }

                .batch-management-wrapper .filter-btn
                .filter-icon {
                    margin: 0 var(--peaky-gap-4) 0 0;
                }

                .batch-management-wrapper .filter-btn {
                    margin: 0 var(--peaky-gap-24) 0 0;
                }

                .batch-info {
                    border: 2px solid var(--purple);
                    border-radius: var(--peaky-br-4);
                    grid-gap: var(--peaky-gap-8) 0;
                    padding: var(--peaky-gap-16);
                    margin: var(--peaky-gap-32) auto;
                }
            `}</style>
        </>
    )
}

export default BatchManagement;