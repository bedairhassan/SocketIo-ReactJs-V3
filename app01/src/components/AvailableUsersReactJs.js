import React, { PureComponent } from 'react'

export default class AvailableUsersReactJs extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            socket: props.socket,
            users: []
        }
    }

    componentDidMount() {

        const isBlockedUpdateArray = (socketid,condition) =>{

            let copy = [...this.state.users]

            for (let i = 0; i < copy.length; i++) {

                if (copy[i].socketid === socketid) {
                    copy[i] = { ...copy[i], isBlocked: condition }

                    // break; // DO NOT BREAK THIS STATEMENT // leads to missing records
                }
            }

            return copy
        }

        this.state.socket.on(`blockk`, data => { // +unblockk // have shared function
            const {src,condition} = data

            // how about one line, and false => !condition
            // how about one line, and true => condition
            if(!condition) {
                this.setState({ users: isBlockedUpdateArray(src,false) })// render
            }else{
                this.setState({ users: isBlockedUpdateArray(src,true) })// render
            }

            // this.setState({users:this.state.users.filter(user=>user.socketid!==socketid)}) // stage 1

            // stage 2, write quick code.

            // let copy = [...this.state.users]

            // for (let i = 0; i < copy.length; i++) {

            //     if (copy[i].socketid === socketid) {
            //         copy[i] = { ...copy[i], isBlocked: true }

            //         // break; // DO NOT BREAK THIS STATEMENT // leads to missing records
            //     }
            // }

            // console.table(copy)
            // this.setState({ users: copy })// render 
             
        })

        // target is me since I am listening for requests
        // use src variable
        this.state.socket.on(`letsBeFriends`, ({ target, src }) => {

            // src ==> setisFriendstottrue

            let copy = [...this.state.users]

            for (let i = 0; i < copy.length; i++) {

                if (copy[i].socketid === src) {

                    copy[i] = { ...copy[i], isFriends: true }
                }
            }

            // render
            this.setState({ users: [...copy] })
        })

        this.state.socket.on(`Available Users`, users => {

            console.table(users)
            this.setState({ users })

        })

        this.state.socket.on(`update user`, users => {

            this.setState({ users })
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

            const isFriends = user.isFriends ?

                <button 

                    onClick={() => {

                        this.state.socket.emit(`Contacting`, user.socketid)

                    }}

                >Contact Private</button>

                : `false`

            const BlockButton = () => {

                const obj = {

                    target: user.socketid,
                    src: this.state.socket.id
                }

                const blockFeature = (blockCondition)=>{
                    this.state.socket.emit(`blockk`, {...obj,condition:blockCondition})
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

            const CountDisplay = ()=>{

                const {count}=user

                return(
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
                        <td>{isFriends}</td>
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