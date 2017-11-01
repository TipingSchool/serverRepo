// express setup
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const config = require('./models/config.js');
const port = process.env.PORT || config.port;
const router = require("./app/routes");

// third party modules
const morgan = require("morgan");
const async = require("async");
const parser = require("rss-parser");

// mongoDB methods wrapper
const mongoose = require("mongoose");
mongoose.connect(config.db_Url);
const db = mongoose.connection; 

// database connection
db.on("error", function(){
    console.log("Error in connecting to database, database server might not be running!!");
});

db.once("open", function(){
    console.log("Succesfully connected to database");
});

// application middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// for Cross Origin Resource Sharing issue (CORS)
app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers','Content-Type');
    next();
});

app.use("/", router); 

app.listen(port, function(){
    console.log(`Server running on port ${port}`);
});

