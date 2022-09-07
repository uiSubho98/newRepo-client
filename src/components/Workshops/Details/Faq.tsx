import React, { useState } from 'react';

interface IFaq {
    question: string;
    answer: string;
}

interface IProps {
    data: IFaq;
}

const Faq = (props: IProps) => {
    const { data } = props;

    const [isActive, setActive] = useState<boolean>(false);

    return (
        <div className="faq-card c-pointer" onClick={() => setActive(!isActive)}>
            <div className="f-d f-h-sb question">
                <span className="text-medium strong-text">
                    {data?.question}
                </span>
                <span className="text-big strong-text">
                    {
                        <i className={`icon icon-${isActive ?
                            "minus" : "plus"}`}></i>
                    }
                </span>
            </div>
            {
                isActive &&
                <div className="w-80 answer">
                    <span className="text-regular">
                        {data?.answer}
                    </span>
                </div>
            }
        </div>
    )
}

export default Faq;