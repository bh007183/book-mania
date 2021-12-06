import {createSlice} from "@reduxjs/toolkit"
import {apiCallBegan} from "./actions"

const slice = createSlice({
    name: 'User',
    initialState: {
        UserId: "",
        Error: "",
        loggedIn: '',
        Success: "",
        firstName : "",
        lastName: "",
        email: "",
        pendingconnection: [],
        connection: [],
        readingList: [],
        recommended: [],
        usercurrent: {},
        readingHistory: [],
        userSearch: [],
        view: {}
    },
    reducers: {
        setToken: (User, action) => {
            localStorage.setItem("Token", action.payload.token)
            window.location.replace("/dashboard") 
        },
     
        error: (User, action) => {
            console.log(action)
            User.Error = action.payload
        },
        success: (User, action) => {
            if(action.payload.message){
                User.Success = action.payload.message
            }else{
                User.Success = true
            }
        },
        resetError: (User, action) => {
            User.Error = ""
        },
        resetSuccess: (User, action) => {
            User.Success = ""

        },
        setSearch: (User, action) => {
         User.userSearch = action.payload
        },
        resetSearch: (User, action) => {
            User.userSearch = []
        },
        updatePendingConnection: (User, action) => {
            User.pendingconnection = User.pendingconnection.filter(user => user._id !== action.payload._id)
        },
        updateConnection: (User, action) => {
            User.connection = User.connection.filter(user => user._id !== action.payload._id)
        },
        setUser: (User, action) => {
            
            User.firstName = action.payload.firstName;
            User.lastName= action.payload.lastName;
            User.email = action.payload.email;
            User.pendingconnection= action.payload.pendingconnection;
            User.connection= action.payload.connection;
            User.readingList= action.payload.readingList;
            User.recommended= action.payload.recommended
            User.usercurrent=action.payload.usercurrent
            User.readingHistory = action.payload.readingHistory
            User.loggedIn = true
        },
        notLoggedIn: (User, action) => {
            User.firstName = "";
            User.lastName= "";
            User.email = ""
            User.pendingconnection = "";
            User.connection = "";
            User.readingList = "";
            User.recommended = "";
            User.usercurrent = "";
            User.readingHistory = ""
            User.loggedIn = ""
        },
        setUView: (User, action) => {
            let book;
            console.log(action.payload)
            console.log(User.recommended)
            if(User[action.payload.category]){
                book = User[action.payload.category].filter(book => book._id === action.payload.id)[0]
            }else{
                book = User.connection.filter(connection => connection.usercurrent._id === action.payload.id)[0]
                book = book.usercurrent
            }
           
            
            User.view = book

        }
    }
})


export const { error,setUView, setToken,notLoggedIn, resetSearch, updateConnection, setUser,updatePendingConnection, success, resetSuccess, resetError, setSearch} = slice.actions

export default slice.reducer

export const createUserApi = (data) => apiCallBegan({
    url: "http://localhost:8080/public/api/user",
    method: "POST",
    data,
    onSuccess: setToken.type,
    onError: error.type,

})
export const loginUserApi = (data) => apiCallBegan({
    url: "http://localhost:8080/public/api/login",
    method: "POST",
    data,
    onSuccess: setToken.type,
    onError: error.type,

})
export const getUserApi = (data) => apiCallBegan({
    url: "http://localhost:8080/protected/api",
    headers: {
        authorization: data.token,
    },
    method: "GET",
    data,
    onSuccess: setUser.type,
    onError: error.type,

})
export const updateUserApi = (data) => apiCallBegan({
    url: "http://localhost:8080/protected/api/user",
    headers: {
        authorization: data.token,
    },
    method: "PUT",
    data,
    onSuccess: success.type,
    onError: error.type,

})
export const findUserApi = (data) => apiCallBegan({
    url: "http://localhost:8080/protected/api/finduser/" + data.name,
    headers: {
        authorization: data.token,
    },
    method: "GET",
    onSuccess: setSearch.type,
    onError: error.type,

})

export const addConnectionApi = (data) => apiCallBegan({
    url: "http://localhost:8080/protected/api/connect/ask",
    headers: {
        authorization: data.token,
    },
    method: "PUT",
    data,
    onSuccess: success.type,
    onError: error.type,

})
export const responseConnectionApi = (data) => apiCallBegan({
    url: "http://localhost:8080/protected/api/connect/response",
    headers: {
        authorization: data.token,
    },
    method: "PUT",
    data,
    onSuccess: updatePendingConnection.type,
    onError: error.type,

})
export const removeConnectionAPI = (data) => apiCallBegan({
    url: "http://localhost:8080/protected/api/remove/connection",
    headers: {
        authorization: data.token,
    },
    method: "PUT",
    data,
    onSuccess: updateConnection.type,
    onError: error.type,

})

export const addCurrentReading = (data) => apiCallBegan({
    url: "http://localhost:8080/protected/api/currentreading",
    headers: {
        authorization: data.token,
    },
    method: "PUT",
    data,
    onSuccess: success.type,
    onError: error.type,

})
export const addreadingList = (data) => apiCallBegan({
    url: "http://localhost:8080/protected/api/readinglist",
    headers: {
        authorization: data.token,
    },
    method: "PUT",
    data,
    onSuccess: success.type,
    onError: error.type,

})

export const addRecommendation = (data) => apiCallBegan({
    url: "http://localhost:8080/protected/api/recommend",
    headers: {
        authorization: data.token,
    },
    method: "PUT",
    data,
    onSuccess: success.type,
    onError: error.type,

})


export const removeBookFromList = (data) => apiCallBegan({
    url: "http://localhost:8080/protected/api/remove-from-list",
    headers: {
        authorization: data.token,
    },
    method: "PUT",
    data,
    onSuccess: success.type,
    onError: error.type,

})