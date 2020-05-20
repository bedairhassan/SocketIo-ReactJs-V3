import React, { useState, useEffect } from 'react'

// import { mysocketid } from '../utils/events'
import Select from '../reusable/Select'

// import '
// import '../../src/App.css';
import ParentContact from './ParentContact'
import DisplayMySocket from './DisplayMySocket'

export default function UserData({ socket }) {

  const [user, userSet] = useState({ socketid: -1, whocansendmefr: `everyone` })

  return (

    <center>

      <table style={{ fontSize: '10px' }}>
        <thead>
          <th>title</th>
          <th>value</th>
        </thead>
        <tbody>

          <DisplayMySocket
            socket={socket}
            returnSocketId={socketid => userSet({ ...user, socketid })} />

          <ParentContact socket={socket} />

        </tbody>
      </table>
    </center>
  )
}

// export default UserData
