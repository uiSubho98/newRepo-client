import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Modal, Table } from 'antd';
import axios, { AxiosResponse } from "axios";
import { __getToken } from '../../../utils/user-details.util';
import { G_API_URL } from '../../../constants/constants';
import moment, { Moment } from 'moment';
import {ICoupon} from './coupon';
import AddCouponForm from './AddCouponForm';
import EditCouponForm from './EditCouponForm';

interface BootcampCouponsProps {
    
}

const BootCampCoupons = (props: BootcampCouponsProps) => {
    const [coupons, setCoupons] = useState<Array<ICoupon>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [addModalVisibility, setAddModalVisibility] = useState<boolean>(false);
    const [editModalVisibility, setEditModalVisibility] = useState<boolean>(false);
    const [activeCoupon, setActiveCoupon] = useState<Number>();

    // Fetch coupons for bootcamp
    useEffect(()=> {
        axios.get(G_API_URL + "admin/coupon/bootcamp", {
            headers: {
                Authorization: __getToken()
            }
        }).then((response: AxiosResponse) => {
            if(response.data.status === 1) {
                var rawCoupons = [...response.data.data];
                rawCoupons.forEach((c, i)=>{
                    rawCoupons[i].start_date = moment(c.start_date * 1000)
                    rawCoupons[i].expiry_date = moment(c.expiry_date * 1000)
                })
                setCoupons(rawCoupons);
                setLoading(false)
            }
        })
    },[]);

    const editCoupon = (coupon: ICoupon) => {
        setActiveCoupon(coupon.coupon_id)
        setEditModalVisibility(true)
    }

    const columns = [
        {
            title: 'Coupon ID',
            dataIndex: 'coupon_id',
            key: 'counponId',
        },
        {
            title: 'Coupon Code',
            dataIndex: 'coupon_code',
            key: 'couponCode'
        },
        {
            title: 'Discount',
            dataIndex: 'discount',
            key: 'discount'
        },
        {
            title: 'Times Used',
            dataIndex: 'times_used',
            key: 'times_used'
        },
        {
            title: 'Reuse Limit',
            dataIndex: 'reuse_limit',
            key: 'reuse_limit'
        },
        {
            title: 'Start Date',
            dataIndex: 'start_date',
            key: 'start_date',
            render: (ts: Moment) => {
                return ts.toLocaleString()
            }
        },
        {
            title: 'Expiry Date',
            dataIndex: 'expiry_date',
            key: 'expiry_date',
            render: (ts: Moment) => {
                return ts.toLocaleString()
            }
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (coupon: ICoupon) => {
                return (
                    <div className="f-d">
                        <div className="c-pointer" onClick={()=>{editCoupon(coupon)}}>Edit</div>
                    </div>
                )
            }
        }
    ];

    var activeCouponDetails = coupons.filter(coupon => coupon.coupon_id === activeCoupon)[0];

    return (
        <>
            <div className="bootcamp-coupons-container">
                <h2 className="h2-heading">Bootcamp Coupons</h2>
                <div className="options f-d f-h-e">
                    <div className="default-purple-btn filled-purple" onClick={()=>{setAddModalVisibility(true)}}>Add Coupon</div>
                </div>
                <Table 
                    dataSource={coupons} 
                    columns={columns} 
                    loading={loading} 
                    pagination={{ position: "bottom" }} 
                    scroll={{ x: true }}
                />
            </div>

            {/* Add coupon modal and form */}
            <Modal
                title="Add Coupon"
                destroyOnClose={true}
                footer={null}
                visible={addModalVisibility}
                onCancel={() => setAddModalVisibility(false)}
            >
                <AddCouponForm coupons={coupons}/>
            </Modal>
            
            {/* Edit coupon modal & form */}
            <Modal
                title="Edit Coupon"
                destroyOnClose={true}
                footer={null}
                visible={editModalVisibility}
                onCancel={() => setEditModalVisibility(false)}
            >
                <EditCouponForm activeCouponDetails={activeCouponDetails}/>
            </Modal>
            <style jsx>
                {`
                    .bootcamp-coupons-container .options {
                        margin-bottom: var(--peaky-gap-16);
                    }
                `}
            </style>
        </>
    );
}

export default BootCampCoupons;
