import React from 'react';
import './Slider.css'
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
// import required modules
import SwiperCore, {
    Autoplay,Pagination,Navigation
  } from 'swiper/core';
  
  SwiperCore.use([Autoplay,Pagination,Navigation]);

const Slider = () => {
    return (
       <>
         <div className='container slider-content'>
           <div className='slider-image-container'>
           <Swiper
           
           data-swiper-autoplay="2000"
        slidesPerView={1}
        spaceBetween={50}
        loop={true}
        autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            
          }} 
       
          breakpoints={{
            640:{
                slidesPerView:1,
                spaceBetween:300,
            },
            768:{
                slidesPerView:1,
                spaceBetween:300,
            },
            1024:{
                slidesPerView:3,
                spaceBetween:300,
            },

        }}
       
        className="mySwiper"
      >
        <div className='fixed-left'>

        </div>
        <SwiperSlide>
            <img className='slider-card-image' src="https:/cdn.prograd.org/about_us/slider/slider1.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img className='slider-card-image' src="https:/cdn.prograd.org/about_us/slider/slider2.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
        <img className='slider-card-image' src="https:/cdn.prograd.org/about_us/slider/slider7.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
        <img className='slider-card-image' src="https:/cdn.prograd.org/about_us/slider/slider3.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
        <img className='slider-card-image' src="https:/cdn.prograd.org/about_us/slider/slider4.jpg" alt="" />
        </SwiperSlide>

        <SwiperSlide>
        <img className='slider-card-image' src="https:/cdn.prograd.org/about_us/slider/slider6.jpg" alt="" />
        </SwiperSlide>

        <SwiperSlide className='last-image'>
        <img className='slider-card-image'  src="https:/cdn.prograd.org/about_us/slider/slider5.jpg" alt="" />
        </SwiperSlide>

        <div className='fixed-left2'>
</div>

      </Swiper>
           </div>
        </div>

        <style jsx>
{`
    .slider-content{
        width: 1020px;
        height: 212px;
        margin-top: -280px!important;
        /* border: 1px solid red; */
    }
    .slider-card-image{
        /* border: 1px solid white; */
        width: 350px;
    }
    
    .fixed-left{
        width: 250px;
        height: 250px;
        /* border: 1px solid yellow; */
        position: relative;
        z-index: 2;
        top:-250px;
        background-image: linear-gradient(to right, rgb(0, 0, 0) , rgba(255, 255, 255, 0));
    
    }
    
    .fixed-left2{
        width: 277px;
        height: 210px;
        /* border: 1px solid yellow; */
        position: relative;
        z-index: 3;
        left: 720px;
        top:-460px;
        background-image: linear-gradient(to left, rgb(0, 0, 0) , rgba(255, 255, 255, 0));
    
    }
    
    
    
    
    .slider-image-container{
        /* border: 1px solid red; */
        margin-left: 0px;
        margin-right: 0px;
    }
    
    
    
    
    @media screen and (max-width: 768px) {
        .slider-content{
            width: 95%;
            height: 212px;
            margin-top: -280px!important;
            /* border: 1px solid red; */
        }
        .slider-card-image{
            /* border: 4px solid rgb(223, 66, 66); */
            width: 100%;
            border-radius:5px;
        }
        .fixed-left{
            display: none;
        }
        
        .fixed-left2{
           display: none;
        
        }
        
    
    }
    
    @media screen and (min-width: 768px) and (max-width: 992px) {
        
        .slider-image-container{
           
            margin-left: 0px!important;
            margin-right: 0px!important;
        }
    
    }
    
`}
            
        </style>
       </>
    );
};

export default Slider;