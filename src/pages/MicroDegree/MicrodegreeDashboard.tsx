import React, { useEffect, useState } from "react";
// @ts-ignore
import { Helmet } from 'react-helmet';
import Layout from "../../components/Layout";
import Hero from "../../components/MicrodegreeDashboard/Hero";
import LearningPath from "../../components/MicrodegreeDashboard/LearningPath";
import axios from "axios";
import { G_HOME_URL, G_API_URL, G_URL } from "../../constants/constants";
import { decodeToken, __getToken, __getEmail } from '../../utils/user-details.util';
// @ts-ignore
import prograd_pink_logo from "../../assets/brand/FavIcon/favicon.ico";
import { IDecodedToken, IWorkshopInfo, IWorkshopSources } from "../../components/MicrodegreeDashboard/microdegreeDashboard";
// @ts-ignore
import { Link } from "react-router-dom";
import { check_login, isVerified } from "../../utils/login.util";

interface IDashboard {
    heroContent?: object;
    learningContent?: object;
    reward?: object;
    decodedToken: IDecodedToken;
    userGroup?: Array<number>
    userProgress?: any
    countryData?: {
        city: string;
        countryCode: string
        countryName: string
    },
    timeZones?: object,
    onetimePrice?: object
    discordId?: string,
    workshopInfo?: IWorkshopInfo
    workshopSources?: IWorkshopSources
    hasStartedLearning?: boolean
    liveclassInfo?: any;
}

const MicrodegreeDashboard = () => {

    const [content, setContent] = useState<IDashboard>({ decodedToken: decodeToken() });
    const [isLoading, setLoading] = useState<boolean>(true);

    if(!check_login()) {
        window.location.href = G_URL + 'login';
    }
    // Check if user is not subscribed to microdegree
    if(content.decodedToken.subscriptions.microdegree === false) {
        window.location.href = G_HOME_URL;
    }

    useEffect(() => {
        setLoading(true);
        Promise.all([
            axios.get(G_API_URL + "resource/microdegree/dashboard-content", {
                params: {
                    programType: "microdegree",
                    from: "dashboard"
                },
                headers: {
                    Authorization: __getToken()
                }
            }),
            axios.get(G_API_URL + `resource/group/${__getEmail()}`),
            axios.get(G_API_URL + `progress/?programType=microdegree`, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": __getToken()
                }
            })
        ]).then(res => {
            var updatedContent = {}
            if (res[0].data.status === 1) {
                updatedContent = { ...updatedContent, ...res[0].data.data.content, countryData:{
                        city: res[0].data.countryData.city,
                        countryCode: res[0].data.countryData.country_code,
                        countryName: res[0].data.countryData.country_name,
                    },
                    onetimePrice: res[0].data.data.content.price,
                    discordId: res[0].data.discordId,
                    hasStartedLearning: res[0].data.hasStartedLearning,
                    workshopInfo: res[0].data.workshopInfo,
                    workshopSources: res[0].data.workshopSources,
                    liveclassInfo: res[0].data.liveclassInfo,
                }
            }
            if (res[1].status === 200) {
                const { group } = res[1].data.data;
                updatedContent = { ...updatedContent, userGroup: group }
            } else {
                updatedContent = { ...updatedContent, userGroup: [0] }
            }

            if (res[2].data.status === 1) {
                let { data } = res[2].data;

                updatedContent = { ...updatedContent, userProgress: { ...data } }
            }

            // Update the content state
            setContent(previousState => ({
                ...previousState,
                ...updatedContent
            }))
            setLoading(false);
        }).catch(err => {
            console.log(err)
        })
    }, []);

    const { heroContent, learningContent, reward, decodedToken, userGroup, userProgress, countryData, timeZones, onetimePrice, discordId, workshopInfo, workshopSources, hasStartedLearning, liveclassInfo } = content;

    return (
        <>
            {
                !isLoading &&
                <Layout footer={true} navAction="Microdegree">
                    {!isVerified() && <div className="verify-acc-banner w-100">
                        Please verify your account before moving further. <Link to='/verify'><span className="verify-now-btn c-pointer">Verify Now</span></Link>
                    </div>}
                    <Helmet>
                        <link 
                            rel="icon" 
                            type="image/png" 
                            href={prograd_pink_logo} 
                            sizes="16x16" 
                        />
                        <title>Prograd | Microdegree Dashboard</title>
                    </Helmet>
                    <Hero 
                        decodedToken={decodedToken} 
                        data={heroContent} 
                        onboarding={userProgress.onboarding}
                        discordId={discordId}
                        progress={userProgress.progress}
                        purchase={userProgress.purchase}
                        workshopInfo = {workshopInfo}
                        workshopSources = {workshopSources}
                        hasStartedLearning= {hasStartedLearning}
                        liveclassInfo={liveclassInfo}
                    />
                    <LearningPath 
                        data={learningContent} 
                        reward={reward} 
                        userGroup={userGroup} 
                        userProgress={userProgress}
                        countryData={countryData}
                        timeZones={timeZones}
                        onetimePrice={onetimePrice}
                    />
                    <style jsx>{`
                        .verify-acc-banner {
                            position: fixed;
                            padding-right: 6rem;
                            padding-left: 6rem;
                            padding-top: 16px;
                            padding-bottom: 16px;
                            background-color: #f4effb;
                            z-index: 1000;
                        }

                        .verify-acc-banner .verify-now-btn {
                            color: var(--purple);
                            text-decoration: underline;
                        }
                    `}</style>
                </Layout>
            }
        </>
    )
}

export default MicrodegreeDashboard;