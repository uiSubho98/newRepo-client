import React,{ useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { G_API_URL } from "../../constants/constants";
import Companies from "../../components/Home/Companies";
import axios from "axios";
import Hero from "../../components/CareerServices/Hero";
import Features from "../../components/CareerServices/Features";
import Join from "../../components/CareerServices/Join";
import Fees from "../../components/CareerServices/Fees";
import Overview from "../../components/Bootcamp/Overview";
import Schedule from "../../components/CareerServices/Schedule"
import TestimonialV2 from "../../components/Home/TestimonialV2";
import Faqs from '../../components/Bootcamp/Faqs'
import ProgramNav from "../../components/Header/ProgramNav";
import Spinner from "../../components/Spinner/spinner";
import {IFeatureList, IProgramOverviewList, IPhase1List , IFeeList, IJoinList, IFaqs, IOverview, ICountryData } from "../../interfaces/CareerServices";


const CareerServices = () => {
    interface Contents {
        heroContent :{
            title: string;
            description: string
            imgSrc: string
            highlights:Array<string>;
        }
        testimonials: {
            list: Array<string>;
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
        schedule_1: {
            title: string;
            imgSrc: string;
            heading: string;
            desc: string;
            outcomes:Array<string>;
            phase1List: Array<IPhase1List>;
        },
        schedule_2: {
            title: string;
            imgSrc: string;
            heading: string;
            desc: string;
            outcomes:Array<string>;
            phase1List: Array<IPhase1List>;
        },
        schedule_3: {
            title: string;
            imgSrc: string;
            heading: string;
            desc: string;
            outcomes:Array<string>;
            phase1List: Array<IPhase1List>;
        },
        testimonial : {
            imgSrc: string;
            text: string;
            author: string;
            authorClass: string;
        }
        programOverview: {
            title: string;
            programOverviewList: Array<IProgramOverviewList>;
        },
        join: {
            title: string;
            desc: string;
            joinList: Array<IJoinList>;
        },
        fee: {
            title: string;
            desc: string;
            feeList: Array<IFeeList>;
        },
        faqs?: IFaqs;
        overview?: IOverview;
        countryData: ICountryData;
    }


    const [content,setContent] = useState<Contents>({
        heroContent:{
            title:"",
            description:"",
            imgSrc:"",
            highlights:[]
        },
        testimonials:{
            list: [], 
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
        schedule_1: {
            title:"",
            imgSrc:"",
            heading: "",
            desc:"",
            outcomes:[],
            phase1List: [],
        },
        schedule_2: {
            title:"",
            imgSrc:"",
            heading: "",
            desc:"",
            outcomes:[],
            phase1List: [],
        },
        schedule_3: {
            title:"",
            imgSrc:"",
            heading: "",
            desc:"",
            outcomes:[],
            phase1List: [],
        },
        testimonial:{
            imgSrc: "",
            text: "",
            author: "",
            authorClass: "",
        },
        programOverview:{
            title: "",
            programOverviewList: [],
        },
        join: {
            title: "",
            desc: "",
            joinList: [],
        },
        fee: {
            title: "",
            desc: "",
            feeList: [],
        },
        faqs :{
            title: "",
            data:[],
        },
        overview :{
            title:"",
            list:[]
        },
        countryData: {
            country_code: "US",
            country_name: "United States",
            currency: "USD"
        }
    });
    const [isLoading, setLoading] = useState<boolean>(false);
    
    useEffect(() => {
        setLoading(true);
        axios.get(G_API_URL+"resource/career-services")
            .then((response: any) => {
                response = response.data;
                if(response.status === 1) {
                    setContent(prev =>
                        ({
                            ...prev,
                            ...response.data.content,
                            countryData: response.countryData
                        }));
                    setTimeout(() => {
                        setLoading(false);
                    },1500);
                }
            })
    },[]);

    const { 
        heroContent,
        testimonials,
        companies,
        schedule_1,
        schedule_2,
        schedule_3,
        testimonial,
        overview,
        join,
        fee,
        features,
        faqs,
        countryData
    } = content;

    return (
        <>
        {
            !isLoading ? 
            <Layout footer={true}> 
                <Hero data={heroContent} lists={testimonials} />
                <Features data={features} />
                <Companies data={companies} />
                <ProgramNav />
                <Overview data={overview} from = {"career-services"} />
                <Schedule data={schedule_1} />
                <Schedule data={schedule_2} rowReverse ={"true"} />
                <Schedule data={schedule_3} />
                {testimonial &&
                    <TestimonialV2 data={testimonial} revert ={true} />
                }
                <Join data={join} />
                <Fees data={fee} country={countryData.country_name} />
                <Faqs data={faqs} />
            </Layout>:
            <Spinner />
        } 
        </>
    ) 
}

export default CareerServices;