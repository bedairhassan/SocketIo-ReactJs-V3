// this covers both private and public messages
// let's create public version only to test the isseen

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

    // I print message details and who is viewing it !
    // so we can tell the src
    // Your message has been viewed by .... list of following users!

    this.state = {

      socket: props.socket,
      users: []
    }
  }

  

  Action(data,OriginalCopy){

    function ObjectComparison (obj1,obj2){      

      return obj1.date===obj2.date
      &&obj1.src===obj2.src
      &&obj1.message===obj2.message

    }

    const copy = [...OriginalCopy]

    for (let i=0;i<copy.length;i++){

      if (ObjectComparison(copy[i],data.message)){

        // do x,y
        copy[i].ViewedBy.push(data.ViewedBy)
        copy[i].isSeen=true

        break;
      }else if(copy[i].src===this.state.socket.id){ // if message src/socketid is equivalent to mine, then ...
        // why? because for that chat panel there may be messages with other socketid's

        // do x,y
        copy[i].ViewedBy.push(data.ViewedBy)
        copy[i].isSeen=true
        // do not break
      }
    }

    this.setState({users:[...copy]})
  }

  componentDidMount() {

    this.state.socket.on(`ViewedBy`, data => {

      const { ViewedBy, message } = data
      console.table(data)

      // we shall have isSeen set to true for this message and previous messages

      // let's cycle through each user/message and get his message
      this.Action(data,this.state.users)
    })

    // we need to add isSeen to false at CLIENT ONLY
    this.state.socket.on(`chat`, user => {

      user = { ...user, date: new Date() + `` }

      user = { ...user, isSeen: false } // this value shall not be seen by server!
      user = { ...user, ViewedBy: [] }

      this.setState({ users: [...this.state.users, user] })

      console.log(`chat`)
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
          this.state.users.map(user => {

            const { date, src, message, isSeen, ViewedBy } = user

            const isYou = src === this.state.socket.id ? `YOU` : ``
            const Date = `[Date] ${date}`

            const String = isYou ? `Target: Everyone` : `Src is ${src}`

            return ( // let's delete messages count!

              <React.Fragment>

                <Chat
                  person={isYou}
                  user={user}
                  isSeen={isSeen}
                  socket={this.state.socket}
                  data={message}
                  extraData={[Date, `[Public]`, String]}
                  ViewedBy={ViewedBy}
                />

                {/* <SeenBy ViewedBy={ViewedBy} /> */}

              </React.Fragment>
            )
          }
          )
        }

      </React.Fragment>
    )
  }
}

