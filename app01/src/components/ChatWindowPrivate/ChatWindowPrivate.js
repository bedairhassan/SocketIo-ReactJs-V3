import React, { PureComponent } from 'react'

import TinyTable from './TinyTable'

class ChatWindowPrivate extends PureComponent {

    constructor(props) {
        super(props)

        this.state = {
            socket: props.socket,
            filteredSetSocketId: [],
            users: [],
            ToViewPrivateSet: -1 // contains socket id which will be sent to child. // INTEGER
        }
    }

    componentDidMount() {

        this.state.socket.on(`chat2`, user => {

           // console.log(new Date(), {

            //     fileName: `ChatWindowPrivate.js`,
            //     event: `chat2`,
            //     action: `object`,
            //     data: user
            // })

            user = { ...user, date: new Date() + `` }
            // 
            user = { ...user, isPrivate: true }

            this.setState({ users: [...this.state.users, user] })

            // since done with main...


            // let's do the set for displaying set of private users
            let set = new Set()

            for (let i = 0; i < this.state.users.length; i++) {
                set.add(this.state.users[i].src)
            }
            //console.log(new Date(), `SET IS `, set)

            // this.state.users.array.forEach(element => {
            //     set.add(element.src)
            // });

            // let r = Array.from(set)
            this.setState({ filteredSetSocketId: [...Array.from(set)] })

          //  console.log(new Date())
            console.table(this.state.filteredSetSocketId)

            // our next step is sending filteredSetSocketId to a child ???
            // NO!
            // traverse same data to child....
            // ALL WE NEED FRom this set is one single thing...
            // what did the user click on !
        })
    }

    render() {
        return (
            <div style={{ fontSize: '10px', color: `red` }}>

                ChatWindowPrivate

                <table>

                    <thead>
                        <th>private chat users</th>
                        <th>actual messages</th>
                    </thead>

                    <tbody>
                        <tr>
                            {this.state.users.length > 0 && this.state.filteredSetSocketId.map(socketid =>
                                <React.Fragment>
                                    <h1 onClick={() => {
                                   //     console.log(new Date(), `clicking on user`); 
                                   //console.table(socketid);
                                        this.setState({ ToViewPrivate: socketid }) // ToViewPrivate is INTEGER
                                    }}>{socketid}</h1>
                                </React.Fragment>
                            )}
                        </tr>
                        <tr>
                            <TinyTable

                                users={this.state.users}
                                userTarget={this.state.Z}
                            />
                        </tr>
                    </tbody>

                </table>


            </div>
        )
    }
}

export default ChatWindowPrivate