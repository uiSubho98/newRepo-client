import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { G_API_URL } from "../../constants/constants";
import { IState } from "../../interfaces/bootcamp";
import Hero from "../../components/Bootcamp/Hero";
import Spinner from "../../components/Spinner/spinner";
import Overview from "../../components/Bootcamp/Overview";
import Technologies from "../../components/Bootcamp/Technologies";
import Curriculum from "../../components/Bootcamp/Curriculum";
import TestimonialV2 from "../../components/Home/TestimonialV2";
import Features from "../../components/Bootcamp/Features"; 
import Outcomes from "../../components/Bootcamp/Outcomes";
import Consequences from "../../components/Bootcamp/Consequences";
import Companies from "../../components/Home/Companies";
import CareerServices from "../../components/Home/CareerServices";
import Popup from "../../components/Bootcamp/Popup";
import Faqs from "../../components/Bootcamp/Faqs";
import ProgramNav from "../../components/Header/ProgramNav";
// @ts-ignore
import { useHistory } from "react-router-dom";
import { check_login } from "../../utils/login.util";
import { intermediatePayment } from "../../utils/payment.util";
import { handleRegistrationSrc } from "../../utils/common.util";
import { Helmet } from "react-helmet";
import TestimonialsV4 from "../../components/Home/Testimonials/v4/TestimonialsV4";
import { __getEmail, __getUID } from "../../utils/user-details.util";

interface IParams {
    uid?: number;
    email?: string;
    program_type: string;
}

const Bootcamp = (props: any) => {

    const defaultState = {
        status: 0,
        countryData: {
            country_name: 'United States',
            country_code: 'US',
            city: 'Los Angeles',
        }
    };
    const [state, setState] = useState<IState>(defaultState);
    const [registerModalData, setRegisterModalData] = useState<{isVisible: boolean, mode: number,  type:string}>({isVisible: false, mode: 1, type: "syllabus"});
    const [isLoading, setLoading] = useState<boolean>(false);
    const history = useHistory();
    const {slug} = props.match.params;
    const [rerenderValue, setRerender] = useState<boolean>(false);

    const programs = [
        "MERN-Full-stack-development-part-time",
        "MERN-Full-stack-development-full-time",
        "foundations-of-front-end-development",
        "foundations-of-front-end-development-demo"
    ];

    useEffect(() => {
        if(programs.includes(slug)) {
            const params:IParams = {
                program_type: slug.toLowerCase(),
            };
    
            if(check_login()) {
                params.uid = __getUID();
                params.email = __getEmail();
            }
    
            setLoading(true);
            axios.get(G_API_URL + "resource/bootcamp", {
                params: params
            }).then((response: any) => {
                response = response.data;
                if(response.status === 1) {
                    setState({
                        ...response.data,
                        countryData: response.countryData
                    });
                    setLoading(false);
                }
            }).catch(err => {
                console.log(err)
            });
        } else {
            history.push({
                pathname: "/page-not-found"
            });
        }
    }, [slug]); // eslint-disable-line react-hooks/exhaustive-deps

    const enroll = (sender: string) => {
        // Check if user is logged in 
        if(check_login()) {
            if(!hasPurchased) {
                // Handle the user's payment selection & redirect to checkout
                intermediatePayment('bootcamp', history, slug);
            } else {
                history.push('/learning-dashboard/bootcamp#'+slug);
            }
        } else {
            handleRegistrationSrc("bootcamp-" + sender + "-component");
            history.push('/signup?rurl=/bootcamp&program=bootcamp&action=payment');
        }
    }

    const { status, heroContent, overview, technologies, curriculum, testimonial, features, outcomes, consequences, collaborators, reviews, careerServices, faqs, hasPurchased, countryData } = state;

    let title = "MERN Full Stack Developer Course | Best MERN Stack Course 2021";
    let isMern = programs.slice(2, 3).includes(slug) ? false: true;

    if(!isMern) {
        title = "ProGrad | Foundations of Front End Development Bootcamp";
    }

    const handleRegister = (mode?: number, typ?: string) => {
        
        if(check_login()) {
            setRegisterModalData({isVisible: true, mode: 3, type: typ || " "})
        } else if(mode !== undefined) {
            setRegisterModalData({isVisible: true, mode: mode, type: typ|| " "})
        } else {
            setRegisterModalData({isVisible: true, mode: 1, type: typ || " "})
        } 
    }

    return (
        <>
            {
                !isLoading ?
                <Layout footer={true}>
                    <Helmet>
                        <title>{ title }</title>
                        {
                            isMern &&
                            <meta name="description" content="Best MERN Full Stack Developer course. 
                            Learn MERN Full Stack Development and master Full Stack technologies like 
                            React, Mongo DB, Node.js, Express js, JavaScript etc in just 6 months." /> 
                        }
                        {
                            isMern && 
                            <meta name="keywords" content="MERN Full Stack Developer Course, 
                            MERN Stack Course, Learn MERN Stack Development, MERN Stack Web 
                            Development Course, MERN Stack Bootcamp, MERN Stack Development Course" />
                        }
                    </Helmet>
                    <Hero 
                        data={heroContent} 
                        hasPurchased={hasPurchased} 
                        enroll={enroll} 
                        status={status}
                        countryName={countryData.country_name} 
                    />
                    <Popup
                        rerender={() => { setRerender(!rerenderValue) }}
                        modalData={registerModalData}
                        setModalData={setRegisterModalData}
                        url = {curriculum? curriculum.brochureLink: undefined}
                        program = {"bootcamp"}
                    />
                    <ProgramNav />
                    <Overview data={overview} />
                    <Technologies data={technologies} />
                    <Curriculum 
                        data={curriculum} 
                        program={"bootcamp"} 
                        handleRegister={handleRegister}
                    />

                    {
                        testimonial &&
                        <TestimonialV2 data={testimonial} />
                    }
                    <Features data={features} />
                    {
                        outcomes &&
                        <Outcomes data={outcomes} />
                    }
                    <Consequences data={consequences} hasPurchased={hasPurchased} status={status} enroll={enroll} from={"bootcamp"}/>
                    {
                        collaborators &&
                        <Companies data={collaborators} />
                    }
                    {
                        reviews &&
                        <TestimonialsV4  data={reviews} />
                    }
                    {
                        careerServices &&
                        <CareerServices 
                            data={careerServices}
                            program={"bootcamp"} 
                            handleRegister={handleRegister} 
                        />
                    }
                    {
                        isMern &&
                        <Faqs data={faqs} />
                    }
                </Layout> :
                <Spinner />
            }
        </>
    )
}

export default Bootcamp;