import React, { useState, useEffect } from 'react'

import { mysocketid } from '../utils/events'
import Select from '../components/reusable/Select'

// import '
import '../../src/App.css';

export default function UserData({ socket }) {

  const [user, userSet] = useState({ socketid: -1, whocansendmefr: `everyone` })

  useEffect(() => {

    console.log(`%c${new Date()}`,'color:red')
    console.log(`useEffect for mysocketid`)
    socket.on(mysocketid, socketid => {

      console.log(socketid)
      userSet({ ...user, socketid })
    })

  }, [])

  return (
    // <center className={`sidenav`}>
    <center>
      <div style={{ fontSize: '10px' }} >What is my socket id? {user.socketid}</div>

            Who can send me friend request?
            <Select 
            data={[`-`,`everyone`,`nobody`]} 
            onClick={whocansendmefr=>{

              console.log(`select is `,whocansendmefr) // working
              userSet({...user,whocansendmefr})
              socket.emit(`update user`,user)
            }}/>

    </center>
  )
}

// export default UserData
