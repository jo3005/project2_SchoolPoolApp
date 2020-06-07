const configs = require("../config/config");
let distance = require("google-distance-matrix");

require("dotenv").config();

const NodeGeocoder = require("node-geocoder");

const options = {
  provider: "google",
  // Optional depending on the providers
  apiKey: configs.google.google_key,
  formatter: null, // 'gpx', 'string', ...
};
const geocoder = NodeGeocoder(options);

async function googleGeoData(address) {
  return geocoder.geocode({
    address: `${address.streetnumber} ${address.streetname} ${address.suburb}`,
    country: "Australia",
  });
}

module.exports = async function (address) {
  //console.log(address);
  return googleGeoData(address).then((res) => {
    return `${res[0].latitude},${res[0].longitude}`;
  });
};
