import React from 'react'

const Button = ({ socket, target, message, src, className }) => {

    const eventName = target === -1 ? `chat` : `chat2`
    const buttonName = target === -1 ? `Broadcast Message` : `Send Private`

    const chat = { src, message }
    const chat2 = { ...chat, target }

    const data = () => eventName === `chat` ? chat : chat2
    const Action = () => socket.emit(eventName, data())

    return (

        <React.Fragment>

            <button
                className={className}
                onClick={() => Action()} class="btn btn-primary">{buttonName}</button>

        </React.Fragment>
    )
}

export default Button
