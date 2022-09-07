import React from "react";
import { Helmet } from "react-helmet";
import Layout from "../../components/Layout";
import Hero from "../../components/TalentSolutions/Hero";
import Features from "../../components/TalentSolutions/Features";
import Testimonial from "../../components/TalentSolutions/Testimonial";
import Process from "../../components/TalentSolutions/Process";
// import Problems from "../../components/TalentSolutions/Problems";
import Partners from "../../components/TalentSolutions/Partners";
import DiscussionForm from "../../components/TalentSolutions/DiscussionForm";
import TalentSolutionsData from "../../json/talent_solutions.json";

const TalentSolutions = () => {
    const { 
        hero_content, 
        features, 
        testimonials, 
        process, 
        partners 
    } = TalentSolutionsData;
    return (
        <Layout footer={true}>
            <Helmet>
                <title>ProGrad | Talent Solutions</title>
            </Helmet>
            <Hero data={hero_content} />
            <Features data={features} />
            <Testimonial data={testimonials} />
            <Process data={process} />
            {/* <Problems data={problems} /> */}
            <Partners data={partners} />
            <DiscussionForm />
        </Layout>
    )
}

export default TalentSolutions;