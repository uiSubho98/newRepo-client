import React, { useEffect, useState } from "react";
import MemeEngagementSection from "../../components/Vision/MemeEngagementSection";
import axios, { AxiosResponse } from "axios";
import { G_API_URL } from "../../constants/constants";
import { __getToken, __getUID } from "../../utils/user-details.util";
import Spinner from "../../components/Spinner/spinner";

const Project = () => {

    const defaultState = {
    }

    const [state, setState] = useState<any>(defaultState);
    const [isLoading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const config = {
            headers: {
                "Authorization": __getToken()
            },
            params: {
                slug: window.location.pathname.split('vision/meme/')[1].split("/")[0],
            }
        };
        setLoading(true);
        axios.get(G_API_URL + `vision/data/`, config)
        .then((res: AxiosResponse) => {
            let response = res.data;
            if(response.status === 1) {
                setState({
                    ...response.data
                });
            }
            setLoading(false);
        });
    }, []);

    let program = state.gg === 1 ? "microdegree" : "bootcamp";
    let uid = __getUID();

    let isNewUser = true;
    if(state.slug && parseInt(state.slug.split("-")[1]) === uid) {
        isNewUser = false;
    }

    return (
        <>
        {
            !isLoading ?
            <>
                <div className="g-d g-col-b-s g-col-1-m vision-project-wrapper">
                    <div className="f-d f-vt f-v-c left-pane">

                        <h1 className="text-c-d">A Meme about { isNewUser ? state.student_name : "your"} Momentum</h1>
                        <img 
                            src={ "https://cdn.prograd.org/Memes/" + state.slug + ".png" } 
                            alt={""} 
                            className="meme-img"
                        />
                        <div className='view-project-btn default-purple-btn filled-purple'
                        onClick={() => window.open(state.project, "_blank")}>
                            View Project
                        </div>
                        
                    </div>
                    <div className="f-d f-vt f-v-c f-h-c right-pane">
                        <MemeEngagementSection student_name={state.student_name} program={program} />
                    </div>
                </div>
                <style jsx>{`
                    #root {
                        margin: 0;
                    }

                    .vision-project-wrapper {
                        min-height: 100vh;
                    }

                    .vision-project-wrapper .left-pane {
                        padding: var(--peaky-pad-48);
                        background-color: #f0f0f0;
                    }

                    .vision-project-wrapper .right-pane {
                        background-color: #212121;
                    }

                    .vision-project-wrapper .right-pane #made-with-love {
                        color: var(--dove);
                    }

                    .vision-project-wrapper .left-pane .meme-img {
                        margin: var(--peaky-gap-32) 0 0;
                        width: 95%;
                    }

                    .vision-project-wrapper .left-pane .view-project-btn {
                        margin: var(--peaky-gap-48) 0 0;
                    }

                    @media only screen and (max-device-width: 760px) {
                        .vision-project-wrapper .left-pane {
                            padding-right: 0;
                            padding-left: 0;
                        }

                        .vision-project-wrapper .right-pane {
                            padding: var(--peaky-pad-32) 0;
                        }
                    }
                `}</style>
            </> : 
            <Spinner />
        }
        </>
    )
}

export default Project;