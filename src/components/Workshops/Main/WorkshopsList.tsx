import React, { useState } from "react";
import {  IUpcoming, IWorkshop } from "../../../interfaces/workshops";
import InfoCard from "./InfoCard";
import ReactPlayer from "react-player";
import { Modal } from "antd";
import { useHistory } from "react-router";

interface IProps {
    data: IUpcoming;
    type: number;
}

interface IState {
    playingVideo: number;
    activeWorkshop: IWorkshop;
}
const WorkshopsList = (props: IProps) => {
    const { data, type } = props;
    const [isVisible, setVisibility] = useState<boolean>(false);
    const [state, setState] = useState<IState>({
        playingVideo: 0,
        activeWorkshop: data.list[0]
    });

    const history = useHistory();

    const replay = (activeItem: IWorkshop) => {
        // setVisibility(true);
        // setState(prev => ({
        //     ...prev,
        //     activeWorkshop: activeItem
        // }));
        history.push({
            pathname: "/workshops/" + activeItem.slug
        })
    }

    const renderWorkshops = (list: Array<IWorkshop> = []) => {
        return list.map((listItem, idx: number) => {
            return (
                <InfoCard data={listItem} type={type} replay={replay} key={idx} />
            )
        })
    }

    const sendUserInfo = () => {

        // let webinarPathUrl = window.location.pathname;
        // webinarPathUrl = webinarPathUrl[0] === '/' ? webinarPathUrl.slice(1) : webinarPathUrl;

        // const config = {
        //     headers: {
        //         "Content-Type": "application/x-www-form-urlencoded"
        //     }
        // };

        // const data = {
        //     userName: __getUserName(),
        //     email: __getEmail(),
        //     uid: __getUID(),
        //     source: webinarPathUrl,
        //     webinarType: "free"
        // }

        // axios
        // .post(G_API_URL + `webinars/record/${"free"}`, queryString.stringify(data), config)
        // .catch(err => {
        //     console.log(err);
        // });

    }

    const getVideoLinks = (content: any) => {
        if(content) {
            if (content["link_"+(state.playingVideo+1)] !== undefined) {
                return content["link_"+(state.playingVideo+1)];
            } else {
                setState(prev => ({ 
                    ...prev, 
                    playingVideo: 0 
                }));
                return content["link_1"] ? content["link_1"] : "https://i1.faceprep.in/PIP+Demo/intro_video/joyride.mp4";
            }
        }
    }


    const onEnded = () => {
        setState(prev => ({
            ...prev,
            playingVideo: 0
        }));
        setTimeout(() => {
            getVideoLinks(state.activeWorkshop.recordingLinks);
        }, 2000);
    }

    return (
        <>
            <div className="tb-pad-d tb-pad-m lr-pad-d lr-pad-m workshops-list-wrapper">
                <h1 className="font-heading text-xl">
                    { data?.title }
                </h1>
                <div className="g-d g-col-3 g-col-1-m g-gap-64 g-gap-32-m workshops-list">
                    { renderWorkshops(data?.list)}
                </div>
            </div>
            <Modal
                footer={null}
                centered
                destroyOnClose={true}
                visible={isVisible}
                onCancel={() => setVisibility(false)}
                width="1000"
                className="replay-modal"
            >
                {
                    isVisible && state.activeWorkshop &&
                    <ReactPlayer
                        onReady={sendUserInfo}
                        className='intro-player'
                        url={getVideoLinks(state.activeWorkshop.recordingLinks)}
                        controls
                        playing={true}
                        onEnded={onEnded}
                        onContextMenu={(e: any) => e.preventDefault()}
                        config={{ file: { attributes: { controlsList: 'nodownload' } } }}
                    />
                }
            </Modal>
            <style jsx>{`
                .workshops-list-wrapper .workshops-list {
                    margin: var(--peaky-gap-48) 0 0;
                }

                .workshops-list-wrapper .workshops-list
                .workshop-info-card .preview-block {
                    position: relative;
                }

                .workshops-list-wrapper .workshops-list
                .workshop-info-card .preview-block .preview {
                    border-radius: 4px 4px 0px 0px;
                    height: 230px;
                }

                .workshops-list-wrapper .workshops-list
                .workshop-info-card .preview-block:hover .preview {
                    opacity: 0.54;
                }

                .workshops-list-wrapper .workshops-list
                .workshop-info-card .preview-block .action-element {
                    display: none;
                    position: absolute;
                    top: 40%;
                    left: 30%;
                    bottom: auto;
                }

                .workshops-list-wrapper .workshops-list .workshop-info-card .preview-block .action-element {
                    color: inherit;
                }

                .workshops-list-wrapper .workshops-list
                .workshop-info-card .preview-block .action-element.watch-replay {
                    top: 35%;
                    left: 35%;
                }

                .workshops-list-wrapper .workshops-list
                .workshop-info-card .preview-block 
                .watch-replay > h3 {
                    margin-top: var(--peaky-gap-8);
                }

                .workshops-list-wrapper .workshops-list
                .workshop-info-card .preview-block 
                .watch-replay .play-btn {
                    height: 60px;
                    width: 60px;
                }

                .workshops-list-wrapper .workshops-list
                .workshop-info-card .preview-block:hover .action-element {
                    display: grid;
                }

                .workshops-list-wrapper .workshops-list
                .workshop-info-card .info {
                    background-color: #1E1E1E;
                    border-radius: 0px 0px 4px 4px;
                    padding: var(--peaky-pad-32);
                    min-height: 160px;
                }

                .workshops-list-wrapper .workshops-list
                .workshop-info-card .info .font-heading{
                    line-height: 1.45rem;
                }

                .workshops-list-wrapper .workshops-list
                .workshop-info-card .info .timings {
                    color: var(--dove);
                    opacity: 0.54;
                    margin: var(--peaky-gap-8) 0 0;
                }

                .workshops-list-wrapper .workshops-list
                .workshop-info-card .ant-typography {
                    margin-bottom: 0;
                }

                .replay-modal .ant-modal-body {
                    padding:0;
                }

                .replay-modal .ant-modal-close {
                    z-index:2;
                    font-size:24px;
                }

                .replay-modal .ant-modal-close-x {
                    position: absolute;
                    width: 32px;
                    height: 32px;
                    color: var(--tomato);
                    font-size: 24px;
                    font-weight: 600;
                    line-height: 32px;
                }

                .ant-modal.replay-modal .ant-modal-body {
                    height: max-content;
                }

                @media only screen and (max-device-width: 760px) {
                    .workshops-list-wrapper .workshops-list
                    .workshop-info-card .info {
                        padding: var(--peaky-pad-24) var(--peaky-pad-16);
                    }

                    .workshops-list-wrapper .action-element {
                        display: none !important;
                    }
                }
            `}</style>
        </>
    )
}

export default WorkshopsList;