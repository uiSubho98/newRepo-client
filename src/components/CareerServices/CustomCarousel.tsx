import React, { useState } from "react";

interface IProps {
    prograds: Array<string>;
}

interface IState {
    active: number;
    preview: number;
    preview_alt: number;
    prev: boolean;
    next: boolean;
}

const CustomCarousel = (props: IProps) => {
    const { prograds } = props;
    const defaultState: IState = {
        active: 0,
        preview: 1,
        preview_alt: 2,
        prev: false,
        next: true
    }

    const [state, setState] = useState<IState>(defaultState);
    const { active, preview, preview_alt, prev, next } = state;

    const handleNext = () => {
        let newState: any = {
            active: active + 1,
            preview: preview + 1,
            preview_alt: preview_alt + 1
        }

        if(!prev) {
            newState.prev = true;
        }

        if(newState.active === prograds.length - 1) {
            newState.preview =  - 1;
            newState.preview_alt = - 1;
            newState.next = false;
        }

        if(newState.preview === prograds.length - 1) {
            newState.preview_alt = - 1;
        }

        setState(prev => ({
            ...prev,
            ...newState
        }))
    }

    const handlePrev = () => {
        let newState: any = {
            active: active - 1,
            preview: preview - 1,
            preview_alt: preview_alt - 1
        }

        if(!next) {
            newState.next = true;
        }

        if(newState.active === 0) {
            newState.preview = newState.active + 1;
            newState.preview_alt = newState.active + 2;
            newState.prev = false;
        }

        if(newState.active === prograds.length - 2) {
            newState.preview = newState.active + 1;
        }

        if(newState.active === prograds.length - 3) {
            newState.preview_alt = newState.active + 2;
        }

        if(newState.preview === 0) {
            newState.preview_alt = newState.active + 1;
        }
        
        setState(prev => ({
            ...prev,
            ...newState
        }))
    }

    return (
        <>
            <div className="custom-carousel-wrapper">
                <img src={prograds[preview_alt]} className="inactive-card preview-alt" alt="" />
                <img src={prograds[preview]} className="inactive-card preview" alt="" />
                <img src={prograds[active]} className="active-card" alt="" />
                {
                    prev &&
                    <span className="f-d f-v-c action-element left"
                    onClick={() => handlePrev()}>
                        <i className="icon icon-chevron-left"></i>
                    </span>
                }
                {
                    next &&
                    <span className="f-d f-v-c action-element right"
                    onClick={() => handleNext()}>
                        <i className="icon icon-chevron-right"></i>
                    </span>
                }
            </div>
            <style jsx>{`
                .custom-carousel-wrapper {
                    position: relative;
                }

                .custom-carousel-wrapper .active-card,
                .custom-carousel-wrapper .inactive-card {
                    position: absolute;
                    height: 400px;
                    right: 0;
                    border-radius: var(--peaky-br-4);
                    object-fit: contain;
                }

                .custom-carousel-wrapper .active-card {
                    right: 10%;
                }

                .custom-carousel-wrapper .inactive-card.preview {
                    height: 300px;
                    right: 5%;
                    margin: 50px 0;
                    opacity: 0.54;
                }

                .custom-carousel-wrapper .inactive-card.preview-alt {
                    height: 200px;
                    margin: 100px 0;
                    opacity: 0.54;
                }

                .custom-carousel-wrapper .action-element {
                    position: absolute;
                    background: var(--crow);
                    color: var(--dove);
                    font-size: 30px;
                    cursor: pointer;
                    padding: 4px;
                    border-radius: var(--peaky-br-full);
                }

                .custom-carousel-wrapper .action-element.right {
                    right: 0;
                    top: 180px;
                }


                .custom-carousel-wrapper .action-element.left {
                    left: 8%;
                    top: 180px;
                }

                .custom-carousel-wrapper .action-element:hover {
                    background: var(--primary-bg);
                }

                @media only screen and (min-width: 1024px) and (max-width: 1365px) {
                    .custom-carousel-wrapper .action-element.left {
                        left: 4%;
                    }
                }
            `}</style>
        </>
    )
}

export default CustomCarousel;