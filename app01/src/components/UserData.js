import React,{useState,useEffect} from 'react'

import {mysocketid} from '../utils/events'

function UserData({socket}) {

    const [user,userSet]=useState({socketid:-1})

    useEffect(()=>{
  
      console.log(new Date())
      console.log(`useEffect for mysocketid`)
      socket.on(mysocketid,socketid=>{
  
  
        console.log(socketid)
        userSet({...user,socketid})
      })
  
    },[])

    return (
        <center>
            <div style={{fontSize: '5px'}}>What is my socket id? {user.socketid}</div>
        </center>
    )
}

export default UserData
