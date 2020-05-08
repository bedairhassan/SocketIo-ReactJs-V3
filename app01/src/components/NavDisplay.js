import React from 'react'

import{Link} from "react-router-dom";
import Button from '../components/reusable/Button'

function NavDisplay({toDisplay}) {
    return (
        
        <React.Fragment>
            <Button onClick={()=>toDisplay(`Available Online Users`)} name={`Available Online Users`}/>
            -
            <Button onClick={()=>toDisplay(`Home`)} name={`Home`}/>
        </React.Fragment>
    )
}

export default NavDisplay
