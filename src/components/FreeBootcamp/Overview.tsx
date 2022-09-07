import React from "react";

interface IOverview {
    title?: string;
    description?: string;
}

interface ITechnologiesCovered {
    title?: string;
    content?: Array<string>;
}

interface IProgramOverview {
    title?: string;
    overview?: Array<IOverview>;
    technologies?: ITechnologiesCovered;
}

interface IProps {
    data?: IProgramOverview
}

const Overview = (props: IProps) => {
    const { data } = props;

    const renderOverviews = (overviewList?: Array<IOverview>) => {
        return overviewList && 
        overviewList.map(overview => {
            return (
                <div className="overview-wrapper" key={overview.title}>
                    <h4 className="h3-heading title">
                        { overview.title }
                    </h4>
                    <span className="body-regular">
                        { overview.description }
                    </span>
                </div>
            )
        })
    }

    const renderTechnologies = (technologies?: ITechnologiesCovered) => {
        
        const renderTechStack = (list?: Array<string>) => {
            return list && 
            list.map( link => 
                <div className="bg-image-full image" key={link}
                style={{ backgroundImage: "url(" +link+ ")"
                }}>
                </div>
            )
        }

        let gridColumns = "g-col-4";

        if(technologies && technologies.content && 
            technologies.content.length >= 5) {
            gridColumns = "g-col-5";
        }

        return (
            <div className="technologies-covered w-80">
                <h4 className="h4-heading">
                    { technologies && technologies.title }
                </h4>
                <div className={`g-d g-h-c ${gridColumns} g-col-3-m 
                technologies-list`}>
                    { technologies && renderTechStack(technologies.content) }
                </div>
            </div>
        )

    }

    return (
        <>
            <div className="program-overview-wrapper lr-pad-d lr-pad-m
            tb-pad-d tb-pad-m">
                <h2 className="h2-heading">
                    { data && data.title }
                </h2>
                <div className="g-d g-col-2 g-col-1-m content">
                    { data && renderOverviews( data.overview ) }
                </div>
                { data && renderTechnologies( data.technologies ) }
            </div>
            <style jsx>{`
                .program-overview-wrapper {
                    background-color: var(--smoke);
                }

                .program-overview-wrapper .content {
                    margin: var(--peaky-gap-16) 0 0;
                    grid-gap: 0 var(--peaky-gap-128);
                }

                .program-overview-wrapper .content .overview-wrapper,
                .program-overview-wrapper .technologies-covered {
                    margin: var(--peaky-gap-32) 0 0;
                }

                .program-overview-wrapper .content 
                .overview-wrapper .title {
                    white-space: pre-wrap;
                }

                .program-overview-wrapper .technologies-covered
                .technologies-list {
                    background-color: var(--dove);
                    grid-gap: var(--peaky-gap-32) 0;
                    padding: var(--peaky-pad-24);
                    margin: var(--peaky-gap-16) 0 0;
                }

                .program-overview-wrapper .technologies-covered
                .technologies-list .image {
                    height: 40px;
                    width: 80px;
                }

                @media only screen and (max-device-width: 760px) {

                    .program-overview-wrapper .technologies-covered {
                        width: 100%;
                    }

                    .program-overview-wrapper .technologies-covered
                    .technologies-list .image {
                        margin: var(--peaky-gap-16) 0;
                    }

                }

                @media screen and (min-width: 768px) and (max-width: 1023px) 
                and (orientation: portrait) {
                    .program-overview-wrapper .content {
                        grid-gap: 0 var(--peaky-gap-32);
                    }

                    .program-overview-wrapper .technologies-covered {
                        width: 100%;
                    }
                }
            `}</style>
        </>
    )
}

export default Overview;
