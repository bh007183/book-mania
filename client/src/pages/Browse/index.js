import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import { getBrowse } from "../../state/book-slice";
import BrowseComponent from "../../components/Browse";
import Search from "../../components/search";
import {Route, Routes, Link} from "react-router-dom"
import ViewBook from '../../pages/ViewBook';
import ViewUserLinkBook from '../../pages/ViewUserLinkBook';
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
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Navigate } from "react-router-dom";
import { authenticated, handleFormInput } from "../../utils";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import "./style.css";
export default function Browse() {
  const dispatch = useDispatch();
  // const [value, setValue] = React.useState(0);

  // const handleChange = (event) => {
  //   if(value === 0) {
  //     setValue(1)
  //   }else{
  //     setValue(0)
  //   }
   
  // };
  useEffect(() => {
    dispatch(getBrowse());

    // dispatch(getUserApi({ token: `bearer ${localStorage.getItem("Token")}` }));
    
  }, []);
  const bookState = useSelector((state) => state.Store.Book);
  if (!authenticated()) {
    dispatch(notLoggedIn());
    return <Navigate to="/login" />;
  }
 
  return (
    <div>
      <div>
      <Tabs aria-label="basic tabs example">
    
      <Link to="/browse" style={{textDecoration: "none", color: "black"}}><Tab label="Browse">  </Tab></Link>
      <Link to="/browse/search" style={{textDecoration: "none", color: "black"}}><Tab label="Search">  </Tab></Link>
        
         
        </Tabs>

      </div>
      <Routes>
      <Route path="/" element={<BrowseComponent/>}/>
      <Route path="search" element={<Search/>}/>
      <Route  path=":id/:category" element={<ViewBook/>}/>
          <Route  path="viewLink/:id/:category" element={<ViewUserLinkBook/>}/>
        
      
     
      </Routes>
      
    </div>
  );
}
