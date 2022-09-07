import React, { useState } from "react";
import { G_API_URL } from "../../constants/constants";
import { openNotification } from "../../utils/common.util";
import ChangeEmailForm from "./ChangeEmailForm";
import Verification from "./Verification";
import queryString from "query-string";
import axios from "axios";
import { encrypt } from "../../utils/encryption.util";
import ChangeMobileForm from "./ChangeMobileForm";

interface IProps {
    info: any;
    countryCode: string;
    locationData: any;
    decodedToken: any;
    updateToken: Function;
}

interface IState {
    isExpanded: number;
    updatedValue: any;
    isLoading: boolean;
    activeMode: number;
}

const AccountItem = (props: IProps) => {

    const defaultState = {
        isExpanded: 0,
        updatedValue: "",
        isLoading: false,
        activeMode: 0
    }

    const { countryCode, locationData, info, updateToken, decodedToken } = props;

    const [ state, setState ] = useState<IState>(defaultState);

    const { isExpanded, updatedValue, activeMode, isLoading } = state;

    const sendOtpApi = (value:any, mode: string, type?:string) => {
        // let apiData = decodedToken;
        // let {prefix} = apiData;

        if(value && mode === "mobile" && typeof value === "string") 
            value = {
                prefix: value.split(" ")[0],
                mobileNumber: value.split(" ")[1]
            };
        setState(prev => ({
            ...prev, 
            updatedValue: value ? value : updatedValue, 
            isLoading: true
        }));
        const config = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        };

        let data:any = {
            mode: mode,
            subMode: 'verification'
        }

        if(mode === "email") {
            data = {
                ...data,
                email: encrypt(value ? value: updatedValue),
                emailOld: type === "update" ? decodedToken.email : undefined
            }
        } else {
            data = {
                ...data,
                email: encrypt(decodedToken.email),
                prefix: parseInt(value ? value.prefix : updatedValue.prefix),
                mobileNumber: value ? value.mobileNumber: updatedValue.mobileNumber
            }
        }

        // if (resendCount < 5) {
            axios
                .post(G_API_URL + "auth/send-otp/", queryString.stringify(data), config)
                .then(response => {
                    if (response.data.status === 1) {
                        // Show Notification
                        openNotification('success', 'Verification code sent successfully', 2);
                        setState(prev => ({
                                ...prev, 
                                isExpanded: 2, 
                                isLoading: false,
                                activeMode: mode === "email" ? 0 : 1
                        }));
                        // Update resendCount
                        // setResendCount(resendCount + 1);
                        // setNumberForm(false);
                    } else {
                        // Show Notification
                        // setIsLoading(false)
                        let notificationMessage = "Account already exists with this email!";
                        if(mode === "mobile") {
                            notificationMessage = "Account already exists with this mobile!";
                        }
                        setState(prev => ({
                            ...prev,
                            isLoading: false
                        }));
                        openNotification(
                            'fail', 
                            notificationMessage , 
                            4
                        );
                    }
                })
                .catch(err => {
                    console.log(err);
                    // setIsLoading(false);
                    setState(prev => ({
                        ...prev,
                        isLoading: false
                    }));
                });
        // } 
        // else {
        //     openNotification('fail', 'Resend limit reached, please wait for some time and try again', 4);
        //     // setIsLoading(false);
        // }
    }

    const onVerification = (token: any) => {
        setTimeout(() => {
            setState(prev => ({
                ...prev,
                isExpanded: 0,
                updatedValue: ""
            }));
        }, 200);

        updateToken(token);
    }

    const renderUpdateBlock = () => {
        let mobile = updatedValue;
        if(activeMode === 1) {
            if(typeof updatedValue !== "string") {
                mobile = (updatedValue.mobileNumber ? "+" + updatedValue.prefix + updatedValue.mobileNumber : "")
            }
        }
        return (
            <>
                <div className="divider"></div>
                <div className="account-update-block">
                    {
                        activeMode === 0 ?
                        <ChangeEmailForm 
                            isDisabled={isExpanded === 2}
                            isLoading={isLoading}
                            defaultValue = {decodedToken.email}
                            sendOtp={sendOtpApi}
                        /> :
                        <ChangeMobileForm 
                            countryCode={countryCode}
                            locationData={locationData}
                            defaultValue={updatedValue !== "" && isExpanded === 1 ?  mobile: 
                            (decodedToken.mobileNumber ? "+" + decodedToken.prefix + decodedToken.mobileNumber : "")}
                            // eslint-disable-next-line
                            isDisabled={isExpanded == 2}
                            isLoading={isLoading}
                            sendOtp={sendOtpApi}
                        />
                    }
                    {
                        isExpanded === 2 &&
                        <Verification
                            updatedValue={updatedValue}
                            activeMode={activeMode}
                            emailOld = {decodedToken.email}
                            sendOtp={sendOtpApi}
                            onVerification = {onVerification}
                            decodedToken={decodedToken}
                        />
                    }
                </div>
            </>
        )
    }

    return (
        <div className={`account-item w-100 ${isExpanded !== 0 ? "expanded" : ""}`}>
            <div className="g-d g-col-b-s">
                <div className="f-d f-vt">
                    <span className="f-d text-small strong-text 
                    capitalized-letter title">
                        { info.type }
                    </span>
                    {
                        isExpanded === 0 &&
                        <div className="f-d f-v-c f-vt-m f-v-s-m">
                            <span className="text-regular info">
                                { info.value }
                            </span>
                            <span className={`text-small status 
                            ${info.status ? "verified" : ""}`}>
                                { info.status ? "Verified" : "Unverified" }
                            </span>
                        </div>
                    }
                </div>
                <div className="g-d g-h-e action-elements">
                    <div>
                        {
                            !info.status && isExpanded === 0 &&
                            <span className="verify-btn c-pointer"
                            onClick={() => sendOtpApi( info.value, info.type)}>
                                Verify now
                            </span>
                        }
                        <button className="action-btn strong-text c-pointer"
                        onClick={() => setState(prev => ({
                            ...prev, 
                            isExpanded: isExpanded > 0 ? 0 : 1, 
                            activeMode: info.type === "email" ? 0 : 1}))}
                        >
                            { !isExpanded ? "Edit" : "Close" }
                        </button>
                    </div>
                </div>
            </div>
            {
                isExpanded !== 0 && renderUpdateBlock()
            }
        </div>
    )
}

export default AccountItem;