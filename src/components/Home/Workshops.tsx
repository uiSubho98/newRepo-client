import React from "react";
import PlayIcon from "../../assets/icons/svg_icons/play-icon.svg";
import { PlayCircleFilled } from '@ant-design/icons';

interface IWorkshop {
    name?: string;
    date?: string;
}

interface IWorkshops {
    title?: string;
    description?: string;
    imageSrc?: string;
    workshopsList?: Array<IWorkshop>
}

interface Props {
    data?: IWorkshops
}

const Workshops = (props: Props) => {
    const { data } = props;

    const renderWorkshopsList = (workshopsList?: Array<IWorkshop>) => {
       return workshopsList && 
       workshopsList.map((workshop, index) => {
           return (
               <div className="workshop" key={index}>
                   <div className="f-d f-v-c">
                       <span className="f-d bg-image-full play-icon" style={{
                        backgroundImage: "url(" +PlayIcon+ ")"
                        }}>
                       </span>
                       <span className="name">{ workshop.name }</span>
                   </div>
                   <div className="f-d f-v-c">
                       <span className="f-d bg-image-full empty-icon">
                       </span>
                       <span className="date body-caption">
                           { workshop.date }
                        </span>
                        <span className="btn body-caption 
                        strong-text c-pointer">
                            More Details
                        </span>
                   </div>
               </div>
           )
       });
    }

    return (
        <>
            <div className="g-d g-col-2 g-col-1-m workshops-wrapper 
            lr-pad-d lr-pad-m tb-pad-d tb-pad-m">
                <div>
                    <h2 className="h2-heading">
                        { data && data.title }
                    </h2>
                    <span className="body-small description">
                        { data && data.description }
                    </span>
                    <div className="workshops-list">
                        { 
                            data && 
                            renderWorkshopsList( data.workshopsList ) 
                        }
                    </div>
                </div>
                <div className="g-d g-v-e">
                    <div className="g-d w-80 vector-container">
                        <div className="f-d f-v-c go-live-btn body-small
                        strong-text c-pointer">
                            <PlayCircleFilled style={{color:"var(--purple)",
                            fontSize:"32px"}}/> &nbsp;&nbsp;
                            Go Live Now&nbsp;
                            <i className="icon icon-chevron-right"></i>
                        </div>
                        <div className="g-d w-70 bg-image-full workshop-vector" 
                        style={{ backgroundImage: "url(" +
                        ( data && data.imageSrc )+ ")"}}>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .workshops-wrapper {
                    background-color: var(--smoke);
                }

                .workshops-wrapper .description {
                    white-space: pre-wrap;
                }

                .workshops-wrapper .workshops-list 
                .workshop {
                    margin: var(--peaky-gap-32) 0 0;
                }

                .workshops-wrapper .workshops-list 
                .workshop .play-icon,
                .workshops-wrapper .workshops-list 
                .workshop .empty-icon {
                    height: 30px;
                    width: 30px;
                }

                .workshops-wrapper .workshops-list 
                .workshop .name,
                .workshops-wrapper .workshops-list 
                .workshop .date {
                    margin: 0 0 0 var(--peaky-gap-16);
                }

                .workshops-wrapper .workshops-list 
                .workshop .date {
                    color: var(--carbon);
                }

                .workshops-wrapper .workshops-list 
                .workshop .btn {
                    color: var(--purple);
                    margin: 0 0 0 var(--peaky-gap-16);
                }

                .workshops-wrapper .vector-container {
                    margin: 0 0 0 auto;
                }

                .workshops-wrapper .vector-container 
                .go-live-btn {
                    margin: 0 0 5%;
                    color: var(--purple);
                }

                .workshops-wrapper .vector-container 
                .workshop-vector {
                    height:300px;
                    width:450px;
                }

                @media only screen and (max-device-width: 760px) {
                    .workshops-wrapper .description {
                        white-space:unset;
                    }

                    .workshops-wrapper .vector-container {
                        margin: var(--peaky-gap-32) 0 0;
                    }

                    .workshops-wrapper .vector-container .workshop-vector {
                        height: 200px;
                        width: 100%;
                    }
                }
            `}</style>
        </>
    )
}

export default Workshops;