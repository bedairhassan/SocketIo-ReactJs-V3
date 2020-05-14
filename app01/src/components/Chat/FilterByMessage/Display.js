import React, { useEffect, useState } from 'react'

// targetMessage could be val or string
function Display({ data,targetMessage }) {

    // actually, made it like this so another programmer won't make it reusable.
    useEffect(()=>{

        // if(targetMessage===-1){
        //     filteredSet(data)
        // }

        // console.log(new Date(),`FilterByMessage, before filtering`,data)
        
        var filterIt = data.filter(({message})=>message===targetMessage)
        filteredSet([...filterIt])

        // console.log(new Date(),`FilterByMessage, after filtering`,filtered)

    },[targetMessage]) // [targetMessage]

    // filtered
    const [filtered,filteredSet]=useState([])

    return (
        <React.Fragment>
            {

                <table>
                    <thead>
                        <th>date</th>
                        <th>src</th>
                        <th>message</th>
                        <th>isPrivate</th>
                    </thead>
                        <tbody>
                            {
                                filtered.map(({ date, src, message, isPrivate }) =>
                                    <tr style={{ fontSize: '10px' }} key={date}>
                                        <td>{date}</td>
                                        <td>{src}</td>
                                        <td>{message}</td>
                                        <td>{isPrivate === true ? `Private` : `Public`}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    
                </table>
            }
        </React.Fragment>
    )
}

export default Display
