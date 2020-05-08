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

    // 
    socket.on(`chat`,user=>{
        
        console.log(new Date())
        console.log(`socket.on chat`,user)

        io.emit(`chat`,{...user,date:new Date()})}) // message inside user

    // attempt to send friend request
    // socket.broadcast.to(data.broadcastTo).emit( 'delete-friendlist-at-target', data.who )
    // src, target : r both socketids
    // this is just a traversing path
    socket.on(`fr`,({src,target})=>socket.broadcast.to(target).emit(`fr`,{src}))

    //
    socket.on(`update user`,user=>{

        console.log(new Date())
        console.log(`update user`)

        // filter,extract i // modify[0] // replace, use i //
        for (let i=0;i<users.length;i++){

            if(users[i].socketid===user.socketid){
                console.log(user)
                users[i]={...user}
                break;
            }
        }

        io.emit(`update user`,users)
    })

    // 
    socket.on(`disconnect`,()=>{

        console.log(`before disconnecting, total number of users is `,users.length)
        for (let i=0;i<users.length;i++){
            // console.log({list:users[i].socketid,current:socket.id})
            if(users[i].socketid===socket.id){
                // console.log(users[i])
                users.splice(i,1)
                break;
            }
        }
        console.log(`after disconnecting, total number of users is `,users.length)

        io.emit(`Available Users`,users)
        socket.disconnect()
    })
});