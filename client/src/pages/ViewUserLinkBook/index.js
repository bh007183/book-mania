import React, { useEffect, useState } from "react";
import { setView } from "../../state/book-slice";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { addCurrentReading, addreadingList,  setUView , removeRecommendedBook} from "../../state/user-slice";
import { authenticated } from "../../utils";
import { Navigate } from "react-router-dom";
import Box from "@mui/material/Box";
import FriendCube from "../../components/FriendCube"
import "./style.css";
import {
  notLoggedIn,

} from "../../state/user-slice";

import Modal from "@mui/material/Modal";

export default function ViewUserLinkBook() {
  const dispatch = useDispatch();

  let view = useSelector((state) => state.Store.User.view)
  

  let friendList = useSelector((state) => state.Store.User.connection)
  useEffect(() => {
    let data = window.location.pathname.split("/");
    
      let obj = {
        category: data[4],
        id: data[3],
      };
      dispatch(setUView(obj));
    
    
  }, []);



  const [open, setOpen] = React.useState(false);
  // Handle Model Open Close
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  if (!authenticated()) {
    dispatch(notLoggedIn());
    return <Navigate to="/login" />;
  }
  console.log(view);
  const handleCurrentRead = () => {
    console.log("it works");
    dispatch(
      addCurrentReading({
        token: `bearer ${localStorage.getItem("Token")}`,
        book: view,
      })
    );
  };
  const handleReadingList = () => {
    dispatch(
      addreadingList({
        token: `bearer ${localStorage.getItem("Token")}`,
        book: view,
      })
    );
  };

  const handleRemoveFromRecommended = () => {
    dispatch(
      removeRecommendedBook({
        token: `bearer ${localStorage.getItem("Token")}`,
        book: view,
      })
    );
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h1 className="centerAlign">{view.title}</h1>
        </Grid>

        <Grid className="centerAlign" item xs={12} md={4}>
          <div>
            <p className="centerAlign">{view.author}</p>
            <img src={view.thumbnail} />
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <p>{view.description}</p>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container spacing={2}>
            <Grid className="centerAlign" xs={12} item>
              <Button
                onClick={handleCurrentRead}
                style={{ width: "250px" }}
                variant="contained"
              >
                Mark As Reading
              </Button>
            </Grid>
            <Grid className="centerAlign" xs={12} item>
              <Button
                onClick={handleReadingList}
                style={{ width: "250px" }}
                variant="contained"
              >
                Add To Reading List
              </Button>
            </Grid>
            <Grid className="centerAlign" xs={12} item>
              <Button
                onClick={handleOpen}
                style={{ width: "250px" }}
                variant="contained"
              >
                Recommend To Friend
              </Button>
            </Grid>
            <Grid className="centerAlign" xs={12} item>
              <a
                style={{ textDecoration: "none" }}
                target="_blank"
                href={view.externalLink}
              >
                <Button style={{ width: "250px" }} variant="contained">
                  External
                </Button>
              </a>
            </Grid>
            <Grid className="centerAlign" xs={12} item>
             
                <Button onClick={handleRemoveFromRecommended} style={{ width: "250px" }} variant="contained">
                  Remove
                </Button>
            
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Modal  open={open} id="friendModal">
        <>
      <div item xs={12} className="centerAlign">
            <Button onClick={handleClose} variant="contained" style={{marginTop: "10px"}}>Close</Button>
          </div>
        <Box style={{overflowY: "scroll", height: "90%"}}>
      
          <Grid  container  spacing={2}>
            
            <Grid item  className="flexBox" xs={12}>

              {friendList.map(friend => <FriendCube _id={friend._id}  firstName={friend.firstName} lastName={friend.lastName}/>)}

            </Grid>
           
          </Grid>
          </Box>
     </>
      </Modal>
    </>
  );
}