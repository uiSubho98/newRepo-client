import React,{ useEffect, useState} from "react";
// @ts-ignore
import { Helmet } from 'react-helmet';
import Layout from "../../components/Layout";
import Hero from "../../components/Certificate/Hero";
import axios from "axios";
import { G_API_URL } from "../../constants/constants";
import { __getToken } from "../../utils/user-details.util";
import { RouteComponentProps } from "react-router";

interface IContent {
    cert_link?: string;
    folder?: string;
    unique_id?: string;
}

interface MatchParams {
    slug: string
    programType: string
}

interface ICertificateProps extends RouteComponentProps<MatchParams> {

}

const Certificate = (props: ICertificateProps) => {

    const defaultContent = {
        cert_link: "",
        folder: "",
        unique_id:""
    }

    const [content, setContent] = useState<IContent>(defaultContent);
    const {slug, programType} = props.match.params;
    useEffect(() => {
        
        const payload = {
            params:{
                slug: slug,
                programType
            },
            headers: {
                Authorization: __getToken()
            }
        }
        axios.get(G_API_URL+"progress/bootcamp/certificate",payload)
        .then((response) => {
            response = response.data;
            if(response.status) {
                setContent(response.data);
            }
        })
    },[slug, programType]);
    let title = programType.charAt(0).toUpperCase() + programType.slice(1,) 
    + " Certification";
    return (
        <>
            <Layout navAction="Account">
                <Helmet>
                    <title>ProGrad | {title}</title>
                </Helmet>
                <Hero data={content} slug={slug} programType={programType}/>
            </Layout>
        </>
    )
}

export default Certificate;