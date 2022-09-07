import React from "react";
import { IFeature } from "../../interfaces/talent-solutions";

interface IProps {
    data: IFeature;
}

const Feature = (props: IProps) => {
    const { name, gist, image } = props.data;
    return (
        <div className="bg-image feature" style={{ 
            backgroundImage: 'url(' + image + ')'}}
        >
            <h1 className="font-heading name">{ name }</h1>
            <p className="text-big gist">{ gist }</p>
        </div>
    )
}

export default Feature;