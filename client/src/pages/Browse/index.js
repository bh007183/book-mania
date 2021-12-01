import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import { nytBestSellers, olClassics } from "../../state/book-slice";
import PublicUrlCards from "../../components/cards/PublicUrlCards";
import {
  notLoggedIn,
  getUserApi,
  findUserApi,
  addConnectionApi,
  resetError,
  resetSuccess,
  resetSearch,
  removeConnectionAPI
} from "../../state/user-slice";
import { Navigate } from "react-router-dom";
import { authenticated, handleFormInput } from "../../utils";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import "./style.css";
export default function Browse() {
    const dispatch = useDispatch()
    const nyBest = useSelector(state => state.Store.Book.nytBestSellers)
    useEffect(() => {
        dispatch(nytBestSellers())
        dispatch(olClassics())
        dispatch(getUserApi({ token: `bearer ${localStorage.getItem("Token")}` }));
      }, []);

      if (!authenticated()) {
        dispatch(notLoggedIn());
        return <Navigate to="/login" />;
      }
   console.log(nyBest)
    return (
        <div>
            <div
        className="carouselContain"
        style={{ backgroundColor: "black" }}
      >
        <h3>NY Best Sellers</h3>
        <Swiper
          slidesPerView={"auto"}
          centeredSlides={true}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          breakpoints= {{
           
            // when window width is >= 480px
            600: {
              slidesPerView: 2,
              spaceBetween: 30
            },
            // when window width is >= 640px
            1000: {
              slidesPerView: 3,
              spaceBetween: 40
            }
          }}
          className="mySwiper"
        >
          {nyBest.map((book) => (
            <SwiperSlide>
              <PublicUrlCards bestSeller={book} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div
        className="carouselContain"
        style={{ backgroundColor: "var(--green)" }}
      >
        <h3>Your Friends Are Reading</h3>
        <Swiper
           slidesPerView={"auto"}
           centeredSlides={true}
           spaceBetween={30}
           pagination={{
             clickable: true,
           }}
           breakpoints= {{
            
             // when window width is >= 480px
             700: {
               slidesPerView: 2,
               spaceBetween: 30
             },
             // when window width is >= 640px
             1000: {
               slidesPerView: 3,
               spaceBetween: 40
             }
           }}
           className="mySwiper"
        >
          {/* {state.connection.map((book) => {
            if (book.usercurrent) {
              return (
                <SwiperSlide>
                  <ConnectionReadingCards book={book} />
                </SwiperSlide>
              );
            }
          })} */}
        </Swiper>
      </div>
            
        </div>
    )
}
