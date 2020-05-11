import React, { useEffect, useState } from 'react'

function AvailableUsers({ socket }) {

    const [users, usersSet] = useState([])
    const [isUsersUpdated,isUsersUpdatedSet]=useState(false)

    const UpdateUserFun = ()=>{

        socket.on(`update user`, users => {

            usersSet(users)
            console.log(new Date(), `update user`, users)
        })
        isUsersUpdatedSet(!isUsersUpdated)
    }

    const AvailableUsersFun = () => { //  TODO: delete this.

        // var users = [];

        

        socket.on(`Available Users`, users => {

            usersSet(users)
            console.log(new Date(), `Available Users`, users)

            isUsersUpdatedSet(!isUsersUpdated)
        })

        // users = [{socketid:11212},{socketid:12121212}]
        // usersSet([...users])
        // usersSet(users)

        // return 
    }

    useEffect(AvailableUsersFun, [])
    useEffect(UpdateUserFun, [])

    const receivedFriendReq = () => {

        console.log(`${new Date()}, receivedFriendReq, ${buttonClicked}`)
        console.log(new Date(),`received frq, let's display array`,users)
        
        var FINALLY=false;
        console.log(new Date(),`FIRST: finally`,{FINALLY})
        socket.on(`fr`,({src})=>{
            
            console.log(new Date(),`fr`,{src},`would like to send you a friend request`)
            FINALLY=true
            console.log(new Date(),`SECOND: finally`,{FINALLY})
        })

        console.log(new Date(),`THIRD: finally`,{FINALLY})
        if(FINALLY){

            console.log(new Date(),`FIRST: finally`,{FINALLY})
            console.log(new Date(),`AFTER FINALLY received frq, let's display array`,users)
        }
    }

    const [buttonClicked, buttonClickedSet] = useState(false)
    useEffect(receivedFriendReq, [isUsersUpdated,buttonClicked])

    return (
        <React.Fragment>

            <table>
                <thead style={{ fontSize: '10px' }}>
                    <th>socketid</th>
                    <th>who can fr</th>
                    <th>isFriendRequestReceived</th>
                    {/* <th>header2</th> */}
                </thead>
                <tbody>
                    {
                        users.map(({ socketid, whocansendmefr,isFrRec }) => (socketid !== socket.id) && <tr style={{ fontSize: '10px' }}>

                            <td>{socketid}</td>
                            <td>{whocansendmefr === `everyone` && <button onClick={() => {

                                const obj = { src: socket.id, target: socketid }
                                buttonClickedSet(!buttonClicked)
                                console.log(new Date(), `fr`, obj)
                                socket.emit(`fr`, obj)
                            }}>add</button>}</td>

                            <td>{isFrRec+` `}</td>

                        </tr>)
                    }
                </tbody>

            </table>

        </React.Fragment>
    )
}

export default AvailableUsers
