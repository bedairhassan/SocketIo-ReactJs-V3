import React, { useState, useEffect } from 'react'

// import {availableusers} from '../utils/events'

import { SocketIdsDynamic } from './utils'

import Select from '../reusable/Select'
import FilterByMessage from './FilterByMessage/FilterByMessage'

import Chat from '../Chat Component/Chat'

// export default function Table({ socket }) {
export default class Table extends React.Component {

  // constructor(prop)
  constructor(props) {

    super(props)

    // const { socket } = props
    // console.log(`constructor, `, props.socket.id)

    this.state = {

      socket: props.socket,
      users: []
    }
  }

  componentDidMount() {

    this.state.socket.on(`chat`, user => {

      user = { ...user, date: new Date() + `` }

      this.setState({ users: [...this.state.users, user] })


      console.log(`chat`)
      // console.log(this.state.users)
      console.table(this.state.users)
    })

    this.state.socket.on(`chat2`, user => {

      console.log(new Date(), `chat2`, `displaying user`)

      user = { ...user, date: new Date() + `` }
      // 
      user = { ...user, isPrivate: true }

      this.setState({ users: [...this.state.users, user] })

      console.log(`chat2`)
      // console.log(this.state.users)
      console.table(this.state.users)
    })
  }

  render() {


    // const isPrivate = isPrivate === true ? `Private` : `Public`
    return (
      <React.Fragment>

        {/* date,socketid,message,isPrivate */}
        {
          this.state.users.map(({ date, src, message, isPrivate,target }) => {

            const isPrivatee = isPrivate === true ? `[Private]` : `[Public]`
            const isYou = src===this.state.socket.id ? `YOU` : ``

            return ( // let's delete messages count!

              <React.Fragment>

                <Chat
                  person={isYou}
                  data={message}
                  extraData={[`[Date] ${date}`,`${isPrivatee}`,`${!isYou&&isPrivate ? src : ``}`,`${isPrivate && isYou ? 'Target: '+target:''}`,`${!isPrivate ? src:``}`]}
                />

                {/* // <tr style={{ fontSize: '10px' }} key={date}>
              //   <td>{date}</td>
              //   <td>{src}</td>
              // </tr> */}

              </React.Fragment>
            )
          }
          )
        }

      </React.Fragment>
    )
  }
}

// <tr style={{ fontSize: '10px' }} key={date}>
              //   <td>{date}</td>
              //   <td>{src}</td>
              //   <td>{message}</td>
              //   <td>{isPrivate === true ? `Private` : `Public`}</td>
              // </tr>


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