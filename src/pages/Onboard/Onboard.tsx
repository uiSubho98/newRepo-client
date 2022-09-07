import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
//@ts-ignore
import { useHistory } from "react-router-dom";
import Layout from "../../components/Layout";
import OnboardForm from "../../components/Onboard/OnboardForm";
import Spinner from "../../components/Spinner/spinner";
import { G_API_URL, G_URL } from "../../constants/constants";
import { check_login } from "../../utils/login.util";
import { decodeToken, __getToken } from "../../utils/user-details.util";


const Onboard = (props: any) => {
    const [ state, setState ] = useState<any>({});
    const [isLoading, setLoading] = useState<boolean>(true);
    const { slug } = props.match.params;

    const history = useHistory();
    useEffect(() => {
        if(check_login()) {
            const token = decodeToken();
            if(token?.subscriptions?.microdegree) {
                history.push({
                    pathname: "/learning-dashboard/microdegree"
                });
            } else {
                setLoading(false);
                axios.get(G_API_URL + "auth/user", {
                    headers: {
                        Authorization: __getToken()
                    }
                }).then((response: any) => {
                    response = response.data;
                    if(response.status === 1) {
                        setState(response.user);
                    }
                    setLoading(false);
                });
            }
        } else {
            window.location.href = G_URL + 'login?rurl=register'
            // history.push({
            //     pathname: "login?rurl=register"
            // });
        }
        setLoading(false);
    }, [history]);
    return (
        <Layout redirectDisable={true}>
            <Helmet>
                <title>ProGrad | Free Experience Registration</title>
            </Helmet>
            {
                !isLoading ?
                <div className="g-d g-h-c lr-pad-d lr-pad-m 
                tb-pad-d tb-pad-m onboard-page-container">
                    <OnboardForm userInfo={state} slug={slug} />
                </div>
                :
                <Spinner />
            }

            <style jsx>{`
                .onboard-page-container .description {
                    font-weight: 400;
                    color: var(--dove);
                    opacity: 0.80;
                }

                @media only screen and (max-device-width: 760px) {
                    .onboard-page-container .heading {
                        line-height: 3rem;
                    }

                    .onboard-page-container .description {
                        margin: var(--peaky-gap-16) 0 0;
                    }
                }
            `}</style>
        </Layout>
    )
}

export default Onboard;