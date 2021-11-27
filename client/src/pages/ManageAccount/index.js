import React, {useEffect, useRef, useState} from 'react'
import { authenticated } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { loginUserApi, notLoggedIn, getUserApi } from "../../state/user-slice";
import { Navigate } from "react-router-dom";
export default function ManageAccount() {
  const [edit, setEdit] = useState({})
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

    // Refs
    const firstNameEl = useRef(null);
    const lastNameEl = useRef(null);
    const emailEl = useRef(null);
    const passwordEl = useRef(null);

    const editStuff = (ref) => {
      if(ref.current.disabled === false){
        ref.current.disabled = true
      }else{
        setEdit({
          ...edit, [ref.current.name]: ref.current.value
        })
        ref.current.disabled = false
      }
      

    }
    // const editLastName = () => {
    //   setEdit({
    //     ...edit, [lastNameEl.current.name]: lastNameEl.current.value
    //   })
    //   [lastNameEl.current.disabled = false
    // }
    // const editEmail = () => {
    //   setEdit({
    //     ...edit, [emailEl.current.name]: emailEl.current.value
    //   })
    //   emailEl.current.disabled = false
    // }
    // const editPassword = () => {
    //   setEdit({
    //     ...edit, [passwordEl.current.name]: passwordEl.current.value
    //   })
    //   passwordEl.current.disabled = false
    // }

    return (
        <div>
            <div id="editContain">
              <div>
                <input ref={firstNameEl} disabled={true} placeholder="First Name" name="firstName" >{state.firstName}</input>
                <button onClick={()=>editStuff(firstNameEl)} >Edit</button>
              </div>
              <div>
                <input ref={lastNameEl} disabled={true} placeholder="Last Name" name="lastName">{state.lastName}</input>
                <button onClick={()=>editStuff(lastNameEl)}>Edit</button>
              </div>
              <div>
                <input ref={emailEl} disabled={true} placeholder="Email" name="email">{state.email}</input>
                <button onClick={()=>editStuff(emailEl)}>Edit</button>
              </div>
              <div>
                <input ref={passwordEl} disabled={true} placeholder="New Password" name="password"></input>
                <button onClick={()=>editStuff(passwordEl)}>Edit</button>
              </div>
              

            </div>
        </div>
    )
}
