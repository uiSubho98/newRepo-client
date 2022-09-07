import React, { useEffect, useState } from 'react';
import { IFaq } from '../../interfaces/bootcamp';

interface IProps {
    data?: IFaq;
    activeTab: number;
}

const Faq = (props: IProps) => {
    const { data, activeTab } = props;

    const [isActive, setActive] = useState<boolean>(false);

    useEffect(() => {
        setActive(false);
    }, [activeTab])

    return (
        <div className="faq-card">
            <div className="c-pointer f-d f-h-sb question" 
            onClick={() => setActive(!isActive) }>
                <span className="text-medium strong-text">
                    { data?.question }
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
                        { data?.answer }
                    </span>
                </div>
            }
        </div>
    )
}

export default Faq;