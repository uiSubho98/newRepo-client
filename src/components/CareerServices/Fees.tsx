import React from "react";
import {IFeeList} from "../../interfaces/CareerServices";
import FeeList from "./FeeList";

interface Props {
    data?: Content;
    country: string;
}

interface Content {
    title?: string;
    desc?: string;
    feeList: Array<IFeeList>;
}


const Fee = (props: Props) => {
    const {data, country} = props;

    const renderFeeList = () => {
        let list = data && data.feeList.map((f, index) => <FeeList data={f} country={country}  key={index}/>)
        return list
    }

    return (
        <>
            <div className="career-service fee-wrapper  lr-pad-d tb-pad-d lr-pad-m tb-pad-m" id="fees">
                <h1 className="text-xl font-heading text-c-d"
                    dangerouslySetInnerHTML={{__html: (data && data.title ? data.title : '')}}></h1>
                <div className="text-medium desc text-c-d"> {data && data.desc ? data.desc : ""} </div>
                <div className="f-d f-h-c f-vt-m">
                    {data && renderFeeList()}
                </div>
            </div>
            <style jsx>{`

              .fee-wrapper .desc {
                font-weight: 300;
              }

              .fee-wrapper {
                background-image: linear-gradient(90deg, #0E7DED 2.26%, #1739E6 98.92%);
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

                .career-service .fee-lists {
                  width: unset;
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

export default Fee;