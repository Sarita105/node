const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');
const Filter = require('bad-words');
const {generateMessage, generateLoc} = require('./utils/messages');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(path.join(publicDirectoryPath)));


io.on('connection', (socket) => {
    console.log('new connention')
    // socket.emit('chatPerson', generateMessage('welcome'));
    // socket.broadcast.emit('chatPerson', generateMessage('a new'));
    socket.on('join', ({username,room}) => {
        socket.join(room);
        socket.emit('chatPerson', generateMessage('welcome'));
        socket.broadcast.to(room).emit('chatPerson', generateMessage(`${username} has joined`));
    });
     socket.on('incriment', (message, cb) => {
         const filter = new Filter();
         if(filter.isProfane(message)) {
             return cb('profanity is not allwd')
         }
       io.emit('chatPerson',generateMessage(message));
       cb();
    })

    socket.on('sendlocation', (location,cb) => {
        io.emit('location',generateLoc(`https://google.com/maps?q=${location.latitude},${location.longitude}`))
        cb();
     })

    socket.on('disconnect', () => {
        io.emit('chatPerson', generateMessage('a p lefr'))
    })
})

server.listen(port, () => {
    console.log('server is up on port'+port);
})