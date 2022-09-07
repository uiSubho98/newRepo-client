import React,{ useState } from "react";
import email_sent_icon from "../../assets/imgs/Onboard/email_sent_icon.jpg";
import queryString from "query-string";
import {G_API_URL} from "../../constants/constants";
import {encrypt} from '../../utils/encryption.util';
import { openNotification, getSearchParam } from "../../utils/common.util";
import axios from "axios";

interface IOnboardSuccess {
    userMode: string;
    resendCount: number;
}

interface OnboardSuccessProps {
    userEmail: string
    timeStamp?: number
}

const OnboardSuccess = (props: OnboardSuccessProps) => {
    const {userEmail} = props;

    const defaultState:IOnboardSuccess = {
        userMode: '',
        resendCount: 1
    }
    const [ state, setState ] = useState<IOnboardSuccess>(defaultState);
    
    const sendEmail = () => {
        const {timeStamp} = props;
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
        <>
            <div className="onboard-success-container f-d f-vt f-v-c f-h-c">
                <div 
                    className="email-sent-icon bg-image-full"
                    style={{backgroundImage: 'url(' + email_sent_icon + ')'}}
                >
                </div>
                <h1 className="font-heading text-xl">Almost done!</h1>
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
                .onboard-success-container {
                    height: 80vh;
                }
                
                .onboard-success-container .mail-holder {
                    font-weight: 500;
                    margin-left: 8px;
                }

                .onboard-success-container .body-regular {
                    width: 700px;
                    text-align: center;
                }
                
                .onboard-success-container .resend-email-container {
                    margin-top: 2rem;
                    font-weight: 300;
                }

                .resend-email-container .resend-email-btn {
                    margin-left: 8px;
                    color: var(--primary);
                }

                .onboard-success-container .email-sent-icon {
                    width: 150px;
                    height: 150px;
                }

                @media only screen and (max-device-width: 760px) {
                    .onboard-success-container {
                        width: 100%;
                    }
                    
                    .onboard-success-container .body-regular {
                        width: unset;
                    }
                }

                @media screen and (min-width: 768px) and 
                (max-width: 1023px) and (orientation: portrait) {
                    .onboard-success-container {
                        width: 100%;
                    }
                }
                `}
            </style>
        </>
    );
}

export default OnboardSuccess;