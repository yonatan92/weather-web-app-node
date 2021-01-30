const request = require("request");

const geocode = (address, callback) => {
  const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoieW9uYXRhbjkyIiwiYSI6ImNra2EwbTNmcTAxMXkydmw2YjAxeWtjdjUifQ.c-Iq0lXynxOXD4WRItYJ0A&limit=1`;
  request({ url: geocodeURL, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (response.body.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      const locationGeo = response.body.features[0].center;
      const latitude = locationGeo[1];
      const longitude = locationGeo[0];
      const location = response.body.features[0].place_name;
      callback(undefined, { latitude, longitude, location });
    }
  });
};

module.exports = geocode;
