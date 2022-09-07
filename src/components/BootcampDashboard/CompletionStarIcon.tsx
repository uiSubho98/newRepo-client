import React from 'react';
import completion_star from '../../assets/icons/svg_icons/completion_star.svg';

interface Props {
    status: string
}

const CompletionStarIcon = (props: Props) => {
    const {status} = props;
    return (
        <>
            <div className={`course-completion-star-icon ${status} f-d f-v-c f-h-c`}>
                <div className="star-icon bg-image-full" style={{backgroundImage: "url(" + completion_star + ")"}}></div>
            </div>
        </>
    );
}

export default CompletionStarIcon;
