// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
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
      res.redirect("/member-facing/members");
    }
    // res.sendFile(path.join(__dirname, "../public/signup.html"));
    res.render("public-facing/signup");
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("member-facing/members");
    }
    // res.sendFile(path.join(__dirname, "../public/login.html"));
    res.render("public-facing/login");
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    // res.sendFile(path.join(__dirname, "../public/members.html"));
    res.render("member-facing/members");
  });

  app.get("/signup",function(req,res){
    // res.sendFile(path.join(__dirname, "../public/signup.html"));
    res.render("public-facing/signup");
  });

  // TODO: REQUESTOR STATIC ROUTES
  // =============================================================
  app.get("/search-ride", isAuthenticated, function(req, res) { // added authentication middleware before accessing page
    res.render("member-facing/search-ride");
  });

  app.get("/requests-made", isAuthenticated, function(req, res) {
    res.render("member-facing/requests-made");
  });

  app.get("/location", isAuthenticated, function(req, res) {
    res.render("member-facing/location");
  });
  // TODO: DRIVER STATIC ROUTES
  // =============================================================
  app.get("/requests-received", isAuthenticated, function(req, res) {
    res.render("member-facing/requests-received");
  });

  // blog route loads blog.html
  app.get("/blog", isAuthenticated, function(req, res) { // added authentication middleware before accessing page
    res.render("member-facing/blog");
  });

  // manage driver route loads manage-driver.html
  app.get("/manage-driver", isAuthenticated, function(req, res) {
    res.render("member-facing/manage-driver");
  });

    // authors route loads author-manager.html
    app.get("/cms", isAuthenticated, function(req, res) {
      res.render("member-facing/cms");
    });


};
