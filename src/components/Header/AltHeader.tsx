import React from "react";
import { useHistory } from "react-router";
import prograd_logo from "../../assets/brand/prograd_logo_blue_white.svg";

const AltHeader = () => {
    const history = useHistory();
    
    const handleLogoAction = () => {
        history.push("/")
    }

    return (
        <>
            <div id="main-navbar" className="navbar-container lr-pad-d 
            lr-pad-m f-d f-v-c">
                <div 
                    className={`f-d f-v-c c-pointer brand-logo`}
                    onClick={() => handleLogoAction()}
                >
                    <img src={prograd_logo} alt="logo" 
                    height="30" width="162" />
                </div>
            </div>
            <style jsx>{`
                .navbar-container {
                    height: 80px;
                    background: var(--spider);
                    box-shadow: 0px 5px 11px 0px rgb(50 50 50 / 8%);
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 1000;
                    transition: all 0.2s;
                }

                @media only screen and (max-device-width: 760px) {

                    .navbar-container {
                        height: 64px;
                    }
                    
                }
            `}</style>
        </>

    )
}

export default AltHeader;