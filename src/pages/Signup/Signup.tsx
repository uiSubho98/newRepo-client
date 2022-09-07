import React, { useEffect } from "react";
// @ts-ignore
import { Helmet } from 'react-helmet';
import { useHistory } from "react-router";
import Layout from "../../components/Layout";
import SignupForm from "../../components/Signup/SignupForm";
import { check_login } from "../../utils/login.util";

const Signup = () => {

    const history = useHistory();

    // Redirect user if already logged in
    useEffect(()=>{
        if(check_login()) {
            history.push("/login");
        }
    })

    return (
        <>
            <Layout redirectDisable={true} authPage={true}>
                <Helmet>
                    <title>ProGrad | Signup</title>
                </Helmet>
                <div className="signup-wrapper g-d g-h-c g-v-c 
                lr-pad-d lr-pad-m tb-pad-m">
                    <SignupForm type={"login"} />
                </div>
            </Layout>

            <style jsx>
                {`
                    .signup-wrapper {
                        height: calc(100vh - 80px);
                    }
                `}
            </style>
        </>
    )
}

export default Signup;