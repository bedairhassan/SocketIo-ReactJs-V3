import React, { useState, useEffect } from 'react';
import './App.css';

import UserData from './components/UserData/UserData';
import AvailableUsers from './components/AvailableUsers/Parent';
// import ConditionalPageDisplay from './components/ConditionalPageDisplay'
import NavDisplay from './components/NavDisplay';

import Chat from './components/Chat/Chat'
import ParentChatWindowPrivate from './components/ChatWindowPrivate/Parent'

var socket = require('socket.io-client')('http://localhost:4000');

export default function App() {

  const [toDisplay, toDisplaySet] = useState(`Home`)

  useEffect(() => window.addEventListener('beforeunload', e => socket.emit(`disconnect`, { socketid: socket.id })), [])

  return (
    <center>

      {/* {true&&true&&<h1>hi</h1>} */}

      <div className={`sidenav`}>

        {/* <Contacting socket={socket} /> */}
        {/* <hr></hr> */}
        <UserData socket={socket} />

        <hr className="zig-zag"></hr>

        <h1 style={{ fontSize: '10px' }}>Conclusion, Yourself can't be seen in this table</h1>
        <h1 style={{ fontSize: '10px', color: `red` }}>AVAILABLE USERS</h1>
        <AvailableUsers socket={socket} />
      </div>

      <div className={`main`}>
        <Chat socket={socket} />
        <br/>
        <hr></hr>
        <hr></hr>
        
        {/* FIX Friend Request Sent Issue First */}
        {/* <ChatWindowPrivate socket={socket}/>  */}
        <ParentChatWindowPrivate socket={socket}/>

      </div>

      <br />



    </center>
  );
}

