import React, {useState} from "react";
// @ts-ignore
import {Link} from "react-router-dom";
import {isMobile} from "react-device-detect";


const StickyBar = (props: any) => {
    const [stickyBarVisibility, setStickyBarVisibility] = useState(true);

    return (
        <>
            {stickyBarVisibility&&<div className='sticky-bar lr-pad-m f-d f-vt-m f-v-c f-h-sa'>
                {isMobile &&
                <div className="benefits-close-btn f-d f-v-c f-h-c" onClick={() => setStickyBarVisibility(!stickyBarVisibility)}>
                    <i className="icon icon-x"></i>
                </div>
                }
                <div className="left-container">
                    <div className="text">
                        Wanna create your own App like this? Register for a free coding workshop now!
                    </div>
                </div>
                <div className="right-container">
                        <div className='book-seat-btn'>
                            <Link to={`${process.env.PUBLIC_URL}/coding-for-kids/?utm_source=projectpage&utm_medium=wsproject&utm_campaign=networking`}>
                                BOOK A SEAT
                            </Link>
                        </div>

                </div>
            </div>}
            <style jsx>
                {`
                .sticky-bar {
                background: var(--pink);
                padding: 2rem 4rem;
                color: var(--dove);
                position: fixed;
                bottom: 0px;
                width: 100%;
            }


                .sticky-bar .left-container .text {
                font-family: 'OpenSans';
                font-size: 24px;
                font-weight: 500;
                flex: 0.65 0.35 300px;
            }

                .sticky-bar .right-container .book-seat-btn {
                background: var(--dove);
                border-radius: var(--peaky-br-4);
                box-shadow: none;
                cursor: pointer;
                flex: 0 0 auto;
                padding: 20px 32px;
                margin: 15px 0;
                font-family: Poppins;
                border: none;
                text-transform: uppercase;
                font-size: 18px;
            }

                .sticky-bar .right-container .book-seat-btn a {
                color: var(--pink)!important;
            }

                @media only screen and (max-device-width: 760px) {
                .sticky-bar{
                padding: 0.5rem 0;
                justify-content: unset;
            }
                .sticky-bar .left-container{
                width: unset;
                padding: 0.5rem 1rem;
            }
                .sticky-bar .right-container .book-seat-btn{
                margin-top: 2rem;
            }
            .sticky-bar .left-container .text{
                font-size: 14px;
                text-align: center;
            }
            .sticky-bar .right-container .sticky-share .bg-image{
                height: 30px;
                width: 30px;
                margin: 0.5rem;
            }
            .sticky-bar .right-container .book-seat-btn{
                background: var(--dove);
                border-radius: var(--peaky-br-4);
                box-shadow: none;
                cursor: pointer;
                flex: 0 0 auto;
                padding: 12px 56px;
                margin: 5px 0;
                font-family: Poppins;
                border: none;
                text-transform: uppercase;
                font-size: 16px;
            }
             .benefits-close-btn {
                position: absolute;
                top: -18px;
                right: 0.5rem;
                width: 32px;
                height: 32px;
                color: var(--carbon);
                border-radius: var(--peaky-br-full);
                background: var(--snowfall);
                box-shadow: var(--peaky-shadow);
              }
            }
            `}
            </style>
        </>
    );
};

export default StickyBar;