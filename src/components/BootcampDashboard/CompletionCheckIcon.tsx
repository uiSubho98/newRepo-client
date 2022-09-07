import React from 'react';

interface IProps {
    status:string;
}

const CompletionCheckIcon:React.FC<IProps> = ({status}) => {
    return (
        <>
            <div className={`course-completion-check-icon ${status} f-d f-v-c f-h-c`}>
                <i className="icon icon-check"></i>
            </div>
        </>
    );
}

export default CompletionCheckIcon;
