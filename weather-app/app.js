const geocode = require('./utils/geocode');
const forecast = require('./utils/weatherStack');

// const url = 'http://api.weatherstack.com/current?access_key=245674363615e86048e52bf9c0565caa&query=37.8267,-122.4233';

// request({url:url, json: true}, (error, response) => {
//     if(error) {
//         console.log('unable to connect to server');
//     } else if(response.body.error) {
//         console.log('provide valid parameter')
//     } else{
//         const data = response.body.current;
//         console.log(data.weather_descriptions[0]+'. It is '+data.temperature+' outside. But it feels like '+data.feelslike);
//     }
// })
forecast(42.3605, -75.1327, (error, data) => {
    console.log('e',error);
console.log('d',data);
});

geocode('Boston', (error, response) => {
console.log('e',error);
console.log('d',response);
});