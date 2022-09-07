import React, { useEffect } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router";
import Layout from "../../components/Layout";
import { G_API_URL, LEARN_PLAT_URL } from "../../constants/constants";
import { openNotification } from "../../utils/common.util";
import { __setCookie } from "../../utils/cookie.util";
import keys from "../../config/keys";
import Spinner from "../../components/Spinner/spinner";

function learn_platform_login(method = "post", params) {
    let path = LEARN_PLAT_URL + "auth/";

    const form = document.createElement("form");
    form.method = method;
    form.action = path;

    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            const hiddenField = document.createElement("input");
            hiddenField.type = "hidden";
            hiddenField.name = key;
            hiddenField.value = params[key];

            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
}

const SSOLogin = () => {
    let history = useHistory();
    let locationProps = useLocation();

    useEffect(() => {
        let code = locationProps.search.split("?code=")[1];
        axios
            .get(`${G_API_URL}ssologin/check`, {
                headers: {
                    "sso-data": code,
                },
            })
            .then((res) => {
                let data = res.data;

                if (data.status === 0 || (typeof data === "string" && data.length === 0)) {
                    openNotification("failure-notification-top", "Invalid url");
                    setTimeout(() => {
                        history.replace("/login");
                    }, 2000);
                }

                if (data.status === 1) {
                    __setCookie(keys.cookiePrefix + "ut", data.token, 7, "day");

                    setTimeout(() => {
                        if (data.type === "login" && data.redirection === "learn_portal") {
                            let formParams = {
                                t: "set_token",
                                token: data.token,
                                r_path: data.rurl,
                            };

                            learn_platform_login("post", formParams);
                        } else window.location.href = res.data.rurl;
                    }, 300);
                    openNotification("success", "Logged in Successfully");
                }
            });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <Layout redirectDisable={true} authPage={true}>
                <Spinner />
            </Layout>
            <style jsx={"true"}>{`
                .right-pane {
                    display: none;
                }
            `}</style>
        </>
    );
};

export default SSOLogin;
