// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var db = require("../models");
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");
// ROUTES
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // PASSPORT AUTHENTICATION STATIC ROUTES
  // =============================================================
  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/dashboard");
    }
    // res.sendFile(path.join(__dirname, "../public/signup.html"));
    res.render("public/signup")
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/dashboard");
    }
    res.render("public/login")
    // res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/signup",function(req,res){
    // res.sendFile(path.join(__dirname, "../public/signup.html"));
    res.render("public/signup")
  });
  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/dashboard", isAuthenticated, function(req, res) {
    res.render("public/dashboard");
    // res.sendFile(path.join(__dirname, "../public/members.html"));
  });

 
  // TODO: REQUESTOR STATIC ROUTES
  // =============================================================
  app.get("/requests/made",function(req,res){
    db.Request.findAll().then(function (requests) {
      console.log(requests)
      res.render("app/requests/made", {requests})
    })
  });
  
  app.get("/cms", isAuthenticated, function(req, res) { // added authentication middleware before accessing page
    res.sendFile(path.join(__dirname, "../public/cms.html"));
  });
  
  // blog route loads blog.html
  app.get("/blog", isAuthenticated, function(req, res) { // added authentication middleware before accessing page
    res.sendFile(path.join(__dirname, "../public/blog.html"));
  });

  // authors route loads author-manager.html
  app.get("/authors", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/author-manager.html"));
  });

  // TODO: DRIVER STATIC ROUTES
  // =============================================================
  
  app.get("/requests/received",function(req,res){
    db.Request.findAll().then(function (requests) {
      console.log(requests)
      res.render("app/requests/received", {requests})
    })
  });
  
};
