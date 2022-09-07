import React from "react";

interface IBanner {
    title?: string;
    description?: string;
}

interface Props {
    data?: IBanner;
    handleScroll: Function;
}

const Banner = (props: Props) => {
    const { data, handleScroll } = props;
    return (
        <>
            <div className="banner-wrapper lr-pad-d lr-pad-m">
                <h2 className="h2-heading title">
                    { data && data.title }
                </h2>
                <span className="body-regular description">
                    { data && data.description }
                </span>
                <button className="default-purple-btn outline-purple"
                onClick={ () => handleScroll() }>
                    Start For Free
                </button>
            </div>
            <style jsx>{`
                .banner-wrapper {
                    background-color: var(--purple);
                    padding-top: var(--peaky-pad-32);
                    padding-bottom: var(--peaky-pad-32);
                }

                .banner-wrapper .title,
                .banner-wrapper .description {
                    color: var(--dove);
                }

                .banner-wrapper > button {
                    margin:var(--peaky-gap-24) 0 0;
                }
            `}</style>
        </>
    )
}

export default Banner;