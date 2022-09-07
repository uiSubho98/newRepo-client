import React from "react";
import { G_URL } from "../../constants/constants";
import moment from "moment";

interface IBatch {
    batchId: string;
    name?: string;
    type?: string;
    duration?: string;
    workingDays?: string;
    nextBatch: number;
}

interface IBootcamps {
    title?: string;
    description?: string;
    batches?: Array<IBatch>;
}

interface Props {
    data?: IBootcamps;
}

const Bootcamps = (props: Props) => {
    const { data } = props;

    const handleClick = (batchId: string) => {
        window.location.href = G_URL + "bootcamp";
    }


    
    const renderBootcamps = (batches?: Array<IBatch>) => {
        let nextBatch = new Date().getTime();
        let date = "";
        return batches && batches.map((batch, index) => {
            nextBatch = batch.nextBatch * 1000;
            date = moment(new Date(nextBatch)).format("DD MMM YYYY");
            date = date.split(" ").map((value,key) => {
                if(key === 0) {
                    value += "th";
                }
                return value;
            }).join(" ");

            return (
                <div className="batches-wrapper w-90" key={index}>
                    <span className="f-d body-regular strong-text name">
                        { batch && batch.name }
                    </span>
                    <span className="g-d body-small batch">
                        <span>{ batch.type +" ("+batch.workingDays+") " }
                            <span className="strong-text">
                                {batch.duration}
                            </span>
                        </span>
                    </span>
                    <span className="body-small">
                        <span className="strong-text">Next Batch:</span>&nbsp;
                        <span>{ date }</span>&nbsp;&nbsp;
                        <span className="btn strong-text c-pointer" 
                        onClick={ () => handleClick( batch.batchId ) }>
                            View Details
                        </span>
                    </span>
                </div>
            );
        });
    }

    return (
        <>
            <div className="bootcamps-wrapper lr-pad-d lr-pad-m 
            tb-pad-d tb-pad-m">
                <h2 className="h2-heading">
                    { data && data.title }
                </h2>
                <span className="f-d body-regular description">
                    { data && data.description }
                </span>
                <div className="g-d g-col-2 g-col-1-m w-70 bootcamps-list">
                    { data && renderBootcamps( data.batches ) }
                </div>
            </div>
            <style jsx>{`
                .bootcamps-wrapper .description {
                    white-space: pre-wrap;
                    margin: var(--peaky-gap-8) 0 var(--peaky-gap-32);
                }

                .bootcamps-wrapper .bootcamps-list
                .batches-wrapper {
                    background-color: var(--smoke);
                    padding: var(--peaky-pad-32);
                    margin:var(--peaky-gap-32) 0 0;
                    box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.01);
                }

                .bootcamps-wrapper .bootcamps-list
                .batches-wrapper .body-caption {
                    color: var(--carbon);
                }

                .bootcamps-wrapper .bootcamps-list
                .batches-wrapper .name {
                    margin:0 0 var(--peaky-gap-4);
                }

                .bootcamps-wrapper .bootcamps-list
                .batches-wrapper .batch {
                    margin:var(--peaky-gap-8) 0 var(--peaky-gap-32);
                }

                .bootcamps-wrapper .bootcamps-list
                .batches-wrapper .btn {
                    color: var(--purple);
                }

                @media only screen and (max-device-width: 760px) {
                    .bootcamps-wrapper .description {
                        white-space: unset;
                        margin-bottom: var(--peaky-gap-8);
                    }

                    .bootcamps-wrapper .bootcamps-list,
                    .bootcamps-wrapper .bootcamps-list
                    .batches-wrapper {
                        width:100%;
                    }

                    .bootcamps-wrapper .bootcamps-list
                    .batches-wrapper {
                        padding: var(--peaky-pad-24);
                    }

                    .bootcamps-wrapper .bootcamps-list 
                    .batches-wrapper .batch {
                        margin:var(--peaky-gap-4) 0 var(--peaky-gap-16);
                    }

                    .bootcamps-wrapper .bootcamps-list 
                    .batches-wrapper .btn {
                        display: block;
                        margin: var(--peaky-gap-8) 0 0;
                    }
                }

                @media screen and (min-width: 768px) and (max-width: 1023px) 
                and (orientation: portrait) {
                    .bootcamps-wrapper .bootcamps-list {
                        width: 100%;
                    }

                    .bootcamps-wrapper .bootcamps-list 
                    .batches-wrapper {
                        padding: var(--peaky-pad-16);
                        width: 95%;
                    }

                    .bootcamps-wrapper .bootcamps-list 
                    .batches-wrapper .batch {
                        margin-bottom: var(--peaky-gap-8);
                    }

                    .bootcamps-wrapper .bootcamps-list 
                    .batches-wrapper .btn {
                        display: block;
                    }
                }
            `}</style>
        </>
    )
}

export default Bootcamps;