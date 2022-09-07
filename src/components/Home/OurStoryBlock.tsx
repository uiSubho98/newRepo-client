import React from "react";

interface IProps {
    data: {
        bgSrc: string;
        title: string;
        list: Array<{val: string; desc: string}>;
    }
}

const OurStoryBlock = (props: IProps) => {
    const { bgSrc, title, list } = props.data;

    return (
        <>
            <div className="our-story-wrapper lr-pad-d tb-pad-d lr-pad-m tb-pad-m f-d f-vt f-v-c" style={{ backgroundImage: "url(" +bgSrc+ ")"}}>
                <div className="title-wrapper f-d f-h-c">
                    <h3 className="text-xl font-heading text-c-d title">{title}</h3>
                </div>
                <div className="stats-wrapper f-d f-h-sb f-vt-m">
                    {
                        list.map((stat: {val: string; desc: string}, index: number) => {
                            return (
                                <div className="stat f-d f-vt f-v-c" key={index}>
                                    <h1 className="text-xxxl font-heading text-faded-2 val">{stat.val}</h1>
                                    <div className="text-big stat-desc text-c-d text-faded-2">{stat.desc}</div>
                                </div>
                            )
                        })
                    }
                </div>
                {/* <div className="btn c-pointer" onClick={()=>{window.location.href = G_URL + 'about-us'}}>
                    Our Story
                </div> */}
            </div>

            <style jsx>{`
                .our-story-wrapper {
                    background-repeat: no-repeat;
                    background-size: cover;
                }

                .our-story-wrapper .title-wrapper {
                    max-width: 60%;
                    line-height: 2.623rem;
                }
                
                .our-story-wrapper .stats-wrapper {
                    margin: var(--peaky-gap-64) 0;
                    width: 75%;
                }
                
                .our-story-wrapper .stat .val {
                    line-height: 4.721rem;
                }

                .our-story-wrapper .stat .stat-desc {
                    font-weight: 300;
                    margin-top: var(--peaky-gap-16);
                    max-width: 270px;
                }

                .our-story-wrapper .btn {
                    padding: 21px 32px;
                    background-color: var(--carbon);
                }

                @media only screen and (max-device-width: 760px) {
                    .our-story-wrapper .title-wrapper {
                        max-width: 100%;
                        line-height: 2.229rem;
                    }
                    
                    .our-story-wrapper .stats-wrapper .stat:not(:first-child) {
                        margin-top: var(--peaky-gap-64);
                    }
                }

            `}</style>
        </>
    )
}

export default OurStoryBlock;