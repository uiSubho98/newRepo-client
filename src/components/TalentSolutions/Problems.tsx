import React from 'react';
import Problem from "./Problem";
import { IProblems, IProblem } from "../../interfaces/talent-solutions";

interface IProps {
    data: IProblems;
}

const Problems = (props: IProps) => {

    const { title, list } = props.data;

    const renderProblems = () => {
        return list.map((listItem: IProblem, key: number) => 
            <Problem key={key} data={listItem} />
        )
    }

    return (
        <>
            <div className="lr-pad-d lr-pad-m tb-pad-d tb-pad-m problems-wrapper">
                <h2 className="font-heading f-d f-h-c f-v-c text-c-d 
                text-xl title">
                    { title }
                </h2>
                <div className="g-d g-col-2 g-col-1-m g-gap-64 g-gap-16-m 
                problems-list w-80">
                    { renderProblems() }
                </div>
            </div>
            <style jsx>{`
                .problems-wrapper .problems-list {
                    margin: var(--peaky-gap-64) auto 0;
                }

                .problems-wrapper .problems-list .problem {
                    background-color: var(--spider);
                    border-radius: var(--peaky-br-4);
                    padding: var(--peaky-pad-24);
                    position: relative;
                }

                .problems-wrapper .problems-list .problem .learn-more-btn {
                    background-color: unset;
                    border: none;
                }

                .problems-wrapper .problems-list .problem .learn-more-btn .icon {
                    color: var(--primary);
                    font-size: 21px;
                }

                .problems-wrapper .problems-list .problem .statement {
                    color: var(--dove);
                    font-size: 28px;
                }

                .problems-wrapper .problems-list .problem .gist {
                    font-weight: 200;
                    opacity: 0.87;
                }

                .problems-wrapper .problems-list .problem .company-logo-wrapper {
                    bottom: 0;
                    right: 0;
                    height: 35px;
                    display: flex;
                    align-items: center;
                    position: absolute;
                    width: 150px;
                    background-color: var(--dove);
                    border-top-left-radius: 4px;
                }

                .problems-wrapper .problems-list .problem
                .company-logo-wrapper .company-logo {
                    height: 20px;
                    width: 100%;
                }

                @media only screen and (max-device-width: 760px) {
                    .problems-wrapper .title {
                        line-height: 38px;
                    }

                    .problems-wrapper .problems-list {
                        margin: var(--peaky-gap-32) 0 0;
                        width: 100%;
                    }

                    .problems-wrapper .problems-list .problem .statement {
                        font-size: 24px;
                    }

                    .problems-wrapper .problems-list .problem .gist {
                        font-size: 16px;
                    }
                }
            `}</style>
        </>
    )
}

export default Problems;