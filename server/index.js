// npm run watch // runs nodemon
var express = require('express');
var socket = require('socket.io');

// import disconnect from './events/disconnect'
const {disconnect} = require(`./events/disconnect`)
const {UpdateUser} = require('./events/UpdateUser')
const {Intro} = require('./events/Intro')
const {localUsersUpdate} = require('./events/localUsersUpdate')
const {Block} = require('./events/Block')
const {Chat} = require('./events/Chat')
const {Chat2} = require('./events/Chat2')
const {fr} = require('./events/fr')
const {Contacting} = require('./events/Contacting')
const {letsBeFriends}= require('./events/letsBeFriends')


// App setup
var app = express();
var server = app.listen(4000, function () {
    console.log('listening for requests on port 4000,');
});

// Static files

// Server Variables
var users = [] // {socketid,whocansendmefr}

// Socket setup & pass server
var io = socket(server);

io.on('connection', (socket) => { 

    users=Intro(io,socket,users)

    socket.on(`localUsersUpdate`,users=>
    localUsersUpdate(socket,users))

    socket.on(`blockk`,data=>
    Block(socket,data))

    socket.on(`chat`, user => 
    Chat(io,user)) 

    socket.on(`chat2`, user => 
    Chat2(socket,user))

    socket.on(`fr`, ({ src, target }) => 
    fr(socket,{src,target}))

    socket.on(`Contacting`, target => 
    Contacting(socket,target))

    socket.on(`letsBeFriends`, ({ target, src }) => 
    letsBeFriends(socket,{src,target}))

    //
    socket.on(`update user`, user => users=UpdateUser(io,users,user))

    // 
    socket.on(`disconnect`, () => users=disconnect(io,socket,users))
});
