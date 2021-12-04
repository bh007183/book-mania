import {createSlice} from "@reduxjs/toolkit"
import {apiCallBegan} from "./actions"

const slice = createSlice({
    name: 'Book',
    initialState: {
        success: '',
        error: '',
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
            
            let uniqeObj;
            let standardObj;
            console.log(uniqeObj)
            //If Book data came from NYT API
            if(action.payload.category === "nytBestSellers"){
                uniqeObj = Book[action.payload.category].filter(book =>  book.primary_isbn13 === action.payload.id)[0]
                standardObj = {
                    title: uniqeObj.title,
                    author: uniqeObj.author,
                    description: uniqeObj.description,
                    thumbnail: uniqeObj.book_image,
                    externalLink: uniqeObj.amazon_product_url

                }
            }else{
                //If Book data came from google API
                uniqeObj = Book[action.payload.category].filter(book => book.id  === action.payload.id)[0]
                let title = uniqeObj.volumeInfo.title;
                let authors;
                let description;
                let image;
                let externalLink;
                if (uniqeObj.volumeInfo.authors) {
                  authors = "by" + " " + uniqeObj.volumeInfo.authors[0];
                } else {
                  authors = "No Author Available";
                }
                if (uniqeObj.volumeInfo.imageLinks) {
                  image =
                    uniqeObj.volumeInfo.imageLinks.thumbnail ||
                    uniqeObj.volumeInfo.imageLinks.smallThumbnail;
                } else {
                  image = `https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png`;
                }
                if (uniqeObj.volumeInfo.description) {
                  description = uniqeObj.volumeInfo.description;
                } else {
                  description = "No Description Available";
                }
                if(uniqeObj.volumeInfo.infoLink){
                    externalLink = uniqeObj.volumeInfo.infoLink
                }

                standardObj = {
                    title: title,
                    author: authors,
                    description: description,
                    thumbnail: image,
                    externalLink: externalLink

                }
            }
            Book.view = standardObj

        },

       
       
    }
})


export const {setBooks,success, resetErrorSuccess,  error, setBrowse, setView} = slice.actions

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
