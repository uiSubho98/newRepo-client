import React from "react";

interface Props {
    data ?: Content;
    handleScroll: Function;
}

interface Content {
    title ?: string;
    btn? : string;
}



const Contact = (props:Props) => {
    const { data , handleScroll} = props;
    

    return (
        <>
            <div className="contact-content-wrapper lr-pad-d tb-pad-d lr-pad-m tb-pad-m  ">
                <div className="contact-header f-d f-h-c">  
                    <h1 className="text-xl font-heading text-c-d" dangerouslySetInnerHTML={{__html: (data && data.title ? data.title : '')}}></h1>
                </div>
                <div className="action-block f-d f-h-c">
                    <button className="default-blue-btn" onClick={() => handleScroll()}>
                        {data && data.btn}
                    </button>
                </div>
            </div>
            
            <style jsx>{`

                .contact-content-wrapper{
                    background-color: var(--primary-bg);
                }

                .contact-header{
                    width:50%;
                    margin:1rem auto;
                }

                .contact-header .font-heading {
                    line-height: 42px;
                }

                .contact-content-wrapper .action-block {
                    margin: var(--peaky-gap-32) 0 0;
                }

                .contact-content-wrapper .action-block 
                .default-blue-btn {
                    padding: 0 3.5rem;
                }

                @media only screen and (max-device-width: 760px) {
                    .contact-header{
                        width:unset;
                    }
                }

                @media only screen and (max-device-width: 380px) {
                    .hero-content-wrapper {
                        height: 950px;
                        background-size: auto 450px;
                    }
                }

                @media only screen and (max-device-width: 320px) {
                    .hero-content-wrapper {
                        height: 880px;
                        background-size: auto 380px;
                    }
                }
            `}</style>
        </>
    )
}

export default Contact;