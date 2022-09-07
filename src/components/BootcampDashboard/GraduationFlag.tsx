import React from 'react';
import graduation_flag from '../../assets/icons/svg_icons/graduation_flag.svg';

interface IProps {
    status: string;
}

const GraduationFlag = ({status}:IProps) => {
    return (
        <>
            <div className={`graduation-flag-icon ${status} f-d f-v-c f-h-c`}>
                <div className="icon bg-image-full" style={{backgroundImage: "url(" + graduation_flag + ")"}}></div>
            </div>
        </>
    );
}

export default GraduationFlag;
