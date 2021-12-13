const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./config/db-connection");
const mongoose = require("mongoose")
const path = require("path")
// Sets up the Express App
require("dotenv").config()
var PORT = process.env.PORT || 8080;


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var corsOptions = {
  origin: 'https://bjh-book-mania-123.herokuapp.com'
}
// corsOptions
app.use(cors());
// Static directory
// app.use(express.static("public"));
/////////////////////////////////


// Routes
// =============================================================

app.use(require("./routes"))
// Syncing our sequelize models and then starting our Express app
// =============================================================
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// app.get("*", (req, res) => {
 
//   res.sendFile(path.join(__dirname, "/client/build/index.html"));
// });

// mongoose.connect(process.env.MONGO_DB || 'mongodb://localhost/book_mania', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// Change force: to true if it's cool for the site to remove database items.
// db.once("open", ()=>{
    app.listen(PORT, function () {
        console.log("App listening on PORT http://localhost:" + PORT);
      })
      // })

  ;
