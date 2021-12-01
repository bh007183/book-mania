import {createSlice} from "@reduxjs/toolkit"
import {apiCallBegan} from "./actions"

const slice = createSlice({
    name: 'Book',
    initialState: {
        nytBestSellers: [],
        classics: []
    },
    reducers: {
        setBooks: (Book, action) => {
             Book = action.payload
        },
        setNYBooks: (Book, action) => {
            Book.nytBestSellers = action.payload.results.books
        },
        setClassics: (Book, action) => {
            console.log(action.payload)

        },
        error: (Book, action) => {
            Book.error = action.response
        }
    }
})


export const {setBooks, error, setClassics,setNYBooks} = slice.actions

export default slice.reducer

export const getBooks = (book) => apiCallBegan({
    url: `https://www.googleapis.com/books/v1/volumes?q=` + book,
    onSuccess: setBooks.type,
    onError: error.type,

})
export const nytBestSellers = () => apiCallBegan({
    url: `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=` + process.env.REACT_APP_NYT,
    onSuccess: setNYBooks.type,
    onError: error.type,

})
export const olClassics = () => apiCallBegan({
    url: `https://openlibrary.org/subjects/classic_literature.json`,
    onSuccess: setClassics.type,
    onError: error.type,

})