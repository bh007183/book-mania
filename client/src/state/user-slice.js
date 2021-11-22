import {createSlice} from "@reduxjs/toolkit"
import {apiCallBegan} from "./actions"

const slice = createSlice({
    name: 'User',
    initialState: {
        Error: ""
    },
    reducers: {
        setUser: (User, action) => {
             User = action.payload
        },
        loginUser: (User, action) => {
             User = action.payload
        },
        error: (User, action) => {
            console.log(action)
            User.Error = action.payload
        }
    }
})


export const {setUser, error} = slice.actions

export default slice.reducer

export const createUserApi = (data) => apiCallBegan({
    url: "http://localhost:8080/api/user",
    method: "POST",
    data,
    onSuccess: setUser.type,
    onError: error.type,

})
export const loginUserApi = (data) => apiCallBegan({
    url: "http://localhost:8080/api/user",
    header: data.token,
    method: "POST",
    data,
    onSuccess: setUser.type,
    onError: error.type,

})