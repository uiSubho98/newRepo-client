import React from 'react';
import './JoinUs.css'


const JoinUs = () => {
    return (
        <>
        <div className='join-container'>
        <div className='contact-content join container'>
      <p className='text-white join'>
      Dedicated to technology? Enjoy developing, creating or coaching? We are looking for you!
      </p>
      <div className='text-center'>
      <button className='contact-btn'>Join Us</button>
      </div>
        </div>
    </div>

    <style jsx>
{`
  .join-container{
    margin-top: 56px;
    width: 100%;
    height:280px ;
    background-image: url(https://cdn.prograd.org/about_us/join_us/join_us.jpg);
    position: relative;
    /* border: 1px solid red; */
    text-align: center;
}
@media screen and (max-width: 768px) {
    .join-container{
        margin-top: 56px;
        width: 100%;
        height:200px ;
        background-image: url(https://cdn.prograd.org/about_us/join_us/join_us.jpg);
        position: relative;
        /* border: 1px solid red; */
        background-repeat: no-repeat;
        background-size: 100% 100%;
        text-align: center;
    }
    .join{
        margin: 0 auto;
        margin-top: 14px;
        /* border: 1px solid red; */
        height:84px;
    }
}  

`}

    </style>
    </>
    );
};

export default JoinUs;