import React,{useState,useEffect} from 'react'

import {availableusers} from '../utils/events'

function UserData({socket}) {

    const [users,usersSet]=useState([])

    useEffect(()=>{
  
      console.log(new Date())
      console.log(`useEffect for Available Users`)
      socket.on(availableusers,usersReturn=>{
  
        usersSet([...usersReturn])
        
      })
  
    },[])

    return (
        <center>
            <ul>
            {
                users.map(user=><li style={{fontSize: '10px'}}>{user.socketid}</li>)
            }
            </ul>
        </center>
    )
}

export default UserData
