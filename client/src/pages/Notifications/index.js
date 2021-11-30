import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenticated } from "../../utils";
import "./style.css";
import {
  notLoggedIn,
  getUserApi,
  resetError,
  resetSuccess,
  resetSearch,
  responseConnectionApi
} from "../../state/user-slice";
import { Navigate } from "react-router-dom";
export default function Notifications() {
  const dispatch = useDispatch();
  const connectionRequests = useSelector(
    (state) => state.Store.User.pendingconnection
  );
  useEffect(() => {
    dispatch(getUserApi({ token: `bearer ${localStorage.getItem("Token")}` }));
    return () => {
      dispatch(resetError());
      dispatch(resetSuccess());
      dispatch(resetSearch());
    };
  }, []);
  if (!authenticated()) {
    dispatch(notLoggedIn());
    return <Navigate to="/login" />;
  }

  const handleAccept = (event) => {
    dispatch(responseConnectionApi({ token: `bearer ${localStorage.getItem("Token")}`, followId: event.target.value, accept: true }));
  };
  const handleReject = (event) => {
    dispatch(responseConnectionApi({ token: `bearer ${localStorage.getItem("Token")}`, followId: event.target.value, accept: false }));
  };
  return (
    <div id="notificationContain">
      <div id="connectionCard">
        { connectionRequests.length > 0 ? connectionRequests.map((user) => (
          <div className="requestComponent">
            <div className="noteNameColumn centerAlign">
              <p>
                {user.firstName +
                  " " +
                  user.lastName +
                  " " +
                  "is requestion to connect"}
              </p>
            </div>
            <div className="noteButtonColumn">
              <button
                onClick={handleAccept}
                value={user._id}
                className="acceptConnectionButton"
              >
                Connect
              </button>
              <button
                onClick={handleReject}
                value={user._id}
                className="rejectConnectionButton"
              >
                Decline
              </button>
            </div>
          </div>
        )) : <h3>No notifications</h3>}
      </div>
    </div>
  );
}
