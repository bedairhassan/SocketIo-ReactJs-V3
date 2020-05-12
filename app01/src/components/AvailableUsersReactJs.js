// TODO: remove all comments.

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

        this.state.socket.on(`letsBeFriends`, ({ src }) => {

// FIXED ! - guest is not defined. 
// if already friends ! - we need to disallow sending friend requests!
// but how come if isFriends is a dynamic attribute which appears later in code !

            // so guest is undefined for some reason.
            // let's modify client array and concatenate attribute isFriends!
            // isFriends attribute is irrelevant to server !!!!

            let users = [...this.state.users]

            let tmpDISPLAYTABLE = []
            for (let i = 0; i < users.length; i++) {


                tmpDISPLAYTABLE.push({source:users[i].socketid,guest:src})
                if (users[i].socketid === src) {

                    users[i] = { ...users[i], isFriends: true }
                    console.log(new Date())
                    console.table(users[i]) // later try : console.table(new Date(),tmp[i])

                    break;
                }
            }

            console.log(new Date(),`tmpDisplayTable`)
            console.table(tmpDISPLAYTABLE)

            this.setState({ users })
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

            // TODO: replace this with clean code... 
            // .filter
            // obj = {...obj,isFrRec:true}
            // this.state.socket.emit(`update user`,obj)
            for (let i = 0; i < this.state.users.length; i++) {
                if (this.state.users[i].socketid === src) {

                    // copy =  // object.modified=true
                    this.state.socket.emit(`update user`, { ...this.state.users[i], isFrRec: true }) // if emitted object's socketid is as same as object in server's array's object's socketid, proceed to replace
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
                        <th>isFriends</th>
                        {/* <th>header2</th> */}
                    </thead>
                    <tbody>
                        {
                            this.state.users.map(({ socketid, whocansendmefr, isFrRec,isFriends }) => (socketid !== this.state.socket.id) && <tr style={{ fontSize: '10px' }}>

                                <td>{socketid}</td>
                                <td>{whocansendmefr === `everyone` && <button onClick={() => {

                                    const obj = { src: this.state.socket.id, target: socketid }
                                    // buttonClickedSet(!buttonClicked)
                                    console.log(new Date(), `fr`, obj)
                                    this.state.socket.emit(`fr`, obj)
                                }}>add</button>}</td>

                                <td>{isFrRec && <button onClick={() => {

                                    console.table(`letsBeFriends`, { target: socketid, src:this.state.socket.id }) // row record

                                    // order server to emit to two users :)
                                    // since socket.on's will be at !!!!!!!
                                    this.state.socket.emit(`letsBeFriends`, { target: socketid, src:this.state.socket.id})

                                    // for current user, modify client array ?  YES
                                    // or place it all at socket.on ? NO!

                                    // ... working!
                                    let users = [...this.state.users]

                                    for (let i = 0; i < users.length; i++) {

                                        if (users[i].socketid === socketid) {

                                            users[i] =
                                                { ...users[i], isFriends: true }

                                            break;
                                        }
                                    }

                                    this.setState({ users })

                                }}>accept both sides, change button name</button>}</td>

                            <td>{isFriends && <button onClick={()=>{
                                
                                console.log(new Date(),`Currently Contacting`,{target: socketid})

                                // i will update myself
                                this.state.socket.emit(`Contacting`,socketid)

                            }}>Contact Private</button>}</td>

                            </tr>)
                        }
                    </tbody>

                </table>

            </React.Fragment>
        )
    }
}

