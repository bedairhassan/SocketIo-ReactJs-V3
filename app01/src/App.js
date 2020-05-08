import React,{useState,useEffect} from 'react';
import './App.css';


import UserData from './components/UserData';
import AvailableUsers from './components/AvailableUsers';

var socket = require('socket.io-client')('http://localhost:4000');

function App() {

  return (
    <center>
      <UserData socket={socket}/>
      <AvailableUsers socket={socket}/>
    </center>
  );
}

export default App;
