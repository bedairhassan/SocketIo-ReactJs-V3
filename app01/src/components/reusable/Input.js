import React from 'react'

function Input({placeholder,onChange,className}) {
    return (
        
        <input
        class={className}
        placeholder={placeholder} onChange={(e)=>onChange(e.target.value)}/>
    )
}

export default Input
