import React from "react";

interface Props {
    data ?: Content;
    handleScroll: Function;
}

interface Content {
    title ?: string;
    description ?: string;
    imageSrc ?: string;
}



const Hero = (props:Props) => {
    const { data, handleScroll } = props;

    return (
        <>
            <div className="hire-prograd hire-hero-content-wrapper lr-pad-d tb-pad-d lr-pad-m tb-pad-m">
                <div className="hero-container">
                    <h1 className="text-xxl font-heading title" dangerouslySetInnerHTML={{__html: (data && data.title ? data.title : '')}}>
                    </h1>
                    <span className="f-d text-big description text-faded-2">
                        { data && data.description }
                    </span>
                    <div className="f-d f-vt-m f-v-c action-block">
                        <button className="default-blue-btn" onClick={() => handleScroll()}>
                            Get in touch
                        </button>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .hire-hero-content-wrapper {
                    background-image: url(${data && data.imageSrc});
                    background-repeat: no-repeat;
                    background-position: right Top;
                    height: 530px;
                }

                .hire-hero-content-wrapper .title {
                    font-weight: 900;
                    line-height: 59px;
                    margin-top: 32px;
                }
                .hire-hero-content-wrapper .description {
                    font-weight: 300;
                    max-width: 50%;
                }

                .hire-hero-content-wrapper .title,
                .hire-hero-content-wrapper .description {
                    white-space: pre-line;
                }

                .hire-hero-content-wrapper .description {
                    margin: var(--peaky-gap-16) 0 var(--peaky-gap-32);
                }
                
                .hire-hero-content-wrapper .action-block .help-text{
                    margin-left: 3rem;
                    text-decoration: underline;
                }

                .hire-hero-content-wrapper .action-block .default-blue-btn {
                    padding: 0 3.5rem;
                }

                @media only screen and (min-width: 1366px) and (max-width: 1440px) {
                    
                }

                @media only screen and (min-width: 1024px) and (max-width: 1365px) {
                    .hire-hero-content-wrapper .title{
                        // max-width:70%;
                    }

                    .hire-hero-content-wrapper .description {
                        max-width: 60%;
                    }
                }

                @media only screen and (min-width: 760px) and (max-width: 1023px) {
                    

                    .hire-hero-content-wrapper .title{
                        // max-width:unset;
                    }

                    .hire-hero-content-wrapper .description {
                        max-width: unset;
                    }
                }

                @media only screen and (max-device-width: 760px) {
                    .hire-hero-content-wrapper {
                        height: 850px;
                        background-position: center calc(100% + 10.5rem);
                        background-size: auto 860px;
                    }

                    .hire-hero-content-wrapper .title,
                    .hire-hero-content-wrapper .description {
                        white-space: unset;
                        max-width: 100%;
                        margin-top: 0;
                    }

                    .hire-hero-content-wrapper .title {
                        font-weight: 900;
                        line-height: 50px;
                    }

                    .hire-hero-content-wrapper .default-blue-btn {
                        width: 100%;
                        margin-bottom: var(--peaky-gap-32);
                    }

                    .hire-hero-content-wrapper .help-text {
                        margin-left: auto !important;
                        margin-right: auto !important;
                    }

                    .hire-hero-content-wrapper .action-block {
                        margin: 0;
                        align-items: flex-start;
                    }
                }

                @media only screen and (max-device-width: 480px) {
                    .hire-hero-content-wrapper {
                        height: 730px;
                        background-size: auto 470px;
                        background-position: center calc(100% + 6.5rem);
                    }
                }
                
                @media only screen and (max-device-width: 380px) {
                    .hire-hero-content-wrapper {
                        height: 785px;
                        background-size: auto 420px;
                        background-position: center calc(100% + 5.5rem);
                    }
                }

                @media only screen and (max-device-width: 320px) {
                    .hire-hero-content-wrapper {
                        height: 780px;
                        background-size: auto 380px;
                    }
                }
            `}</style>
        </>
    )
}

export default Hero;