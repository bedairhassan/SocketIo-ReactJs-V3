import React,{useState,useEffect} from 'react'

import {availableusers} from '../utils/events'

export default function UserData({socket}) {

    const [users,usersSet]=useState([])

    useEffect(()=>{
  
      console.log(new Date())
      console.log(`useEffect for update user`)
      socket.on(`update user`,usersReturn=>usersSet([...usersReturn]))
  
    },[])

    useEffect(()=>{
  
      console.log(new Date())
      console.log(`useEffect for Available Users`)
      socket.on(availableusers,usersReturn=>{
  
        usersSet([...usersReturn])
        
      })
  
    },[])

    return (
        <center>
            <table>
            <tr>
              <th style={{fontSize: '10px'}}>socket id</th>
              <th style={{fontSize: '10px'}}>Who Can Send Him Friendrequest?</th>
              <th style={{fontSize: '10px'}}>Sent You a Friend Request</th>
            </tr>
            {
                users.map(user=>user.socketid!==socket.id&&<tr style={{fontSize: '10px'}}>
                  {/* <button onClick={()=>console.log(`hi`,user.socketid,user.whocansendmefr)}>hi</button> */}
                  <td>{user.socketid}</td>

                  {/* TODO: Display He is Your Friend when necessary. And Private Button */}
                  <td>{user.whocansendmefr===`everyone` && <button onClick={()=>console.log(`whatever`)}>Add Me As A Friend</button>}</td> </tr>
                  )
            }
            </table>
        </center>
    )
}
