import React, { useState, useEffect } from 'react'

// import {availableusers} from '../utils/events'

import { SocketIdsDynamic } from './utils'

import Select from '../reusable/Select'

export default function Table({ socket }) {

  const [users, usersSet] = useState([])

  var [select, selectSet] = useState(`-`)
  var [filteredData, filteredDataSet] = useState([])

  // for private messages
  // useEffect(()=>,[])


  // it receives a message within the user
  useEffect(() => socket.on(`chat`, user => usersSet(oldUsers => [...oldUsers, user])), [])

  // TODO: put it in utils ! 
  // const 

  useEffect(() => {

    // base condition
    if (select === `-`) {
      filteredDataSet([...users])
      return
    }

    // reuse this variable `tmpFilter` as if it is `users`
    var tmpFilter = users.filter(user => user.socketid === select)

    filteredDataSet([...tmpFilter])

  }, [select])

  return (
    <center>
      <table>
        <tr>
          <th style={{ fontSize: '10px' }}>date</th>
          <th style={{ fontSize: '10px' }}>socket id
          <br />
          Please select an option
            <Select onClick={(e) => selectSet(e)} data={SocketIdsDynamic(users)} />
          </th>
          <th style={{ fontSize: '10px' }}>message</th>
          <th style={{ fontSize: '10px' }}>isPrivate</th>
        </tr>

        {/* {onClick,data} */}
        {/* // so useEffect can be triggered! */}


        <tbody>
          {
            filteredData.map(({date,socketid,message,isPrivate}) =>
              <tr style={{ fontSize: '10px' }} key={date}>
                <td>{date}</td>
                <td>{socketid}</td>
                <td>{message}</td>
            <td>{isPrivate===`true`?`Private`:`Public`}</td>
              </tr>
            )
          }
        </tbody>
      </table>
    </center>
  )
}
