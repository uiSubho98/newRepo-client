import React from "react";
// @ts-ignore
import { ISpeaker } from "../workshops";
import LinkedIn from "../../../assets/imgs/workshop_detail/linkedin.svg";
import LinkedInHover from "../../../assets/imgs/workshop_detail/linkedin_hover.svg";
import { check_login } from "../../../utils/login.util";

interface ISpeakersProps {
    data: {
        bookingText?: string;
        list: Array<ISpeaker>;
        title: string;
    };
    handleRegister: Function;
    joinUrl?: string;
    ended: boolean;
    registrationsClosed: boolean;
}

const Speakers = (props: ISpeakersProps) => {
    const { bookingText, list, title } = props.data;
    const { joinUrl, ended, registrationsClosed } = props;
    const loggedIn = check_login();

    return (
        <>
            <div className="speakers-wrapper lr-pad-d lr-pad-m tb-pad-d tb-pad-m">
                <h3 className="font-heading text-xl f-d f-h-c title text-c-m">{title}</h3>
                <div className="speakers-container f-d f-h-c f-vt-m f-v-c-m">    
                    {list.map((speaker: ISpeaker, idx: number) => {
                        return (
                            <div className="speaker-wrapper f-d f-vt f-h-e bg-image-full c-pointer" onClick={() => { window.open(speaker.linkedin) }} key={idx} style={{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), #1E1E1E),url(${speaker.imgUrl})` }}>
                                <div className="f-d f-h-sb">
                                    <div className="left-pane">
                                        <div className="name font-heading text-big">{speaker.name}</div>
                                        <div className="role text-faded">{speaker.role}</div>
                                    </div>
                                    <div className="right-pane">
                                        <div className="linkedin-icon bg-image-full"></div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="btn-wrapper f-d f-h-c">
                    {
                        !ended &&
                        <>
                            {
                                joinUrl ?
                                    <button className="default-blue-btn" onClick={() => { window.open(joinUrl) }}>
                                        Join Workshop
                                    </button>
                                    :
                                    <button className="default-blue-btn" onClick={() => { !registrationsClosed && props.handleRegister() }}>
                                        {registrationsClosed ? 'Workshop is Full' : bookingText}
                                    </button>
                            }
                        </>
                    }
                </div>
                {
                    !ended && !loggedIn &&
                    <div className="text-small text-faded text-c-d mt-16">Already registered? <u className="c-pointer" onClick={() => { props.handleRegister(0) }}>Log in</u></div>
                }
            </div>
            <style jsx>
                {`
                    .speakers-wrapper {
                        width: 100%;
                    }
                    
                    .speakers-wrapper .speakers-container {
                        margin: var(--peaky-gap-48) 0;
                    }
                    
                    .speakers-wrapper .speakers-container .speaker-wrapper {
                        width: 400px;
                        height: 400px;
                        padding: var(--peaky-gap-32);
                        border-radius: var(--peaky-br-4);
                        margin: var(--peaky-gap-24);
                    }

                    .speakers-wrapper .speakers-container .speaker-wrapper .linkedin-icon {
                        width: 50px;
                        height: 50px;
                        background-image: url(${LinkedIn});
                    }

                    .speakers-wrapper .speakers-container .speaker-wrapper:hover .linkedin-icon {
                        background-image: url(${LinkedInHover});
                    }

                    .mt-16 {
                        margin-top: var(--peaky-gap-16);
                    }
                    
                    @media only screen and (max-device-width: 760px) {
                        .speakers-wrapper > .title {
                            line-height: 2.23rem;
                        }

                        .speakers-wrapper .speakers-container {
                            margin: var(--peaky-gap-48) 0;
                        }

                        .speakers-wrapper .speakers-container .speaker-wrapper {
                            margin: var(--peaky-gap-16) 0;
                            width: calc(100vw - 2rem);
                            height: calc(100vw - 2rem);
                        }


                        .speakers-wrapper .btn-wrapper .default-blue-btn {
                            width: 100%;
                            padding: 0;
                        }
                    }
            `}
            </style>
        </>
    )
}

export default Speakers;