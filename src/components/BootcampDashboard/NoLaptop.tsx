import React from "react";
import no_laptop from '../../assets/icons/svg_icons/no_laptop.svg';
import axios from "axios";
import {G_API_URL} from "../../constants/constants";
// import {message} from "antd";
import {__getCookie} from "../../utils/cookie.util";
import keys from "../../config/keys";

interface INoLaptopProps {
    userName: string
}

const NoLaptop = ({userName}: INoLaptopProps) => {
    const changePreference = () => {
        axios.put(G_API_URL + "auth/preference", {src: window.location.pathname.includes('ignite')}, {
            headers: {
                Authorization: __getCookie(keys.cookiePrefix + "ut").cookieValue
            }
        }).then((response) => {
            response = response.data;
            if (response.status === 1) {
                window.location.reload();
            }
        }).catch(err => {
        });
    }
    return (
        <>
            <div
                className="no-laptop-hero-container f-d f-vt-m f-v-c f-h-c lr-pad-d tb-pad-d tb-pad-m lr-pad-m">
                <div className="hero-left-container">
                    <div className="hero-image bg-image"
                         style={{backgroundImage: 'url(' + no_laptop + ')'}}>
                    </div>
                </div>
                <div className="hero-right-container">
                    <h1 className='h1-heading'>Hi, {userName}!</h1>
                    <div className='info body-big'>
                        We are sorry but you’d need a Laptop/PC to be able to code as well as attend the classes. If
                        you’re keen to learn to code, we highly recommend you arrange for a Laptop/PC. Once you’ve
                        arranged one, kindly hit the button below to get started with the FREE experience.
                    </div>
                    <div className='default-pink-btn filled-pink have-laptop-btn' onClick={changePreference}>
                        I’ve arranged a Laptop/PC
                    </div>
                </div>

            </div>
            <style jsx>
                {` 
                .no-laptop-hero-container .hero-left-container .hero-image{
                     width: 400px;
                     height: 500px;
                }
                .no-laptop-hero-container .hero-right-container{
                    width: 50%;
                    margin-left: var(--peaky-gap-64);
                }
                 .no-laptop-hero-container .hero-right-container .info{
                      margin-bottom:  var(--peaky-gap-32);
                 }
                  .no-laptop-hero-container .hero-right-container .have-laptop-btn{
                      padding: 20px var(--peaky-gap-32);
                 }
                  @media only screen and (max-width: 768px) {
                   .no-laptop-hero-container .hero-left-container .hero-image{
                     width: 240px;
                     height: 320px;
                }
                 .no-laptop-hero-container .hero-right-container{
                    width: unset;
                    margin-left: unset;
                    margin-top: 2rem;
                    }
                  }
                `}
            </style>
        </>
    );
}

export default NoLaptop;
