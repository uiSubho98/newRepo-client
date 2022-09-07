import React, { useEffect, useState } from "react";
// @ts-ignore
import { useLocation } from "react-router-dom";
import axios from "axios";
import Layout from "../../components/Layout";
import Sidebar from "../../components/Profile/Sidebar";
import ProfileForm from "../../components/Profile/ProfileForm";
import ProfileInfo from "../../components/Profile/ProfileInfo";
import ProfileNav from "../../components/Profile/ProfileNav";
import { G_API_URL } from "../../constants/constants";
import { __getToken } from "../../utils/user-details.util";
import Spinner from "../../components/Spinner/spinner";

const Profile = () => {

    const defaultState = {
        activeStep: 0,
        mode: 1,
        progress: 0,
        isLoading: false,
        isScrolled: false,
        degrees: [],
        states: []
    }

    const [state, setState] = useState<any>(defaultState);
    const [profile, setProfile] = useState();

    const location = useLocation();

    const programId = location?.state?.program_id;

    const { 
        activeStep, 
        degrees, 
        mode, 
        progress, 
        isLoading, 
        isScrolled, 
        states 
    } = state;

    useEffect(() => {

        window.onscroll = () => {
            const sections = document.querySelectorAll("section");
            let current:any = "";
            for(let index = 0; index < sections.length; index++) {
                const sectionTop = sections[index].offsetTop - 272;
                if (window.pageYOffset <= sectionTop ) {
                    current = sections[index].getAttribute("id"); 
                    switch (current) {
                        case "personal-information":
                            setActiveStep(0, true);
                            break;
                        case "educational-information":
                            setActiveStep(1, true);
                            break;
                        case "professional-information":
                            setActiveStep(2, true);
                            break;
                        case "skills-section":
                            setActiveStep(3, true);
                            break;
                        case "project-experience":
                            setActiveStep(4, true);
                            break;
                            case "project-experienceabc":
                            setActiveStep(5, true);
                            break;
                        default:
                            break;
                    }
                    break;
                }
            }
        }

        setState((prev:any) => ({
            ...prev,
            isLoading: true
        }));
        axios.get(G_API_URL + "profile/", {
            headers: {
                Authorization: __getToken()
            }
        }).then((response: any) => {
            response = response.data;
            if(response.status === 1) {
                setProfile(response.data);
                setState((prev:any) => ({
                    ...prev,
                    mode: response.data.isProfileSetup ? 1 : 0,
                    states: response.states,
                    degrees: response.degrees
                }));
            }
            setState((prev:any) => ({
                ...prev,
                isLoading: false
            }));
        }).catch((error) => {
            console.log(error);
        });
    // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if(!isScrolled) {
            let element;
            switch (activeStep) {
                case 0:
                    element = document.getElementById("personal-information");
                    break;
                case 1:
                    element = document.getElementById("educational-information");
                    break;
                case 2:
                    element = document.getElementById("professional-information");
                    break;
                case 3:
                    element = document.getElementById("skills-section");
                    break;
                case 4:
                    element = document.getElementById("project-experience");
                    break;
                    case 5:
                    element = document.getElementById("project-experienceabc");
                    break;
                default:
                    element = undefined;
            }
    
            if(element) {
                // element.scrollIntoView({ behavior: 'smooth' });
                var topOfElement = element.offsetTop - 272;
                window.scroll({ top: topOfElement });
            }
        }
    }, [activeStep, isScrolled]);

    const setActiveStep = (activeStep: number, isScrolled: boolean = false) => {
        setState((prev:any) => ({
            ...prev,
            ...(mode === 0 && progress < activeStep && {
                progress: activeStep
            }),
            activeStep,
            isScrolled
        }));
    }

    const setMode = (mode: number) => {
        setState((prev:any) => ({
            ...prev,
            mode
        }));
    }

    return (
        <Layout>
            {
                !isLoading && profile ?
                <>
                    <ProfileNav />
                    <div className="g-d g-col-s-b g-col-1-m lr-pad-d lr-pad-m 
                    tb-pad-d tb-pad-m profile-wrapper">
                        <Sidebar 
                            activeStep={activeStep} 
                            progress={progress}
                            activeMode={mode} 
                            profile={profile}
                            programId={programId}
                            setActiveStep={setActiveStep} 
                        />
                        {
                            mode === 0 ?
                            <ProfileForm 
                                activeStep={activeStep}
                                degrees={degrees}
                                states={states}
                                progress={progress}
                                profile={profile}
                                programId={programId}
                                setActiveStep={setActiveStep} 
                            /> :
                            <ProfileInfo 
                                profile={profile}
                                setMode={setMode}
        
                            />
                        }
                    </div>
                </> :
                <Spinner />
            }
            <style jsx>{`
                .profile-wrapper .edit-btn {
                    background: linear-gradient(var(--primary), var(--primary-grad)) !important;
                    border: 0;
                    border-radius: var(--peaky-br-full);
                    bottom: 64px;
                    color: var(--dove);
                    height: 50px;
                    position: fixed;
                    right: 64px;
                    width: 50px;
                }

                .profile-wrapper .project-card,
                .profile-wrapper .company-card {
                    background-color: #383838;
                    border-radius: var(--peaky-br-4);
                    color: var(--dove);
                    padding: var(--peaky-pad-32);
                    margin: 0 0 var(--peaky-gap-32);
                }

                .profile-wrapper .project-card .name,
                .profile-wrapper .company-card .designation {
                    color: var(--primary);
                }

                .profile-wrapper .project-card .description {
                    margin: var(--peaky-gap-16) 0 0;
                    color: #999999;
                }

                .profile-wrapper .company-card > p {
                    margin: var(--peaky-gap-4) 0 0;
                }
            `}</style>
        </Layout>
    )
}

export default Profile;