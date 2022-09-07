import React from "react";
import prograd_logo from "../../assets/brand/prograd_logo_blue_white.svg";
import { G_URL } from "../../constants/constants";

const FooterV2 = () => {
    const renderFooterLink = (name: string, link: string) => {
        return (
            <div onClick={()=>{window.open(link)}} className="c-pointer text-small text-faded-2">{name}</div>
        );
    }

    return (
        <>
            <div className="footer-container">
                <div className="lr-pad-d tb-pad-d f-d f-h-sb f-vt-m lr-pad-m tb-pad-m">
                    <div className="left-wrapper">
                        <div className="brand-container">
                            <img src={prograd_logo} alt="logo" height="30" />
                        </div>
                        <div className="text-regular text-small text-faded-2">ProGrad is a new-age tech school. It is an initiative by a team led by IIM grads Rajesh & Venkat who are also the brains behind FACE - India’s largest career development enterprise that trained over 3 million graduate students.</div>
                    </div>
                    <div className="right-wrapper f-d f-h-sb text-faded-2 f-vt-m">
                        <div className="footer-column">
                            <div className="heading text-faded">PROGRAMS</div>
                            {renderFooterLink("Front-End Development Bootcamp", G_URL + "bootcamp/foundations-of-front-end-development")}
                            {renderFooterLink("Thoughtworks ProGrad PLUS Program", G_URL + "program/thoughtworks-developer-program")}
                        </div>
                        <div className="footer-column">
                            <div className="heading text-faded">RESOURCES</div>
                            {renderFooterLink("ProGrad Buzz", G_URL + "prograd-buzz")}
                            {renderFooterLink("Workshops", G_URL + "workshops")}
                        </div>
                        <div className="footer-column">
                            <div className="heading text-faded">COMPANY</div>
                            {/* {renderFooterLink("About", G_URL + "about-us")}
                            {renderFooterLink("Hire ProGrads", G_URL + "hire-prograds")} */}
                            {renderFooterLink("Terms & Conditions", G_URL + "terms-and-conditions")}
                            {renderFooterLink("Privacy Policy", G_URL + "privacy-policy")}
                        </div>
                        <div className="footer-column">
                            <div className="heading text-faded">FOLLOW</div>
                            {renderFooterLink("Course Report", "https://www.coursereport.com/schools/prograd/")}
                            {renderFooterLink("YouTube", "https://bit.ly/Prograd_Subscribe")}
                            {renderFooterLink("Instagram", "https://www.instagram.com/progradorg/")}
                            {renderFooterLink("LinkedIn", "https://www.linkedin.com/school/progradorg/")}
                            {renderFooterLink("Facebook", "https://www.facebook.com/progradorg/")}
                            {renderFooterLink("Switch Up", "https://www.switchup.org/bootcamps/prograd")}
                        </div>
                    </div>
                </div>
                <div className="footer-copyright text-small text-c-d text-faded">
                    © ProGrad Talent Solutions Pvt Ltd. All rights reserved
                </div>
            </div>

            <style jsx>{`

                .footer-container{
                    background-color: var(--crow);
                }
                .footer-container .left-wrapper {
                    max-width: 20%;
                }

                .footer-container .brand-container {
                    margin-bottom: var(--peaky-gap-32);
                }

                .footer-container .heading {
                    font-weight: 700;
                }

                .footer-container .footer-column {
                    margin-left: var(--peaky-gap-64);
                }

                .footer-container .footer-column > div {
                    margin-bottom: var(--peaky-gap-8);
                }

                .footer-container .footer-copyright {
                    margin-top: var(--peaky-gap-64);
                }

                @media only screen and (max-device-width: 760px) {
                    .footer-container {
                        padding-bottom: var(--peaky-gap-32);
                    }
                    .footer-container .left-wrapper {
                        max-width: 100%;
                    }

                    .footer-container .footer-column {
                        margin-left: 0;
                        margin-top: var(--peaky-gap-64);
                    }

                    .footer-container .footer-column > div {
                        margin-bottom: var(--peaky-gap-16);
                    }

                    .footer-container .footer-copyright {
                        margin-top: var(--peaky-gap-32);
                    }
                }
            `}</style>
        </>
    )
}

export default FooterV2;