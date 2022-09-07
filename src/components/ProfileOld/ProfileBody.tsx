import React, { useEffect, useState } from "react";
import { ICertificate, IBadge, IProgram } from "./profile";
import { IBadge as IBadgeModal } from "../../interfaces/dashboard";
import BadgeModal from "../Dashboard/BadgeModal";
import { G_URL } from "../../constants/constants";
// @ts-ignore
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface ProfileBodyProps {
    certs: Array<ICertificate>
    badges: IBadge
    programs: Array<IProgram>
    showEarnable: boolean
    firstName: string
}

interface IBadgeState {
    badge: IBadgeModal
    isModalVisible: boolean
}

const ProfileBody = (props: ProfileBodyProps) => {
    const {certs, badges, programs, showEarnable, firstName} = props;
    const [activeTab, setActiveTab] = useState<string>('certifications');
    const [badge, setBadge] = useState<IBadgeState>({
        badge: {
            id: 0,
            name: "",
            image: "",
            description: "",
            action: ""
        },
        isModalVisible: false
    });

    useEffect(() => {
        if(window.location.hash === "#badges") {
            setActiveTab("badges");
        }
    }, [])

    const closeBadgeModal = () => {
        setBadge(prev => ({
            ...prev,
            isModalVisible: false
        }));
    }

    const openBadgeModal = (badge: {name: string, desc: string, src: string}) => {
        console.log(badge)
        setBadge(prev => ({
            ...prev,
            badge: {
                id: 0,
                image: badge.src,
                name: badge.name, 
                description: badge.desc,
                action: "Okay!"
            },
            isModalVisible: true
        }));
    }

    return (
        <>
            <div className="profile-body-wrapper">
                <div className="tabs-container f-d f-h-c w-100">
                    <div className={`tab c-pointer text-c-d text-faded-2 ${activeTab === 'certifications' ? 'active': ''}`} onClick={()=>{setActiveTab('certifications')}}>CERTIFICATIONS</div>
                    <div className={`tab c-pointer text-c-d text-faded-2 ${activeTab === 'badges' ? 'active': ''}`} onClick={()=>{setActiveTab('badges')}}>BADGES</div>
                    {(showEarnable || programs.length > 0) && <div className={`tab c-pointer text-c-d text-faded-2 ${activeTab === 'programs' ? 'active': ''}`} onClick={()=>{setActiveTab('programs')}}>PROGRAMS</div>}
                </div>
                {
                    activeTab === 'certifications' && 
                    <>
                        {
                            certs.length > 0
                            ?
                            <div className="certs-wrapper g-d g-col-1 g-h-c">
                                <div className="certs-container f-d f-h-c f-vt-m">
                                    {certs.map((cert: ICertificate, index: number) => {
                                        return (
                                            <div className="cert c-pointer" onClick={()=>{window.open(cert.link)}} key={index}>
                                                <div className="preview">
                                                {/* <iframe className="skeleton-card" onClick={()=>{window.open(cert.link)}} src={cert.previewUrl} frameBorder="0" title={cert.name}/> */}
                                                <Document file={cert.previewUrl} className='skeleton-card' loading=''>
                                                    <Page pageNumber={1} height={225} width={225}/>
                                                </Document>
                                                </div>
                                                <div className="cert-footer text-regular text-c-d">{cert.name}</div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            :
                            <div className="quote-wrapper lr-pad-m text-c-d">
                                <div className="text-large font-heading text-faded quote">It takes many years to make an overnight success</div>
                                <div className="author text-faded"><i>- someone who is an overnight success</i></div>
                            </div>
                        }
                    </>
                }
                {
                    activeTab === 'badges' && 
                    <>
                        {
                            badges.earned.length > 0
                            ?
                            <div className="badges-wrapper lr-pad-m">
                                <div className="earned-wrapper g-d g-col-4 g-h-c g-gap-16-64">
                                    {badges.earned.map((badge: {name: string, desc: string, src: string}, index: number) => {
                                        return (
                                            <div className="badge bg-image-full c-pointer" onClick={()=>{openBadgeModal(badge)}} key={index} style={{backgroundImage:`url(${badge.src})`}}></div>
                                        );
                                    })}
                                </div>
                                {
                                    showEarnable && badges.earnable !== undefined && badges.earnable.length > 0 &&
                                    <>
                                        <div className="text-faded text-small extras">Badges you could earn (Private to you)</div>
                                        <div className="earnable-wrapper g-d g-col-4 g-col-3-m g-h-c g-gap-16-64 g-gap-0-16-m">
                                            {badges.earnable.map((badge: {name: string, desc: string, src: string}, index: number) => {
                                                return (
                                                    <div className="badge bg-image-full c-pointer" onClick={()=>{openBadgeModal(badge)}} key={index} style={{backgroundImage:`url(${badge.src})`}}></div>
                                                    );
                                                })}
                                        </div>
                                    </>
                                }
                            </div>
                            :
                            <div className="quote-wrapper lr-pad-m text-c-d">
                                <div className="text-large font-heading text-faded quote">It takes many years to make an overnight success</div>
                                <div className="author text-faded"><i>- someone who is an overnight success</i></div>
                            </div>
                        }
                    </>
                }
                {
                    activeTab === 'programs' && 
                    <>
                        {   
                            programs.length > 0
                            ?
                            <div className="programs-wrapper g-d g-col-1 g-h-c">
                                <span className="text-small text-faded program-subtitle text-c-m">Courses {showEarnable ? 'you are' : `${firstName} is`} currently learning</span>
                                <div className="programs-container f-d f-h-c f-vt-m">
                                    {programs.map((program: IProgram, index: number) => {
                                        return (
                                            <div className="program c-pointer" key={index} onClick={()=>{window.location.href=G_URL+program.src}}>
                                                <div className="program-img bg-image-full" style={{backgroundImage:`url(${program.img})`}}>
                                                </div> 
                                                <div className="program-footer text-regular text-c-d">{program.name}</div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            :
                            <div className="quote-wrapper lr-pad-m text-c-d">
                                <div className="text-large font-heading text-faded quote">All great things have small beginnings</div>
                                <div className="author text-faded"><i>- every successful person</i></div>
                            </div>
                        }
                    </>
                }
                <BadgeModal isModalVisible={badge.isModalVisible} badge={badge.badge} handleClick={closeBadgeModal}/>
            </div>

            <style>{`
                .profile-body-wrapper {
                    margin-top: var(--peaky-gap-64);
                }
                
                .profile-body-wrapper .tabs-container {
                    border-top: 2px solid rgba(255, 255, 255, 0.1);
                }
                .profile-body-wrapper .tab {
                    width: 200px;
                    padding: 14px 0;
                }
                .profile-body-wrapper .tab.active {
                    color: var(--dove) !important;
                    font-weight: 700;
                    transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
                }
                .profile-body-wrapper .tab.active:before {
                    content: " ";
                    display: block;
                    margin-top: -17px;
                    padding: 6.5px 0;
                    border-top: 4px solid var(--primary);
                }

                .profile-body-wrapper .certs-wrapper,
                .profile-body-wrapper .programs-wrapper {
                    padding-top: var(--peaky-gap-32);
                }

                .profile-body-wrapper .certs-wrapper .cert {
                    width: 320px;
                    margin: 0 var(--peaky-gap-32);
                    background-color: var(--primary-bg);
                    border-radius: var(--peaky-br-4);
                }
                
                .profile-body-wrapper .certs-wrapper .skeleton-card {
                    height: 225px;
                }

                .profile-body-wrapper .certs-wrapper .cert-footer,
                .profile-body-wrapper .programs-wrapper .program-footer {
                    padding: var(--peaky-gap-16);
                }

                .profile-body-wrapper .badges-wrapper {
                    padding-top: var(--peaky-gap-32);
                    width: 50%;
                    margin-left: auto;
                    margin-right: auto;
                }

                .profile-body-wrapper .badges-wrapper .badge {
                    width: 100px;
                    height: 100px;
                }

                .profile-body-wrapper .badges-wrapper .extras {
                    margin: var(--peaky-gap-64) 0 var(--peaky-gap-16);
                    padding-left: 2rem; 
                }

                .profile-body-wrapper .programs-wrapper .program {
                    max-width: 320px;
                    margin: 0 var(--peaky-gap-32);
                    background-color: var(--primary-bg);
                    border-radius: var(--peaky-br-4);
                }

                .profile-body-wrapper .programs-wrapper .program-subtitle {
                    margin-bottom: var(--peaky-gap-32);
                }

                .profile-body-wrapper .programs-wrapper .program-img {
                    width: 320px;
                    height: 225px;
                    background-color: var(--carbon);
                }

                .profile-body-wrapper .quote-wrapper {
                    margin: var(--peaky-gap-32) 0 0;
                }

                .profile-body-wrapper .quote-wrapper .quote {
                    font-weight: 400 !important;
                    margin-bottom: var(--peaky-gap-16);
                }

                .profile-body-wrapper .certs-wrapper .certs-container
                .cert .react-pdf__Page__canvas {
                    height: 100% !important;
                    width: 100% !important;
                }

                @media only screen and (max-device-width: 760px) {
                    .profile-body-wrapper {
                        margin-top: var(--peaky-gap-32);
                    }
                    
                    .profile-body-wrapper .tabs-container {
                        border-top: none;
                        border-bottom: 2px solid rgba(255, 255, 255, 0.1);
                        padding-left: var(--peaky-gap-16);
                        padding-right: var(--peaky-gap-16);
                    }
                    .profile-body-wrapper .tab {
                        width: auto;
                        padding-left: var(--peaky-gap-16);
                        padding-right: var(--peaky-gap-16);
                    }
                    .profile-body-wrapper .tab.active:before {
                        content: none;
                    }
                    .profile-body-wrapper .tab.active:after {
                        content: " ";
                        display: block;
                        margin-bottom: -17px;
                        padding: 6.5px 0;
                        border-bottom: 4px solid var(--primary);
                    }

                    .profile-body-wrapper .certs-wrapper .cert:not(:nth-of-type(1)) {
                        margin-top: var(--peaky-gap-32);
                    }

                    .profile-body-wrapper .badges-wrapper {
                        width: 100%;
                    }

                    .profile-body-wrapper .badges-wrapper .extras {
                        margin: var(--peaky-gap-32) 0 var(--peaky-gap-16);
                    }

                    .profile-body-wrapper .programs-wrapper .program {
                        margin: 0 auto;
                    }
                    
                    .profile-body-wrapper .programs-wrapper .program:not(:first-child) {
                        margin-top: var(--peaky-gap-32);
                    }

                    .profile-body-wrapper .programs-wrapper .program {
                        width: 300px;
                    }

                    .profile-body-wrapper .programs-wrapper .program-img {
                        width: 300px;
                    }
                }
            `}</style>
        </>
    );
}

export default ProfileBody;