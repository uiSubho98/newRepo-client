import React from 'react';
import Navbar from '../Navabr/Navbar';
import { BsFacebook,BsWhatsapp } from 'react-icons/bs';
import { FiInstagram } from 'react-icons/fi';
import { AiFillYoutube,AiOutlineMail } from 'react-icons/ai';
import { BsLinkedin } from 'react-icons/bs';
import Footer from '../Footer/Footer';





const ContactPage = () => {
    
    return (
        <>
            <div>
             <Navbar></Navbar>
             <div className='contact-header container'>
             <div className="containerbackground-contact">
             <h1 className='text-center'>We are here for you</h1>
        </div>
             <div className='contact'>
             <h2 className='text-center text-white text-header '>Contact us</h2>
             </div>
             </div>
             <div className='map-container container'>
                <div className='right-contact'>
                <div className="text-white">
                    <p className='text'>Need to get in touch with us? Our responses are super fast in emails and express in WhatsApp DMs.  Make a choice and hit us up with your queries!
                    <br></br> P.S: You are also most welcome to our office space in BLR 😁</p>
                </div>
                <div className="text-2 mt-5">
                    <p className='text-white'>For all your queries you can contact us at - </p>
                    <div className='contact-button'>
                    <button className='btn btn-primary btn-lg number'><BsWhatsapp className='me-2 mb-1'></BsWhatsapp> 6264163007</button>
                    <button className='btn btn-primary btn-lg email'><AiOutlineMail className='me-2 mail-icon'></AiOutlineMail>prograd@gmail.com</button>
                    </div>
                </div>
                <div className="social">
                    <BsFacebook className='icons-social'></BsFacebook>
                    <FiInstagram className='icons-social'></FiInstagram>
                    <AiFillYoutube className='icons-social'></AiFillYoutube>
                    <BsLinkedin className='icons-social'></BsLinkedin>
                </div>
                </div>
            <div className='map'>
            <div className='map-text'>
                <p>101, Oakland Apartments, Haudin Road, 1st Cross, Ulsoor Rd, Sivanchetti Gardens, Bengaluru, Karnataka 560042 <span className='rate-link'>Rate us</span> </p>
            </div>
            </div>
        </div>
        <Footer></Footer>
        </div>

        <style jsx>
            {`
            .containerbackground-contact h1 {
                position: absolute;
                font-size: 95px;
                /* border: 1px solid red; */
                height: 155px;
                width: 1000px;
                z-index: -1;
                color: #121212;
                -webkit-text-stroke-width: 0.25px;
                -webkit-text-stroke-color: rgba(255, 255, 255, 0.35);
                right: 2px;
                margin-top: -165px;
            }
            
            
            .contact-header{
                position: relative;
                /* border: 1px solid rgb(0, 0, 0); */
                width: 1000px;
                margin-top: 80px;
            }
            .contact{
                position: absolute;
                /* border: 1px solid red; */
                width: 980px;
                margin-top: -120px;
            
            }
            .text{
                color: #AAAAAA;
                font-size: 15px;
            }
            .map-container{
                position: relative;
                margin-top: 280px;
                padding: 0px!important;
                width: 1000px;
                height: 400px;
                /* border: 1px solid red; */
                display: flex;
                flex-direction: row;
                justify-content: space-between;
            }
            
            .right-contact{
                width: 50%;
                /* border: 1px solid white; */
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                padding-right: 20px;
            }
            
            .social{
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                color: #0E7DED;
                width: 425px;
                width: 92%;
                margin-left: 5px;
                height: 85px;
                margin-top: 35px;
                /* border: 1px solid red; */
                padding-left: 10px;
            }
            
            .icons-social{
                object-fit: contain;
             transform: scale(1.8);
            }
            
            .map{
                width: 52%;
                /* border: 1px solid red; */
                height: 250px;
                height: 100%;
                background-image: url("https:/cdn.prograd.org/contact/gmap/gmap.jpg");
            }
            
            .map-text{
                /* border: 1px solid red; */
                padding-left: 10px;
                position: relative;
                bottom:0;
                top: 330px;
                color: white;
                font-weight: 400;
            }
            
            .rate-link{
                color: rgb(0, 89, 255);
            }
            
            .contact-button{
                display: flex;
                width: 100%;
                height: 48px;
                /* border: 1px dashed rgb(0, 255, 76); */
                justify-content: space-between;
            }
            .number{
                font-size: 18px;
                width: 45%;
            }
            .email{
                font-size: 16px;
                width: 45%;
                /* border: 1px solid white; */
                margin-right: 18px;
            }
            
            
            @media screen and (max-width: 768px) {
                .contact-header{
                    position: relative;
                    /* border: 1px solid red; */
                    width: 90%;
                    height: 80px;
                    margin-top: 40px;
                }
                .containerbackground-contact h1 {
                    position: absolute;
                    font-size: 35px;
                    height: 55px;
                    width: 100%;
                    margin: 0px!important;
                    /* border: 1px solid white; */
                    z-index: -1;
                    left: 0;
                    right: 0;
                    color:  #121212;
                    -webkit-text-stroke-width: 0.25px;
                    -webkit-text-stroke-color: rgba(255, 255, 255, 0.25);
                }
                .contact{
                    position: absolute;
                    /* border: 1px solid red; */
                    width: 95%;
                    margin-top: 12px;
                    text-align: center;
                  }
                  .contact h2{
                    font-size: 20px;
                  }
                  .map-container{
                    position: relative;
                    margin-top: 28px;
                    width: 90%;
                    height: 700px;
                    /* padding-left: 15px!important; */
                    /* padding-right: 15px!important; */
                    /* border: 1px solid rgb(255, 255, 255); */
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    margin-bottom: -56px;
                }
                .right-contact{
                    width: 100%;
                    padding:0px;
                    /* border: 1px solid white; */
                    display: flex;
                    flex-direction: column;
                    justify-content: space-evenly;
                    padding-right: 0px;
                }
                .map{
                    width: 100%;
                    /* border: 1px solid red; */
                    height:100%;
                }
            
                .map-text{
                    /* border: 1px solid red; */
                    padding-left: 10px;
                    position: relative;
                    bottom:0;
                    top: 235px;
                    color: white;
                    font-weight: 400;
                }
                .contact-button{
                    display: flex;
                    width: 100%;
                    height: 48px;
                    /* border: 1px dashed rgb(0, 255, 76); */
                    justify-content: space-between;
                    padding: 0px!important;
                }
                .number{
                    font-size: 12px;
                    width: 48%;
                }
                .email{
                    font-size: 12px;
                    width: 48%;
                    /* border: 1px solid white; */
                    margin-right: 0px;
                }  
            }
             
            `}
        </style>
        </>
    );
};

export default ContactPage;