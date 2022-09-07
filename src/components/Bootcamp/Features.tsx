import React, { useEffect ,useState } from "react";
import { IFeature, IFeatures } from "../../interfaces/bootcamp";
import FeaturesBg from "../../assets/imgs/bootcamp/features_bg.svg";
import FeaturesSkeleton from "../Skeletons/FeaturesSkeleton";

interface IProps {
    data?: IFeatures;
}

const Features = (props: IProps) => {

    const { data } = props;

    const [isLoading, setLoading] = useState<boolean>(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [transitionTimer, setTransitionTimer] = useState<any>();

    useEffect(() => {
            if(data) {
                // Interval to switch Features 10s
                clearTimeout(transitionTimer);
                let timer = setTimeout(() => {
                    if(activeIndex === data.list.length - 1) {
                        setActiveIndex(0);
                    } else {
                        setActiveIndex(activeIndex + 1);
                    }
                }, 10000);
                setTransitionTimer(timer);
            }
    }, [activeIndex]) // eslint-disable-line react-hooks/exhaustive-deps

    const activeItem = data?.list[activeIndex];

    const renderFeatures = (list: Array<IFeature> = []) => {

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
                <div key={key} className={`c-pointer w-80 list-item ${ 
                    isActive ? "active" : "" } text-medium`}
                    onClick={() => handleClick(key) }>
                    <span>
                        { listItem.title }
                    </span>
                    {
                        isActive &&
                        <div className="hide-d mobile-source">
                            {
                                !isLoading ?
                                <img 
                                    src={ activeItem?.video } 
                                    className="source w-100" 
                                    alt={ activeItem?.alt ? activeItem?.alt : "Feature Video"  } 
                                /> :
                                <FeaturesSkeleton />
                            }
                        </div>
                    }
                </div>
            )
        });
    }

    return (
        <>
            <div className="tb-pad-d tb-pad-m lr-pad-m features-content-wrapper"
            id="features">
                <h1 className="font-heading text-xl text-c-d title">
                    { data?.title }
                </h1>
                <div className="g-d g-col-2 g-col-1-m features-block">
                    <div className="features-list">
                        { renderFeatures(data?.list) }
                    </div>
                    <div className="g-d g-h-e g-v-c bg-image-full presentation" style={{
                        backgroundImage: "url(" + FeaturesBg + ")"
                    }}>
                        {
                            !isLoading ?
                            <img 
                                src={ activeItem?.video } 
                                className="source" 
                                alt={ activeItem?.alt ? activeItem?.alt : "Feature Video"  } 
                            /> :
                            <FeaturesSkeleton />
                        }
                    </div>
                </div>
            </div>
            <style jsx>{`
                .features-content-wrapper .features-block {
                    margin: var(--peaky-gap-64) 0 0;
                }

                .features-content-wrapper .features-list {
                    padding: 0 0 0 4rem;
                }

                .features-content-wrapper .presentation {
                    padding: 0 4rem 0 0;
                }

                .features-content-wrapper .presentation
                .source {
                    border-radius: var(--peaky-br-4);
                    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
                    height: 346px;
                }

                .features-content-wrapper .features-list
                .list-item {
                    background-color: var(--primary-bg);
                    border-radius: var(--peaky-br-4);
                    margin: 0 0 var(--peaky-gap-16);
                    font-weight: 300;
                    padding: var(--peaky-gap-32);
                    min-height: 115px;
                }

                .features-content-wrapper .features-list
                .list-item > span {
                    white-space: pre-wrap;
                }

                .features-content-wrapper .features-list
                .list-item.active {
                    border: 2px solid var(--primary);
                }

                .features-content-wrapper .features-block
                .presentation {
                    background-position: right;
                }

                @media only screen and (max-device-width: 760px) {
                    .features-content-wrapper .title {
                        line-height: 2.623rem;
                    }
                    
                    .features-content-wrapper .features-block {
                        margin: var(--peaky-gap-48) 0 0;
                    }

                    .features-content-wrapper .presentation {
                        display: none;
                    }

                    .features-content-wrapper .features-list {
                        padding: 0;
                    }

                    .features-content-wrapper .features-list
                    .list-item {
                        padding: var(--peaky-pad-24);
                        width: 100%;
                    }

                    .features-content-wrapper .features-list
                    .list-item > span {
                        white-space: unset;
                    }

                    .features-content-wrapper .features-list
                    .list-item .source {
                        display: block;
                        height: 180px;
                        margin: var(--peaky-gap-32) 0 0;
                    }

                    .features-content-wrapper .features-list
                    .list-item .hide-d {
                        display: unset;
                    }
                }
            `}</style>
        </>
    )
}

export default Features;