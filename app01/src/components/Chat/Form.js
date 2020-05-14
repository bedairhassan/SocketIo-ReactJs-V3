import React, { useState, useEffect } from 'react'
import ServerButton from '../reusable/ServerButtonEmit'
import Input from '../reusable/Input'

// warn: isFriendRequest:-1 --- this shall not be inside server, and server shall modify two variables only

// input field, button
function Form({ socket }) {

    const [contactingState, contactingStateSet] = useState(-1) // -1 for everyone

    useEffect(() => {

        socket.on(`Contacting`, target => {

            console.log(new Date(), `[Form] Contacting`, target)
            // console.table({ target })

            contactingStateSet(target)
        })

    }, [])

    const [message, messageSet] = useState(`message does not exist`)

    return (
        <React.Fragment>
            <Input onChange={message => messageSet(message)} placeholder={`enter message`} />

            {/* { socket, event,responding,buttonName ,data} */}

            {/* for cleaner code, Server Button shall be written once ! */}

            {contactingState === -1 ? (

// EVERYONE
                <ServerButton
                    socket={socket}
                    event={`chat`}
                    buttonName={`Broadcast Message`}
                    data={{ src: socket.id, message, isPrivate: false }} />) : (

                        // new attribute here is target id, which won't be used anyways except for server :)

                        // PRIVATE !
                <ServerButton
                    socket={socket}
                    event={`chat2`}
                    buttonName={`Send Private`}
                    data={{ src: socket.id, target:contactingState, message, isPrivate: true }} />
                )}


        </React.Fragment>
    )
}

export default Form
