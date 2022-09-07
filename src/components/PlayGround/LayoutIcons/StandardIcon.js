import React from 'react';

const StandardIcon = ({width, height, activeLayout}) => {
    return (
        <svg className="standard-icon" width={width} height={height} viewBox="0 0 24 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M0 9H24V17H0V9ZM0 0H7V8H0V0ZM8.5 0H15.5V8H8.5V0ZM17 0H24V8H17V0Z" fill="#AAAEBC"/>
        </svg>
    );
}

export default StandardIcon;
