import React from "react";

interface IProps {
    id:number;
    timing:string;
    selectedSlot:string;
    handleClick:Function;
}

const Slot = (props:IProps) => {
    const { id, timing, selectedSlot, handleClick } = props;

    let activeClass = "";
    if(timing === selectedSlot){
        activeClass = " active"
    }

    return (
        <div className={`g-d g-v-c w-90 c-pointer slot${activeClass}`}
        onClick={() => handleClick(id)}>
            <span className="f-d dot"></span>
            <span className="body-small">
                { timing }
            </span>
        </div>
    )
}

export default Slot;