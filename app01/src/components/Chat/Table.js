import React, { useState, useEffect } from 'react'

// import {availableusers} from '../utils/events'

import { SocketIdsDynamic } from './utils'

import Select from '../reusable/Select'
import FilterByMessage from './FilterByMessage/FilterByMessage'

// export default function Table({ socket }) {
export default class Table extends React.Component {

  // constructor(prop)
  constructor(props) {

    super(props)

    const { socket } = props
   // console.log(`constructor, `, props.socket.id)

    this.state = {

      socket: props.socket,
      users: []
    }
  }

  // const [users, usersSet] = useState([])

  // var [select, selectSet] = useState(`-`)
  // var [filteredData, filteredDataSet] = useState([])

  // for private messages
  // useEffect(()=>,[])


  // it receives a message within the user
  // warn: I added date over here
  // it may be inaccurate
  // date of receiving packet yet I want to write cleaner code at server!

  componentDidMount() {

    this.state.socket.on(`chat`, user => {

      user = { ...user, date: new Date() + `` }

      // usersSet(oldUsers => [...oldUsers, user])
      this.setState({ users: [...this.state.users, user] })

    })

    this.state.socket.on(`chat2`, user => {

      console.log(new Date(),`chat2`,`displaying user`)

      user = { ...user, date: new Date() + `` }
      // 
      user = { ...user, isPrivate: true }

      this.setState({ users: [...this.state.users, user] })
    })
  }

  render() {
    return (
      <React.Fragment>
        <table>
          <tr>
            <th style={{ fontSize: '10px' }}>date</th>
            <th style={{ fontSize: '10px' }}>socket id
            <br />
              {/* Please select an option */}
              {/* <Select onClick={(e) => selectSet(e)} data={SocketIdsDynamic(users)} /> */}
            </th>
            <th style={{ fontSize: '10px' }}>message</th>
            <th style={{ fontSize: '10px' }}>isPrivate</th>
          </tr>

          {/* {onClick,data} */}
          {/* // so useEffect can be triggered! */}


          <tbody>
            {
              this.state.users.map(({ date, src, message, isPrivate }) =>
                <tr style={{ fontSize: '10px' }} key={date}>
                  <td>{date}</td>
                  <td>{src}</td>
                  <td>{message}</td>
                  <td>{isPrivate === true ? `Private` : `Public`}</td>
                </tr>
              )
            }
          </tbody>
        </table>

        <hr></hr>
        <hr></hr>
        <div style={{ fontSize: '10px' }}>
          Filter By Message
        <FilterByMessage data={this.state.users} />
        </div>

      </React.Fragment>
    )
  }
}


//  useEffect(() => {

//     // base condition
//     if (select === `-`) {
//       filteredDataSet([...users])
//       return
//     }

//     // reuse this variable `tmpFilter` as if it is `users`
//     var tmpFilter = users.filter(user => user.socketid === select)

//     filteredDataSet([...tmpFilter])

//   }, [select])