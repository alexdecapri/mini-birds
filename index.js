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

  Sighting.find(query, function(err, response) { //allows you to "get" by specific thigns in query, such as id or name
    if (err) {
      res.send(err)
    }
    else {
      res.json(response);
    }
  });
});

//for app.put try using "/api/sighting/:id" AND "/api/sighting" with a query... think of situations where one would be better or maybe even both! (username, then query for friends list or something)
app.put("/api/sighting/", function (req, res) {
  if(!req.query.id) { //can't get this to display if non-existant id entered, only if id is not entered
    return res.send("request query 'id' required");
  }
  // else if (req.query.id !==) figure out how to compare the ID trying to be deleted with the database to see if they match, then return err message
  Sighting.findAndModify({
    query: { //locating id using query
      _id: mongojs.ObjectId(req.query.id) //locating by id to change other properties
    },
    update: {
      $set: req.body //whatever is in Postman's body... use "{"name": "new name here"}" to test
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

app.delete("/api/sighting", function(req, res) {
  Sighting.remove({
    _id: mongojs.ObjectId(req.query.id)
  },
  function(err, response) {
    console.log(err, response);
    if (err) {
      return res.status(500).json(err); //different than above??
    } else
    return res.json(response);
  });
});

// Connection
var port = 8000;
app.listen(port, function() {
  console.log("watching you on port " + port)
});
