import React from "react";
import {IListItem, IOverview} from "../../interfaces/bootcamp";

interface IProps {
    data?: IOverview;
    list?: Array<IListItem>;
    from?: string;
}


const Overview = (props: IProps) => {

    const {data, from} = props;

    const renderList = () => {
        return data?.list.map((listItem, key) => {

            const getInfo = (info: string | Array<string>) => {
                if (typeof info !== "string") {
                    return info.map((data, key) =>
                        <span>{(key + 1) + ". " + data}</span>
                    );
                }
                return info;
            }

            return (
                <div key={key} className="w-60 list-item">
                    <span className="text-medium strong-text title">
                        {listItem.title}
                    </span>
                    <span className="f-d f-vt text-regular info">
                        {getInfo(listItem.info)}
                    </span>
                </div>
            )
        })
    }

    return (
        <>
            <div className="g-d g-h-c tb-pad-d tb-pad-m
            lr-pad-d lr-pad-m overview-content-wrapper" id="overview">
                <h1 className="font-heading text-xl title">
                    {data?.title}
                </h1>
                {from === "career-services" ? (
                    <div className="g-d g-col-2 g-col-1-m g-h-c overview-content-service">
                        {renderList()}
                    </div>
                ) : (
                    <div className="g-d g-col-3 g-col-1-m g-h-c overview-content">
                        {renderList()}
                    </div>
                )}
            </div>
            <style jsx>{`
              .overview-content-wrapper {
                background-color: var(--primary-bg);
              }

              .overview-content-wrapper .overview-content {
                grid-gap: var(--peaky-gap-64) 0;
                margin: var(--peaky-gap-48) 0 0;
              }

              .overview-content-wrapper .overview-content-service {
                grid-gap: var(--peaky-gap-64) 0;
                margin: var(--peaky-gap-48) 0 0;
                width: 65%;
              }

              .overview-content-wrapper .overview-content
              .list-item .title {
                font-family: Inconsolata;
              }

              .overview-content-wrapper .overview-content
              .list-item .info {
                margin: var(--peaky-gap-8) 0 0;
                opacity: 0.54;
                white-space: pre-wrap;
              }

              .overview-content-wrapper .overview-content-service
              .list-item .title {
                font-family: Inconsolata;
              }

              .overview-content-wrapper .overview-content-service
              .list-item .info {
                margin: var(--peaky-gap-8) 0 0;
                opacity: 0.54;
                white-space: pre-wrap;
              }

              @media only screen and (max-device-width: 760px) {
                .overview-content-wrapper .overview-content {
                  grid-gap: var(--peaky-gap-32) 0;
                  justify-items: start;
                  width: 100%;
                }

                .overview-content-wrapper .overview-content
                .list-item {
                  width: 70%;
                }

                .overview-content-wrapper .overview-content-service {
                  grid-gap: var(--peaky-gap-32) 0;
                  width: unset;
                }

                .overview-content-wrapper .overview-content-service,
                .overview-content-wrapper .overview-content-service
                .list-item {
                  width: 100%;
                }
              }
            `}</style>
        </>
    )
}

export default Overview;