import React from "react";
import Clock from '../../assets/icons/svg_icons/clock.svg';
import ProjectsIcon from "../../assets/icons/svg_icons/projects.svg";

interface IFaq {
    question?: string;
    answer?: string;
}

interface IOverview {
    title?: string;
    description?: string;
    duration?: string;
    totalProjects?: number;
    outcome?: string;
    faqs?: Array<IFaq>;
    imageSrc?: string;
}

interface IProps {
    data?: IOverview;
}

const renderFaqs = (faqs?: Array<IFaq>) => {
    return faqs &&
    faqs.map(faq => {
        return (
            <div className="faq">
                <span className="f-d body-regular strong-text">
                    { faq.question }
                </span>
                <span className="f-d body-small answer">
                    { faq.answer }
                </span>
            </div>
        )
    })
}

const Overview = (props: IProps) => {
    const { data } = props;
    return (
        <>
            <div className="overview-content-wrapper g-d g-col-2 g-col-1-m
            lr-pad-d lr-pad-m tb-pad-d tb-pad-m">
                <div className="left-pane g-d g-h-s g-v-c">
                    <div className="bg-image-full faq-image" style={{ 
                        backgroundImage:"url(" + data?.imageSrc + ")"}}>
                    </div>
                </div>
                <div className="right-pane">
                    <h2 className="h2-heading">
                        { data && data.title }
                    </h2>
                    <span className="body-regular">
                        { data && data.description }
                    </span>
                    <span className="f-d body-small info">
                        <span className="f-d f-v-c">
                            <div className="clock-icon bg-image-full"
                                style={{ backgroundImage: 'url(' + Clock + ')' }}>
                            </div>&nbsp;
                            { data && data.duration }
                        </span>
                        <span className="f-d f-v-c">
                            <div className="projects-icon bg-image-full"
                            style={{ backgroundImage: 'url(' + ProjectsIcon + ')' }}>
                            </div>&nbsp;
                            { data && data.totalProjects } Projects
                        </span>
                    </span>
                    <span className="body-regular">
                        { data?.outcome }
                    </span>
                    <div className="faq-container">
                        { data && renderFaqs(data.faqs) }
                    </div>
                </div>
            </div>
            <style jsx>{`

                .overview-content-wrapper .info {
                    margin: var(--peaky-gap-16) 0;
                }

                .overview-content-wrapper .left-pane
                .faq-image {
                    height: 500px;
                    width: 500px;
                }

                .overview-content-wrapper .info > 
                span:nth-of-type(2) {
                    margin:0 0 0 var(--peaky-gap-16);
                }

                .overview-content-wrapper .faq-container {
                    margin: var(--peaky-gap-48) 0 0;
                }

                .overview-content-wrapper .faq-container .faq .answer {
                    margin: var(--peaky-gap-8) 0 0;
                    white-space: pre-wrap;
                }

                .overview-content-wrapper .faq-container .faq {
                    margin: var(--peaky-gap-32) 0 0;
                }

                .overview-content-wrapper .info .clock-icon,
                .overview-content-wrapper .info .projects-icon {
                    height: 16px;
                    width: 16px;
                }

                .overview-content-wrapper .info .projects-icon {
                    margin-left: var(--peaky-gap-8);
                }

                @media only screen and (max-device-width: 760px) {
                    .overview-content-wrapper {
                        width: 100%;
                    }

                    .overview-content-wrapper .left-pane
                    .faq-image {
                        height: 300px;
                        width: 300px;
                    }
                }

                @media screen and (min-width: 768px) and 
                (max-width: 1023px) and (orientation: portrait) {
                    .overview-content-wrapper {
                        grid-template-columns: 1fr;
                    }

                    .overview-content-wrapper .left-pane {
                        justify-content: center;
                    }

                    .overview-content-wrapper .left-pane
                    .faq-image {
                        height: 400px;
                        width: 400px;
                    }
                }
            `}</style>
        </>
    )
}

export default Overview;