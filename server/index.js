// npm run watch // runs nodemon
var express = require('express');
var socket = require('socket.io');

// import {mysocketid} from './events'
// import {mysocketid} from './events'

// App setup
var app = express();
var server = app.listen(4000, function () {
    console.log('listening for requests on port 4000,');
});

// Static files
// app.use(express.static('public'));

// Server Variables
var users = [] // {socketid,whocansendmefr}

// Socket setup & pass server
var io = socket(server);
io.on('connection', (socket) => {

    const obj = { socketid: socket.id, whocansendmefr: `everyone`,isFrRec:false }
    console.log(new Date(), `users.push`, obj)
    users.push(obj)
    console.log("users", users)

    console.log(new Date(), `what is my socketid`, socket.id)
    socket.emit(`what is my socketid`, socket.id)

    console.log(new Date(), `Available Users`, users)
    io.emit(`Available Users`, users)

    // socket.on // 

    socket.on(`chat`, user => {

        console.log(new Date(), `chat`, { ...user, date: new Date() })
        io.emit(`chat`, { ...user, date: new Date() })
    }) // message inside user

    socket.on(`fr`, ({ src, target }) => {

        console.log(new Date(), `fr`, `${src, target}`)
        socket.broadcast.to(target).emit(`fr`, { src })
    })

    //
    socket.on(`update user`, user => {

        console.log(new Date(), `update user`, user)

        // filter,extract i // modify[0] // replace, use i //
        for (let i = 0; i < users.length; i++) {

            if (users[i].socketid === user.socketid) {
                console.log(user)
                users[i] = { ...user }
                break;
            }
        }

        console.log(`io.emit`, `update user`, users)
        io.emit(`update user`, users)
    })

    // 
    socket.on(`disconnect`, () => {

        var disconnectt = { beforeDisconnect: users.length }
        for (let i = 0; i < users.length; i++) {

            if (users[i].socketid === socket.id) {
                // console.log(users[i])
                users.splice(i, 1)
                break;
            }
        }
        disconnectt = { ...disconnectt, afterDisconnect: users.length }

        console.log(new Date(), `io.emit`, users)
        io.emit(`Available Users`, users)
        socket.disconnect()
    })
});

// write comment here to restart server
// 