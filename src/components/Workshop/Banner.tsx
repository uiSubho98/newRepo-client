import React, { useState } from "react";
import { Spin, message } from "antd";
import { G_API_URL, G_URL } from "../../constants/constants";
import { check_login } from "../../utils/login.util";
import { __getToken } from "../../utils/user-details.util";
import { LoadingOutlined } from '@ant-design/icons';
import axios from "axios";

const Banner = () => {

    const [ value, setValue ] = useState<string>("");
    const [isLoading, setLoading] = useState<boolean>(false);
    const antIcon = <LoadingOutlined 
    style={{ fontSize: 24, color: "var(--purple)" }} 
    spin />;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = event.target.value;
        setValue(newValue);
    }

    const handleSubmit = () => {
        const is_logged_in = check_login();
        const headers = {
            headers: {
                Authorization: __getToken()
            }
        }
        const data = {};
        if(!is_logged_in) {
            window.location.href = G_URL + "register/microdegree?rurl=workshop" ;
        } else {
            if(value !== "") {
                setLoading(true);
                axios.post(G_API_URL+"tracker/subscribe/newsletter/",data,headers)
                .then(response => {
                    response = response.data;
                    if(response.status) {
                        setValue("");
                        message.success("Successfully subscribed to newsletters");
                    } else {
                        message.error("Something went wrong, please try again!");
                    }
                    setLoading(false);
                }).catch(err => console.log(err));
            } else {
                message.warn("Please enter a valid email!");
            }
        }
    }

    return (
        <>
            <div className="banner-wrapper lr-pad-d lr-pad-m
            tb-pad-d tb-pad-m">
                <h2 className="h2-heading title">
                    Stay tuned for more such workshops.
                </h2>

                <div className="action-block">
                    <span className="body-regular">
                        Sign up for our newsletter
                    </span>
                    <div className="f-d action-elements">
                        <input 
                            className="input-element" 
                            placeholder="Email Address"
                            value = {value} 
                            onChange={(event) => handleChange(event)}
                        />
                        <button className="submit-btn c-pointer"
                        onClick={ () => handleSubmit() }>
                            { 
                                !isLoading? "Submit" : 
                                <Spin indicator={antIcon}  /> 
                            }
                        </button>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .banner-wrapper {
                    background-color: var(--purple);
                }
                
                .banner-wrapper .title,
                .banner-wrapper .action-block .body-regular {
                    color: var(--dove);
                }

                .banner-wrapper .action-block {
                    margin: var(--peaky-gap-32) 0 0;
                }

                .banner-wrapper .action-block .submit-btn,
                .banner-wrapper .action-block .input-element {
                    background-color: var(--dove);
                    border: none;
                    outline: none;
                    height: 48px;
                    padding: 0 var(--peaky-pad-16);
                }

                .banner-wrapper .action-block .input-element {
                    width: 300px;
                }

                .banner-wrapper .action-block .submit-btn {
                    width: 8%;
                    text-transform: uppercase;
                    font-size: 16px;
                    color: var(--purple);
                }

                .banner-wrapper .action-block .action-elements {
                    margin: var(--peaky-gap-16) 0 0;
                }

                @media only screen and (max-device-width: 760px) {
                    .banner-wrapper .action-block .input-element {
                        width: 100%;
                    }

                    .banner-wrapper .action-block .submit-btn {
                        width: 40%;
                    }
                }

                @media screen and (min-width: 768px) and 
                (max-width: 1023px) and (orientation: portrait) {
                    .banner-wrapper .action-block .submit-btn {
                        width: unset;
                    }
                }
            `}</style>
        </>
    )
}

export default Banner;