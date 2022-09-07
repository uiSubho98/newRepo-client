import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Layout from "../../components/Layout";
import { IProfile } from "../../components/ProfileOld/profile";
import ProgradEdgeForm from "../../components/ProgradEdge/ProgradEdgeForm";
import Spinner from "../../components/Spinner/spinner";
import { G_API_URL } from "../../constants/constants";
import { check_login } from "../../utils/login.util";
import { __getUID } from "../../utils/user-details.util";

const ProgradEdge = () => {
    const [profile, setProfile] = useState<IProfile>({
        firstName: "",
        lastName: "",
        website: "",
        linkedinUrl: "",
        githubUrl: "",
        isWorking: false,
        company: "",
        designation: "",
        college: "",
        yop: "",
        degree: "",
        stream: "",
        profilePic: "",
        prefix: "",
        mobileNumber: ""
    });

    const [isLoading, setLoading] = useState<boolean>(false);

    const isLoggedIn = check_login(); 
    useEffect(() => {
        if(check_login()) {
            setLoading(true);
            // Fetch profile data
            axios.get(
                G_API_URL+"profile/?uid="+__getUID()
            ).then((response: AxiosResponse) => {
                const resp = response.data;
                if(resp.status === 1) {
                    setProfile(prev => ({
                        ...prev,
                        firstName: resp.profile.firstName,
                        lastName: resp.profile.lastName,
                        website: resp.profile.website,
                        linkedinUrl: resp.profile.linkedinUrl,
                        githubUrl: resp.profile.githubUrl,
                        isWorking: resp.profile.isWorking,
                        company: resp.profile.company,
                        designation: resp.profile.designation,
                        college: resp.profile.college,
                        yop: resp.profile.yop,
                        degree: resp.profile.degree,
                        stream: resp.profile.stream,
                        profilePic: resp.profile.profilePic,
                        prefix: resp.profile.prefix,
                        mobileNumber: resp.profile.mobileNumber
                    }));
                }
                setLoading(false);
            });
        }
    },[isLoggedIn]);

    return (
        <>
        {
            !isLoading ?
            <Layout footer={true}>
                <Helmet>
                    <title>ProGrad | WhatsApp</title>
                </Helmet>
                <div
                    className="prograd-edge-wrapper lr-pad-d lr-pad-m
                tb-pad-d tb-pad-m"
                >
                    <div className="g-d g-col-2 g-col-1-m container">
                        <div className="left-pane">
                            <span className="f-d title text-regular 
                            strong-text">
                                ProGrad Buzz
                            </span>
                            <h1 className="text-xxl heading">
                                { "Bite-sized news for\n21st-century techies!" }
                            </h1>
                            <span className="body-regular description">
                                Get all things tech delivered straight into your WhatsApp inbox - news,
                                industry trends, free e-books to learn coding, competitive coding
                                insights, special offers & more.
                            </span>
                            <span
                                className="f-d body-regular strong-text
                            sub-heading"
                            >
                                Subscribe to ProGrad Buzz for free!
                            </span>
                            <ProgradEdgeForm profile={profile}/>
                        </div>
                        <div className="f-d f-v-s right-pane">
                            <img
                                src="https://cdn.prograd.org/resources/prograd-buzz/prograd_new_buzz.gif"
                                alt="prograd_buzz_gif"
                                className="gif-container"
                            />
                        </div>
                    </div>
                </div>
                <style jsx>
                    {`
                        .has-error .ant-input,
                        .has-error .ant-input:hover{
                            background-color: var(--primary-bg);
                            color: var(--dove);
                            border: none;
                        }

                        .prograd-edge-wrapper .ant-form-item .label {
                            color: rgba(255, 255, 255, 0.87) !important;
                        }

                        .prograd-edge-wrapper {
                            padding-top: 64px;
                            padding-bottom: 64px;
                            color: var(--dove);
                        }

                        .left-pane .text-xxl {
                            color: var(--dove);
                            font-family: "Inconsolata", sans-serif !important;
                            line-height: 58.74px;
                            font-weight: 900;
                            margin-bottom: 16px;
                        }

                        .left-pane .body-regular {
                            font-size: 18px;
                        }

                        .prograd-edge-wrapper .title {
                            color: var(--dove);
                            width: 60%;
                            margin: var(--peaky-gap-32) 0 0;
                        }

                        .prograd-edge-wrapper .prograd-edge-logo {
                            margin: var(--peaky-gap-4) 0 0;
                            height: 50px;
                        }

                        .prograd-edge-wrapper .container {
                            margin: var(--peaky-gap-32) 0 0;
                        }

                        .prograd-edge-wrapper .container .title {
                            color: rgba(255, 255, 255, 0.54);
                            margin: 0 0 var(--peaky-gap-16);
                        }

                        .prograd-edge-wrapper .container .heading {
                            white-space: pre-wrap;
                        }

                        .prograd-edge-wrapper .container .description {
                            font-weight: 300;
                        }

                        .prograd-edge-wrapper .container .sub-heading {
                            margin: var(--peaky-gap-24) 0;
                        }

                        .prograd-edge-wrapper .gif-container {
                            margin: 0 0 0 auto;
                        }

                        @media only screen and (max-device-width: 760px) {
                            .prograd-edge-wrapper {
                                padding-top: 32px;
                                padding-bottom: 32px;
                            }
                            
                            .prograd-edge-wrapper .container {
                                margin: 0;                            
                            }

                            .prograd-edge-wrapper .title,
                            .prograd-edge-wrapper .description {
                                width: 100%;
                            }

                            .prograd-edge-wrapper .gif-container {
                                width: 60%;
                                margin: 0 auto;
                            }

                            .prograd-edge-wrapper .container .left-pane {
                                order: 2;
                            }

                            .prograd-edge-wrapper .container .heading {
                                white-space: unset;
                            }
                        }
                    `}
                </style>
            </Layout> :
            <Spinner />
        }
        </>
    );
};

export default ProgradEdge;
