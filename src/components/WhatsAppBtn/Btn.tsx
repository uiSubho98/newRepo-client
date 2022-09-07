import React from "react";
import whatsapp_btn from '../../assets/imgs/whatsapp_btn.svg';
import { isMobile } from "react-device-detect";

const WhatsAppBtn = () => {
        return (
            <>
                <div 
                    className="layout-whatsapp-btn bg-image-full c-pointer"
                    onClick={() => window.open('http://wa.me/917975218461', '_blank')}
                    style={{ backgroundImage: `url(${isMobile ? 'https://cdn.prograd.org/whatsapp.svg' : whatsapp_btn})`}}
                />
                <style jsx>
                    {`
                    .layout-whatsapp-btn {
                        width: 200px;
                        height: 100px;
                        position: fixed;
                        bottom: 0px;
                        right: 25px;
                        z-index: 9999999999999;
                    }

                    @media only screen and (max-device-width: 760px) {
                        .layout-whatsapp-btn {
                            width: 50px;
                            bottom: 16px;
                            height: 50px;
                        }
                    }
                    `}
                </style>
            </>
        );
    }
;

export default WhatsAppBtn;
