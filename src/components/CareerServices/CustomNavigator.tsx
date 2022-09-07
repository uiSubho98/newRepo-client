import React from "react";

const CustomArrow = (props : any) => {
    const { className, style, onClick, type } = props;
    return (
        <div className={className} style={{ ...style, display: "block" }} onClick={onClick}>
            <i className={`icon icon-chevron-${type}`}></i>
        </div>
    );
};

export default CustomArrow;
