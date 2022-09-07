import axios, { AxiosRequestConfig } from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Schedule from "../../components/Onboard/Schedule";
import keys from "../../config/keys";
import { G_API_URL } from "../../constants/constants";
import { __getCookie } from "../../utils/cookie.util";
//@ts-ignore
import { useHistory } from "react-router-dom";
import Spinner from "../../components/Spinner/spinner";
import { check_login } from "../../utils/login.util";

interface IState {
    isWorkshopScheduled: boolean;
    mode: string;
    slug: string;
}

const Booking = (props: any) => {

    const defaultState = {
        isWorkshopScheduled: false,
        mode: "",
        slug: ""
    }

    const [state, setState] = useState<IState>(defaultState);
    const [isLoading, setLoading] = useState<boolean>(false);
    const {slug: program} = props.match.params;
    const history = useHistory();


    useEffect(() => {
        if(!check_login()) {
            history.push("/login?rurl=vision/booking/microdegree")
        }
    }, [history]);

    useEffect(() => {
        const config: AxiosRequestConfig = {
            params: {
                programType: "microdegree"
            }, 
            headers: {
                "Authorization": __getCookie(keys.cookiePrefix + "ut").cookieValue
            }
        };

        const getVisionDetails = () => {
            setLoading(true);
            axios.get(G_API_URL + "vision/details", config)
            .then(response => {
                response = response.data;
                if(response.status === 1) {
                    if (!response.data) {
                        setState(prev => ({ ...prev, mode: "booking", slug: program }))
                    } else if (response.data === 'redr') {
                        setState(prev => ({ ...prev, isWorkshopScheduled: true}))
                    } else if (response.data === 'resc') {
                        setState(prev => ({ ...prev, mode: "reschedule", slug: program }))
                    }
                }
                setLoading(false);
            }).catch(err => {
                console.log(err);
            });
        }

        getVisionDetails();
    }, [program]);

    const handleClick = () => {
        history.push({
            pathname: "/learning-dashboard/microdegree/"
        });
    }

    const { isWorkshopScheduled, mode } = state;

    return (
        <>
            {
            !isLoading ?
            <Layout redirectDisable={true}>
                <div className="g-d g-h-c g-v-s booking-page-wrapper">
                    <Schedule 
                        mode = {mode}
                        isWorkshopScheduled = {isWorkshopScheduled}
                        updateStep = {handleClick}
                    />
                </div>
                <style jsx>{`
                    .booking-page-wrapper {
                        height: 100vh;
                    }

                    .booking-page-wrapper .schedule-container {
                        margin: var(--peaky-gap-64) 0 0;
                    }
                `}</style>
            </Layout> :
            <Spinner />
            }
        </>
    )
}

export default Booking;