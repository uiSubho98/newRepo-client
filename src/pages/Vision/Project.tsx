import React, { useEffect, useState } from "react";
import ProjectEngagementSection from "../../components/Vision/ProjectEngagementSection";
import axios, { AxiosResponse } from "axios";
import { G_API_URL } from "../../constants/constants";
import { __getToken } from "../../utils/user-details.util";
import { isMobile } from "react-device-detect";

interface IState {}

const Project = () => {
    const defaultState = {};

    const [state, setState] = useState<any>(defaultState);

    useEffect(() => {
        const config = {
            headers: {
                Authorization: __getToken(),
            },
            params: {
                slug: window.location.pathname.split("vision/project/")[1].split("/")[0],
            },
        };
        axios.get(G_API_URL + `vision/data/`, config).then((res: AxiosResponse) => {
            let response = res.data;
            if (response.status === 1) {
                setState({
                    ...response.data,
                });
            }
        });
    }, []);

    let program = state.gg === 1 ? "microdegree" : "bootcamp";

    return (
        <>
            <div className="vision-project-wrapper">
                <div className="f-d f-vt f-v-c left-pane ">
                    {/* <h1 className="h1-heading">Guess The Number</h1> */}
                    <iframe
                        title="Guess The Number"
                        id="project-block"
                        src={state.project}
                        frameBorder="0"
                        height={!isMobile ? "100%" : "350px"}
                        width="100%"
                    ></iframe>
                </div>
                <div className="right-pane lr-pad-d lr-pad-m">
                    <ProjectEngagementSection student_name={state.student_name} program={program} />
                </div>
            </div>
            <style jsx>{`
                #root {
                    margin: 0;
                }

                .vision-project-wrapper {
                    min-height: 100vh;
                }

                .left-pane .h1-heading {
                    color: var(--dove);
                    margin-bottom: 16px;
                }

                .vision-project-wrapper .left-pane {
                    padding: 0;
                    background-color: var(--crow);
                    height: 84vh;
                }

                .vision-project-wrapper .right-pane {
                    background-color: #212121;
                }

                .vision-project-wrapper .right-pane #made-with-love {
                    color: var(--dove);
                }

                @media only screen and (max-device-width: 760px) {
                    .vision-project-wrapper .left-pane {
                        height: unset;
                        padding-right: 0;
                        padding-left: 0;
                    }

                    .vision-project-wrapper .right-pane {
                        padding: var(--peaky-pad-32) 0;
                    }
                }
            `}</style>
        </>
    );
};

export default Project;
