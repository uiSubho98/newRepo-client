import React from "react";
import ReactHtmlParser from "react-html-parser";
import EligibilityCriteriaImage from "../../assets/imgs/program-info/eligible_img.svg";

interface IProps {
    conditions: Array<string>;
}

const EligibilityCriteria = (props: IProps) => {

    const { conditions } = props;

    const listConditions = () => {
        return conditions.map((con, idx) => {
            return (
                <div className="con-item f-d f-v-c" key={idx}>
                    <div className="dash-pointer"></div>
                    <div className="text">{ReactHtmlParser(con)}</div>
                </div>
            );
        });
    };

    return (
        <>
            <div className="eligibility-cont lr-pad-d lr-pad-m">
                <div className="heading">Eligibility Criteria</div>
                <div className="content-wrapper f-d f-h-sb f-v-s">
                    <div className="left-pane">{listConditions()}</div>
                    <div
                        className="right-pane bg-image-full"
                        style={{ 
                            backgroundImage: "url(" + EligibilityCriteriaImage + ")",
                            height: "20rem"
                        }}
                    ></div>
                </div>
            </div>
            <style jsx>{`
                .eligibility-cont {
                    margin-top: 90px;
                    font-family: "Nunito sans", sans-serif;
                    margin-bottom: 90px;
                    background-color:var(--crow);
                }

                .eligibility-cont .heading {
                    text-align: center;
                    font-size: 36px;
                    font-family: "Poppins";
                    font-weight: 500;
                    color: var(--dove);
                    margin-bottom: 48px;
                }

                .content-wrapper {
                    // height: 20rem;
                }

                .content-wrapper .left-pane {
                    width: 55%;
                    height: 100%;
                }

                .content-wrapper .right-pane {
                    width: 40%;
                    height: 100%;
                }

                .content-wrapper .con-item {
                    font-size: 18px;
                    font-weight: 300;
                    color: var(--carbon);
                    margin-bottom: 16px;
                    width: 100%;
                }

                .con-item .text {
                    width: 80%;
                    font-size: 21px;
                    color:var(--dove);
                    background-color: var(--crow);
                }

                .content-wrapper .con-item .bold-text {
                    font-size: 21px;
                    font-weight: 700;
                    color: var(--carbon);
                }

                .content-wrapper .dash-pointer {
                    background-color: var(--primary);
                    width: 24px;
                    height: 4px;
                    margin-right: 16px;
                }

                @media only screen and (max-width: 768px) {
                  
                    .eligibility-cont .heading {
                        font-size: 32px;
                    }

                    .content-wrapper .right-pane {
                        display: none;
                    }

                    .content-wrapper .left-pane {
                        width: 100%;
                    }

                    .content-wrapper .dash-pointer {
                        width: 16px;
                    }
                }
            `}</style>
        </>
    )
}

export default EligibilityCriteria;