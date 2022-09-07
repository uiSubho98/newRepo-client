import React,{ useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { G_API_URL, TYPE_FORM_URL } from "../../constants/constants";
import Hero from "../../components/HirePrograd/Hero";
import axios from "axios";
import Testimonial from "../../components/HirePrograd/Testimonial";
import Companies from "../../components/Home/Companies";
import Features from "../../components/HirePrograd/Features";
import Contact from "../../components/HirePrograd/Contact"
import Spinner from "../../components/Spinner/spinner";
import { ITestimonial, IFeatureList } from "../../components/HirePrograd/HirePrograd";


const Home = () => {
    interface Contents {
        heroContent :{
            title: string;
            description?: string
            imgSrc?: string
        }
        testimonials: {
            testimonials: Array<ITestimonial>;
            wrapperHeight1920: string;
            wrapperHeight1440: string;
            wrapperHeight1366: string;
            wrapperHeight1024: string;
        };
        companies: {
            backgroundSrc: string;
            title: string;
            list: Array<string>;
        },
        features: {
            title: string;
            featureList: Array<IFeatureList>;
        },
        contact: {
            title: string;
            btn: string;
        }
    }

    const [content,setContent] = useState<Contents>({
        heroContent:{
            title:"",
            description:"",
            imgSrc:""
        },
        testimonials:{
            testimonials: [], 
            wrapperHeight1920: "100px",
            wrapperHeight1440: "100px",
            wrapperHeight1366: "100px",
            wrapperHeight1024: "100px"
        },
        companies: {
            backgroundSrc: "",
            title: "",
            list: []
        },
        features: {
            title:"",
            featureList: [],
        },
        contact: {
            title: "",
            btn: "",
        }
    });
    const [isLoading, setLoading] = useState<boolean>(false);
    
    useEffect(() => {
        setLoading(true);
        axios.get(G_API_URL+"resource/hireprograd")
            .then((response) => {
                response = response.data;
                if(response.status === 1) {
                    setContent(response.data.content);
                    setTimeout(() => {
                        setLoading(false);
                    },1500);
                }
            })
    },[]);

    const handleScroll = () => {
        window.open(TYPE_FORM_URL, "_blank");
    }

    const { 
        heroContent,
        testimonials,
        companies,
        features,
        contact
    } = content;
    
    
    return (
        <>
            {
                !isLoading ?
                <Layout footer={true}> 
            
                    <Hero data={heroContent} handleScroll={handleScroll} />
                    <Testimonial data={testimonials} />
                    <Features data={features} />
                    <Companies data={companies} />
                    <Contact data={contact} handleScroll={handleScroll} />
                </Layout> :
                <Spinner />
            } 
        </>
    )
}

export default Home;
