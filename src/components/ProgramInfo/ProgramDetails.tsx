import React from "react";
import ReactHtmlParser from "react-html-parser";
import ProgramDetailsImage from "../../assets/imgs/program-info/program_hero.svg";
import { IProgramDetails } from "../../interfaces/program-info";

interface IProps {
    list: Array<IProgramDetails>;
}

const ProgramDetails = (props: IProps) => {
    const { list } = props;

    const features_list = () => {
        let features_jsx = [];
        const getInfo = (info:any) => {
          if (typeof info !== "string") {
              return info.map((data:any, key:any) =>
                  <li>{data}</li>
              );
          }
          return info;
      }

        for (let index = 0; index < list.length; index += 2) {
            const obj1 = list[index];
            const obj2 = list[index + 1];

            let final_obj = (
                <div className="g-d g-col-2 g-col-1-m g-gap-32 features-wrapper" key={index}>
                    <div className="features">
                        <div className="type">{obj1["name"]}</div>
                        <div className="description">{ReactHtmlParser(getInfo(obj1["desc"]))}</div>                        
                    </div>
                    {
                        obj2 &&
                        <div className="features">
                            <div className="type">{obj2["name"]}</div>
                            <div className="description">{ReactHtmlParser(getInfo(obj2["desc"]))}</div> 
                        </div>
                    }
                </div>
            );

            features_jsx.push(final_obj);
        }

        return features_jsx;
    };

    return (
        <>
            <div className="program-details-cont f-d f-h-sb">
                <div className="left-pane">
                    <div
                        className="bg-image-full image"
                        style={{backgroundImage: "url(" + ProgramDetailsImage + ")"}}
                    >
                    </div>
                </div>
                <div className="right-pane">{features_list()}</div>
            </div>
            <style>
                {`
                  .program-details-cont {
                    height: 25rem;
                    margin-top: 8rem;
                    font-family: "Nunito sans", sans-serif;
                  }

                  .program-details-cont .left-pane {
                    width: 30%;
                  }

                  .program-details-cont .left-pane-pg{
                    align-items: center;
                    display: flex;
                  }

                  .program-details-cont-pg{
                    height: auto;
                  }

                  .program-details-cont .left-pane-pg .image {
                    height: 30rem;
                    width: 30rem;
                  }

                  .program-details-cont .left-pane .image {
                    height: 20rem;
                  }

                  .program-details-cont .right-pane {
                    width: 55%;
                  }

                  .ant-steps-item-wait
                  > .ant-steps-item-container
                  > .ant-steps-item-content
                  > .ant-steps-item-title:after {
                    background-color: var(--dove) !important;
                  }

                  .program-details-cont .features .type {
                    font-size: 21px;
                    font-family: "Poppins";
                    font-weight: 500;
                    color: var(--dove);
                    margin-bottom: 12px;
                    background-color:var(--batman);
                  }

                  .program-details-cont .features-wrapper .features .description {
                    font-size: 18px;
                    font-weight: 300;
                    color: var(--dove);
                    background-color: var(--batman);
                  }

                  .features-wrapper {
                    margin-bottom: 48px;
                  }

                  @media only screen and (max-width: 768px) {
                    .program-details-cont {
                      margin-top: 4rem;
                      height: unset;
                    }

                    .program-details-cont .left-pane, .program-details-cont .left-pane-pg {
                      display: none;
                    }

                    .program-details-cont .right-pane {
                      width: 100%;
                    }

                    .features-wrapper .features {
                      padding: 0 0.5rem;
                    }
                  }
                `}
            </style>
        </>
    )
}

export default ProgramDetails;