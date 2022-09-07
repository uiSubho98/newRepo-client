import React from "react";
import { ILearning } from "../workshops";

interface ILearningsProps {
    data: {
        bookingText: string;
        list: Array<ILearning>;
        subtitle: string;
        title: string;
    },
    handleRegister: () => void;
    joinUrl?: string;
    ended: boolean;
    registrationsClosed: boolean;
}

const Learnings = (props: ILearningsProps) => {
    const { title, bookingText, subtitle, list } = props.data;
    const { joinUrl, ended, registrationsClosed } = props;
    
    return (
        <>
            <div className="learnings-wrapper lr-pad-d lr-pad-m tb-pad-d tb-pad-m">
                <h3 className="font-heading text-xl f-d f-h-c title">{title}</h3>
                <div className="text-medium f-d f-h-c subtitle text-faded-2 text-c-m">{subtitle}</div>
                <div className="learnings-container g-d g-col-2 g-gap-48 g-col-1-m g-gap-16-m">
                    {list.map((learning: ILearning, idx: number) => {
                        return (
                            <div className="learning-wrapper f-m f-vt-m f-v-c-m" key={idx}>
                                <div className="icon bg-image-full" style={{backgroundImage: `url(${learning.icon})`}}></div>
                                <div className="title text-medium text-c-m">{learning.title}</div>
                                <div className="desc text-faded text-c-m">{learning.desc}</div>
                            </div>
                        );
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
                                        {registrationsClosed ? 'Workshop is Full' :bookingText}
                                    </button>
                            }
                        </>
                    }
                </div>
            </div>
            <style jsx>
                {`
                    .learnings-wrapper {
                        background-color: var(--primary-bg);
                        width: 100%;
                    }

                    .learnings-wrapper .title {
                        margin-bottom: var(--peaky-gap-16);
                    }
                    
                    .learnings-wrapper .learnings-container {
                        margin: var(--peaky-gap-64) 0;
                    }

                    .learnings-wrapper .learning-wrapper {
                        background-color: var(--secondary-bg);
                        height: 250px;
                        width: 450px;
                        padding: var(--peaky-pad-32);
                    }

                    .learnings-wrapper .learning-wrapper:nth-of-type(2n+1) {
                        justify-self: end;
                    }

                    .learnings-wrapper .learning-wrapper .icon {
                        width: 34px;
                        height: 34px;
                    }

                    .learnings-wrapper .learning-wrapper .title {
                        font-weight: 600;
                        margin: 32px 0 16px 0;
                    }

                    @media only screen and (max-device-width: 760px) {
                        .learnings-wrapper .learning-wrapper {
                            height: min-content;
                            width: 100%;
                            padding: var(--peaky-pad-16);
                        }

                        .learnings-wrapper .default-blue-btn {
                            width: 100%;
                        }
                    }
            `}
            </style>
        </>
    )
}

export default Learnings;