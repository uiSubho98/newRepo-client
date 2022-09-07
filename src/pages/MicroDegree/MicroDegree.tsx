import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Consequences from "../../components/Bootcamp/Consequences";
import Curriculum from "../../components/Bootcamp/Curriculum";
import Faqs from "../../components/Bootcamp/Faqs";
import Features from "../../components/Bootcamp/Features";
import Outcomes from "../../components/Bootcamp/Outcomes";
import Overview from "../../components/Bootcamp/Overview";
import ProgramNav from "../../components/Header/ProgramNav";
import CareerServices from "../../components/Home/CareerServices";
import Popup from "../../components/Bootcamp/Popup";
import Companies from "../../components/Home/Companies";
import TestimonialV2 from "../../components/Home/TestimonialV2";
import Layout from "../../components/Layout";
import Benefits from "../../components/MicroDegree/Benefits";
import Hero from "../../components/MicroDegree/Hero";
import Insights from "../../components/MicroDegree/Insights";
import Plans from "../../components/MicroDegree/Plans";
import Spinner from "../../components/Spinner/spinner";
import { G_API_URL } from "../../constants/constants";
import { IState } from "../../interfaces/microdegree";
import { handleRegistrationSrc } from "../../utils/common.util";
import { check_login } from "../../utils/login.util";
import { __getEmail, __getUID } from "../../utils/user-details.util";

interface IParams {
    uid?: number;
    email?: string;
}

const Microdegree = () => {

    const defaultState = {
        countryData: {
            country_name: 'United States',
            country_code: 'US',
            city: 'Los Angeles',
        }
    };
    const [state, setState] = useState<IState>(defaultState);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [rerenderValue, setRerender] = useState<boolean>(false);
    const [registerModalData, setRegisterModalData] = useState<{isVisible: boolean, mode: number,  type:string}>({isVisible: false, mode: 1, type: "syllabus"});

    useEffect(() => {
        const params: IParams = {};
        setLoading(true);

        if(check_login()) {
            params.uid = __getUID();
            params.email = __getEmail();
        }

        axios.get(G_API_URL + "resource/microdegree", {
            params: params
        }).then((response:any) => {
            response = response.data;
            if(response.status === 1) {
                setState({ 
                    ...response.data.content, 
                    countryData: response.countryData,
                    hasPurchased: response.data.hasPurchased 
                });
                setLoading(false);
            }
        }).catch(err => {
            console.log(err)
        });
    }, []);

    const enroll = (sender: string) => {
        const element = document.getElementById("plans");
        handleRegistrationSrc("microdegree-"+sender+"-component")
        if(element) {
            element.scrollIntoView({ 
                behavior: 'smooth' 
            });
        }
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

    const { heroContent, insights, overview, curriculum, testimonial, features, outcomes, consequences, testimonial_alt, collaborators, benefits, careerServices, plans, faqs, hasPurchased, countryData } = state;

    return (
        <>
            {
                !isLoading ?
                <Layout footer={true}>
                    <Helmet>
                        <title>ProGrad | Microdegree</title>
                    </Helmet>
                    <Hero data={heroContent} hasPurchased={hasPurchased} enroll={enroll} />
                    <Insights data={insights} />
                    <ProgramNav />
                    <Overview data={overview} />
                    <Curriculum 
                        data={curriculum} 
                        program={"microdegree"} 
                        handleRegister={handleRegister}
                    />
                    {
                        testimonial &&
                        <TestimonialV2 data={testimonial} />
                    }
                    <Features data={features} />
                    <Outcomes data={outcomes} />
                    <Consequences data={consequences} hasPurchased={hasPurchased} enroll={enroll} from={"microdegree"} />
                    {
                        collaborators &&
                        <Companies data={collaborators} />
                    }
                    <Benefits data={benefits} />
                    {
                        testimonial_alt &&
                        <TestimonialV2 data={testimonial_alt} revert={true} />
                    }
                    {
                        careerServices &&
                        <CareerServices 
                            data={careerServices}
                            program={"micro-degree"} 
                            handleRegister={handleRegister}
                         />
                    }
                    <Popup
                        rerender={() => { setRerender(!rerenderValue) }} 
                        modalData={registerModalData}
                        setModalData={setRegisterModalData}
                        program = {"microdegree"}
                    />
                    <Plans data={plans} countryName={countryData?.country_name} />
                    <Faqs data={faqs}/>
                </Layout> :
                <Spinner />
            }
        </>
    )
}

export default Microdegree;