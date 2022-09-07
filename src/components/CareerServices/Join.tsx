import React from "react";
import { IJoinList } from "../../interfaces/CareerServices";
import JoinList from "./JoinList";

interface Props {
    data ?: Content;
}

interface Content {
    title ?: string;
    desc?: string;
    joinList :  Array<IJoinList>;
}



const Join = (props:Props) => {
    const { data } = props;
    
    const renderJoinList = ()=>{
        let list = data && data.joinList.map((f,i) => <JoinList data = {f}  key = {i}/>)
        return list
        
    }

    return (
        <>
            <div className="career-service join-wrapper g-d g-h-c lr-pad-d tb-pad-d lr-pad-m tb-pad-m" id="join">
                <h1 className="text-xl font-heading text-c-d" dangerouslySetInnerHTML={{__html: (data && data.title ? data.title : '')}}></h1>
                <div className="text-medium desc text-c-d sub-heading"> { data && data.desc ? data.desc : ""} </div>
                <div className="g-d g-col-2 g-col-1-m g-h-c 
                g-gap-64 list">
                    {data && renderJoinList()}
                </div>
            </div>
            <style jsx>{`
                
                .join-wrapper .desc{
                    font-weight:300;
                }

                .career-service .sub-heading{
                    width:50%;
                    margin:1rem auto;
                }

                .join-wrapper{
                    background-color: var(--primary-bg);
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
                    .career-service .sub-heading{
                        width:unset;
                        margin:1rem auto;
                    }

                    .career-service .list {
                        grid-gap: unset;
                    }

                    .hero-content-wrapper {
                        height: unset !important;
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

export default Join;