import React from "react";

interface IProps {
    id?: number;
    status: string;
}

const NumberListIcon:React.FC<IProps> = ({id, status}) => {
    return (
        <div className={`number-list-check-icon ${status} f-d f-v-c f-h-c`}>
            <span className="body-small strong-text" >
                #{id}
            </span>
        </div>
    )
}

export default NumberListIcon;