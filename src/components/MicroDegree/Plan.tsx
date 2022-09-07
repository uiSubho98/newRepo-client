import React from "react";
// @ts-ignore
import { useHistory } from "react-router-dom";
import { IPlan } from "../../interfaces/microdegree";
import { handleRegistrationSrc } from "../../utils/common.util";
import { check_login } from "../../utils/login.util";
import { intermediatePayment } from "../../utils/payment.util";

interface IProps {
    data: IPlan;
    countryName: string;
}

const Plan = (props: IProps) => {
    const { data, countryName } = props;
    const history = useHistory();

    const currency = countryName === "India" ? "INR" : "USD";
    const getCurrency = (price: number) => {
        if(currency.toLowerCase() === "inr") {
            return price.toLocaleString('en-IN');
        }
        return price;
    }

    const handleEnrolClick = () => {
        // Set payment option in local storage
        localStorage.setItem("paymentOption", data.type);
        const regSrc = localStorage.getItem('regSrc');
        // Check if user is logged in 
        if(check_login()) {
            // Handle the user's payment selection & redirect to checkout
            intermediatePayment('microdegree', history);
        } else {
            if(!(regSrc && [ "microdegree-hero-component",
                "microdegree-resume-component" ].includes(regSrc))) {
                handleRegistrationSrc("microdegree-plans-component");
            }
            history.push('/signup?rurl=/microdegree&program=microdegree&action=payment');
        }
    }

    let sellingPrice = 0;
    let actualPrice = 0;
    let discount = 0;
    let emi = 0;

    if(data) {
        sellingPrice = data?.sellingPrice[countryName]?.sp;
        actualPrice = data?.actualPrice ? data?.actualPrice[countryName]?.sp : "";
        discount = data?.discount ? data?.discount[countryName]?.sp: 0;
        emi = data?.emi[countryName]?.sp;
    }
    return (
        <>
        <div className="plan-wrapper w-90">
                <div className="f-d f-v-c plan-header">
                    <h3 className="text-big strong-text title">
                        { data.name }
                    </h3>
                    {
                        data.discount &&
                        <span className="text-small strong-text discount">
                            Save {currency} { getCurrency(discount) }
                        </span>
                    }
                </div>
            <div className="price-block">
                <span className={`f-d font-heading text-large
                selling-price ${ actualPrice ? "" : "invisible" }`}>
                    { getCurrency(sellingPrice) }
                </span>
                <span className="f-d font-heading text-large
                actual-price">
                    {currency}&nbsp;{
                        actualPrice ?
                        <span className="strike-through">
                            { getCurrency(actualPrice) }
                        </span> :
                        getCurrency(sellingPrice)
                    }
                </span>
                <span className="text-small emi">
                    {currency} {getCurrency(emi)} /month
                </span>
            </div>

            <span className="text-regular description">
                { data.description }
            </span>

            <button className="default-blue-btn btn-small 
            enrol-now-btn btn-disabled" onClick={() => {handleEnrolClick()}} disabled>
                Enrollments Will Begin Soon
            </button>

            {/* <button className="default-blue-btn btn-small 
            enrol-now-btn" onClick={() => {handleEnrolClick()}}>
                Enrol Now
            </button> */}

        </div>
        <style jsx>{`
            .plan-wrapper .btn-disabled{
                opacity:0.4;
                cursor: not-allowed;
            }
        `}</style>
        </>
    )
}

export default Plan;