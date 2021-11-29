import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notLoggedIn, getUserApi, findUserApi } from "../../state/user-slice";
import {Navigate} from "react-router-dom"
import {authenticated, handleFormInput} from "../../utils"
import "./style.css"

export default function ManageConnection() {
    const [search, setSearch] = useState({
        fullName: ""
    })
    const dispatch = useDispatch();
    const error = useSelector((state) => state.Store.User.Error);


    useEffect(() => {
      dispatch(getUserApi({ token: `bearer ${localStorage.getItem("Token")}` }));
    }, []);

    const state = useSelector((state) => state.Store.User);
    console.log(state);
    if (!authenticated()) {
      dispatch(notLoggedIn());
      return <Navigate to="/login" />;
    }

    const handleFormSubmit = (event) => {
        event.preventDefault()
        dispatch(findUserApi({token: `bearer ${localStorage.getItem("Token")}`, name: search.fullName}))

    }
    return (
        <div id="manageConnection">
           
            <h1>Manage Connections</h1>
            <div id="searchConnection">
                <h5>Find Friend</h5>
                <div id="searchContain">
                    <form onSubmit={handleFormSubmit}>
                    <input onChange={(event) => {handleFormInput(event, search, setSearch)}} name="fullName" value={search.fullName}placeholder="Search Name"></input>
                    <button type="submit">Search</button>
                    </form>

                </div>

            </div>
            <div id="viewConnections">

            </div>
            
        </div>
    )
}
