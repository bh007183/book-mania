import {combineReducers} from "redux"
import userReducer from "./user-slice"
import bookReducer from "./book-slice"


export default combineReducers({
    User: userReducer,
    Book: bookReducer,
})