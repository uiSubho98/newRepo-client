import React from "react";
import { IProgress } from "../../interfaces/dashboard";


interface IProps {
    progress?: IProgress;
    redirect: Function;
}

const Coursework = (props: IProps) => {
    const { progress, redirect } = props;
    
    return (
        <>
            <div className="f-d f-v-c coursework-content-wrapper
            c-pointer" onClick={() => redirect("dashboard/?p="+progress?.ongoing?.program)}>
                <div>
                    <h1 className="font-heading text-medium">
                        Continue learning
                    </h1>
                    <span className="text-regular description">
                        Continue with your coursework to reach your next milestone.
                    </span>
                </div>
                <div>
                    <i className="icon icon-chevron-right"></i>
                </div>
            </div>
            <style jsx>{`
                .coursework-content-wrapper {
                    display: none;
                    background-color: var(--primary-bg);
                    padding: var(--peaky-pad-16);
                    margin: 0 0 var(--peaky-gap-32);
                }

                .coursework-content-wrapper .description {
                    color: var(--dove);
                    opacity: 0.54;
                }

                .coursework-content-wrapper .icon {
                    color: var(--primary);
                    font-size: 21px;
                    font-weight: 600;
                }

                @media only screen and (max-device-width: 760px) {
                    .coursework-content-wrapper {
                        display: flex;
                    }
                }
            `}</style>
        </>
    )
}

export default Coursework;