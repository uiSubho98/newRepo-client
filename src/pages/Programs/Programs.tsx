import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import Layout from "../../components/Layout";
import Hero from "../../components/Programs/Hero";
import ProgramsList from "../../components/Programs/ProgramsList";
import Features from "../../components/Bootcamp/Features";
import Consequences from "../../components/Programs/Consequences";
import Spinner from "../../components/Spinner/spinner";
import { G_API_URL } from "../../constants/constants";
import { IContent } from "../../interfaces/students";
import { __getUID } from "../../utils/user-details.util";

const Programs = () => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [content, setContent] = useState<IContent>();

    useEffect(() => {
        setLoading(true);
        axios.get(G_API_URL + "resource/students/", {
            params: {
                uid: __getUID()
            }
        }).then((response) => {
            response = response.data;
            if(response.status === 1) {
                console.log(response.data)
                setContent(response.data);
                setTimeout(() => {
                    setLoading(false);
                },1500);
            }
        }).catch((error) => {
            console.error(error);
        });
    }, [])

    // const { hero_content, programs, features, consequences } = content;
    return (
        <>
            {
                !isLoading && content ?
                <Layout footer={true}>
                    <Helmet>
                        <title>ProGrad | Programs</title>
                    </Helmet>
                    <Hero data={content.hero_content} />
                    <ProgramsList data={content.programs} />
                    <Features data={content.features} />
                    <Consequences data={content.consequences} />
                </Layout> :
                <Spinner />
            }
        </>
    )
}

export default Programs;