import React from 'react'

const Button = ({ socket, target,message,src }) => {

    const eventName = target === -1 ? `chat` : `chat2`
    const buttonName = target === -1 ? `Broadcast Message` : `Send Private`

    const chat = { src, message, isPrivate: false}
    const chat2 = { src,target,message,isPrivate: true}

    const data = ()=> eventName===`chat` ? chat : chat2
    const Action = ()=> socket.emit(eventName,data())

    return (

        <React.Fragment>

            <button onClick={() => Action()} class="btn btn-primary">{buttonName}</button>

        </React.Fragment>
    )
}

export default Button
