import React from 'react'

function Input({placeholder,onChange}) {
    return (
        
        <input placeholder={placeholder} onChange={(e)=>onChange(e.target.value)}/>
    )
}

export default Input
