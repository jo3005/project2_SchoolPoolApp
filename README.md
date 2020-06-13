#Project2 - School Pool Perth

  ![Licence](https://img.shields.io/static/v1?label=Licence&message=GNU%20Affero%20General%20Public%20License%20v3.0&color=blue)

##Description  
This repo contains code for Project 2 completed for the Full Stack Bootcamp.  It is the start of a car pooling app for school parents.  It uses Nodejs and Express server, with data stored in a MySQL database accessed by Sequelize ORM.  It utilizes various Google maps APIs and is deployed via Heroku.  Its styling is based on a Materialize CSS framework and coding follows a MVC paradigm with handlebars. 

##Links  
Github repo url: https://github.com/georgiellis/project2
Deployed url: https://schoolpool-app.herokuapp.com/

##Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Licence](#licence)
* [Contributing](#contributing)
* [Tests](#tests) 
* [User Story](#user_story) 
* [Current Issues](#issues) 


##Installation <a name="installation"></a>
Installation guidelines have not yet been defined. 

##Usage <a name="usage"></a>
Usage guidelines have not yet been defined. 

##Licence <a name="licence"></a>
GNU Affero General Public License v3.0 

##Contributing <a name="contributing"></a> 
To be advised 

##Tests <a name="tests"></a>
No test information is available at this time. 


##User Story <a name="user_story"></a>
As a parent, I want to book a ride ahead of time for my children so they arrive at their destination within a defined time window.  
I want the app to store my default information so that I can minimize re-entry.
I want to be able to book rides on my mobile phone or desktop computer.

As a driver (parent of other children) I want to be able to chose what rides I accept.  
When I accept a drive request I want the app to tell me how much earlier I need to leave and provide a route for all of my pickups.  
I want to be able to accept rides on my mobile phone or desktop computer.  

###Optional features

####Parent optional features:
* If I don't need so many credits in my account, I want to be able to return credits for a refund/fuel voucher. 
* I want to see the ratings of my accepted passengers.
* I want to know when my driver is going to arrive and be informed by SMS 10 minutes before arrival time and when they have arrived.
* I want to be able to see a history of my children's rides.
* I want to see the rating of my assigned driver.
* If I do not have enough credits, I want to be able to purchase more.

####Driver optional features
* I want to see a history of my pickups and routes.
* I want to be able to be provided with real-time navigation whilst I am on a ride.  I want to be able to switch these off.
* I want the app to filter potential pickups to those booked at least one hour before I depart, based on whether my vehicle is suitable and how far out of my normal route I am willing to travel

##Application Requirements
* Must use a Node and Express server
* Must be backed by a MySQL database and an ORM (not necessarily Sequelize)
* Must utilize both GET and POST routes for retrieving and adding new data
* Must be deployed using Heroku (with data)
* Must utilize at least one new third-party API
* Must have a polished UI
* Must use a CSS framework _other than_ Bootstrap
* Must follow MVC paradigm
* Must meet good quality coding standards (indentation, scoping, naming)
* Must use Handlebars.js

##Current Issues  <a name="issues"></a>
* Accept a request page not complete
* After deleting a request the page does not automatically refresh
* Edit ride-request post not implemented
* Enter Passenger details not implemented
* Attach passenger details to a ride request not implemented
* Search ride (enter a ride request) page does not link to known locations
* Manage-driver destination does not link to known locations
* Adding calculated additional distance and time features to ride-request not implemented.  Code for the calculations has been written by requires the above links to known locations.


