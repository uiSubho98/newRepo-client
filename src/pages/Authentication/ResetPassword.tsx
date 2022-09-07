import React, { useState } from "react";
import { Helmet } from "react-helmet";
import CreatePassword from "../../components/Authentication/CreatePassword";
import ResetBlock from "../../components/Authentication/ResetBlock";
import Verification from "../../components/Authentication/Verification";
import Layout from "../../components/Layout";
import { encrypt } from "../../utils/encryption.util";

interface IState {
    email: string;
    vcode: string;
    mode: number;
}

const ResetPassword = () => {

    const defaultState = {
        email: "",
        vcode: '000000',
        mode: 0,
    }

    const [state, setState] = useState<IState>(defaultState);

    const { email, mode, vcode } = state;

    const setMode = (mode: number) => {
        setState(prev => ({
            ...prev,
            mode
        }));
    }

    const setEmail = (email: string) => {
        setState(prev => ({
            ...prev,
            email: email
        }))
    }

    const setVcode = (vcode: string) => {
        setState(prev => ({
            ...prev,
            vcode: vcode
        }))
    }

    const apiData = { 
        email: email, 
        encryptedMail: encrypt(email) 
    }

    return (
        <Layout redirectDisable={true} authPage={true}>
            <Helmet>
                <title>ProGrad | Reset Password</title>
            </Helmet>
            <div className="lr-pad-d lr-pad-m tb-pad-d tb-pad-m 
            g-d g-h-c reset-password-page-wrapper">
                {
                    mode === 0 ?
                    <>
                        <h1 className="font-heading text-xxl text-c-d title">
                            Reset Password
                        </h1>
                        <ResetBlock
                            fromPage={'reset-password'}
                            setMode={setMode}
                            setEmail={setEmail}
                        />
                    </> :
                    mode === 1 ?
                    <Verification
                        fromPage={'reset-password'}
                        apiData = {apiData}
                        setMode={setMode}
                        setVcode={setVcode}
                     />
                    : 
                    <CreatePassword 
                        fromPage={'reset-password'}
                        encryptedMail={apiData.encryptedMail} 
                        vcode={vcode} 
                    />
                }
            </div>
            <style jsx>{`

                .reset-password-page-wrapper .reset-form,
                .reset-password-page-wrapper .mail-sent-block {
                    margin: var(--peaky-gap-24) 0;
                }

                .reset-password-page-wrapper .mail-sent-block {
                    width: 40%;
                    text-align:center;
                }

                .reset-password-page-wrapper .mail-sent-block 
                .go-back-action {
                    justify-content: center;
                }

                @media only screen and (max-device-width: 760px) {
                    .reset-password-page-wrapper .title {
                        line-height: 48px;
                    }
                }
            `}</style>
        </Layout>
    )
}

export default ResetPassword;