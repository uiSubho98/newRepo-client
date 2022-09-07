import React from "react";

interface Props {
    data ?: Content;
}

interface Content {
    description ?: string;
    imgSrc?: string;
}



const FeatureList = (props:Props) => {
    const { data } = props;
    
    return (
        <>
            
            <div className="feature-lists">
                <img className="img-icon" src={data && data.imgSrc} alt="Feature"></img>
                <div className="desc text-medium text-c-d" > {data && data.description} </div>
            </div>

            <style jsx>{`
            
                .feature-lists{
                    margin:var(--peaky-gap-48) 0 0;
                    width:20%;
                }

                .feature-lists .img-icon {
                    background-repeat: no-repeat;
                    background-position: center;
                    height: 64px;
                    display: block;
                    margin-left: auto;
                    margin-right: auto;
                    width: 64px;
                }

                .feature-lists .desc{
                    margin:1rem 0;
                }

                @media only screen and (max-device-width: 760px) {
                    .feature-lists{
                        width: 100%;
                    }
                }

                @media only screen and (max-device-width: 380px) {
                    
                }

                @media only screen and (max-device-width: 320px) {
                    
                }
            `}</style>
        </>
    )
}

export default FeatureList;