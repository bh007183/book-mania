import {createSlice} from "@reduxjs/toolkit"
import {apiCallBegan} from "./actions"

const slice = createSlice({
    name: 'Book',
    initialState: {
        success: '',
        error: '',
        nytBestSellers: [],
        classics: [],
        search: [],
        view: {}
    },
    reducers: {
        setSearch: (Book, action) => {
            console.log(action.payload.items)

            let adjusted = action.payload.items.map(book => {
                let title = book.volumeInfo.title;
                let authors;
                if (book.volumeInfo.authors) {
                  authors = "by" + " " + book.volumeInfo.authors[0];
                } else {
                  authors = "No Author Available";
                }
                let image;
                if (book.volumeInfo.imageLinks) {
                  image =
                    book.volumeInfo.imageLinks.thumbnail ||
                    book.volumeInfo.imageLinks.smallThumbnail;
                } else {
                  image = `https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png`;
                }
                let description;
                if (book.volumeInfo.description) {
                  description = book.volumeInfo.description;
                } else {
                  description = "No Description Available";
                }
                return {
                    id: book.id,
                    author: authors,
                    title: title,
                    description: description,
                    thumbnail: image,
                    externalLink: book.volumeInfo.infoLink
                  }
            })
             Book.search = adjusted
        },
        setBrowse: (Book, action) => {
            console.log(action.payload)
            Book.nytBestSellers = action.payload.nytBestSellers
            Book.classics = action.payload.classics
            Book.view = {}
        },
        success: (Book) => {
             Book.success = true
        },
        error: (Book, action) => {
            Book.error = action.response
        },
         resetErrorSuccess: (Book, action) => {
            Book.error = ""
            Book.Success = ""
        },
        


        setView: (Book, action) => {
            let uniqeObj = Book[action.payload.category].filter(book => book.id  === action.payload.id)[0]
      
            Book.view = uniqeObj

        },

       
       
    }
})


export const {setSearch,success, resetErrorSuccess,  error, setBrowse, setView} = slice.actions

export default slice.reducer

export const searchBooks = (book) => apiCallBegan({
    url: `https://www.googleapis.com/books/v1/volumes?q=` + book,
    onSuccess: setSearch.type,
    onError: error.type,

})
export const getBrowse = () => apiCallBegan({
    url: "https://bjh-book-mania-123.herokuapp.com/public/api/browse",
    onSuccess: setBrowse.type,
    onError: error.type,

})
