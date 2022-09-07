import React from "react";
import { ITechnologies } from "../../interfaces/bootcamp";

interface IProps {
    data?: ITechnologies;
}

const Technologies = (props: IProps) => {
    const { data } = props;

    const renderList = (list: Array<string> = []) => {
        return list.map((listItem, key) => (
            <div className="technology bg-image-full" key={key}
            style={{
                backgroundImage: "url(" + listItem + ")"
            }}>
            </div>
        ))
    }

    let customStyle = "g-col-3 g-gap-48";

    if(data?.list.length === 4) {
        customStyle = "g-col-2 g-gap-48 g-h-c";
    }

    return (
        <>
            <div className="tb-pad-d tb-pad-m lr-pad-d lr-pad-m
            g-d g-col-s-b g-v-c g-col-1-m technologies-covered">
                <div className={`g-d ${customStyle} list`}>
                    { renderList(data?.list) }
                </div>
                <div className="info-block">
                    <span className="info text-regular">
                        { data?.info }
                    </span>
                </div>
            </div>
            <style jsx>{`
                .technologies-covered {
                    background-color: var(--secondary-bg);
                    grid-gap: 0 172px;
                }

                // .technologies-covered .list {
                //     grid-gap: var(--peaky-gap-48);
                // }

                .technologies-covered .list .technology {
                    // background-color: var(--dove);
                    height: 100px;
                    width: 100px;
                }

                .technologies-covered .info {
                    white-space: pre-wrap;
                }

                @media only screen and (max-device-width: 760px) { 
                    .technologies-covered .list {
                        grid-gap: unset;
                        justify-items: center;
                    }

                    .technologies-covered .list .technology {
                        height: 80px;
                        width: 80px;
                        margin: 0 0 var(--peaky-gap-32);
                    }

                    .technologies-covered .list.g-col-4 .technology {
                        margin: 0 0 var(--peaky-gap-48);
                    }
                }
            `}</style>
        </>
    )
}

export default Technologies