// This document contains functions for getting information from the google maps api
// for more information see: https://developers.google.com/maps/documentation/distance-matrix/intro

module.exports= async function(origin,destination,whatTime,callback){
    
    let settings= require("../../config/config.json");

    // A Distance Matrix API request takes the following form:
    //https://maps.googleapis.com/maps/api/distancematrix/outputFormat?parameters



    let matrixRoot="https://maps.googleapis.com/maps/api/distancematrix/JSON?units=metric&";

    // Required parameters

    //origins =  The starting point for calculating travel distance and time.You can supply one or more locations separated by the pipe character (|), 
    //in the form of an address, latitude/longitude coordinates, or a place ID. If you supply a place ID, you must prefix it with place_id:.

    //destinations — One or more locations to use as the finishing point for calculating travel distance and time.

    let requestinfo={
        origins:"Kardinya+WA",
        destinations:"Cottesloe+WA",
        mode:"driving",
        arrival_time:whatTime,    // integer in seconds since midnight, January 1, 1970 UTC
        departure_time:"now"   // integer in seconds since midnight, January 1, 1970 UTC
    }

    let url=`${matrixRoot}origins=${requestinfo.origins}&destinations=${requestinfo.destinations}&mode=driving&key=${settings.google.api}`

        // Performing GET requests to the OMDB API and logging the responses to the console
    let matDistance= $.ajax({
        url: url,
        method: "GET"
        }).then(function(response) {
            console.log(response);
            
        }).then(function(response) {
            callback();
        });

    ;
// ---------------------------------------------------------
    console.log("Because our AJAX requests are asynchronous, this line of code will most likely log first");

    return matDistance;

};



