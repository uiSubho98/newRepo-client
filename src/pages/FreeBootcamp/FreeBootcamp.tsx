import React,{ useEffect, useState } from "react";
// @ts-ignore
import { Helmet } from 'react-helmet';
import Layout from "../../components/Layout";
import { G_API_URL } from "../../constants/constants";
import Hero from "../../components/FreeBootcamp/Hero";
import Overview from "../../components/FreeBootcamp/Overview";
import ProgramPlan from "../../components/FreeBootcamp/Plan";
import JoiningProcess from "../../components/FreeBootcamp/JoiningProcess";
import Outcomes from "../../components/FreeBootcamp/Outcomes";
import ProgramReward from "../../components/FreeBootcamp/Reward";
import Faqs from "../../components/FreeBootcamp/Faqs";
import BootcampSkeleton from "../../components/Skeletons/BootcampSkeleton";
import axios from "axios";

interface Contents {
    heroContent ?: object;
    programOverview ?: object;
    plan ?: object;
    joiningProcess ?: object;
    programOutcomes ?: object;
    reward ?: object;
    faqs ?: object;
}

const FreeBootcamp = () => {

    const [content,setContent] = useState<Contents>({});
    const [isLoading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        axios.get(G_API_URL+"resource/free/bootcamp")
            .then((response) => {
                response = response.data;
                if(response.status === 1) {
                    setContent(response.data.content);
                    setTimeout(() => {
                        setLoading(false);
                    }, 1500);
                }
            })
    },[]);

    const {
        heroContent,
        programOverview,
        plan,
        joiningProcess,
        programOutcomes,
        reward,
        faqs
    } = content;

    return (
        <Layout footer={true}>
            <Helmet>
                <title>ProGrad | Free Bootcamp</title>
            </Helmet>
            {
                !isLoading ?
                <>
                    <Hero data={heroContent} />
                    <Overview data={programOverview} />
                    <ProgramPlan data={plan} />
                    <JoiningProcess data={joiningProcess} />
                    <Outcomes data={programOutcomes} />
                    <ProgramReward data={reward} />
                    <Faqs data={faqs} />
                </> :
                <BootcampSkeleton />
            }
        </Layout>
    )
}

export default FreeBootcamp;