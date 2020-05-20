import React,{useState,useEffect} from 'react'

import RadioButton from '../reusable/RadioButton'

const BlockButton = ({socket,user}) => {

    const blockFeature = (blockCondition) => {
        socket.emit(`blockk`, { ...{

            target: user.socketid,
            src: socket.id
        }, condition: blockCondition })
    }

    return (

        <React.Fragment>
            {/* <button
                onClick={() => blockFeature()}
            >block</button> */}

            <RadioButton
                onClick={(e) => { e === `Block` ? blockFeature(true) : blockFeature(false) }}
                items={[`Block`, `Unblock`]}
                groupName={`Block`}
            />

        </React.Fragment>
    )
}

export default BlockButton
