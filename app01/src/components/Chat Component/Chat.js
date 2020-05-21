import React, { useState } from 'react'
import './chat.css'

function Chat({ socket,person,data,extraData,user }) {

    const [seen,seenSet]=useState(false)

    var container = seen  ? `container` : `container darker`
    var image = person===`YOU` ? <img src={require('./YOU.jpg')} alt="Your Avatar" class="right"/> : <img src={require('./person.jpg')} alt="His Avatar"/>
    var time = person === `YOU` ? "time-right" : `time-left`

    const Action = ()=>{
        
        // YOU CAN NOT CLICK YOUR MESSAGE
        if(person!=`YOU`){
            seenSet(true) 
            
            // event emitter for socket
        }
    }

    return (
        <React.Fragment>
            <div className={container} onClick={()=>Action()}>
                {image}
                <p>{data}</p>
                <span className={time}>
                    {extraData.map(data=><React.Fragment>{data}<br/></React.Fragment>)}
                </span>
            </div>
        </React.Fragment>
    )
}

export default Chat
