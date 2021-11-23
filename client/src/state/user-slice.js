import {createSlice} from "@reduxjs/toolkit"
import {apiCallBegan} from "./actions"

const slice = createSlice({
    name: 'User',
    initialState: {
        Error: "",
        loggedIn: false
    },
    reducers: {
        setUser: (User, action) => {
            console.log(action.payload)
             User = action.payload
        },
        loginUser: (User, action) => {
           
            localStorage.setItem("Token", action.payload.token)
            User.loggedIn = true
        },
        error: (User, action) => {
            console.log(action)
            User.Error = action.payload
        }
    }
})


export const {setUser, error, loginUser} = slice.actions

export default slice.reducer

export const createUserApi = (data) => apiCallBegan({
    url: "http://localhost:8080/api/user",
    method: "POST",
    data,
    onSuccess: setUser.type,
    onError: error.type,

})
export const loginUserApi = (data) => apiCallBegan({
    url: "http://localhost:8080/api/login",
    header: data.token,
    method: "POST",
    data,
    onSuccess: loginUser.type,
    onError: error.type,

})