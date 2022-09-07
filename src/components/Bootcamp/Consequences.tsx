import React from "react";
import { IConsequences, IPros } from "../../interfaces/bootcamp";
import Resume from "./Resume";

interface IProps {
    data?: IConsequences;
    hasPurchased?: boolean;
    status?: number;
    enroll: Function;
    from?:string;
}

const Consequences = (props: IProps) => {

    const { data, hasPurchased, status, enroll, from } = props;

    const renderConsequences = (pros: Array<IPros> = []) => {
        return pros.map((listItem, key) =>
            <div key={key} className="g-d g-h-c list-item w-70">
                <div className="bg-image-full image" style={{ 
                    backgroundImage: "url(" + listItem.image + ")"
                }}></div>
                <span className="text-medium text-c-d info
                text-faded-2">
                    { listItem.info }
                </span>
            </div>
        )
    }

    return (
        <>
            <div className="g-d g-h-c consequences-content-wrapper tb-pad-d tb-pad-m
            lr-pad-d lr-pad-m" id="consequences">
                <h1 className="font-heading text-xl">
                    { data?.title }
                </h1>
                <div className="g-d g-h-c g-col-3 g-col-1-m g-gap-32-m 
                w-90 consequences-list">
                    { renderConsequences(data?.pros) }
                </div> 
                {
                    data?.resume &&
                    <Resume data={data?.resume} hasPurchased={hasPurchased} status={status} enroll={enroll} from={from}/> 
                }
            </div>
            <style jsx>{`

                .consequences-content-wrapper .consequences-list {
                    margin: var(--peaky-gap-48) 0;
                }

                .consequences-content-wrapper .consequences-list
                .list-item .image {
                    height: 168px;
                    width: 168px;
                }

                .consequences-content-wrapper .consequences-list
                .list-item .info {
                    font-weight: 300;
                    margin: var(--peaky-gap-16) 0 0;
                }

                @media only screen and (max-device-width: 760px) {
                    .consequences-content-wrapper .consequences-list
                    .list-item {
                        width: 100%;
                    }

                    .consequences-content-wrapper .consequences-list 
                    .list-item .info {
                        margin-top: var(--peaky-gap-16);
                    }
                }
            `}</style>
        </>
    )
}

export default Consequences;