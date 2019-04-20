'use strict'

//load environment variables
require('dotenv').config();

const express = require('express');

const app = express();

const cors = require('cors');

app.use(cors());

const PORT = process.env.PORT;

app.get('/testing', (request, response) => {
  console.log('found the testing route');
  response.send('<h1> HEY WORLD </h1>');
});

app.get('/location', (request, response) => {
  try{
    const locationData = searchToLatLong(request.query.data);
    response.send(locationData);
  }
  catch (error){
    console.error(error);
    response.status(500).send('status: 500. So so so Sorry, something went wrong');
  }
});

app.get('/weather', (request, response) => {
  console.log('From weather request', request.query.data.latitude);
  //call a get weather function , 
  //process the data from the darksky json in a constructor, 
  //return the results
  response.send('return the results here')
});

app.listen(PORT, () => console.log(`Listen on ort ${PORT}.`));

//Helper Functions
function searchToLatLong(query) {
  const geoData = require('./data/geo.jason');
  const location = new Location(geoData);
  console.log(location);
  return location;
}

function Location(data) {
  this.formatted_query = data.results[0].formatted_address;
  this.latitude = data.results[0].geometry.location.lat;
  this.longitude = data.results[0].geometry.location.lng;
}
