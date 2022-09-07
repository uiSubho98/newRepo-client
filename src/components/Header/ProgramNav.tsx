import React, { useEffect } from "react";
//@ts-ignore
import Scrollspy from "react-scrollspy";

const ProgramNav = () => {

    const handleScroll = () => {
        let mainNavbar = document.getElementById("program-navbar");
        const path = window.location.pathname.split('/');
        let val = 400;
        if(path && path.length && path[1]==="career-services")
            val = 1000;
        if(mainNavbar) {
            if (window.scrollY > val) {
                mainNavbar.classList.add('program-navbar');
            } else {
                mainNavbar.classList.remove('program-navbar');
            }
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    },[]);

    const path = window.location.pathname.split('/');
    let scrollItems = [
        "overview",
        "curriculum",
        "features",
        "outcomes",
        "consequences",
        "reviews",
        "placements",
        "faqs"
    ];

    let navItems = [
        "Overview",
        "Curriculum",
        "Features",
        "Outcomes",
        "Why ProGrad?",
        "Reviews",
        "Placements",
        "FAQs"
    ];

    // let isCareerService  = false;
    if(path && path.length && path[1]==="career-services"){
        // isCareerService = true;
        navItems = [
            "Overview",
            "Schedule",
            "How to join",
            "Fees",
            "FAQs"
        ];
        scrollItems = [
            "overview",
            "schedule",
            "join",
            "fees",
            "faqs"
        ];
    }

    // let isMicrodegree = false;
    if(path && path.length && path[1] === "microdegree") {
        // isMicrodegree = true;
        navItems[5] = "How it helps";
        scrollItems[5] = "benefits";
        navItems.splice(6,1);
        scrollItems.splice(6,1);
    } else if(path && path.length && path[2] === 
        "foundations-of-front-end-development") {
        navItems.splice(3,1);
        navItems.splice(6,1);
        scrollItems.splice(3,1);
        scrollItems.splice(6,1);
    } else if(path && path.length && path[2] === 
        "foundations-of-front-end-development-demo") {
        navItems.splice(3,1);
        navItems.splice(5,1);
        scrollItems.splice(3,1);
        scrollItems.splice(5,1);
    }

    const handleNavigation = (navItem: string) => {
        const element = document.getElementById(navItem);
        if(element) {
            var offset = 96;
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
                id="program-navbar"
                className="program-navbar-container lr-pad-d lr-pad-m f-d f-v-c f-h-sb hide-m"
            >                
                <Scrollspy
                    items={scrollItems}
                    currentClassName="is-current"
                    offset={-200}
                >
                    { renderNavItems() }
                </Scrollspy>
            </div>
            <style jsx>{`
                .program-navbar-container {
                    background: var(--crow);
                    height: 56px;
                    width: 100vw;
                }

                .program-navbar-container.program-navbar {
                    position: sticky;
                    top: 80px;
                    left: 0;
                    display: flex;
                    transition: all 500ms ease;
                    z-index: 1;
                }

                #program-navbar ul {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin: 0;
                    padding: 0;
                    list-style: none;
                    height: inherit;
                    width: max-content;
                }

                #program-navbar ul li {
                    height: inherit;
                    border-bottom: 2px solid rgba(240, 81, 54, 0);
                    padding: 0 var(--peaky-pad-24);
                    transition: all 0.4s;
                }

                #program-navbar ul a {
                    color: var(--dove);
                    text-decoration: none;
                    font-size: 14px;
                    font-weight: 600;
                    height: inherit;
                    display: flex;
                    align-items: center;
                }

                #program-navbar ul .is-current {
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

                    .program-navbar-container {
                        overflow: overlay;
                    }

                    .program-navbar-container.program-navbar {
                        top: 64px;
                    }

                    #program-navbar ul li {
                        width: max-content;
                    }
                }
            `}</style>
        </>
    )
}

export default ProgramNav;