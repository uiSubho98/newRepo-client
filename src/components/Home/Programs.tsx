import React, { useEffect, useState } from "react";
import { Button } from "antd";
// @ts-ignore
import {Link} from "react-router-dom";
// @ts-ignore
import ReactHtmlParser from 'react-html-parser';
import ArrowIcon from "../../assets/icons/svg_icons/arrow-black.svg";
import { G_API_URL, G_URL } from "../../constants/constants";
import { check_login, login_user } from "../../utils/login.util";
import { __getSubscriptions, __getToken } from "../../utils/user-details.util";
import axios, { AxiosResponse } from "axios";

interface IResource {
    imageSrc?: string;
    content?: string;
}

interface IProgram {
    name?: string;
    description?: string;
    type?: string;
    label?: string;
    resources?: Array<string | IResource>;
    getStartedLink?: string;
    learnMoreLink?: string;
}

interface IPrograms {
    title?: string;
    description?: string;
    programsList?: Array<IProgram>
}

interface Props {
    data?: IPrograms;
}

interface IState {
    isLoggedIn?: boolean;
    isBootcampSubscribed?: boolean;
}

const Programs = (props:Props) => {
    const {data} = props;
    const defaultState = {
        isLoggedIn: false,
        isBootcampSubscribed: false
    }
    const [isLoading, setLoading] = useState<boolean>(false);
    const [state, setState] = useState<IState>(defaultState);

    useEffect(() => {
        const isLoggedIn = check_login();
        const subscription = __getSubscriptions();
        const isBootcampSubscribed = subscription && subscription.bootcamp;
        setState(prev => ({ ...prev, isLoggedIn, isBootcampSubscribed}));
    },[])

    const renderList = (resources?: Array<string | IResource>,key?:number) => {
        let customClass:string = "";
        let resourceData:string | undefined;
        let imageSrc:string | undefined;
        if(key === 0) {
            customClass=" microdegree"
        }
        return resources && 
        resources.map((resource,index) => {

            if(typeof(resource) === "object") {
                resourceData = resource.content;
                imageSrc = resource.imageSrc;
            } else {
                resourceData = resource;
            }

            return (
                <div className={"g-d resource" + customClass} key={index}>
                    {
                        key === 0 &&
                        <span className="f-d image bg-image-full" style={{
                            backgroundImage: "url(" +imageSrc+ ")"
                        }}>
                        </span>
                    }
                    {
                        key === 1 &&
                        <span className="f-d bullet">
                        </span>
                    }
                    <span className="f-d about body-small">
                        { resourceData } 
                    </span>
                </div>
            );
        });
    }

    const renderPrograms = (programsList?: Array<IProgram>) => {
        const params = {
            enrollmentTime : Math.round(Date.now() / 1000)
        };
        const headers = {
            headers: {
                Authorization: __getToken()
            }
        };
        const handleClick = (type?:string, slug?: string) => {
            if(type === "bootcamp") {
                if(state.isLoggedIn && !state.isBootcampSubscribed) {
                    setLoading(true)
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
                    });
                } else if(state.isLoggedIn && state.isBootcampSubscribed) {
                    window.location.href = G_URL + 
                    "learning-dashboard/bootcamp";
                } else {
                    window.location.href = G_URL + "register/bootcamp";
                }
            } else {
                window.location.href = G_URL + slug;
            }
        }

        let customClass = "bootcamp";

        return programsList && 
        programsList.map((program,key) => {
            if(key === 0) customClass = "microdegree";
            else customClass = "bootcamp";
            return (
                <div className={"w-90 program-details "+customClass} key={program.name}>
                    <div className="g-d card">
                        <span className="f-d tag">
                            { program.label }
                        </span>
                        <h2 className="f-d f-v-c h2-heading">
                            { program.name }&nbsp;&nbsp;
                            <span className="f-d bg-image-full arrow-icon" 
                            style={{ backgroundImage: "url(" +ArrowIcon+ ")"
                            }}>

                            </span>
                        </h2>
                        <span className="f-d body-regular description">
                            { ReactHtmlParser(program.description ?? '') }
                        </span>
                        <div className="resource-list">
                            { renderList( program.resources,key ) }
                        </div>
                        <div className="f-d f-v-c action-elements">
                            <Button 
                                className="default-purple-btn filled-purple 
                                start-for-free-btn"
                                onClick={() => handleClick(program.type, 
                                    program?.getStartedLink)}
                                loading={ isLoading }
                            >
                                Start For Free
                            </Button>
                            <Link to={program.learnMoreLink}>
                                <h3 className="learn-more-btn c-pointer">
                                    Learn More
                                </h3>
                            </Link>
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (
        <>
            <div className="programs-wrapper lr-pad-d lr-pad-m 
            tb-pad-d tb-pad-m" id="programs">
                <h2 className="h2-heading">
                    { data && data.title }
                </h2>
                <span className="f-d body-regular description">
                    { data && data.description }
                </span>
                <div className="g-d g-col-2 g-col-1-m programs-list w-100">
                    { data && renderPrograms( data.programsList ) }
                </div>
            </div>
            <style jsx>{`
                .programs-wrapper {
                    background-color: var(--smoke);
                }

                .programs-wrapper .description {
                    margin:var(--peaky-gap-8) 0 var(--peaky-gap-32);
                }

                .programs-wrapper .programs-list 
                .program-details .card {
                    background-color: var(--dove);
                    padding: 0 var(--peaky-pad-32) 64px;
                    box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.05);
                    border-radius: var(--peaky-br-4);
                }

                .programs-wrapper .programs-list 
                .program-details .card .tag {
                    background-color: rgba(95, 39, 205,0.1);
                    color: var(--carbon);
                    padding: 4px 32px 4px 12px;
                    width: max-content;
                    margin: -16px 0 var(--peaky-gap-48);
                    border-radius: 2px 0 0 2px;
                }

                .programs-wrapper .programs-list 
                .program-details.bootcamp {
                    margin-left:auto;
                }

                .programs-wrapper .programs-list 
                .program-details.microdegree .card {
                    margin:var(--peaky-gap-64) 0 0;
                }

                .programs-wrapper .programs-list 
                .program-details .card .arrow-icon {
                    height:35px;
                    width:35px;
                }

                .programs-wrapper .programs-list 
                .program-details .description {
                    white-space: pre-wrap;
                    margin:var(--peaky-gap-4) 0 var(--peaky-gap-8);
                }

                .programs-wrapper .programs-list 
                .program-details .resource-list
                .resource {
                    grid-template-columns: 1fr 8fr;
                    margin:var(--peaky-gap-48) 0;
                }

                .programs-wrapper .programs-list 
                .program-details .resource-list
                .resource.microdegree {
                    margin:var(--peaky-gap-64) 0;
                }

                .programs-wrapper .programs-list 
                .program-details .resource-list
                .resource .image {
                    height:40px;
                    width:40px;
                }

                .programs-wrapper .programs-list 
                .program-details .resource-list
                .resource .bullet {
                    height:15px;
                    width:15px;
                    border-radius: var(--peaky-br-full);
                    background-color: var(--purple);
                    margin:6px 0 0;
                }

                .programs-wrapper .programs-list 
                .program-details .resource-list
                .resource .about {
                    color: var(--carbon);
                    white-space:pre-wrap;
                    margin:0 var(--peaky-gap-24) 0;
                }

                .programs-wrapper .programs-list 
                .program-details.bootcamp .resource-list
                .resource .about {
                    margin-left: 0;
                    margin-right: var(--peaky-gap-48);
                }

                .programs-wrapper .programs-list 
                .program-details .action-elements
                .start-for-free-btn {
                    padding-left: 2rem;
                    padding-right: 2rem;
                    font-size: 16px;
                }

                .programs-wrapper .programs-list 
                .program-details .action-elements
                .learn-more-btn {
                    margin: 0 0 0 var(--peaky-gap-32);
                }

                @media only screen and (max-device-width: 760px) {
                    .programs-wrapper .programs-list 
                    .program-details {
                        width:100%;
                        margin: var(--peaky-gap-32) 0 var(--peaky-gap-32);
                    }

                    .programs-wrapper .programs-list 
                    .program-details.microdegree .card {
                        margin:0;
                    }

                    .programs-wrapper .programs-list 
                    .program-details.bootcamp .resource-list 
                    .resource .about {
                        margin-right: var(--peaky-gap-8);
                    }

                    .programs-wrapper .programs-list 
                    .program-details .description,
                    .programs-wrapper .programs-list 
                    .program-details .resource-list
                    .resource .about {
                        white-space: unset;
                    }

                    .programs-wrapper .programs-list 
                    .program-details .resource-list 
                    .resource .about {
                        margin-left: var(--peaky-gap-8);
                        margin-right: var(--peaky-gap-8);
                    }

                    .programs-wrapper .programs-list 
                    .program-details .card {
                        padding: 48px var(--peaky-gap-24);
                    }

                    .programs-wrapper .programs-list 
                    .program-details .card .tag {
                        margin-top: -64px
                    }

                    .programs-wrapper .programs-list 
                    .program-details .action-elements
                    .learn-more-btn {
                        margin-left: var(--peaky-gap-24);
                    }
                }

                @media only screen and (max-device-width: 360px) {
                    .programs-wrapper .programs-list 
                    .program-details .card {
                        height: unset;
                        min-height: 750px;
                    }

                    .programs-wrapper .programs-list .program-details 
                    .card .tag {
                        height: max-content;
                        margin-top: -64px;
                        margin-bottom: 0;
                    }

                    .programs-wrapper .programs-list .program-details 
                    .action-elements .start-for-free-btn {
                        padding-left: 1rem;
                        padding-right: 1rem;
                    }

                    .programs-wrapper .programs-list .program-details 
                    .action-elements .learn-more-btn {
                        margin-left: var(--peaky-gap-32);
                    }
                }

                @media only screen and (max-device-width: 320px) {
                    .programs-wrapper .programs-list 
                    .program-details .card {
                        padding-left: var(--peaky-gap-32);
                        padding-right: var(--peaky-gap-32);
                    }

                    .programs-wrapper .programs-list .program-details 
                    .action-elements .learn-more-btn {
                        margin-left: 22px;
                    }
                }

                @media screen and (min-width: 768px) and (max-width: 1023px) 
                and (orientation: portrait) {
                    .programs-wrapper .programs-list {
                        grid-template-columns: 1fr;
                    }

                    .programs-wrapper .programs-list 
                    .program-details.bootcamp {
                        margin-top: var(--peaky-gap-64);
                    }

                    .programs-wrapper .programs-list 
                    .program-details {
                        width: 80%;
                    }
                }

            `}</style>
        </>
    )
}

export default Programs;