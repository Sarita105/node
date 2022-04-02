const path = require('path');
const express = require('express');

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');

app.set('view engine', 'hbs')
app.use(express.static(path.join(publicDirectoryPath)));

app.get('', (req, res) => {
    res.render('index')
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
app.listen(3000, () => {
    console.log('server is up')
})