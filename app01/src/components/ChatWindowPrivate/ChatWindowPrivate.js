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
console.table(this.state.users)
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

    filteringFunction(){

        console.log(new Date(),`filteringFunction`)
console.table(this.state.users)
        const ret = this.state.users.filter(user=>user.socketid===this.state.ToViewPrivate)
        console.log(ret)

       return ret

        // return [{message:1}]
    }

    render() {
        return (
            <div style={{ fontSize: '10px', color: `red` }}>

                ChatWindowPrivate

              
                {this.state.users.length > 0 && this.state.filteredSetSocketId.map(socketid =>
                                <React.Fragment>
                                    <ul>
                                    <li>
                                        
                                       <button
                                       
                                       onClick={() => {
                                             this.setState({ ToViewPrivate: socketid }) // ToViewPrivate is INTEGER
                                         }}
                                       >{socketid}
                                           </button> 
                                        {socketid}
                                    
                                    
                                    </li>
                                    </ul>
                                </React.Fragment>
                            )}

                    
                           <table>
                               
                               <thead>
                                   <th>date</th>
                                   <th>message</th>
                               </thead>

                               <tbody>
                               {
                               this.filteringFunction().map(element=>
                                    <tr>
                                        <td>{element.date}</td>
                                        <td>{element.message}</td>
                                    </tr>
                               )
                           }
                               </tbody>
                           </table>
                       

            </div>
        )
    }
}

export default ChatWindowPrivate