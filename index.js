// Dependencies
var express = require("express");
var bodyParser = require("body-Parser");
var cors = require("cors");
var mongojs = require("mongojs");

// Mongo
var db = mongojs("birds");
var Sighting = db.collection("sightings"); //capitalized because constructor function that canbe used later on
// var Sighting = db.collecton("sightings");

// Express
var app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Create
// app.post("/api/sighting", function(req, res) {
//   Bird.insert(req.body, function(err, result) { // or use save
//     if (err) {
//       res.send(err);
//     } else {
//       res.json(result);
//     }
//   });
// });
app.post("/api/sighting", function(req, res) {
  Sighting.insert(req.body, function(err, response) { //put things in the "body" section of Postman to test!
    if (err) {
      res.send(err);
    } else {
      res.json(response);
    }
  });
});

app.get("/api/sighting", function(req, res) {
  var query = {};

  if (req.query.name) {
    query.name = req.query.name;
  }
  if (req.query.order) {
    query.order = req.query.order;
  }

  if (req.query.status) {
    query.status = req.query.status;
  }

  if (req.query.id) {
    query._id = mongojs.ObjectId(req.query.id);
  }

  Sighting.find(query, function(err, response) {
    if (err) {
      res.send(err)
    }
    else {
      res.json(response);
    }
  });
})

// Connection
var port = 8000;
app.listen(port, function() {
  console.log("watching you on port " + port)
});
