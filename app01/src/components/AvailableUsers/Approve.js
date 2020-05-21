import React from "react"
import { update_isFriendsTrue } from '../AvailableUsers/utils'

const Approve = ({ user, src, socket, users }) => {

    const Action = () => {

        const { socketid } = user

        socket.emit(`letsBeFriends`, {

            src,
            target: socketid
        })

        socket.emit(`localUsersUpdate`, update_isFriendsTrue(users, socketid))
    }

    const { SentMe } = user

    return (

        <React.Fragment>
            {
                SentMe === src ?
                    <button onClick={() => Action()}
                    class="btn btn-primary">Approve</button>
                    : <h6>-</h6>
            }
        </React.Fragment>
    )

}

export default Approve;