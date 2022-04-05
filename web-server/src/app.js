const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve expressjs.com
app.use(express.static(path.join(publicDirectoryPath)));

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Sarita Mandal'
    })
});
app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About me',
        name: 'Sarita Mandal'
    })
});
app.get('/help', (req, res) => {
    res.render('help',{
        message: 'this is help page as dynamic template',
        title: 'Help page',
        name: 'Sarita Mandal'
    })
});
// app.get('', (req, res) => {
//     res.send('hello express')
// });
// app.get('/help', (req, res) => {
//     res.send({
//         name: 'Sarita',//can send array as well
//         age: 980,
//     })
// });
// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// });
app.get('/weather', (req, res) => {
    res.send({
        forecast: 50,
        location: 'Kolkata'
    })
});
app.get('/help/*', (req, res) => {
    res.render('otherErrorpage',{
        message: 'help article not found!',
        title: '/help/*',
        name: 'Sarita Mandal'
    })
})
app.get('*', (req, res) => {
    res.render('genericNotfound',{
        message: '404',
        title: '*',
        name: 'Sarita Mandal'
    })
})
app.listen(3000, () => {
    console.log('server is up')
})