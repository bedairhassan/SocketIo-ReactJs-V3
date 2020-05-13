import React, { useState, useEffect } from 'react'

import { mysocketid } from '../utils/events'
import Select from '../components/reusable/Select'

// import '
import '../../src/App.css';
import Contacting from '../components/Contacting'

function WhoCanSendMeFr({ socket, onClick, userPrev }) {

  const [user, userSet] = useState(userPrev)

  const onClickThis = (whocansendmefr) => {
    onClick(whocansendmefr)
    // console.log(new Date(),`vlookup`,whocansendmefr)
    const obj = { ...user, whocansendmefr }
    socket.emit(`update user`, obj)
  }

  return (
    <tr>
      <td>Who can send me friend request?</td>
      <td>
        <Select
          data={[`-`, `everyone`, `nobody`]}
          onClick={whocansendmefr => onClickThis(whocansendmefr)} /></td>
    </tr>
  )
}

function DisplayMySocket({ socket, returnSocketId }) {

  const [socketid, socketidSet] = useState(-1)

  const onClickThis = (socketid) => {
    socketidSet(socketid)
    returnSocketId(socketid)
  }

  useEffect(() => socket.on(mysocketid, socketid => onClickThis(socketid)), [])

  return (

    <tr>
      <td>Socket Id</td>
      <td>{socketid}</td>
    </tr>
  )
}

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

          {/* <button onClick={() => {

            console.log(new Date(), `let's print user object`)
            console.table(user)
          }}>hiiiiiiiiiiiiiiiiiii</button> */}

          <DisplayMySocket
            socket={socket}
            returnSocketId={socketid => userSet({ ...user, socketid })} />

          {/* <WhoCanSendMeFr
            userPrev={user}
            socket={socket}
            onClick={(whocansendmefr) => userSet({ ...user, whocansendmefr })} /> */}

          <tr>
            <td>Who can send me friend request? and bug: who can contact me this second</td>
            <td>
              <Select
                data={[`everyone`, `nobody`]}
                onClick={whocansendmefr => {

                  userSet({ ...user, whocansendmefr })
                  socket.emit(`update user`, { ...user, whocansendmefr })
                }} />

            </td>
          </tr>

          <Contacting socket={socket} />

        </tbody>
      </table>
    </center>
  )
}

// export default UserData
