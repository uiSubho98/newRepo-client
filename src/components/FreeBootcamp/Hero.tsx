import React, { useEffect, useState } from "react";
import { Button } from "antd";
import moment from "moment";
import axios, { AxiosResponse } from "axios";
import { G_API_URL, G_URL } from "../../constants/constants";
import { check_login, login_user } from "../../utils/login.util";
import { __getToken, __getSubscriptions } from "../../utils/user-details.util";

interface IParams {
    program?: string;
    programType?: string;
    batch?: number;
    batchId?: string;
    enrollmentTime?: number;
}

interface IHero {
    type?: string;
    title?: string;
    description?: string;
    lastDate?: number;
    imageSrc?: string;
}

interface IProps {
    data?: IHero;
    batchId?: string;
}

const Hero = (props: IProps) => {
    const { data } = props;

    const [ isLoading, setLoading ] = useState<boolean>(false);
    const [ hasSubscribed, setSubscription ] = useState<boolean>(false);

    useEffect(() => {
        let subscription = __getSubscriptions();
        if(subscription && subscription.bootcamp) {
            setSubscription(true);
        }
    },[])

    const handleClick = () => {
        const is_logged_in = check_login();
        if(!is_logged_in) {
            window.location.href = G_URL + "register/bootcamp/?rurl=" + 
            "free/bootcamp/&type=free";
        } else if(data) {

            if(!hasSubscribed) {
            
                const headers = {
                    headers: {
                        Authorization: __getToken()
                    }
                }

                let params:IParams = {
                    program: data.title,
                    programType: data.type,
                    batch: data.lastDate,
                    batchId:"b1",
                    enrollmentTime: Math.round(Date.now() / 1000)
                }

                setLoading(true);
                axios.post(G_API_URL+"program/enroll", params, headers)
                .then((response: AxiosResponse) => {
                    const resp = response.data;
                    if(resp.status) {
                        // Update the token
                        login_user({token: resp.token})
                        window.location.href = G_URL + 
                        "learning-dashboard/bootcamp";
                    }
                    setLoading(false);
                }).catch((error) => {
                    console.log(error);
                })
            } else {
                window.location.href = G_URL + "learning-dashboard/bootcamp";
            }
        }
    }

    let action = "Start For Free";

    if(hasSubscribed) {
        action = "Go To Dashboard"
    }

    let nextBatch = data && data.lastDate ? (data.lastDate * 1000) : 
    new Date().getTime();
    let date = moment(new Date(nextBatch)).format("DD MMM YYYY");
    date = date.split(" ").map((value,key) => {
        if(key === 0) {
            value += "th";
        }
        return value;
    }).join(" ");

    return (
        <>
            <div className="g-d g-col-2 g-col-1-m hero-content-wrapper 
            lr-pad-d lr-pad-m">
                <div className="left-pane tb-pad-d tb-pad-m">
                    <span className="body-big">
                        { data && data.type }
                    </span>
                    <h1 className="h1-heading title">
                        { data && data.title }
                    </h1>
                    <span className="f-d body-regular description">
                        { data && data.description }
                    </span>
                    <span className="f-d body-regular">
                        { data && ("Application closes on " +date) }
                    </span>
                    <Button loading= {isLoading}
                    className="default-purple-btn filled-purple 
                    enroll-btn" onClick={ () => handleClick() }>
                        { action }
                    </Button>
                </div>
                <div className="right-pane bg-image"
                style={{ backgroundImage:"url(" + (data && data.imageSrc) +
                ")"}}>

                </div>
            </div>
            <style jsx>{`
                .hero-content-wrapper  {
                    padding-right:0;
                }

                .hero-content-wrapper .title {
                    white-space: pre-wrap;
                }

                .hero-content-wrapper .description {
                    margin: 0 0 var(--peaky-gap-128);
                }

                .hero-content-wrapper .enroll-btn {
                    margin: var(--peaky-gap-16) 0 0;
                    padding-left: 2rem;
                    padding-right: 2rem;
                    font-size: 16px;
                }

                @media only screen and (max-device-width: 760px) {
                    .hero-content-wrapper .description {
                        margin-bottom: var(--peaky-gap-32);
                    }
                }

                @media screen and (min-width: 768px) and (max-width: 1023px) 
                and (orientation: portrait) {
                    .hero-content-wrapper {
                        grid-template-columns: 2fr 1fr;
                    }
                }
            `}</style>
        </>
    )
}

export default Hero;