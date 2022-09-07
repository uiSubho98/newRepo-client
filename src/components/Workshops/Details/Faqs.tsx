import React from "react";
import { IFaq } from "../workshops";
import Faq from "./Faq";

interface IProps {
    data: {
        title: string;
        list: Array<IFaq>;
    }
}

const Faqs = (props: IProps) => {

    const { data } = props;

    const renderFaqs = (faqs: Array<IFaq> = []) => {
        return faqs.map((faq: IFaq, idx: number) =>
            <Faq data={faq} key={idx} />
        )
    }

    return (
        <>
            <div className="faqs-container tb-pad-d tb-pad-m lr-pad-d lr-pad-m" id="faqs">
                <h1 className="font-heading text-xl text-c-m title">
                    {data.title}
                </h1>
                <div className="faqs-block">
                    <div className="faqs">
                        {renderFaqs(data.list)}
                    </div>
                </div>
            </div>
            <style jsx>{`
                .faqs-container {
                    width: 100%
                }

                .faqs-container .faqs-block {
                    margin-top: var(--peaky-gap-64);
                }

                .faqs-container .faqs-block .faqs .faq-card {
                    background-color: var(--primary-bg);
                    padding: var(--peaky-pad-32);
                    margin: 0 0 var(--peaky-gap-32);
                }

                .faqs-container .faqs-block .faqs .faq-card .answer {
                    margin: var(--peaky-gap-8) 0 0;
                }

                .faqs-container .faqs-block .faqs .faq-card .question .icon-minus {
                    color: var(--primary);
                }

                .faqs-container .faqs-block .faqs .faq-card .answer > span {
                    opacity: 0.54;
                    white-space: pre-wrap;
                }

                @media only screen and (max-device-width: 760px) {
                    .faqs-container .title {
                        line-height: 2.23rem;
                    }
                    
                    .faqs-container .faqs-block .faqs .faq-card {
                        padding: var(--peaky-pad-16);
                    }

                    .faqs-container .faqs-block .faqs .faq-card .answer {
                        width: 100%;
                    }
                }
            `}</style>
        </>
    )
}

export default Faqs;