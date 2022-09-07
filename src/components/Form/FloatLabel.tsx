import React, { ReactNode, useState } from "react";

import "./floatLabel.css";

interface FloatLabelProps {
    label: string, 
    value?: number, 
    customClass?: string,
    children : ReactNode
}

const FloatLabel: React.FC<FloatLabelProps> = ({ children, label, value, customClass }) => {
    const [focus, setFocus] = useState(false);

    const labelClass =
        focus || (value && value !== 0) ? "label label-float" : "label";

    return (
        <div
            className={`float-label ${customClass !== undefined ? customClass : ''}`}
            onBlur={() => setFocus(false)}
            onFocus={() => setFocus(true)}
        >
            {children}
            <label className={labelClass}>{label}</label>
        </div>
    );
};

export default FloatLabel;
