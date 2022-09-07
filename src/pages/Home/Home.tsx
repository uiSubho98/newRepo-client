import React,{ useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import Layout from "../../components/Layout";
import { G_API_URL } from "../../constants/constants";
import Hero from "../../components/Home/Hero";
import ProgramsV3 from "../../components/Home/ProgramsV3";
import axios from "axios";
import TestimonialsV4 from "../../components/Home/Testimonials/v4/TestimonialsV4";
import Companies from "../../components/Home/Companies";
import CareerServices from "../../components/Home/CareerServices";
import OurStoryBlock from "../../components/Home/OurStoryBlock";
import queryString from "query-string";
import { openNotification } from "../../utils/common.util";
import { login_user } from "../../utils/login.util";
import { useHistory } from "react-router";
import { encrypt } from "../../utils/encryption.util";
import { check_login } from "../../utils/login.util";
import Popup from "../../components/Bootcamp/Popup";
import Achievements from "../../components/Home/Achievements";
import content from "../../json/home.json";

const Home = () => {

    const [rerenderValue, setRerender] = useState<boolean>(false);
    const [registerModalData, setRegisterModalData] = useState<{isVisible: boolean, mode: number,  type:string}>({isVisible: false, mode: 1, type: "syllabus"});


    const history = useHistory();

    const getSearchParam = (param: string) => {
        const urlParams = new URLSearchParams(window.location.search);
        let paramValue = urlParams.get(param);
        return paramValue;
    }
    
    useEffect(() => {
        // Get url params to verify user email
        const redirectUrl = getSearchParam('rurl');
        const email_vcode = getSearchParam('vcode');
        const user_email = getSearchParam('email');
        
        // Make call Email verification API
        if (email_vcode !== undefined && user_email !== undefined && email_vcode !== null && user_email !== null) {

            const data = {
                email: encrypt(user_email),
                vcode: email_vcode
            }

            axios
            .post(G_API_URL + "auth/verify-account/", queryString.stringify(data))
            .then(response => {
                if (response.data.status === 1) {
                    openNotification('success', 'Email verified successfully', 2);
                    login_user({token: response.data.data});
                    setTimeout(() => {
                        history.push(redirectUrl ? redirectUrl : "/");
                    }, 500);
                } else {
                    openNotification('fail', response.data.message, 6);
                }
            })
            .catch(err => {
                console.log(err);
            });
        }
    },[]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleScroll = () => {
        const element = document.getElementById("programs");
        if(element) {
            element.scrollIntoView({
                behavior: "smooth"
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

    const { 
        heroContent,
        programs,
        testimonials,
        companies,
        careerServices,
        outStoryData
    } = content;
    
    return (
        <Layout footer={true}> 
            <Hero data={heroContent} handleScroll={handleScroll} />
            { 
                isMobile && heroContent &&
                <Achievements achievements={heroContent.achievements} /> 
            }
            <TestimonialsV4  data={testimonials} />
            <ProgramsV3 data={programs} />
            <Companies data={companies} />
            <Popup
                rerender={() => { setRerender(!rerenderValue) }}
                modalData={registerModalData}
                setModalData={setRegisterModalData}
                program = {"homepage"}
            />
            <CareerServices 
                data={careerServices}
                program={"homepage"} 
                handleRegister={handleRegister}
                />
            <OurStoryBlock data={outStoryData} />
            <style jsx>{`
                @media only screen and (max-device-width: 760px) {
                    .achievements-wrapper {
                        padding-left: var(--peaky-gap-16);
                        padding-right: var(--peaky-gap-16);
                    }
                }
            `}</style>
        </Layout>
    )
}

export default Home;