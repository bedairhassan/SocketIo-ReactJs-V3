import React from "react"

export default function IsFriends({ socket, user: { isFriends, socketid } }) {

    const buttonName = `Contact Private`

    const Action = () => socket.emit(`Contacting`, socketid)

    const Button = () => <button
        class="btn btn-primary"
        onClick={() => Action()}>{buttonName}</button>

    const FalseButton = ()=> <button
    class="btn btn-danger"
    disabled={true}>Not Yet</button>

    return (
        <React.Fragment >
            {isFriends ? <Button /> : <FalseButton/>}
        </React.Fragment>
    )
}
