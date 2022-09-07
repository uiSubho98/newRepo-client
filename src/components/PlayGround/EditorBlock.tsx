import React, { useState, useRef, useCallback, useEffect } from 'react';
import { message, Tooltip, Modal, Button } from 'antd';
import { useParams } from 'react-router';
import {useDispatch} from 'react-redux';
import {saveFork} from '../../actions';
import pgLogo from '../../assets/brand/prograd_playground.svg';
import pjLogoCut from '../../assets/brand/pg-logo-cut.svg';
import runCodeIcon from '../../assets/icons/svg-icons-v2/run-code.svg';
import forkIcon from '../../assets/icons/svg-icons-v2/playground-fork.svg';
import menuSwitchIcon from '../../assets/icons/svg-icons-v2/menu-switch.svg';
import FocusIcon from './LayoutIcons/FocusIcon';
import StandardIcon from './LayoutIcons/StandardIcon';
import InitLoader from './InitLoader';
import Editor from "@monaco-editor/react";
import { emmetHTML, emmetCSS } from "emmet-monaco-es";
import axios from "axios";
import { G_API_URL, G_URL } from '../../constants/constants';
import keys from '../../config/keys';
import { __getCookie } from "../../utils/cookie.util";
import { logout_user } from "../../utils/login.util";
import WarningIcon from './LayoutIcons/WarningIcon';
import { editor } from 'monaco-editor';

declare global {
    interface Window {
        monaco:any;
    }
}

interface IEditorBlockProps {
    isLoggedIn: any
    activeProject: any
    sidebarActive: any
    setSidebarActive: any
    playgroundData: any
    projectsData: any
    linkedUrl: any
    updateLinkedUrl: any
    updateProjectsData: any
    viewerType: any
    htmlCode: any
    cssCode: any
    jsCode: any
    updateCode: any
    updateIsCodeExecuted: any
    updateUrl: any
    clearHistory: any
}

const EditorBlock = (props: IEditorBlockProps) => {
    const {isLoggedIn, activeProject, sidebarActive, setSidebarActive, playgroundData, projectsData, linkedUrl, updateLinkedUrl, updateProjectsData, viewerType, htmlCode, cssCode, jsCode, updateCode, updateIsCodeExecuted, updateUrl, clearHistory} = props;
    const [activeTab, setActiveTab] = useState(0);
    // const [activeSecTab, setActiveSecTab] = useState(0);
    // eslint-disable-next-line
    const [isEditorReady, setIsEditorReady] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [activeLayout, setActiveLayout] = useState('standard');
    const [showLoginPop, setShowLoginPop] = useState(false);
    const [linkSaving, setLinkSaving] = useState(false);

    const tabs = ["html", "css", "javascript"];
    // const secTabs = ["RESULT VIEW", "CONSOLE"];

    const editorValueRef = useRef<editor.IStandaloneCodeEditor | null>(null);
    const htmlValueRef = useRef<editor.IStandaloneCodeEditor | null>(null);
    const cssValueRef = useRef<editor.IStandaloneCodeEditor | null>(null);
    const jsValueRef = useRef<editor.IStandaloneCodeEditor | null>(null);

    // Dispatch Hook
    const dispatch = useDispatch();

    // Wrapped inside callback to avoid re-render-multiple execution
    const handleOutsideClick = useCallback((e) => {
        e.preventDefault();
        const isActionClick = e.target.classList.contains('save-code-btn');
        if (!isActionClick && showLoginPop) {
            setShowLoginPop(!showLoginPop);
        }
    }, [showLoginPop]);

    useEffect(() => {
        window.addEventListener("click", handleOutsideClick);
        // Remove event handler after initial mount
        return () => {
            window.removeEventListener("click", handleOutsideClick);
        }
    }, [handleOutsideClick]);

    const renderTabs = () => {
        let tabElms = Array<React.ReactNode>();
        tabs.forEach((file, index) => {
            tabElms.push(
                <div
                    key={index}
                    className={`tab ${index} ${activeTab === index ? 'active' : ''}`}
                    onClick={() => onTabSwitch(index)}
                >
                    {file}
                </div>
            );
        })
        return tabElms;
    }

    // const renderSecondaryTabs = () => {
    //     let tabElms = [];
    //     secTabs.forEach((tab, index) => {
    //         tabElms.push(
    //             <div
    //                 key={index}
    //                 className={`tab ${index} ${activeSecTab === index ? 'active' : ''}`}
    //                 onClick={() => setActiveSecTab(index)}
    //             >
    //                 {tab}
    //             </div>
    //         )
    //     })
    //     return tabElms;
    // }

    const handleEditorDidMount = (editor: any, monaco: any, mode: number) => {
        emmetCSS(window.monaco);
        emmetHTML(window.monaco);
        setIsEditorReady(true);
        switch (mode) {
            case 1:
                htmlValueRef.current = editor;
                break;
            case 2:
                cssValueRef.current = editor;
                break;
            case 3:
                jsValueRef.current = editor;
                break;
            case 4:
                editorValueRef.current = editor;
                break;
            default:
                editorValueRef.current = editor;
        }
    }

    function handleEditorChange(value: any, e: any) {
        // auto update editor changes - For HTML and CSS only
        // Add auto update for JS also - TODO: Handle error, execution dependencies
        if (activeTab === 0) {
            // HTML Code
            updateIsCodeExecuted(true);
            updateCode(activeTab, value);
            clearHistory([]);
        } else if (activeTab === 1) {
            // CSS Code
            updateIsCodeExecuted(true);
            updateCode(activeTab, value);
            clearHistory([]);
        } else if (activeTab === 2) {
            // CSS Code
            updateIsCodeExecuted(true);
            updateCode(activeTab, value);
        }
        updateIsCodeExecuted(true);
        updateCode(activeTab, value);
    }

    const saveEditorState = () => {
        let value;
        if (activeLayout === 'standard') {
            switch (activeTab) {
                case 0:
                    value = htmlValueRef.current!.getValue();
                    break;
                case 1:
                    value = cssValueRef.current!.getValue();
                    break;
                case 2:
                    value = jsValueRef.current!.getValue();
                    break;
                default:
                    value = editorValueRef.current!.getValue();
            }
        } else {
            value = editorValueRef.current!.getValue();
        }
        updateIsCodeExecuted(true);
        updateCode(activeTab, value);
    }

    const executeCode = () => {
        saveEditorState();
    }

    const onTabSwitch = (index: number) => {
        setActiveTab(index)
        saveEditorState();
    }

    const saveCode = (mode?: string) => {
        // Update editor code in the state
        saveEditorState();

        // Make API call to save editor state
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": __getCookie(keys.cookiePrefix + "ut").cookieValue
            }
        };

        // Check if its a temp playground
        let pid = playgroundData.pid;
        const checkPID = `${pid}`.split('-')[0];

        if (checkPID === 'temp') {
            pid = undefined;
        }

        let data = {
            pid: pid,
            pg_name: playgroundData.pg_name,
            code: {
                html: htmlCode,
                css: cssCode,
                js: jsCode
            },
            linkedUrl: linkedUrl
        }

        if (mode === 'remove-link') {
            data['linkedUrl'] = '';
        }

        axios
            .post(G_API_URL + `playground/save`, JSON.stringify(data), config)
            .then((res) => {
                const { status, response } = res.data;
                if (status === 1) {
                    message.success(res.data.message);
                    // Check if its temp playground save/creation
                    if (checkPID === 'temp') {
                        // Get tempPID
                        const tempPID = playgroundData.pid;
                        updateUrl(response.pid);
                        updateProjectsData(tempPID, 'update-pid', undefined, response.pid);
                    }
                } else {
                    message.error(res.data.message);
                }
            })
            .catch((err) => {
                if (err.response) {
                    const errMsg = err.response.data !== undefined ? err.response.data.message : '';
                    message.error(`${errMsg !== '' ? errMsg : 'Something went wrong!'}`);
                }
            });
    }

    const handleLoginWarning = () => {
        setShowLoginPop(!showLoginPop);
    }

    const getRurl = () => {
        const pid = projectsData[activeProject].pid;
        const checkPID = `${pid}`.split('-')[0];
        if (checkPID === 'temp') {
            return `playground/${pid}`;
        } else {
            return window.location.pathname;
        }
    }

    const activeParams = useParams<{pid: string}>();

    const handleForking = () => {
        // Store PID, to Fork
        localStorage.setItem('fork-id', activeParams['pid']);

        const linkUrl = playgroundData['linkedUrl'] !== undefined ? playgroundData['linkedUrl'] : '';

        // Construct fork data
        const tempForkData = {
            code: {
                html: playgroundData['code']['html'],
                css: playgroundData['code']['css'],
                js: playgroundData['code']['js']
            },
            last_modified: playgroundData['last_modified'],
            pg_name: playgroundData['pg_name'],
            pid: playgroundData['pid'],
            linkedUrl: linkUrl,
            uid: null
        }

        // Store fork data in Redux
        dispatch(saveFork(tempForkData));

        // Small delay for redirection
        setTimeout(() => {
            window.location.href = `${G_URL}playground/new`;
        }, 200);
    }

    const linkPlayground = () => {
        // Link API
        
        const urlTrimmed = `${linkedUrl}`.trim();

        if (urlTrimmed !== undefined && urlTrimmed !== '') {

            const urlCheck = urlTrimmed.includes('playground') ? true : false;

            // Set Loading state
            setLinkSaving(true);

            if (urlCheck) {

                // Its a playground url, construct CSS api url and check playground exists
                let parsedUrl = new URL(urlTrimmed);
                let pathStr = parsedUrl.pathname;
                let pathPID = pathStr.substr(pathStr.lastIndexOf('/'));
                pathPID = (pathPID.length && pathPID[0] === '/') ? pathPID.slice(1) : pathPID;

                let apiUrl = G_API_URL + `playground/?pid=${pathPID}.css`;

                axios
                    .get(apiUrl)
                    .then((res) => {
                        const { status } = res;
                        if (status === 200) {
                            message.success('Playground link added successfully');
                            // Refresh ResultViewer Component to re-render with new linkedUrl
                            updateIsCodeExecuted(true, 'link-update');
                            // Set Loading state
                            setLinkSaving(false);

                            // Make save api call only if logged in
                            if (isLoggedIn) {
                                // Call playground save with linkedUrl
                                saveCode();
                            }
                            // Close pop up after save
                            setTimeout(() => {
                                setModalVisible(false);
                            }, 500);
                        }
                    })
                    .catch((err) => {
                        if (err.response) {
                            const errMsg = err.response.data !== undefined ? err.response.data.message : '';
                            message.error(`${errMsg !== '' ? errMsg : 'Something went wrong!'}`, 4);
                            // Set btn loading
                            setLinkSaving(false);
                        }
                    });
            } else {
                // Not a playground url - Bootstrap, Tailwind CSS etc
                // Refresh ResultViewer Component to re-render with new linkedUrl
                updateIsCodeExecuted(true);
                // Set Loading state
                setLinkSaving(false);
                // Close pop up after save
                setTimeout(() => {
                    setModalVisible(false);
                }, 300);
            }
        } else {
            // Invalid input error
            message.error('Please enter a valid URL');
        }
    }

    const handleLinkRemove = () => {
        // Update linkedUrl state
        updateLinkedUrl('');
        // Notify the user
        message.success('Link removed successfully');
        // Refresh ResultViewer Component to re-render with new linkedUrl
        updateIsCodeExecuted(true);

        // Make save api call only if logged in
        if (isLoggedIn) {
            // Call playground save with linkedUrl
            saveCode('remove-link');
        }
    }

    return (
        <>
            <Modal
                className={'code-sync-modal'}
                centered
                destroyOnClose={true}
                visible={isModalVisible}
                onCancel={() => setModalVisible(false)}
                title={'Add external stylesheets from playgrounds'}
                width={600}
                footer={null}
            >
                <div className="sync-modal-content">
                    <div className="desc body-regular">
                        You could paste the URL of another playground or Bootstrap, Tailwind etc here. The CSS
                        from the link will be applied to this playground.
                    </div>
                    <div className="link-input-container f-d f-v-c f-h-sb">
                        <input
                            type="url"
                            name="playground-url"
                            id="playground-url"
                            placeholder="https://progradjunior.org/playground/9jp2eBVT"
                            value={linkedUrl}
                            onChange={(e) => updateLinkedUrl(e.target.value)}
                            required
                        />
                        <div
                            className="input-clear-btn c-pointer f-d f-v-c f-h-c"
                            onClick={() => linkedUrl !== '' ? handleLinkRemove() : null}
                        >
                            <i className="icon icon-trash"></i>
                        </div>
                    </div>
                    <Button
                        className="save-linked-pg-btn"
                        type="primary"
                        onClick={() => linkPlayground()}
                        loading={linkSaving}
                    >
                        SAVE
                    </Button>
                </div>
            </Modal>
            <div className={`playground-editor-container ${!sidebarActive ? 'active' : ''}`}>
                <div
                    className={`non-login-popup ${showLoginPop ? 'show' : ''} f-d f-vt f-v-c f-h-v`}
                    onClick={() => handleLoginWarning()}
                >
                    <div className="warning-icon">
                        <WarningIcon width={'32'} height={'32'} />
                    </div>
                    <div className="warning-info">
                        Log In to Save your work. You can ‘Run’ the files without saving but they will be deleted once
                        you close this browser window.
                    </div>
                </div>
                <div className="editor-layout">
                    <div className="editor-main-nav f-d f-v-c">
                        <div
                            className="menu-switcher c-pointer"
                            onClick={() => setSidebarActive(!sidebarActive)}
                        >
                            <div
                                className="menu-switch-icon bg-image-full"
                                style={{ backgroundImage: `url(${menuSwitchIcon})` }}></div>
                        </div>
                        <div
                            className="brand-logo bg-image-full c-pointer"
                            style={{ backgroundImage: `url(${pgLogo})` }}
                            onClick={() => window.location.href = G_URL + "playground"}></div>
                        <div className="main-actions-container f-d f-v-c">
                            {projectsData.length > 0 &&
                                <>
                                    <div
                                        className="run-code-btn action-menu f-d f-v-c c-pointer"
                                        onClick={() => executeCode()}
                                    >
                                        <div className="run-icon bg-image-full" style={{ backgroundImage: `url(${runCodeIcon})` }}></div>
                                        Run
                                    </div>
                                    {
                                        viewerType === 'author' ?
                                        <div
                                            className="save-code-btn action-menu c-pointer"
                                            onClick={() => isLoggedIn ? saveCode() : handleLoginWarning()}
                                        >
                                            Save
                                        </div>
                                        :
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
                                    <div className="change-layout-container">
                                        <div className="change-layout-btn c-pointer">
                                            Change Layout
                                    </div>
                                        <div className="drop-down-wrapper">
                                            <div className="drop-extender"></div>
                                            <div className="layout-dropdown">
                                                <div className="drop-down-title">Editor Layout</div>
                                                <div className="layouts">
                                                    <div
                                                        className={`standard-layout layout-btn ${activeLayout === 'standard' ? 'active' : ''} f-d f-v-c c-pointer`}
                                                        onClick={() => activeLayout !== 'standard' ? setActiveLayout('standard') : null}
                                                    >
                                                        <div className="l-icon-container f-d f-v-c f-h-c">
                                                            <StandardIcon
                                                                width={'18'}
                                                                height={'18'}
                                                                activeLayout={activeLayout}
                                                            />
                                                        </div>
                                                    Standard View
                                                </div>
                                                    <div
                                                        className={`focus-layout layout-btn ${activeLayout === 'focus' ? 'active' : ''} f-d f-v-c c-pointer`}
                                                        onClick={() => activeLayout !== 'focus' ? setActiveLayout('focus') : null}
                                                    >
                                                        <div className="l-icon-container f-d f-v-c f-h-c">
                                                            <FocusIcon
                                                                width={'18'}
                                                                height={'18'}
                                                                activeLayout={activeLayout}
                                                            />
                                                        </div>
                                                    Focus View
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            }
                            {!isLoggedIn ?
                                <div
                                    className="login-btn action-menu c-pointer"
                                    onClick={() => window.location.href = `/login?rurl=${getRurl()}`}
                                >
                                    Log In
                                </div>
                                :
                                <div
                                    className="logout-btn action-menu c-pointer"
                                    onClick={() => logout_user()}
                                >
                                    Log Out
                                </div>
                            }
                        </div>
                    </div>

                    {projectsData.length > 0 ?
                        activeLayout === 'focus' ?
                            <>
                                <div className="editor-tabs f-d f-v-c">
                                    {renderTabs()}
                                </div>
                                <Editor
                                    className="editor"
                                    theme={'vs-dark'}
                                    language={tabs[activeTab]}
                                    value={activeTab === 0 ? htmlCode : activeTab === 1 ? cssCode : jsCode}
                                    onMount={(editor, monaco) => handleEditorDidMount(editor, monaco, 4)}
                                    loading={<InitLoader />}
                                    options={{
                                        minimap: {
                                            enabled: false
                                        },
                                        scrollbar: {
                                            useShadows: false
                                        }
                                    }}
                                />
                            </>
                            :
                            <div className="standard-layout-container g-d">
                                <div className="editor-block html-editor" onClick={() => setActiveTab(0)}>
                                    <div className="editor-title">HTML</div>
                                    <Editor
                                        className="editor"
                                        theme={'vs-dark'}
                                        language={'html'}
                                        value={htmlCode}
                                        onMount={(editor, monaco) => handleEditorDidMount(editor, monaco, 1)}
                                        onChange={handleEditorChange}
                                        loading={<InitLoader />}
                                        options={{
                                            minimap: {
                                                enabled: false
                                            },
                                            scrollbar: {
                                                useShadows: false
                                            },
                                            wordWrap: 'on'
                                        }}
                                    />
                                </div>
                                <div className="editor-block css-editor" onClick={() => setActiveTab(1)}>
                                    <div className="editor-header f-d f-v-c f-h-sb">
                                        <div className="editor-title">CSS</div>
                                        <Tooltip
                                            placement="left"
                                            title={'External CSS'}
                                        >
                                            <div
                                                className="sync-container f-d f-v-c f-h-c c-pointer"
                                                onClick={() => setModalVisible(true)}
                                            >
                                                <i className="icon icon-code"></i>
                                            </div>
                                        </Tooltip>
                                    </div>
                                    <Editor
                                        className="editor"
                                        theme={'vs-dark'}
                                        language={'css'}
                                        value={cssCode}
                                        onMount={(editor, monaco) => handleEditorDidMount(editor, monaco, 2)}
                                        onChange={handleEditorChange}
                                        loading={<InitLoader />}
                                        options={{
                                            minimap: {
                                                enabled: false
                                            },
                                            scrollbar: {
                                                useShadows: false
                                            },
                                            wordWrap: 'on'
                                        }}
                                    />
                                </div>
                                <div className="editor-block js-editor" onClick={() => setActiveTab(2)}>
                                    <div className="editor-title">JS</div>
                                    <Editor
                                        className="editor"
                                        theme={'vs-dark'}
                                        language={'javascript'}
                                        value={jsCode}
                                        onMount={(editor, monaco) => handleEditorDidMount(editor, monaco, 3)}
                                        onChange={handleEditorChange}
                                        loading={<InitLoader />}
                                        options={{
                                            minimap: {
                                                enabled: false
                                            },
                                            scrollbar: {
                                                useShadows: false
                                            },
                                            wordWrap: 'on'
                                        }}
                                    />
                                </div>
                            </div>
                        :
                        <div className="editor-empty-container body-regular f-d f-vt f-v-c f-h-c">
                            <div
                                className="pj-logo-cut bg-image-full"
                                style={{ backgroundImage: `url(${pjLogoCut})` }}></div>
                            Click on 'New' to create something awesome
                        </div>
                    }
                </div>
            </div>
            <style jsx>
                {`
                    .playground-editor-container {
                        width: calc(100vw - 256px);
                        height: inherit;
                        margin-left: auto;
                    }

                    .main-layout-container {
                        width: calc(100vw - 256px);
                        display: flex;
                        flex-direction: column;
                    }

                    .main-layout-container.active {
                        width: calc(100vw);
                    }

                    .editor-layout .standard-layout-container {
                        grid-template-columns: repeat(3, 33.33%);
                    }

                    .playground-editor-container .editor-layout,
                    .playground-editor-container .editor-layout .standard-layout-container {
                        height: inherit;
                    }

                    .main-layout-container .editor-main-container,
                    .playground-editor-container .editor-layout,
                    .playground-editor-container .standard-layout-container {
                        width: inherit !important;
                    }

                    .standard-layout-container .editor-block {
                        width: 100%;
                    }

                    .standard-layout-container .editor-block:nth-child(2) {
                        border-left: 4px solid #212121;
                        border-right: 4px solid #212121;
                    }

                    .editor-block .editor-header {
                        position: relative;
                    }

                    .editor-block .editor-header .sync-container {
                        position: absolute;
                        right: 12px;
                        top: 12px;
                        width: 26px;
                        height: 26px;
                        border-radius: 50px;
                        background: rgba(255, 255, 255, 0.1);
                    }

                    .sync-container .icon {
                        font-size: 14px;
                        color: var(--granite);
                        transition: all 0.2s;
                    }

                    .sync-container:hover .icon {
                        color: #7FCB22;
                    }

                    .ant-tooltip-content .ant-tooltip-inner {
                        font-family: 'Open Sans', sans-serif;
                    }

                    .code-sync-modal .ant-modal-close {
                        margin: 1rem 12px 0 0;
                    }

                    .code-sync-modal .ant-modal-content {
                        background-color: #1a1a1a;
                        border-radius: 8px;
                    }

                    .code-sync-modal .ant-modal-header {
                        background: #1a1a1a;
                        color: var(--dove);
                        border-radius: 8px 8px 0 0;
                        padding: 2rem 24px 2rem 24px !important;
                    }

                    .code-sync-modal .ant-modal-body {
                        padding-top: 0;
                    }

                    .code-sync-modal .sync-modal-content .desc {
                        color: var(--dove);
                        font-weight: 300;
                        opacity: 0.8;
                        margin-bottom: 2rem;
                    }

                    .code-sync-modal .link-input-container input {
                        height: 52px;
                        outline: none;
                        border: none;
                        padding: 0 1rem;
                        font-size: 16px;
                        font-family: 'Open sans', sans-serif;
                        border-radius: var(--peaky-br-4);
                        width: calc(100% - 68px);
                        color: var(--carbon);
                        transition: all 0.2s;
                    }

                    .code-sync-modal .input-clear-btn {
                        width: 52px;
                        height: 52px;
                        font-size: 18px;
                        color: var(--dove);
                        border-radius: var(--peaky-br-4);
                        background: rgba(255,255,255,0.1);
                        transition: all 0.2s;
                    }

                    .code-sync-modal .input-clear-btn:hover {
                        background: var(--tomato);
                    }

                    .code-sync-modal .save-linked-pg-btn {
                        height: 52px;
                        padding: 0 2rem;
                        margin-top: 1rem;
                        background-color: var(--go);
                        outline: none;
                        border: none;
                    }

                    .code-sync-modal .save-linked-pg-btn:hover {
                        background-color: #239854;
                    }

                    .ant-btn.ant-btn-loading::before {
                        top: 0px;
                        right: 0px;
                        bottom: 0px;
                        left: 0px;
                    }

                    .change-layout-container {
                        position: relative;
                        display: inline-block;
                        transition: all 0.2s;
                    }

                    .change-layout-container:hover {
                        background: rgba(0, 0, 0, 1);
                    }

                    .change-layout-container .drop-down-wrapper {
                        position: absolute;
                        display: none;
                        opacity: 0;
                        bottom: -68px;
                        right: 0;
                        width: 200px;
                        z-index: 10;
                        visibility: hidden;
                        transform: translateY(70px);
                        transition: all 0.2s;
                    }

                    .change-layout-container:hover .drop-down-wrapper {
                        display: block;
                        opacity: 1;
                        visibility: visible;
                        transform: translateY(66px);
                    }

                    .drop-down-wrapper .drop-extender {
                        height: 10px;
                    }

                    .change-layout-container .layout-dropdown {
                        border-radius: var(--peaky-br-4);
                        padding: 1rem;
                        background: var(--carbon);
                        transition: all 0.2s;
                    }

                    .layout-dropdown .layouts {
                        margin-top: 8px;
                    }

                    .layout-dropdown .layouts .l-icon-container {
                        width: 32px;
                        height: 32px;
                        border: 1px solid #5a5f73;
                        margin-right: 8px;
                    }

                    .standard-layout-container .editor-block .editor-title {
                        color: var(--granite);
                        font-family: 'Open Sans', sans-serif;
                        padding: 12px 0 0 12px;
                        font-weight: 300;
                    }

                    .standard-layout-container .editor-block .monaco-editor .editor-scrollable {
                        overflow: unset !important;
                    }

                    .standard-layout-container .editor-block .scrollbar.vertical {
                        right: -20px !important;
                    }

                    .layout-dropdown .layouts .standard-layout .l-icon-container {
                        border-bottom: none;
                    }

                    .layouts .layout-btn {
                        color: rgba(255, 255, 255, 0.6);
                        transition: all 0.2s;
                    }

                    .layouts .layout-btn:hover,
                    .layouts .layout-btn.active {
                        color: rgba(255, 255, 255, 1);
                    }

                    .layout-btn.active .l-icon-container {
                        background: var(--dove);
                    }

                    .layout-btn.active .l-icon-container svg path {
                        fill: var(--carbon) !important;
                    }

                    .editor-layout .editor {
                        padding: 1rem 0 0 1rem;
                        height: calc(100% - 64px);
                    }

                    .playground-editor-container.active {
                        width: calc(100vw);
                    }

                    .editor-layout .editor-main-nav {
                        height: 64px;
                        background: #212121;
                    }

                    .editor-main-nav .menu-switcher {
                        padding: 8px 12px;
                        background: #1a1a1a;
                        border-radius: var(--peaky-br-4);
                        margin-left: 1rem;
                        transition: all 0.2s;
                    }

                    .editor-main-nav .menu-switcher:hover {
                        background: rgba(0, 0, 0, 1);
                    }

                    .editor-main-nav .menu-switcher .menu-switch-icon {
                        width: 20px;
                        height: 20px;
                    }

                    .editor-main-nav .brand-logo {
                        height: 54px;
                        width: 116px;
                        margin-left: 1rem;
                    }

                    .editor-tabs .tab {
                        position: relative;
                        color: rgba(255, 255, 255, 0.6);
                        padding: 10px 2rem;
                        font-family: 'Open Sans', sans-serif;
                        text-transform: uppercase;
                        cursor: pointer;
                        transition: all 0.2s;
                    }

                    // .editor-tabs .tab:after {
                    //     content: "";
                    //     width: 100%;
                    //     height: 2px;
                    //     background: var(--purple);
                    //     position: absolute;
                    //     bottom: -11px;
                    //     left: 0;
                    //     opacity: 0;
                    //     transform: translateY(2px);
                    //     transition: all 0.2s;
                    // }

                    .editor-layout .editor-tabs {
                        background: var(--carbon);
                    }

                    .editor-tabs .tab:hover,
                    .editor-tabs .tab.active {
                        color: rgba(255, 255, 255, 1);
                        background: #1a1a1a;
                    }

                    // .editor-tabs .tab.active:after {
                    //     opacity: 1;
                    //     transform: translateY(0);
                    // }

                    .editor-main-nav .main-actions-container {
                        margin-left: auto;
                        margin-right: 1rem;
                    }

                    .main-actions-container > div,
                    .main-actions-container > a {
                        background: #1A1A1A;
                        color: var(--dove);
                        font-family: 'Open sans', sans-serif;
                        padding: 8px 14px;
                        margin-left: 1rem;
                        border-radius: var(--peaky-br-4);
                        transition: all 0.2s;
                    }

                    .main-actions-container > .action-menu:hover {
                        background: rgba(0, 0, 0, 1);
                    }

                    .main-actions-container .run-icon {
                        width: 16px;
                        height: 16px;
                        margin-right: 8px;
                    }

                    .editor-main-container .vs-dark .monaco-scrollable-element > .scrollbar > .slider {
                        border-radius: 20px;
                        width: 6px !important;
                        right: 1px !important;
                        left: auto !important;
                    }

                    .editor-main-container .monaco-editor .decorationsOverviewRuler {
                        display: none;
                    }

                    .monaco-editor .margin,
                    .monaco-editor .margin .margin-view-overlays {
                        width: 44px !important;
                    }

                    .monaco-editor .margin .line-numbers {
                        width: 18px !important;
                    }

                    .monaco-editor .editor-scrollable {
                        left: 44px !important;
                    }

                    .monaco-editor,
                    .monaco-editor-background,
                    .monaco-editor .inputarea.ime-input,
                    .monaco-editor .margin {
                        background-color: #1a1a1a;
                    }

                    .non-login-popup {
                        position: absolute;
                        right: 122px;
                        top: 60px;
                        width: 300px;
                        z-index: 10;
                        padding: 2rem;
                        border-radius: var(--peaky-br-4);
                        background: var(--carbon);
                        opacity: 0;
                        visibility: hidden;
                        transform: translateY(10px);
                        transition: all 0.2s;
                    }

                    .non-login-popup.show {
                        opacity: 1;
                        visibility: visible;
                        transform: translateY(0);
                    }

                    .non-login-popup .warning-info {
                        color: var(--dove);
                        font-family: 'Open sans', sans-serif;
                        text-align: center;
                        margin-top: 1rem;
                    }

                    .editor-empty-container {
                        height: 100%;
                        color: var(--granite);
                    }

                    .editor-empty-container .pj-logo-cut {
                        width: 64px;
                        height: 64px;
                        opacity: 0.1;
                        margin-bottom: 1rem;
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

export default EditorBlock;
