import React,{ useEffect, useState } from "react";
// @ts-ignore
import { Helmet } from 'react-helmet';
import {decodeToken, __getToken} from "../../utils/user-details.util";
import Layout from "../../components/Layout";
import Hero from "../../components/BootcampDashboard/Hero";
import LearningPath from "../../components/BootcampDashboard/LearningPath";
// import PaymentBanner from "../../components/Dashboard/PaymentBanner";
import ProjectInfoBanner from "../../components/BootcampDashboard/ProjectInfoBanner";
import RedirectForm from "../../components/BootcampDashboard/RedirectForm";
// @ts-ignore
import jwtDecode from "jwt-decode";
import axios, { AxiosResponse } from "axios";
import { G_URL, G_API_URL } from "../../constants/constants";
import { check_login } from "../../utils/login.util";
// @ts-ignore
import prograd_pink_logo from "../../assets/brand/FavIcon/favicon.ico";
import Spinner from "../../components/Spinner/spinner";
import { IDecodedToken } from "../../components/MicrodegreeDashboard/microdegreeDashboard";

interface IDetails {
    slot_ts: number;
    slot_id: string;
    att: string;
}

interface IWorkshopInfo {
    att: string;
    details: IDetails | null;
}

// interface IWorkshopSources {
//     certificate?: string;
//     report?: string;
//     project?: string;
//     view_status?: number;
// }

interface IDashboard {
    heroContent?: object;
    learningContent?: object;
    reward?: object;
    isProjectSubmitted?: boolean;
    isProjectCompleted?: boolean;
    isProjectReviewed?: boolean;
    workshopInfo?: IWorkshopInfo;
    // workshopSources?: IWorkshopSources;
    liveclassInfo?: any;
    hasStartedLearning?: boolean;
    mentorMessage?: string;
    enrollmentInfo?: object;
    discordId?: string;
    onboardStatus?: object;
    programType?: string;
    progress?: object;
    hasPurchased?: boolean;
    decodedToken: IDecodedToken;
}

const Dashboard = () => {

    const [ content, setContent ] = useState<IDashboard>({decodedToken: decodeToken()});
    const [isLoading, setLoading] = useState<boolean>(false);

    // Check if user is not subscribed to bootcamp
    if (content.decodedToken.subscriptions.bootcamp === false) {
        window.location.href = G_URL;
    }
    const isLoggedIn = check_login();

    useEffect(() => {
        const dashboardInit = async () => {
            const decodedToken = jwtDecode(__getToken());
    
            const data = {
                params: {
                    programType: "bootcamp"
                }
            }
                
            const headers = {
                headers: {
                    Authorization : __getToken()
                }
            }
            
            setContent({decodedToken:decodedToken,programType:"bootcamp"});
            setLoading(true);
            await axios.get(G_API_URL+"resource/bootcamp/dashboard-content", 
            {
                params: {
                    programType: "bootcamp",
                    from: "dashboard"
                },
                ...headers
            }).then((response: AxiosResponse) => {
                const resp = response.data;
                if(resp.status === 1) {
                    setContent(prev=>({...prev,...resp.data.content,
                        isProjectSubmitted: resp.isProjectSubmitted,
                        isProjectCompleted: resp.isProjectCompleted,
                        isProjectReviewed: resp.isProjectReviewed,
                        workshopInfo: resp.workshopInfo,
                        // workshopSources: resp.workshopSources,
                        hasStartedLearning: resp.hasStartedLearning,
                        liveclassInfo: resp.liveclassInfo,
                        mentorMessage: resp.mentorMessage,
                        enrollmentInfo: resp.enrollmentInfo,
                        discordId: resp.discordId
                    }));
                    setLoading(false);
                }
            });
    
            await axios.get(G_API_URL+"progress/", {
                ...data,...headers
            })
            .then((response: AxiosResponse) => {
                const resp = response.data;
                if(resp.status === 1) {
                    setContent(prev => (
                        {
                            ...prev,
                            onboardStatus: resp.data.bootcampOnboarding,
                            progress: resp.data.bootcampProgress,
                            hasPurchased: resp.hasPurchased
                        }
                    ));
                }
            });
        }
        dashboardInit();
    },[]);

    const redirect = (r_path: string) => {
        if(isLoggedIn) {
        // Update the value of r_path
            (document.getElementById('r_path') as 
            HTMLInputElement).value = r_path;
            (document.getElementById('learning_redirect') as 
            HTMLFormElement).submit();
        } else {
            redirectToLogin();
        }
    }

    const redirectToLogin = () => {
        window.location.href = G_URL + 'login';
    }
    
    const { 
        heroContent, 
        learningContent, 
        reward, 
        onboardStatus, 
        programType,
        progress,
        hasPurchased,
        decodedToken, 
        isProjectSubmitted,
        isProjectCompleted,
        isProjectReviewed,
        workshopInfo,
        // workshopSources,
        liveclassInfo,
        mentorMessage,
        // enrollmentInfo,
        hasStartedLearning,
        discordId } = content;
    return (
        <>
            { 
                !isLoading ?
                <Layout navAction="Bootcamp">
                    <Helmet>
                        <link 
                            rel="icon" 
                            type="image/png" 
                            href={prograd_pink_logo} 
                            sizes="16x16" 
                        />
                        <title>ProGrad | Bootcamp Dashboard</title>
                    </Helmet>
                    <Hero 
                        decodedToken= {decodedToken} 
                        data= {heroContent} 
                        discordId={discordId}
                        isProjectSubmitted= {isProjectSubmitted} 
                        workshopInfo = {workshopInfo}
                        // workshopSources = {workshopSources}
                        liveclassInfo = {liveclassInfo}
                        onboardStatus = {onboardStatus}
                        hasPurchased = {hasPurchased}
                        programType = {programType}
                        progress = {progress}
                        learningContent={learningContent}
                        hasStartedLearning = {hasStartedLearning}
                        redirect = { redirect }
                    />

                    <ProjectInfoBanner
                        isProjectSubmitted = {isProjectSubmitted}
                        isProjectCompleted = {isProjectCompleted}
                        isProjectReviewed = {isProjectReviewed}
                        mentorMessage = {mentorMessage}
                    />

                    {/* <PaymentBanner 
                        onboardStatus = {onboardStatus}
                        enrollmentInfo = {enrollmentInfo}
                        purchaseStatus= {hasPurchased}
                        workshopInfo = { workshopInfo } 
                    /> */}

                    <LearningPath 
                        data= {learningContent} 
                        progress= {progress} 
                        onboardStatus= {onboardStatus}
                        hasPurchased = {hasPurchased}
                        reward={reward} 
                    />
                    <RedirectForm />
                </Layout> :
                <Spinner />
            }
        </>
    )
}

export default Dashboard;