import React from 'react';
import {G_URL} from "../../constants/constants";
import pro_junior_logo from "../../assets/brand/prograd_logo.svg";
import vision_logo from "../../assets/imgs/vision-logo.svg";

const VisionNav = () => {

    return (
        <>
            <div id="main-navbar" className="navbar-container lr-pad-d lr-pad-m f-d f-v-c f-h-sb">
                <div className="navbar-left-container f-d f-v-c">
                    <div
                        className="brand-logo c-pointer f-d f-v-c"
                        onClick={() => (window.location.href = G_URL)}
                    >
                        <img src= {pro_junior_logo} alt="logo"/>
                    </div>
                    <div
                        className="vision-logo c-pointer f-d f-v-c">
                        <img src={vision_logo} alt="logo"/>
                    </div>
                </div>
            </div>
            <style jsx={"true"}>
                {`
                    .navbar-container {
                        height: 64px;
                        background: #ffffff;
                        box-shadow: 0px 5px 11px 0px rgba(50, 50, 50, 0);
                        margin-top: -64px;
                        transition: all 0.2s;
                        justify-content: center;
                    }

                    .navbar-container.nav-hover {
                        height: 82px;
                        box-shadow: 0px 5px 11px 0px rgba(50, 50, 50, 0.08);
                    }

                    .navbar-container .brand-logo > img {
                        height: 50px;
                        padding-right: 2rem;
                        border-right: 1px solid var(--snowfall);
                    }
                    
                    .navbar-container .vision-logo > img {
                         height: 50px;
                         margin-left: 2rem;
                    }

                    .navbar-right-container a {
                        text-decoration: none;
                        color: var(--carbon);
                    }
                         @media only screen and (max-device-width: 760px) {
                         .navbar-right-container{
                             margin-left: 1.5rem;
                        }
                        .quick-links-container > a{
                           margin-right: 0.5rem;
                        }
                         .navbar-container .brand-logo > img {
                             height: 36px;
                              padding-right: 1rem;
                    }
                    .navbar-container .vision-logo > img{
                             height: 36px;
                              margin-left: 1rem;
                    }
                    }
              `}
            </style>

        </>
    );
}

export default VisionNav;
