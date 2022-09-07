import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import moment from 'moment';
// @ts-ignore
import {Link} from "react-router-dom";
import { __getSubscriptions } from '../../utils/user-details.util';
import { G_URL } from '../../constants/constants';
import { check_login } from '../../utils/login.util';

interface IProps {
    lastDate: number;
    type: number;
    action?: string;
    handleClick?: Function;
}

const ActionBlock = (props: IProps) => {
    const { lastDate, type } = props;
    const [ hasSubscribed, setSubscription ] = useState<boolean>(false);

    useEffect(() => {
        let subscription = __getSubscriptions();
        if(subscription && subscription.bootcamp) {
            setSubscription(true);
        }
    },[])
    let nextBatch = lastDate ? (lastDate * 1000) : 
    new Date().getTime();
    let date = moment(new Date(nextBatch)).format("DD MMM YYYY");
    date = date.split(" ").map((value,key) => {
        if(key === 0) {
            if([1,21,31].includes(parseInt(value))) {
                value += "st";
            } else if([2,22].includes(parseInt(value))) {
                value += "nd";
            } else if([3,23].includes(parseInt(value))) {
                value += "rd";
            } else {
                value += "th";
            }
        }
        return value;
    }).join(" ");

    const handleClick = () => {
        const is_logged_in = check_login();
        if(!is_logged_in || !hasSubscribed) {
            window.location.href = G_URL + "register/bootcamp?rurl=bootcamp";
        } else {
            window.location.href = G_URL + "learning-dashboard/bootcamp";
        }
    }

    let action = "Start For Free";

    if(hasSubscribed) {
        action = "Go To Dashboard"
    }
    
    return (
        <>
            {
            type === 1 ?
            <div className="action-block">
                <span className="f-d body-regular">
                    { "Application closes on " + date }
                </span>
                <Link to="/register/microdegree?rurl=/learning-dashboard/microdegree"><div className="book-seat-btn default-purple-btn filled-purple">Start for free</div></Link>
            </div>: 
            <div className="action-block">
                <span className="f-d body-regular">
                    { "Application closes on " +date }
                </span>
                <Button loading= {false}
                className="default-purple-btn filled-purple 
                enroll-btn" onClick={ () => handleClick() }>
                    { action }
                </Button>
            </div>
            }
            <style jsx>{`
                .action-block .book-seat-btn,
                .action-block .enroll-btn{
                    margin: var(--peaky-gap-16) 0 0;
                }

                .action-block .enroll-btn {
                    margin: var(--peaky-gap-16) 0 0;
                    padding-left: 2rem;
                    padding-right: 2rem;
                    font-size: 16px;
                }
            `}</style>
        </>
    )
}

export default ActionBlock;