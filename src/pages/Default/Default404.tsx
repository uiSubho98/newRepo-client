import React from 'react';
// @ts-ignore
import { Helmet } from 'react-helmet';
import Layout from '../../components/Layout';
import default_404 from '../../assets/imgs/default/default_404.svg';

const Default404 = () => {
    return (
        <>
            <Helmet>
                <title>ProGrad | Not Found</title>
            </Helmet>
            <Layout>
                <div className="default-404-container c-height lr-pad-d lr-pad-m f-d f-vt-r-m f-v-c">
                    <div className="left-container">
                        <div className="default-404 bg-image-full" style={{backgroundImage: "url(" + default_404 + ")"}}></div>
                    </div>
                    <div className="right-container">
                        <h1 className="font-heading text-xl">404</h1>
                        <h4 className="font-heading text-large">Houston, do you copy?</h4>
                        <div className="desc body-regular">Looks like you're lost. Let's take you to the</div>
                        <a href="/" className="go-home-btn">HomePage</a>
                    </div>
                </div>
            </Layout>

            <style jsx>
                {`
                .default-404-container .right-container > h1 {
                    font-size: 64px;
                    margin-bottom: 0;
                }

                .default-404-container .right-container {
                    margin-left: 8rem;
                }

                .right-container .desc {
                    margin-bottom: 1rem;
                }

                .default-404-container .left-container .default-404 {
                    width: 400px;
                    height: 400px;
                }

                .default-404-container .go-home-btn {
                    text-decoration: underline;
                    color: var(--purple);
                }

                .navbar-container .navbar-right-container {
                    display: none;
                }

                @media only screen and (max-device-width: 760px) {
                    .default-404-container {
                        padding-top: 3rem;
                        padding-bottom: 3rem;
                    }

                    .default-404-container .right-container {
                        margin-left: unset;
                    }

                    .default-404-container .left-container .default-404 {
                        width: 90vw;
                    }

                    .c-height {
                        height: unset;
                    }
                }
                `}
            </style>
        </>
    );
}

export default Default404;
