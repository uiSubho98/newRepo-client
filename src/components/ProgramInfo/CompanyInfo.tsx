import React from "react";
import { ICompanyInfo } from "../../interfaces/program-info";
import prograd_logo from "../../assets/brand/prograd_logo_blue_white.svg";

const CompanyInfo = (props: ICompanyInfo) => {
    const { heading, summary, disclaimer, logo } = props;
    return (
        <>
            <div className="lr-pad-d lr-pad-m face-thought-wrapper">
                <div className="about-us-title">{heading}</div>
                <div className="about-us">
                    <p>{summary}</p>
                </div>
                <div className="brand-image-container f-d f-h-c">
                    <div className="brand-image bg-image-full tw-logo"
                    style={{backgroundImage: "url(" + logo + ")", 
                    height: 90, marginRight: 35, width: 200}}>
                    </div>
                    <div className="brand-image bg-image-full prog_logo"
                    style={{ backgroundImage: "url(" + prograd_logo + ")",
                    height: 50, marginTop: 20, width: 201 }}></div>
                </div>
                <div className="banner-1">{disclaimer}</div>
            </div>
            <style jsx>{`
                .face-thought-wrapper {
                    background-color: var(--batman);
                    padding-top: 80px;
                    padding-bottom: 80px;
                }

                .about-us-title{
                    text-align: center;
                    font-size: 36px;
                    font-family: "Poppins";
                    font-weight: 500;
                    color: var(--dove);
                    margin-bottom: 48px;
                    text-align: center;
                }

                .face-thought-wrapper .brand-image-container {
                    height: 90px;
                    width: 100%;
                }

                .face-thought-wrapper .brand-image-container .brand-image {
                    height: 90px;
                    width: 40%;
                }

                .face-thought-wrapper .banner-1 {
                    text-align: center;
                    font-family: "Nunito sans", sans-serif;
                    color: var(--dove);
                    font-size: 21px;
                    margin-top: 48px;
                }

                .about-us{
                    font-family: "Nunito sans", sans-serif;
                    color: var(--dove);
                    font-size: 21px;
                    margin-bottom: 48px;
                    white-space: pre-wrap;
                }

                @media only screen and (max-width: 768px) {
                .face-thought-wrapper {
                    padding-top: 250px;
                }

                .face-thought-wrapper .brand-image-container {
                    margin-right: 2rem;
                }

                .prog_logo{
                    margin-top:50px !important;
                }

                @media only screen and (max-width: 480px) {
                    .face-thought-wrapper {
                        padding-top: 0 !important;
                    }
                }
            `}</style>
        </>
    )
}

export default CompanyInfo;