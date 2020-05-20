// create template for this 

import React from "react"

export default function ConditionalContactingState({ contactingState }) {

    const string = contactingState===-1 ? `Everyone` :contactingState

    
    return(<React.Fragment>
        <td> Who am I contacting right now?</td>
        <td>{string}</td>
    </React.Fragment>)
}
