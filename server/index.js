// npm run watch // runs nodemon
var express = require('express');
var socket = require('socket.io');

// import {mysocketid} from './events'
// import {mysocketid} from './events'

// App setup
var app = express();
var server = app.listen(4000, function(){
    console.log('listening for requests on port 4000,');
});

// Static files
// app.use(express.static('public'));

// Server Variables
var users=[] // {socketid}

// Socket setup & pass server
var io = socket(server);
io.on('connection', (socket) => {

    // `base code` : for each introduced socket, we will consider doing the following
    console.log(new Date())
    console.log(`New Socket Id has been introduced`,socket.id)
    users.push({socketid:socket.id})
    
    // `base code` : notification
    socket.emit(`what is my socketid`,socket.id)
    io.emit(`Available Users`,users)
});