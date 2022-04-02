const geocode = require('./utils/geocode');
const forecast = require('./utils/weatherStack');

const inputLocation = process.argv[2];
if(inputLocation){
    geocode(inputLocation, (error, {lat, long, location}={}) => {
        if(error) {
            return console.log('problem with geo call');
        }
    forecast(lat, long, (error, forcastData) => {
        if(error) {
            return console.log('problem with weather call');
        }
    console.log(location);
    console.log(forcastData)
    });
    });
} else {
    console.log('no input')
}
