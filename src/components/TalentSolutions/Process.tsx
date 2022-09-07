import React, { useEffect ,useState } from "react";
import { IProcess, IStep } from "../../interfaces/talent-solutions";
import ProcessSkeleton from "../Skeletons/ProcessSkeleton";

interface IProps {
    data: IProcess;
}

const Process = (props: IProps) => {

    const { data } = props;

    const [isLoading, setLoading] = useState<boolean>(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [transitionTimer, setTransitionTimer] = useState<any>();
    useEffect(() => {
        clearTimeout(transitionTimer);
        let timer = setTimeout(() => {
            if(activeIndex === data.list.length - 1) {
                setActiveIndex(0);
            } else {
                setActiveIndex(activeIndex + 1);
            }
        }, 10000);
        setTransitionTimer(timer);
    }, [activeIndex]); // eslint-disable-line react-hooks/exhaustive-deps

    const activeItem = data.list[activeIndex];

    const renderFeatures = (list: Array<IStep> = []) => {
        const handleClick = (index: number) => {
            setLoading(true);
            setActiveIndex(index);

            setTimeout(() => {
                setLoading(false);
            }, 800)
        }
        return list.map((listItem, key) => {
            let isActive = activeItem === listItem;
            return (
                <div key={key} className={`f-d f-vt f-h-c c-pointer list-item ${ 
                isActive ? "active" : "" } text-medium`}
                onClick={() => handleClick(key) }>
                    <span className="title">
                        { listItem.title }
                    </span>
                    {
                        isActive &&
                        <div className="hide-d mobile-source">
                            {
                                !isLoading ?
                                <div className="f-d f-vt f-v-s f-h-e bg-image info-block" style={{ 
                                    backgroundImage: 'url(' + activeItem.img_src + ')' 
                                }}>
                                    <h4 className="sub-title">
                                        { activeItem.sub_title }
                                    </h4>
                                    <span className="text-medium description">
                                        { activeItem.description }
                                    </span>
                                </div> :
                                <ProcessSkeleton />
                            }
                        </div>
                    }
                </div>
            )
        });
    }

    return (
        <>
            <div className="tb-pad-d tb-pad-m lr-pad-d lr-pad-m 
            process-wrapper" id="process">
                <h1 className="font-heading text-xl text-c-d title">
                    { data?.title }
                </h1>
                <div className="g-d g-col-2 g-col-1-m process-block">
                    <div className="g-d g-h-e g-v-c hide-m">
                        {
                            !isLoading ?
                            <div className="f-d f-vt f-v-s f-h-e bg-image info-block" style={{ 
                                backgroundImage: 'url(' + activeItem.img_src + ')' 
                            }}>
                                <h4 className="sub-title">
                                    { activeItem.sub_title }
                                </h4>
                                <span className="text-medium description">
                                    { activeItem.description }
                                </span>
                            </div> :
                            <ProcessSkeleton />
                        }
                    </div>
                    <div className="steps">
                        { renderFeatures(data?.list) }
                    </div>
                </div>
            </div>
            <style jsx>{`
                .process-wrapper .process-block {
                    grid-gap: var(--peaky-gap-100);
                    margin: var(--peaky-gap-64) 0 0;
                }

                .process-wrapper .presentation
                .info-block {
                    border-radius: var(--peaky-br-4);
                    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
                }

                .process-wrapper .steps
                .list-item {
                    background-color: var(--primary-bg);
                    border-radius: var(--peaky-br-4);
                    margin: 0 0 var(--peaky-gap-16);
                    font-weight: 300;
                    padding: var(--peaky-gap-32);
                    min-height: 115px;
                }

                .process-wrapper .steps
                .list-item .title {
                    font-size: 24px;
                    font-weight: 800;
                    line-height: 25px;
                }

                .process-wrapper .steps
                .list-item > span {
                    white-space: pre-wrap;
                }

                .process-wrapper .steps
                .list-item.active {
                    border: 2px solid var(--primary);
                }

                .process-wrapper .process-block
                .presentation {
                    background-position: right;
                }

                .process-wrapper .process-block
                .info-block {
                    border-radius: var(--peaky-br-4);
                    height: 396px;
                    padding: var(--peaky-pad-32);
                    width: 100%;
                }

                .process-wrapper .process-block
                .info-block .sub-title {
                    color: var(--dove);
                    font-size: 24px;
                }

                .process-wrapper .process-block
                .info-block .description {
                    white-space: pre-wrap;
                }

                .process-wrapper .process-block
                .info-block .description {
                    font-weight: 200;
                }

                @media only screen and (max-device-width: 760px) {
                    .process-wrapper .title {
                        line-height: 2.623rem;
                    }
                    
                    .process-wrapper .process-block {
                        margin: var(--peaky-gap-48) 0 0;
                    }

                    .process-wrapper .presentation {
                        display: none;
                    }

                    .process-wrapper .steps {
                        padding: 0;
                    }

                    .process-wrapper .steps
                    .list-item {
                        padding: var(--peaky-pad-16);
                        width: 100%;
                    }

                    .process-wrapper .steps
                    .list-item > span {
                        white-space: unset;
                    }

                    .process-wrapper .steps
                    .list-item .source {
                        display: block;
                        height: 180px;
                        margin: var(--peaky-gap-32) 0 0;
                    }

                    .process-wrapper .steps
                    .list-item .hide-d {
                        display: unset;
                    }

                    .process-wrapper .process-block
                    .info-block {
                        min-height: 200px;
                        height: max-content;
                        margin: var(--peaky-gap-32) 0 0;
                        padding: var(--peaky-pad-16);
                    }


                    .process-wrapper .process-block
                    .info-block .sub-title {
                        font-size: 21px;
                        line-height: 24px;
                    }

                    .process-wrapper .process-block
                    .info-block .description {
                        margin: var(--peaky-gap-8) 0 0;
                        font-size: 16px;
                        white-space: unset;
                    }
                }
            `}</style>
        </>
    )
}

export default Process;