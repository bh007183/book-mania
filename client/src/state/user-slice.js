import {createSlice} from "@reduxjs/toolkit"
import {apiCallBegan} from "./actions"

const slice = createSlice({
    name: 'User',
    initialState: {
        Error: "",
        loggedIn: false
    },
    reducers: {
        setToken: (User, action) => {
            localStorage.setItem("Token", action.payload.token)
            User.loggedIn = true
        },
        notLoggedIn: (User, action) => {
            User.loggedIn = false
        },
        
        error: (User, action) => {
            console.log(action)
            User.Error = action.payload
        }
    }
})


export const { error, setToken,notLoggedIn} = slice.actions

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
    header: data.token,
    method: "POST",
    data,
    onSuccess: setToken.type,
    onError: error.type,

})