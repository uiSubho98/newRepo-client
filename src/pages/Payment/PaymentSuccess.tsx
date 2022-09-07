import React, {useEffect} from 'react';
// @ts-ignore
import { Helmet } from 'react-helmet';
import { RouteComponentProps } from 'react-router';
import Layout from "../../components/Layout";
import PaymentSuccessBlock from '../../components/Payment/PaymentSuccess';

interface MatchParams {
    slug: string
}

interface IPaymentSuccessProps extends RouteComponentProps<MatchParams> {

}

const PaymentSuccess = (props: IPaymentSuccessProps) => {
    const {slug} = props.match.params;
    useEffect(() => {
        // Clear Storage
        localStorage.removeItem('ps-state');
    });

    return (
        <>
            <Layout navAction={'Account'} >
                <Helmet>
                    <title>ProGrad | Payment Success</title>
                </Helmet>
                <div className="payment-success-page-container lr-pad-d tb-pad-d lr-pad-m f-d">
                    <div className="w-100 tb-pad-m">
                        <PaymentSuccessBlock programType={slug} />
                    </div>
                </div>

                <style jsx>
                    {`     

                        .payment-success-page-container {
                            min-height: calc(100vh - 64px);
                        }
                    
                        .navbar-container {
                            height: 64px;
                            box-shadow: 0px 5px 11px 0px rgba(50, 50, 50, 0.08);
                        }

                        @media only screen and (max-device-width: 760px) {
                            .payment-success-page-container {
                                flex-direction: column-reverse;
                                padding-top: 0;
                            }
                        }

                        @media only screen and (max-device-width: 360px) {
                            .steps-container .step-block:nth-child(-n+2) .check-circle:before {
                                width: 92px;
                            }
                        }

                        @media screen and (min-width: 768px) and (max-width: 1023px) and (orientation: portrait) {
                            .payment-success-page-container {
                                flex-direction: column-reverse;
                                padding-top: 0;
                                min-height: unset;
                            }
            
                            .payment-success-page-container .left-container {
                                padding-top: 2rem;
                            }
                        }
                    `}
                </style>
            </Layout>
        </>
    );
}

export default PaymentSuccess;
