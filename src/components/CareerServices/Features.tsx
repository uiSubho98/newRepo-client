import React from "react";
import {IFeatureList} from "../../interfaces/CareerServices";

// import FeatureList from "./FeatureList";

interface Props {
    data?: Content;
}

interface Content {
    title?: string;
    featureList: Array<IFeatureList>;
}


const Features = (props: Props) => {
    const {data} = props;
    
    return (
        <>
            <div className="career-services feature-content-wrapper lr-pad-d lr-pad-m">
                <div className="g-d g-h-c g-col-4 g-col-2-m g-gap-32-64-m">
                    {data && data.featureList.map((item, index) => {
                        return (
                            <div className="list text-c-d" key={index}>
                                <div className="text-xxl font-heading stat"> {item.title}</div>
                                <div className="text-medium desc text-faded-2">{item.description}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <style jsx>{`

              .career-services .stat {
                line-height: 59px;
                color: var(--primary);
              }

              .career-services .desc {
                white-space: pre-wrap;
                font-weight: 300;
                margin: var(--peaky-gap-16) 0 0;
              }

              .feature-content-wrapper{
                  background-color: var(--primary-bg);
                  padding-top: 2rem;
                  padding-bottom: 2rem;
              }
              
              .career-services .list {
                    // width: 20%;
                    margin: 0;
              }

              @media only screen and (min-width: 1366px) and (max-width: 1440px) {
                .hero-content-wrapper .title {
                  max-width: 60%;
                }
              }

              @media only screen and (min-width: 1024px) and (max-width: 1365px) {
                .hero-content-wrapper .title {
                  max-width: 65%;
                }
              }

              @media only screen and (min-width: 768px) and (max-width: 1023px) {
              }

              @media only screen and (max-device-width: 760px) {
                .feature-content-wrapper {
                  padding-top: 4rem;
                  padding-bottom: 4rem;
                }

                .career-services .list {
                  width: unset;
                }

                .hero-content-wrapper {
                  height: 900px;
                  background-position: center calc(100% + 2.5rem);
                  background-size: auto 500px;
                }

                .hero-content-wrapper .title,
                .hero-content-wrapper .description {
                  white-space: unset;
                  max-width: 100%;
                }

                .hero-content-wrapper .title {
                  font-weight: 900;
                  line-height: 3.671rem;
                }

                .career-services .desc { 
                  margin: 0 0 var(--peaky-gap-16);
                  white-space: unset;
                }

                .hero-content-wrapper .default-blue-btn {
                  width: 100%;
                  margin-bottom: var(--peaky-gap-32);
                }

                .hero-content-wrapper .help-text {
                  margin-left: auto !important;
                  margin-right: auto !important;
                }

                .hero-content-wrapper .action-block {
                  margin: 0;
                  align-items: flex-start;
                }
              }

              @media only screen and (max-device-width: 380px) {
                .hero-content-wrapper {
                  height: 950px;
                  background-size: auto 450px;
                }
              }

              @media only screen and (max-device-width: 320px) {
                .hero-content-wrapper {
                  height: 880px;
                  background-size: auto 380px;
                }
              }
            `}</style>
        </>
    )
}

export default Features;