import React from "react";
import { useHistory } from "react-router";
import { IWorkshop } from "../../../interfaces/workshops";
import { Typography } from 'antd';

interface IProps {
    data: Array<IWorkshop>;
}

const Active = (props: IProps) => {

    const { data } = props;

    const history = useHistory();

    const { Paragraph } = Typography;

    const renderList = (activeWorkshops: Array<IWorkshop>) => {
        return activeWorkshops.map((workshop, idx: number) => {
            return (
                <div className="g-d g-col-s-b active-workshop-card
                c-pointer" onClick={() => history.push({
                    pathname: workshop.slug
                })} key={idx} >
                    <div className="bg-image" style = {{
                        backgroundImage: 'url(' + workshop.preview + ')'
                    }}>
                    </div>
                    <div className="info">
                        <span className={`status cap-letter text-small strong-text 
                        ${workshop.inSession ? "active":""}`}>
                            { 
                                workshop.inSession ? 
                                "Happening Now" : 
                                "Starting Soon" 
                            }
                        </span>
                        <Paragraph className="font-heading text-big strong-text
                        title" ellipsis={{ rows: 2, expandable: false }}>
                            { workshop.subject }
                        </Paragraph>
                    </div>
                </div>
            )
        });
    }

    return (
        <>
            <div className="tb-pad-d tb-pad-m lr-pad-d lr-pad-m 
            g-d g-col-2 g-col-1-m active-workshop-list">
                { data && renderList(data) }
            </div>
            <style jsx>{`
                .active-workshop-list {
                    grid-gap: 64px 86px;
                }

                .active-workshop-list .active-workshop-card {
                    background-color: var(--primary-bg);
                    min-height: 150px;
                }

                .active-workshop-list .active-workshop-card 
                .info {
                    padding: var(--peaky-pad-32);
                }

                .active-workshop-list .active-workshop-card 
                .info .title {
                    margin: var(--peaky-gap-8) 0 0;
                    line-height: 1.45rem;
                }

                .active-workshop-list .active-workshop-card 
                .info .status {
                    color: #E6BE2E;
                }

                .active-workshop-list .active-workshop-card 
                .info .status.active {
                    color: var(--tomato);
                }

                @media only screen and (max-device-width: 760px) {
                    .active-workshop-list {
                        grid-gap: 32px 32px;
                    }

                    .active-workshop-list .active-workshop-card .info {
                        padding: var(--peaky-pad-16);
                    }
                }
            `}</style>
        </>
    )
}

export default Active;