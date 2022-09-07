import React, {useEffect} from "react";
import axios from "axios";
import {G_API_URL, G_URL} from "../../constants/constants";

const ShortLinkRedirect = (props: any) => {
    useEffect(() => {
        const path = window.location.pathname;

        if (path.includes('resc') || path.includes('book')) {
            let programType = path.split("/")[2] === 'm' ? 'microdegree' :'bootcamp';
            window.location.href = G_URL + "vision/booking/" + programType;
        }

        if (path.includes('/m/') || path.includes('/p/') || path.includes('/r/') || path.includes('/c/')) {
            console.log(props.match.params.uid)
            axios.get(G_API_URL + "vision/redirector/", {
                params: {
                    uid: props.match.params.uid,
                    slug: path.split("/")[1]
                }
            }).then(res => {
                window.location.href = (res.data.status === 1) ? res.data.data : G_URL;
            })

        }

    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <>
            <style jsx>
                {`
               `}
            </style>

        </>
    );
};

export default ShortLinkRedirect;
