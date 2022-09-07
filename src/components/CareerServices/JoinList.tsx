import React from "react";

interface Props {
    data?: Content;
}

interface Content {
    title?: string;
    description?: string;
    heading?: string;
}


const JoinList = (props: Props) => {
    const {data} = props;

    return (
        <>

            <div className="join-lists">
                <div className="text-small heading text-faded"> {data && data.heading} </div>
                <div className="text-big title"> {data && data.title} </div>
                <div className="desc text-regular text-faded"> {data && data.description} </div>
            </div>

            <style jsx>{`


              .join-lists {
                padding: 2rem;
                margin: 2rem 0;
                background-color: var(--secondary-bg);
                width: 19rem;
                box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
                border-radius: 4px;
              }

              .join-lists .title {
                margin: 0.5rem 0;
                font-weight: 700;
                color: var(--dove);
              }

              .join-lists .desc {
                margin: 1rem 0;
              }

              @media only screen and (min-width: 1366px) and (max-width: 1440px) {
                .hero-content-wrapper .title {
                  max-width: 60%;
                }
              }

              @media only screen and (min-width: 1024px) and (max-width: 1365px) {
                .hero-content-wrapper .title {
                  max-width: 65%;
                }
              }

              @media only screen and (min-width: 768px) and (max-width: 1023px) {
              }

              @media only screen and (max-device-width: 760px) {
                .hero-content-wrapper {
                  height: 900px;
                  background-position: center calc(100% + 2.5rem);
                  background-size: auto 500px;
                }

                .hero-content-wrapper .title,
                .hero-content-wrapper .description {
                  white-space: unset;
                  max-width: 100%;
                }

                .hero-content-wrapper .title {
                  font-weight: 900;
                  line-height: 3.671rem;
                }

                .hero-content-wrapper .default-blue-btn {
                  width: 100%;
                  margin-bottom: var(--peaky-gap-32);
                }

                .hero-content-wrapper .help-text {
                  margin-left: auto !important;
                  margin-right: auto !important;
                }

                .hero-content-wrapper .action-block {
                  margin: 0;
                  align-items: flex-start;
                }

                .join-lists {
                  width: unset;
                }
              }

              @media only screen and (max-device-width: 380px) {
                .hero-content-wrapper {
                  height: 950px;
                  background-size: auto 450px;
                }
              }

              @media only screen and (max-device-width: 320px) {
                .hero-content-wrapper {
                  height: 880px;
                  background-size: auto 380px;
                }
              }
            `}</style>
        </>
    )
}

export default JoinList;