import React, { useState, useEffect } from 'react'

// import {availableusers} from '../utils/events'

export default function Table({ socket }) {

  const [users, usersSet] = useState([])

  useEffect(() => {

    console.log(new Date())
    console.log(`chat`)

    // it receives a message within the user
    socket.on(`chat`, user => {

      console.log(new Date())
      console.log(user)

      // var users/ = [...users]
      // users.push(user)
      // setTheArray(oldArray => [...oldArray, newElement]);
      usersSet(oldUsers => [...oldUsers,user])
      // usersSet([...users, user])
    })

  }, [])

  return (
    <center>
      <table>
        <tr>
          <th style={{ fontSize: '10px' }}>date</th>
          <th style={{ fontSize: '10px' }}>socket id</th>
          <th style={{ fontSize: '10px' }}>message</th>
        </tr>
        <tbody>
          {
            users.map(user =>
              <tr style={{ fontSize: '10px' }} key={user.messageid}>
                <td>{user.date}</td>
                <td>{user.socketid}</td>
                <td>{user.message}</td>
              </tr>
            )
          }
        </tbody>
      </table>
    </center>
  )
}
