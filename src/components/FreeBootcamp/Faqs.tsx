import React from "react";
import Faq from "./Faq";

interface IFaq {
    question?: string;
    answer?: string;
}

interface IFaqs {
    title?: string;
    subTitle?: string;
    content?: Array<IFaq>;
}

interface IProps {
    data?: IFaqs
}

const Faqs = (props: IProps) => {

    const { data } = props;

    const renderFaqs = (faqList?: Array<IFaq>) => {

        return faqList && 
        faqList.map(faq => 
            <Faq data={faq} />
        );
    }

    return (
        <>
            <div className="faqs-wrapper lr-pad-d lr-pad-m
            tb-pad-d tb-pad-m">
                <h2 className="h2-heading">
                    { data && data.title }
                </h2>
                <h3 className="h3-heading sub-title">
                    { data && data.subTitle }
                </h3>
                <div className="faq-list">
                    { data && renderFaqs(data.content) }
                </div>
            </div>
            <style jsx>{`
                .faqs-wrapper .sub-title {
                    margin: var(--peaky-gap-32) 0 0;
                }

                .faqs-wrapper .faq-list .faq-card {
                    background: var(--dove);
                    box-shadow: var(--peaky-shadow);
                    border-radius: var(--peaky-br-4);
                    border: var(--peaky-border);
                    padding: var(--peaky-pad-16);
                    margin: var(--peaky-gap-24) 0;
                }

                .faqs-wrapper .faq-list .faq-card
                .header {
                    grid-template-columns: 8fr 1fr;
                }

                .faqs-wrapper .faq-list .faq-card
                .dropdown-icon  {
                    font-size:28px;
                    transform: rotate(0deg);
                    transition: all 0.4s;
                }

                .faqs-wrapper .faq-list .faq-card
                .dropdown-icon.active  {
                    transform: rotate(180deg);
                }

                .faqs-wrapper .faq-list .faq-card 
                .answer {
                    margin: var(--peaky-gap-32) 0;
                    white-space: pre-wrap;
                }

                @media only screen and (max-device-width: 760px) {

                    .faqs-wrapper .faq-list .faq-card {
                        width: 100%;
                    }
                }

                @media screen and (min-width: 768px) and (max-width: 1023px) 
                and (orientation: portrait) {
                    .faqs-wrapper .faq-list .faq-card {
                        width: 90%;
                    }
                }

            `}</style>
        </>
    )
}

export default Faqs;