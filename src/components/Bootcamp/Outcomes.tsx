import React, { useState } from "react";
import { IOutcomes, IProject } from "../../interfaces/bootcamp";
import { Carousel } from "antd";
import {isMobile,isTablet} from 'react-device-detect';


interface IProps {
    data?: IOutcomes;
}

interface IState {
    carouselState: number;
    count: number;
}

const Outcomes = (props: IProps) => {
    const { data } = props;

    const defaultState = {
        carouselState : 0,
        count : 0
    }

    const [state, setState] = useState<IState>(defaultState);

    let carousel: any = React.createRef();

    const { carouselState, count } = state;

    const handleNext = () => {
        const  projects = (data && data.projects) ? data.projects : [];
        let scrollCount = projects.length-2;
        if (state.count < scrollCount) {
            carousel.next();
            const newCount = state.count + 1;
            setState({ count: newCount,
                carouselState: newCount === scrollCount-1?1:2 });
        }
    };

    const handlePrev = () => {
        if (count > 0) {
            carousel.prev();
            const newCount = count - 1;
            setState({ count: newCount,
                carouselState: newCount === 0?0:2});
        }
    };

    const renderProjects = (projects: Array<IProject> = []) => {
        return projects.map((project, key) => 
            <div className="project-card" key={key}>
                <div className="f-d f-vt f-h-e project-image bg-image" 
                        style={{backgroundImage:"linear-gradient(to bottom, rgba(0, 0, 0, 0), #000000),url("+project.image+")"}}>
                    <h3 className="project-name text-medium strong-text">
                        {project.name}
                    </h3>
                    <span className="technologies-used text-regular text-faded">
                        {project.technologies}
                    </span>
                </div>
            </div>
        )
    }

    const carouselProps = {
        dots: false,
        draggable: !isMobile || !isTablet?false:true,
        arrows: false,
        speed:100,
        slidesToShow: !isMobile?3.5:isTablet?2.1:1.1,
        slidesToScroll: 1,
        infinite:false
    };

    return (
        <>
            <div className="tb-pad-d tb-pad-m outcomes-content-wrapper"
            id="outcomes">
                <h1 className="font-heading text-xl text-c-d">
                    { data?.title }
                </h1>
                <div className="projects-wrapper">
                    <Carousel ref={(node) => (carousel = node)} {...carouselProps}>
                        { renderProjects(data?.projects) }
                    </Carousel>
                    <div className="f-d f-h-e carousel-action-elements">
                        <button className={`f-d f-v-c c-pointer ${carouselState === 0?'disable':''}`} 
                        onClick={() => carouselState !== 0 && handlePrev()}>
                            <i className="icon icon-chevron-left"></i>
                        </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button className={`f-d f-v-c c-pointer ${carouselState === 1?'disable':''}`} 
                        onClick={() => carouselState !== 1 && handleNext()}>
                            <i className="icon icon-chevron-right"></i>
                        </button>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .outcomes-content-wrapper {
                    background-color: var(--primary-bg);
                }

                .outcomes-content-wrapper .projects-wrapper {
                    margin: var(--peaky-gap-48) 0 0;
                    padding: 0 0 0 4rem;
                }

                .outcomes-content-wrapper
                .projects-wrapper .project-card {
                    height:380px;
                    width:100%;
                }

                .outcomes-content-wrapper
                .projects-wrapper .project-card 
                .project-image {
                    height:95%;
                    width:92%;
                    padding: var(--peaky-pad-32);
                    color: var(--dove);
                    border-radius:4px;
                }

                .outcomes-content-wrapper
                .projects-wrapper .project-card 
                .project-image .project-name {
                    color: var(--dove)!important;
                    font-family: Inconsolata;
                    // margin-bottom:0.3rem;
                }

                .outcomes-content-wrapper
                .projects-wrapper .project-card 
                .project-image .technologies-used {
                    // font-weight:300;
                }

                .outcomes-content-wrapper
                .carousel-action-elements {
                    margin: var(--peaky-gap-24) 0 0;
                    padding: 0 4rem 0 0;
                }

                .outcomes-content-wrapper
                .carousel-action-elements > button {
                    background-color: transparent;
                    border: 1px solid var(--dove);
                    border-radius: var(--peaky-br-2);
                    padding: 12px;
                }

                .outcomes-content-wrapper
                .carousel-action-elements .icon {
                    font-size: 32px;
                }

                .outcomes-content-wrapper
                .carousel-action-elements .disable {
                    opacity: 0.3;
                }

                @media only screen and (max-device-width: 760px) {

                    .outcomes-content-wrapper
                    .projects-wrapper {
                        padding-left: 1rem;
                    }

                    .outcomes-content-wrapper
                    .projects-wrapper .project-card {
                        height:350px;
                    }

                    .outcomes-content-wrapper
                    .projects-wrapper .project-card 
                    .project-image {
                        height: 90%;
                        width: 95%;
                        padding: var(--peaky-pad-24);
                    }

                    .outcomes-content-wrapper
                    .course-outcomes-wrapper {
                        margin-top: var(--peaky-gap-64);
                    }

                    .outcomes-content-wrapper
                    .course-outcomes-wrapper .description {
                        white-space:unset;
                    }

                    .outcomes-content-wrapper
                    .carousel-action-elements {
                        display:none;
                    }
                }

                @media only screen and (max-device-width: 360px) {
                    .outcomes-content-wrapper
                    .projects-wrapper .project-card {
                        height:300px;
                    }
                }

                @media screen and (min-width: 768px) and 
                (max-width: 1023px) and 
                (orientation: portrait) {
                    .outcomes-content-wrapper
                    .projects-wrapper .project-card {
                        height:350px;
                    }

                    .outcomes-content-wrapper
                    .carousel-action-elements {
                        display:none;
                    }
                }
            `}</style>
        </>
    )
}

export default Outcomes;