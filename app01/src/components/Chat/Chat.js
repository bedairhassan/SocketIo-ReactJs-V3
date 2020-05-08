import React from 'react'
import Table from './Table'
import Form from './Form'

// input field, button
// display : table 
function Chat({socket}) {

    return (
        <React.Fragment>
            <Form socket={socket}/>
            <Table socket={socket}/>
        </React.Fragment>    
    )
}

export default Chat