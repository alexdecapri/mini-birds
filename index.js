// Dependencies
var express = require("express");
var bodyParser = require("body-Parser");
var cors = require("cors");
var mongojs = require("mongojs");

// Mongo
var db = mongojs("birdsDatabase");
var Bird = db.collection("birds"); //capitalized because constructor function that canbe used later on
// var Place = db.collecton("places");

// Express
var app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors);

// Create
app.post("/api/sighting", function(req, res) {
  Bird.insert(req.body, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

app.get("/api/sighting", function(req, res) {
  console.log(res);
  res.send(res);
})

// Connection
var port = 3000;
app.listen(port, function() {
  console.log("watching you on port " + port)
});
