import React, { useState } from "react";
import { decodeToken } from "../../utils/user-details.util";
import ChangePassword from "./ChangePassword";
import General from "./General";
import Notifications from "./Notifications";
// @ts-ignore
import jwtDecode from "jwt-decode";

interface IProps {
    activeMenu: string;
    isMenuActive: boolean;
    countryCode: string;
    locationData: any;
    showMenu: Function;
}

interface IState {
    decodedToken: any;
}

const MenuContent = (props: IProps) => {

    const { activeMenu, isMenuActive, countryCode, locationData, showMenu } = props;

    const defaultState = {
        decodedToken: decodeToken()
    }

    const [ state, setState ] = useState<IState>(defaultState);

    const { decodedToken } = state;

    const updateToken = (token: any) => {
        setState(prev => ({
            ...prev,
            decodedToken: jwtDecode(token)
        }));
    }

    const renderMenuContent = () => {
        switch(activeMenu) {
            case "general":
                return (
                    <General 
                        countryCode={countryCode}
                        locationData={locationData}
                        decodedToken={decodedToken} 
                        updateToken={updateToken}
                    />
                );
            case "change password":
                return (
                    <ChangePassword 
                        locationData={locationData} 
                        decodedToken={decodedToken}
                    />
                );
            case "notifications":
                return (
                    <Notifications 
                        decodedToken={decodedToken} 
                        updateToken={updateToken}
                    />
                );
            default:
                return (
                    <General 
                        countryCode={countryCode}
                        locationData={locationData}
                        decodedToken={decodedToken} 
                        updateToken={updateToken}
                    />
                );
        }
    }

    return (
        <>
            <div className={`menu-content-wrapper ${!isMenuActive ? 'active' : ''}`}>
                <div className="go-back-btn c-pointer f-v-c strong-text" onClick={() => showMenu()}>
                    <i className="icon icon-chevron-left"></i>
                    Back
                </div>
                { renderMenuContent() }
            </div>
            <style jsx>{`
                .menu-content-wrapper .heading {
                    font-family: Inconsolata;
                    font-weight: 700;
                }

                .base-transition {
                    transition: all 300ms cubic-bezier(.385,0,.08,1);
                }

                .menu-content-wrapper .go-back-btn {
                    display: none;
                    visibility: hidden;
                }

                @media only screen and (max-device-width: 760px) {
                    .menu-content-wrapper {
                        display: none;
                        visibility: hidden;
                        opacity: 0;
                        width: 100%;
                    }

                    .menu-content-wrapper.active {
                        display: block;
                        visibility: visible;
                        opacity: 1;
                    }

                    .menu-content-wrapper .go-back-btn {
                        display: flex;
                        visibility: visible;
                        margin-bottom: 2rem;
                        font-weight: 300;
                        color: var(--dove);
                        font-size: 14px;
                        width: max-content;
                        text-transform: uppercase;
                    }

                    .menu-content-wrapper .go-back-btn:hover {
                        color: var(--primary);
                    }

                    .menu-content-wrapper .go-back-btn .icon {
                        color: var(--primary);
                        font-size: 21px;
                        margin-right: 4px;
                    }
                }
            `}</style>
        </>
    )
}

export default MenuContent;