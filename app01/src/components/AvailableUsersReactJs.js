import React, { PureComponent } from 'react'

class AvailableUsersReactJs extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            socket: props.socket,
            users: []
        }
    }

    componentDidMount() {

        // target is me since I am listening for requests
        // use src variable
        this.state.socket.on(`letsBeFriends`,({target,src})=>{

            // src ==> setisFriendstottrue

            let copy = [...this.state.users]

            for (let i=0;i<copy.length;i++){

                if(copy[i].socketid===src){

                    copy[i] = { ...copy[i], isFriends: true }
                }
            }

            // render
            this.setState({users:[...copy]})
        })

        this.state.socket.on(`Available Users`, users => {

            console.table(users)
            this.setState({ users })

        })

        this.state.socket.on(`update user`, users => {

            this.setState({ users: users })
            console.table(users)
        })

        // currently, I am the target
        this.state.socket.on(`fr`, ({ src, target }) => {

            var copy = [...this.state.users]

            // cycle through array
            for (let i = 0; i < copy.length; i++) {

                // search for src
                if (copy[i].socketid === src) {

                    console.log(new Date(), `founding src`)

                    // implementation
                    copy[i] = { ...copy[i], SentMe: target }

                    console.table(copy[i])

                    // if found, break
                    break;
                }
            }

            // render
            this.setState({ users: [...copy] })
        })
    }

    userDisplay(user) {

        // console.log(user.socketid)
        // console.log(this.state.socket.id)
        if (user.socketid !== this.state.socket.id) {

            const socketid = user.socketid
            const SendFriendRequestButton = () => {

                if (user.whocansendmefr === `everyone`) {
                    return (
                        <td>{<button

                            onClick={() => {

                                const obj = { src: this.state.socket.id, target: user.socketid }

                                console.log(obj)
                                this.state.socket.emit(`fr`, obj)
                            }}
                            style={{ fontSize: '10px', color: `red` }}>Send Friend Request</button>}</td>
                    )
                }else{

                    return(<h1>nobody</h1>)
                }
            }

            const Approve = () => {

                if (user.SentMe === this.state.socket.id) {
                    return (
                        <td>
                            <button onClick={() => {

                                // alert(user.socketid)
                                const obj = {

                                    src: this.state.socket.id,
                                    target: user.socketid
                                }
                                console.table(obj)
                                this.state.socket.emit(`letsBeFriends`, obj)

                                // event 2 : update record of current @user.socketid => isFriends true!
                                var copy = [...this.state.users]

                                for (let i = 0; i < copy.length; i++) {

                                    if (copy[i].socketid === user.socketid) {

                                        copy[i] = { ...copy[i], isFriends: true }
                                        console.table(copy[i])
                                    }
                                }

                                // rendering for event2
                                this.setState({ users: [...copy] })

                            }}>Approve</button>
                        </td>
                    )
                } else {
                    return (
                        <td>-</td>
                    )
                }
            }

            // this will be a button 
            // const isFriends = user.isFriends ? `true` : `false`

            const isFriends = user.isFriends ? 
            
            <button 
            
            onClick={()=>{

                this.state.socket.emit(`Contacting`,user.socketid)

            }}

            >Contact Private</button>

            : `false`

            return (
                <tr style={{ fontSize: '10px', color: `red` }}>
                    <td>{socketid}</td>
                    <SendFriendRequestButton />
                    <Approve />
                    <td>{isFriends}</td>

                    {/* <td>{user.SentMe + ' ,,,' + this.state.socket.id}</td> */}

                </tr>
            )
        }

        // return(<h1>no records</h1>)
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <table>
                        <thead style={{ fontSize: '10px', color: `red` }}>
                            <th>socketid</th>
                            <th>who can send me friend request</th>
                            <th>Sent Me</th>
                            <th>isFriends</th>
                        </thead>

                        {/* tr, multiple td's */}

                        {
                            this.state.users.map(user =>
                                this.userDisplay(user))
                        }

                    </table>
                </div>
            </React.Fragment>
        )
    }
}

export default AvailableUsersReactJs