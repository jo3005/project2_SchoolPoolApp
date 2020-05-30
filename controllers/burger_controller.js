const express = require("express");

const router = express.Router();

// Import the model (burger.js) to use its database functions.
const burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  burger.selectAll(function(data) {
    let hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/burgers", function(req, res) {
  burger.insertOne(["burger_name"], [req.body.burger_name], 
  function(result) {
    // Refresh by getting all
    res.redirect('/')
  });
});

router.put("/burgers/:id", function(req, res) {
  let condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.updateOne({
    devoured: true
  }, condition, function(result) {
    res.redirect('/')

  });
});

// Export routes for server.js to use.
module.exports = router;
