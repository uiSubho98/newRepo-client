import React from 'react';

const Contact = () => {
    return (
        <>
        <div className='contact-container'>
            <div className='contact-content container'>
          <p className='text-white'>
          We would love to hear from you. Whether you want to ask a question about our services, explore job opportunities, make a suggestion, or just say hello! We’re here for all your queries!
          </p>
          <div className='text-center'>
          <button className='contact-btn'>Contact Us</button>
          </div>
            </div>
        </div>


        <style jsx>
            {`
               .contact-container{
                margin-top: 100px;
                width: 100%;
                height:280px ;
                background-image: url('https://cdn.prograd.org/about_us/contact/contact-banner-2.jpg');
                position: relative;
                background-size: cover;
                text-align: center;
            }
            
            .contact-content {
                position: absolute;
                /* border: 1px solid red; */
                top: 0px;
                left: 0px;
                right: 0px;
                bottom: 0px;
                width: 1000px;
                align-items: center;
                margin-top: 85px;
                font-size: 15px;
            }
            
            .contact-btn{
            margin-top: 15px;
                background-color: #0E7DED;
                border: none;
                outline: none;
                height: 45px;
                width: 130px;
                color: white;
                padding: 0px;
                border-radius: 5px;
            }
            
            @media screen and (max-width: 768px) {
                .contact-container{
                    margin-top: 70px;
                    width: 100%;
                   
                    height:298px ;
                    background-image: url(../../assets/contact-banner-2.jpg);
                    position: relative;
                    /* border: 1px solid red; */
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                    margin: 0 auto;
                }
                
                .contact-content {
                    position: absolute;
                    margin-top: 44px;
                    padding-left: 0px;
                    padding-right: 0px;
                    /* border: 1px solid rgb(0, 255, 21); */
                    font-size: 18px;
                    text-align: left;
                    width: 90%;
            
                }
                
              
            }
            
            @media screen and (min-width: 768px) and (max-width: 992px) {
                .contact-container{
                    margin-top: 70px;
                    width: 100%;
                    height:298px ;
                    background-image: url(../../assets/contact-banner.png);
                    position: relative;
                }
                
                .contact-content {
                    position: absolute;
                    padding-left: 40px;
                    padding-right: 0px;
                    font-size: 20px;
                }
                
               
            
            }
             
            `}
        </style>
        </>
    );
};

export default Contact;