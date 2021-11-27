import {createSlice} from "@reduxjs/toolkit"
import {apiCallBegan} from "./actions"

const slice = createSlice({
    name: 'User',
    initialState: {
        UserId: "",
        Error: "",
        loggedIn: false,
        firstName : "",
        lastName: "",
        pendingconnection: [],
        connection: [],
        readingList: [],
        recommended: [],
        usercurrent: {}
    },
    reducers: {
        setToken: (User, action) => {
            localStorage.setItem("Token", action.payload.token)
            User.UserId = action.payload._id
            User.loggedIn = true
        },
        notLoggedIn: (User, action) => {
            User.loggedIn = false
        },
        
        error: (User, action) => {
            console.log(action)
            User.Error = action.payload
        },
        setUser: (User, action) => {
            
            User.firstName = action.payload.firstName;
            User.lastName= action.payload.lastName;
            User.pendingconnection= action.payload.pendingconnection;
            User.connection= action.payload.connection;
            User.readingList= action.payload.readingList;
            User.recommended= action.payload.recommended
            User.usercurrent=action.payload.usercurrent
        }
    }
})


export const { error, setToken,notLoggedIn, setUser} = slice.actions

export default slice.reducer

export const createUserApi = (data) => apiCallBegan({
    url: "http://localhost:8080/api/user",
    method: "POST",
    data,
    onSuccess: setToken.type,
    onError: error.type,

})
export const loginUserApi = (data) => apiCallBegan({
    url: "http://localhost:8080/api/login",
    method: "POST",
    data,
    onSuccess: setToken.type,
    onError: error.type,

})
export const getUserApi = (data) => apiCallBegan({
    url: "http://localhost:8080/dashboard",
    headers: {
        authorization: data.token,
    },
    method: "GET",
    data,
    onSuccess: setUser.type,
    onError: error.type,

})