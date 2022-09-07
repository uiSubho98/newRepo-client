import { Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import React, { useState } from "react";
// @ts-ignore
import {Link} from "react-router-dom";
import { logout_user } from "../../utils/login.util";
import { __getEmail, __getUserName } from "../../utils/user-details.util";
import ProfilePic from "../Header/ProfilePic";

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
    isClicked?: boolean;
    authPage ?: boolean;
    hasSubscribed: boolean;
    subscriptions: any;
    isDefaultProfilePic: boolean;
    setSettingActive: Function;
}

const Sidebar = (props:IProps) => {

    const { getClick, authPage, isClicked, is_logged_in, setSettingActive, hasSubscribed, subscriptions, isDefaultProfilePic } = props;

    const [ isAccountSectionActive, setAccountSectionActive ] = useState<boolean>(false);

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

    const renderBootcampMenu = (options: Array<IOption>) => {

        const renderPrograms = () => {
            return options.map((option: IOption, key: number) => {
                return (
                    <Menu.Item key={key}>
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
            <SubMenu key="sub1" title="Bootcamps">
                { renderPrograms() }
            </SubMenu>
        )
    }

    const renderMenu = () => {
        return menu.map((menuItem: IMenuItem, key: number) => {
            return (
                <div className="menu-item text-small strong-text c-pointer f-d f-v-c"
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
                        // <div className="dropdown-wrapper">
                            <Menu
                                style={{ width: 256 }}
                                defaultSelectedKeys={['1']}
                                mode="inline"
                            >
                                { renderBootcampMenu(menuItem.options) }
                            </Menu> :
                        <div className="f-d f-v-c">
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
                <div className="menu-item text-small strong-text c-pointer f-d f-v-c"
                key={key}>
                    <Link to = {
                        (location: ILocation) => ({ 
                            ...location, 
                            pathname: "/" + action.slug,
                            hash: ""
                        })
                    }>
                            {action.label}
                    </Link>
                </div>
            );
        });
    }

    const renderUserInfo = () => {
        return (
            <div className="f-d f-v-c user-info" 
            onClick={() => setAccountSectionActive(true)}>
                <ProfilePic isDefaultProfilePic={isDefaultProfilePic} />
                <div className="f-d f-vt">
                    <span className="text-small strong-text 
                    name">
                        { __getUserName() }
                    </span>
                    <span className="text-small email">
                        { __getEmail() }
                    </span>
                </div>
                <div className="icon-wrapper">
                    <i className="icon icon-chevron-right 
                    strong-text"></i>
                </div>
            </div>  
        )
    }

    const renderAccountSection = () => {
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
                            <Link to = {
                                (location:ILocation) => ({ 
                                    ...location, 
                                    pathname: "/" + menuItem.slug,
                                    hash: ""
                                })
                            }>
                                { menuItem.label }
                            </Link> :
                            isSettings ?
                            <div onClick={() => setSettingActive(true)}>
                                {menuItem.label}
                            </div> :
                            <div onClick={() => logout_user()}>
                                {menuItem.label}
                            </div>
                        }
                    </Menu.Item> : 
                    <div className="divider"></div>
                )
            })
        }

        return (
            <Menu className="account-section">
                { renderMenuItems() }
            </Menu>
        )
    }

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
        <>
            <div className={`background-menu-close ${isClicked ? 'open-menu' : ''}`} onClick={() => getClick()}></div>
            <div className={`nav-mobile-container ${isClicked ? 'open-menu' : ''} lr-pad-d lr-pad-m hide-d`}>
                {
                    !isAccountSectionActive ?
                    <>
                        {
                            is_logged_in &&
                            <>
                                { renderUserInfo() }
                                {
                                    hasSubscribed &&
                                    <>
                                        <div className="divider"></div>
                                        <div className="menu-item text-small strong-text 
                                        c-pointer f-d f-v-c" key={-1}>
                                            <Link to = {
                                                (location:ILocation) => ({ 
                                                    ...location, 
                                                    pathname: "/learning-dashboard/" + program
                                                })
                                            }>
                                                Learning Dashboard
                                            </Link>
                                        </div>
                                    </>
                                }
                                <div className="menu-item text-small strong-text 
                                c-pointer f-d f-v-c" key={-1}>
                                    <Link className="jobsboard-link" to = {
                                        (location:ILocation) => ({ 
                                            ...location, 
                                            pathname: "/jobsboard/"
                                        })
                                    }>
                                        Jobs Board
                                    </Link>
                                </div>
                                <div className="divider"></div>
                            </>

                        }
                        <div> 
                            { renderMenu() } 
                        </div>
                        {
                            !is_logged_in &&
                            <>
                                <div className="divider"></div>
                                { renderActions() }
                            </>
                        }
                    </> :
                    <>
                        <div className="menu-item text-small 
                        strong-text c-pointer menu-btn"
                        onClick={() => setAccountSectionActive(false)}>
                            <i className="icon icon-chevron-left
                            strong-text"></i>
                            <span className="cap-letter">Menu</span>
                        </div>
                        { renderAccountSection() }
                    </>
                }
            </div>
            <style jsx>{`
                @media only screen and (max-device-width: 760px) {
                    .nav-mobile-container {
                        display: flex;
                        flex-direction: column;
                        position: fixed;
                        top: 0;
                        right: 0;
                        background: linear-gradient(180deg, #2E2E2E 0%, #1E1E1E 100%);
                        width: 0;
                        height: 100vh;
                        padding: 4rem 0 4rem 0;
                        overflow-y: auto;
                        overflow-x: hidden;
                        z-index: 10010;
                        box-shadow: var(--peaky-shadow-high);
                        transition: all 0.2s;
                    }

                    .background-menu-close {
                        width: 100vw;
                        height: 100vh;
                        position: fixed;
                        top: 0;
                        z-index: 9000;
                        visibility: hidden;
                        opacity: 0;
                        background: rgba(0,0,0,0.1);
                        transition: all 0.4s;
                    }

                    .background-menu-close.open-menu {
                        visibility: visible;
                        opacity: 1;
                    }

                    .nav-mobile-container .user-info {
                        margin: 0 0 var(--peaky-gap-16);
                    }

                    .nav-mobile-container .active-block {
                        margin-top: auto;
                    }

                    .account-container {
                        margin: var(--peaky-gap-16) 0 0;
                    }

                    .account-container > h3, .important-links > h3 {
                        color: var(--granite);
                    }

                    .nav-mobile-container .important-links-container {
                        margin-top: auto;
                    }

                    .nav-mobile-container .active-block 
                    .important-links .icon, 
                    .nav-mobile-container .active-block 
                    .account-container .icon {
                        margin-left: 8px;
                        color: var(--pink);
                    }

                    .nav-mobile-container.open-menu {
                        width: 80vw;
                        padding: 4rem 1.5rem 4rem 1.5rem;
                    }

                    .nav-mobile-container .explore-title {
                        text-transform: uppercase;
                        font-weight: 500;
                    }

                    .nav-mobile-container .sub-menu {
                        padding: 1rem 0;
                        font-weight: 300;
                    }

                    .nav-mobile-container .explore-title,
                    .nav-mobile-container .item,
                    .nav-mobile-container .menu-item,
                    .nav-mobile-container .quick-promo-links .menu-item {
                        height: 50px;
                        display: flex;
                        align-items: center;
                    }

                    .nav-mobile-container .item,
                    .nav-mobile-container .menu-item,
                    .nav-mobile-container .menu-item a {
                        // font-size: 16px;
                        width: max-content;
                        color: var(--dove);
                    }

                    .nav-mobile-container .menu-item 
                    .tag {
                        color: #E6BE2E;
                        text-transform: uppercase;
                        margin: 0 0 0 var(--peaky-gap-8);
                    }

                    .nav-mobile-container .menu-item
                    .dropdown-wrapper {
                        width: 100%;
                    }

                    .nav-mobile-container .menu-item 
                    .ant-menu-inline .ant-menu-submenu-title {
                        background-color: inherit;
                        color: var(--dove);
                        // font-size: 16px;
                        padding: 0 !important;
                        margin: 0;
                    }

                    .nav-mobile-container .menu-item 
                    .ant-menu-sub a {
                        font-size: 14px;
                    }

                    .nav-mobile-container .menu-item 
                    .ant-menu-inline {
                        border-right: unset;
                        background: unset;
                        width: 100% !important;
                    }

                    .nav-mobile-container .divider {
                        background-color: rgba(255, 255, 255, 0.1);
                        height: 1px;
                        margin: var(--peaky-gap-16) 0;
                    }

                    .nav-mobile-container .menu-btn {
                        margin: 0 0 var(--peaky-gap-16) 0;
                    }

                    .nav-mobile-container .menu-btn
                    .icon {
                        color: var(--primary);
                        font-size: 21px;
                        margin: 0 var(--peaky-gap-8) 0 0;
                    }

                    .nav-mobile-container .ant-menu-submenu-inline > .ant-menu-submenu-title 
                    .ant-menu-submenu-arrow {
                        width: 0;
                    }

                    .nav-mobile-container .ant-menu-submenu-inline > .ant-menu-submenu-title 
                    .ant-menu-submenu-arrow::before,
                    .nav-mobile-container .ant-menu-submenu-inline > .ant-menu-submenu-title 
                    .ant-menu-submenu-arrow::after {
                        background-image: unset;
                        width: 8px;
                        height: 2.5px;
                    }

                    .nav-mobile-container .ant-menu-sub.ant-menu-inline > .ant-menu-item {
                        padding: 0 !important;
                        background: transparent;
                    }

                    .ant-menu-inline .ant-menu-item::after {
                        border-right: unset;
                    }

                    .nav-mobile-container .user-info
                    .icon-wrapper {
                        margin: 0 0 0 auto;
                    }

                    .nav-mobile-container .user-info
                    .icon-wrapper .icon {
                        font-size: 18px;
                        color: var(--primary);
                    }

                    .nav-mobile-container .account-section {
                        background: transparent;
                        border: none;
                    }

                    .nav-mobile-container .sub-menu,
                    .nav-mobile-container .explore-title {
                        color: var(--sandstone;);
                    }

                    .nav-mobile-container .mob-menu-tab .menu-expand {
                        background: #fafafa;
                        height: 0px;
                        display: none;
                        width: 100vw;
                        margin-left: -1rem;
                        padding: 1rem;
                        transition: all 0.4s;
                    }

                    .nav-mobile-container .mob-menu-tab .menu-expand.menu-show {
                        height: auto;
                        display: block;
                    }

                    .nav-mobile-container .nav-tag {
                        margin-left: var(--peaky-gap-8);
                        background: var(--organred);
                        color: var(--dove);
                        font-size: 12px;
                        font-family: "Open Sans", sans-serif;
                        font-weight: 500;
                        padding: 2px 6px;
                        border-radius: 2px;
                    }

                    .mob-menu-tab .open-icon {
                        width: 12px;
                        height: 12px;
                        transform: rotate(0deg);
                        transition: all 0.4s;
                    }

                    .mob-menu-tab.active-parent .open-icon {
                        transform: rotate(180deg);
                    }

                    .inactive-block {
                        margin-top: auto;
                        padding-top: 2rem;
                        background: var(--dove);
                    }

                    .inactive-block .static-links {
                        margin-bottom: 2rem;
                    }

                    .inactive-block div {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: var(--peaky-br-4);
                        text-transform: uppercase;
                    }

                    .inactive-block .signin-btn {
                        width: 100%;
                        margin-bottom: 1rem;
                    }

                    .inactive-block .signup_btn {
                        width: 100%;
                    }

                    ::-webkit-scrollbar {
                        width: 1px;
                    }

                    ::-webkit-scrollbar-thumb {
                        border-radius: 50px;
                        background: #69696900;
                    }

                    .ant-menu-submenu-inline > .ant-menu-submenu-title:hover 
                    .ant-menu-submenu-arrow::before,
                    .ant-menu-submenu-inline > .ant-menu-submenu-title:hover 
                    .ant-menu-submenu-arrow::after {
                        background: var(--dove);
                    }
                    
                }
            `}</style>
        </>
    )
}

export default Sidebar;