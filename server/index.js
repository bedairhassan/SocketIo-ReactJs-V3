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
var users=[] // {socketid,whocansendmefr}

// Socket setup & pass server
var io = socket(server);
io.on('connection', (socket) => {

    // `base code` : for each introduced socket, we will consider doing the following
    console.log(new Date())
    console.log(`New Socket Id has been introduced`,socket.id)
    users.push({socketid:socket.id,whocansendmefr:`everyone`})
    
    // `base code` : notification
    socket.emit(`what is my socketid`,socket.id)
    io.emit(`Available Users`,users)

    // socket.on // 

    // TODO: receives array of people to send data to

    // 
    socket.on(`chat`,user=>io.emit(`chat`,{...user,date:new Date()})) // message inside user

    //
    socket.on(`update user`,user=>{

        console.log(new Date())
        console.log(`update user`)
        for (let i=0;i<users.length;i++){

            if(users[i].socketid===user.socketid){
                console.log(user)
                users[i]={...user}
                break;
            }
        }

        io.emit(`update user`,users)
    })
});