import React from "react"

const SendFriendRequestButton = ({user,socket}) => {

   

    const {whocansendmefr,socketid}=user

    const Action = ()=>{

        socket.emit(`fr`, { src: socket.id, target: socketid })
    }

    if (whocansendmefr === `everyone`) {
        return (
            <React.Fragment>
                {<button

                    onClick={() => Action()}
                    style={{ fontSize: '10px', color: `red` }}>Send</button>
                }
            </React.Fragment>
        )
    } else {

        return (<h1>nobody</h1>)
    }
}

export default SendFriendRequestButton