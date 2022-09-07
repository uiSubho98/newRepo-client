import React, { useState } from "react";
import { IStudent } from "../workshops";
import { Carousel } from "antd";
import { isMobile, isTablet } from "react-device-detect";

interface IStudentsProps {
    data?: {
        list: Array<IStudent>;
        subtitle: string;
        title: string;
    }
}

interface IState {
    carouselState: number;
    count: number;
}

const Students = (props: IStudentsProps) => {
    const { title, subtitle, list } = props.data!;
    const defaultState = {
        carouselState: 0,
        count: 0
    }

    const [state, setState] = useState<IState>(defaultState);
    let carousel: any = React.createRef();

    const { carouselState, count } = state;

    const handleNext = () => {
        const  students = list;
        let scrollCount = students.length-2;
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

    const carouselProps = {
        dots: false,
        draggable: !isMobile || !isTablet ? false : true,
        arrows: false,
        speed: 100,
        slidesToScroll: 1,
        infinite: false,
        variableWidth: true
    };
    
    const renderStudents = () => {
        return list.map((student: IStudent, idx: number) => {
            return (
                <div className="student-wrapper" key={idx}>
                    <div className="student-container f-d f-vt f-h-e bg-image-full" style={{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), #1E1E1E),url(${student.imgUrl})` }}>
                        <div className="name text-medium">{student.name}</div>
                        <div className="progress text-big">{student.progress}</div>
                    </div>
                </div>
            );
        })
    }
    return (
        <>
            <div className="students-wrapper tb-pad-d tb-pad-m">
                <h3 className="font-heading text-xl f-d f-h-c title text-c-m lr-pad-m">{title}</h3>
                <div className="text-medium f-d f-h-c subtitle-wrapper text-c-m lr-pad-m"><span className="subtitle text-c-d text-faded-2">{subtitle}</span></div>
                <div className="students-container f-m">
                    {!isMobile?
                        <Carousel ref={(node) => (carousel = node)} {...carouselProps}>
                            {renderStudents()}
                        </Carousel>
                        :
                        <>
                            {renderStudents()}
                        </>
                    }
                    <div className="f-d f-h-e carousel-action-elements hide-m">
                        <button className={`f-d f-v-c c-pointer ${carouselState === 0 ? 'disable' : ''}`}
                            onClick={() => carouselState !== 0 && handlePrev()}>
                            <i className="icon icon-chevron-left"></i>
                        </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button className={`f-d f-v-c c-pointer ${carouselState === 1 ? 'disable' : ''}`}
                            onClick={() => carouselState !== 1 && handleNext()}>
                            <i className="icon icon-chevron-right"></i>
                        </button>
                    </div>
                </div>
            </div>
            <style jsx>
                {`
                    .students-wrapper {
                        background-color: var(--crow);
                        width: 100vw;
                    }

                    .students-wrapper .title {
                        margin-bottom: var(--peaky-gap-16);
                    }

                    .students-wrapper .subtitle {
                        max-width: 650px;
                    }

                    .students-wrapper .students-container {
                        margin-top: var(--peaky-gap-64);
                        margin-left: 4rem;
                    }

                    .students-wrapper .students-container .student-wrapper {
                    }
                    
                    .students-wrapper .students-container .student-container {
                        border-radius: var(--peaky-br-4);
                        height: 500px;
                        width: 320px;
                        margin-right: var(--peaky-gap-32);
                        padding: var(--peaky-pad-32);
                    }

                    .students-wrapper .students-container .student-container .progress {
                        margin-top: var(--peaky-gap-16);
                        font-weight: 700;
                    }

                    .students-wrapper .carousel-action-elements {
                        margin: var(--peaky-gap-24) 0 0;
                        padding: 0 4rem 0 0;
                    }

                    .students-wrapper .carousel-action-elements > button {
                        background-color: transparent;
                        border: 1px solid var(--dove);
                        border-radius: var(--peaky-br-2);
                        padding: 12px;
                    }

                    .students-wrapper .carousel-action-elements .icon {
                        font-size: 32px;
                    }

                    .students-wrapper .carousel-action-elements .disable {
                        opacity: 0.3;
                    }
                    
                    @media only screen and (max-device-width: 760px) {
                        .students-wrapper .students-container {
                            width: 100vw;
                            overflow-x: auto;
                            overflow-y: hidden;
                            margin-left: 0;
                        }

                        .students-wrapper .students-container .student-container {
                            padding: var(--peaky-gap-16);
                            height: 117vw;
                            width: 75vw;
                            margin: 0 var(--peaky-gap-16);
                        }
                    }
            `}
            </style>
        </>
    )
}

export default Students;