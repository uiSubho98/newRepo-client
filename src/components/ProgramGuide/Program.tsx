import React from "react";
import { useHistory } from "react-router";
import ProgramGuideSkeleton from "../Skeletons/ProgramGuideSkeleton";


interface IProgram {
    name: string;
    duration: string;
    type: string;
    mode: string;
    slug: string;
}

interface IProps {
    mode: number;
    isLoading: boolean;
    program?: IProgram;
    setMode: Function;
    update: Function;
}

const Program = (props: IProps) => {

    const { mode,  isLoading, program, update } = props;

    const isActive = mode === 3;

    const history = useHistory();

    const handleClick = () => {
        history.push({
            pathname: "/" + program?.slug
        });
    }

    return (
        <>
            {
                !isLoading ?
                <div className={`f-d f-vt f-v-c program-wrapper
                ${isActive ? "" : "inactive"}`}>
                    <h1 className="font-heading text-xxl text-c-d
                    title">
                        Here’s the best program for you
                    </h1>
                    <div className="g-d w-50 program-info">
                        <div className="f-d f-vt">
                            <span className="font-heading text-big">
                                { program?.name }
                            </span>
                            <span className="text-regular info">
                                { program?.duration } | { program?.type } | { program?.mode }
                            </span>
                        </div>
                        <div className="f-d f-v-c f-h-e">
                            <span className="f-d f-v-c f-ht text-regular strong-text
                            cap-letter c-pointer learn-more-btn" onClick={() => handleClick()}>
                                Learn More
                                <i className="icon icon-chevron-right"></i>
                            </span>
                        </div>
                    </div>

                    <span className="f-d text-regular 
                    start-again-btn c-pointer" 
                    onClick={() => update()}>
                        Start again
                    </span>
                </div> :
                <ProgramGuideSkeleton />
            }
            <style jsx>{`
                .program-wrapper {
                    margin: var(--peaky-gap-32) 0 0;
                }

                .program-wrapper.inactive {
                    display: none;
                }

                .program-wrapper .program-info {
                    background-color: var(--secondary-bg);
                    grid-template-columns: 3fr 1fr;
                    margin: var(--peaky-gap-64) 0 0;
                    padding: var(--peaky-pad-32);
                }

                .program-wrapper .program-info 
                .info {
                    font-weight: 300;
                    opacity: 0.87;
                }

                .program-wrapper .program-info
                .learn-more-btn .icon {
                    color: var(--primary);
                    font-size: 21px;
                }

                .start-again-btn {
                    margin: var(--peaky-gap-64) 0;
                    opacity: 0.87;
                    text-decoration: underline;
                }

                @media only screen and (max-device-width: 760px) {
                    .program-wrapper .title {
                        line-height: 50px;
                    }

                    .program-wrapper .program-info {
                        grid-template-columns: 1fr;
                        margin-top: var(--peaky-gap-48);
                        padding: var(--peaky-pad-16);
                        width: 100%;
                    }

                    .program-wrapper .program-info > div:nth-of-type(2) {
                        margin: var(--peaky-gap-16) 0 0;
                        justify-content: flex-start;
                    }

                    .start-again-btn {
                        margin: var(--peaky-gap-32) 0;
                    }
                }
            `}</style>
        </>
    )
}

export default Program;