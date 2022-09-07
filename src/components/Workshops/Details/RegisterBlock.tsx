import { Button } from "antd";
import React from "react";
import { check_login } from "../../../utils/login.util";

interface IHeroProps {
    handleRegister: Function;
    joinUrl?: string;
    bookingText?: string;
}

const RegisterBlock = (props: IHeroProps) => {
    const loggedIn = check_login();
    const { joinUrl } = props;

    return (
        <>
            <div className="register-wrapper lr-pad-d tb-pad-d f-d f-vt f-v-c">
                <h3 className="font-heading text-xl text-c-m title">Excited for this workshop?</h3>
                {
                    joinUrl ?
                    <Button type="primary" htmlType="submit" className="default-blue-btn register-btn" onClick={() => { window.open(joinUrl) }}>
                        Join Workshop
                    </Button>
                    :
                    <Button type="primary" htmlType="submit" className="default-blue-btn register-btn" onClick={() => props.handleRegister()}>
                        {props.bookingText}
                    </Button>
                }
                {
                    !loggedIn && 
                    <div className="text-small text-faded text-c-d text-c-m">Already registered? <u className="c-pointer" onClick={() => { props.handleRegister(0) }}>Log in</u></div>
                }
            </div>
            <style jsx>
                {`
                    .register-wrapper {
                        width: 100%;
                        background-color: var(--primary-bg);
                    }

                    .register-wrapper .register-btn {
                        margin: var(--peaky-gap-32) 0 var(--peaky-gap-16);
                    }

                    @media only screen and (max-device-width: 760px) {
                        .register-wrapper .title {
                            line-height: 2.23rem
                        }
                        
                        .register-wrapper .register-btn {
                            width: 100%;
                            margin-bottom: var(--peaky-gap-32);
                        }
                    }
            `}
            </style>
        </>
    )
}

export default RegisterBlock;