import React from "react";
import Process from "./Process";
import ProgramDetails from "./ProgramDetails";
import { IProgramOverview } from "../../interfaces/program-info";

const ProgramOverview = (props: IProgramOverview) => {
    const { sub_heading, process, program_details, disclaimer } = props;

    return (
        <>
            <div className="overview-container lr-pad-d lr-pad-m">
                <div className="heading">Program overview</div>
                <div className="sub-heading">{sub_heading}</div>
                <Process list={process} />
                <ProgramDetails list={program_details} />
                <div className="disclaimer">{disclaimer}</div>
            </div>
            <style>
                {`
                    .overview-container {
                        background: var(--primary-bg);
                        height: max-content;
                        margin-bottom: 4rem;
                        padding-top: 90px;
                        font-family: "Nunito sans", sans-serif;
                        padding-bottom: 90px;
                    }

                    .overview-container .heading {
                        font-size: 36px;
                        font-weight: 500;
                        color: var(--dove);
                        margin-bottom: 28px;
                        text-align: center;
                        font-family: "Poppins";
                    }

                    .overview-container .sub-heading {
                        font-size: 21px;
                        font-weight: 300;
                        color: var(--dove);
                        text-align: center;
                    }

                    .overview-container .process {
                        margin-top: 4rem;
                    }

                    .ant-steps-item-title {
                        color: var(--dove) !important;
                        font-weight: 500;
                        font-size: 18px;
                        font-family: "Poppins";
                    }
                    
                    .ant-steps-item-wait > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-description {
                        color: var(--dove);
                        font-size: 16px;
                        background-color:var(--batman);
                    }

                    .overview-container .disclaimer {
                        // margin-top: 250px;
                        font-size: 16px;
                        font-weight: 500;
                        color: var(--dove);
                    }

                    @media only screen and (max-width: 768px) {
                        .overview-container {
                            padding-top: 320px;
                            padding-bottom: 45px;
                        }

                        .overview-container .heading {
                            font-size: 32px;
                        }

                        .overview-container .disclaimer {
                            
                            margin-top: 0px !important;
                        }
                    }
                `}
            </style>
        </>
    )
}

export default ProgramOverview;