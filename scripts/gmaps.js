// This document contains functions for getting information from the google maps api
// for more information see: https://developers.google.com/maps/documentation/distance-matrix/intro

module.exports = async function (origin,destination,whatTime="now"){
    
    let distance=require("google-distance-matrix");

    //const {Client,Status} =require("@googlemaps/google-maps-services-js");
    //const axios = require('axios');
    const configs = require("../config/config");
    

    let originStrArr=buildAddr(origin);
    let destinationStrArr=buildAddr(destination);

    //let settings= require("../config/config.json");

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
                if (!err) {
                    resolve (distances.rows);
                    };
                });
        });
        let result= await promise;
        return result;   
    };
       
    let matData=getMatrixData(params);
    return matData;    
};

function buildAddr(addrs){
    //console.log(addr);
    //requires an object in the form number, streetname,suburb,state,country,gps
    let addrString=[""];
    if (addrs!== null && addrs!== undefined) {
        addrs.forEach(function(addr,index){
            if (addr.gps !== null) {
                addrString= addr.gps;
                addrString=addrString.replace(/\s/g,"").trim();
                //console.log(addrString);
                return addrString; 
                };
            if (addr.number!=="" && addr.streetName !== "" && addr.suburb !== "" && addr.state !== ""){
                addrString=`${addr.number} ${addr.streetname} ${addr.suburb} ${addr.state}`;
                addrString=addrString.replace(/\s/g,"+");
                return addrString;
                };
            })
        
        }

};


