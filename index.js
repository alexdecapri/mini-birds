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
  Sighting.insert(req.body, function(err, response) { //put things in the "body" section of Postman to test!  Get excited about applying this in the real world..
  //think of a form that somnebody submits... ng-click submit, goes to an angular service using the $scope in controller to actually have the user manipulate that data.. change it to json, http post request, then eventually to req.body
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
});

//for app.put try using "/api/sighting/:id" AND "/api/sighting" with a query... think of situations where one would be better or maybe even both! (username, then query for friends list or something)
app.put("/api/sighting/:id", function (req, res) {
  Sighting.findAndModify({
    query: {
      _id: mongojs.ObjectId(req.query.id) //locating by id to change other properties
    },
    update: {
      $set: req.body
    }
  },
  function(err, response) {
    console.log(err, response);
    if(err) {
      res.send(err);
    } else {
      res.json(response);
    }
  });
});

// Connection
var port = 8000;
app.listen(port, function() {
  console.log("watching you on port " + port)
});
