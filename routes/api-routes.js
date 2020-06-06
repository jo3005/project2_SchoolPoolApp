// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const nodemailer = require("nodemailer");
let currentUserId=0;
var isAuthenticated = require("../config/middleware/isAuthenticated");

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email', // fake email that only receives email and tests sent emails.
  port: 587,
  auth: {
      user: 'guy.lynch@ethereal.email',
      pass: 'm6uvuqX1d1hb86wQNt'
  }
});


// Routes
// =============================================================
module.exports = function(app) {
  
// PASSPORT AUTHENTICATION API ROUTES
// =============================================================
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    console.log("posting the login data");
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
    //console.log(res);
  });


  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    console.log("posting the member data");
    db.member.create({
      // memId: req.body.memId, // autoincrement PK
      memUsername: req.body.username,
      memFirstname: req.body.firstName,
      memLastname: req.body.lastName,
      credits: 0,
      memMobile: req.body.mobile,
      memEmail: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    console.log("logging user out");
    req.logout();
    res.redirect("/");
    currentUserId="";
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    //console.log("getting some data about our user to be used client side");
    if (!req.user) {
      console.log("No user data found");
      // The user is not logged in, send back an empty object
      res.json({});
    } else {

      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({ // json data for use in front end
        id: req.user.memId,
        email: req.user.memEmail, 
        firstName: req.user.memFirstname,
        lastname: req.user.memLastname,
        mobile: req.user.memMobile,
      });
      currentUserId=req.user.id;

    }
  });

    // Route for getting some data about our driver to be used client side
    app.get("/api/driver_data", function(req, res) {
      console.log("getting some data about our driver to be used client side");
      if (!req.user) {
        console.log("Please sign up or log in");
        // The driver is not logged in, send back an empty object
        res.json({});
      } else {
  
        // Otherwise send back the driver's details incl vehicle and routes
        db.member.findAll({
          include: [db.driver]
        }).then(function(dbdriver) {
          res.json(dbdriver);
        });
      }
    });

// REGISTER LOCATIONS API ROUTE
// =============================================================

app.post("/api/location", function(req, res) {
  console.log("posting the create location data");
  db.Location.create({
    streetNumber:req.body.streetnumber,
    streetName:req.body.streetname,
    suburb:req.body.suburb,
    postcode:req.body.postcode,
    state:req.body.state,
    country:req.body.country,
    locGps:req.body.gps,
    locationName:req.body.name,
    memberMemID:req.user.id //need to get the current userid that is logged in
  })
  .then(function(dbLocation) {
    res.json(dbLocation);
    console.log(res.json(dbLocation));
    // res.redirect(307, "/api/login");
  })
    .catch(function(err) {
      res.status(401).json(err);
    });
});


  // REGISTER DRIVER API ROUTE
// =============================================================

app.post("/api/registerDriver", function(req, res) {

  db.driver.create({
    // driverId: req.body.driverId, // autoincrement PK
   
    defaultVehicle: req.body.defaultVehicle,
    stateOfIssue: req.body.stateOfIssue,
    expiryDate: req.body.expiryDate,
    yearsDriving: req.body.yearsDriving,
    workingWithChildren: req.body.workingWithChildren,
    defaultRoute: req.body.defaultRoute,
    memberMemId: req.user.id
  })
    .then(function(dbDriver) {
      res.json(dbDriver)
      // res.redirect(307, "/api/login");
    })
    .catch(function(err) {
      res.status(401).json(err);
    });

    db.vehicle.create({
      // driverId: req.body.driverId, // autoincrement PK
     
      registration: req.body.registration,
      make: req.body.make,
      model: req.body.model,
      color: req.body.color,
      spareSpots: req.body.spareSpots,
      spareChildSeats: req.body.spareChildSeats,
      spareBoosters: req.body.spareBoosters,
      petsEverTravel: req.body.spareChildSeats
    })
      .then(function(dbvehicle) {
        res.json(dbvehicle)
        // res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });

    db.route.create({
      routeName: req.body.routeName,
      startLocnId: req.body.startLocnId,
      endLocnId: req.body.endLocnId,
      routeDistance: req.body.routeDistance,
      routeTotalTime: req.body.routeTotalTime,
      routeStartTime: req.body.routeStartTime
    })
      .then(function(dbroute) {
        res.json(dbroute)
        // res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
});

app.get("/api/drivers", function(req, res) {
  // Here we add an "include" property to our options in our findAll query
  // We set the value to an array of the models we want to include in a left outer join
  // In this case, just db.Driver
  db.member.findAll({
    include: [db.driver]
  }).then(function(dbdriver) {
    res.json(dbdriver);
  });
});

// CREATE REQUEST API ROUTE
// =============================================================


app.post("/api/createRequest", function(req, res) {
  console.log("Creating new request",req.body);
  db.request.create({
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
    memberMemId: req.body.memberMemId
 
  })
  .then(function(dbRequest) {
    console.log("Request has been created");
    console.log(dbRequest);
    res.json(dbRequest)
  })
  .catch(function(err) {
    res.status(401).json(err);
  });

    
  // db.member.findOne({
  //   include: [
  //     {
  //     model: db.driver,
  //     where: { 
  //       expiryDate: { [Op.gt]: req.body.requiredDate }, 
  //       workingWithChildren: true 
  //     }
  //     },
  //     {
  //       model: db.vehicle,
  //       where: {
  //         spareSpots: { [Op.gte]: 1 }, // sparespots should be atleast 1
  //         spareChildSeats : req.body.carSeatsRequired,
  //         spareBoosters : req.body.boostersRequired,
  //         addedRouteTime : req.body.addedRouteTime,
  //         boostersRequired : req.body.boostersRequired,
  //         carSeatsRequired : req.body.carSeatsRequired, 
  //       }
  //     },
  //     {
  //       model: db.route,
  //       where: {
  //         routstartLocnId: req.body.requiredPickupLocnId, 
  //         endLocnId: req.body.requiredDropoffLocnId,
  //       }
  //     }
  //   ]

    // ----- OR -----  
    // where: {

    //   // compare request FROM and TO Locations with Drivers default route FROM and TO Locations
    //   // required location services API
      
    //   // From Driver Table
    //   "$Driver.expiryDate$": { [Op.gt]: req.body.requiredDate }, //  should be greater than the req.body.requiredDate
    //   "$Driver.workingWithChildren$": true,
      
    //   // From Associated Vehicle Table
    //   "$Vehicle.spareSpots$": { [Op.gte]: 1 }, // sparespots should be atleast 1
    //   "$Vehicle.spareChildSeats$" : req.body.carSeatsRequired,
    //   "$Vehicle.spareBoosters$" : req.body.boostersRequired,
    //   "$Vehicle.addedRouteTime$" : req.body.addedRouteTime,
    //   "$Vehicle.boostersRequired$" : req.body.boostersRequired,
    //   "$Vehicle.carSeatsRequired$" : req.body.carSeatsRequired,

    //   // From Associated Route Table
    //   "$Route.routstartLocnId$": req.body.requiredPickupLocnId, 
    //   "$Route.endLocnId$": req.body.requiredDropoffLocnId,
    //   // routeName:"" // May not be required if google api resolves addresses into geocoded places

    // },
    // include: [db.Driver, db.Vehicle, db.Route]
  // }).then(function(dbmember) {
  //   res.json(dbmember);
  //   emailDriver(dBmember) // use member.email details to send email
  //   // This is where we can consider updating status field in request for "requesting > pending > acccepted > cancelled > driving > arriving > ended"
  // });
});

function emailDriver (driverObj) {
  // require nodemailer
  console.log("Calling emailDriver function");
  console.log(driverObj);
  var mailOptions = {
    from: 'guy.lynch@ethereal.email',
    to: driverObj.email, // use test email guy.lynch@ethereal.email
    subject: 'You have received a new booking request',
    text: 'Please log into schoolpoolperth.com to accept booking'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

app.get("/api/requests", isAuthenticated, function(req, res) {
  console.log("Req User", req.user);
  // Here we add an "include" property to our options in our findAll query
  // We set the value to an array of the models we want to include in a left outer join
  // In this case, just db.Driver
  db.request.findAll({
    where: { memberMemId: req.user.memId}, // return requests that haven't been confirmed / booked
    // requiredDate: { [Op.gte]: new Date() } // only requests for today or the future
  
  }).then(function(requestsList) {
    res.json(requestsList);
  });
});

// UPDATE route for Drivers to update/confirm booking requests
app.put("/api/requests", function(req, res) {
  db.request.update(
    req.body.booked, // field object BOOL { booked: true }
    {
      where: {
        reqId: req.body.id // matching request ID
      }
    }).then(function(updatedRequest) {
    res.json(updatedRequest); // return updated request
    //get requestor email
    db.member.findOne({
      where: {
        requestId: updatedRequest.reqId // where Member.requestId = request.reqId
      },
      include: [db.request]
    }).then(function(dbmember) {
      emailRequestor(dbmember)
    });
    
  });
});

function emailRequestor(memberObj) {
    // require nodemailer
    console.log("Calling emailDriver function");
    console.log(memberObj);
    var mailOptions = {
      from: 'guy.lynch@ethereal.email',
      to: memberObj.email, // use test email guy.lynch@ethereal.email
      subject: 'Your booking request has been confirmed',
      text: 'Please log into schoolpoolperth.com to view details'
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
}

// ----- GET Routes -----------------------

    // GET route for getting all location addresses
    app.get("/api/locations", function(req, res) {
      var query = {};
      if (req.query.memberMemId) {
        query.MemberMemId = req.query.memberMemId;
      }
      // Here we add an "include" property to our options in our findAll query
      // We set the value to an array of the models we want to include in a left outer join
      // In this case, just db.Author
      db.Location.findAll({
        where: query,
        include: [db.location]
      }).then(function(dblocation) {
        res.json(dblocation);
      });
    });
  
    // Get route for retrieving a single post
    app.get("/api/posts/:id", function(req, res) {
      var query = {};
      // Here we add an "include" property to our options in our findOne query
      // We set the value to an array of the models we want to include in a left outer join
      // In this case, just db.Author
      db.location.findOne({
        where: {
          locId: req.params.id
        },
        include: [db.location]
      }).then(function(dblocation) {
        res.json(dblocation);
      });
    });
  
    // POST route for saving a new post
    app.post("/api/posts", function(req, res) {
      db.Post.create(req.body).then(function(dbPost) {
        res.json(dbPost);
      });
    });
  
    // DELETE route for deleting posts
    app.delete("/api/posts/:id", function(req, res) {
      db.Post.destroy({
        where: {
          id: req.params.id
        }
      }).then(function(dbPost) {
        res.json(dbPost);
      });
    });
  
    // PUT route for updating posts
    app.put("/api/posts", function(req, res) {
      db.Post.update(
        req.body,
        {
          where: {
            id: req.body.id
          }
        }).then(function(dbPost) {
        res.json(dbPost);
      });
    });

    app.get("/api/authors", function(req, res) {
      // Here we add an "include" property to our options in our findAll query
      // We set the value to an array of the models we want to include in a left outer join
      // In this case, just db.Post
      db.Author.findAll({
        include: [db.Post]
      }).then(function(dbAuthor) {
        res.json(dbAuthor);
      });
    });
  
    app.get("/api/authors/:id", function(req, res) {
      // Here we add an "include" property to our options in our findOne query
      // We set the value to an array of the models we want to include in a left outer join
      // In this case, just db.Post
      db.Author.findOne({
        where: {
          id: req.params.id
        },
        include: [db.Post]
      }).then(function(dbAuthor) {
        res.json(dbAuthor);
      });
    });
  
    app.post("/api/authors", function(req, res) {
      db.Author.create(req.body).then(function(dbAuthor) {
        res.json(dbAuthor);
    });
  
    app.delete("/api/authors/:id", function(req, res) {
      db.Author.destroy({
        where: {
          id: req.params.id
        }
      }).then(function(dbAuthor) {
        res.json(dbAuthor);
      });
    });
    
  })
}
