import React, { useState, useEffect } from 'react'

// import { mysocketid } from '../utils/events'
import Select from '../reusable/Select'

// import '
// import '../../src/App.css';
import ParentContact from './ParentContact'
// import DisplayMySocket from './DisplayMySocket'

import Headers from '../reusable/Headers'

export default function UserData({ socket }) {



  return (

    <center>

      <table class="table table-striped">
        <Headers headers={[`title`, `value`]} />
        <tbody>

          <DisplaySocket socket={socket} />
          <ParentContact socket={socket} />

        </tbody>
      </table>
    </center>
  )
}




class DisplaySocket extends React.Component {

  constructor(props) {

    super(props)

    this.state = {
      socket: props.socket,
      socketid:-1
    }
  }

  componentDidMount() {
    this.state.socket.on(`what is my socketid`, socketid => this.setState({socketid}))
  }

  render() {

    return (
      <React.Fragment>
        <tr>
          <td>Socket Id</td>
          <td>{this.state.socketid}</td>
        </tr>
      </React.Fragment>
    )
  }
}
