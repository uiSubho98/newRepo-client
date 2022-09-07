import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isMobile } from "react-device-detect";
import switchDevice from '../../assets/imgs/switch-device.svg';
import EditorBlock from '../../components/PlayGround/EditorBlock';
import ResultViewer from '../../components/PlayGround/ResultViewer';
import ConsoleBlock from '../../components/PlayGround/ConsoleBlock';
import Sidebar from '../../components/PlayGround/Sidebar';
import { Resizable } from "re-resizable";
import { check_login } from '../../utils/login.util';
import { getRandomString } from '../../utils/common.util';
import axios from "axios";
import { G_URL, G_API_URL } from '../../constants/constants';
import keys from '../../config/keys';
import { __getCookie } from "../../utils/cookie.util";
import InitLoader from '../../components/PlayGround/InitLoader';
import { decodeToken } from '../../utils/user-details.util';
import { RouteComponentProps } from 'react-router';
import { IPlayground, IProject } from '../../components/PlayGround/playground';

// Default Playground Code Snippet
// To escape eslint
const rTabs = (str: string) => str.trim().replace(/^ {4}/gm, "");
const exampleCode = {
    js: rTabs(`
    // Add comments to explain what it does
    const example = "Hello, from the JS world!";
    console.log(example);
    `),
    html: rTabs(`
    <!-- Add body content here -->
    <h1 class="title">Hello there!</h1>
    <p class="description">Let's create something cool!</p>
    `),
    css: rTabs(`
    * {
        padding: 0;
        margin: 0;
    }
    body {
        padding: 16px;
    }
    `)
}

interface MatchParams {
    pid: string
}

interface IPlayGroundProps extends RouteComponentProps<MatchParams> {
}

interface IState {
    isLoggedIn: boolean
    playgroundLoading: boolean
    invalidPlayground: boolean
    urlPid: string
    tempCount: number
    activeProject: number
    sidebarActive: boolean
    projectsData: Array<IProject>
    playgroundData: IPlayground
    viewerType: string
    sandboxHistory: Array<{text: string}>
    consoleStatus: boolean
    htmlCode: string
    cssCode: string
    jsCode: string
    isCodeExecuted: boolean
    pg_ads: any
    linkedUrl: string
}

const PlayGround = (props: IPlayGroundProps) => {
    const [state, setState] = useState<IState>({
        isLoggedIn: check_login(),
        playgroundLoading: true,
        invalidPlayground: false,
        urlPid: 'new',
        tempCount: 0,
        activeProject: 0,
        sidebarActive: true,
        projectsData: [],
        playgroundData: {},
        viewerType: '',
        sandboxHistory: [],
        consoleStatus: false,
        htmlCode: exampleCode.html,
        cssCode: exampleCode.css,
        jsCode: exampleCode.js,
        isCodeExecuted: false,
        pg_ads: [],
        linkedUrl: ''
    })

    const dispatch = useDispatch();
    const forkDataStore = useSelector((state: any)=> state.forkData);
    const tempPlaygrounds = useSelector((state: any)=> state.tempPlaygrounds);

    let loginStatus = check_login();
    const { pid } = props.match.params;

    const getProjects = async (pid: string) => {
        const config = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": state.isLoggedIn ? __getCookie(keys.cookiePrefix + "ut").cookieValue : ''
            }
        };

        await axios
            .get(G_API_URL + `playground?pid=${pid}`, config)
            .then((res) => {
                const { status, response } = res.data;
                if (status === 1) {
                    // Check if playground is null for the user
                    if (response.playground !== null) {
                        const resPlayground = response.playground;
                        // Get playground code
                        const { html, css, js } = resPlayground.code;
                        setState(prev => ({
                            ...prev,
                            projectsData: [...response['side_links']],
                            playgroundData: response.playground,
                            viewerType: response.requestType,
                            htmlCode: html,
                            cssCode: css,
                            jsCode: js,
                            playgroundLoading: false,
                            pg_ads: response.pg_ads,
                            linkedUrl: resPlayground['linkedUrl'] !== undefined ? resPlayground['linkedUrl'] : ''
                        }));
                    } else {
                        // Check if its a temp playground
                        const checkPID = `${pid}`.split('-')[0];
                        if (checkPID === 'temp') {
                            // Get data from redux store
                            var selectedPlayground:IPlayground = Object.keys(tempPlaygrounds).length > 0 && tempPlaygrounds[pid];

                            // Check if data exists
                            if (selectedPlayground !== undefined) {

                                // Create temProjectsData
                                var temProjectsData = Array<IProject>();
                                Object.values(tempPlaygrounds).forEach((entry: any) => {
                                    if (entry['pid'] !== pid) {
                                        temProjectsData.push({
                                            pg_name: entry['pg_name'],
                                            pid: entry['pid']
                                        });
                                    }
                                });
                                temProjectsData = [
                                    {
                                        pg_name: selectedPlayground.pg_name ?? '',
                                        pid: selectedPlayground.pid ?? ''
                                    },
                                    ...temProjectsData
                                ];

                                const { html, css, js } = selectedPlayground.code ?? {html: '', css: '', js: ''};
                                // Update active project data
                                setState(prev => ({
                                    ...prev,
                                    playgroundData: selectedPlayground,
                                    projectsData: [
                                        ...temProjectsData,
                                        ...response['side_links']
                                    ],
                                    viewerType: 'author',
                                    htmlCode: html,
                                    cssCode: css,
                                    jsCode: js,
                                    activeProject: 0,
                                    playgroundLoading: false,
                                    pg_ads: response.pg_ads,
                                    linkedUrl: selectedPlayground['linkedUrl'] !== undefined ? selectedPlayground['linkedUrl'] : ''
                                }));
                            } else {
                                // Set Invalid playground
                                setState(prev => ({
                                    ...prev,
                                    playgroundLoading: false,
                                    invalidPlayground: true
                                }));
                            }
                        } else {
                            if (pid === 'new') {
                                setState(prev => ({
                                    ...prev,
                                    pg_ads: response.pg_ads
                                }));
                                // Create temp playground
                                createNewPlayground('newInit', response);
                            } else {
                                // Set Invalid playground
                                setState(prev => ({
                                    ...prev,
                                    playgroundLoading: false,
                                    invalidPlayground: true
                                }));
                            }
                        }
                    }
                }
            })
            .catch((err) => {
            });
    }

    useEffect(() => {
        if (loginStatus) {
            let decodedToken = decodeToken();
            // Store Decoded Token Data
            setState(prev => ({...prev, decodedToken}));
        }

        // Check for pid in url Params
        setState(prev => ({...prev, urlPid: pid}));

        // Get Projects
        getProjects(pid);
    },[loginStatus, pid]);   // eslint-disable-line react-hooks/exhaustive-deps

    const prependProject = (newProject: IProject, projectArray: Array<IProject>) => {
        let newArray = projectArray.slice();
        newArray.unshift(newProject);
        return newArray;
    }

    const updateTempCount = (tempCount: number) => {
        setState(prev => ({...prev, tempCount}));
    }

    // Create new temp playground - also check other projects created by user
    const createNewPlayground = (mode: string, response?: {author: {email: string, name: string}, playground: null, requestType: string, side_links: Array<IProject>}) => {
        // Update tempCount
        const { tempCount } = state;

        let projectsData = Array<IProject>();
        if (mode === 'newInit') {
            projectsData = (response && [...response['side_links']]) ?? [];
        } else {
            projectsData = state.projectsData;
        }
        const id = getRandomString(6);
        // Create a temp sandbox ID
        sessionStorage.setItem('pj-sandboxId', id);
        // Create temp playground
        const tempPid = `temp-${id}`;
        const tempTime = parseInt((new Date().getTime() / 1000).toString());

        let tempProjectsData = {
            pid: tempPid,
            pg_name: 'Untitled'
        }

        let tempPlaygroundData = {
            code: {
                html: exampleCode['html'],
                css: exampleCode['css'],
                js: exampleCode['js']
            },
            last_modified: tempTime,
            pg_name: 'Untitled',
            pid: tempPid,
            uid: undefined,
            linkedUrl: ''
        }

        // Check Fork ID in storage if exists check for data in store
        const forkID = localStorage.getItem('fork-id');
        if (forkID !== undefined && forkID !== null && forkID !== '') {
            let selectFork: IPlayground = Object.keys(forkDataStore).length > 0 && forkDataStore[forkID];
            if (selectFork !== undefined) {
                // Modify tempProjectsData and tempPlaygroundData with forkData
                const cloneName = `Copy of ${selectFork['pg_name']}`;
                tempProjectsData['pg_name'] = cloneName;
                // Update code
                tempPlaygroundData['code'] = {
                    html: selectFork['code']!['html'],
                    css: selectFork['code']!['css'],
                    js: selectFork['code']!['js']
                }
                // Update name
                tempPlaygroundData['pg_name'] = cloneName;

                // Update LinkedUrl
                tempPlaygroundData['linkedUrl'] = selectFork['linkedUrl'] !== undefined ? selectFork['linkedUrl'] : '';

                // Update htmlCode, cssCode and jsCode
                setState(prev => ({
                    ...prev,
                    htmlCode: selectFork['code']!['html'],
                    cssCode: selectFork['code']!['css'],
                    jsCode: selectFork['code']!['js']
                }));
                // TODO: Delete forkData from Store and also clear fork id from localStorage
                dispatch({ type: 'DELETE_FORK', payload: forkID })
                localStorage.removeItem('fork-id');
            }
        }

        // Update/Prepend projects data with new Project
        projectsData = prependProject(tempProjectsData, projectsData);

        // Store temp playground in the store
        dispatch({type: 'ADD_TEMP_PG', payload: { ...tempPlaygroundData }});

        // Set State with temp data
        setState(prev => ({
            ...prev,
            playgroundData: tempPlaygroundData,
            projectsData,
            linkedUrl: tempPlaygroundData['linkedUrl'] !== undefined ? tempPlaygroundData['linkedUrl'] : '',
            viewerType: 'author',
            playgroundLoading: false,
            activeProject: 0,
            tempCount: tempCount + 1
        }));

        // If its not newInit, then user is creating new playground manually
        // So update url with temp id

        if (mode !== 'newInit') {
            updateUrl(tempPid);
            // Update htmlCode, cssCode and jsCode
            setState(prev => ({
                ...prev,
                htmlCode: exampleCode.html,
                cssCode: exampleCode.css,
                jsCode: exampleCode.js,
                linkedUrl: ''
            }));
        }
    }

    const updateUrl = (pid: string) => {
        var newUrl = '/playground/' + pid;
        window.history.pushState('data', 'Title', newUrl);
        // document.title = title;
    }

    const setActiveProject = async (activeProject: number, pid: string) => {
        let checkPID = `${pid}`.split('-')[0];
        // Get playground data by PID
        const config = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": __getCookie(keys.cookiePrefix + "ut").cookieValue
            }
        };

        // Check if its temp playground
        if (checkPID === 'temp') {
            // Get data from redux store
            const selectPlayground = tempPlaygrounds[pid];
            const { html, css, js } = selectPlayground.code;
            const linkUrl = selectPlayground['linkedUrl'];
            // Update active project data
            setState(prev => ({
                ...prev,
                playgroundData: selectPlayground,
                viewerType: 'author',
                htmlCode: html,
                cssCode: css,
                jsCode: js,
                linkedUrl: linkUrl !== undefined ? linkUrl : '',
                activeProject,
                sandboxHistory: []
            }));
            // Update url
            updateUrl(pid);
        } else {
            await axios
                .get(G_API_URL + `playground/?pid=${pid}`, config)
                .then((res) => {
                    const { status, response } = res.data;
                    if (status === 1) {
                        const { html, css, js } = response.playground.code;
                        const linkUrl = response.playground['linkedUrl'];
                        // Update active project data
                        setState(prev => ({
                            ...prev,
                            playgroundData: response.playground,
                            viewerType: response.requestType,
                            htmlCode: html,
                            cssCode: css,
                            jsCode: js,
                            linkedUrl: linkUrl !== undefined ? linkUrl : '',
                            activeProject,
                            sandboxHistory: []
                        }));
                        // Update url
                        updateUrl(pid);
                    }
                })
                .catch((err) => {
                });
        }
    }

    const setSidebarActive = (sidebarActive: boolean) => {
        setState(prev => ({...prev, sidebarActive}));
    }

    const updateProjectsData = (key: string, mode: string, pg_name_new?: string, newPID?: string) => {
        // After delete or rename API call response
        // update the state instead of window reload for better UX
        let { projectsData } = state;
        let selectProject = Object.entries(projectsData).filter((k: [string, IProject]) => k[1].pid === key)

        if (mode === 'delete') {
            projectsData.splice(parseInt(selectProject[0][0]), 1);
            setState(prev => ({...prev, projectsData}));

            // Get first project from projectsData
            let firstKey = 0;
            let firstProject;
            Object.keys(projectsData).forEach((val, index) => {
                if (index === 0) {
                    firstKey = index;
                    firstProject = projectsData[index];
                }
            });
            if (firstProject !== undefined) {
                setActiveProject(firstKey, firstProject['pid']);
            }

            // If its temp playground and delete playground from store
            const checkPID = `${key}`.split('-')[0];
            if (checkPID === 'temp') {
                dispatch({ type: 'DELETE_PG', payload: key })
            }

        } else if (mode === 'rename') {
            // If its temp playground update name in redux also
            const checkPID = `${key}`.split('-')[0];
            if (checkPID === 'temp') {
                projectsData[parseInt(selectProject[0][0])].pg_name = pg_name_new ?? '';
                // Also update store
                // Get data from redux store
                let selectPlayground = tempPlaygrounds[key];

                if (selectPlayground !== undefined) {
                    selectPlayground['pg_name'] = pg_name_new;
                    dispatch({type: 'ADD_TEMP_PG', payload: { ...selectPlayground }});
                }
            } else {
                projectsData[parseInt(selectProject[0][0])].pg_name = pg_name_new ?? '';
            }
            setState(prev => ({...prev, projectsData}));
        } else if (mode === 'update-pid') {
            // First update selected project pid with newPID
            projectsData[parseInt(selectProject[0][0])].pid = newPID ?? '';
            // Update state
            setState(prev => ({...prev, projectsData}));
        }
    }

    const addHistory = (text: string) => {
        const newHistory = [...state.sandboxHistory, { text }];
        setState(prev => ({...prev, sandboxHistory: newHistory}));
    }

    const clearSandboxHistory = () => {
        setState(prev => ({...prev, sandboxHistory: []}));
    }

    const handleConsoleStatus = (consoleStatus: boolean) => {
        setState(prev => ({...prev, consoleStatus}));
    }

    const updateStoreCode = (tab: number, code: {html: string, css: string, js: string} | string) => {
        // Check if its temp playground then update code in the redux store
        const { activeProject, projectsData } = state;
        const { pid } = projectsData[activeProject];
        const checkPID = `${pid}`.split('-')[0];

        if (checkPID === 'temp') {

            // Get data from redux store
            let selectPlayground = tempPlaygrounds[pid];

            if (tab === 0) {
                selectPlayground['code']['html'] = code;
            } else if (tab === 1) {
                selectPlayground['code']['css'] = code;
            } else if (tab === 2) {
                selectPlayground['code']['js'] = code;
            }

            // Update redux store
            dispatch({type: 'ADD_TEMP_PG', payload: { ...selectPlayground }});

        }
    }

    const updatePlaygroundData = (tab: number, code: string) => {
        let { playgroundData } = state;
        if (tab === 0) {
            playgroundData['code']!['html'] = code;
        } else if (tab === 1) {
            playgroundData['code']!['css'] = code;
        } else if (tab === 2) {
            playgroundData['code']!['js'] = code;
        }
        // Update playgroundData in state
        setState(prev => ({...prev, playgroundData}));
    }

    const updateCode = (activeTab: number, value: string) => {
        switch (activeTab) {
            case 0:
                setState(prev => ({...prev, htmlCode: value}));
                updateStoreCode(0, value);
                updatePlaygroundData(0, value);
                break;
            case 1:
                setState(prev => ({...prev, cssCode: value}));
                updateStoreCode(1, value);
                updatePlaygroundData(1, value);
                break;
            case 2:
                setState(prev => ({...prev, jsCode: value}));
                updateStoreCode(2, value);
                updatePlaygroundData(2, value);
                break;
            default:
                return;
        }

    }

    const updateIsCodeExecuted = (isCodeExecuted: boolean, mode: string) => {
        setState(prev => ({...prev, isCodeExecuted}));

        // Update linkedUrl in state and store
        if (mode === 'link-update') {
            let { playgroundData, linkedUrl } = state;
            playgroundData['linkedUrl'] = linkedUrl;
            setState(prev => ({...prev, playgroundData}));

            // Check if its temp playground then update code in the redux store
            const { activeProject, projectsData } = state;
            const { pid } = projectsData[activeProject];
            const checkPID = `${pid}`.split('-')[0];

            if (checkPID === 'temp') {

                // Get data from redux store
                let selectPlayground = tempPlaygrounds[pid];

                selectPlayground['linkedUrl'] = linkedUrl;

                // Update redux store
                dispatch({type: 'ADD_TEMP_PG', payload: { ...selectPlayground }});

            }
        }
    }

    const updateLinkedUrl = (linkedUrl: string) => {
        // Linked URL - External CSS linking
        setState(prev => ({...prev, linkedUrl}));
    }

    const {
        isLoggedIn,
        playgroundLoading,
        invalidPlayground,
        tempCount,
        activeProject,
        sidebarActive,
        projectsData,
        playgroundData,
        linkedUrl,
        viewerType,
        sandboxHistory,
        consoleStatus,
        htmlCode,
        cssCode,
        jsCode,
        isCodeExecuted
    } = state;

    return (
        <>
            <div className="playground-page-container f-d">
                {!playgroundLoading ?
                    !invalidPlayground ?
                        !isMobile ?
                            <>
                                <Sidebar
                                    isLoggedIn={isLoggedIn}
                                    tempCount={tempCount}
                                    updateTempCount={updateTempCount}
                                    activeProject={activeProject}
                                    setActiveProject={setActiveProject}
                                    sidebarActive={sidebarActive}
                                    projectsData={projectsData}
                                    updateProjectsData={updateProjectsData}
                                    createNewPlayground={createNewPlayground}
                                    viewerType={viewerType}
                                />
                                <div className={`main-layout-container ${!sidebarActive ? 'active' : ''}`}>
                                    <Resizable
                                        className="editor-main-container"
                                        bounds={'parent'}
                                        defaultSize={{
                                            height: 400,
                                            width: 'auto'
                                        }}
                                        enable={{
                                            top: false,
                                            right: false,
                                            left: false,
                                            bottom: true
                                        }}
                                        maxHeight={600}
                                    >
                                        <EditorBlock
                                            isLoggedIn={isLoggedIn}
                                            activeProject={activeProject}
                                            sidebarActive={sidebarActive}
                                            setSidebarActive={setSidebarActive}
                                            playgroundData={playgroundData}
                                            linkedUrl={linkedUrl}
                                            updateLinkedUrl={updateLinkedUrl}
                                            projectsData={projectsData}
                                            updateProjectsData={updateProjectsData}
                                            viewerType={viewerType}
                                            htmlCode={htmlCode}
                                            cssCode={cssCode}
                                            jsCode={jsCode}
                                            updateCode={updateCode}
                                            updateIsCodeExecuted={updateIsCodeExecuted}
                                            updateUrl={updateUrl}
                                            clearHistory={clearSandboxHistory}
                                        />
                                    </Resizable>
                                    {projectsData.length > 0 &&
                                        <>
                                            <div className="editor-secondary-container">
                                                <div className="editor-result-container">
                                                    <div className="section-header f-d f-v-c f-h-sb">
                                                        <div className="title">Result</div>
                                                        <div
                                                            className="section-action-btn c-pointer f-d f-v-c f-h-c"
                                                            onClick={() => {
                                                                window.open(G_URL + 'playground/view/' + playgroundData['pid'], '_blank')
                                                            }}
                                                        >
                                                            <i className="icon icon-maximize"></i>
                                                        </div>
                                                    </div>
                                                    <ResultViewer
                                                        html={htmlCode}
                                                        css={cssCode}
                                                        js={jsCode}
                                                        linkedUrl={linkedUrl}
                                                        addHistory={addHistory}
                                                        isCodeExecuted={isCodeExecuted}
                                                        updateIsCodeExecuted={updateIsCodeExecuted}
                                                        fromPage="playground"
                                                    />
                                                </div>
                                            </div>
                                            <ConsoleBlock
                                                history={sandboxHistory}
                                                clearHistory={clearSandboxHistory}
                                                sidebarActive={sidebarActive}
                                                consoleStatus={consoleStatus}
                                                handleConsoleStatus={handleConsoleStatus}
                                            />
                                        </>
                                    }
                                </div>
                            </>
                            :
                            <div className="switch-device-container f-d f-vt f-v-c f-h-c w-100 lr-pad-m">
                                <div
                                    className="switch-image bg-image-full"
                                    style={{ backgroundImage: `url(${switchDevice})` }}
                                ></div>
                                <div className="desc body-regular">
                                    Please switch to a laptop/PC to access the playground.
                                </div>
                                <a className="go-home-btn default-purple-btn filled-purple" href="/">Home</a>
                            </div>
                        :
                        <div className="invalid-playground-container f-d f-vt f-v-c f-h-c">
                            <h1 className="title h1-heading">404</h1>
                            <div className="desc body-regular">
                                We're sorry but looks like this playground does not exist.
                                Either it has been deleted or the link is incorrect!
                            </div>
                            <a className="go-to-home default-purple-btn filled-purple" href={G_URL+'playground'}>Playground</a>
                        </div>
                    :
                    <div className="page-loader f-d f-v-c f-h-c w-100">
                        <InitLoader />
                    </div>
                }
            </div>

            <style jsx>
                {`
                    #root {
                        margin: 0;
                    }

                    .playground-page-container {
                        background-color: #1a1a1a;
                        height: 100vh;
                        overflow: hidden;
                    }

                    .editor-secondary-container {
                        position: relative;
                        height: 100%;
                        flex-grow: 1;
                    }

                    .editor-secondary-container .editor-result-container {
                        height: calc(100% - 94px);
                        width: 100%;
                        position: relative;
                    }

                    .editor-result-container .iframe-container {
                        position: relative;
                        flex-grow: 1;
                        overflow: hidden;
                    }

                    .playground-console-container, .editor-result-container {
                        border-top: solid 1px rgba(255, 255, 255, 0.38);
                    }

                    .editor-secondary-container .section-header,
                    .playground-console-container .section-header {
                        height: 46px;
                        font-family: 'Open Sans', sans-serif;
                        text-transform: uppercase;
                        padding: 0 1rem;
                        color: var(--dove);
                        background: #212121;
                    }

                    .editor-secondary-container .section-action-btn,
                    .playground-console-container .section-action-btn {
                        width: 24px;
                        height: 24px;
                        border-radius: var(--peaky-br-4);
                        background: rgba(0, 0, 0, 0);
                        transition: all 0.2s;
                    }

                    .editor-secondary-container .section-action-btn:hover,
                    .playground-console-container .section-action-btn:hover {
                        background: rgba(0, 0, 0, 1);
                    }

                    .switch-device-container .switch-image {
                        width: 200px;
                        height: 200px;
                    }

                    .switch-device-container .desc {
                        color: var(--dove) !important;
                        text-align: center;
                    }

                    .switch-device-container .go-home-btn {
                        padding: 0 2rem;
                        margin-top: 2rem;
                    }

                    .invalid-playground-container {
                        height: 100vh;
                        width: 100vw;
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
                `}
            </style>
        </>
    );
}

export default PlayGround;
