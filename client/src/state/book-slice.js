import {createSlice} from "@reduxjs/toolkit"
import {apiCallBegan} from "./actions"

const slice = createSlice({
    name: 'Book',
    initialState: {},
    reducers: {
        setBooks: (Book, action) => {
             Book = action.payload
        },
        error: (Book, action) => {
            Book.error = action.response
        }
    }
})


export const {setBooks, error} = slice.actions

export default slice.reducer

export const getBooks = (book) => apiCallBegan({
    url: `https://www.googleapis.com/books/v1/volumes?q=` + book,
    onSuccess: setBooks.type,
    onError: error.type,

})