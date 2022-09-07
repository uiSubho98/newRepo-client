import React from "react";
import {__getEmail} from "../../utils/user-details.util";
import email_sent_icon from "../../assets/imgs/Onboard/email_sent_icon.jpg";

const BookingSuccess = () => {
    const email = __getEmail();
    return (
        <>
            <div className="booking-success-container f-d f-vt f-v-c f-h-c">
                <div 
                    className="email-sent-icon bg-image-full"
                    style={{backgroundImage: 'url(' + email_sent_icon + ')'}}
                >
                </div>
                <h2 className="h2-heading">Successfully Registered!</h2>
                <span className="body-regular text-c-d">
                    You are successfully registered to our workshop!
                </span>
                <span className="body-regular text-c-d">
                    Get your details on your registered mail 
                      ( <span className="strong-text">
                            { email }
                        </span> )
                </span>
            </div>
            <style jsx>{`

                .booking-success-container {
                    margin: var(--peaky-gap-64) 0 0;
                }

                .booking-success-container .email-sent-icon {
                    width: 150px;
                    height: 150px;
                }
            `}</style>
        </>
    )
}

export default BookingSuccess;