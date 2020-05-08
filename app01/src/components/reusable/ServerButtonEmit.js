import React, { useState, useEffect } from 'react'
import Button from './Button'

{/* <ServerButton name={`Server Button`} socket={socket}/> */ }
// props
export default function ServerButton({ socket, event,responding,buttonName ,data}) {

    // const [serverStringserverString, setServerString] = useState(``)
    // const [click, setClick] = useState(false)

    // useEffect(() => {

    //     socket.on(event, response => {

    //         console.log(`socket.on( ${event} ) : ${response}`)
    //         responding(response)
    //     })
    //     setClick(false)
    // }, [click])

    const clicked = ()=>{
        socket.emit(event, data)
        // setClick(!click)
    }

    return (

        <React.Fragment>
            <Button onClick={()=>clicked()} name={buttonName} />
        </React.Fragment>
    )
}