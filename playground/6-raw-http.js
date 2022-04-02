const http = require('http');
const url = 'http://api.weatherstack.com/current?access_key=245674363615e86048e52bf9c0565caa&query=45,-79&unit=f';

const request = http.request(url, (response) => {
let data = '';
response.on('data', (chunk) => {
    data= data + chunk.toString();
});
response.on('end', () => {
    const body = JSON.parse(data)
console.log(body)
})
});

request.on('error', (error) => {
    console.log(error)
})
request.end();