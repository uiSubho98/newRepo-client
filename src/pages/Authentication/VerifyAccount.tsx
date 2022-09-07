import React,{ useState } from "react";
import email_sent_icon from "../../assets/imgs/Onboard/email_sent_icon.jpg";
import queryString from "query-string";
import {G_API_URL, G_URL} from "../../constants/constants";
import {encrypt} from '../../utils/encryption.util';
import { openNotification, getSearchParam } from "../../utils/common.util";
import axios from "axios";
import Layout from '../../components/Layout';
import { __getEmail } from "../../utils/user-details.util";

interface IVerifyAccount {
    userMode: string;
    resendCount: number;
}

const VerifyAccount = () => {
    var userEmail = __getEmail();
    // Check if email is not present in token
    if(userEmail === '') {
        userEmail = getSearchParam('email')
        // Check if email is not present in url params
        if(userEmail === null) {
            // Redirect back to login
            window.location.href = G_URL + 'login'
        }
    }

    // Get user verified status
    axios
        .get(G_API_URL + "auth/verify-account/", {params:{email: userEmail}})
        .then(response => {
            if (response.data.status === 1) {
                if(response.data.data.verified){
                    openNotification('fail', 'Account is already verified', 4);
                    setTimeout(() => {
                        // Redirect back to login
                        window.location.href = G_URL + 'login'
                    }, 4000);
                } else {
                    sendEmail();
                }
            } else {
                openNotification('fail', 'Account does not exist', 4);
                setTimeout(() => {
                    // Redirect back to login
                    window.location.href = G_URL + 'login'
                }, 4000);
            }
        })
        .catch(err => {
            console.log(err);
        });

    const defaultState:IVerifyAccount = {
        userMode: '',
        resendCount: 1
    }
    const [ state, setState ] = useState<IVerifyAccount>(defaultState);
    
    const sendEmail = () => {
        const timeStamp = new Date().getTime();
        const rurl = getSearchParam('rurl');

        // Encrypt user details and get Hex and Salt values
        const emailEncryptedKey = encrypt(userEmail+"$-"+timeStamp);

        if (userEmail !== undefined && userEmail.length > 0 && state.resendCount < 3) {
            let data = {
                emailEncryptedKey: emailEncryptedKey,
                rurl: rurl
            }
            axios
            .post(G_API_URL + "auth/resend-mail/", queryString.stringify(data))
            .then(response => {
                if (response.data.status === 1) {
                    setState((previousState) => {
                        return { 
                            ...previousState,
                            resendCount: state.resendCount + 1
                        }
                    })
                    openNotification('success', 'Mail sent successfully', 2);
                } else {
                    openNotification('fail', 'Resend failed, please try again', 4);
                }
            })
            .catch(err => {
                console.log(err);
            });
        } else {
            openNotification('fail', 'Resend limit reached, please wait for some time and try again', 4);
        }
    }

    return (
        <Layout>
            <div className="verify-account-container f-d f-vt f-v-c f-h-c">
                <div 
                    className="email-sent-icon bg-image-full"
                    style={{backgroundImage: 'url(' + email_sent_icon + ')'}}
                >
                </div>
                <h1 className="h1-heading">Almost done!</h1>
                <div className="body-regular">
                    Please activate your account with the link sent to your email 
                    <span className="mail-holder">{userEmail}</span>
                </div>
                <div className="resend-email-container">
                    Haven’t got the mail?
                    <span className="resend-email-btn c-pointer" 
                    onClick={() => sendEmail()}>Resend</span>
                </div>
            </div>

            <style jsx>
                {`
                .verify-account-container {
                    height: 100vh;
                }
                
                .verify-account-container .mail-holder {
                    font-weight: 500;
                    margin-left: 8px;
                }

                .verify-account-container .body-regular {
                    width: 700px;
                    text-align: center;
                }
                
                .verify-account-container .resend-email-container {
                    margin-top: 2rem;
                    font-weight: 300;
                }

                .resend-email-container .resend-email-btn {
                    margin-left: 8px;
                    color: var(--purple);
                }

                .verify-account-container .email-sent-icon {
                    width: 150px;
                    height: 150px;
                }

                @media only screen and (max-device-width: 760px) {
                    .verify-account-container {
                        width: 100%;
                    }
                    
                    .verify-account-container .body-regular {
                        width: unset;
                    }
                }
                `}
            </style>
        </Layout>
    );
}

export default VerifyAccount;