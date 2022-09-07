import React, { useEffect, useState } from "react";
import AccountItem from "./AccountItem";

interface IAccountItem {
    type: string;
    value: string;
    status: boolean;
}

interface IProps {
    countryCode: string;
    decodedToken: any;
    locationData: any;
    updateToken: Function;
}

// interface IState {
//     accountInfo: Array<IAccountItem>;
// }

const General = (props: IProps) => {

    const { countryCode, locationData, decodedToken, updateToken } = props;

    // const [ state, setState] = useState<IState>(defaultState);
    const [domReady, setDomReady] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setDomReady(true)
        }, 50);
    }, []);

    // const { accountInfo } = state;

    const renderAccountInfo = () => {
        const accountInfo: Array<IAccountItem> = [
            {
                type: "email",
                value: decodedToken.email,
                status: decodedToken.emailVerified
            },
            {
                type: "mobile",
                value: decodedToken.mobileNumber  ? 
                ("+" + decodedToken.prefix + " " + decodedToken.mobileNumber) : "",
                status: decodedToken.mobileVerified
            }
        ];

        return accountInfo.map(data => (
            data.value && 
            <AccountItem 
                countryCode = {countryCode}
                locationData={locationData}
                info={data} 
                updateToken={updateToken}
                decodedToken={decodedToken}
            />
        ));
    }

    return (
        <>
            <div className={`general-settings-wrapper base-transition ${domReady ? 'ready' : ''}`}>
                <h3 className="heading text-big">
                    Account Info
                </h3>
                <div className="account-info-block">
                    { renderAccountInfo() }
                </div>
            </div>
            <style jsx>{`

                .general-settings-wrapper .account-info-block {
                    margin: var(--peaky-gap-24) 0 0;
                }

                .general-settings-wrapper .account-item {
                    background-color: var(--secondary-bg);
                    padding: var(--peaky-pad-32);
                    margin: 0 0 var(--peaky-gap-16);
                }

                .general-settings-wrapper .account-item
                .title {
                    margin: 0 0 var(--peaky-gap-8);
                    opacity: 0.54;
                }

                .general-settings-wrapper .account-item
                .info {
                    font-weight: 300;
                }

                .general-settings-wrapper .account-item
                .status {
                    color: var(--tomato);
                    margin: 0 0 0 var(--peaky-gap-24);
                }

                .general-settings-wrapper .account-item
                .status.verified {
                    color: var(--go);
                }

                .general-settings-wrapper .account-item
                .verify-btn {
                    font-weight: 300;
                    text-decoration: underline;
                    margin: 0 var(--peaky-gap-32) 0 0;
                }

                .general-settings-wrapper .account-item
                .action-btn {
                    border: 1px solid var(--dove);
                    border-radius: var(--peaky-br-2);
                    box-shadow: unset;
                    background-color: transparent;
                    height: max-content;
                    padding: 6px var(--peaky-pad-16);
                }

                .general-settings-wrapper .account-item
                .divider {
                    height: 2px;
                    background-color: var(--dove);
                    opacity: 0.1;
                    margin: var(--peaky-gap-32) 0;
                }

                .has-error .ant-input,
                .has-error .ant-input:hover {
                    background-color: #383838;
                }

                @media only screen and (max-device-width: 760px) {
                    .general-settings-wrapper .account-item {
                        padding: var(--peaky-pad-16);
                    }

                    .general-settings-wrapper .account-item
                    .info {
                        // width: 200px;
                        white-space: unset;
                        overflow: hidden;
                        text-overflow: ellipsis;                      
                    }

                    .general-settings-wrapper .account-item > 
                    div:first-of-type {
                        // grid-template-columns: 1fr;
                    }

                    .general-settings-wrapper .account-item.expanded > 
                    div:first-of-type {
                        grid-template-columns: 2fr 1fr;
                    }

                    .general-settings-wrapper .account-item > 
                    div:first-of-type .action-elements {
                        // margin: var(--peaky-gap-16) 0 0;
                    }

                    .general-settings-wrapper .account-item.expanded > 
                    div:first-of-type .action-elements {
                        margin: 0;
                    }

                    .general-settings-wrapper .account-item > 
                    div:first-of-type .action-elements > div:first-of-type {
                        display: grid;
                        justify-content: end;
                    }

                    .general-settings-wrapper .account-item
                    .verify-btn {
                        order: 1;
                    }

                    .general-settings-wrapper .account-item
                    .verify-btn {
                        margin: 0;
                    }

                    .general-settings-wrapper .account-item .status {
                        margin: var(--peaky-gap-8) 0 0;
                    }

                    .general-settings-wrapper .account-item 
                    .action-btn {
                        margin: 0 0 var(--peaky-gap-16);
                    }
                }
            `}</style>
        </>
    )
}

export default General;