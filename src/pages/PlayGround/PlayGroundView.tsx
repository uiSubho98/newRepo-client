import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import {saveFork} from '../../actions';
import forkIcon from '../../assets/icons/svg-icons-v2/playground-fork.svg';
import ResultViewer from '../../components/PlayGround/ResultViewer';
import axios from "axios";
import { G_URL, G_API_URL } from '../../constants/constants';
import keys from '../../config/keys';
import { check_login } from '../../utils/login.util';
import { __getCookie } from "../../utils/cookie.util";
import { IPlayground } from '../../components/PlayGround/playground.d';

interface IPlaygroundViewState {
    viewLoading: boolean,
    loginStatus: boolean,
    invalidPlayground: boolean,
    playgroundData: IPlayground,
    linkedUrl: string,
    authorData: {
        email: string
        name: string
    },
    viewerType: string,
    tempPlaygrounds: any
}

const PlayGroundView = () => {

    const [state, setState] = useState<IPlaygroundViewState>({
        viewLoading: true,
        loginStatus: check_login(),
        invalidPlayground: false,
        playgroundData: {},
        linkedUrl: '',
        authorData: {
            email: '',
            name: ''
        },
        viewerType: '',
        tempPlaygrounds: []
    });

    const tempPlaygroundsData = useSelector((state: IPlaygroundViewState) => state.tempPlaygrounds);
    const dispatch = useDispatch();

    // Get PID from url Params
    const { pid } = useParams<{pid: string}>();

    useEffect(() => {
        const fetchPlayground = () => {

            const config = {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": state.loginStatus ? __getCookie(keys.cookiePrefix + "ut").cookieValue : ''
                }
            };
    
            axios
                .get(G_API_URL + `playground/?pid=${pid}`, config)
                .then((res) => {
                    const { status, response } = res.data;
                    if (status === 1 && response.playground !== null) {
                        const resPlayground = response.playground;
                        setState(prev => ({
                            ...prev,
                            playgroundData: response.playground,
                            linkedUrl: resPlayground['linkedUrl'] !== undefined ? resPlayground['linkedUrl'] : '',
                            authorData: response.author,
                            viewerType: response.requestType,
                            viewLoading: false
                        }));
                    } else {
                        // Check redux for playground data
                        var selectPlayground:IPlayground = Object.keys(tempPlaygroundsData).length > 0 && tempPlaygroundsData[pid];
                        if (selectPlayground !== undefined) {
                            setState(prev => ({
                                ...prev,
                                playgroundData: selectPlayground,
                                linkedUrl: selectPlayground['linkedUrl'] !== undefined ? selectPlayground['linkedUrl'] : '',
                                viewerType: 'author',
                                viewLoading: false
                            }));
                        } else {
                            setState(prev => ({
                                ...prev,
                                invalidPlayground: true,
                                viewLoading: false
                            }));
                        }
                    }
                })
                .catch((err) => {});
        }
        fetchPlayground();
    }, [state.loginStatus, pid, tempPlaygroundsData])

    const handleForking = () => {
        // Store PID, to Fork
        localStorage.setItem('fork-id', pid);

        // Construct fork data
        const {playgroundData} = state;
        const tempForkData = {
            code: {
                html: playgroundData['code'] && playgroundData['code']['html'],
                css: playgroundData['code'] && playgroundData['code']['css'],
                js: playgroundData['code'] && playgroundData['code']['js']
            },
            last_modified: playgroundData['last_modified'],
            pg_name: playgroundData['pg_name'],
            pid: playgroundData['pid'],
            uid: null
        }

        // Store fork data in Redux
        dispatch(saveFork(tempForkData));

        // Small delay for redirection
        setTimeout(() => {
            window.location.href = `${G_URL}playground/new`;
        }, 200);
    }

    return (
        <>
            {!state.viewLoading ?
                !state.invalidPlayground ?
                <>
                    {state.viewerType === 'visitor' && state.authorData.name !== '' &&
                        <div className="playground-page-header f-d f-v-c">
                            <div className="title f-d f-v-c">JS Playground</div>
                            <div className="author-info">
                                <div className="playground-name">{state.playgroundData.pg_name}</div>
                                <div className="author-name">{`Playground by ${state.authorData.name}`}</div>
                            </div>
                            {state.viewerType === 'visitor' &&
                                <div
                                    className="playground-fork-btn action-menu f-d f-v-c c-pointer"
                                    onClick={() => handleForking()}
                                >
                                    <div
                                        className="fork-icon bg-image-full"
                                        style={{ backgroundImage: `url(${forkIcon})` }}>
                                    </div>
                                    Fork
                                </div>

                            }
                            {!state.loginStatus &&
                                <a
                                    className="login-btn c-pointer"
                                    href={G_URL+`login?rurl=playground/view/${pid}`}
                                >
                                    Log In
                                </a>
                            }
                        </div>
                    }
                    <ResultViewer
                        html={state.playgroundData.code && state.playgroundData.code['html']}
                        css={state.playgroundData.code && state.playgroundData.code['css']}
                        js={state.playgroundData.code && state.playgroundData.code['js']}
                        linkedUrl={state.linkedUrl}
                        addHistory={() => {}}
                        fromPage={'full-view'}
                        isCodeExecuted={true}
                        updateIsCodeExecuted={(val: boolean) => {}}
                    />
                </>
                :
                <div className="invalid-playground-container f-d f-vt f-v-c f-h-c">
                    <h1 className="title h1-heading">404</h1>
                    <div className="desc body-regular">
                        We're sorry looks like this playground does not exist.
                        Either it has been deleted or the link is incorrect!
                    </div>
                    <a className="go-to-home default-purple-btn filled-purple" href={G_URL+'playground'}>Playground</a>
                </div>
                :
                <div className="view-skeleton"></div>
            }
            
            <style jsx>
                {`
                    #root {
                        margin: 0;
                        height: 100vh;
                    }

                    .playground-page-header {
                        background: #212121;
                        color: var(--dove);
                        height: 64px;
                    }

                    .playground-page-header > .title {
                        height: inherit;
                        padding: 0 1rem;
                        background: #1e1e1e;
                        font-size: 18px;
                        font-weight: 300;
                    }

                    .playground-page-header a,
                    .playground-page-header .action-menu {
                        background: #1A1A1A;
                        color: var(--dove);
                        font-family: 'Open sans', sans-serif;
                        padding: 8px 14px;
                        margin-left: 1rem;
                        border-radius: var(--peaky-br-4);
                        transition: all 0.2s;
                    }

                    .playground-page-header a:hover,
                    .playground-page-header .action-menu:hover {
                        background: rgba(0, 0, 0,1);
                    }

                    .playground-page-header .author-info {
                        margin-left: 1rem;
                        margin-right: auto;
                    }

                    .playground-page-header .author-info .playground-name {
                        font-size: 18px;
                        font-weight: 500;
                        font-family: 'Open sans', sans-serif;
                    }

                    .playground-page-header .author-info .author-name {
                        font-family: 'Open sans', sans-serif;
                        color: rgba(255,255,255, 0.6);
                    }

                    .playground-page-header {
                        padding-right: 1rem;
                    }

                    .invalid-playground-container {
                        height: 100vh;
                        background: #1a1a1a;
                    }

                    .invalid-playground-container .title,
                    .invalid-playground-container .desc {
                        color: var(--dove) !important;
                        text-align: center;
                    }

                    .invalid-playground-container .desc {
                        width: 400px;
                        font-weight: 300;
                    }

                    .invalid-playground-container .go-to-home {
                        margin-top: 3rem;
                        padding: 0 2rem;
                    }

                    .playground-fork-btn .fork-icon {
                        width: 16px;
                        height: 16px;
                        margin-right: 6px;
                    }
                `}
            </style>
        </>
    );
}

export default PlayGroundView;