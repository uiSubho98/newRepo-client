import React from 'react';
import './Footer.css'
import logo from '../../Assets/logo-nav.png'

const Footer = () => {
    return (
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
    );
};

export default Footer;