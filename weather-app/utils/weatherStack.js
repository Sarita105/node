const request = require('request');

const forecast = (lat, long, cb) => {
    const url = 'http://api.weatherstack.com/current?access_key=245674363615e86048e52bf9c0565caa&query='+lat+','+long;

    request({url:url, json: true}, (error, response) => {
            if(error) {
                cb('unable to connect to server');
            } else if(response.body.error) {
                cb('provide valid parameter')
            } else{
                const data = response.body.current;
                cb(undefined, {
                    weather_descriptions: data.weather_descriptions[0],
                    tempurature_out: data.temperature,
                    feelslike: data.feelslike
                });
            }
        })

}
module.exports = forecast;