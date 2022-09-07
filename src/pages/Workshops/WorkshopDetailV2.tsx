import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Layout from "../../components/Layout";
import Spinner from "../../components/Spinner/spinner";
import Faqs from "../../components/Workshops/Details/Faqs";
import HeroV2 from "../../components/Workshops/Details/HeroV2";
import LearningsV2 from "../../components/Workshops/Details/LearningsV2";
import SpeakersV2 from "../../components/Workshops/Details/SpeakersV2";
import Teaser from "../../components/Workshops/Details/Teaser";
import TimerBlock from "../../components/Workshops/Details/TimerBlock";
import RegisterBlock from "../../components/Workshops/Details/RegisterBlock";
import moment, { Moment } from "moment";
import { IWorkshop, IWorkshopTime } from "../../components/Workshops/workshops";
import axios, { AxiosResponse } from "axios";
import { G_API_URL } from "../../constants/constants";
// @ts-ignore
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import Hero from "../../components/Workshops/Details/Hero";
import Testimonials from "../../components/Workshops/Details/Testimonials";
import Learnings from "../../components/Workshops/Details/Learnings";
import Students from "../../components/Workshops/Details/Students";
import RightForYouBlock from "../../components/Workshops/Details/RightForYouBlock";
import FeaturedIn from "../../components/Workshops/Details/FeaturedIn";
import Speakers from "../../components/Workshops/Details/Speakers";
import Popup from "../../components/Workshops/Popup";
import ReplayInfoBlock from "../../components/Workshops/Details/ReplayInfo";
import { __getToken } from "../../utils/user-details.util";
import { Modal } from "antd";
import ReactPlayer from "react-player";
import LoginForm from "../../components/Login/LoginForm";
import { check_login } from "../../utils/login.util";
import SignupForm from "../../components/Signup/SignupForm";
import { getGATag } from "../../utils/common.util";
import ReactPixel from 'react-facebook-pixel';

const defaultWorkshop = {
    workshopKey: "",
    workshopType: "free",
    heroContent: {
        breadcrumb: "All Workshops >",
        title: "",
        deliveryType: "Online - Live"
    },
    price: 0,
    learnings: {
        title: "What you'll learn",
        desc: "",
        topicsHeading: "Key topics covered",
        topics: [],
        bookingText: "",
        list: [],
        subtitle: ""
    },
    teaser: {
        url: "",
        thumb: ""
    },
    speakers: {
        title: "Presenters/Hosts",
        list: []
    },
    faqs: {
        title: "Frequently Asked Questions",
        list: []
    },
    workshopTimes: [],
    workshopMode: 0,
    registrationsClosed: false
}
const WorkshopDetailV2: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [loading, setLoading] = useState<boolean>(true);
    
    const [ended, setEnded] = useState<boolean>(true);
    const history = useHistory();
    const [workshop, setWorkshop] = useState<IWorkshop>(defaultWorkshop);
    const [startTime, setStartTime] = useState<Moment>(moment());
    const [registerModalData, setRegisterModalData] = useState<{isVisible: boolean, mode: number}>({isVisible: false, mode: 1});
    const [isReplayVisible, setReplayVisibility] = useState<boolean>(false);
    const [replayMode, setReplayMode] = useState<number>(1);
    const [rerenderValue, setRerender] = useState<boolean>(false);

    // Fetch workshop data
    useEffect(() => {
        axios.get(G_API_URL+'workshops/details?wid='+slug,{
            headers:{
                "Authorization": __getToken()
            }
        })
            .then((response: AxiosResponse) => {
                if(response.data.status === 1) {
                    setWorkshop(response.data.details);
                    // Find starttime
                    if(response.data.details.workshopTimes.length === 1) {
                        let stTime = moment(response.data.details.workshopTimes[0].startTime * 1000).utcOffset("+05:30");
                        setStartTime(stTime);
                    } else {
                        let sortedStartTimes = response.data.details.workshopTimes.sort((a: IWorkshopTime, b: IWorkshopTime) => a.startTime - b.startTime);
                        let stTime = moment(sortedStartTimes[0].startTime * 1000).utcOffset("+05:30");
                        setStartTime(stTime);
                    }
                    setLoading(false);
                } else {    // Workshop with defined slug doesn't exist, redirect to 404
                    history.push('/404');
                }
            }).catch(err => {
                console.log("Workshop Details fetch API error", err);
            })
    }, [history, slug]);
    
    useEffect(() => {
        setEnded((startTime.unix() - moment().unix()) <= 0)
    }, [startTime]);

    const handleRegister = (mode?: number) => {
        // add tracking
        const platformEnv = process.env.REACT_APP_PLATFORM;
        if (platformEnv === 'prod') {
            // Send Google Analytics Event
            const tag = getGATag("workshop_link_click", "subscribers", "Workshop", 1);
            document.body.appendChild(tag);

            // Send Workshop Link Click Event to Pixel
            ReactPixel.track('Workshop Link Click', {
                value: 1,
                content_category: "Workshop",
                content_type: "workshop"
            });

            // Google Ads Events
            const s1 = document.createElement("script");
            s1.type = "text/javascript";
            s1.async = true;
            s1.innerHTML =
                "gtag('event', 'conversion', { 'send_to': 'AW-439710104/fUHECNam-IkCEJjj1dEB'});";
            document.body.appendChild(s1);
        }

        if(check_login()) {
            setRegisterModalData({isVisible: true, mode: 3})
        } else if(mode !== undefined) {
            setRegisterModalData({isVisible: true, mode: mode})
        } else {
            setRegisterModalData({isVisible: true, mode: 1})
        }
    }

    const showReplay = () => {
        if(check_login()) {
            setReplayMode(2);
        }
        setReplayVisibility(true);
    }

    return (
        <>
            {
                !loading ?
                    <Layout footer={true}>
                        <Helmet>
                            <title>ProGrad | Workshops</title>
                        </Helmet>
                        {
                            workshop.workshopMode === 0 &&
                            <div className="workshop-wrapper g-d g-col-1 g-h-c tb-pad-d tb-pad-m">
                                <Hero 
                                    data={workshop.heroContent} 
                                    startTime={startTime.unix()} 
                                    workshopTimes={workshop.workshopTimes} 
                                    handleRegister={handleRegister} 
                                    joinUrl={workshop.joinUrl}
                                    ended={ended}
                                    replayAvailable={workshop.heroContent.replayUrl !== undefined}
                                    showReplay={showReplay}
                                    registrationsClosed={workshop.registrationsClosed}
                                />
                                <Testimonials data={workshop.testimonials} />
                                <Learnings 
                                    data={workshop.learnings} 
                                    handleRegister={handleRegister}
                                    joinUrl={workshop.joinUrl}
                                    ended={ended}
                                    registrationsClosed={workshop.registrationsClosed} 
                                />
                                <Students data={workshop.students} />
                                <RightForYouBlock data={workshop.rightForYou} />
                                <FeaturedIn data={workshop.featuredIn} />
                                <Speakers 
                                    data={workshop.speakers} 
                                    handleRegister={handleRegister}
                                    joinUrl={workshop.joinUrl}
                                    ended={ended}
                                    registrationsClosed={workshop.registrationsClosed} 
                                />
                            </div>
                        }
                        {
                            workshop.workshopMode === 1 &&
                            <div className="workshop-wrapper g-d g-col-1 g-h-c tb-pad-d tb-pad-m">
                                <HeroV2 ended={ended} heroContent={workshop.heroContent} workshopTimes={workshop.workshopTimes} startTime={startTime} slug={slug} showReplay={showReplay} />
                                {!ended && (!workshop.registrationsClosed || workshop.joinUrl) &&
                                <TimerBlock 
                                    startTime={startTime}
                                    price={workshop.price}
                                    handleRegister={handleRegister}
                                    joinUrl={workshop.joinUrl}
                                    bookingText={workshop.heroContent.bookingText}
                                />}
                                {
                                    ended && !workshop.heroContent.replayUrl &&
                                    <ReplayInfoBlock />
                                }
                                {
                                    !ended && workshop.registrationsClosed && !workshop.joinUrl &&
                                    <ReplayInfoBlock registrationsClosed={workshop.registrationsClosed}/>
                                }
                                <LearningsV2 learnings={workshop.learnings}/>
                                {workshop.teaser && <Teaser data={workshop.teaser}/>}
                                <SpeakersV2 data={workshop.speakers}/>
                                <Faqs data={workshop.faqs}/>
                                {!ended && !workshop.registrationsClosed && <RegisterBlock handleRegister={handleRegister} joinUrl={workshop.joinUrl} bookingText={workshop.registerBlock?.bookingText} />}
                            </div>
                        }
                        <Popup
                            workshopKey={workshop.workshopKey}
                            workshopPrice={workshop.price}
                            workshopType={workshop.workshopType}
                            regFields={workshop.regFields}
                            regQuestions={workshop.regQuestions}
                            startTime={startTime.unix()}
                            title={workshop.heroContent.title}
                            rerender={() => { setRerender(!rerenderValue) }}
                            modalData={registerModalData}
                            setModalData={setRegisterModalData}
                            registrationsClosed={workshop.registrationsClosed}
                        />
                        <Modal
                            footer={null}
                            centered
                            destroyOnClose={true}
                            maskClosable={true}
                            visible={isReplayVisible}
                            onCancel={() => setReplayVisibility(false)}
                            className="replay-modal"
                        >
                            {
                                replayMode === 0 ?
                                <LoginForm type={"replay"} setMode={setReplayMode} /> :
                                replayMode === 1 ?
                                <SignupForm type={"replay"} setMode={setReplayMode} /> :    
                                <ReactPlayer
                                    url={workshop.heroContent.replayUrl}
                                    playing={true}
                                    controls
                                    volume={0.2}
                                    muted
                                    className="video-player f-d f-v-c"
                                />
                            }
                        </Modal>
                    </Layout> :
                    <Spinner />
            }
            <style jsx>
                {`
                    .workshop-wrapper {
                        padding-top: 0;
                    }

                    .replay-modal {
                        width: max-content !important;
                    }

                    .replay-modal .ant-modal-body {
                        padding:0;
                        background: linear-gradient(180deg, #2E2E2E 0%, #1E1E1E 100%) !important;
                        padding: ${(replayMode !== 0 && replayMode !== 1) ? '0' : 'var(--peaky-pad-32) 64px'};
                    }

                    .replay-modal .ant-modal-close {
                        z-index:2;
                        font-size:24px;
                    }

                    .replay-modal .ant-modal-close-x {
                        position: absolute;
                        width: 32px;
                        height: 32px;
                        color: var(--dove);
                        font-size: 18px;
                        font-weight: 600;
                        line-height: 24px;
                    }

                    @media only screen and (max-device-width: 760px) {
                        .replay-modal .ant-modal-close {
                            display: none;
                        }

                        .ant-modal.replay-modal .ant-modal-body .video-player {
                            height: 100% !important;
                            width: 100% !important;
                        }

                        .replay-modal.ant-modal {
                            width: 90% !important;
                            max-width: unset;
                        }

                        .replay-modal .ant-modal-body {
                            padding-right: ${(replayMode !== 0 && replayMode !== 1) ? '0' : 'var(--peaky-pad-16)'};
                            padding-left: ${(replayMode !== 0 && replayMode !== 1) ? '0' : 'var(--peaky-pad-16)'};
                        }
                    }
                `}
            </style>
        </>
    )
}
export default WorkshopDetailV2;