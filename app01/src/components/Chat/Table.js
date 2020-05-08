import React, { useState, useEffect } from 'react'

// import {availableusers} from '../utils/events'

import Select from '../reusable/Select'

export default function Table({ socket }) {

  const [users, usersSet] = useState([])
  
  var [select,selectSet]=useState(`-`)
  var[filteredData,filteredDataSet]=useState([])

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

  // TODO: put it in utils ! 
  const SocketIdsDynamic = (data) => {

    var arr = data.map(item => item.socketid)

    let set = new Set()
    arr.forEach(item => set.add(item)) // set is ready

    arr = []
    arr.push(`-`)
    set.forEach(item => arr.push(item))

    // console.log(arr)
    return arr
}

useEffect(()=>{

  // const {color,shape}=select
  console.log(`useeffect`)
  console.log(`select at useffect is `,select)


  // base condition
  if(select===`-`){
    console.log(`- has been selected`)
    // filteredData=[...data]
    filteredDataSet([...users])
    return
    // console.log(filteredData)
  }

  var tmpFilter = users.filter(user=>user.socketid===select)

  // tmpFilter gets reused and reused
  // var tmpFilter = FilterColor(data,color)
  // tmpFilter = FilterShape(tmpFilter,shape)

  filteredDataSet([...tmpFilter])

},[select])

  return (
    <center>
      <table>
        <tr>
          <th style={{ fontSize: '10px' }}>date</th>
          <th style={{ fontSize: '10px' }}>socket id
          <br/>
          <Select onClick={(e)=>selectSet(e)} data={SocketIdsDynamic(users)}/>
          </th>
          <th style={{ fontSize: '10px' }}>message</th>
        </tr>

        {/* {onClick,data} */}
        {/* // so useEffect can be triggered! */}
        

        <tbody>
          {
            filteredData.map(user =>
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
