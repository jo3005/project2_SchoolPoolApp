// This document contains functions for getting information from the google maps api
// for more information see: https://developers.google.com/maps/documentation/distance-matrix/intro

module.exports = async function (origin,destination,whatTime="now"){
    
    let distance=require("google-distance-matrix");

    //const {Client,Status} =require("@googlemaps/google-maps-services-js");
    //const axios = require('axios');
    const configs = require("../config/config");
    

    let originStrArr=buildAddr(origin);
    let destinationStrArr=buildAddr(destination);

    // Required parameters

    //origins =  The starting point for calculating travel distance and time.You can supply one or more locations separated by the pipe character (|), 
    //in the form of an address, latitude/longitude coordinates, or a place ID. If you supply a place ID, you must prefix it with place_id:.

    //destinations — One or more locations to use as the finishing point for calculating travel distance and time.

    require('dotenv').config();
    const params={
        origins:originStrArr,
        destinations:destinationStrArr,
        departure_time:whatTime,
        key:process.env.GOOGLE_MAPS_API_KEY
    };
    console.log(params);
    distance.key(params.key);

    async function getMatrixData(params){
        //wrapper for the distance matrix response as it doesn't return a promise in its current form
        let promise= new Promise((resolve,reject) => {
            distance.matrix([params.origins],[params.destinations],function(err,distances){
                let origins=params.origins;
                let destinations=params.destinations;
                console.log(distances);
                /* if (!err) {
                    resolve (distances);
                    }; */

                    if (err) {
                        return console.log(err);
                    }
                    if(!distances) {
                        return console.log('no distances');
                    }
                    if (distances.status == 'OK') {

                        for (var i=0; i < origins.length; i++) {
                            for (var j = 0; j < destinations.length; j++) {
                                var origin = distances.origin_addresses[i];
                                var destination = distances.destination_addresses[j];
                                if (distances.rows[0].elements[j].status == 'OK') {
                                    var distance = distances.rows[i].elements[j].distance.text;
                                    //console.log('Distance from ' + origin + ' to ' + destination + ' is ' + distance);
                                    console.log(distance);
                                } else {
                                    console.log(destination + ' is not reachable by land from ' + origin);
                                }
                            }
                        }
                    }

                });
        });
        let result= await promise;
        return result;   
    };
       
    let matData=getMatrixData(params);
    return matData;    
};

function buildAddr(addrs){
    //console.log(addrs);
    //requires an object in the form number, streetname,suburb,state,country,gps
    let addrString=[];
    if (addrs!== undefined) {
        addrs.forEach(function(addr,index){
            if (addr.gps !== null) {
                let thisStr=addr.gps;
                thisStr=thisStr.replace(/\s/g,"").trim();
                addrString.push(thisStr);
                
                }
            else if (addr.number!=="" && addr.streetName !== "" && addr.suburb !== "" && addr.state !== ""){
                let thisStr=`${addr.number} ${addr.streetname} ${addr.suburb} ${addr.state}`;
                thisStr=thisStr.replace(/\s/g,"+").trim();
                addrString.push(thisStr);
                
            };
            })
        return addrString;
        }

};


