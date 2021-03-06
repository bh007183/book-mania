import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import { getBrowse } from "../../state/book-slice";
import PublicUrlCards from "../../components/cards/PublicUrlCards";
import {Route, Routes} from "react-router-dom"
import uniqid from "uniqid";
import {
  notLoggedIn,
  getUserApi,
  findUserApi,
  addConnectionApi,
  resetError,
  resetSuccess,
  resetSearch,
  removeConnectionAPI,
} from "../../state/user-slice";
import { Navigate } from "react-router-dom";
import { authenticated, handleFormInput } from "../../utils";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";


export default function BrowseComponent() {
    const bookState = useSelector((state) => state.Store.Book);
    return (
        <>
        <div
        className="carouselContain"
        style={{ backgroundColor: "var(--black)" }}
      >
        <h3 style={{ color: "white" }}>NY Best Sellers</h3>
        <Swiper
          slidesPerView={"auto"}
          centeredSlides={true}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            // when window width is >= 480px
            700: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            // when window width is >= 640px
            1000: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
          className="mySwiper"
        >
          {bookState.nytBestSellers.map((book) => (
            <SwiperSlide key={uniqid()}>
              <PublicUrlCards category="nytBestSellers" book={book} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div
        className="carouselContain"
        style={{ backgroundColor: "var(--lightBlack)" }}
      >
        <h3 style={{ color: "white" }}>Classics</h3>
        <Swiper
          slidesPerView={"auto"}
          centeredSlides={true}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            // when window width is >= 480px
            700: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            // when window width is >= 640px
            1000: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
          className="mySwiper"
        >
          {bookState.classics.map((book, index) => (
            <SwiperSlide key={uniqid()}>
              <PublicUrlCards category="classics" book={book} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      </>
    )
}
