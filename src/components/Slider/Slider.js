import React from 'react';
import './Slider.css'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y } from "swiper";

// Import Swiper styles
import "swiper/css";
// import required modules
import slider1 from '../../Assets/slider-1.png'
import slider2 from '../../Assets/slider-2.png'



const Slider = () => {
    return (
        <div className='container slider-content'>
           <div className='slider-image-container'>
           <Swiper
        slidesPerView={1}
        spaceBetween={50}
        loop={true}
        autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay,A11y] }
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
    );
};

export default Slider;