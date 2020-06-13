// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const nodemailer = require("nodemailer");
let currentUserId = 0;
var isAuthenticated = require("../config/middleware/isAuthenticated");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email", // fake email that only receives email and tests sent emails.
  port: 587,
  auth: {
    user: "guy.lynch@ethereal.email",
    pass: "m6uvuqX1d1hb86wQNt",
  },
  // goto www.ethereal.email and log in with above to see received email as seen by REQUESTOR
});

// Routes
// =============================================================
module.exports = function (app) {
  // PASSPORT AUTHENTICATION API ROUTES
  // =============================================================
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    console.log("posting the login data");
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id,
    });
    //console.log(res);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    console.log("posting the member data");
    db.member
      .create({
        // memId: req.body.memId, // autoincrement PK
        memUsername: req.body.username,
        memFirstname: req.body.firstName,
        memLastname: req.body.lastName,
        credits: 0,
        memMobile: req.body.mobile,
        memEmail: req.body.email,
        password: req.body.password,
      })
      .then(function () {
        res.redirect(307, "/api/login");
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    console.log("logging user out");
    req.logout();
    res.redirect("/");
    currentUserId = "";
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    //console.log("getting some data about our user to be used client side");
    if (!req.user) {
      console.log("No user data found");
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        // json data for use in front end
        id: req.user.memId,
        email: req.user.memEmail,
        firstName: req.user.memFirstname,
        lastname: req.user.memLastname,
        mobile: req.user.memMobile,
      });
      currentUserId = req.user.id;
    }
  });

  // Route for getting some data about our driver to be used client side
  app.get("/api/driver_data", function (req, res) {
    console.log("getting some data about our driver to be used client side");
    if (!req.user) {
      console.log("Please sign up or log in");
      // The driver is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the driver's details incl vehicle and routes
      db.member
        .findAll({
          include: [db.driver],
        })
        .then(function (dbdriver) {
          res.json(dbdriver);
        });
    }
  });

  // REGISTER LOCATIONS API ROUTE
  // =============================================================

  app.post("/api/location", function (req, res) {
    console.log("posting the create location data");
    console.log(req.body.memId);
    db.location.create({
      streetNumber: req.body.streetnumber,
      streetName: req.body.streetname,
      suburb: req.body.suburb,
      postcode: req.body.postcode,
      state: req.body.state,
      country: req.body.country,
      locGps: req.body.gps,
      locationName: req.body.name,
      memId: req.body.memId //need to get the current userid that is logged in
    })
      .then(function (dbLocation) {
        res.json(dbLocation);
        console.log(res.json(dbLocation));
        res.redirect(307, "/api/location");
      })
      .catch(function (err) {
        console.log(err);
      });
  });

  // REGISTER DRIVER API ROUTE
  // =============================================================

  app.post("/api/registerDriver", function (req, res) {
    console.log("Registering new driver...", req.body);
    db.driver
      .create({
        // reqId:  // autoincrement PK
        licenceNumber: req.body.licenceNumber, // redundant date can be retrived from date created.
        defaultVehicle: req.body.defaultVehicle,
        freeSpots: req.body.freeSpots,
        defaultRoute: req.body.defaultRoute,
        homeAddress: req.body.homeAddress,
        memId: req.body.memId
      })
      .then(function (dbDriver) {
        console.log("Driver profile has been created", dbDriver);
        res.json(dbDriver);
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  // CREATE REQUEST API ROUTE
  // =============================================================

  app.post("/api/createRequest", function (req, res) {
    console.log("Creating new request", req.body);
    db.request
      .create({
        // reqId:  // autoincrement PK
        requestDate: req.body.requestDate, // redundant date can be retrived from date created.
        requiredDate: req.body.requiredDate,
        requiredDropOffTimeStart: req.body.requiredDropOffTimeStart,
        requiredDropOffTimeEnd: req.body.requiredDropOffTimeEnd,
        requiredPickupLocnId: req.body.requiredPickupLocnId,
        requiredDropoffLocnId: req.body.requiredDropoffLocnId,
        addedRouteDistance: req.body.addedRouteDistance,
        addedRouteTime: req.body.addedRouteTime,
        boostersRequired: req.body.boostersRequired,
        carSeatsRequired: req.body.carSeatsRequired,
        creditsOffered: req.body.creditsOffered,
        booked: req.body.booked,
        bookedBy: req.body.bookedBy,
        memId: req.body.memId,
      })
      .then(function (dbRequest) {
        console.log("Request has been created");
        console.log(dbRequest);
        res.json(dbRequest);
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  app.get("/api/requests", isAuthenticated, function (req, res) {
    console.log("Req User", req.user);
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Driver
    db.request
      .findAll({
        where: { memId: req.user.memId }, // return requests that haven't been confirmed / booked
        // requiredDate: { [Op.gte]: new Date() } // only requests for today or the future
      })
      .then(function (requestsList) {
        res.json(requestsList);
      });
  });

  // UPDATE route for Drivers to update/confirm booking requests
  app.put("/api/requests", isAuthenticated, function (req, res) {
    console.log("Updating booking...",req.body)
    db.request
      .update(
        {booked: true}, // field object BOOL { booked: true }
        {
          where: {
            reqId: req.body.reqId, // matching request ID
          },
        }
      )
      .then(function (updatedRequest) {
        console.log("Database updated with request status 'booked'",updatedRequest)
        res.json(updatedRequest); // return updated request
        //get requestor email
        db.request
          .findOne({
            where: {
              reqId: req.body.reqId, // where Member.requestId = request.reqId
            }
          })
          .then(function (dbrequest) {
            emailRequestor(dbrequest);
          });
      });
  });

  app.delete("/api/requests/:id", function (req, res) {
    db.request
      .destroy({
        where: {
          reqId: req.params.id
        }
      })
      .then(function (dbrequest) {
        // res.json(dbrequest);
        res.redirect("/member-facing/requests-made");
      });
  });

  function emailRequestor(dbrequest) {
    // require nodemailer
    console.log("Calling emailDriver function");
    console.log(dbrequest);
    var mailOptions = {
      from: "guy.lynch@ethereal.email", // use test email guy.lynch@ethereal.email as driver otherwise req.user.email 
      to: dbrequest.bookedBy, 
      subject: "Your booking request has been confirmed",
      text: "Please log into schoolpoolperth.com to view details",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }

  // GET route for getting all location addresses
  app.get("/api/locations", function (req, res) {
    var query = {};
    if (req.query.memId) {
      query.memId = req.query.memId;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Location.findAll({
      where: query,
      include: [db.location],
    }).then(function (dblocation) {
      res.json(dblocation);
    });
  });

    // ----- FUTURE DEV -----------------------

  // function emailDriver(driverObj) {
  //   // require nodemailer
  //   console.log("Calling emailDriver function");
  //   console.log(driverObj);
  //   var mailOptions = {
  //     from: "guy.lynch@ethereal.email",
  //     to: driverObj.email, // use test email guy.lynch@ethereal.email
  //     subject: "You have received a new booking request",
  //     text: "Please log into schoolpoolperth.com to accept booking",
  //   };

  //   transporter.sendMail(mailOptions, function (error, info) {
  //     if (error) {
  //       console.log(error);
  //     } else {
  //       console.log("Email sent: " + info.response);
  //     }
  //   });
  // }

};
