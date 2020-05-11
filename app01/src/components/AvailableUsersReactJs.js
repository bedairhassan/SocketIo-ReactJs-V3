import React, { useEffect, useState } from 'react'

export default class AvailableUsersReactJs extends React.Component {

    constructor(props) {

        super(props)

        const { socket } = props
        console.log(`constructor, `, props.socket.id)

        this.state = {

            socket,
            users: [],
        }
    }

    // const [users, usersSet] = useState([])
    // const [isUsersUpdated,isUsersUpdatedSet]=useState(false)

    componentDidMount() {

        this.state.socket.on(`Available Users`, users => {

            // usersSet(users)
            console.log(new Date(), `Available Users`, users)
            this.setState({ users: users })
            console.log(new Date(), `Available Users`, this.state.users)

            // isUsersUpdatedSet(!isUsersUpdated)
        })

        this.state.socket.on(`update user`, users => {

            this.setState({ users: users })
            console.log(new Date(), `update user`, this.state.users)
        })

        this.state.socket.on(`fr`, ({ src }) => { // src is socketid

            console.log(new Date(), `fr`, { src }, `would like to send you a friend request`)

            // 1. take copy of users 2. modify object of attr: isFrRec to true
            // var copy = {}
            // console.table(new Date(),`copy`,copy)
            // console.table(copy)

            for (let i = 0; i < this.state.users.length; i++) {
                if (this.state.users[i].socketid === src) {

                    // copy =  // object.modified=true
                    this.state.socket.emit(`update user`,{ ...this.state.users[i], isFrRec: true }) // if emitted object's socketid is as same as object in server's array's object's socketid, proceed to replace
                    // console.table(new Date(),`copy`,copy)
                    break;
                }
            }

            // console.table(copy)
            // this.setState({users:[...copy]})
            // socket.emit(`Available Users`,)
        })
    }


    render() {
        return (
            <React.Fragment>

                <table>
                    <thead style={{ fontSize: '10px' }}>
                        {/* working? */}
                    <th>socketid</th>
                        <th>who can fr</th>
                        <th>isFriendRequestReceived</th>
                        {/* <th>header2</th> */}
                    </thead>
                    <tbody>
                        {
                            this.state.users.map(({ socketid, whocansendmefr, isFrRec }) => (socketid !== this.state.socket.id) && <tr style={{ fontSize: '10px' }}>

                                <td>{socketid}</td>
                                <td>{whocansendmefr === `everyone` && <button onClick={() => {

                                    const obj = { src: this.state.socket.id, target: socketid }
                                    // buttonClickedSet(!buttonClicked)
                                    console.log(new Date(), `fr`, obj)
                                    this.state.socket.emit(`fr`, obj)
                                }}>add</button>}</td>

                                <td>{isFrRec + ` `}</td>

                            </tr>)
                        }
                    </tbody>

                </table>

            </React.Fragment>
        )
    }
}

