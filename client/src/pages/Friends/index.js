import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import FriendComponent from "../../components/SendRequestButton"

import "./style.css";

export default function ManageConnection() {
  const [search, setSearch] = useState({
    fullName: "",
  });
  const dispatch = useDispatch();
  const error = useSelector((state) => state.Store.User.Error);
  const results = useSelector((state) => state.Store.User.userSearch);
  const success = useSelector((state) => state.Store.User.Success);

  useEffect(() => {
    dispatch(getUserApi({ token: `bearer ${localStorage.getItem("Token")}` }));
    return () => {
      dispatch(resetError());
      dispatch(resetSuccess());
      dispatch(resetSearch());
    };
  }, []);

  const state = useSelector((state) => state.Store.User);

  if (!authenticated()) {
    dispatch(notLoggedIn());
    return <Navigate to="/login" />;
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    dispatch(resetSearch());
    dispatch(
      findUserApi({
        token: `bearer ${localStorage.getItem("Token")}`,
        name: search.fullName,
      })
    );
  };

  const addConnection = (event) => {
    dispatch(
      addConnectionApi({
        token: `bearer ${localStorage.getItem("Token")}`,
        followId: event.currentTarget.value,
      })
    );
  };
  const removeConnection = (event) => {
    console.log(event.target.value);
    dispatch(
        removeConnectionAPI({
        token: `bearer ${localStorage.getItem("Token")}`,
        followId: event.currentTarget.value,
      })
    );
  };
  return (
    <div id="manageConnection">
      <div
        style={{
          width: "100vw",
          margin: "0px",
          padding: "10px",
          textAlign: "center",
        }}
      >
        <h1>Manage Connections</h1>
      </div>
      <div id="cardWrapper">
        <div id="searchConnection">
          <h3>Find Friend</h3>
          <div id="searchContain">
            <form onSubmit={handleFormSubmit}>
              <input
                onChange={(event) => {
                  handleFormInput(event, search, setSearch);
                }}
                name="fullName"
                value={search.fullName}
                placeholder="Search Name"
              ></input>
              <button type="submit">Search</button>
            </form>
          </div>
          <div id="searchResultsGrandParent">
            <div id="searchResultsParent">
              {results.length < 1 && error ? <h4>{error}</h4> : <></>}
              {results.map((user) => {
                return (
                  <div>
                    <div className="resultComponent">
                      <div className="nameColumn alignCenter">
                        <p>{user.firstName + " " + user.lastName}</p>
                      </div>
                      <div className="buttonColumn">
                       
                        <FriendComponent user={user} addConnection={addConnection}/>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <section id="viewConnections">
          <h3>Your Connections</h3>
          <div>
            {state.connection.map((user) => {
              return (
                <div>
                  <div className="resultComponent">
                    <div className="nameColumn alignCenter">
                      <p>{user.firstName + " " + user.lastName}</p>
                    </div>
                    <div className="buttonColumn">
                      <button onClick={removeConnection} value={user._id} className="removeConnectionButton"><DeleteOutlineIcon value={user._id}/></button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
