import React from "react";
import { IAchievement } from "../../interfaces/programs";

interface IProps {
    achievements: Array<IAchievement>
}

const Achievements = (props: IProps) => {
    const { achievements } = props;

    const renderAchievements = () => {
        return achievements.map((listItem: IAchievement, key: number) =>
            <div className="g-d g-col-2 g-col-1-m g-v-c achievement" 
            key={key}>
                <span className="font-heading text-xxxl value">
                    {listItem.value}
                </span>
                <span className="strong-text text-xl info">
                    {listItem.label}
                </span>
            </div>
        )
    }

    return (
        <>
            <div className="achievements-wrapper g-d g-col-3 g-gap-48">
                { renderAchievements() }
            </div>

            <style jsx>{`
                .achievements-wrapper {
                    margin: var(--peaky-gap-64) 0 0;
                }

                .achievements-wrapper .achievement {
                    background-color: var(--primary-bg);
                    border-radius: var(--peaky-br-4);
                    padding: var(--peaky-pad-16);
                }

                .achievements-wrapper .achievement .info {
                    font-family: 'Inconsolata', sans-serif !important;
                    line-height: 41px;
                }

                @media only screen and (max-device-width: 760px) {
                    .achievements-wrapper {
                        grid-column-gap: 16px;
                        margin: 0;
                        margin: var(--peaky-gap-32) 0;
                    }

                    .achievements-wrapper .achievement {
                        text-align: center;
                        padding: 8px;
                    }

                    .achievements-wrapper .achievement .info {
                        font-size: 16px;
                        line-height: 18px;
                    }

                    .achievements-wrapper .achievement .value {
                        font-size: 32px;
                    }
                }
            `}</style>
        </>
    )
}

export default Achievements;