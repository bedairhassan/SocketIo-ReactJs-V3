import React, { PureComponent } from 'react'

// helpers
import IsFriends from '../AvailableUsers/IsFriends'
import { isBlockedUpdateArray, update_isFriendsTrue, update_SentMe } from '../AvailableUsers/utils'

import Approve from '../AvailableUsers/Approve'
import BlockButton from '../AvailableUsers/BlockButton'
import CountDisplay from '../AvailableUsers/CountDisplay'
import SendFriendRequestButton from '../AvailableUsers/SendFriendRequestButton'

export default class AvailableUsersReactJs extends PureComponent {

    constructor(props) {
        super(props)

        this.state = {
            socket: props.socket,
            users: []
        }
    }

    componentDidMount() {

        this.state.socket.on(`localUsersUpdate`, users =>
            this.setState({ users }))

        this.state.socket.on(`blockk`, data =>

            this.setState({ users: isBlockedUpdateArray(this.state.users, data.src, data.condition) })
        )

        // target is me since I am listening for requests
        // use src variable
        this.state.socket.on(`letsBeFriends`, ({ target, src }) =>
            this.setState({ users: update_isFriendsTrue(this.state.users, src) })
        )

        this.state.socket.on(`Available Users`, users => this.setState({ users }))

        this.state.socket.on(`update user`, users => this.setState({ users }))

        // currently, I am the target
        this.state.socket.on(`fr`, ({ src, target }) =>

            this.setState({ users: update_SentMe(this.state.users, src, target) })
        )
    }

    userDisplay(user) {

        // console.log(user.socketid)
        // console.log(this.state.socket.id)
        if (user.socketid !== this.state.socket.id) {

            const socketid = user.socketid

            if (!user.isBlocked) {
                return (
                    <tr style={{ fontSize: '10px', color: `red` }}>
                        <td>{socketid}</td>
                        <td>
                            <SendFriendRequestButton 
                                user={user}
                                socket={this.state.socket}
                            />
                        </td>
                        <td>
                            <Approve
                                socket={this.state.socket}
                                user={user}
                                users={this.state.users}
                                src={this.state.socket.id}
                            />
                        </td>
                        <td>
                            <IsFriends
                                socket={this.state.socket}
                                user={user}
                            />
                        </td>
                        <td>
                            <BlockButton
                                socket={this.state.socket}
                                user={user}
                            />
                        </td>
                        <td>
                            <CountDisplay
                                user={user}
                            />
                        </td>

                    </tr>
                )
            }
            else {
                return (<h1></h1>)
            }
        }

        // return(<h1>no records</h1>)
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <table>
                        <thead style={{ fontSize: '10px', color: `red` }}>
                            <th>Socket Id</th>
                            <th>Friend Request</th>
                            <th>Approval</th>
                            <th>Friends ?</th>
                            <th>Block</th>
                            <th>Messages Count</th>
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



//   <RadioButton onClick={data=>console.log(data)} items={[`item1`,`item2`]}/>


// {socket,user}

