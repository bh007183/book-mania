import React, {useState} from 'react'
import {handleFormInput} from "../../utils"
import "./style.css"

export default function Create() {
    const [create, setCreate] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: ""
    })



    
        return (
            <div className="entryContain" >
    
                <form className="entryForm ">
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