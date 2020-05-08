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

  useEffect(()=>  window.addEventListener('beforeunload', e=>socket.emit(`disconnect`,{socketid:socket.id})),[])

  return (
    <center>

      {/* {true&&true&&<h1>hi</h1>} */}

      <div className={`sidenav`}>
      <UserData socket={socket}/>
      <hr className="zig-zag"></hr>
      <h1 style={{ fontSize: '10px' }}>Conclusion, Yourself can't be seen in this table</h1>
      <h1 style={{ fontSize: '10px' , color:`red`}}>AVAILABLE USERS</h1>
      <AvailableUsers socket={socket}/>
      </div>

      <div className={`main`}>
      <Chat socket={socket}/>
      </div>

      {/* <hr className="zig-zag"></hr> */}
      
      {/* <h2 style={{ fontSize: '10px' }}></h2> */}
      <br/>
      
      
      
    </center>
  );
}

export default App;
