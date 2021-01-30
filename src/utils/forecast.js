const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=5cdc141b124e7fb1f806b97d783dacc0&query=${latitude},${longitude}`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (response.body.error) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      const data = response.body.current;
      //   console.log(response.body);
      const temperature = data.temperature;
      const description = data.weather_descriptions[0];
      callback(undefined, { temperature, description });
    }
  });
};

module.exports = forecast;
