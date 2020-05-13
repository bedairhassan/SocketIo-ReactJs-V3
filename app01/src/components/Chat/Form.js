import React, { useState } from 'react'
import ServerButton from '../reusable/ServerButtonEmit'
import Input from '../reusable/Input'

// input field, button
function Form({socket}) {
    

    
    const [message,messageSet]=useState(`message does not exist`)

    return (
        <React.Fragment>
            <Input onChange={message=>messageSet(message)} placeholder={`enter message`}/>
            
            {/* { socket, event,responding,buttonName ,data} */}
            <ServerButton 
            socket={socket}
            event={`chat`}
            buttonName={`Broadcast Message`}
            data={{socketid:socket.id,message,isPrivate:false,isFriendRequest:-1}}/>
        </React.Fragment>    
    )
}

export default Form
