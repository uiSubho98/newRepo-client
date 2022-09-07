import React, { useEffect } from "react";
//@ts-ignore
import Scrollspy from "react-scrollspy";

const ProfileNav = () => {

    const handleScroll = () => {
        let mainNavbar = document.getElementById("profile-navbar");
        let val = 0;
        if(mainNavbar) {
            if (window.scrollY > val) {
                mainNavbar.classList.add('profile-navbar');
            } else {
                mainNavbar.classList.remove('profile-navbar');
            }
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    },[]);

    let scrollItems = [
        "personal-information",
        "educational-information",
        "professional-information",
        "skills-section",
        "project-experience",

    ];

    let navItems = [
        "Personal",
        "Educational",
        "Professional",
        "Skills",
        "Project"
    ];

    const handleNavigation = (navItem: string) => {
        const element = document.getElementById(navItem);
        if(element) {
            var offset = 124;
            window.scrollTo(0, 0);
            var rect = element.getBoundingClientRect();
            window.scrollTo(rect.left , rect.top - offset);
        }
    }

    const renderNavItems = () => {
        return navItems.map((navItem,key) => 
            <li>
                {    
                    // eslint-disable-next-line
                    <a onClick={() => handleNavigation(scrollItems[key])}>
                        {navItem}
                    </a>
                }
            </li>
        )
    }
    
    return (
        <>
            <div
                id="profile-navbar"
                className="profile-navbar-container lr-pad-d lr-pad-m f-d f-v-c f-h-sb hide-m"
            >                
                <Scrollspy
                    items={scrollItems}
                    currentClassName="is-current"
                    offset={-130}
                >
                    { renderNavItems() }
                </Scrollspy>
            </div>
            <style jsx>{`
                .profile-navbar-container {
                    background: var(--crow);
                    display: none;
                    height: 56px;
                    width: 100vw;
                }

                .profile-navbar-container.profile-navbar {
                    position: sticky;
                    top: 64px;
                    left: 0;
                    display: none;
                    transition: all 500ms ease;
                    z-index: 1;
                }

                #profile-navbar ul {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin: 0;
                    padding: 0;
                    list-style: none;
                    height: inherit;
                    width: max-content;
                }

                #profile-navbar ul li {
                    height: inherit;
                    border-bottom: 2px solid rgba(240, 81, 54, 0);
                    padding: 0 var(--peaky-pad-24);
                    transition: all 0.4s;
                }

                #profile-navbar ul a {
                    color: var(--dove);
                    text-decoration: none;
                    font-size: 14px;
                    font-weight: 600;
                    height: inherit;
                    display: flex;
                    align-items: center;
                }

                #profile-navbar ul .is-current {
                    border-bottom: 4px solid #1739E6;
                }

                .left-container {
                    width: 70%;
                    height: inherit;
                }

                .p-nav-item {
                    display: flex;
                    align-items: center;
                    height: inherit;
                    color: var(--carbon);
                    border-bottom: 2px solid rgba(240, 81, 54, 0);
                    transition: all 0.4s;
                }

                .p-nav-item:hover {
                    color: var(--facered);
                }

                .p-nav-item.active-tab {
                    border-bottom: 2px solid rgba(240, 81, 54, 1);
                }

                @media only screen and (max-device-width: 760px) {

                    .profile-navbar-container,
                    .profile-navbar-container.profile-navbar {
                        display: flex;
                        overflow: overlay;
                    }

                    .profile-navbar-container.profile-navbar {
                        top: 64px;
                    }

                    #profile-navbar ul li {
                        width: max-content;
                    }
                }
            `}</style>
        </>
    )
}

export default ProfileNav;