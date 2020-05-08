import React, { useState, useEffect } from 'react'

import { availableusers } from '../utils/events'

{/* TODO: Display He is Your Friend when necessary. And Private Button */}

export default function AvailableUsers({ socket }) {

  const [users, usersSet] = useState([])

  useEffect(() => {

    console.log(new Date())
    console.log(`useEffect for update user`)
    socket.on(`update user`, usersReturn => usersSet([...usersReturn]))

  }, [])

  // useEffect for fr
  // hint: use 
  useEffect(() => socket.on(`fr`, ({ src }) => {

    console.log(new Date())
    console.log(`fr: `,src)
    console.log(users.length)

 

    // let edit = [...users]
    // for (let i = 0; i < users.length; i++) {
    //   console.log({ src: src, list: users[i].socketid })
    //   if (users[i].socketid === src) {
    //     // users[i].isFriendRequest = true
    //     users[i] = {...users[i],isFriendRequest:src}
    //     return
    //   }
    // }

    // usersSet(edit)
  }), [])

  useEffect(() => {

    console.log(new Date())
    console.log(`useEffect for Available Users`)
    socket.on(availableusers, usersReturn => usersSet([...usersReturn]))

  }, [])

  return (
    <center>
      <table>
        <tr>
          <th style={{ fontSize: '10px' }}>socket id</th>
          <th style={{ fontSize: '10px' }}>Who Can Send Him Friendrequest?</th>
          <th style={{ fontSize: '10px' }}>Sent You a Friend Request</th>
          <th style={{ fontSize: '10px' }}>IsFriends</th> {/* contact button appears */}
        </tr>
        {
          users.map(user => user.socketid !== socket.id && <tr style={{ fontSize: '10px' }}>

            <td>{user.socketid}</td>

            <td>{user.whocansendmefr === `everyone` &&
              <button
                onClick={() => {

                  console.log(`whocansendmefr`)
                  console.log({ src: socket.id, target: user.socketid })
                  socket.emit(`fr`, { src: socket.id, target: user.socketid })
                }}
              >Add Me As A Friend</button>}</td>

            {/* <td>{user.isFriendRequest && `button appears: He sent you a friend request`}</td> */}
            <td>{user.isFriendRequest}</td>

          </tr>
          )
        }
      </table>
    </center>
  )
}
