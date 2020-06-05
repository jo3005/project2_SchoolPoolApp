const configs = require("../config/config");
let distance=require("google-distance-matrix");

require('dotenv').config();

const NodeGeocoder = require('node-geocoder');

const options = {
    provider: 'google',
    // Optional depending on the providers
    apiKey: configs.google.google_key, 
    formatter: null // 'gpx', 'string', ...
  };
const geocoder = NodeGeocoder(options);

let origin={
    streetnumber: "24",
    streetname: "Le Souef Drive",
    suburb: "Kardinya",
    postcode: "6163",
    state:"WA",
    country: "Australia",
    gps:null
};

let destination= {
    streetnumber: "66",
    streetname: "Jackson Avenue",
    suburb: "Winthrop",
    postcode: "6160",
    state:"WA",
    country: "Australia",
    gps:"-32.053309, 115.831192"
};



async function gmaps(origin,destination,whatTime="now"){
    
    //const {Client,Status} =require("@googlemaps/google-maps-services-js");
    //const axios = require('axios');
    const configs = require("../config/config");
    
    let originString=buildAddr(origin);
    let destinationString=buildAddr(destination);

    //let settings= require("../config/config.json");

    // Required parameters

    //origins =  The starting point for calculating travel distance and time.You can supply one or more locations separated by the pipe character (|), 
    //in the form of an address, latitude/longitude coordinates, or a place ID. If you supply a place ID, you must prefix it with place_id:.

    //destinations — One or more locations to use as the finishing point for calculating travel distance and time.

    
    const params={
            origins:originString,
            destinations:destinationString,
            departure_time:whatTime,
            key:process.env.GOOGLE_MAPS_API_KEY
        };
    //console.log(params);
    distance.key(params.key);

    async function getMatrixData(params){
        //wrapper for the distance matrix response as it doesn't return a promise in its current form
        let promise= new Promise((resolve,reject) => {
            distance.matrix([params.origins],[params.destinations],function(err,distances){
                if (!err) {
                    resolve (distances.rows[0].elements[0]);
                    };
                });
        });
        let result= await promise;
        return result;   
    };
       
    let matData=getMatrixData(params);
    return matData;    
};

async function googleGeoData(address){
    let promise= new Promise((resolve,reject) => {
        let response=geocoder.geocode({
            address: `${address.streetnumber} ${address.streetname} ${address.suburb}`,
            country: 'Australia' 
        })
        resolve (response);
    });
    let result= await promise;
    //console.log(result);
    return result;
}

function buildAddr(addr){
    //console.log(addr);
    //requires an object in the form number, streetname,suburb,state,country,gps
    let addrString="";
    if (addr!== null && addr!== undefined) {
        if (addr.gps !== null) {
            addrString= addr.gps;
            addrString=addrString.replace(/\s/g,"").trim();
            //console.log(addrString);
            return addrString; 
        }
        if (addr.streetnumber!=="" && addr.streetName !== "" && addr.suburb !== "" && addr.state !== ""){
            addrString=`${addr.streetnumber} ${addr.streetname} ${addr.suburb} ${addr.state}`;
            addrString=addrString.replace(/\s/g,"+");
            return addrString;
        };  
    }
};


module.exports = {

    getGps: async function(address) {
        //console.log(address);
        await googleGeoData(address).then(res=> {
            const result = `${res[0].latitude},${res[0].longitude}`;
            return result;
            });
        
        },
    
    getDistance: async function(address1,address2,startTime){
        if(address1 !== undefined && address2 !== undefined ){
            if(startTime === undefined){startTime="now"};
            await gmaps(address1,address2,startTime).then(response=>{
                //console.log(response);
                return response
            });
        } else console.log("addresses not passed in");    
    } 
};