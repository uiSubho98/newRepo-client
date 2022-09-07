import React from "react";
import { ISpeaker } from "../workshops";
// import LinkedIn from "../../../assets/imgs/workshop_detail/linkedin.svg";
// import LinkedInHover from "../../../assets/imgs/workshop_detail/linkedin_hover.svg";

interface ISpeakersProps {
    data: {
        list: Array<ISpeaker>;
        title: string;
    },
}

const SpeakersV2 = (props: ISpeakersProps) => {
    const { list, title } = props.data;

    return (
        <>
            <div className="speakers-wrapper lr-pad-d lr-pad-m tb-pad-d tb-pad-m">
                <h3 className="font-heading text-xl title text-c-m">{title}</h3>
                <div className="speakers-container f-d f-vt-m f-v-c-m">    
                    {list.map((speaker: ISpeaker, idx: number) => {
                        return (
                            <div className="speaker-wrapper f-d f-vt f-h-e bg-image-full c-pointer" onClick={() => { window.open(speaker.linkedin) }} key={idx} style={{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), #1E1E1E),url(${speaker.imgUrl})` }}>
                                <div className="f-d f-h-sb">
                                    <div className="left-pane">
                                        <div className="name font-heading text-big">{speaker.name}</div>
                                        <div className="role text-faded">{speaker.role}</div>
                                    </div>
                                    <div className="right-pane">
                                        <div className="icon-wrapper">
                                            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g filter="url(#filter0_b)">
                                                    <path className="icon-bg" fillRule="evenodd" clipRule="evenodd" d="M25 50C38.8071 50 50 38.8071 50 25C50 11.1929 38.8071 0 25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50Z" fill="#1E1E1E" />
                                                </g>
                                                <path d="M32.0409 32.0413H29.0776V27.4004C29.0776 26.2937 29.0578 24.8691 27.5363 24.8691C25.9929 24.8691 25.7567 26.0749 25.7567 27.3199V32.041H22.7934V22.4974H25.6382V23.8016H25.678C25.9627 23.3148 26.3741 22.9144 26.8684 22.6429C27.3627 22.3714 27.9214 22.2391 28.4849 22.26C31.4884 22.26 32.0422 24.2357 32.0422 26.8059L32.0409 32.0413ZM19.4497 21.1929C19.1096 21.1929 18.7771 21.0921 18.4942 20.9032C18.2114 20.7143 17.9909 20.4457 17.8607 20.1315C17.7305 19.8173 17.6964 19.4715 17.7627 19.1379C17.829 18.8043 17.9927 18.4979 18.2332 18.2573C18.4736 18.0167 18.78 17.8529 19.1136 17.7865C19.4472 17.7201 19.7929 17.7541 20.1072 17.8842C20.4214 18.0143 20.6901 18.2347 20.8791 18.5174C21.0681 18.8002 21.169 19.1327 21.1691 19.4728C21.1691 19.6987 21.1247 19.9223 21.0383 20.131C20.9519 20.3396 20.8253 20.5292 20.6656 20.6889C20.5059 20.8487 20.3164 20.9754 20.1078 21.0618C19.8991 21.1483 19.6755 21.1928 19.4497 21.1929ZM20.9314 32.0413H17.9649V22.4974H20.9314V32.0413ZM33.5183 15.0014H16.4758C16.089 14.997 15.7163 15.1464 15.4395 15.4167C15.1628 15.687 15.0047 16.0561 15 16.443V33.5567C15.0046 33.9438 15.1625 34.3131 15.4393 34.5837C15.716 34.8543 16.0888 35.004 16.4758 34.9999H33.5183C33.9061 35.0047 34.28 34.8555 34.5578 34.5849C34.8356 34.3143 34.9946 33.9445 35 33.5567V16.4417C34.9945 16.0541 34.8353 15.6846 34.5575 15.4143C34.2797 15.144 33.9059 14.995 33.5183 15.0001" fill="white" />
                                                <defs>
                                                    <filter id="filter0_b" x="-64" y="-64" width="178" height="178" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                                        <feGaussianBlur in="BackgroundImage" stdDeviation="32" />
                                                        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur" />
                                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur" result="shape" />
                                                    </filter>
                                                </defs>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <style jsx>
                {`
                    .speakers-wrapper {
                        width: 100%;
                    }
                    
                    .speakers-wrapper .speakers-container {
                        margin: var(--peaky-gap-48) 0;
                        flex-wrap: wrap;
                    }
                    
                    .speakers-wrapper .speakers-container .speaker-wrapper {
                        width: 400px;
                        height: 400px;
                        padding: var(--peaky-gap-32);
                        border-radius: var(--peaky-br-4);
                        margin: var(--peaky-gap-24);
                    }

                    .speakers-wrapper .speakers-container .speaker-wrapper:first-child {
                        margin-left: 0;
                    }

                    .speakers-wrapper .speakers-container .speaker-wrapper:hover .icon-wrapper path.icon-bg {
                        fill: #0A66C2;
                    }

                    @media only screen and (max-device-width: 760px) {
                        .speakers-wrapper > .title {
                            line-height: 2.23rem;
                        }

                        .speakers-wrapper .speakers-container {
                            margin: var(--peaky-gap-48) 0 0;
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

export default SpeakersV2;