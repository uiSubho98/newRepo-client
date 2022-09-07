import React from "react";
import FeaturedInBg from "../../../assets/imgs/workshop_detail/featured_in_bg.png";

interface IFeaturedInProps {
    data?: {
        list: Array<string>,
        subtitle: string,
        title: string
    }
}

const FeaturedIn = (props: IFeaturedInProps) => {
    const { list, subtitle, title } = props.data!;

    return (
        <>
            <div className="featuredin-wrapper lr-pad-d lr-pad-m tb-pad-d tb-pad-m" style={{ backgroundImage: `url(${FeaturedInBg})` }}>
                <h3 className="font-heading text-xl f-d f-h-c title text-c-m">{title}</h3>
                <div className="text-medium f-d f-h-c subtitle-wrapper text-faded-2"><span className="subtitle text-c-d">{subtitle}</span></div>
                <div className="websites-wrapper g-d g-h-c g-col-4 g-col-1-m g-gap-32-m">
                    {list.map((imgUrl: string, idx: number) => {
                        return (
                            <div className="website bg-image-full" key={idx} style={{ backgroundImage: `url(${imgUrl})`}}>
                            </div>
                        )
                    })}
                </div>
            </div>
            <style jsx>
                {`
                    .featuredin-wrapper {
                        width: 100%;
                    }

                    .featuredin-wrapper .subtitle {
                        margin-top: var(--peaky-gap-16);
                    }
                    
                    .featuredin-wrapper .websites-wrapper {
                        margin-top: var(--peaky-gap-32);
                    }

                    .featuredin-wrapper .websites-wrapper .website {
                        width: 200px;
                        height: 80px;
                    }

                    @media only screen and (max-device-width: 760px) {
                        .featuredin-wrapper .title {
                            line-height: 2.23rem;
                        }
                    }
            `}
            </style>
        </>
    )
}

export default FeaturedIn;