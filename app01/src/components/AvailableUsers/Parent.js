import React, { PureComponent } from 'react'

// helpers
import IsFriends from '../AvailableUsers/IsFriends'
import { isBlockedUpdateArray,update_isFriendsTrue,update_SentMe } from '../AvailableUsers/utils'

export default class AvailableUsersReactJs extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            socket: props.socket,
            users: []
        }
    }

    componentDidMount() {

        this.state.socket.on(`blockk`, data =>

            this.setState({ users: isBlockedUpdateArray(this.state.users, data.src, data.condition) })
        )

        // target is me since I am listening for requests
        // use src variable
        this.state.socket.on(`letsBeFriends`, ({ target, src }) => 
            this.setState({ users: update_isFriendsTrue(this.state.users,src) })
        )

        this.state.socket.on(`Available Users`, users =>  this.setState({ users }))

        this.state.socket.on(`update user`, users => this.setState({ users }))

        // currently, I am the target
        this.state.socket.on(`fr`, ({ src, target }) => 

            this.setState({ users: update_SentMe(this.state.users,src,target) })
        )
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
                            style={{ fontSize: '10px', color: `red` }}>Send</button>}</td>
                    )
                } else {

                    return (<h1>nobody</h1>)
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

            // props


            const BlockButton = () => {

                const obj = {

                    target: user.socketid,
                    src: this.state.socket.id
                }

                const blockFeature = (blockCondition) => {
                    this.state.socket.emit(`blockk`, { ...obj, condition: blockCondition })
                }

                return (

                    <td>
                        {/* <button
                            onClick={() => blockFeature()}
                        >block</button> */}

                        <RadioButton
                            onClick={(e) => { e === `Block` ? blockFeature(true) : blockFeature(false) }}
                            items={[`Block`, `Unblock`]}
                            groupName={`Block`}
                        />

                    </td>
                )
            }

            const CountDisplay = () => {

                const { count } = user

                return (
                    <td>{count}</td>
                )
            }


            // !user.isBlocked && <h1>Display HIS RECORD </h1>

            if (!user.isBlocked) {
                return (
                    <tr style={{ fontSize: '10px', color: `red` }}>
                        <td>{socketid}</td>
                        <SendFriendRequestButton />
                        <Approve />
                        <td><IsFriends socket={this.state.socket} user={user} /></td>
                        <BlockButton />
                        <CountDisplay />

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

function RadioButton({ onClick, items, groupName }) {

    return (
        <React.Fragment>
            <form onClick={(e) => onClick(e.target.value)}>

                {
                    items.map(item => <React.Fragment>
                        <input name={groupName} type="radio" value={item} /> {item}</React.Fragment>)
                }

            </form>
        </React.Fragment>
    );
}

//   <RadioButton onClick={data=>console.log(data)} items={[`item1`,`item2`]}/>


// {socket,user}

