import React, { ReactNode } from "react";
import prograd_logo from "../../assets/brand/prograd_logo.svg";
import { G_URL } from "../../constants/constants";
import { __getSubscriptions } from "../../utils/user-details.util";
import youtube from "../../assets/icons/svg_icons/youtube.svg";
import facebook from "../../assets/icons/svg_icons/facebook.svg";
import instagram from "../../assets/icons/svg_icons/instagram.svg";
import linkedin from "../../assets/icons/svg_icons/linkedin.svg";

interface Props {
    is_logged_in : boolean;
}

const Footer = (props:Props) => {
    const { is_logged_in } = props;
    const subscriptions = __getSubscriptions();
    let studentLogin = is_logged_in ? (subscriptions.microdegree ? "learning-dashboard/microdegree" : 
    "learning-dashboard/bootcamp") : "login";
    const genLinks = (mode:string) => {
        let linksArray:object = {
            "Microdegree": "microdegree",
            "Student log in": [studentLogin],
            // "Free Coding workshop": "workshop",
            "Whatsapp":"whatsapp"
        }
        if(mode === 'company') {
            linksArray = {
                "About Us": "about-us",
                "Terms and Conditions": "terms-and-conditions",
                "Privacy Policy": "privacy-policy"
            }
        }
        let holdLinkElements: Array<ReactNode> = [];
        Object.entries(linksArray).forEach(([key, value]) => {
                holdLinkElements.push(
                    <a
                        key={key}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${mode}-link body-regular`}
                        href={`${G_URL}${value}`}
                    >
                        {key}
                    </a>
                )
        });
        return holdLinkElements;
    }

    const genSocialLinks = () => {
        const socialLinks = {
            link1: {
                url: "https://www.facebook.com/progradorg/",
                logo: [facebook]
            },
            link2: {
                url: "https://www.instagram.com/progradorg/",
                logo: [instagram]
            },
            link3: {
                url: "https://www.linkedin.com/school/progradorg/",
                logo: [linkedin]
            },
            link6: {
                url: "https://bit.ly/Prograd_Subscribe",
                logo: [youtube]
            }
        };
        let holdLinkElements: JSX.Element[] = [];
        Object.entries(socialLinks).forEach(([key, value]) => {
            holdLinkElements.push(
                <a
                    key={key}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    href={value.url}
                >
                    <div className="social-logo bg-image-full" style={{backgroundImage: 'url(' + value.logo + ')'}}></div>
                </a>
            )
        });
        return holdLinkElements;
    }

    return (
        <>
            <div className="footer-container lr-pad-d lr-pad-m">
                <div className="footer-body tb-pad-d f-d f-vt-m f-h-sb">
                    <div className="left-container w-40">
                        <div className="brand-container">
                            <img src={prograd_logo} alt="logo" height="42" 
                            width="200" />
                        </div>
                        <div className="platform-brief body-regular">
                            ProGrad is a new-age online coding school. 
                            It is an initiative by a team led by IIM grads Rajesh & Venkat who 
                            are also the brains behind FACE - India’s largest career development 
                            enterprise that trained over 3 million graduate students.
                        </div>
                        <div className="social-links f-d f-v-c">
                            {genSocialLinks()}
                        </div>
                    </div>
                    <div className="right-container f-d f-vt-m">
                        <div className="platform-links f-d f-vt">
                            <h3 className="h3-heading">IMPORTANT LINKS</h3>
                            {genLinks('platform')}
                        </div>
                        <div className="company-links f-d f-vt">
                            <h3 className="h3-heading">COMPANY</h3>
                            {genLinks('company')}
                        </div>
                    </div>
                </div>
                <div className="footer-copyright body-regular text-c-d">
                    © 2020 Focus  4D Career Education Pvt. Ltd. All rights reserved
                </div>
            </div>

            <style jsx>
                {`
                    .footer-container {
                        background: var(--smoke);
                    }

                    .left-container .brand-container {
                        width: max-content;
                    }

                    .footer-body .platform-brief {
                        margin-top: 2rem;
                        margin-bottom: 2rem;
                    }

                    .footer-body .social-links .link-container {
                        font-size: 18px;
                        width: 50px;
                        height: 50px;
                        margin-right: 1rem;
                        color: var(--carbon);
                        border-radius: var(--peaky-br-full);
                        border: 1px solid var(--granite);
                        background: rgba(0,0,0,0);
                        transition: all 0.2s;
                    }

                    .footer-body .social-links .link-container:hover {
                        background: rgba(0,0,0,0.05);
                    }

                    .footer-body .right-container h3 {
                        font-family: 'Open Sans', sans-serif;
                        font-weight: 700;
                    }

                    .footer-body .right-container a {
                        margin-top: 1rem;
                        width: max-content;
                    }

                    .footer-body .right-container a:hover {
                        color: var(--purple);
                    }

                    .footer-body .right-container > div:last-child {
                        margin-left: 6rem;
                    }

                    .footer-container .footer-copyright {
                        padding: 1rem 0;
                    }

                    .footer-body .social-links .link-container {                 
                        width: 50px;
                        height: 50px;
                        margin-right: 1rem;
                        border-radius: var(--peaky-br-full);
                    }

                    .social-links .social-logo {
                        width: 50px;
                        height: 50px;
                        margin-right: 1rem;
                    }

                    @media only screen and (max-device-width: 760px) {
                        .footer-container .left-container {
                            width: unset;
                        }

                        .footer-body .platform-brief {
                            text-align: justify;
                        }

                        .footer-body .right-container > div:last-child {
                            margin-left: unset;
                        }

                        .footer-body .right-container > div {
                            margin-top: 3rem;
                        }

                        .footer-body .social-links {
                            flex-wrap: wrap;
                        }
    
                        .social-links .social-logo {
                            margin-bottom: 1rem;
                        }
                    }

                    @media screen and (min-width: 768px) and (max-width: 1023px) and (orientation: portrait) {
                        .footer-container .footer-body {
                            flex-direction: column;
                        }

                        .footer-body .left-container {
                            width: 100%;
                        }

                        .footer-body .right-container {
                            margin-top: 2rem;
                        }
                    }
                `}
            </style>
        </>
    )
}

export default Footer;