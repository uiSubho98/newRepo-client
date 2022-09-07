import React from "react";
import {IPhase1List} from "../../interfaces/CareerServices";

interface Props {
    data?: Content;
    rowReverse?: string
}

interface Content {
    title?: string;
    desc?: string;
    imgSrc?: string;
    heading?: string;
    outcomes: Array<string>;
    phase1List: Array<IPhase1List>;
}


const Schedule = (props: Props) => {
    const {data, rowReverse} = props;
    
    let rowReverse_css;
    let bg_primary;
    if (rowReverse) {
        rowReverse_css = "f-ht-r";
        bg_primary = "bg_primary"
    }


    return (
        <>
            <div className={`career-service lr-pad-d tb-pad-d lr-pad-m tb-pad-m ${bg_primary}`} id="schedule">
                <h1 className="text-xxl font-heading title text-c-d"
                    dangerouslySetInnerHTML={{__html: (data && data.title ? data.title : '')}}></h1>
                <div className={`schedule-content-wrapper f-d f-h-sb f-v-c f-vt-m ${rowReverse_css}`}>
                    <div className="schedule-container-left">
                        <img className="schedule-container-left-bg" src={data && data.imgSrc} alt="Schedule Background" />
                    </div>
                    <div className="schedule-container-right">
                        <div className="heading text-big strong-text"> {data && data.heading ? data.heading : ""}</div>
                        <div className="desc text-regular text-faded"> {data && data.desc ? data.desc : ""}</div>
                        <div className="sub-head heading text-medium strong-text">Outcomes</div>
                        <ul>
                            {data && data.outcomes.map((o, index)=> {
                                return (
                                    <li key ={index} className="list text-regular"> {o}</li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <div className="phase-container f-d f-h-sa f-v-c-m f-vt-m">
                    {data && data.phase1List.map((item, index) => {
                        return (
                            <>
                                <div className="phase-list" key={index}>
                                    <img className="phase-img" src={item.imgSrc} alt={`Phase ${index}`}/>
                                    <div className="phase-desc text-c-d">{item.description}</div>
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>
            <style jsx>{`
              .career-service .schedule-container-left-bg {
                background-repeat: no-repeat;
                background-position: right center;
                width: 500px;
              }

              .bg_primary {
                background-color: var(--primary-bg);
              }

              .career-service .schedule-container-left .highlights-list {
                margin: 1rem 0;
              }

              .highlights-list .check-icon {
                background-color: var(--go);
                border-radius: var(--peaky-br-full);
                border: 1px solid var(--go);
                color: var(--dove);
                height: 20px;
                width: 20px;
                margin-right: 0.5rem;
              }

              .highlights-list .check-icon
              .icon-check {
                font-size: 16px;
              }

              .schedule-container-left .description {
                margin: 1rem 0 0 0;
              }

              .schedule-container-right {
                width: 50%;
              }

              .schedule-container-right ul {
                color: var(--dove);
                margin-left: 1rem;
              }

              .schedule-container-right .desc {
                margin: var(--peaky-gap-8) 0 0;
              }

              .schedule-container-right .sub-head {
                margin: 1.5rem 0 0.5rem;
              }

              .schedule-container-right ul li {
                font-weight: 200;
                margin: 0 0 4px;
              }

              .schedule-container-right ul li::marker {
                font-size: 12px;
                margin-right: 2rem;
              }
             
              .phase-container .phase-list {
                width: 15%;
                margin-top: 2rem;
              }

              .phase-container {
                height: auto;
              }

              .phase-list .phase-desc {
                margin-top: 1rem;
              }

              .phase-container .phase-img {
                background-repeat: no-repeat;
                background-position: center;
                height: 64px;
                width: 64px;
                display: block;
                margin-left: auto;
                margin-right: auto;
                margin-bottom: 1rem;
              }

              @media only screen and (max-device-width: 760px) {
                .schedule-container-right {
                  margin: var(--peaky-gap-32) 0 0;
                  width: unset;
                }

                .career-service .schedule-container-left-bg {
                  height: 250px;
                  width: 300px;
                }

                .career-service .phase-container .phase-list {
                  margin-top: var(--peaky-gap-48);
                  width: 70%;
                }
              }

            `}</style>
        </>
    )
}

export default Schedule;