import React, { useEffect, useState } from "react";
import { __getCookie } from "../../utils/cookie.util";
import keys from "../../config/keys";
import axios, { AxiosResponse } from "axios";
import { G_API_URL } from "../../constants/constants";
import Certificate from "../../components/Certificate/Certificate";

interface IData {
    profile_type?: number;
    ptile?: number;
    slug?: string;
    student_name?: string;
    cert_link?: string;
    cert_title?: string;
    cred_id?: number;
}

interface IState {
    data: IData;
}

const VisionCertificate = () => {
    const defaultState = {
        data: {},
    };

    const [state, setState] = useState<IState>(defaultState);

    useEffect(() => {
        const config = {
            headers: {
                Authorization: __getCookie(keys.cookiePrefix + "ut").cookieValue,
            },
            params: {
                slug: window.location.pathname.split("vision/certificate/")[1].split("/")[0],
            },
        };
        axios.get(G_API_URL + `vision/data/`, config).then((res: AxiosResponse) => {
            let response = res.data;
            setState((prev) => ({
                ...prev,
                data: response.data,
            }));
        });
    }, []);

    const { data } = state;
    return (
        <>
            <Certificate data={data} fromPage="certificate" />
            <style jsx>{`
                #root {
                    margin-top: 32px;
                }
            `}</style>
        </>
    );
};

export default VisionCertificate;
