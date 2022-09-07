import React,{useState} from "react";

interface IFaq {
    question?: string;
    answer?: string;
}

interface IProps {
    data?: IFaq;
}

const Faq = (props:IProps) => {
    const [isExpanded, setExpansionState] = useState<boolean>(false);
    const { data } = props;
    let activeClass = "";
    if(isExpanded) activeClass = "active";
    return (
        <div className="w-60 c-pointer faq-card" 
        onClick={() => setExpansionState(!isExpanded)}>
            <div className="g-d g-v-c header">
                <span className="f-d body-regular question">
                    { data && data.question }
                </span>
                <span className="f-d f-h-c text-c-d icon-container">
                    <i className={`icon icon-chevron-down 
                    dropdown-icon ${activeClass}`}></i>
                </span>
            </div>
            {
                activeClass &&
                <div className="answer">
                    <span className="body-small">
                        { data && data.answer }
                    </span>
                </div>
            }
        </div>
    )
}

export default Faq;