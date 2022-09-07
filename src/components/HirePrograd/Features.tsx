import React from "react";
import { IFeatureList } from "./HirePrograd";
import FeatureList from "./FeatureList";

interface Props {
    data ?: Content;
}

interface Content {
    title ?: string;
    featureList :  Array<IFeatureList>;
}



const Features = (props:Props) => {
    const { data } = props;
    
    const renderFeatures = ()=>{
        let list = data && data.featureList.map((f, index) => <FeatureList data = {f}  key = {index} />)
        return list
        
    }

    return (
        <>
            <div className="hire-prograd feature-content-wrapper lr-pad-d tb-pad-d lr-pad-m tb-pad-m">
                <h1 className="text-xl font-heading text-c-d" dangerouslySetInnerHTML={{__html: (data && data.title ? data.title : '')}}></h1>
                <div className="f-d f-h-sa f-vt-m">     
                    {data && renderFeatures()}
                </div>
            </div>
            <style jsx>{`
                @media only screen and (max-device-width: 380px) {
                   
                }

                @media only screen and (max-device-width: 320px) {
                   
                }
            `}</style>
        </>
    )
}

export default Features;