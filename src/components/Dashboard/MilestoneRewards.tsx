import axios from 'axios';
import React from 'react';
import CompletionStarIcon from "../../assets/icons/svg_icons/completion_star.svg";
import { G_API_URL, G_URL } from '../../constants/constants';
import { ICertificate } from '../../interfaces/dashboard';
import { __getToken } from '../../utils/user-details.util';

interface IProps {
    certificates: Array<ICertificate>
}

const MilestoneRewards = (props: IProps) => {

    const { certificates } = props;

    const viewReward = (slug: string) => {
        window.open( G_URL + 'certificate/microdegree/' + slug , '_blank' );
        axios.put(G_API_URL + "progress/view-certificate", {
            unique_id: slug
        },{
            headers: {
                Authorization: __getToken()
            }
        }).then((response: any) => {
            response = response.data;
            if(response.status === 1) {
                window.location.reload();
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    const renderRewards = () => {
        return certificates.map((certificate) => 
            <div className="f-d f-v-c f-v-s-m c-pointer milestone-reward"
            onClick={() => viewReward(certificate.slug)}>
                <div 
                    className="bg-image-full star-icon w-10"
                    style={{ 
                    backgroundImage: 'url('+ CompletionStarIcon +')' 
                }}>
                </div>
                <div className="reward-info w-90">
                    <span className="heading text-medium strong-text">
                        Congrats! You’ve unlocked a certificate
                    </span>
                    <span className="f-d text-regular description">
                        {`View your certificate of completion 
                        for ${ certificate.term.replace(certificate.term[0], 
                        certificate.term[0].toUpperCase()) }: ${ certificate.milestone_name }`}
                    </span>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="milestone-rewards-wrapper">
                { renderRewards() }
            </div>
            <style jsx>{`
                .milestone-rewards-wrapper {
                    width: 85%;
                }

                .milestone-rewards-wrapper .milestone-reward {
                    background-color: var(--primary-bg);
                    padding: var(--peaky-pad-16) 12px;
                    margin: 0 0 var(--peaky-gap-32);
                }

                .milestone-rewards-wrapper .milestone-reward:last-of-type {
                    margin-bottom: 84px;
                }

                .milestone-rewards-wrapper .milestone-reward 
                .star-icon {
                    height: 50px;
                }

                .milestone-rewards-wrapper .milestone-reward
                .reward-info {
                    margin: 0 0 0 var(--peaky-gap-16);
                }

                .milestone-rewards-wrapper .milestone-reward
                .reward-info .heading {
                    font-family: Inconsolata;
                }

                .milestone-rewards-wrapper .milestone-reward
                .reward-info .description {
                    font-weight: 400;
                    opacity: 0.54;
                    box-shadow: 0px 3.96439px 11.8932px rgba(0, 0, 0, 0.15);
                    border-radius: var(--peaky-br-4);
                }

                @media only screen and (max-device-width: 760px) {
                    .milestone-rewards-wrapper {
                        width: 100%;
                    }
                }
            `}</style>
        </>
    )
}

export default MilestoneRewards;