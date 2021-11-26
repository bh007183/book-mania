import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUserApi, notLoggedIn, getUserApi } from "../../state/user-slice";
import { nytBestSellers } from "../../state/book-slice";

import { Navigate } from "react-router-dom";
import { authenticated } from "../../utils";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import RecommendCards from "../../components/cards/RecommendCards";
import ConnectionReadingCards from "../../components/cards/ConnectionReading";
// Import Swiper styles
import "swiper/swiper-bundle.min.css";
// import "swiper/css/pagination"



// import Swiper core and required modules
import SwiperCore, { Pagination } from "swiper";
import "./style.css";
// install Swiper modules
SwiperCore.use([Pagination]);

export default function Dashboard() {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.Store.User.Error);
  let token = localStorage.getItem("Token") || null;
  useEffect(() => {
    dispatch(nytBestSellers())
    dispatch(getUserApi({ token: `bearer ${localStorage.getItem("Token")}` }));
  }, []);
  const state = useSelector((state) => state.Store.User);
  console.log(state);
  if (!authenticated()) {
    dispatch(notLoggedIn());
    return <Navigate to="/login" />;
  }

  return (
    <div className="mainPageContain">
      <div
        className="carouselContain"
        style={{ backgroundColor: "var(--lightgreen)" }}
      >
        <h3>Recommended By Your Connections</h3>
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
          {state.recommended.map((book) => (
            <SwiperSlide>
              <RecommendCards recommended={book} />
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
          className="mySwiper"
        >
          {state.connection.map((book) => {
            if (book.usercurrent) {
              return (
                <SwiperSlide>
                  <ConnectionReadingCards book={book} />
                </SwiperSlide>
              );
            }
          })}
        </Swiper>
      </div>

      {/* <Caraselle header="Your Reading List" background="var(--darkgreen)" /> */}
    </div>
  );
}
