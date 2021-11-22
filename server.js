const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./config/db-connection");
// Sets up the Express App
require("dotenv").config()
var PORT = process.env.PORT || 8080;


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// var corsOptions = {
//   origin: 'https://bjh-hop-estore.herokuapp.com'
// }
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

// Change force: to true if it's cool for the site to remove database items.
db.once("open", ()=>{
    app.listen(PORT, function () {
        console.log("App listening on PORT http://localhost:" + PORT);
      })
})
  ;
