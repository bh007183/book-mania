import React, {useState} from 'react'
import {handleFormInput} from "../../utils"
import {useDispatch, useSelector} from "react-redux"
import {loginUserApi} from "../../state/user-slice"
import {  Navigate, Link } from 'react-router-dom'
import "./style.css"

export default function Login() {
    const [login, setLogin] = useState({
        email: "",
        password: "",
    })
  
    const dispatch = useDispatch()
    const user = useSelector(state =>  state.Store.User)


   const handleLogin = (event) => {
       event.preventDefault()
       dispatch(loginUserApi(login))
   }
if(user.loggedIn){
    console.log(user)
    let route = `/dashboard`
    return <Navigate to={route} />;
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
                <div className="alter">
                <Link to="/create-account">Dont have an account?</Link>
            </div>
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
