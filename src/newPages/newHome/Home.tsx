import React from 'react';
import Team from '../Team/Team';
import Banner from '../Banner/Banner';
import Contact from '../Contact/Contact';
import Footer from '../Footer/Footer';
import JoinUs from '../JoinUs/JoinUs';
import Mission from '../Mission/Mission';
import Navbar from '../Navabr/Navbar';
import Partners from '../Partners/Partners';
import Slider from '../Slider/Slider';
import Values from '../Values/Values';

const Home = () => {
    return (
        <>
            <Navbar></Navbar>
            <Banner></Banner>
            <Mission></Mission>
    <Values></Values>
    <Contact></Contact>
    <Team></Team>
    <Slider></Slider>
    <Partners></Partners>
    <JoinUs></JoinUs>
    <Footer></Footer>
        </>
    );
};

export default Home;