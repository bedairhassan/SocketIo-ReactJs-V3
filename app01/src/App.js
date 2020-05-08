import React,{useState,useEffect} from 'react';
import './App.css';


import Test from '../src/components/Test'
import UserData from './components/UserData';
import AvailableUsers from './components/AvailableUsers';
import ConditionalPageDisplay from './components/ConditionalPageDisplay'
import NavDisplay from './components/NavDisplay';

import Chat from './components/Chat/Chat'

var socket = require('socket.io-client')('http://localhost:4000');

function App() {

  const [toDisplay,toDisplaySet]=useState(`Home`)

  return (
    <center>

      {/* {true&&true&&<h1>hi</h1>} */}

      <UserData socket={socket}/>
      <hr className="zig-zag"></hr>
      <Chat socket={socket}/>
      <hr className="zig-zag"></hr>
      <h1>Conclusion</h1>
      <h2 style={{ fontSize: '10px' }}>Yourself can't be seen in this table</h2>
      <br/>
      <AvailableUsers socket={socket}/>
      
      
    </center>
  );
}

export default App;
