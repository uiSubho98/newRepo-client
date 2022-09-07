import React from 'react';

const FocusIcon = ({width, height, activeLayout}) => {
    return (
        <svg className="focus-icon" width={width} height={height} viewBox="0 0 24 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M0 9H24V17H0V9ZM0 0H24V8H0V0Z" fill="#AAAEBC"/>
        </svg>
    );
}

export default FocusIcon;
