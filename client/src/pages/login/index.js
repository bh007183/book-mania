import React, {useState} from 'react'
import {handleFormInput} from "../../utils"
import {useDispatch, useSelector} from "react-redux"
import {loginUserApi} from "../../state/user-slice"
import { useNavigate, Navigate } from 'react-router-dom'
import "./style.css"

export default function Login() {
    const [login, setLogin] = useState({
        email: "",
        password: "",
    })
  
    const dispatch = useDispatch()
    const loggedIn = useSelector(state =>  state.Store.User.loggedIn)

   const handleLogin = (event) => {
       event.preventDefault()
       dispatch(loginUserApi(login))
   }
if(loggedIn){
    console.log(loggedIn)
    return <Navigate to="/"/>;
}
    return (
        <div className="entryContain" >
           

            <form onSubmit={handleLogin} className="entryForm ">
       
                <section className="inputGrandparent">
                <div className="centerAlign inputParent">
                <input onChange={(event)=> {handleFormInput(event, login, setLogin)}} placeholder="Email" name="email" value={login.email}></input>
                </div>
                <div className="centerAlign inputParent">
                <input onChange={(event)=> {handleFormInput(event, login, setLogin)}}  placeholder="Password" name="password" value={login.password}></input>
                </div>
                
                <div className="centerAlign inputParent">
                <button>Login</button>
                </div>
                </section>
                
            </form>

            <div className="entryRows">
                <div className="firstCol"></div>
                <div className="secCol"></div>
            </div>

            <div className="entryRows">
            <div className="thirdCol"></div>
                <div className="fourthCol"></div>
            </div>
            
        </div>
    )
}
