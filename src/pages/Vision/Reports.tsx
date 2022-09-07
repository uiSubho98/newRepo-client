import React, { useEffect, useState } from "react";
import { __getCookie } from "../../utils/cookie.util";
import keys from "../../config/keys";
import axios from "axios";
import { G_API_URL, G_HOME_URL } from "../../constants/constants";
import Hero from "../../components/Vision/Hero";
import PercentileBlock from "../../components/Vision/PerccentileBlock";
import ProgressBlock from "../../components/Vision/ProgressBlock";
import ShareBlock from "../../components/Vision/ShareBlock";
import BookingBlock from "../../components/Vision/BookingBlock";
import StickyBar from "../../components/Vision/StickyBar";
import ProgradVisionSVG from "../../assets/icons/svg-icons-v2/prograd_vision.svg";

interface IState {
    data: any;
}

const VisionReport = () => {
    const defaultState = {
        data: [],
    };

    const [state, setState] = useState<IState>(defaultState);

    useEffect(() => {
        const config = {
            headers: {
                Authorization: __getCookie(keys.cookiePrefix + "ut").cookieValue,
            },
            params: {
                slug: window.location.pathname.split("vision/report/")[1].split("/")[0],
            },
        };
        axios.get(G_API_URL + `vision/data/`, config).then((response) => {
            response = response.data;
            setState({
                data: response.data,
            });
        });
    }, []);

    const { data } = state;
    let profile = "";
    let program = data.gg === 1 ? "microdegree" : "bootcamp";
    if (data.profile_type !== undefined) {
        profile =
            parseInt(data.profile_type) === 1
                ? "Architect"
                : parseInt(data.profile_type) === 2
                ? "Commander"
                : "Explorer";
    }
    return (
        <>
            <div
                style={{ backgroundImage: "url(" + ProgradVisionSVG + ")" }}
                className="bg-image-full prograd-vision-logo c-pointer"
                onClick={() => (window.location.href = G_HOME_URL)}
            ></div>

            <div className="body-container">
                <Hero name={data.student_name} profile_type={data.profile_type} />
                <PercentileBlock name={data.student_name} ptile={data.ptile} />
                <ProgressBlock
                    cp_score={data.cp_marks}
                    c_score={data.c_marks}
                    dt_score={data.dt_marks}
                />

                {!window.location.pathname.includes("/share/") ? (
                    <ShareBlock
                        name={data.student_name}
                        msg={`I just took a 21st-century skills assessment by ProGrad. Happy to share that I'm ${
                            profile !== undefined &&
                            profile
                                .toString()
                                .toLowerCase()
                                .trim() === "commander"
                                ? "a"
                                : "an"
                        } ${profile} and belong to the top ${
                            data.ptile
                        }%ile of students. Here's the report - ${window.location.href +
                            "/share/"}.\n\nSign up for the FREE experience of ProGrad microdegree and get your personalised 21st-century skills assessment report - `}
                        w_url="https://bit.ly/3tYNhjA"
                        fb_url="https://bit.ly/3wmxlK2"
                        li_url=" https://bit.ly/2PcXrOW"
                        tw_url="https://bit.ly/3wdx7ob"
                        tw_msg={`I just took a 21st-century skills assessment by ProGrad. Happy to share that I'm ${
                            profile !== undefined &&
                            profile
                                .toString()
                                .toLowerCase()
                                .trim() === "commander"
                                ? "a"
                                : "an"
                        } ${profile} and belong to the top ${
                            data.ptile
                        }%ile of students. Here's the report - ${window.location.href +
                            "/share/"}.\n\nSign up for the FREE experience of ProGrad microdegree and get your personalised 21st-century skills assessment report - `}
                        fromPage="report"
                    />
                ) : (
                    <BookingBlock program={program} />
                )}
                <StickyBar
                    name={data.student_name}
                    ptile={data.ptile}
                    profile_type={data.profile_type}
                    gg={data.gg}
                />
            </div>
            <style jsx>
                {`
                    #root {
                        margin-top: unset;
                    }

                    .prograd-vision-logo {
                        margin-top: 32px;
                        height: 50px;
                    }

                    .body-container {
                        margin-bottom: 10rem;
                        padding-bottom: 20rem;
                    }

                    .body-container .lr-pad-d {
                        padding-right: 4rem;
                        padding-left: 4rem;
                    }

                    .body-container .tb-pad-d {
                        padding-top: 1rem;
                        padding-bottom: 1rem;
                    }

                    .body-container .ptile-block .right-container {
                        width: 50%;
                    }

                    .body-container .share-block,
                    .body-container .book-a-seat-block {
                        text-align: center;
                        color: var(--dove);
                        margin-top: 8rem;
                        background-color: var(--primary-bg);
                        padding-top: 4rem;
                        padding-bottom: 4rem;
                        font-weight: 500;
                    }

                    .body-container .share-block .title {
                    }

                    @media only screen and (max-device-width: 760px) {
                        .body-container .lr-pad-d {
                            padding-right: 1rem;
                            padding-left: 1rem;
                        }

                        .body-container .hero-container .left-container,
                        .body-container .ptile-block .right-container {
                            width: unset;
                        }

                        .body-container .share-block {
                            margin-top: 0;
                            padding: 2rem 1rem;
                            text-align: left;
                        }
                    }
                `}
            </style>
        </>
    );
};

export default VisionReport;
