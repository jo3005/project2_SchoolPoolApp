// This document contains functions for getting information from the google maps api
// for more information see: https://developers.google.com/maps/documentation/distance-matrix/intro

module.exports = async function (
  origin,
  destination,
  whichOrder,
  whatTime = "now"
) {
  const order = whichOrder;
  let distance = require("google-distance-matrix");

  //const {Client,Status} =require("@googlemaps/google-maps-services-js");
  //const axios = require('axios');
  const configs = require("../config/config");

  let originString = buildAddr(origin);
  let destinationString = buildAddr(destination);

  //let settings= require("../config/config.json");

  // Required parameters

  //origins =  The starting point for calculating travel distance and time.You can supply one or more locations separated by the pipe character (|),
  //in the form of an address, latitude/longitude coordinates, or a place ID. If you supply a place ID, you must prefix it with place_id:.

  //destinations — One or more locations to use as the finishing point for calculating travel distance and time.

  require("dotenv").config();
  const params = {
    origins: originString,
    destinations: destinationString,
    departure_time: whatTime,
    key: process.env.GOOGLE_MAPS_API_KEY,
  };
  //console.log(params);
  distance.key(params.key);

  async function getMatrixData(params, whichOrder) {
    const order = whichOrder;

    //wrapper for the distance matrix response as it doesn't return a promise in its current form
    let promise = new Promise((resolve, reject) => {
      distance.matrix([params.origins], [params.destinations], function (
        err,
        distances
      ) {
        /* if (!err) {
                    resolve (distances.rows[0].elements[0]);
                    }; */
        if (err) {
          return console.log(err);
        }
        if (!distances) {
          return console.log("no distances");
        }
        if (distances.status == "OK") {
          for (var i = 0; i < 1; i++) {
            for (var j = 0; j < 1; j++) {
              var origin = distances.origin_addresses[i];
              var destination = distances.destination_addresses[j];
              if (distances.rows[0].elements[j].status == "OK") {
                var distance =
                  distances.rows[i].elements[j].distance.value / 1000;
                var duration =
                  distances.rows[i].elements[j].duration.value / 60;
                //console.log('Distance from ' + origin + ' to ' + destination + ' is ' + distance);
                //console.log('Travel time from ' + origin + ' to ' + destination + ' is ' + duration);
                //console.log(`${order}:${distance},${duration}`);
                resolve({
                  order: order,
                  distance: distance,
                  duration: duration,
                });
              } else {
                console.log(
                  destination + " is not reachable by land from " + origin
                );
              }
            }
          }
        }
      });
    });
    let result = await promise;
    return result;
  }

  let matData = getMatrixData(params, order);
  return matData;
};

function buildAddr(addr) {
  //console.log(addr);
  //requires an object in the form number, streetname,suburb,state,country,gps
  let addrString = "";
  if (addr !== null && addr !== undefined) {
    if (addr.gps !== null) {
      addrString = addr.gps;
      addrString = addrString.replace(/\s/g, "").trim();
      //console.log(addrString);
      return addrString;
    }
    if (
      addr.number !== "" &&
      addr.streetName !== "" &&
      addr.suburb !== "" &&
      addr.state !== ""
    ) {
      addrString = `${addr.number} ${addr.streetname} ${addr.suburb} ${addr.state}`;
      addrString = addrString.replace(/\s/g, "+");
      return addrString;
    }
  }
}
