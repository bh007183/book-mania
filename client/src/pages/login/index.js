import React, {useState, useEffect} from 'react'
import {handleFormInput} from "../../utils"
import {useDispatch, useSelector} from "react-redux"
import {loginUserApi, resetSuccess, resetError} from "../../state/user-slice"
import {  Navigate, Link } from 'react-router-dom'
import ErrorMessage from "../../components/error"
import "./style.css"

export default function Login() {
    const [login, setLogin] = useState({
        email: "",
        password: "",
    })
  
    const dispatch = useDispatch()
    const user = useSelector(state =>  state.Store.User)
    const error = useSelector(state => state.Store.User.Error)

useEffect(() => {
    return () => {
        dispatch(resetError())
    }
}, [])
   const handleLogin = (event) => {
       event.preventDefault()
       dispatch(loginUserApi(login))
   }

    return (
        <div className="entryContain" >
           
         
            <form onSubmit={handleLogin} className="entryForm ">
            {error ? <ErrorMessage message={error}/> : <></>}
                <section className="inputGrandparent">
                <div className="centerAlign inputParent">
                <input onChange={(event)=> {handleFormInput(event, login, setLogin)}} placeholder="Email" name="email" value={login.email}></input>
                </div>
                <div className="centerAlign inputParent">
                <input type="password" onChange={(event)=> {handleFormInput(event, login, setLogin)}}  placeholder="Password" name="password" value={login.password}></input>
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
