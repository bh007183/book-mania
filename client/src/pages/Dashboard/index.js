import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {loginUserApi, notLoggedIn, getUserApi} from "../../state/user-slice"
import Caraselle from "../../components/caraselle"
import {Navigate} from "react-router-dom"
import {authenticated} from "../../utils"


export default function Dashboard() {
    const dispatch = useDispatch()
    const error = useSelector(state => state.Store.User.Error)
    let token = localStorage.getItem("Token") || null
    useEffect(() => {
        dispatch(getUserApi({token: `bearer ${localStorage.getItem("Token")}`}))
         
    }, [])
    const state = useSelector(state => state.Store.User)
    console.log(state)
     if(!authenticated()){
        dispatch(notLoggedIn())
        return <Navigate to="/login"/>
     }

    
        return (
            <div className="mainPageContain">
                
                <Caraselle header="Recommended By Your Followers" background="var(--lightgreen)" recommended={state.recommended}/>
                <Caraselle header="Your Friends Are Reading" background="var(--green)"/>
                <Caraselle header="Your Reading List" background="var(--darkgreen)"/>
              
              
                
                
            </div>
        )
     
    
}


