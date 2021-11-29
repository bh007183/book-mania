import {createSlice} from "@reduxjs/toolkit"
import {apiCallBegan} from "./actions"

const slice = createSlice({
    name: 'User',
    initialState: {
        UserId: "",
        Error: "",
        Success: "",
        firstName : "",
        lastName: "",
        email: "",
        pendingconnection: [],
        connection: [],
        readingList: [],
        recommended: [],
        usercurrent: {},
        readingHistory: []
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
        success: (User, action) => {
            User.Success = true

        },

        resetError: (User, action) => {
            console.log(action)
            User.Error = ""
        },
        resetSuccess: (User, action) => {
            User.Success = ""

        },
        setUser: (User, action) => {
            
            User.firstName = action.payload.firstName;
            User.lastName= action.payload.lastName;
            User.email = action.payload.email
            User.pendingconnection= action.payload.pendingconnection;
            User.connection= action.payload.connection;
            User.readingList= action.payload.readingList;
            User.recommended= action.payload.recommended
            User.usercurrent=action.payload.usercurrent
            User.readingHistory = action.payload.readingHistory
        }
    }
})


export const { error, setToken,notLoggedIn, setUser, success, resetSuccess, resetError} = slice.actions

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
export const updateUserApi = (data) => apiCallBegan({
    url: "http://localhost:8080/dashboard/user",
    headers: {
        authorization: data.token,
    },
    method: "PUT",
    data,
    onSuccess: success.type,
    onError: error.type,

})
export const findUserApi = (data) => apiCallBegan({
    url: "http://localhost:8080/dashboard/finduser",
    headers: {
        authorization: data.token,
    },
    method: "GET",
    data,
    onSuccess: success.type,
    onError: error.type,

})