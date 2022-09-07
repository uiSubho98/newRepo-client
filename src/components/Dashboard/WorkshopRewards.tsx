import axios from "axios";
import React from "react";
import { G_API_URL } from "../../constants/constants";
import { IWorkshopSources } from "../../interfaces/dashboard";
import { __getToken } from "../../utils/user-details.util";

interface IProps {
    isWorkshopAttended: boolean;
    workshopSources?: IWorkshopSources;
}

const WorkshopRewards = (props: IProps) => {

    const { isWorkshopAttended, workshopSources } = props;

    const rewards = [
        {
            title: "Vision skills report",
            action: "View Report",
            type: "report"
        },
        {
            title: "Certificate of achievement",
            action: "View Certificate",
            type: "certificate"
        }
    ];

    const renderLockedRewards = () => {
        return rewards.map((reward, key) => (
            <div className="f-d f-v-c reward w-90" key={key}>
                <i className="icon icon-lock"></i>
                <span className="text-medium strong-text name">
                    { reward.title }
                </span>
            </div>
        ));
    }

    const viewReward = (type: string) => {
        if(workshopSources) {
            axios.post(G_API_URL+"vision/view/status",{
                type,
                gg: 1
            }, {
                headers: {
                    Authorization: __getToken()
                }
            }).then((response: any) => {
                response = response.data;
                if(response.status && response.view_status) {
                    window.location.reload();
                }
            }).catch((error) => {
                console.log(error);
            });
            window.open(workshopSources[type], "_blank");
        }
    }

    const renderUnlockedRewards = () => {
        return rewards.map(reward => (
            <div className="f-d f-v-s reward w-90">
                <i className="icon icon-check"></i>
                <div className="f-d f-vt info">
                    <span className="text-medium strong-text name">
                        { reward.title }
                    </span>
                    <span className="text-regular action c-pointer"
                    onClick={() => viewReward(reward.type)}>
                        { reward.action }
                    </span>
                </div>
            </div>
        ));
    }

    return (
        <>
            <div className={`workshop-rewards-wrapper 
            ${ isWorkshopAttended ? "complete" : "" }`}>
                <span className="text-big strong-text heading">
                    {
                        !isWorkshopAttended ?
                        "Attend the live code-along class to unlock these" :
                        "Yay! You’ve unlocked these"
                    }
                </span>
                <div className="g-d g-col-2 rewards">
                    { 
                        !isWorkshopAttended ?
                        renderLockedRewards() :
                        renderUnlockedRewards()
                    }
                </div>
            </div>
            <style jsx>{`
                .workshop-rewards-wrapper {
                    width: 85%;
                    margin: 0 0 84px;
                }

                .workshop-rewards-wrapper.complete {
                    margin: 0 0 var(--peaky-gap-64);
                }

                .workshop-rewards-wrapper .heading {
                    font-family: Inconsolata;
                }

                .workshop-rewards-wrapper .rewards {
                    margin: var(--peaky-gap-32) 0 0;
                }

                .workshop-rewards-wrapper .rewards
                .reward {
                    background-color: var(--primary-bg);
                    border-radius: var(--peaky-br-2);
                    padding: 12px var(--peaky-gap-16);
                }

                .workshop-rewards-wrapper.complete .rewards
                .reward {
                    padding: var(--peaky-gap-16);
                }

                .workshop-rewards-wrapper .rewards
                .reward .icon {
                    border-radius: var(--peaky-br-full);
                    background-color: var(--secondary-bg);
                    font-size: 16px;
                    padding: 12px;
                    margin: 0;
                    opacity: 0.87;
                }

                .workshop-rewards-wrapper .rewards
                .reward .name {
                    font-family: Inconsolata;
                    margin: 0 0 0 var(--peaky-gap-16);
                }

                .workshop-rewards-wrapper .rewards
                .reward .info {
                    margin: 0 0 0 var(--peaky-gap-16);
                }

                .workshop-rewards-wrapper .rewards
                .reward .icon-check {
                    border: 1px solid var(--dove);
                    background-color: #34A853;
                    font-size: 18px;
                    padding: 6px;
                }

                .workshop-rewards-wrapper .rewards
                .reward .info .name {
                    margin: 0;
                }

                .workshop-rewards-wrapper .rewards
                .reward .info .action {
                    margin: 3px 0 0;
                    opacity: 0.54;
                }

                @media only screen and (max-device-width: 760px) {
                    .workshop-rewards-wrapper {
                        width: 100%;
                        margin: 0 0 84px !important;
                    }

                    .workshop-rewards-wrapper .rewards {
                        grid-template-columns: 1fr;
                    }

                    .workshop-rewards-wrapper .rewards .reward {
                        width: 100%;
                        margin: 0 0 var(--peaky-gap-16);
                    }

                    .workshop-rewards-wrapper .rewards .reward:last-child {
                        margin-bottom: 0;
                    }
                }
            `}</style>
        </>
    )
}

export default WorkshopRewards;