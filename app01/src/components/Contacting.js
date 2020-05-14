// import react from `react`
import React, { useState, useEffect } from 'react';

export default function Contacting({ socket }) {

    // either has socketid of person you want to contact or dash
    const [contactingState, contactingStateSet] = useState(-1)
  
    useEffect(() => {
  
      socket.on(`Contacting`,  target  => {
  
        console.log(new Date(), `Contacting`,target)
        // console.table({ target })
  
        contactingStateSet( target )
      })
    }, [])
  
  
  
    return (
  
      <React.Fragment>

<tr>

       <td> Who am I contacting right now?</td>
       <td>        {contactingState===-1?`Everyone`:(contactingState+``)} </td>


        <td><button onClick={()=>contactingStateSet(-1)}>Contact Everyone</button></td>
  
        
  
  </tr>
  
  
      </React.Fragment>
    )
  }