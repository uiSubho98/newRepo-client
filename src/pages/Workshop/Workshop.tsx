import React, { useEffect, useState } from "react";
import axios from "axios";
// @ts-ignore
import { Helmet } from 'react-helmet';
import Layout from "../../components/Layout";
import { G_API_URL } from "../../constants/constants";
import Hero from "../../components/Workshop/Hero";
import Overview from "../../components/Workshop/Overview";
import Projects from "../../components/Workshop/Projects";
import Insight from "../../components/Workshop/Insight";
import Banner from "../../components/Workshop/Banner";
import WorkshopSkeleton from "../../components/Skeletons/WorkshopSkeleton";

interface IStep {
    insight?: string;
    imageSrc?: string;
    imageSrc1?: string;
}

interface IContent {
    heroContent?: object;
    overview?: object;
    projectInfo?: Array<IStep>;
    certificateLink?: string;
    enrollFormLink?: string;
}

const Workshop = () => {
    const defaultState = {
        heroContent: {},
        overview: {},
        projectInfo: [],
        certificateLink: ""
    }

    const [content, setContent] = useState<IContent>(defaultState);
    const [isLoading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        axios.get(G_API_URL+"resource/workshop")
        .then((response) => {
            response = response.data;
            if(response.status) {
                setContent(response.data.content);
            }
            setTimeout(() => {
                setLoading(false);
            }, 1500);
        });
    },[]);

    const {
        heroContent,
        overview,
        projectInfo,
        certificateLink
    } = content;

    return (
        <Layout footer={true}> 
            <Helmet>
                <title>ProGrad | Workshop</title>
            </Helmet>
            { 
                !isLoading ?
                <>
                    <Hero data={heroContent} />
                    <Overview data={overview} />
                    <Projects data={projectInfo} />
                    <Insight imageSrc={certificateLink} />
                    <Banner />
                </> : 
                <WorkshopSkeleton />
            }
        </Layout>
    )
}

export default Workshop;