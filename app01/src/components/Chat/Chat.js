import React from 'react'
import Form from './Form'
import ChatPublic from './ChatPublic'

// input field, button
// display : table 
function Chat({socket}) {


    return ( 
        <React.Fragment>
            <Form socket={socket}/>
            {/* <Table socket={socket}/> */}
            {/* where */}
            {/* <ChatWow socket={socket}/> */}
            <ChatPublic socket={socket}/>

        </React.Fragment>    
    )
}

export default Chat
