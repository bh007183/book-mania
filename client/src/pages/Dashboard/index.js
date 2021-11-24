import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {loginUserApi, notLoggedIn} from "../../state/user-slice"

import {Navigate} from "react-router-dom"
import {authenticated} from "../../utils"


export default function Dashboard() {
    const dispatch = useDispatch()
    const error = useSelector(state => state.Store.User.Error)
    let token = localStorage.getItem("Token") || null
    
     if(!authenticated()){
        dispatch(notLoggedIn())
        return <Navigate to="/login"/>
     }
     
        
   
        return (
            <div>
                Hi
            </div>
        )
     
    
}


