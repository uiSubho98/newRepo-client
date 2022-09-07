import axios from "axios";
import { G_API_URL } from "../constants/constants";
import { getSearchParam } from "./common.util";
import { __getToken } from "./user-details.util";

// Intermediate function to be used between user clicks enrol now and redirect to checkout
// Handle login before calling this function
// Fetch the plans based on program, select option based on user's selection stored in local storage, clear user selection from local storage, redirect to checkout
const intermediatePayment = async (programType: string, history: any, slug:string = "part-time") => {
    // Final step: select plan based on user's choice and redirect to payment
    const selectPaymentOption = (planDetails: any, activeOption:any) => {
        if(programType === "microdegree") {    // Check if it is microdegree payment
            planDetails['planPrice'] = activeOption.sellingPrice
            planDetails['terms'] = activeOption.terms//csv
            planDetails['termNames'] = activeOption.termIds //Array<string>    term 0 term 1
            planDetails['courses'] = activeOption.courses//csv
            planDetails['courseIds'] = activeOption.courseIds //Array<number>
            planDetails['planMode'] = planDetails['type']
            planDetails['courseTermMap'] = activeOption.courseTermMap //Array<number>
            planDetails['paymentOption'] = activeOption.name //string       term / year / one-time
            history.push({
                pathname: "/checkout",
                state: {
                    planDetails,
                    programType,
                    international_status: planDetails.international_status,
                    country: planDetails.country
                }
            });
        } else {
            let updatedPlanDetails = planDetails;
            updatedPlanDetails.planPrice = activeOption.sellingPrice;
            
            history.push({
                pathname: '/checkout',
                state: {
                    planDetails: updatedPlanDetails,
                    programType,
                    international_status: planDetails.international_status,
                    country: planDetails.country
                }
            });
        }
    }

    // Fetch plan for the program
    let config = {
        params:{
            programType: programType,
            ...programType === "bootcamp" && { mode: slug.toLowerCase() }
        },
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": __getToken()
        }
    };

    await axios
        .get(G_API_URL + "tracker/plan/", config)
        .then(response => {
            if (response.data.status === 1) {
                let {planDetails} = response.data.data[0];

                if(programType === "bootcamp") {
                    selectPaymentOption(planDetails, planDetails.paymentOptions[programType][0])
                } else if(programType === "microdegree") {
                    // Get user's selection from local storage
                    let paymentOption = localStorage.getItem('paymentOption');

                    if(paymentOption !== null) {
                        // Remove user's selection from local storage
                        localStorage.removeItem("paymentOption");
                        selectPaymentOption(planDetails, planDetails.paymentOptions[programType].filter((plan: any) => plan.name === paymentOption)[0]);
                    } else {
                        console.log("No payment option selected")
                    }
                }
                return;
            } else {
                console.error("Plan fetching API error", response)
                return
            }
        })
        .catch(err => {
            console.log(err);
            return;
        });

    
    
}

// Function to handle payment page redirect on login page after login 
const handlePaymentRedirect = (history: any) => {
    const action = getSearchParam('action');
    const programType = getSearchParam('program');
    
    // Check if input params are valid
    if(action !== null && action === "payment" && programType !== null && (programType === "microdegree" || programType === "bootcamp")) {
        intermediatePayment(programType, history)
        return true;
    } else {    // Input params are invalid, return false
        return false;
    }
}

export { intermediatePayment, handlePaymentRedirect }; 
