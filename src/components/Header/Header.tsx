import React from "react";
// @ts-ignore
import {Link} from "react-router-dom";
import { G_URL } from "../../constants/constants";
import prograd_logo from "../../assets/brand/prograd_logo.svg";
import { Dropdown, Menu } from "antd";
import { check_login, logout_user } from "../../utils/login.util";
import { isMobile } from "react-device-detect";
import { __getEmail, __getUserName } from "../../utils/user-details.util";
import { handleRegistrationSrc } from "../../utils/common.util";
import ProfilePic from "./ProfilePic";

interface ILocation {
    pathname: string;
}

interface IMenuItem {
    label: string;
    slug?: string;
    options?: Array<IOption>;
    url?: string;
    tag?: string;
}

interface IAction {
    label: string;
    slug: string;
}

interface IOption {
    program: string;
    slug: string;
}

interface IProps {
    navAction ?: string;
    userProgress ?: object;
    getClick : Function;
    isActive : boolean;
    is_logged_in : boolean;
    decodedToken : string;
    showLoginItems ?: boolean;
    redirectDisable ?: boolean;
    authPage ?: boolean;
    hasSubscribed: boolean;
    subscriptions: any;
    isDefaultProfilePic: boolean;
    setSettingActive: Function;
}

const Header = (props: IProps) => {
    const { redirectDisable, authPage, isActive, getClick, is_logged_in, setSettingActive, hasSubscribed, subscriptions, isDefaultProfilePic } = props;

    const isLoggedIn = check_login();

    const menu: Array<IMenuItem> = [
        {
            label: "For Students",
            slug: "programs/"
        },
        {
            label: "For Enterprises",
            slug: "enterprises/"
        }
    ]

    const actions: Array<IAction> = [
        {
            label: "Log In",
            slug: "login"
        },
        {
            label: "Sign Up",
            slug: "signup"
        }
    ]

    const accountMenu: Array<IMenuItem> = [
        {
            label: "Your Profile",
            slug: "profile/",
        },
        {
            label: "divider"
        },
        {
            label: "My Recordings",
            slug: "recordings",
        },
        // {
        //     label: "Billing",
        //     slug: "billing",
        // },
        {
            label: "divider"
        },
        // {
        //     label: "Refer and Earn",
        //     slug: "refer-and-earn"
        // },
        // {
        //     label: "divider"
        // },
        {
            label: "Settings"
        },
        {
            label: "Logout",
            slug: "logout"
        }
    ]

    let rurl = "";

    const handleLogoAction = () => {
        const {navAction, redirectDisable} = props;
        if(redirectDisable === true && !authPage) { 
            return null 
        } else { 
            window.location.href = navAction !== undefined && 
            !window.location.href.includes('login') ? G_URL + rurl : G_URL;
        }
    }

    const getBootcampMenu = (options: Array<IOption>) => {

        const renderPrograms = () => {
            return options.map((option: IOption, key: number) => {
                return (
                    <Menu.Item key={key} className="menu-item">
                        <Link to = {
                            (location:ILocation) => ({ 
                                ...location, 
                                pathname: "/" + option.slug,
                                hash: ""
                            })
                        }>
                            {option.program}
                        </Link>
                    </Menu.Item>
                )
            })
        }

        return (
            <Menu className="bootcamp-menu">
                { renderPrograms() }
            </Menu>
        )
    }



    const renderMenu = () => {
        return menu.map((menuItem: IMenuItem, key: number) => {
            return (
                <div className="nav-item text-small strong-text c-pointer f-d f-v-c"
                key={key}>
                    {
                        menuItem.slug ?
                        <Link to = {
                            (location:ILocation) => ({ 
                                ...location, 
                                pathname: "/"+menuItem.slug,
                                hash: ""
                            })
                        }>
                            {menuItem.label}
                        </Link> :
                        menuItem.options ?
                        <Dropdown overlay={getBootcampMenu(menuItem.options)}>
                            <span className="f-d f-v-c dropdown-label">
                                {menuItem.label} <i className="icon icon-chevron-down"></i>
                            </span>
                        </Dropdown> :
                        <div className="f-d f-vt f-v-e">
                            <a 
                                href={menuItem.url} 
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {menuItem.label}
                            </a>
                            <span className="tag text-tiny strong-text">
                                {menuItem.tag}
                            </span>
                        </div>
                    }
                </div>
            )
        })
    }

    const renderActions = () => {
        let acts = [...actions];
        if(authPage) {
            if(window.location.href.includes('signup') || window.location.href.includes('social-confirmation')) {
                acts.splice(1,1);
            } else if(!window.location.href.includes('forgot-password') && !window.location.href.includes('create-password')) {
                acts.splice(0,1);
            }
        }
        return acts.map((action: IAction, key: number) => {
            return (
                <div className="nav-item text-small strong-text c-pointer f-d f-v-c"
                key={key}>
                    <Link to = {
                        (location: ILocation) => ({ 
                            ...location, 
                            pathname: "/" + action.slug,
                            hash: ""
                        })
                    }
                    onClick={ () => 
                        action.label.toLowerCase() === "sign up" &&
                        handleRegistrationSrc("nav")
                    }>
                            {action.label}
                    </Link>
                </div>
            );
        });
    }

    const getAccountMenu = () => {

        const renderUserInfo = () => {
            return (
                <div className="f-d f-v-c user-info">
                    <ProfilePic isDefaultProfilePic={isDefaultProfilePic} />
                    <div className="f-d f-vt">
                        <span className="text-small strong-text name">
                            { __getUserName() }
                        </span>
                        <span className="text-small email">
                            { __getEmail() }
                        </span>
                    </div>
                </div>  
            )
        }

        const removeLocal = ()=>{
            localStorage.removeItem("test")
            console.log("object");
        }

        const renderMenuItems = () => {
            let isLogout = false;
            let isSettings = false;
            return accountMenu.map((menuItem: IMenuItem, key: number) => {
                isLogout = menuItem.label.toLowerCase() === "logout";
                isSettings = menuItem.label.toLowerCase() === "settings";
                return (
                    menuItem.label !== "divider" ?
                    <Menu.Item key={key} className="menu-item">
                         {
                            !(isLogout || isSettings) ?
                           <div onClick={()=>removeLocal()}>
                             <Link className='navbar-profile' to = {
                                (location:ILocation) => ({ 
                                    ...location, 
                                    pathname: "/" + menuItem.slug,
                                    hash: ""
                                })
                            }>
                                { menuItem.label}

                            </Link>
                           </div> :
                            isSettings ?
                            <div onClick={() => setSettingActive(true)}>
                                {menuItem.label}
                            </div> :
                            <div onClick={() => logout_user()}>
                                {menuItem.label}
                            </div>
                        }
                    </Menu.Item> : 
                    <div className="divider" key={key}></div>
                )
            })
        }

        return (
            <Menu className="account-section">
                { renderUserInfo() }
                { renderMenuItems() }
            </Menu>
        )
    }

    const renderAccount = () => {
        let program:string;
        if(subscriptions) {
            if(subscriptions.microdegree) {
                program = "microdegree";
            } else if(subscriptions.bootcamp) {
                program = "bootcamp";
            } else {
                program = "launchpad"
            }
        }

      

        return (
            <div className="nav-item text-small strong-text c-pointer f-d f-v-c">
                {
                    isLoggedIn &&
                    <Link to = {
                        (location:ILocation) => ({ 
                            ...location, 
                            pathname: "/jobsboard"
                        })
                    }>
                        Jobs Board
                    </Link>
                }
                {
                    hasSubscribed &&
                    <Link className="learning-db-link" to = {
                        (location:ILocation) => ({ 
                            ...location, 
                            pathname: "/learning-dashboard/" + program
                        })
                    }>
                        Learning Dashboard
                    </Link>
                }
                <Dropdown overlay={getAccountMenu()}>
                    <ProfilePic isDefaultProfilePic={isDefaultProfilePic} />
                </Dropdown>
            </div>
        )
    }

    return (
        <>
        {
            !redirectDisable &&
            <button
                className={`hamburger hamburger--slider ${isActive ? "is-active" : ""}`}
                type="button"
                onClick={() => getClick()}
            >
                <span className="hamburger-box">
                    <span className="hamburger-inner"></span>
                </span>
            </button> 
        }
            <div id="main-navbar" className={`navbar-container lr-pad-d 
            lr-pad-m f-d f-v-c ${redirectDisable ? "disabled" : ""}`}>
                <div 
                    className={`f-d f-v-c ${(isMobile && redirectDisable) ? 
                        "f-h-c w-100" : ""} c-pointer brand-logo`}
                    onClick={() => handleLogoAction()}
                >
                    <img src={prograd_logo} alt="logo" 
                    height="30" width="162" />
                </div>
                {
                    !redirectDisable &&
                    <div className="f-d menu-wrapper hide-m">
                        <div className="f-d f-v-c left-pane">
                            { renderMenu() }
                        </div>
                        <div className="f-d f-v-c right-pane">
                            { 
                                !is_logged_in ? renderActions() : 
                                renderAccount() 
                            }
                        </div>
                    </div>
                }
                {
                    authPage &&
                    <div className="f-d menu-wrapper">
                        <div className="f-d f-v-c right-pane">
                            { renderActions() }
                        </div>
                    </div>
                }
            </div>
            <style jsx>{`
                .navbar-container {
                    height: 80px;
                    background: var(--spider);
                    box-shadow: 0px 5px 11px 0px rgba(50, 50, 50, 0);
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 1000;
                    transition: all 0.2s;
                }

                .navbar-container.nav-hover {
                    height: 82px;
                    box-shadow: 0px 5px 11px 0px rgba(50, 50, 50, 0.08);
                }

                .navbar-container.disabled {
                    background: var(--crow);
                }

                .navbar-container.inactive {
                    display: none;
                }

                .navbar-container .menu-wrapper {
                    width: 100%;
                }

                .navbar-container .menu-wrapper 
                .left-pane {
                    margin: 0 0 0 var(--peaky-gap-64);
                }

                .navbar-container .menu-wrapper 
                .right-pane {
                    margin: 0 0 0 auto;
                }

                .navbar-container .menu-wrapper 
                .left-pane .nav-item {
                    margin-right: 2rem;
                }

                .navbar-container .menu-wrapper 
                .right-pane .nav-item {
                    margin-left: 2rem;
                }
                
                .navbar-container .menu-wrapper 
                .nav-item a {
                    color: var(--dove) !important;
                }

                .navbar-container .menu-wrapper 
                .nav-item .tag {
                    color: #E6BE2E;
                    font-size: 10px;
                    margin: 20px 0 0;
                    position: absolute;
                    text-transform: uppercase;
                }

                .bootcamp-menu .menu-item,
                .bootcamp-menu .menu-item > a,
                .account-section .menu-item,
                .account-section .menu-item > a
                {
                    color: var(--dove) !important;
                }

                .bootcamp-menu.ant-dropdown-menu,
                .account-section.ant-dropdown-menu {
                    background-color: var(--secondary-bg) !important;
                }

                .ant-dropdown {
                    box-shadow: var(--peaky-shadow-high-2);
                }

                .bootcamp-menu .ant-dropdown-menu-item:hover,
                .account-section .ant-dropdown-menu-item:hover {
                    background-color: var(--primary-bg) !important;
                }

                .account-section {
                    padding: var(--peaky-pad-16) 0;
                    width: 255px;
                }

                .bootcamp-menu {
                    padding: 8px 0;
                    width: max-content;
                }

                .bootcamp-menu .ant-dropdown-menu-item {
                    padding: 8px var(--peaky-pad-16);
                }

                .dropdown-label .icon {
                    font-size: 16px;
                    margin: 5px 0 0;
                }

                .account-section .ant-dropdown-menu-item {
                    padding: 8px var(--peaky-pad-16);
                }

                .account-section .user-info {
                    margin: 0 var(--peaky-pad-16) var(--peaky-gap-8);
                }

                .navbar-container .profile-image {
                    height: 40px;
                    width: 40px;
                    border: var(--peaky-border);
                    border-radius: var(--peaky-br-full);
                    margin: 0 0 0 var(--peaky-gap-32);
                }

                .navbar-container .learning-db-link {
                    margin-left: var(--peaky-gap-32);
                }

                .navbar-container .profile-image.default,
                .user-info .profile-image.default {
                    background-color: var(--primary);
                    font-size: 24px;
                    font-weight: 400;
                    font-family: Inconsolata;
                }

                .user-info .profile-image.default {
                    color: var(--dove);
                    font-size: 28px;
                }

                .user-info .profile-image {
                    height: 50px;
                    width: 50px;
                    border: var(--peaky-border);
                    border-radius: var(--peaky-br-full);
                    margin: 0 var(--peaky-gap-8) 0 0;
                }

                .user-info .email {
                    opacity: 0.57;
                }

                .user-info .name,
                .user-info .email {
                    width: 165px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .account-section .divider {
                    background-color: rgba(255, 255, 255, 0.1);
                    height: 1px;
                    margin: var(--peaky-gap-8) var(--peaky-gap-16);
                }

                .navbar-profile{
                    color:white;
                }
                .navbar-profile:hover{
                    color:white;
                }

                @media only screen and (max-device-width: 760px) {

                    .navbar-container {
                        height: 64px;
                    }

                    .hamburger {
                        position: fixed;
                        top: 19px;
                        z-index: 10020;
                        right: 16px;
                    }
                }
            `}</style>
        </>
    )
}

export default Header;