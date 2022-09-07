import React, { useState } from "react";

interface IProps {
    prograds: Array<string>;
}

interface IDefaultState {
    preview: number;
    active: number;
}

const CustomCarousel = (props: IProps) => {
    const {prograds} = props;
    
    const defaultState: IDefaultState = {
        preview: 1,
        active: 0
    }

    const [state, setState] = useState<IDefaultState>(defaultState);

    const { preview, active } = state;

    const handlePrev = () => {
        setState(prev => ({
            ...prev,
            active: - 1,
            preview: active
        }))

        setTimeout(() => {
            setState(prev => ({
                ...prev,
                active: active - 1,
                preview: active
            }))
        }, 50)
    }

    const handleNext = () => {
        setState(prev => ({
            ...prev,
            active: -1,
            preview: preview + 1 > prograds.length - 1 ? - 1 : preview + 1
        }))

        setTimeout(() => {
            setState(prev => ({
                ...prev,
                active: preview,
                preview: preview + 1 > prograds.length - 1 ? - 1 : preview + 1
            }))
        }, 50)
    }
    const location = window.location.href;
    let customClass = "";
    if(location.includes("microdegree") || location.includes("bootcamp")) {
        customClass = "custom-wrapper"
    }
    return (
        <>
            <div className="custom-carousel-wrapper w-80">
                <img className="preview-card" src={prograds[preview]} alt="" />
                <img className="active-card" src={prograds[active]} alt="" />
                <div className={`f-d f-h-e action-block w-100 ${customClass}`}>
                    <button className={`f-d f-v-c c-pointer ${active === 0?'disable':''}`} 
                    onClick={() => active !== 0 && handlePrev()}>
                        <i className="icon icon-chevron-left"></i>
                    </button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <button className={`f-d f-v-c c-pointer ${active === prograds.length - 1?'disable':''}`} 
                    onClick={() => active !== prograds.length - 1 && handleNext()}>
                        <i className="icon icon-chevron-right"></i>
                    </button>
                </div>
            </div>
            <style jsx>{`
                .custom-carousel-wrapper {
                    position: relative;
                }

                .custom-carousel-wrapper .preview-card,
                .custom-carousel-wrapper .active-card {
                    border-radius: var(--peaky-br-4);
                    position: absolute;
                    object-fit: contain;
                }

                .custom-carousel-wrapper .preview-card {
                    right: 0;
                    height: 288px;
                    opacity: 0.54;
                }

                .custom-carousel-wrapper .active-card {
                    height: 426px;
                    top: 10%;
                }

                .custom-carousel-wrapper .action-block {
                    position: absolute;
                    top: 85%;
                }

                .custom-carousel-wrapper .action-block.custom-wrapper {
                    top: 80%;
                }

                .custom-carousel-wrapper .action-block > button {
                    background-color: transparent;
                    border: 1px solid var(--dove);
                    border-radius: var(--peaky-br-2);
                    padding: 12px;
                }

                .custom-carousel-wrapper .action-block .disable {
                    opacity: 0.3;
                }

                .custom-carousel-wrapper .icon {
                    font-size: 32px;
                }
            `}</style>
        </>
    )
}

export default CustomCarousel;