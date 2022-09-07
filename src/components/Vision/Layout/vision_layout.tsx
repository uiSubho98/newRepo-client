import { Result } from "antd";
import React, { useEffect, useState } from "react";
import { check_login, logout_user } from "../../../utils/login.util";
import ProgrdLogo from "./../../../assets/brand/prograd_logo.svg";
import VisionLogo from "./../../../assets/imgs/prograd-vision-logo.svg";
import { checkURL, checkUserAccess, LoginClickHandler, NavStyle } from "./utils";
// @ts-ignore
import jwtDecode from "jwt-decode";
import { __getToken } from "../../../utils/user-details.util";
import { G_HOME_URL } from "../../../constants/constants";

interface IState {
    is_logged_in: boolean;
    domain_type: string;
    userType: number;
    isLoading: boolean;
}

const VisionLayout = (props: any) => {
    const defaultState = {
        is_logged_in: false,
        domain_type: "",
        userType: 0,
        isLoading: true
    };

    const { slot_type } = props;
    const [state, setState] = useState<IState>(defaultState);

    useEffect(() => {
        const is_logged_in = check_login();
        const domain_type = checkURL();

        if (is_logged_in) {
            let user_details = jwtDecode(__getToken());
            let { userType } = user_details;
            setState(prev => ({
                ...prev,
                userType: userType,
                is_logged_in: is_logged_in,
                domain_type: domain_type,
                isLoading: false
            }));
        } else setState(prev => ({ ...prev, is_logged_in: is_logged_in, domain_type: domain_type, isLoading: false }));
    }, []);

    const renderLoginLogout = () => {
        const { is_logged_in, userType, domain_type } = state;
        let isLiveclass = slot_type === "liveclass" ? true : false;
        if (is_logged_in && checkUserAccess(domain_type, userType) && (userType === 8 || userType === 9)) {
            let slug = "vision/admin/freeclass";
            if(isLiveclass) {
                slug = "admin/liveclass";
            }
            return (
                <div className="f-d vision-items f-h-sb">
                    {
                        !isLiveclass &&
                        <div
                            className="vision-nav-link c-pointer"
                            onClick={() =>
                                (window.location.href = G_HOME_URL + slug + "/register")
                            }
                            style={NavStyle("register")}
                        >
                            REGISTRATIONS
                        </div>
                    }
                    <div
                        className="vision-nav-link c-pointer"
                        onClick={() =>
                            (window.location.href = G_HOME_URL + slug + "/calendar")
                        }
                        style={NavStyle("calendar")}
                    >
                        CALENDAR
                    </div>
                    <div
                        className="vision-nav-link c-pointer"
                        onClick={() =>
                            (window.location.href = G_HOME_URL + slug + "/classroom")
                        }
                        style={NavStyle("classroom")}
                    >
                        CLASSROOMS
                    </div>

                    <div
                        className="vision-nav-link c-pointer"
                        onClick={() =>
                            (window.location.href = G_HOME_URL + slug + "/recordings")
                        }
                        style={NavStyle("recordings")}
                    >
                        RECORDINGS
                    </div>
                    <div className="vision-nav-link c-pointer" onClick={() => logout_user()}>
                        LOGOUT
                    </div>
                </div>
            );
        } else if (is_logged_in && userType === 7) {
            let slug = "vision/mentor/freeclass/";
            if(isLiveclass) {
                slug = "mentor/liveclass/";
            }
            // User type needs to be replaced by 7
            return (
                <div className="f-d vision-items f-h-sb mentor">
                    {
                        !isLiveclass &&
                        <div
                            className="vision-nav-link c-pointer"
                            onClick={() =>
                                (window.location.href = G_HOME_URL + slug + "register")
                            }
                            style={NavStyle("register")}
                        >
                            REGISTRATIONS
                        </div>
                    }
                    <div
                        className="vision-nav-link c-pointer"
                        onClick={() =>
                            (window.location.href = G_HOME_URL + slug + "classroom")
                        }
                        style={NavStyle("classroom")}
                    >
                        CLASSROOMS
                    </div>
                    <div
                        className="vision-nav-link c-pointer"
                        onClick={() =>
                            (window.location.href = G_HOME_URL + slug + "recordings")
                        }
                        style={NavStyle("recordings")}
                    >
                        RECORDINGS
                    </div>
                    <div className="vision-nav-link c-pointer" onClick={() => logout_user()}>
                        LOGOUT
                    </div>
                </div>
            );
        } else if (is_logged_in && !checkUserAccess(domain_type, userType))
            return (
                <div className="f-d vision-items f-h-e">
                    <div className="c-pointer" onClick={() => logout_user()}>
                        LOGOUT
                    </div>
                </div>
            );
        else
            return (
                <div className="f-d vision-items f-h-e">
                    <div className="c-pointer" onClick={LoginClickHandler}>
                        LOGIN
                    </div>
                </div>
            );
    };

    const renderComponent = () => {
        const { is_logged_in, userType, domain_type, isLoading } = state;
        if(!isLoading) {
            if (is_logged_in && checkUserAccess(domain_type, userType)) return props.children;
            else if (is_logged_in && !checkUserAccess(domain_type, userType))
                return <Result status="warning" title="Unauthorized User" />;
            else {
                return <Result status="warning" title="Please Login to continue" />;
            }
        }
    };

    return (
        <>
            <div className="vision-navbar lr-pad-d lr-pad-m f-d f-h-sb f-v-c">
                <div className="logo-wrapper f-d f-v-c">
                    {
                        slot_type !== "freeclass" ?
                        <div className="bg-image-full prograd-logo"></div> :
                        <div className="bg-image-full vision-logo"></div>
                    }
                </div>
                {renderLoginLogout()}
            </div>

            {renderComponent()}

            <style jsx>{`
                #root {
                    margin: unset;
                }

                .vision-nav-link {
                    display: flex;
                    height: 100%;
                    align-items: center;
                }

                .vision-navbar {
                    height: 90px;
                    width: 100%;
                    background-color: var(--spider);
                    margin-bottom: 2rem;
                    box-shadow: var(--peaky-shadow-high);
                }

                .vision-navbar .logo-wrapper {
                    height: 50px;
                }

                .vision-navbar .logo-wrapper .logo-sep {
                    height: 100%;
                    margin-left: 32px;
                    margin-right: 32px;
                }

                .vision-navbar .prograd-logo {
                    background-image: url(${ProgrdLogo});
                    width: 160px;
                    height: 50px;
                }

                .vision-navbar .vision-logo {
                    background-image: url(${VisionLogo});
                    width: 300px;
                    height: 50px;
                }

                .vision-navbar .vision-items {
                    width: 50%;
                    height: 100%;
                }

                .vision-navbar .vision-items.mentor {
                    width: 35%;
                }
            `}</style>
        </>
    );
}

export default VisionLayout;
