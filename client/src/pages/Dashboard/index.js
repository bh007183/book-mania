import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  notLoggedIn, getUserApi } from "../../state/user-slice";


import { Navigate } from "react-router-dom";
import { authenticated } from "../../utils";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";


// Import Swiper styles
import "swiper/swiper-bundle.min.css";
// import "swiper/css/pagination"



// import Swiper core and required modules
import SwiperCore, { Pagination } from "swiper";
import "./style.css";
import PublicUrlCards from "../../components/cards/PublicUrlCards";
// install Swiper modules
SwiperCore.use([Pagination]);

export default function Dashboard() {
  const dispatch = useDispatch();
  
  useEffect(() => {
   
    dispatch(getUserApi({ token: `bearer ${localStorage.getItem("Token")}` }));
  }, []);
  const state = useSelector((state) => state.Store.User);
  
  if (!authenticated()) {
    dispatch(notLoggedIn());
    return <Navigate to="/login" />;
  }
 console.log(state)
  return (
    <div className="mainPageContain">
      <div id="dashboardMe">
        <p id="dashboardText">Hey There {state.firstName + " " + state.lastName}!</p>
        <span>Here is what we have going on:</span>
        <div id="statsBoxWraper">
          <div className="statsBox">
            <p>Number of Friends</p>
            <h3>{state.connection.length}</h3>
            

          </div>
          
          <div className="statsBox">
            {state.usercurrent ? <>
          <p>You Are Currently Reading:</p>
            <h3>{state.usercurrent.title}</h3>
            </> : <p>Your Not Currently Reading Anything</p>}
            

          </div>
          <div className="statsBox">
            <p>Books in reading list</p>
            <h3>{state.readingList.length}</h3>
            

          </div>
         

        </div>

      </div>
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
          {state.recommended.length > 0 ? state.recommended.map((book) => (
            <SwiperSlide>
   
              <PublicUrlCards  name={book.recommended.firstName + " " + book.recommended.lastName + " " + "recommended you read:"}  category={"recommended"} book={book} />
            </SwiperSlide>
          )) : <h3>No current recommendations</h3>}
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
          {state.connection.length > 0 ? state.connection.map((book) => {
            if (book.usercurrent) {
              return (
                <SwiperSlide>
                  
                  <PublicUrlCards  name={book.firstName + " " + book.lastName + " " + "is reading:"}  category={"friendReading"} book={book.usercurrent} />
                </SwiperSlide>
              );
            }
          }) : <h3>Your friends are not reading anything.</h3>}
        </Swiper>
      </div>
      <div
        className="carouselContain"
        style={{ backgroundColor: "var(--green)" }}
      >
        <h3>Books in your reading list</h3>
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
          {state.readingList.length > 0 ? state.readingList.map((book) => {
            
              return (
                <SwiperSlide>
                  <PublicUrlCards  category={"readingList"} book={book} />
                </SwiperSlide>
              );
            
          }) : <h3>You have not books in your reading list.</h3>}
        </Swiper>
      </div>


    </div>
  );
}
