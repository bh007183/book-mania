import {createSlice} from "@reduxjs/toolkit"
import {apiCallBegan} from "./actions"

const slice = createSlice({
    name: 'Book',
    initialState: {
        nytBestSellers: []
    },
    reducers: {
        setBooks: (Book, action) => {
             Book = action.payload
        },
        consoleBooks: (Book, action) => {
            console.log(action.payload)
            Book.nytBestSellers = action.payload.results.books
        },
        error: (Book, action) => {
            Book.error = action.response
        }
    }
})


export const {setBooks, error, consoleBooks} = slice.actions

export default slice.reducer

export const getBooks = (book) => apiCallBegan({
    url: `https://www.googleapis.com/books/v1/volumes?q=` + book,
    onSuccess: setBooks.type,
    onError: error.type,

})
export const nytBestSellers = () => apiCallBegan({
    url: `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=` + process.env.REACT_APP_NYT,
    onSuccess: consoleBooks.type,
    onError: error.type,

})