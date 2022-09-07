import React from "react";
import loading_gif from '../../assets/gif/loading.gif';

const Spinner = () => {
    return (
        <>
        <div className="loading-container f-d f-v-c f-h-c lr-pad-d lr-pad-m tb-pad-d">
            <div className="loading-gif bg-image" style={{backgroundImage: 'url(' + loading_gif + ')'}}></div>
        </div>

        <style jsx>
            {`
            #root {
                margin-top: 0;
            }

            .loading-gif {
                margin-top: 10rem;
                width: 75px;
                height: 75px;
            }
            `}
        </style>
        </>
    );
};

export default Spinner;
