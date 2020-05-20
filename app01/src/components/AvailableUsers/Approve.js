import React from "react"
import { update_isFriendsTrue } from '../AvailableUsers/utils'

const Approve = ({ user, src,socket,users }) => {

    const Action = () => {

        const {socketid}= user

        socket.emit(`letsBeFriends`, {

            src,
            target: socketid
        })

        socket.emit(`localUsersUpdate`, update_isFriendsTrue(users, socketid))
    }

    const {SentMe}= user

    return (

        <React.Fragment>
            {
                SentMe === src ?
                    <td>
                        <button onClick={() => Action()}>Approve</button>
                    </td>
                    : <td>-</td>
            }
        </React.Fragment>
    )

}

export default Approve;