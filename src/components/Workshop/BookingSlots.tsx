import React from "react";
import {__getUserName,__getEmail} from "../../utils/user-details.util";
import { InlineWidget } from "react-calendly";

interface IContent {
    title?: string;
    description?: string;
    source?: string;
    imageSrc?: string;
}

interface IProps {
    bookingContent?: IContent
}

const BookingSlots = (props: IProps) => {
    const { bookingContent } = props;

    const name = __getUserName();
    const email = __getEmail();

    return (
        <>
            <div className="boooking-slots-wrapper g-d g-col-2 
            g-col-1-m g-gap-64">
                <div className="info-block">
                    <h1 className="h1-heading">
                        { bookingContent?.title }
                    </h1>
                    <span className="f-d body-regular">
                        { bookingContent?.description }
                    </span>
                    <div className="bg-image-full booking-vector" 
                    style={{ backgroundImage: "url("+ bookingContent?.imageSrc + ")" }}>
                    </div>
                </div>
                <div className="calendly-container">
                    <InlineWidget 
                        url={`${bookingContent?.source}?name=${name}&email=${email}`}
                     />
                </div>
            </div>
            <style jsx>{`

                .boooking-slots-wrapper .calendly-container 
                .calendly-inline-widget {
                    box-shadow: var(--peaky-shadow-high-2);
                }

                .boooking-slots-wrapper .calendly-spinner {
                    margin: 0 auto;
                }

                .boooking-slots-wrapper .booking-vector {
                    height: 400px;
                    margin: var(--peaky-gap-64) 0 0;
                }

                @media only screen and (max-device-width: 760px) {
                    .boooking-slots-wrapper {
                        grid-gap: var(--peaky-gap-48);
                    }

                    .boooking-slots-wrapper .info-block {
                        text-align:center;
                    }

                    .boooking-slots-wrapper .booking-vector {
                        height: 300px;
                        margin-top: var(--peaky-gap-32);
                    }
                }
                
                @media only screen and (max-device-width: 320px) {
                    .boooking-slots-wrapper .booking-vector {
                        height: 250px;
                    }

                    .boooking-slots-wrapper .calendly-container 
                    .calendly-inline-widget {
                        min-width: unset !important;
                    }
                }

                @media screen and (min-width: 768px) and (max-width: 1023px) 
                and (orientation: portrait) {
                    .boooking-slots-wrapper {
                        grid-template-columns: 1fr;
                    }

                    .boooking-slots-wrapper .calendly-container {
                        width: 90%;
                        margin: 0 auto;
                    }
                }
            `}</style>
        </>
    )
}

export default BookingSlots;