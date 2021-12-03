import {createSlice} from "@reduxjs/toolkit"
import {apiCallBegan} from "./actions"

const slice = createSlice({
    name: 'Book',
    initialState: {
        nytBestSellers: [],
        classics: [],
        view: {}
    },
    reducers: {
        setBooks: (Book, action) => {
             Book = action.payload
        },
        setBrowse: (Book, action) => {
            console.log(action.payload)
            Book.nytBestSellers = action.payload.nytBestSellers
            Book.classics = action.payload.classics
        },

        setView: (Book, action) => {
            Book.view = Book[action.payload.category].filter(book => book.id === action.payload.id)[0]
        },

       
        error: (Book, action) => {
            Book.error = action.response
        }
    }
})


export const {setBooks, error, setBrowse, setView} = slice.actions

export default slice.reducer

export const getBooks = (book) => apiCallBegan({
    url: `https://www.googleapis.com/books/v1/volumes?q=` + book,
    onSuccess: setBooks.type,
    onError: error.type,

})
export const getBrowse = () => apiCallBegan({
    url: "http://localhost:8080/public/api/browse",
    onSuccess: setBrowse.type,
    onError: error.type,

})
