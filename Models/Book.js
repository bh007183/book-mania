const {Schema, model} = require("mongoose")
const commentSchema = require("./Comments")
const bookSchema = new Schema({
    title: {
        type: String,

    },
    description:{
        type: String,
    },
    thumbnail:{
        type: String,
    },

    comments: {
        type: [commentSchema ]
    }

})

const Book = model("Book", bookSchema)
module.exports = Book