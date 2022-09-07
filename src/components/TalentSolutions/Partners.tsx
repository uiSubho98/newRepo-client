import React from "react";
import { IPartners } from "../../interfaces/talent-solutions";

interface IProps {
    data: IPartners;
}

const Partners = (props: IProps) => {
    const { title, list } = props.data;
    const renderPartners = () => {
        return list.map((partner, key) => 
            <div className="partner">
                <div className="bg-image-full logo" key={key} style={{
                    backgroundImage: 'url(' + partner + ')'
                }} />
            </div>
        );
    }
    return (
        <>
            <div className="partners-wrapper tb-pad-d tb-pad-m
            lr-pad-d lr-pad-m">
                <h2 className="font-heading f-d f-h-c f-v-c text-c-d 
                text-xl title">
                    { title }
                </h2>
                <div className="g-d g-col-6 g-col-3-m g-gap-24 g-gap-16-m partners">
                    { renderPartners() }
                </div>
            </div>
            <style jsx>{`
                .partners-wrapper .partners {
                    margin: var(--peaky-gap-64) 0;
                }

                .partners-wrapper .partners .partner {
                    padding: var(--peaky-pad-16);
                    background-color: var(--dove);
                    border-radius: var(--peaky-br-4);
                }

                .partners-wrapper .partners .partner .logo {
                    height: 50px;
                }

                @media only screen and (max-device-width: 760px) {
                    .partners-wrapper .partners .partner {
                        padding: 8px;
                    }
                }
            `}</style>
        </>
    )
}

export default Partners;