import React from "react";
import { G_URL } from "../../constants/constants";

interface IProps {
    title: string;
    topic: string;
    duration: string;
    constraint?: string;
    description: string;
    isExpanded: boolean;
    isPreworkCompleted: boolean;
    hasPurchased?: boolean;
    isPaymentActionActive?: boolean;
    isPrework: boolean;
    slug: string;
    setExpansionState: Function;
}

const MainContent = (props:IProps) => {
    const { 
        title,
        topic, 
        duration,
        constraint, 
        description, 
        isExpanded, 
        isPreworkCompleted, 
        isPaymentActionActive, 
        isPrework,
        slug,
        setExpansionState } = props;

    const handleClick = () => {
        window.location.href = G_URL+"payment/bootcamp";
    }

    const getCertificate = () => {
        window.location.href = G_URL+"certificate/bootcamp/"+slug;
    }

    let isAddon = false;
    let addonClass = "";

    if(constraint && title.toLowerCase() === "add on"){
        isAddon = true;
        addonClass = "add-on-tag"
    }

    return (
        <div className={`content-wrapper f-d f-v-c f-h-sb ${isPaymentActionActive? 
        "with-payment-btn" : addonClass }`}>
            <div className="left-pane">
                <span className={`f-d sprint-tag ${addonClass}`}>
                    { isAddon ? "+ " + title : title }
                </span>
                {
                    isAddon &&
                    <span className="body-small">
                        { constraint }
                    </span>
                }
                <h2 className="topic h2-heading">
                    { topic }
                </h2>
                {
                    isPrework ?
                    <>
                        <span className="f-d body-small description">
                            { description }
                        </span>
                        {
                            isPreworkCompleted &&
                            <span className="f-d h4-heading get-certificate-btn
                            c-pointer" onClick={() => getCertificate()}>
                                Get Certificate
                            </span>
                        }
                    </> : 
                    isExpanded &&
                    <span className="f-d f-v-c body-caption">
                        <i className="icon icon-clock"></i>&nbsp;{ duration }
                    </span>
                }
                {
                    isPaymentActionActive &&
                    <button className="default-pink-btn filled-pink
                    action-btn payment-btn" onClick={() => handleClick()}>
                        Pay to enroll now
                    </button>
                }
            </div>
            {
                !isPrework &&
                <div className="right-pane expand-btn default-inactive-btn 
                c-pointer f-d f-v-c" onClick={() => setExpansionState(!isExpanded)}>
                    <i className="icon icon-chevron-down"></i>
                    <p className="hide-m">&nbsp;{isExpanded?'Collapse':'Expand'}</p>
                </div>
            }
        </div>
    )
}

export default MainContent;