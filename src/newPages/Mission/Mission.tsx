import React from 'react';
import './Mission.css'

const Mission = () => {
    return (
        <>
            <div className='container'>
            <h2 className='text-white mission text-header text-center'>The Mission</h2>
            <div className='mission-text container'>
            <p className='text-white'>At ProGrad we are creating an ecosystem to help tech organisations build unmatched capabilities. Our mission is to identify diverse entry-level talent with great potential and provide cutting-edge training to enable tech companies onboard work-ready candidates!</p>
            </div>
        </div>

        <style jsx>
            {`
                .text-header{
                    font-size: 36px;
                    font-family: 'Inconsolata', monospace;
                    font-weight: 900;
                    text-align: center;
                }
                .mission{
                    margin-top: 56px;
                }
                
                .mission-text{
                    /* border: 1px solid red; */
                    font-size: 20px;
                    margin-top: 56px;
                    margin-bottom: 120px;
                    /* padding-left: 36px; */
                    padding-right: 0px!important;
                    
                    width: 1000px;
                    /* padding-right: 55px; */
                
                }
                
                @media screen and (max-width: 768px) {
                    .mission{
                        margin-top: 56px;
                    }
                    .mission-text{
                        margin: 0 auto;
                        /* border: 1px solid rgb(146, 230, 11); */
                        font-size: 15px;
                        width: 95% ;
                        padding-left: 0px!important; 
                        margin-top: 26px;
                    }
                
                
                }
                
                @media screen and (min-width: 768px) and (max-width: 992px) {
                    .mission-text{
                        margin: 0 auto;
                        /* border: 1px solid rgb(146, 230, 11); */
                        font-size: 20px;
                        width: 100%;
                        
                    }
                }
                
            
            `}
        </style>
        </>
    );
};

export default Mission;