import React from "react";
import LinkedInIcon from "../../assets/icons/svg-icons-v2/linkedin-w.svg";
import GithubIcon from "../../assets/icons/svg-icons-v2/github-w.svg";
import WebsiteIcon from "../../assets/icons/svg-icons-v2/website-w.svg";
import { useHistory } from "react-router";
import { __getFirstName, __getProfilePicture } from "../../utils/user-details.util";

interface HeroProps {
    name: string
    linkedinUrl: string
    githubUrl: string
    website: string
    isWorking: boolean
    place: string
    profilePic: string
    allowEditing: boolean
}

const Hero = (props: HeroProps) => {
    const { isWorking, place, allowEditing, linkedinUrl, githubUrl, website } = props;
    const history = useHistory();
    let title = "";
    if(isWorking && place !== "") {
        title = "Working at " + place;
    } else if(!isWorking &&place !== "") {
        title = "Student at " + place;
    }

    let isDefaultProfilePic = false;
    if(__getProfilePicture() === "https://cdn.prograd.org/upp/default.png") {
        isDefaultProfilePic = true;
    }

    return (
        <>
            <div className="hero-wrapper f-d f-h-sb f-v-c f-vt-m f-h-c-m">
                <div className="left-pane f-d f-vt-m f-v-c-m">
                        <div className="img-wrapper">
                            {
                                !isDefaultProfilePic ?
                                <div className="avatar bg-image-full" style={{backgroundImage: `url(${props.profilePic})`}}></div> :
                                <div className="f-d f-h-c f-v-c avatar default">
                                     { __getFirstName().charAt(0).toUpperCase() }
                                </div>
                            }
                        </div>
                        <div className="info-wrapper f-d f-vt f-h-c f-v-c-m lr-pad-m">
                            <h3 className="font-heading text-xl name text-c-m">{props.name}</h3>
                            { title !== "" && <div className="text-regular title">{title}</div>}
                            <div className="links">
                                { linkedinUrl !== "" && <img src={LinkedInIcon} alt="LinkedIn" className="c-pointer" onClick={()=>{window.open(linkedinUrl)}} /> }
                                { githubUrl !== "" && <img src={GithubIcon} alt="Github" className="c-pointer" onClick={()=>{window.open(githubUrl)}} /> }
                                { website !== "" && <img src={WebsiteIcon} alt="Portfolio" className="c-pointer" onClick={()=>{window.open(website)}} /> }
                            </div>
                        </div>
                </div>
                { allowEditing &&
                    <div className="right-pane">
                        <div className="update-profile-btn-wrapper" onClick={()=>{history.push('/profile/edit')}}>
                            <div className="default-black-btn">Update Profile</div>
                        </div>
                    </div>
                }
            </div>

            <style>{`
                .hero-wrapper .avatar {
                    width: 200px;
                    height: 200px;
                    border-radius: 50%;
                    border: 2px solid var(--snowfall);
                }

                .hero-wrapper .avatar.default {
                    background-color: var(--primary);
                    font-size: 100px;
                    font-weight: 400;
                    font-family: Inconsolata;
                }

                .hero-wrapper .name {
                    line-height: 2.623rem;
                }

                .hero-wrapper .img-wrapper {
                    margin-right: var(--peaky-gap-32);
                }

                .hero-wrapper .title {
                    margin-top: var(--peaky-gap-16);
                }

                .hero-wrapper .links {
                    margin-top: var(--peaky-gap-32);
                }

                .hero-wrapper .links img:not(:first-child){
                    margin-left: var(--peaky-gap-32);
                }
                
                .hero-wrapper .update-profile-btn {
                    font-weight: 700;
                    border-radius: var(--peaky-br-2);
                    border: solid 1px var(--dove);
                    padding: 14px 32px;
                }

                @media only screen and (max-device-width: 760px) {
                    .hero-wrapper .img-wrapper {
                        margin-right: 0;
                    }

                    .hero-wrapper .name {
                        margin-top: var(--peaky-gap-32);
                    }

                    .hero-wrapper .right-pane {
                        margin-top: var(--peaky-gap-32);
                    }
                }                
            `}</style>
        </>
    );
}

export default Hero;