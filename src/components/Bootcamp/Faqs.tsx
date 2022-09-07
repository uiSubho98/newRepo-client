import React, { useState } from "react";
import { IData, IFaq, IFaqs } from "../../interfaces/bootcamp";
import Faq from "./Faq";


interface IProps {
    data?: IFaqs;
}

const Faqs = (props: IProps) => { 

    const { data } = props;

    const [activeTab, setActiveTab] = useState<number>(0);

    const renderTabs = (list: Array<IData> = []) => {
        return list.map((listItem, key) => 
            <span key={key} className={`tab ${activeTab === key ? "active" : "" } 
            c-pointer text-big`} onClick={() => setActiveTab(key)}>
                { listItem.topic }
            </span>
        );
    }

    const renderFaqs = (faqs: Array<IFaq> = []) => {
        return faqs.map((faq) => 
            <Faq data={faq} activeTab={activeTab} />
        )
    }

    return (
        <>
            <div className="faqs-container tb-pad-d tb-pad-m
            lr-pad-d lr-pad-m" id="faqs">
                <h1 className="font-heading text-xl text-c-d">
                    { data?.title }
                </h1>
                <div className="faqs-block">
                    <div className="tabs-wrapper">
                        { renderTabs(data?.data) }
                    </div>
                    <div className="faqs">
                        { renderFaqs(data?.data[activeTab]?.content) }
                    </div>
                </div>
            </div>
            <style jsx>{`

                .faqs-container .faqs-block
                .tabs-wrapper {
                    margin: var(--peaky-gap-64) 0;
                }

                .faqs-container .faqs-block
                .tabs-wrapper .tab {
                    background: var(--primary-bg);
                    border-radius: var(--peaky-br-full);
                    padding: 12px var(--peaky-pad-32);
                    margin: 0 var(--peaky-gap-16) 0 0;
                }

                .faqs-container .faqs-block
                .tabs-wrapper .tab.active {
                    background: linear-gradient(180deg, #0E7DED 1.47%, #1739E6 101.42%);
                    font-weight: 600;
                }

                .faqs-container .faqs-block .faqs
                .faq-card {
                    background-color: var(--primary-bg);
                    padding: var(--peaky-pad-32);
                    margin: 0 0 var(--peaky-gap-32);
                }

                .faqs-container .faqs-block .faqs
                .faq-card .answer {
                    margin: var(--peaky-gap-8) 0 0;
                }

                .faqs-container .faqs-block .faqs
                .faq-card .question .icon-minus {
                    color: var(--primary);
                }

                .faqs-container .faqs-block .faqs
                .faq-card .answer > span {
                    opacity: 0.54;
                    white-space: pre-wrap;
                }

                @media only screen and (max-device-width: 760px) {
                    .faqs-container .faqs-block .tabs-wrapper {
                        display: flex;
                        overflow-y: auto;
                    }

                    .faqs-container .faqs-block .faqs
                    .faq-card {
                        padding: var(--peaky-pad-16);
                    }

                    .faqs-container .faqs-block .faqs 
                    .faq-card .answer {
                        width: 100%;
                    }

                    .faqs-container .faqs-block
                    .tabs-wrapper .tab {
                        min-width: max-content;
                    }
                }
            `}</style>
        </>
    )
}

export default Faqs;