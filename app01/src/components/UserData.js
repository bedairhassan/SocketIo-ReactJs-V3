import React, { useState, useEffect } from 'react'

import { mysocketid } from '../utils/events'
import Select from '../components/reusable/Select'

export default function UserData({ socket }) {

  const [user, userSet] = useState({ socketid: -1, whocansendmefr: `everyone` })

  useEffect(() => {

    console.log(new Date())
    console.log(`useEffect for mysocketid`)
    socket.on(mysocketid, socketid => {

      console.log(socketid)
      userSet({ ...user, socketid })
    })

  }, [])

  return (
    <center>
      <div style={{ fontSize: '10px' }}>What is my socket id? {user.socketid}</div>

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
