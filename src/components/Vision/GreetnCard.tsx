import React from "react";

const GreetnCard = (props: any) => {
    const urlParams = new URLSearchParams(window.location.search);
    const text = urlParams.get('text');
    const img = urlParams.get('img');
    return (
        <>
            <div className='greeting-canvas bg-image-full h2-heading f-d f-h-c f-v-c '
                 style={{backgroundImage: `url(https://cdn.progradjunior.org/greetn/b${img}.png)`}}>
                {text}
            </div>
            <style jsx>
                {`
                  .greeting-canvas{                
                    width: 900px;
                    height: 500px;
                       color: white;
                       padding: 10rem;
                       text-align: center;
               }
               @media print {
                * {
                    -webkit-print-color-adjust: exact;
                }
              }
            `}
            </style>
        </>
    );
};

export default GreetnCard;
