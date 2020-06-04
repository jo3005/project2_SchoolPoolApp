// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
const express = require("express");
const session = require("express-session");
var currentUserId="";

// Requiring passport as we've configured it
const passport = require("./config/passport");

// Include environmental variables
require('dotenv').config();

// Sets up the Express App
// =============================================================
const PORT = process.env.PORT || 8080;
const app = express();


// Requiring our models for syncing
const db = require("./models");


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

// We need to use sessions to keep track of our user's login status
app.use(session({secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
// =============================================================
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({force: true}).then(function() { // creates tables for all models that were defined (i.e. using the define method on an instance of Sequelize)
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});
