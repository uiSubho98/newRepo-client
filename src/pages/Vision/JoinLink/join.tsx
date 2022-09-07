import Axios from "axios";
// @ts-ignore
import JwtDecode from "jwt-decode";
import React, {useEffect, useState} from "react";
import {G_API_URL, G_HOME_URL, G_URL} from "../../../constants/constants";
import {check_login} from "../../../utils/login.util";
import {__getToken, __getUID} from "../../../utils/user-details.util";
import prograd_logo from "../../../assets/brand/prograd_box_logo.png";
import {message} from "antd";
import Countdown from "react-countdown";

interface IState {
    status: string;
    name: string;
    count_down: number | null;
    hasPurchased: boolean;
    program: string;
    isLoggedIn: boolean;
}

const JoinLink = (props: any) => {
    const defaultState = {
        status: "Please Wait, Fetching Room Details",
        name: '',
        count_down: null,
        hasPurchased: true,
        program: "microdegree",
        isLoggedIn: false
    };

    const [ state, setState ] = useState<IState>(defaultState);
    const {type} = props;
    const {uid, slotid,slot_type} = props.match.params;
    useEffect(() => {
        const slot_id = slotid;
        const is_logged_in = check_login();
        setState(prev => ({
            ...prev,
            isLoggedIn: is_logged_in
        }))
        let data: any = {
            slot_id: slot_id,
            slot_type: slot_type === "freeclass" ? 1 : 2,
            uid: uid
        };


        if (type === "mentor") {
            if (is_logged_in) {
                let user_token = __getToken();
                let decoded_token = JwtDecode(user_token);
                let {userType} = decoded_token;
                let config = {
                    headers: {
                        Authorization: user_token,
                    },
                };
                if ((userType === 7 || userType === 8 || userType === 9)) {
                    Axios.post(G_API_URL + "slot/mentor/join/", data, config).then((res: any) => {
                        res = res.data.data;
                        if (res && res.status) {
                            let {status} = res;
                            if (status === 1) {
                                window.location.href = res.join_link;
                            }
                        } else {
                            setState(prev => ({
                                ...prev,
                                status: "Something went wrong, check slot id"
                            }));
                        }
                    });
                }
            } else {
                // if not logged in redirect to login
                window.location.href = G_HOME_URL + "login?rurl=/" + type + "/join/" + slot_id + "/";
            }
        }

        if (type === "student") {
            getStudentJoinLink(data)
        }
        // For Student Login
    }, [type, uid, slotid, slot_type]); // eslint-disable-line react-hooks/exhaustive-deps

    const getStudentJoinLink = (data: any) => {
        if(state.isLoggedIn) {
            data.student_uid = __getUID();
        }
        Axios.post(G_API_URL + "slot/student/join/", data).then((res) => {
            if (res.data.status === 0) {
                let msg = res.data.msg;

                if (msg === "The session is yet to start. Please wait for the mentor to begin.") {
                    if (res.data.count_down <= Math.round(new Date().getTime())) {
                        setInterval(() => {
                            window.location.reload();
                        }, 4000);
                    }
                }
                setState(prev => ({
                    ...prev,
                    status: msg, 
                    count_down: res.data.count_down
                }));
            }

            if (res.data.status === 1) {
                window.location.href = res.data.join_link;
            }

            if(res.data.status === 2) {
                setState(prev => ({
                    ...prev,
                    status: res.data.msg,
                    hasPurchased: false,
                    program: res.data.program
                }))
            }
        });
    }


    const onSubmit = (e: any) => {
        e.preventDefault();
        const {name} = state;
        if (name === '') {
            message.error('Please Enter your name to join.');
        } else {
            const {match} = props;
            let data = {
                slot_id: match.params.slotid,
                slot_type: match.params.slot_type === "freeclass" ? 1 : 2,
                uid: match.params.uid,
                name: name
            };
            getStudentJoinLink(data);
        }
    }

    const onChange = (e: any) => {
        setState(prev => ({
            ...prev,
            name: e.value
        }))
    }

    const handleClick = () => {
        window.location.href = G_URL + "payment/" + state.program;
    }

    const renderer = ({days, hours, minutes, seconds, completed}: any) => {
        const {status} = state;
        if (completed) {
            // Render a complete state
            return <span>{status}</span>;

        } else {
            // Render a countdown
            return (
                <span className="f-d counter-down">
                    Session starting in {days} Days {hours} Hrs {minutes} mins {seconds} sec
                </span>
            );
        }
    };

    const {status, count_down, hasPurchased} = state;
    const {match} = props;
    return (
        <>
            <div className="f-d f-v-c f-h-c f-vt join-div">
                <div className='bg-image f-v-c' style={{
                    backgroundImage: "url(" + prograd_logo + ")"
                }}/>
                {count_down !== null && count_down > Math.round(new Date().getTime()) ?
                    <Countdown date={count_down} renderer={renderer}/>
                    :

                    match.params.uid !== undefined && match.params.uid.includes('$@m') && status === 'fail' ?
                        <div className='form'>
                            <form onSubmit={onSubmit} onChange={(e) => onChange(e.target)} className='f-d f-vt-m'>
                                <input type='text' placeholder='Enter your Name'/>
                                <button type='submit' className='default-blue-btn btn-small'>Join Session</button>
                            </form>
                        </div>
                        : status}

                {
                    !hasPurchased &&
                    <button className="default-pink-btn filled-pink 
                    c-pointer payment-button" onClick={() => handleClick()}>
                        Proceed with Payment
                    </button>
                }
            </div>
            <style jsx>
                {`
                    .join-div .bg-image{
                        width: 100px;
                        height: 100px;
                        margin-bottom: 2rem;
                    }

                    .join-div .form{
                        display: inline-flex;
                    }

                    .join-div .form input{
                        background-color: #383838;
                        border: none;
                        margin-right: 1rem;
                        padding: 0.5rem;
                    }

                    .join-div .form input:hover, 
                    .join-div .form input:focus {
                        outline: 2px solid var(--primary);
                    }

                    .join-div .payment-button {
                        margin: var(--peaky-gap-24) 0 0;
                    }
                
                    @media only screen and (max-device-width: 760px) {
                    .join-div .form button{
                        margin-top: 1rem;
                        width: 100%;
                    }
                    .join-div .form input{
                        margin-right: unset;
                        }
                    }
                `}
            </style>

        </>
    );
}

export default JoinLink;
