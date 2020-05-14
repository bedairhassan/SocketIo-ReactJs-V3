import React, { useEffect, useState } from 'react'
import Input from '../../reusable/Input'
import Display from '../FilterByMessage/Display'

// since it is a quick component display :)
// 

function FilterByMessage({data}) {

    // const [filterBy,filterBySet]=useState(`-`)
    const [targetMessage, targetMessageSet] = useState([])

    return (

        <React.Fragment>

            <Input 
            placeholder={`filter by message`} 
            onChange={targetMessage => targetMessageSet(targetMessage)} />

            {/* later make it display only! */}
            <Display

                data={data}
                targetMessage={targetMessage}
            />

        </React.Fragment>

    )
}

export default FilterByMessage
