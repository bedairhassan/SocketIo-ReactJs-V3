// import react from `react`
import React, { useState, useEffect } from 'react';

import ContactingState from './ContactingState'

export default function Contacting({ socket }) {

  // either has socketid of person you want to contact or dash
  const [contactingState, contactingStateSet] = useState(-1)

  useEffect(() => socket.on(`Contacting`, target => contactingStateSet(target)), [])

  const contactingHandle = (target) => {

    contactingStateSet(target)
    socket.emit(`Contacting`, target)
  }




  return (

    <React.Fragment>

      <tr>

        <ContactingState contactingState={contactingState} />

        <td>
          <button
          class="btn btn-warning"
            onClick={() => contactingHandle(-1)}>
            E</button>
        </td>
      </tr>


    </React.Fragment>
  )
}