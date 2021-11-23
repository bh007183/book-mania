import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {loginUserApi} from "../../state/user-slice"
import {Navigate} from "react-router-dom"

export default function Dashboard() {
    const dispatch = useDispatch()
    const error = useSelector(state => state.Store.User.Error)
    let token = localStorage.getItem("Token") || null
    

     if(error){
        return <Navigate replace to="/login" />
     }else{
        return (
            <div>
                Hi
            </div>
        )
     }
    
}
