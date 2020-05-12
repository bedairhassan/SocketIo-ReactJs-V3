import React, { useState, useEffect } from 'react'

import { mysocketid } from '../utils/events'
import Select from '../components/reusable/Select'

// import '
import '../../src/App.css';
import Contacting from '../Contacting'

function DisplayMySocket({ socket, returnSocketId }) {

  // const [user, userSet] = useState({ socketid: -1, whocansendmefr: `everyone` })
  const [socketid, socketidSet] = useState(-1)

  useEffect(() => {

    console.log(new Date(), `useEffect, mysocketid`, socket.id)
    socket.on(mysocketid, socketid => {

      socketidSet(socketid)
      returnSocketId(socketid)
    })

  }, [])

  return (

    <tr>
      <td>socketid</td>
      <td>{socketid}</td>
    </tr>
  )
}

export default function UserData({ socket }) {

  const [user, userSet] = useState({ socketid: -1, whocansendmefr: `everyone` })

  return (
    // <center className={`sidenav`}>
    <center>

      <table style={{ fontSize: '10px' }}>
        <thead>
          <th>title</th>
          <th>value</th>
        </thead>
        <tbody>
          <DisplayMySocket socket={socket} returnSocketId={socketid => {

            console.log(new Date(),`let's print user object`)
            console.table(user)
            userSet({ ...user, socketid })
          }} />
          <tr>
            <td>Who can send me friend request?</td>
            <td><Select
              data={[`-`, `everyone`, `nobody`]}
              onClick={whocansendmefr => {

                console.log(`select is `, whocansendmefr) // working
                userSet({ ...user, whocansendmefr })
                socket.emit(`update user`, user)
              }} /></td>
          </tr>
          <Contacting socket={socket} />
        </tbody>
      </table>

      {/* <div style={{ fontSize: '10px' }} >What is my socket id? {user.socketid}</div> */}




    </center>
  )
}

// export default UserData
