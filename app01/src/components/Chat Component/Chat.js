import React, { useState } from 'react'
import './chat.css'

import Select from '../../components/reusable/Select'

function Chat({ socket,person,data,extraData,user,ViewedBy }) {

    const [seen,seenSet]=useState(false)

    var container = seen  ? `container` : `container darker`
    var image = person===`YOU` ? <img src={require('./YOU.jpg')} alt="Your Avatar" class="right"/> : <img src={require('./person.jpg')} alt="His Avatar"/>
    var time = person === `YOU` ? "time-right" : `time-left`

    const Action = (eValue)=>{

        // YOU CAN NOT CLICK YOUR MESSAGE
        if(person!=`YOU`){

            // visual change!
            seenSet(true) 
            
            // Display onClickEvent
            // console.log(new Date(),`Chat.js`,`look for line 20`)
            // console.table(eValue)
            // console.table(socket.id)

            // event emitter for socket
            socket.emit(`ViewedBy`,{message:eValue,ViewedBy:socket.id})
        }
    }

    return (
        <React.Fragment>
            <div className={container} onClick={()=>Action(user)}>
                {image}
                <p>{data}</p>
                <span className={time}>
                    {extraData.map(data=><React.Fragment>{data}<br/></React.Fragment>)}
                    
                    <SeenBy ViewedBy={ViewedBy}/>

                </span>
            </div>
        </React.Fragment>
    )
}

const SeenBy = ({ ViewedBy }) => {
    if (ViewedBy.length === 0) {
      return (<h1>-</h1>)
    } else {
      return (
        <React.Fragment>
          <h6>Seen By</h6>
          <Select data={ViewedBy} onClick={(e)=>``}/>
        </React.Fragment>
      )
    }
  }

export default Chat
