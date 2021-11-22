const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO_DB || 'mongodb://localhost/book_mania')

module.exports = mongoose.connection