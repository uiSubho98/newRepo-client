import React from "react";
import { CardElement } from "@stripe/react-stripe-js";

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            color: "#303238",
            fontSize: "16px",
            fontFamily: "sans-serif",
            fontSmoothing: "antialiased",
            "::placeholder": {
              color: "#CFD7DF"
            }
        },
        invalid: {
            color: "#e5424d",
            ":focus": {
              color: "#303238"
            }
        }
    },
    hidePostalCode: true
};

function CardSection() {
    return (
        <>
            <div className="section-title">Card Information</div>
            <CardElement options={CARD_ELEMENT_OPTIONS} />
        </>
    );
}

export default CardSection;