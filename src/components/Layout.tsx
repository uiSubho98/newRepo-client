import React, { useState,useEffect, ReactNode } from "react";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import keys from "../config/keys";
import { check_login } from "../utils/login.util";
import { __getCookie } from "../utils/cookie.util";
// @ts-ignore
import jwtDecode from "jwt-decode";
import FooterV2 from "./Footer/FooterV2";
import Settings from "../pages/Settings/Settings";
import { __getProfilePicture, __getSubscriptions } from "../utils/user-details.util";

interface Props {
    navAction ?: string;
    userProgress ?: object;
    showLoginItems ?: boolean;
    footer ?: boolean;
    children ?: ReactNode;
    redirectDisable ?: boolean;
    authPage ?: boolean;
    isSettingEnabled?: boolean;
    toggleSettings?: Function;
}

const Layout = (props:Props) => {
    const is_logged_in:boolean = check_login();
    const [clickState,setClickState] = useState<boolean>(false);
    const [decodedToken,setDecodedToken] = useState<string>("");
    const [isSettingActive,setSettingActive] = useState<boolean>(false);
    const subscriptions = __getSubscriptions();

    let hasSubscribed = false;
    if(subscriptions && (subscriptions.microdegree || 
        subscriptions.bootcamp)) {
        hasSubscribed = true;
    }

    const getClick = () => {
        setClickState(!clickState);
    }

    useEffect(() => {
        if (is_logged_in) {
            let decodedToken = jwtDecode(__getCookie(keys.cookiePrefix + "ut").cookieValue);
            setDecodedToken(decodedToken);
        }
    },[is_logged_in]);

    const { navAction, userProgress, showLoginItems, footer, redirectDisable, authPage, isSettingEnabled, toggleSettings } = props;

    useEffect(() => {
        setSettingActive(isSettingEnabled ? true: false);
    }, [isSettingEnabled])


    // let isThoughtWorkPage = false;

    // const pathname = window.location.pathname;
    // if(pathname.includes("thoughtworks-developer") || 
    // pathname.includes("presidio-developer") ||
    // pathname.includes("register-success")) {
    //     isThoughtWorkPage = true;
    // }

    let isDefaultProfilePic = false;
    if(check_login()) {
        if(__getProfilePicture() === "https://cdn.prograd.org/upp/default.png") {
            isDefaultProfilePic = true;
        }
    }

    // const initTawk = () => {
    //     const Tawk = document.createElement('script');
    //     Tawk.type = 'text/javascript';
    //     Tawk.async = true;
    //     Tawk.innerHTML = `var Tawk_API = Tawk_API || {},Tawk_LoadStart = new Date();
    //     (function() {
    //         var s1 = document.createElement("script"),
    //             s0 = document.getElementsByTagName("script")[0];
    //         s1.async = true;
    //         s1.src = "https://embed.tawk.to/60a5fbf5185beb22b30ef4cb/1f6460ekt";
    //         s1.charset = "UTF-8";
    //         s1.setAttribute("crossorigin", "*");
    //         s0.parentNode.insertBefore(s1, s0);
    //     })();`;
    //     document.body.appendChild(Tawk);
    // }
    
    return (
        <>
            {!isSettingActive ? (
                <>
                    {
                        <Header
                            navAction={navAction}
                            userProgress={userProgress}
                            getClick={getClick}
                            isActive={clickState}
                            is_logged_in={is_logged_in}
                            decodedToken={decodedToken}
                            showLoginItems={showLoginItems}
                            redirectDisable={redirectDisable}
                            authPage={authPage}
                            hasSubscribed={hasSubscribed}
                            subscriptions={subscriptions}
                            setSettingActive={setSettingActive}
                            isDefaultProfilePic={isDefaultProfilePic}
                        />
                    }

                    <Sidebar
                        navAction={navAction}
                        userProgress={userProgress}
                        getClick={getClick}
                        isActive={clickState}
                        is_logged_in={is_logged_in}
                        decodedToken={decodedToken}
                        showLoginItems={showLoginItems}
                        redirectDisable={redirectDisable}
                        isClicked={clickState}
                        hasSubscribed={hasSubscribed}
                        subscriptions={subscriptions}
                        setSettingActive={setSettingActive}
                        isDefaultProfilePic={isDefaultProfilePic}
                    />
                    {props.children}
                    {/* {!pathname.includes("/admin") &&
                    !pathname.includes("/vision") &&
                    !pathname.includes("/join") &&
                    pathname !== "/odin" &&
                    !pathname.includes("/liveclass") &&
                    !pathname.includes("/profile") &&
                    !pathname.includes("/jobsboard")
                        ? initTawk()
                        : ""} */}
                    {footer && <FooterV2 />}
                </>
            ) : (
                <Settings
                    isSettingEnabled={isSettingEnabled}
                    setSettingActive={setSettingActive}
                    toggleSettings={toggleSettings}
                />
            )}
        </>
    );
}

export default Layout;
