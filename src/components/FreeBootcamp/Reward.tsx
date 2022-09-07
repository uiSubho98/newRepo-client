import React from "react";

interface IReward {
    title?: string;
    description?: string;
    imageSrc?: string;
}

interface IProps {
    data?: IReward;
}

const Reward = (props: IProps) => {
    const { data } = props;
    return (
        <>
            <div className="g-d g-col-2 g-col-1-m g-v-c lr-pad-d lr-pad-m 
            tb-pad-d tb-pad-m reward-wrapper">
                <div className="left-pane">
                    <div className="bg-image-full image" 
                    style={{ backgroundImage:"url(" + (data && data.imageSrc) +
                    ")"}}>
                    </div>
                </div>
                <div className="right-pane">
                    <h2 className="h2-heading title">
                        { data && data.title }
                    </h2>
                    <span className="body-regular">
                        { data && data.description }
                    </span>
                </div>
            </div>
            <style jsx>{`
                .reward-wrapper {
                    background-color: var(--smoke);
                    grid-gap: 0 var(--peaky-gap-128);
                }

                .reward-wrapper .left-pane .image {
                    height: 250px;
                    width: 100%;
                }

                .reward-wrapper .right-pane .title {
                    margin: 0 0 var(--peaky-gap-16);
                }

                @media screen and (min-width: 768px) and (max-width: 1023px) 
                and (orientation: portrait) {
                    .reward-wrapper {
                        grid-gap: 0 var(--peaky-gap-32);
                    }

                }
            `}</style>
        </>
    )
}

export default Reward;