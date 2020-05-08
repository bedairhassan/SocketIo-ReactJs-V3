import React from 'react'

// import AvailableUsers from './components/AvailableUsers';
import AvailableUsers from '../components/AvailableUsers'

export default function ConditionalPageDisplay({ socket, toDisplay }) {

    const ConditionalPageDisplayDecision = () => {

        if (toDisplay === `Home`)
            return <h1>Welcome User {socket.id}</h1>
        else if (toDisplay === `Available Online Users`)
            return <div><AvailableUsers socket={socket} /> </div>
    }

    return (

        <React.Fragment>
            <h2 style={{ fontSize: '10px' }}>Inside Component {toDisplay}</h2>
            
            {
                toDisplay===`Home` ? (<h1>checkpoint: Home</h1>):

                (toDisplay===`Available Online Users`) ? (<React.Fragment><AvailableUsers socket={socket}/></React.Fragment>):

                (<h2>Error 404</h2>)
            }

        </React.Fragment>
    )
}
