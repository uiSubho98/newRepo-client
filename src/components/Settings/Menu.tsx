import React from "react";
import notificationsIcon from "../../assets/icons/svg-icons-v2/notification_alt.svg";
import passwordIcon from "../../assets/icons/svg-icons-v2/password_alt.svg";
import settingsIcon from "../../assets/icons/svg-icons-v2/settings.svg";


interface IProps {
    activeMenu: string;
    isMenuActive: boolean;
    setActiveMenu: Function;
}

const Menu = (props: IProps) => {

    const { activeMenu, setActiveMenu, isMenuActive } = props;

    const renderMenuItems = () => {
        const settingsMenu = {
            "general": settingsIcon,
            "change password": passwordIcon,
            "notifications": notificationsIcon
        }

        return Object.entries(settingsMenu).map(([key, value]) => 
            <div className={`f-d f-v-c menu-item capitalized-letter 
            ${activeMenu === key ? "active strong-text" : "" }`} 
            key={key} onClick={() => setActiveMenu(key)}>
                <div className="menu-icon bg-image-full" 
                style={{backgroundImage: `url(${value})`}}></div>
                {key}
                <i className="icon icon-chevron-right"></i>
            </div>
        )
    }

    return (
        <>
            <div className={`menu-wrapper ${isMenuActive ? 'active' : ''}`}>
                { renderMenuItems() }
            </div>
            <style jsx>{`

                .menu-wrapper {
                    border-right: 2px solid rgba(255, 255, 255, 0.1);
                    height: 460px;
                    padding: 0 64px 0 0;
                }

                .menu-wrapper .menu-item {
                    font-size: 18px;
                    font-weight: 300;
                    color: var(--dove);
                    padding: 0 24px;
                    height: 64px;
                    margin-bottom: 10px;
                    border-radius: var(--peaky-br-4);
                    box-shadow: var(--peaky-shadow-none);
                    transition: all 300ms cubic-bezier(.385,0,.08,1);
                    cursor: pointer;
                }

                .menu-wrapper .menu-item.active {
                    background: var(--crow);
                }

                .menu-wrapper .menu-item .menu-icon {
                    width: 24px;
                    height: 24px;
                    margin-right: 12px;
                }

                .menu-wrapper .menu-item .icon {
                    display: none;
                    color: var(--primary);
                    font-size: 21px;
                    margin-left: auto;
                    transition: all 300ms cubic-bezier(.385,0,.08,1);
                }

                .menu-wrapper .menu-item.active .icon {
                    display: unset;
                }

                @media only screen and (max-device-width: 760px) {
                    .menu-wrapper {
                        display: none;
                        visibility: hidden;
                        opacity: 0;
                        padding: 0;
                        border: none;
                    }
                    
                    .menu-wrapper.active {
                        display: block;
                        visibility: visible;
                        opacity: 1;
                    }

                    .menu-wrapper .menu-item,
                    .menu-wrapper .menu-item.active {
                        background: var(--secondary-bg);
                    }

                    .menu-wrapper .menu-item {
                        font-weight: 400;
                        margin-bottom: var(--peaky-gap-32);
                    }

                    .menu-wrapper .menu-item.active {
                        font-weight: 300 !important;
                    }

                    .menu-wrapper .menu-item.active .icon {
                        display: none;
                    }
                }
            `}</style>
        </>
    )
}

export default Menu;