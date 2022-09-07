import React, { useEffect ,useState } from "react";
import Menu from "../../components/Settings/Menu";
import MenuContent from "../../components/Settings/MenuContent";
// @ts-ignore
import { useHistory } from "react-router-dom";
import axios from "axios";
import { G_API_URL } from "../../constants/constants";
import { check_login } from "../../utils/login.util";

interface IState {
    activeMenu: string;
    isMenuActive: boolean;
    countryCode: string;
    locationData?: any;
}

interface IProps {
    isSettingEnabled?: boolean;
    setSettingActive: Function;
    toggleSettings?: Function;
}

const Settings = (props: IProps) => {
    const defaultState = {
        activeMenu: "general",
        isMenuActive: true,
        countryCode: ""
    }

    const [ state, setState ] = useState<IState>(defaultState);

    const { isSettingEnabled, setSettingActive, toggleSettings } = props;

    const history = useHistory();

    useEffect(() => {
        const detectIp = () => {
            axios.get(G_API_URL + 'tracker/ip')
            .then((response) => {
                const {data} = response.data;
                setState(prev => ({
                    ...prev,
                    countryCode: data.country_code !== null ? `${data.country_code}`.toLowerCase() : 'in',
                    locationData: {...data}
                }));
            })
            .catch((error) => console.error(error));
        }

        if(check_login()) {
            detectIp();
        } else {
            history.push({
                path: '/login?rurl=settings'
            })
        }
    }, [history]);

    const setActiveMenu = (value: string) => {
        setState(prev => ({
            ...prev,
            activeMenu: value,
            isMenuActive: false
        }));
    }

    const { activeMenu } = state;

    const closeSettings = () => {
        if(isSettingEnabled && toggleSettings !== undefined) {
             toggleSettings();
        } else {
            setSettingActive(false);
        }
    }

    const showMenu = () => {
        setState(prev => ({
            ...prev,
            isMenuActive: true
        }))
    }

    const { isMenuActive, countryCode, locationData } = state;

    return (
        <>
            <div className="settings-page-container lr-pad-d lr-pad-m">
                <div className="g-d g-h-e">
                    <i className="icon icon-x c-pointer" onClick={() => closeSettings()}></i>
                </div>
                <div className="main-pane">
                    <h1 className="font-heading text-xl">
                        Account settings
                    </h1>
                    <div className="g-d g-gap-64 body-section">
                        <Menu 
                            activeMenu= {activeMenu} 
                            isMenuActive= {isMenuActive}
                            setActiveMenu= {setActiveMenu}
                        />
                        <MenuContent 
                            activeMenu= {activeMenu} 
                            isMenuActive= {isMenuActive}
                            countryCode= {countryCode}
                            locationData={locationData}
                            showMenu= {showMenu}
                        />
                    </div>
                </div>
            </div>
            <style jsx>{`
                #root {
                    margin: 0;
                }

                body {
                    background-color: var(--primary-bg);
                }

                .settings-page-container {
                    padding-top: var(--peaky-pad-32);
                    padding-bottom: var(--peaky-pad-32);
                }

                .settings-page-container .icon-x {
                    background-color: var(--spider);
                    border-radius: var(--peaky-br-full);
                    font-size: 32px;
                    opacity: 0.87;
                    padding: 8px;
                }

                .settings-page-container .main-pane {
                    margin: var(--peaky-gap-24) 0 0;
                }

                .settings-page-container .main-pane
                .body-section {
                    grid-template-columns: 1fr 2.5fr;
                    margin: var(--peaky-gap-48) 0 0;
                }

                @media only screen and (max-device-width: 760px) {
                    .settings-page-container .main-pane 
                    .body-section {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </>
    )
}

export default Settings;