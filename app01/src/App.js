import React, { useState, useEffect } from 'react';
import './App.css';

import UserData from './components/UserData/UserData';
import AvailableUsers from './components/AvailableUsers/Parent';
// import ConditionalPageDisplay from './components/ConditionalPageDisplay'

import Chat from './components/Chat/Chat'


var socket = require('socket.io-client')('http://localhost:4000');

export default function App() {


  // const [buttonHide, buttonHideSet] = useState(true)

  useEffect(() => window.addEventListener('beforeunload', e => socket.emit(`disconnect`, { socketid: socket.id })), [])

  // const buttonHideAction = () => 

  return (
    <React.Fragment>

      {/* <button onClick={() => buttonHideSet(!buttonHide)}>Hide Settings</button> */}
      <SideBar
          // Display={buttonHide}
          socket={socket} />
      <MainWindow
        socket={socket} />

    </React.Fragment>
  );
}

const MainWindow = ({ socket }) => {
  return (
    <React.Fragment>
      <Chat socket={socket} />
    </React.Fragment>

  )
}

const SideBar = ({ socket }) => {

  return (
    <React.Fragment>
      <UserData socket={socket} />
      <hr className="zig-zag"></hr>
      <AvailableUsers socket={socket} />
      <hr className="zig-zag"></hr>
    </React.Fragment>)
}