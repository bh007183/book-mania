import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  notLoggedIn,
  getUserApi,
  findUserApi,
  addConnectionApi,
  resetError,
  resetSuccess,
  resetSearch
} from "../../state/user-slice";
import { Navigate } from "react-router-dom";
import { authenticated, handleFormInput } from "../../utils";
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
      dispatch(resetSearch())
    };
  }, []);

  const state = useSelector((state) => state.Store.User);
  console.log(state);
  if (!authenticated()) {
    dispatch(notLoggedIn());
    return <Navigate to="/login" />;
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    dispatch(resetSearch())
    dispatch(
      findUserApi({
        token: `bearer ${localStorage.getItem("Token")}`,
        name: search.fullName,
      })
    );
  };

  const addConnection = (event) => {
    console.log(event.target.value);
    dispatch(
      addConnectionApi({
        token: `bearer ${localStorage.getItem("Token")}`,
        followId: event.target.value,
      })
    );
  };
  return (
    <div id="manageConnection">
      <h1>Manage Connections</h1>
      <div id="searchConnection">
        <h5>Find Friend</h5>
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
                      {success ? (
                        <button
                          onClick={addConnection}
                          disabled={true}
                          className="addUserButton"
                        >
                          Request Sent
                        </button>
                      ) : (
                        <button
                          onClick={addConnection}
                          value={user._id}
                          className="addUserButton"
                        >
                          Connect
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div id="viewConnections"></div>
    </div>
  );
}
