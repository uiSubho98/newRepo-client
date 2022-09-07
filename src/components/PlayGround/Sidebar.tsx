import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button, Modal, message } from 'antd';
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import axios from "axios";
import { G_API_URL } from '../../constants/constants';
import keys from '../../config/keys';
import { __getCookie } from "../../utils/cookie.util";
import sanitizeHtml from "sanitize-html";
import ReactHtmlParser from "react-html-parser";
import sidebar_delete from '../../assets/icons/svg_icons/delete.svg';
import sidebar_edit from '../../assets/icons/svg_icons/sidebar-edit.svg';
import { IProject } from './playground';

interface ISidebarProps {
    isLoggedIn: boolean
    tempCount: number
    updateTempCount: (val: number) => void
    activeProject: number
    setActiveProject: (key: number, pid: string) => void
    sidebarActive: boolean
    projectsData: Array<IProject>
    updateProjectsData: (key: string, mode: string, pg_name_new?: string, newPID?: string) => void
    createNewPlayground: (mode: string) => void
    viewerType: string
}

const Sidebar = (props: ISidebarProps) => {
    const { isLoggedIn, tempCount, updateTempCount, activeProject, setActiveProject, sidebarActive, projectsData, updateProjectsData, createNewPlayground, viewerType } = props
    const [btnLoading, setBtnLoading] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState('');
    const [tempModalData, setTempModalData] = useState<{pg_name: string, pid: string, key: number}>({pg_name:'', pid:'', key: 0});
    const [renameStatus, setRenameStatus] = useState(false);

    const limitMsg = `Playground creation limit exhausted for this session. Please save your work
     and refresh the page to create new playgrounds.`;


    const pgNewName = useRef('');
    const sanitizeConf = {
        allowedTags: ["b", "i", "em", "strong", "a", "p", "h1"],
        allowedAttributes: { a: ["href"] }
    };
    // Wrapped inside callback to avoid re-render-multiple execution
    const handleOutsideClick = useCallback((e) => {
        e.preventDefault();
        const isContentEditorClick = e.target.classList.contains('content-editor');
        const isRenameClick = e.target.classList.contains('sidebar-icon');
        if (!isContentEditorClick && !isRenameClick) {
            setRenameStatus(false);
        }
    }, []);

    useEffect(() => {
        window.addEventListener("click", handleOutsideClick);
        // Remove event handler after initial mount
        return () => {
            window.removeEventListener("click", handleOutsideClick);
        }
    }, [handleOutsideClick]);

    const renameProject = () => {

        setRenameStatus(false);
        const pid = projectsData[activeProject].pid;
        let checkPID = `${pid}`.split('-')[0];

        // Make API call to rename playground project - Logged In user and already saved playground
        if (isLoggedIn && checkPID !== 'temp') {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": __getCookie(keys.cookiePrefix + "ut").cookieValue
                }
            };

            const data = {
                pid: pid,
                apiMode: 'rename',
                pg_name: projectsData[activeProject].pg_name,
                pg_name_new: pgNewName.current,
                code: {}
            }

            axios
                .post(G_API_URL + `playground/save`, JSON.stringify(data), config)
                .then((res) => {
                    const { status } = res.data;
                    if (status === 1) {
                        updateProjectsData(pid, 'rename', pgNewName.current)
                        pgNewName.current = '';
                        message.success(res.data.message);
                    } else {
                        pgNewName.current = '';
                        message.error(res.data.message);
                    }
                })
                .catch((err) => {
                    pgNewName.current = '';
                    message.error('Something went wrong!, Please try again.');
                });
        } else {
            updateProjectsData(pid, 'rename', pgNewName.current)
            pgNewName.current = '';
        }
    }

    const deletePlayground = () => {
        const { pid } = tempModalData;

        let checkPID = `${pid}`.split('-')[0];

        // Set Button Loading state
        setBtnLoading(true);

        // Make API call to delete project
        const config = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": __getCookie(keys.cookiePrefix + "ut").cookieValue
            }
        };

        // If user logged in the make API call
        if (isLoggedIn && checkPID !== 'temp') {
            axios
                .delete(G_API_URL + `playground/?pid=${pid}`, config)
                .then((res) => {
                    const { status } = res.data;
                    if (status === 1) {
                        setBtnLoading(false);
                        setModalVisible(false);
                        // Small delay so Modal could be destroyed
                        setTimeout(() => {
                            message.success(res.data.message);
                            // window.location.reload();
                        }, 500);
                        updateProjectsData(pid, 'delete');
                    } else {
                        message.error(res.data.message);
                    }
                })
                .catch((err) => {
                    setBtnLoading(false);
                    message.error(err);
                });
        } else {
            pseudoDelete('Playground Deleted!');
            if (checkPID === 'temp') {
                const updatedTempCount = tempCount + 1;
                updateTempCount(updatedTempCount);
            }
        }
    }

    const pseudoDelete = (msg: string) => {
        const { pid } = tempModalData;
        setBtnLoading(false);
        setModalVisible(false);
        message.success(msg);
        updateProjectsData(pid, 'delete');
    }

    const handleModal = (type: string, data: IProject, key: number) => {
        // Set Modal Visible and Modal Type
        setModalType(type);
        setModalVisible(true);
        // Set project data in temp state for Modal
        setTempModalData({ ...data, key })
    }

    const handleRenameChange = (e: ContentEditableEvent) => {
        pgNewName.current = (e.target.value);
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.keyCode === 13)
            renameProject();
    }

    const handleRenameClick = (keyN: number, value: IProject) => {
        setActiveProject(keyN, value['pid']);
        pgNewName.current = (value['pg_name']);
        setRenameStatus(true)
    }

    const handleProjectClick = (keyN: number, value: IProject) => {
        if (activeProject !== keyN) {
            setActiveProject(keyN, value['pid'])
            setRenameStatus(false)
        }
    }

    const renderProjects = () => {
        let projectElms = Array<React.ReactNode>();
        // Loop through all projects    
        projectsData.forEach((value: IProject, key: number) => {
            let keyN = key * 1;
            projectElms.push(
                <div
                    key={`project-${value['pid']}`}
                    className={`project-block p-${value['pid']} ${activeProject === keyN ? 'active' : ''} f-d f-v-c f-h-sb body-small c-pointer`}
                    onClick={() => handleProjectClick(keyN, value)}
                >
                    {activeProject === keyN && renameStatus ?
                        <ContentEditable
                            className="content-editor"
                            html={pgNewName.current} // innerHTML of the editable div
                            disabled={false} // use true to disable edition
                            onBlur={renameProject}
                            onChange={handleRenameChange}
                            onKeyDown={onKeyDown}
                        />
                        :
                        <div>{ReactHtmlParser(sanitizeHtml(value['pg_name'].replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, '&'), sanitizeConf))}</div>
                    }
                    {activeProject === keyN ?
                        <div className='sidebar-icons f-d'>
                            <div className="sidebar-icon bg-image-full"
                                style={{ backgroundImage: `url(${sidebar_edit})` }}
                                onClick={() => handleRenameClick(keyN, value)}></div>

                            <div className="sidebar-icon bg-image-full"
                                style={{ backgroundImage: `url(${sidebar_delete})` }}
                                onClick={() => handleModal('delete', value, keyN)}></div>
                        </div> : ''
                    }
                </div>
            );
        })
        return projectElms;
    }

    return (
        <>
            <Modal
                className={`side-action-modal ${modalType}`}
                centered
                destroyOnClose={true}
                visible={isModalVisible}
                onCancel={() => setModalVisible(false)}
                title={`Delete Playground "${tempModalData.pg_name}"`}
                width={600}
                footer={null}
            >
                {modalType === 'delete' ?
                    <>
                        <div className="delete-modal-content">
                            Are you sure you want to delete the playground? This can't be undone.
                        </div>
                        <Button
                            className="delete-confirm-btn default-purple-btn filled-purple"
                            type="primary"
                            onClick={() => deletePlayground()}
                            loading={btnLoading}
                        >
                            Confirm
                        </Button>
                    </>
                    :
                    ""
                }
            </Modal>
            <div className={`playground-sidebar-container ${sidebarActive ? 'active' : ''}`}>
                <div className="sidebar-header">
                    <div className="sidebar-title">JS Playground</div>
                    <div className="playground-version">Version 1.0.0</div>
                </div>
                {
                    viewerType === 'author' &&
                    <>
                        <div className="sidebar-action">
                            <div
                                className="new-project-btn default-purple-btn filled-purple"
                                onClick={() => tempCount < 9 ? createNewPlayground('newAction') : message.warning(limitMsg)}
                            >
                                <i className="icon icon-plus"></i>
                                New
                            </div>
                        </div>
                        <div className="projects-container">
                            {renderProjects()}
                        </div>
                    </>
                }
                {/* <div className="sidebar-hider f-d f-v-c f-h-c" onClick={() => setSidebarActive(!sidebarActive)}>
                    <i className={`icon ${sidebarActive ? 'icon-chevron-left' : 'icon-chevron-right'}`}></i>
                </div> */}
            </div>

            <style jsx>
                {`
                    .playground-sidebar-container {
                        width: 0;
                        position: absolute;
                        top: 50%;
                        left: 0;
                        background: #212121;
                        transition: all 0.3s;
                        border-right: solid 1px rgba(255, 255, 255, 0.38);
                    }

                    .playground-sidebar-container.active {
                        width: 256px;
                        position: relative;
                        top: unset;
                        left: unset;
                        background: #1A1A1A;
                    }

                    //.playground-sidebar-container > div:not(:last-child) {
                    //  opacity: 0;
                    //  visibility: hidden;
                    //  display: none;
                    //}
                    //
                    //.playground-sidebar-container.active > div:not(:last-child) {
                    //  opacity: 1;
                    //  visibility: visible;
                    //  display: block;
                    //}

                    // .playground-sidebar-container .sidebar-hider {
                    //     position: absolute;
                    //     top: 50%;
                    //     right: 0;
                    //     height: 50px;
                    //     width: 18px;
                    //     border-radius: 0 2px 2px 0;
                    //     background: #1a1a1a;
                    //     transition: all 0.2s;
                    //     z-index: 100;
                    //     cursor: pointer;
                    // }

                    // .playground-sidebar-container.active .sidebar-hider {
                    //     border-radius: 2px 0 0 2px;
                    // }

                    // .playground-sidebar-container .sidebar-hider:hover {
                    //     background: rgba(0, 0, 0, 1);
                    // }

                    // .sidebar-hider .icon {
                    //     color: var(--dove);
                    // }

                    .playground-sidebar-container .sidebar-header {
                        height: 64px;
                        padding: 8px 16px 8px 16px;
                        background: #1e1e1e;
                    }

                    .sidebar-header .sidebar-title {
                        color: var(--dove);
                        font-size: 16px;
                        font-family: 'Open Sans', sans-serif;
                        font-weight: 500;
                        white-space: nowrap;
                    }

                    .playground-version {
                        color: var(--granite);
                        font-weight: 300;
                        font-family: 'Open Sans', sans-serif;
                        white-space: nowrap;
                        font-size: 12px;
                    }

                    .playground-sidebar-container .sidebar-action {
                        padding: 2rem 1rem;
                    }

                    .sidebar-action .new-project-btn {
                        width: 100%;
                    }

                    .new-project-btn .icon {
                        margin-right: 8px;
                    }

                    //.playground-sidebar-container .projects-container {
                    //  padding: 0 1rem;
                    //}

                    .playground-sidebar-container.active > div {
                        display: block;
                    }

                    .playground-sidebar-container > div {
                        display: none;
                    }

                    .playground-sidebar-container .projects-container {
                        height: 200px;
                        overflow-y: scroll;
                        border-bottom: solid 1px rgba(255, 255, 255, 0.38);
                    }

                    .projects-container::-webkit-scrollbar {
                        height: 0;
                    }

                    .projects-container .project-block {
                        position: relative;
                        color: var(--dove);
                        padding: 8px 1rem;
                        white-space: nowrap;
                        transition: all 0.2s;
                        font-size: 14px;
                    }

                    .projects-container .project-block .icon {
                        opacity: 0;
                        transform: translateX(10px);
                        transition: all 0.2s;
                    }

                    .projects-container .project-block:hover {
                        color: rgba(255, 255, 255, 1);
                        background: var(--batman);
                    }

                    .projects-container .project-block.active {
                        color: rgba(255, 255, 255, 1);
                        background: var(--purple);
                        margin: 0;
                        border-radius: 0
                    }

                    .projects-container .project-block:hover .icon,
                    .projects-container .project-block.active .icon {
                        opacity: 1;
                        transform: translateX(0);
                    }

                    .project-block .action-container {
                        opacity: 0;
                        visibility: hidden;
                        z-index: 111;
                        position: absolute;
                        bottom: -68px;
                        right: -66px;
                        background: var(--carbon);
                        padding: 14px 28px 14px 16px;
                        border-radius: 4px;
                        transform: translateY(10px);
                        transition: all 0.2s;
                    }

                    .action-container .action-name {
                        font-size: 14px;
                    }

                    .action-name.rename {
                        margin-bottom: 8px;
                    }

                    .action-name.delete {
                        color: var(--tomato);
                    }

                    .project-block .action-container.active {
                        opacity: 1;
                        visibility: visible;
                        transform: translateY(0);
                    }

                    .side-action-modal .ant-modal-content {
                        background-color: #1a1a1a;
                        border-radius: 8px;
                    }

                    .side-action-modal .ant-modal-header {
                        background: #1a1a1a;
                        color: var(--dove);
                        border-radius: 8px 8px 0 0;
                        text-align: center;
                        padding: 2rem 1rem 2rem 1rem !important;
                    }

                    .ant-modal-header .ant-modal-title {
                        color: var(--dove);
                        font-weight: 400;
                        font-family: 'Open sans', sans-serif;
                    }

                    .side-action-modal .ant-modal-body {
                        padding: 0 1rem 1rem 1rem;
                        text-align: center;
                    }

                    .ant-modal-body .delete-modal-content {
                        color: var(--dove);
                        font-family: 'Open sans', sans-serif;
                        font-size: 16px;
                        font-weight: 300;
                    }

                    .side-action-modal .delete-confirm-btn {
                        margin: 2rem auto 1rem auto;
                        padding: 0 2rem;
                        font-weight: 300;
                        text-transform: uppercase;
                    }

                    span.ant-modal-close-x .anticon-close {
                        color: var(--dove);
                        background: rgba(255, 255, 255, 0.1);
                        padding: 8px;
                        border-radius: 50px;
                    }

                    .ant-message-notice-content {
                        font-family: 'Open sans', sans-serif;
                        font-size: 16px;
                        color: var(--dove);
                        border: 0.5px solid grey;
                        background: #1a1a1a;
                    }

                    .projects-container .project-block .content-editor {
                        color: var(--dove);
                        background: var(--carbon);
                        width: 70%;
                        padding: 0 8px;
                        border-radius: var(--peaky-br-4);
                    }

                    .projects-container .project-block .sidebar-icons .sidebar-icon {
                        height: 14px;
                        width: 14px;
                    }

                    .projects-container .project-block .sidebar-icons .sidebar-icon:first-child {
                        margin-right: 10px;
                    }

                    .pga-container {
                        margin: 1rem;
                        font-family: "Open Sans", sans-serif;
                    }

                    .pga-container .pga-block {
                        margin-bottom: 2rem;
                    }

                    .pga-container .pga-block .pga-image {
                        height: 200px;
                        width: 200px;
                    }

                    .pga-container .pga-block .pga-link {
                        color: var(--dove);
                        font-size: 14px;
                        text-align: center;
                        margin-top: 1rem;
                        padding: 0 1.5rem;
                    }

                    .pga-link:hover {
                        text-decoration: underline;
                    }
                    
                    @media screen
                    and (min-device-width: 1200px)
                    and (max-device-width: 1600px)
                    and (-webkit-min-device-pixel-ratio: 1) {
                      .pga-container .pga-block .pga-image {
                        height: 150px;
                        width: 150px;
                      }
                    }
  
                    @media screen
                    and (min-device-width: 1200px)
                    and (max-device-width: 1600px)
                    and (-webkit-min-device-pixel-ratio: 2)
                    and (min-resolution: 192dpi) {
                      .pga-container .pga-block .pga-image {
                        height: 200px;
                        width: 200px;
                      }
                    }
                `}
            </style>
        </>
    );
}

export default Sidebar;
