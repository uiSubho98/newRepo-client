import React from "react";
import Achievements from "./Achievements";
import Milestone from "./Milestone";
import WorkshopRewards from "./WorkshopRewards";
import { IProgress, IMilestoneBlock, IOngoing, IWorkshopInfo, IWorkshopSources, IContent } from "../../interfaces/dashboard";
import Modes from "./Modes";
import Navigator from "./Navigator";
import Enrol from "./Enrol";
import MilestoneRewards from "./MilestoneRewards";
import Coursework from "./Coursework";
import Curriculum from "./Curriculum";
import { isMobile } from "react-device-detect";

interface IProps {
    activeTab: number;
    mode: number;
    progress?: IProgress;
    milestone?: IMilestoneBlock;
    ongoing?: IOngoing;
    hasPurchased?: boolean;
    workshopInfo?: IWorkshopInfo;
    workshopSources?: IWorkshopSources;
    liveclassInfo?: any;
    isPopoverVisible: boolean;
    content?: IContent;
    setPopoverVisible: Function;
    changeMode: Function;
    redirect: Function;
    switchTab: Function;
}

const Hero = (props: IProps) => {

    const { 
        mode, 
        progress, 
        ongoing, 
        hasPurchased,
        milestone, 
        workshopInfo, 
        workshopSources, 
        liveclassInfo, 
        changeMode, 
        setPopoverVisible, 
        isPopoverVisible, 
        redirect, 
        switchTab,
        content
    } = props;

    let isWorkshopAttended = false;
    let isRewardsViewed = false;
    let isMilestoneRewardViewed = true;
    let isSlackInviteGrabbed = false;

    if(workshopInfo && workshopInfo.att && 
    workshopInfo.details && workshopInfo.details.att === "P") {
        isWorkshopAttended = true;
    }


    if(workshopSources && workshopSources.view_status) {
        isRewardsViewed = true;
    }

    if(progress && progress.certificates && 
        progress.certificates.length) {
        isMilestoneRewardViewed = false;
    }

    if(progress && progress.earnedBadges) {
        let earnedBadges = progress.earnedBadges.filter(badge => 
            badge.id === 0
        );
        if(earnedBadges.length) {
            isSlackInviteGrabbed = true;
        }
    }

    return (
        <>
            {
                isPopoverVisible &&
                <div className="ant-modal-mask" 
                onClick={() => setPopoverVisible(false)}>
                </div>
            }
            <div className="hero-content-wrapper">
                {
                    isMobile &&
                    <Modes 
                        mode={mode} 
                        isPopoverVisible={isPopoverVisible} 
                        changeMode={changeMode} 
                        setPopoverVisible={setPopoverVisible}
                    />
                }
                <Navigator switchTab={switchTab} />
                <div className="g-d g-col-s-b main-pane">
                    <div className="left-pane">
                        {
                            !isMobile &&
                            <Modes 
                                mode={mode} 
                                isPopoverVisible={isPopoverVisible} 
                                changeMode={changeMode} 
                                setPopoverVisible={setPopoverVisible}
                            />
                        }
                        <Coursework progress={progress} redirect={redirect} />
                        <Achievements mode={mode} progress = {progress} />
                    </div>
                    <div className={`g-d g-h-e right-pane ${ !isMilestoneRewardViewed ? 
                    "milestone-reward-active" : ( isWorkshopAttended &&
                    (!hasPurchased && progress?.ongoing?.completion === 100)) ? "pre-work-completed" : "" }`}>
                        <div className={`g-d g-h-e w-100 ${isWorkshopAttended &&
                        !isRewardsViewed ? "workshop-reward-active" : ""}`}>
                            <Milestone 
                                mode={mode}
                                milestone={milestone} 
                                ongoing={ongoing} 
                                hasPurchased={hasPurchased}
                                workshopInfo={workshopInfo} 
                                liveclassInfo = {liveclassInfo}
                                isSlackInviteGrabbed = { isSlackInviteGrabbed }
                                isTrialActivated={progress?.isTrialActivated}
                                redirect = { redirect }
                            />
                            {
                                ( mode === 0 && !isRewardsViewed && workshopSources ) &&
                                !hasPurchased && progress?.isTrialActivated !== false &&
                                <WorkshopRewards 
                                    isWorkshopAttended={isWorkshopAttended}
                                    workshopSources={workshopSources}
                                />
                            }
                        </div>
                        <div className="g-d g-h-e enrol-block-wrapper w-100">
                            {
                                progress?.certificates &&   
                                <MilestoneRewards certificates={progress.certificates} />
                            }
                            {
                                (!hasPurchased && mode === 0) &&
                                <Enrol enrol={content?.enrolBlock} />
                            }
                        </div>
                        {
                            mode === 0 &&
                            <Curriculum  
                                curriculum={content?.curriculumBlock} 
                                ongoing={progress?.ongoing}
                                redirect = { redirect }
                            />
                        }
                    </div>
                </div>
            </div>
            <style jsx>{`

                body {
                    overflow: hidden;
                }

                .hero-content-wrapper .right-pane {
                    overflow-y: scroll;
                    max-height: calc(100vh - 80px);
                }

                .hero-content-wrapper .welcome-text {
                    margin: 0 0 8px;
                }

                .hero-content-wrapper .active-program
                .change-btn {
                    color: var(--primary);
                }

                .hero-content-wrapper .active-program
                .change-btn .icon {
                    font-size: 18px;
                    margin: 4px 0 0;
                }

                .hero-content-wrapper .main-pane
                .left-pane {
                    padding: 4rem 0 0 4rem;
                }

                .hero-content-wrapper .main-pane
                .right-pane {
                    padding: 13rem 4rem 4rem 0;
                }

                .hero-content-wrapper .main-pane
                .right-pane .workshop-reward-active .milestone-content-wrapper {
                    order: 2;
                }

                .hero-content-wrapper .main-pane
                .right-pane.milestone-reward-active .enrol-block-wrapper,
                .hero-content-wrapper .main-pane
                .right-pane.pre-work-completed .enrol-block-wrapper {
                    order: 1;
                }

                .hero-content-wrapper .main-pane
                .right-pane.milestone-reward-active > div:first-of-type,
                .hero-content-wrapper .main-pane
                .right-pane.pre-work-completed > div:first-of-type {
                    order: 2;
                }

                .hero-content-wrapper .main-pane
                .right-pane.milestone-reward-active .curriculum-content-wrapper,
                .hero-content-wrapper .main-pane
                .right-pane.pre-work-completed .curriculum-content-wrapper {
                    order: 3;
                }

                @media only screen and (max-device-width: 760px) {

                    body {
                        overflow: unset;
                    }

                    .hero-content-wrapper .main-pane .left-pane {
                        padding: 0;
                    }
    
                    .hero-content-wrapper .right-pane {
                        overflow-y: unset;
                        max-height:unset;
                    }
    
                    .hero-content-wrapper .welcome-text {
                        margin: 0 0 12px;
                    }

                    .hero-content-wrapper .main-pane,
                    .hero-content-wrapper .main-pane .right-pane {
                        display: unset;
                    }
                }

            `}</style>
        </>
    )
}

export default Hero;