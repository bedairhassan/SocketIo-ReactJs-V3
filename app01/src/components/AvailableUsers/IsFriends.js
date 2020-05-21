import React from "react"
import { smallFont } from '../mystyles'

export default function IsFriends({ socket, user: { isFriends, socketid } }) {

    const buttonName = `Contact Private`

    return (
        <React.Fragment >
            {isFriends ? <button
            class="btn btn-primary"
                onClick={() => socket.emit(`Contacting`, socketid)}>{buttonName}</button> : `false`}
        </React.Fragment>
    )
}
