import React from "react";
import { useSelector } from "react-redux";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import Recommended from "../../components/cards/recommendedCards"
// Import Swiper styles
import "swiper/swiper-bundle.min.css";
// import "swiper/css/pagination"

import "./style.css";

// import Swiper core and required modules
import SwiperCore, { Pagination } from "swiper";

// install Swiper modules
SwiperCore.use([Pagination]);

export default function Caraselle(props) {
  console.log(props)
  return (
    <>
      <div
        className="carouselContain"
        style={{ backgroundColor: props.background }}
      >
        <h3>{props.header}</h3>
        <Swiper
          slidesPerView={"auto"}
          centeredSlides={true}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          className="mySwiper"
        >
          {props.recommended ? (
            props.recommended.map((book) =>  <SwiperSlide><Recommended recommended={book}/></SwiperSlide>)
            
          ) : (
            <SwiperSlide>Slide 1</SwiperSlide>
          )}
        </Swiper>
      </div>
    </>
  );
}
