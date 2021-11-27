import React, {useEffect} from 'react'
import { authenticated } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { loginUserApi, notLoggedIn, getUserApi } from "../../state/user-slice";
import { Navigate } from "react-router-dom";
export default function ManageAccount() {
    const dispatch = useDispatch();
    const error = useSelector((state) => state.Store.User.Error);
    let token = localStorage.getItem("Token") || null;
    useEffect(() => {
      
      dispatch(getUserApi({ token: `bearer ${localStorage.getItem("Token")}` }));
    }, []);
    const state = useSelector((state) => state.Store.User);
    console.log(state);
    if (!authenticated()) {
      dispatch(notLoggedIn());
      return <Navigate to="/login" />;
    }
    return (
        <div>
            manage account
        </div>
    )
}
