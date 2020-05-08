import React from 'react'

function Select({onClick,data}) {
    return (
        
        <select onClick={(e)=>onClick(e.target.value || `-`)}>
            {
                data.map(item=><option value={item}>{item}</option>)
            }
        </select>
    )
}

export default Select
