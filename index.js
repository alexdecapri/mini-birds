// Dependencies
var express = require("express");
var bodyParser = require("body-Parser");
var cors = require("cors");
var mongojs = require("mongojs");

// Mongo
var db = mongojs("birdsDatabase");
var Bird = db.collection("birds"); //capitalized because constructor function that canbe used later on
var Place = db.collecton("places");

// Express
var app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors);

// Connection
var port = 3000;
app.listen(port, function() {
  console.log("watching you on port " + port)
});
