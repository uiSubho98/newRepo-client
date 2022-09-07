import React from "react";
import moment from "moment";
import { G_URL } from "../../constants/constants";

interface IOnboardStatus {
    slotsSelected?: boolean;
    discordInviteUsed?: boolean;
    projectsCompleted?: boolean;
}

interface IEnrollmentInfo {
    duration?: string;
    lastDate?: number;
    symbol?: string;
    sellingPrice?: number;
}

interface IDetails {
    slot_ts: number;
    slot_id: string;
    att: string;
}

interface IWorkshopInfo {
    att: string;
    details: IDetails | null;
}

interface IProps {
    purchaseStatus?: boolean;
    enrollmentInfo?: IEnrollmentInfo;
    onboardStatus?: IOnboardStatus;
    workshopInfo?: IWorkshopInfo;
}

const PaymentBanner = (props:IProps) => {
    const { purchaseStatus,enrollmentInfo,workshopInfo } = props;
    let activeClass = "";
    let isWorkshopScheduled = false;
    // if(workshopInfo && workshopInfo.att === "true") {
    //     let details = workshopInfo.details;
    //     if(details && details.att) {
    //         isWorkshopScheduled = true;
    //     }
    // }

    if(workshopInfo) {
        isWorkshopScheduled = true;
    }

    if( !isWorkshopScheduled || purchaseStatus ) {
        activeClass = "inactive";
    }

    let sellingPrice = enrollmentInfo?.sellingPrice?.toString() ?? "";
    if(enrollmentInfo?.symbol?.toLowerCase() === "inr") {
        sellingPrice = enrollmentInfo?.sellingPrice?.toLocaleString('en-IN') ?? "";
    }

    let nextBatch = enrollmentInfo && enrollmentInfo.lastDate ? 
    (enrollmentInfo.lastDate * 1000) : new Date().getTime();
    let date = moment(new Date(nextBatch)).format("DD MMM YYYY");
    date = date.split(" ").map((value,key) => {
        if(key === 0) {
            value += "th";
        }
        return value;
    }).join(" ");

    return (
        <>
            <div className={`payment-banner-content-wrapper
            lr-pad-d lr-pad-m ${activeClass}`}>
                <span className="f-d emoji body-large" role="img"
                aria-label="celebration">
                    🎉
                </span>
                <div className="body-big complement">
                    <span className="strong-text">Congrats!</span>&nbsp;
                    You are now up and ready for our
                    <span className="f-d duration">
                        <span className="strong-text">{ enrollmentInfo && 
                        enrollmentInfo.duration} Bootcamp</span>&nbsp;
                        sessions.
                    </span>
                </div>
                <div className="body-big info">
                    Pay {enrollmentInfo && enrollmentInfo.symbol+" "+sellingPrice }/- now and book your slot for the upcoming batch&nbsp;
                    <span className="strong-text">{
                        date
                    }</span>.
                </div>
                <button className="default-pink-btn filled-pink c-pointer"
                onClick={() => window.location.href = G_URL+"payment/bootcamp/"}>
                    Pay Now
                </button>
            </div>
            <style jsx>{`
                .payment-banner-content-wrapper {
                    background-color: var(--smoke);
                    padding-top: var(--peaky-pad-32);
                    padding-bottom: var(--peaky-pad-32);
                }

                .payment-banner-content-wrapper.inactive {
                    display:none;
                }

                .payment-banner-content-wrapper .info  {
                    margin: var(--peaky-gap-8) 0 var(--peaky-gap-32);
                }

                @media only screen and (max-device-width: 760px) {
                    .payment-banner-content-wrapper .complement
                    .duration {
                        display: unset;
                    }
                }
            `}</style>
        </>
    )
}

export default PaymentBanner;