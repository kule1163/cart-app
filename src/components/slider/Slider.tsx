import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "../../styles.css";

// import required modules
import { Pagination } from "swiper";

const Slider = () => {
  return (
    <>
    <Swiper
      slidesPerView={3}
      spaceBetween={30}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="mySwiper"
    >
      <SwiperSlide>Slide 1</SwiperSlide>
    
    </Swiper>
  </>
  )
}

export default Slider