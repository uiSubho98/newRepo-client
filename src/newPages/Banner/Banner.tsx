import React from 'react';
const Banner = () => {
    
    return (
       <>
        <section className='top-banner'>
           <div className="banner-text container">
            <h2 className='text-white'>To fuel the world’s technology transformation.</h2>
            <p className='text-white'>
            Our vision is to bridge the IT talent gap and support the global transition to new technologies by supplying the industry with a high-impact workforce skilled in emerging technologies.
            </p>
           </div>
        </section>


        <style jsx>

   { `  .top-banner{
    width: 100%;
    height: 443px;
    /* border: 1px solid red; */
    background-image: url("https://cdn.prograd.org/about_us/banner/about_us_banner.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
    margin-top: 82px;
    // border: 2px solid green;
}

.banner-text{
    width:1000px;
    height: 236px;
    //  border: 2px solid green; 
    margin-top: 50px;
    margin: 0 auto;
    top: 100px;
    left: 0;
    right: 0;
    bottom:0;
    position: absolute;
    padding: 0px;
}

.banner-text h2{
    font-size:70px;
    letter-spacing: 2px;
    font-family: 'Inconsolata', monospace;
    font-style: normal;
    font-weight: 900;
    padding-right: 0px;

}

.banner-text p{
    margin-top: 15px;
    width: 1000px;
    font-size: 20px;
    color:#FFFFFFDE!important;
    /* border: 1px solid red; */
    
    padding-right: 0px!important;
    
}




@media screen and (max-width: 768px) {
    .top-banner{
        width: 100%;
        margin: 0 auto;
        height: 180px;
        //  border: 1px solid red; 
        background-image:  url("https:/cdn.prograd.org/about_us/banner/about_us_banner.jpg");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        position: relative;
    }

    .banner-text{
        width: 100%;
        height: 126px;
        /* border: 2px solid green; */
        margin: 0 auto;
        margin-top: -23px;
        
    }
    .banner-text h2{
        font-size: 22px;
        font-family: 'Inconsolata', monospace;
        font-style: normal;
        font-weight: 900;
        padding-left: 20px;
        padding-right: 20px;
        /* border: 1px solid red; */


    }

    .banner-text p{
        margin-top: 15px;
        width: 100%;
        padding-left: 20px;
        padding-right: 20px!important;
        font-size: 12px;

        
    }


}

@media screen and (min-width: 768px) and (max-width: 992px) {
    .banner-text{
        width: 100%;
        height: 236px;
        /* border: 2px solid green; */
        margin: 0 auto;
        margin-top: 55px;
        padding-left: 50px;
        
    }
    .banner-text h2{
        font-size: 45px;
        font-family: 'Inconsolata', monospace;
        font-style: normal;
        font-weight: 900;
        

    }

    .banner-text p{
        margin-top: 20px;
        width: 100%;
        padding-right: 40px;
       
    }

}
    `}
  
        </style>
       </>
      
    );

};


export default Banner;