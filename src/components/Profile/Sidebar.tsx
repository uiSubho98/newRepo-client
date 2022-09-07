import React from "react";
import { Steps } from 'antd';
import { isMobile } from 'react-device-detect';
import LinkedInIcon from "../../assets/icons/svg-icons-v2/linkedin-w.svg";
import GithubIcon from "../../assets/icons/svg-icons-v2/github-w.svg";
import WebsiteIcon from "../../assets/icons/svg-icons-v2/website-w.svg";


interface IProps {
    activeStep: number;
    activeMode: number;
    progress: number;
    profile: any;
    programId: string;
    setActiveStep: Function;
}

const { Step } = Steps;

const Sidebar = (props:IProps) => {

    const { activeStep, activeMode, profile, progress, programId, setActiveStep } = props;

    const steps = [
        {
            title: "Personal Information",
            gist: "Help us know you better personally",
            icon: "icon-user"
        },
        {
            title: "Educational Information",
            gist: "Lets talk about your acadimics",
            icon: "icon-book"
        },
        {
            title: "Professional Information",
            gist: "Share your professional experiences",
            icon: "icon-briefcase"
        },
        {
            title: "Skills",
            gist: "Lets see what you bring to the table",
            icon: "icon-pen-tool"
        },
        {
            title: "Project Experience",
            gist: "Tell us about the projects that you did",
            icon: "icon-layers"
        },      
    ];


    const steps2 = [
        {
            title: "Personal Information",
            gist: "Help us know you better personally",
            icon: "icon-user"
        },
        {
            title: "Educational Information",
            gist: "Lets talk about your acadimics",
            icon: "icon-book"
        },
        {
            title: "Professional Information",
            gist: "Share your professional experiences",
            icon: "icon-briefcase"
        },
        {
            title: "Skills",
            gist: "Lets see what you bring to the table",
            icon: "icon-pen-tool"
        },
        {
            title: "Project Experience",
            gist: "Tell us about the projects that you did",
            icon: "icon-layers"
        },  
        { 
            title: "Company Specific Question",
            gist: "Why this company ?",
            icon: "icon-layers"
        }   
    ];


    const isProfileSetup = profile.isProfileSetup;
    const currentStep = !isProfileSetup ? progress : activeStep;

    const renderSteps = () => {
       if(localStorage.getItem('test')){
        return steps2.map((step, index) =>
        <Step description={
            <div className={`f-d f-ht f-v-c step ${ activeStep === index ? 
            "active" : "" }`}>
                <div className={`${(isProfileSetup || index <= progress)? "c-pointer" 
                : "" } f-d f-h-c f-v-c icon-wrapper`} onClick={() => 
                (isProfileSetup || index <= progress) && setActiveStep(index)}>
                    <i className={`icon ${step.icon}`}></i>
                </div>
                <div className="info">
                    <h4 className="font-heading text-medium title">
                        { step.title }
                    </h4>
                    <span className="gist">{ step.gist }</span>
                </div>
            </div>
        } />
    )
       }
       else {
        return steps.map((step, index) =>
        <Step description={
            <div className={`f-d f-ht f-v-c step ${ activeStep === index ? 
            "active" : "" }`}>
                <div className={`${(isProfileSetup || index <= progress)? "c-pointer" 
                : "" } f-d f-h-c f-v-c icon-wrapper`} onClick={() => 
                (isProfileSetup || index <= progress) && setActiveStep(index)}>
                    <i className={`icon ${step.icon}`}></i>
                </div>
                <div className="info">
                    <h4 className="font-heading text-medium title">
                        { step.title }
                    </h4>
                    <span className="gist">{ step.gist }</span>
                </div>
            </div>
        } />
    )
       }
    }

    if(activeStep===5){
        console.log('Clicked');
    }




    return (
        <>
            <div className="sidebar-wrapper">
                <div className="sidebar">
                     {
                         activeMode === 0 ?
                         <div>
                            <h1 className="font-heading text-large title">
                                {
                                    programId ? "Let’s start with your application" :
                                    !isProfileSetup ? "Setup profile" : "Edit profile"
                                }
                            </h1>
                            <p className="desc">
                                Details mentioned here will also be updated to your Profile
                            </p>
                        </div> :
                        <div className="f-d f-v-c profile-details">
                            <img src={profile.profilePic} alt="profile-pic" 
                            className="profile-pic" />
                            <div className="info">
                                <h1 className="font-heading text-large name">
                                    { profile.firstName + " " + profile.lastName }
                                </h1>
                                <div className="links">
                                    {
                                        profile.linkedin &&
                                        <img src={LinkedInIcon} alt="LinkedIn" className="c-pointer"
                                        onClick={() => window.open(profile.linkedin, "_blank")} />
                                    }
                                    {
                                        profile.github &&
                                        <img src={GithubIcon} alt="Github" className="c-pointer" 
                                        onClick={() => window.open(profile.github, "_blank")} />
                                    }
                                    {
                                        profile.website &&
                                        <img src={WebsiteIcon} alt="Portfolio" className="c-pointer"
                                        onClick={() => window.open(profile.website, "_blank")} />
                                    }
                                </div>
                            </div>
                        </div>
                     }
                    <Steps className="steps" current={currentStep} 
                    direction={isMobile ? "horizontal" : "vertical"} progressDot>
                        { renderSteps() }
                    </Steps>

                    {/* <div className="steps" >
                    { renderSteps2() }
                    </div> */}
                </div>
            </div>
            <style jsx>{`
                .sidebar {
                    position: fixed;
                    width: 33.33333%;
                }

                .sidebar .title {
                    line-height: 1;
                    white-space: pre-wrap;
                }

                .sidebar .desc {
                    margin: var(--peaky-gap-8) 0 0 0;
                    opacity: 87%;
                }

                .sidebar .profile-details .profile-pic {
                    height: 100px;
                    width: 100px;
                    border-radius: 50%;
                }

                .sidebar .profile-details .info {
                    margin-left: var(--peaky-gap-32);
                }

                .sidebar .profile-details .info .links img {
                    margin-right: var(--peaky-gap-32);
                }

                .sidebar .steps {
                    margin: var(--peaky-gap-48) 0 0 0;
                    width: 90%;
                }

                .sidebar .step .icon-wrapper {
                    background-color: var(--secondary-bg);
                    border-radius: var(--peaky-br-full);
                    padding: var(--peaky-pad-16);
                }

                .sidebar .step.active .icon-wrapper {
                    background: linear-gradient(180deg, #0E7DED 1.47%, #1739E6 101.42%);
                }

                .sidebar .step .icon-wrapper .icon {
                    color: var(--davy-grey);
                    font-size: 24px;
                }

                .sidebar .step.active .icon-wrapper .icon {
                    color: var(--dove);
                }

                .sidebar .step .info {
                    margin: 0 0 0 var(--peaky-gap-32);
                }

                .sidebar .step.active .info .title { 
                    color: var(--primary);
                }

                .sidebar .step .info .gist {
                    opacity: 75%;
                }

                .ant-steps-item-title, .ant-steps-item-description {
                    color: var(--dove) !important;
                }

                .ant-steps-icon-dot {
                    background: var(--dove) !important;
                }

                .ant-steps-item-finish .ant-steps-item-icon > 
                .ant-steps-icon .ant-steps-icon-dot,
                .ant-steps-item-process .ant-steps-item-icon > 
                .ant-steps-icon .ant-steps-icon-dot {
                    background: #1890ff !important;
                }

                .ant-steps-dot .ant-steps-item-content {
                    width: unset;
                }

                .ant-steps-vertical.ant-steps-dot .ant-steps-item > 
                .ant-steps-item-container > .ant-steps-item-tail {
                    left: 100%;
                }

                .ant-steps-vertical > .ant-steps-item > 
                .ant-steps-item-container > .ant-steps-item-tail::after {
                    width: 2px;
                }

                .ant-steps-dot .ant-steps-item-tail::after {
                    margin-left: -6px;
                }

                .ant-steps-vertical.ant-steps-dot .ant-steps-item > 
                .ant-steps-item-container > .ant-steps-item-tail {
                    top: 25px;
                    padding: 0;
                }

                .ant-steps-item-wait > .ant-steps-item-container > 
                .ant-steps-item-tail::after, .ant-steps-item-process > 
                .ant-steps-item-container > .ant-steps-item-tail::after {
                    background-color: var(--dove);
                    opacity: 10%;
                }

                .ant-steps-item-finish > .ant-steps-item-container > 
                .ant-steps-item-tail::after {
                    background-color: var(--primary);
                }

                .ant-steps-icon-dot {
                    background: var(--secondary-bg) !important;
                }

                .ant-steps-vertical .ant-steps-item-icon {
                    float: right;
                }

                .ant-steps-vertical .ant-steps-item-icon {
                    margin-right: 0;
                }

                .ant-steps-dot .ant-steps-item-icon {
                    height: 10px;
                    width: 10px;
                }

                .ant-steps-vertical.ant-steps-dot .ant-steps-item-icon {
                    margin-top: 25px;
                }

                .ant-steps-item-finish .ant-steps-item-icon > 
                .ant-steps-icon .ant-steps-icon-dot, 
                .ant-steps-item-process .ant-steps-item-icon > 
                .ant-steps-icon .ant-steps-icon-dot {
                    background: var(--primary) !important;
                }

                .ant-steps-vertical.ant-steps-dot .ant-steps-item-process 
                .ant-steps-icon-dot {
                    left: 0;
                }

                .ant-steps-vertical .ant-steps-item-description {
                    padding-bottom: var(--peaky-gap-48);
                }

                .ant-steps-vertical .ant-steps-item-description
                :nth-of-type(4) {
                    padding-bottom: 0;
                }

                @media only screen and (max-device-width: 760px) {
                    .sidebar {
                        position: unset;
                        width: 100%;
                    }

                    .sidebar .steps {
                        display: none;
                    }

                    .profile-info-wrapper {
                        margin: var(--peaky-gap-32) 0 0 !important;
                    }
                }
            `}</style>
        </>
    )
}

export default Sidebar;