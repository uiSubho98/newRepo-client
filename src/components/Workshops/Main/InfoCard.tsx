import { Button } from "antd";
import React from "react";
import {  IWorkshop } from "../../../interfaces/workshops";
import PlayIcon from "../../../assets/imgs/workshops/play-button-v2.svg";
import moment from 'moment-timezone';
import { useHistory } from "react-router";
import { Typography } from 'antd';
import { isMobile } from "react-device-detect";
import { G_URL } from "../../../constants/constants";

interface IProps {
    data: IWorkshop;
    type: number;
    replay: Function;
}

const InfoCard = (props: IProps) => {
    const { data, type, replay } = props;
    const history = useHistory();

    const viewDetails = (slug: string) => {
        if(isMobile) {
            window.open(G_URL + 'workshops/' + slug);
        } else {
            history.push({
                pathname: "/workshops/" + slug
            });
        }
    }

    const { Paragraph } = Typography;

    return (
        <>
            <div className="workshop-info-card c-pointer" onClick={() => { type === 0 ? viewDetails(data.slug) : replay(data)}}>
                <div className="preview-block">
                    <div className="f-d f-h-c f-v-c preview bg-image" style={{
                        backgroundImage: 'url(' + data.preview + ')'
                    }} onClick={() => { isMobile && viewDetails(data.slug)}}>
                    </div>
                    {
                        type === 0 ?
                        <Button className="default-blue-btn btn-small action-element hide-m" >
                            View details
                        </Button>:
                        <div className="g-d g-h-c action-element watch-replay hide-m">
                            <img className="play-btn c-pointer" src={PlayIcon} alt="" />
                            <h3 className="text-regular strong-text">
                                Watch Replay
                            </h3>
                        </div>
                    }
                </div>
                <div className="info f-d f-vt f-h-sb">
                    <Paragraph className="font-heading text-big"
                    ellipsis={{ rows: 2, expandable: false }}>
                        { data.subject }
                    </Paragraph>
                    <span className="f-d timings">
                        {  (type === 1 ? "Streamed " : "") + 
                        moment(data.workshopTimes[0].startTime * 1000)
                        .format("DD MMM YYYY, h A") }
                    </span>
                </div>
            </div>
        </>
    )
}

export default InfoCard;
