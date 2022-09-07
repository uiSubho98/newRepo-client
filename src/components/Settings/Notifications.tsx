import { Switch } from "antd";
import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { G_API_URL } from "../../constants/constants";
import { __getToken } from "../../utils/user-details.util";
import queryString from "query-string";
import { openNotification } from "../../utils/common.util";
import { login_user } from "../../utils/login.util";

interface IState {
    isLoading: boolean;
    switchState: boolean;
}

interface IProps {
    decodedToken: any;
    updateToken: Function;
}

const Notifications = (props: IProps) => {

    const { decodedToken, updateToken } = props;
    const initialState = decodedToken.notifications !== undefined ? decodedToken.notifications : true;

    const defaultState = {
        isLoading: false,
        switchState: initialState
    }

    const [domReady, setDomReady] = useState(false);
    const [state, setState] = useState<IState>(defaultState);

    useEffect(() => {
        setTimeout(() => {
            setDomReady(true)
        }, 50);
    }, []);

    const onChange = (checked: boolean) => {

        // Set loading state
        setState(prev => ({
            ...prev,
            isLoading: true
        }))

        const data = {
            email: decodedToken.email,
            notifications: checked
        }

        const apiHeader = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": __getToken()
            }
        }

        // Make unrollFromEmails API call
        axios
            .post(G_API_URL + `auth/notifications/${decodedToken.uid}`, queryString.stringify(data), apiHeader)
            .then((response: AxiosResponse) => {
                if (response.data.status === 1) {
                    const {token} = response.data.data;
                    // Set Loading State
                    // Update switch state
                    setState(prev => ({
                        ...prev,
                        isLoading: false,
                        switchState: checked
                    }))
                    // Show Success Notification
                    openNotification('success', 'Notification Preference updated', 2);
                    login_user({token});
                    // Update Token
                    updateToken(token);
                } else {
                    // Set Loading State
                    setState(prev => ({
                        ...prev,
                        isLoading: false
                    }))
                    openNotification('fail', response.data.message, 6);
                }
            })
            .catch(err => {
                console.log(err);
                // Set Loading State
                setState(prev => ({
                    ...prev,
                    isLoading: false
                }))
                openNotification('fail', err.message, 6);
            });
    }

    const { isLoading, switchState } = state;

    return (
        <>
            <div className={`notification-block-container w-70
            base-transition ${domReady ? 'ready' : ''}`}>
                <h3 className="heading text-big">
                    Notification Preferences
                </h3>
                <div className="notification-content f-d f-v-c">
                    <div className="notification-brief text-regular w-70">
                        It's okay to send me program updates, newsletters, exclusive discounts & offers via email/SMS.
                    </div>
                    <Switch loading={isLoading} checked={switchState} onChange={onChange}/>
                </div>
                <div className="notification-disclaimer text-small">
                    <b>Note:</b>
                    This doesn’t apply to important account-related and service-related communication.
                </div>
            </div>
            <style jsx>
                {`

                .notification-content {
                    margin: var(--peaky-gap-32) 0;
                }

                .notification-content .ant-switch-checked {
                    background-color: var(--primary) !important;
                }

                .notification-content .ant-switch {
                    background-color: var(--snowfall);
                    margin: 0 0 0 15%;
                }

                .notification-disclaimer {
                    margin-top: 1rem;
                    opacity: 0.54;
                }

                .notification-disclaimer b {
                    margin-right: 8px;
                }

                @media only screen and (max-device-width: 760px) {
                    .notification-block-container {
                        width: 100%;
                    }
                }
                `}
            </style>
        </>
    )
}

export default Notifications;
