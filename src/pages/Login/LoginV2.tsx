import React from "react";
// @ts-ignore
import { Helmet } from 'react-helmet';
import Layout from "../../components/Layout";
import LoginForm from "../../components/Login/LoginForm";

const Login = () => {

    return (
        <>
            <Layout redirectDisable={true} authPage={true}>
                <Helmet>
                    <title>ProGrad | Login</title>
                </Helmet>
                <div className="login-wrapper g-d g-h-c g-v-c lr-pad-d lr-pad-m tb-pad-m">
                    <LoginForm type={"login"} />
                </div>
            </Layout>

            <style jsx>
                {`
                    .login-wrapper {
                        height: calc(100vh - 80px);
                    }
                `}
            </style>
        </>
    )
}

export default Login;