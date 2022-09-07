import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
// @ts-ignore
import { Helmet } from 'react-helmet';
import Spinner from "../../components/Spinner/spinner";
import UserCard from '../../components/Card/UserCard';
import axios from "axios";
import { G_API_URL } from "../../constants/constants";

interface ITeamCard {
    img: string
    name: string
    title: string
}

interface AboutUsState {
    teamMembers: Array<ITeamCard>
}

interface content{
    list: Array<string>;
}

const ContactUs = () => {
    const [isLoading,setLoading] = useState<boolean>(false);
    const [state, setState] = useState<AboutUsState>();
    const [imgSrc , setImgSrc] = useState<content>({
        list: []
    })

    useEffect(() => {
        setLoading(true);
        // Make Call to fetch AboutUs data
        axios
            .get(G_API_URL + "resource/about-us/")
            .then(response => {
                if (response.data.status === 1) {
                    let { data } = response.data;
                    setState(prevState => ({
                        ...prevState,
                        fetchingData: false,
                        teamMembers: data.content.teamMembers
                    }));
                    setImgSrc(data.content.imgs)
                }
            })
            .catch(err => {
                console.log(err);
            });
        setTimeout(() => {
            setLoading(false);
        },1500)
    }, []);  

    var teamMembers = state?.teamMembers.map((member: ITeamCard) => (
        <UserCard userImg={member.img} name={member.name} title={member.title} key={member.img}/>
    ));

    return (
        <>
            
                <Helmet>
                    <title>ProGrad | Contact Us</title>
                </Helmet>
                {
                !isLoading ?
                <Layout footer={true}>
                    <div className="about-us-container lr-pad-d lr-pad-m tb-pad-d tb-pad-m f-d f-v-c f-h-c">
                        <h1 className="mission text-xxl font-heading text-c-d text-wrap"> { "We are on a mission to make\nworld-class computer science education\naffordable and relevant" }</h1>
                    </div>
                    <div className="aboutus-wrapper">
                        <div className="aboutus-container">
                            <div className="aboutus-content lr-pad-d lr-pad-m tb-pad-d tb-pad-m "> 
                                <div className="text-xl font-heading text-c-d text-l-m aboutus-text">
                                    Our story
                                </div>
                                <div className="text-c-d text-medium text-faded-2 aboutus-text text-wrap m-t-32-d m-t-16-m">
                                    In 2008, IIM grads Rajesh & Venkat started <span className="strong-text">Focus Academy For Career Enhancement</span> { "(popularly\nknown as FACE) to train students on employability skills and\nhelp them land jobs." }
                                </div>
                                <div className="text-c-d initial-team">
                                    <img src={imgSrc.list && imgSrc.list[0]} alt="initial-team" className="initial-team-img w-100" />
                                </div>
                                <div className="text-c-d text-medium text-faded-2 aboutus-text text-wrap m-t-64-d m-t-16-m">
                                    {"Fast forward 11 years, FACE, now stands as India’s largest career development enterprise which has\ntrained more then 3 million students from across 1500+ colleges in India and also helped over 2.5\nmillion graduate students in landing their first IT jobs. During this period, we also launched an online\njob-prep platform - FACE Prep which helped more than 1.5 million students prepare\nfor their first job."}
                                </div>
                                <div className="text-c-d m-t-64-d m-t-32-m">
                                    <img src={imgSrc.list && imgSrc.list[4]} alt="FACE-logo" className="face-logo w-100" />
                                </div>
                                <div className="text-c-d text-medium text-faded-2 aboutus-text m-t-64-d m-t-32-m">
                                    We trained students from more than 1500 colleges across India
                                </div>
                            </div>
                            <div className="team-members-container lr-pad-d lr-pad-m tb-pad-d tb-pad-m">
                                <h2 className="text-c-d text-xl font-heading">The ProGrad Team</h2>
                                <div className="team-cards-container g-d g-col-4 g-col-1-m">
                                    {teamMembers}
                                </div>
                            </div>
                        </div>
                    </div>
                </Layout> :
                    <Spinner />
                }
            
            <style jsx>{`

                .about-us-container .mission{
                    line-height: 59px;
                    margin:0 auto;
                }

                .about-us-container .text-wrap, 
                .aboutus-container .text-wrap {
                    white-space: pre-wrap;
                }

                .aboutus-wrapper .aboutus-container{
                    background-color: var(--primary-bg);
                }

                .team-members-container .user-name{
                    font-weight:700;
                    font-family:font-family: 'Inconsolata', sans-serif !important;
                }

                .team-members-container .user-title{
                    font-weight:300;
                }

                .m-t-16-d {
                    margin-top: var(--peaky-gap-16);
                }

                .aboutus-container .aboutus-text {
                    padding-left: 9rem;
                    padding-right: 9rem;
                }

                .aboutus-container .initial-team-img {
                    max-width: 706px;
                }

                .aboutus-container .face-logo {
                    max-width: 723px;
                }

                .m-t-128 {
                    margin-top: var(--peaky-gap-128);
                }

                .aboutus-container .colleges, 
                .aboutus-container .companies, 
                .m-t-32-d {
                    margin-top: var(--peaky-gap-32);
                }
                
                .aboutus-container .colleges, 
                .aboutus-container .companies {
                    max-width: 404px;
                }

                .pg-neat-img {
                    max-width: 250px;
                }

                .aboutus-container .initial-team, 
                .m-t-64-d {
                    margin-top: var(--peaky-gap-64);
                }

                .aboutus-container .team-members-container {
                    background-color: var(--crow);
                    margin-top: 4rem;
                }
                
                .team-members-container > h2 {
                    margin-bottom: 2rem;
                }

                .aboutus-container .team-cards-container {
                    grid-gap: 50px;
                }

                .user-card-container {
                    background-color: var(--primary-bg);
                    border-radius: var(--peaky-br-4);
                    box-shadow: var(--peaky-shadow-high-2);
                    object-fit: contain;
                    min-width: 240px;
                }

                .user-card-container .user-image {
                    border-radius: 4px 4px 0 0;
                    width: 100%;
                }

                .user-card-container .card-description {
                    padding: var(--peaky-gap-16);
                }

                .user-card-container .user-title {
                    margin-top: var(--peaky-gap-8);
                }
                
                @media only screen and (max-device-width: 760px) {
                    
                    .aboutus-container .aboutus-text {
                        text-align: center;
                        padding-left: 0;
                        padding-right: 0;
                    }

                    .about-us-container .mission {
                        line-height: 48px;
                    }

                    .m-t-128 {
                        margin-top: 0;
                    }

                    .m-t-32-d {
                        margin-top: 0;
                    }

                    .m-t-64-d {
                        margin-top: 0;
                    }

                    .m-t-32-m, .aboutus-container .colleges {
                        margin-top: var(--peaky-gap-32);
                    }

                    .m-t-16-m, .aboutus-container .initial-team, 
                    .aboutus-container .companies {
                        margin-top: var(--peaky-gap-16);
                    }

                    .aboutus-container .team-members-container {
                        margin-bottom: 4rem;
                    }

                    .aboutus-container .team-cards-container {
                        grid-gap: 2rem;
                    }

                    .user-card-container {
                        min-width: unset;
                    }

                    .user-card-container .card-description {
                        padding: var(--peaky-gap-8);
                    }

                    .user-card-container .user-title {
                        margin-top: var(--peaky-gap-4);
                    }

                    .about-us-container .text-wrap,
                    .aboutus-wrapper .text-wrap {
                        white-space: unset;
                    }
                }

                @media only screen and (max-device-width: 320px) {
                    .user-card-container .user-image {
                        width: 280px;
                    }
                }

                @media screen and (min-width: 768px) and (max-width: 1023px) 
                and (orientation: portrait) {
                    .aboutus-container .aboutus-text {
                        padding-left: 0;
                        padding-right: 0;
                    }
                }
            `}</style>
        </>
    )
}

export default ContactUs;