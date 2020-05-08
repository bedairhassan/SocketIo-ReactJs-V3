import React, { useState, useEffect } from 'react'

import '../App.css';

import { availableusers } from '../utils/events'

{/* TODO: Display He is Your Friend when necessary. And Private Button */ }


export default function AvailableUsers({ socket }) {

  const [users, usersSet] = useState([])


  useEffect(() => {

    console.log(`%c${new Date()}`, 'color:red')
    console.log(`useEffect for update user`)
    socket.on(`update user`, users => {

      console.log(`%c${new Date()}`, 'color:red')
      console.log(`update user, printing usersReturn`)
      console.log(users)
      usersSet(users)
    })

  }, [])

  // useEffect for fr
  // hint: use 
  useEffect(() => socket.on(`fr`, ({ src }) => {

    console.log(`%c${new Date()}`, 'color:red')
    console.log(`fr: `, src)
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

    // console.log(`%c${new Date()}`,'color:red')
    // console.log(new Date(),`color:red;`)
    socket.on(availableusers, users => {

      console.log(`%c${new Date()}`, 'color:red')
      console.log(`useEffect for Available Users`)
      usersSet(users)
    })

  }, [])

  const AddMeAsAFriend = ({socketid}) => {

    console.log(`%c${new Date()}`, 'color:red')
    console.log(`whocansendmefr`)
    console.log({ src: socket.id, target: socketid })
    socket.emit(`fr`, { src: socket.id, target: socketid })
  }

  return (
    <center>
      <table>
        <thead>
          <tr >
            <th style={{ fontSize: '10px' }}>socket id</th>
            <th style={{ fontSize: '10px' }}>Who Can Send Him Friendrequest?</th>
            <th style={{ fontSize: '10px' }}>Sent You a Friend Request</th>
            <th style={{ fontSize: '10px' }}>IsFriends</th> {/* contact button appears */}
          </tr>
        </thead>
        <tbody>
          {
            users.map(({socketid,whocansendmefr,isFriendRequest}) => socketid !== socket.id && <tr style={{ fontSize: '10px' }} key={socketid + `${new Date()}`}>

              <td>{socketid}</td>

              <td>{
                whocansendmefr === `everyone` 
                &&
                <button onClick={() => AddMeAsAFriend({socketid})}>Add Me As A Friend</button>}</td>

              <td>{isFriendRequest}</td>

            </tr>
            )
          }
        </tbody>
      </table>
    </center>
  )
}
