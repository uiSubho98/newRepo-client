import React from 'react';
import './Footer.css'
import logo from '../../assets/logo-nav.png'

const Footer = () => {
    return (
        <>
            <div className='footer'>
            <div className="footer-content">
                <div className="about-brand">
                <div className="footer-logo">
                <img className='logo-footer ms-4' src="https://i.ibb.co/bLNXF8p/Pro-Grad-mee.png" alt="" />
                </div>
                <div className="brand-text ms-4 text-white">
                    <p>ProGrad is a new-age tech school. It is an initiative by a team led by IIM grads Rajesh & Venkat who are also the brains behind FACE - India’s largest career development enterprise that trained over 3 million graduate students.</p>
                </div>
                </div>

                <div className="programs">
                    <h4 className='footer-header footer-content-header'>PROGRAMS</h4>
                    <p className='f-p'>Microdegree in Programming</p>
                    <p className='f-p'>MERN Full Stack Development Bootcamp</p>
                    <p className='f-p'>Launchpad(Carrer Services)</p>
                </div>
                <div className="resources">
                    <h4 className='footer-header footer-content-header'>RESOURCES</h4>
                    <p>Workshops</p>
                    <p className='f-p'>ProGrad Buzz</p>
                </div>
                <div className="company">
                    <h4 className='footer-header footer-content-header'>COMPANY</h4>
                    <p className='f-p'>About</p>
                    <p className='f-p'>Hire ProGrads</p>
                    <p className='f-p'>Terms & Conditions</p>
                    <p className='f-p'>Privacy Policy</p>
                </div>
                <div className="follow">
                    <h4 className='footer-header footer-content-header'>FOLLOW</h4>
                    <p className='f-p'>Switch Up</p>
                    <p className='f-p'>Course Report</p>
                    <p className='f-p'>YouTube</p>
                    <p className='f-p'>Instagram</p>
                    <p className='f-p'>Linkedin</p>
                    <p className='f-p'>Facebook</p>
                </div>
            </div>
            <p className='text-center text-white footer-copyright'>© Focus 4D Career Education Pvt. Ltd. All rights reserved</p>
        </div>

        <style jsx>

            {`
                .footer{
                    width: 100%;
                    height:380px;
                    /* border: 1px solid red; */
                }
                
                .logo-footer{
                 transform: scale(1.0);
                /* border: 1px solid red; */
                }
                
                .brand-text{
                    margin-top: 20px;
                    padding-right: 180px;
                    font-size: 16px!important;
                    /* border: 5px solid white; */
                }
                
                .brand-name img{
                    width: 30px;
                }
                
                .footer-header{
                   color:  #929292;
                    font-size: 18px;
                    font-weight: 700;
                }
                
                .f-p{
                    cursor: pointer;
                }
                
                .footer-content{
                    margin-top: 120px;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-evenly;
                    color: #FFFFFFDE;
                    /* border: 1px solid red; */
                    
                }
                .about-brand{
                    width: 35%;
                    /* border: 1px solid red; */
                    margin-left: 20px;
                   
                }
                
                .programs{
                    width: 22%;
                    margin-left: -45px;
                    /* border: 1px solid red; */
                    margin-right: -20px;
                }
                
                .resources{
                    width: 15%;
                    padding-left: 50px;
                }
                .company{
                    width: 15%;
                }
                .follow{
                    width: 12%;
                }
                
                .footer-copyright{
                    margin-top: 80px;
                    color: #FFFFFF8A!important;
                    
                }
                
                @media screen and (max-width: 768px) {
                    .footer{
                        width: 90%;
                        height:1070px;
                        /* border: 1px solid red; */
                        margin-left: 20px;
                    }
                
                    .footer-content{
                        margin-top: 90px;
                        width: 100%;
                        display: flex;
                        height:1100px;
                        flex-direction: column;
                        justify-content: space-evenly;
                        align-items: center;
                        color: #FFFFFFDE;
                        /* border: 1px solid red; */
                        
                    }
                    .brand-text{
                        margin-top: 20px;
                        margin-left: 0px!important;
                        padding-left: 0px!important;
                        padding-right: 20px!important;
                        font-size: 16px!important;
                        /* border: 1px solid white; */
                        width: 100%;
                        margin-bottom: 20px;
                        text-align: left;
                    }
                    .footer-logo{
                        /* border: 1px solid red; */
                        text-align: left;
                    }
                
                
                    .logo-footer{
                        transform: scale(1.0);
                       /* border: 1px solid red; */
                       margin-left: -0px!important;
                       
                       }
                
                    .brand-text{
                       /* border: 1px solid red; */
                       padding:0px;
                    }
                    
                   
                
                    .about-brand{
                        width: 100%;
                        /* border: 1px solid red; */
                        padding: 0px!important;
                        margin: 0px!important;
                        text-align: center;
                       
                    }
                
                    .footer-header{
                        color:  #929292;
                         font-size: 18px;
                         font-weight: 700;
                     }
                    
                    .programs{
                        width: 100%;
                        margin-top: 15px;
                        text-align: left;
                        /* border: 1px solid red; */
                        margin-left: 0px!important;
                        margin-right: 0px!important;
                
                    }
                    
                    .resources{
                        margin-top: 20px;
                        width: 100%;
                       
                        padding-left: 0px!important;
                        text-align: left;
                    }
                    .company{
                        margin-top: 20px;
                
                        width: 100%;
                        
                           text-align: left;
                    }
                    .follow{
                        margin-top: 20px;
                        width: 100%;
                     
                           text-align: left;
                    }
                
                    .footer-copyright{
                        margin-top: 0px!important;
                        color: #FFFFFFDE;
                        /* border: 1px solid red; */
                        font-size: 14px;
                    }
                
                }
                
                @media screen and (min-width: 768px) and (max-width: 992px) {
                    
                
                }
                
            `}

        </style>
        </>
    );
};

export default Footer;