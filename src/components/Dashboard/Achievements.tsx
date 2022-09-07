import React, { useState } from "react";
import { useHistory } from "react-router";
import Badge from "../../assets/icons/svg_icons/badge.svg";
import CompletionStarIcon from "../../assets/icons/svg_icons/completion_star.svg";
import { IProgress, IBadge } from "../../interfaces/dashboard";
import { __getUID } from "../../utils/user-details.util";
import BadgeModal from "./BadgeModal";

interface IProps {
    mode: number;
    progress?: IProgress;
}

const Achievements = (props: IProps) => {
    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const [activeBadge, setActiveBadge] = useState<IBadge>();
    const { mode, progress } = props;

    const history = useHistory();


    const handleClick = (badge: IBadge) => {
        setModalVisible(!isModalVisible);
        setActiveBadge(badge);
    }

    const viewProfile = () => {
        history.push({
            pathname: "/profile/"+__getUID()+"#badges"
        });
    }

    const renderBadges = (badges: Array<IBadge>, type: number) => {
        return badges.map((badge, key) => {
            if(type === 1 && key === 2) {
                return (
                    <div className="f-d f-vt f-h-c f-v-c see-all-btn 
                    c-pointer" onClick={()=> viewProfile()} key={key}>
                        <i className="icon icon-arrow-right"></i>
                        <span className="text-small strong-text cap-letter">
                            See All
                        </span>
                    </div>
                )
            }

            return (
                <div className="bg-image-full c-pointer reward" style={{
                    backgroundImage: "url(" + badge.image + ")"
                }} onClick={() => handleClick(badge)} key={key}>
                </div>
            )
        })
    }

    return (
        <>
            <div className="achievements-wrapper w-90">
                <span className="text-medium strong-text 
                cap-letter main-heading">
                    Your Progress
                </span>
                <div className="f-d milestone-achievements">
                    <div className="f-d f-v-c achievement">
                        <div className="bg-image-full icon" style={{ 
                            backgroundImage:"url(" + Badge + ")" }}>
                        </div>
                        <span className="points text-regular">{progress?.points}</span>
                    </div>
                    {
                        mode === 0 &&
                        <div className="f-d f-v-c achievement">
                            <div className="bg-image-full icon" style={{ 
                                backgroundImage:"url(" + CompletionStarIcon + ")" }}>
                            </div>
                            <span className="points text-regular">{progress?.starCount}</span>
                        </div>
                    }
                </div>
                <div className="divider"></div>
                {
                    progress?.earnedBadges &&
                    progress?.earnedBadges.length > 0 &&
                    <div className="earned-rewards">
                        <span className="text-regular heading">
                            Badges you’ve earned
                        </span>
                        <div className="g-d g-col-3 list">
                            { renderBadges(progress.earnedBadges, 1) }
                        </div>
                    </div>
                }

                {
                    progress?.earnableBadges &&
                    progress?.earnableBadges.length > 0 &&
                    <div className="earnable-rewards">
                        <span className="text-regular heading">
                            Badges that are up for grabs
                        </span>
                        <div className="g-d g-col-3 list">
                            { renderBadges(progress.earnableBadges, 2) }
                        </div>
                    </div>
                }
            </div>

            <BadgeModal 
                isModalVisible={isModalVisible} 
                badge={activeBadge}
                handleClick={handleClick}
            />
            
            <style jsx>{`
                .achievements-wrapper {
                    padding: var(--peaky-pad-32);
                    background-color: var(--primary-bg);
                    border-radius: var(--peaky-pad-2);
                    margin: var(--peaky-gap-64) 0 0;
                }

                .achievements-wrapper .main-heading {
                    font-family: Inconsolata;
                }

                .achievements-wrapper .milestone-achievements
                .achievement .icon {
                    height: 32px;
                    width: 32px;
                }

                .achievements-wrapper .milestone-achievements {
                    margin: var(--peaky-gap-32) 0 0;
                }

                .achievements-wrapper .milestone-achievements
                .achievement:nth-of-type(2) {
                    margin: 0 0 0 var(--peaky-gap-48);
                }

                .achievements-wrapper .milestone-achievements
                .achievement .points {
                    margin: 0 0 0 var(--peaky-gap-8);
                }

                .achievements-wrapper .divider {
                    background-color: rgba(255, 255, 255, 0.1);
                    margin: var(--peaky-gap-32) 0;
                    height: 1px;
                }

                .achievements-wrapper .earned-rewards
                .heading,
                .achievements-wrapper .earnable-rewards
                .heading {
                    opacity: 0.54;
                }

                .achievements-wrapper .earned-rewards 
                .list {
                    margin: var(--peaky-gap-16) 0 var(--peaky-gap-32);
                }

                .achievements-wrapper .earnable-rewards 
                .list {
                    margin: var(--peaky-gap-16) 0 0;
                }

                .achievements-wrapper .earned-rewards 
                .list .reward,
                .achievements-wrapper .earned-rewards 
                .list .see-all-btn,
                .achievements-wrapper .earnable-rewards 
                .list .reward
                 {
                    height: 80px;
                    width: 80px;
                }

                .achievements-wrapper .earned-rewards 
                .list .see-all-btn {
                    background-color: var(--secondary-bg);
                    border-radius: var(--peaky-br-full);
                }

                @media only screen and (max-device-width: 760px) {
                    .achievements-wrapper {
                        padding: var(--peaky-pad-16);
                        width: 100%;
                        margin: 0 0 84px;
                    }
                }
            `}</style>
        </>
    )
}

export default Achievements;