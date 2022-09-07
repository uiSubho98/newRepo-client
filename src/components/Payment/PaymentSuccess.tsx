import axios, { AxiosResponse } from 'axios';
import React,{ useEffect } from 'react';
import { useHistory } from 'react-router';
import payment_success from "../../assets/gif/payment_success.gif";
import { G_API_URL, G_URL } from "../../constants/constants";
import { openNotification } from '../../utils/common.util';
import { encrypt } from '../../utils/encryption.util';
import { login_user } from '../../utils/login.util';
import { __getEmail, __getToken, __getUID } from '../../utils/user-details.util';

interface IProps {
    programType: string;
}

const PaymentSuccess = (props:IProps) => {
    const { programType } = props;
    const history = useHistory();

    useEffect(() => {
        // Clear Storage
        localStorage.removeItem('ps-state');
    });

    const redirectUser = () => {
        // Fetch user's profile
        axios.get(
            G_API_URL+"profile/?uid="+__getUID(), {
                headers: { 
                    Authorization: __getToken()
                }
            }
        ).then((response: AxiosResponse) => {
            const resp = response.data;
            if(resp.status === 1 || resp.status === 2) {
                // Check if user is enrolled in programType
                if(resp.profile.subscriptions !== undefined && resp.profile.subscriptions[programType] !== undefined && resp.profile.subscriptions[programType] === true) {
                    if(programType === "microdegree") {
                        // Redirect to program's learning dashboard
                        history.push('/learning-dashboard/'+programType);
                    } else {
                        getProgramInfo();
                    }
                } else {    // User is not enrolled in the program
                    if(programType === 'microdegree') {
                        history.push('/enroll/microdegree');
                    } else {    // Bootcamp user
                        // Check if auto enrollment is possible
                        if((resp.profile.subscriptions !== undefined && resp.profile.subscriptions.microdegree !== undefined && resp.profile.subscriptions.microdegree === true)) {
                            bootcampAutoEnroll();
                        } else {
                            // Redirect user to enrollment form page
                            history.push({
                                pathname: '/enrollment-form',
                                state: {
                                    profile: resp.profile,
                                    programType
                                }
                            });
                        }
                    }
                }
            } else {
                history.push('/');
            }
        });
    }

    const getProgramInfo = () => {
        axios.get(G_API_URL + "/program/",{
            headers: {
                "Authorization": __getToken()
            }
        }).then(response => {
            if(response.data.status === 1) {
                login_user({token: response.data.data});
                window.location.href = G_URL + 'learning-dashboard/bootcamp#'+response.data.program;
            }
        })
    }

    const bootcampAutoEnroll = () => {
        const emailEncrypted = encrypt(__getEmail());
        axios.post(G_API_URL + "auth/register/bootcamp", {
            emailEncrypted
        }, {
            headers: {
                "Authorization": __getToken()
            }
        })
            .then(response => {
                if (response.data.status === 1) {
                    login_user({token: response.data.data});

                    // Env
                    // const platformEnv = process.env.REACT_APP_PLATFORM;

                    // if (platformEnv === 'prod') {
                    //     const tag = getGATag("free_experience_registered",
                    //         "subscribers", "Microdegree", 1);
                    //     document.body.appendChild(tag);
                    // }

                    setTimeout(() => {
                        window.location.href = G_URL + 'learning-dashboard/bootcamp';
                    }, 1000);
                } else {
                    console.log("Bootcamp registration failed");
                    // Show Failure Notification
                    openNotification('fail', response.data.message, 4);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <>
            <div className="payment-successful-container f-d f-vt f-v-c">
                <div className="success-gif-container f-d f-v-c f-h-c">
                    <img src={payment_success} alt="success" />
                </div>
                <h2 className="font-heading text-xl">Success!</h2>
                <div className="text-medium text-c-d success-msg text-faded">The payment was successful. A payment receipt has
                been sent to your registered email.
                </div>
                <div className="okay-btn default-blue-btn"
                    onClick={() => {redirectUser()}}>
                    Learning Dashboard
                </div>
            </div>

            <style jsx>
            {`     
                .payment-successful-container .success-gif-container img {
                    width: 200px;
                }
                
                .payment-successful-container .success-msg {
                    width: 600px;
                }

                .payment-successful-container .okay-btn {
                    height: 50px !important;
                    margin-top: var(--peaky-gap-64);
                }

                @media only screen and (max-device-width: 760px) {
                    .payment-successful-container .success-msg {
                        width: unset;
                    }
                }
            `}
            </style>
        </>
    );
}

export default PaymentSuccess;
