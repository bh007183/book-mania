import React, {useState, useEffect} from 'react'
import {handleFormInput} from "../../utils"
import "./style.css"
import {createUserApi, resetSuccess} from "../../state/user-slice"
import {  Navigate, Link } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
export default function Create() {
    const [create, setCreate] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: ""
    })
const dispatch = useDispatch()
const user = useSelector(state =>  state.Store.User)


const handleCreate = (event) => {
    event.preventDefault()
    dispatch(createUserApi(create))
}

// if(user.success){
//     console.log(user)
//     let route = `/dashboard`
//     return <Navigate to={route} />;
// }
    
        return (
            <div className="entryContain" >
    
                <form onSubmit={handleCreate} className="entryForm ">
                    <section className="inputGrandparent">
                    <div className="centerAlign inputParent">
                    <input onChange={(event)=> {handleFormInput(event, create, setCreate)}}  placeholder="firstName" name="firstName" value={create.firstName}></input>
                    </div>
                    <div className="centerAlign inputParent">
                    <input onChange={(event)=> {handleFormInput(event, create, setCreate)}}  placeholder="lastName" name="lastName" value={create.lastName}></input>
                    </div>
                    <div className="centerAlign inputParent">
                    <input onChange={(event)=> {handleFormInput(event, create, setCreate)}} placeholder="Email" name="email" value={create.email}></input>
                    </div>
                    <div className="centerAlign inputParent">
                    <input onChange={(event)=> {handleFormInput(event, create, setCreate)}}  placeholder="Password" name="password" value={create.password}></input>
                    </div>
                    
                    
                    <div className="centerAlign inputParent">
                    <button>Create</button>
                    </div>
                    </section>
                    <div className="alter">
                <Link to="/login">Login</Link>
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