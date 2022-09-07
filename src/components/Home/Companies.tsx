import React from "react";

interface IProps {
    data: {
        backgroundSrc: string;
        title: string;
        list: Array<string>;
    }
}

const Companies = (props: IProps) => {
    const { backgroundSrc, title, list } = props.data;

    return (
        <>
            <div className="companies-wrapper lr-pad-d lr-pad-m tb-pad-d tb-pad-m" style={{ backgroundImage: "url(" +backgroundSrc+ ")"}}>
                <h2 className="text-xl font-heading text-c-d title">
                    { title }
                </h2>
                <div className="companies-list g-d g-gap-48">
                    {
                        list.map((link: string, index: number) => {
                            return (<img src={link} key={index} className="company-img" width="100%" alt="link" />
                        )})
                    }
                </div>
            </div>

            <style jsx>{`
                .companies-wrapper {
                    background-repeat: no-repeat;
                    background-size: cover;
                }

                .companies-wrapper .title {
                    line-height: 2.623rem;
                    white-space: pre-wrap;
                }

                .companies-wrapper .companies-list {
                    grid-template-columns: repeat(9, 1fr);
                    margin: var(--peaky-gap-48) 0 0;
                    padding: 0 64px;
                }

                .companies-wrapper .company-img {
                    margin: 0 0.5rem;
                }

                @media only screen and (max-device-width: 760px) {
                    .companies-wrapper .title {
                        white-space: unset;
                    }

                    .companies-wrapper .companies-list {
                        grid-template-columns: repeat(3, 1fr);
                        justify-items: center;
                        margin-top: var(--peaky-gap-32);
                        padding: 0;
                    }

                    .companies-wrapper .company-img {
                        height: 64px;
                        width: 64px;
                    }
                }

                @media only screen and (max-device-width: 360px) {
                    .companies-wrapper .companies-list {
                        grid-gap: 32px;
                    }
                }

                @media only screen and (max-device-width: 320px) {
                    .companies-wrapper .companies-list {
                        grid-gap: 24px;
                    }
                }
            `}</style>
        </>
    )
}

export default Companies;