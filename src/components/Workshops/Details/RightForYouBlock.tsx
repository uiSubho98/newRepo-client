import { CheckOutlined } from "@ant-design/icons";
import React from "react";
import { IRFY } from "../workshops";

interface IRightForYouProps {
    data?: {
        list: Array<IRFY>;
        subtitle: string;
        title: string;
    }
}

const RightForYou = (props: IRightForYouProps) => {
    const { title, subtitle, list } = props.data!;

    return (
        <>
            <div className="rfys-wrapper lr-pad-d lr-pad-m tb-pad-d tb-pad-m">
                <h3 className="font-heading text-xl f-d f-h-c title text-c-m">{title}</h3>
                <div className="text-medium f-d f-h-c text-c-m"><span className="subtitle text-c-d">{subtitle}</span></div>
                <div className="rfys-container g-d g-col-3 g-h-c g-gap-48 g-col-1-m">
                    {list.map((rfy: IRFY, idx: number) => {
                        return (
                            <div className="rfy-wrapper text-c-d" key={idx}>
                                <CheckOutlined style={{ color: `var(--greenapple)` }} className="text-large"/>
                                <div className="title text-medium">{rfy.title}</div>
                                <div className="desc text-faded">{rfy.desc}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <style jsx>
                {`
                    .rfys-wrapper {
                        width: 100%;
                        background-color: var(--primary-bg);
                    }
                    
                    .rfys-wrapper .subtitle {
                        margin-top: var(--peaky-gap-16);
                        max-width: 867px;
                    }
                    
                    .rfys-wrapper .rfys-container {
                        margin-top: var(--peaky-gap-64);
                    }
                    
                    .rfys-wrapper .rfys-container .rfy-wrapper {
                        max-width: 360px;
                    }

                    .rfys-wrapper .rfys-container .rfy-wrapper .title {
                        margin-top: var(--peaky-gap-32);
                        margin-bottom: var(--peaky-gap-8);
                        font-weight: 700;
                    }
                    
                    @media only screen and (max-device-width: 760px) {
                        .rfys-wrapper > .title {
                            line-height: 2.23rem;
                        }
                    }
            `}
            </style>
        </>
    )
}

export default RightForYou;