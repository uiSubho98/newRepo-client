import React from 'react';
// @ts-ignore
import { Helmet } from 'react-helmet';
import Layout from '../../components/Layout';
import default_403 from '../../assets/imgs/default/default_403.svg';

const Default403 = () => {
    return (
        <>
            <Layout>
                <Helmet>
                    <title>ProGrad | Forbidden</title>
                </Helmet>
                <div className="default-403-container bg-image lr-pad-d lr-pad-m f-d f-v-c f-h-c" style={{backgroundImage: "url(" + default_403 + ")"}}>
                    <div className="content-container text-c-d">
                        <h1 className="font-heading text-xl">403</h1>
                        <h3 className="font-heading text-large">This part of space is forbidden.</h3>
                        <div className="desc body-regular">Let's take you to the <a href="/" className="go-home-btn">HomePage</a></div>
                    </div>
                </div>
            </Layout>

            <style jsx>
                {`
                .default-403-container {
                    height: 100vh;
                    background-position: top;
                }

                .default-403-container .content-container {
                    margin-bottom: 14rem;
                }

                .default-403-container .content-container > h1 {
                    font-size: 64px;
                    margin-bottom: 1rem;;
                }

                .default-403-container .go-home-btn {
                    text-decoration: underline;
                    color: var(--purple);
                }

                .navbar-container .navbar-right-container {
                    display: none;
                }

                @media only screen and (max-device-width: 760px) {
                    .default-403-container {
                        background-position-y: 150px;
                    }
                }
                `}
            </style>
        </>
    );
}

export default Default403;
