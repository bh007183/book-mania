import React, {useState} from 'react'
import {handleFormInput} from "../../utils"
import "./style.css"
import {createUserApi} from "../../state/user-slice"
import {  Navigate } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
export default function Create() {
    const [create, setCreate] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: ""
    })
const dispatch = useDispatch()

const handleCreate = (event) => {
    event.preventDefault()
    dispatch(createUserApi(create))
}


    
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