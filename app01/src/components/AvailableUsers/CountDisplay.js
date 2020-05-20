import React from 'react'

const CountDisplay = ({user}) => {

    const { count } = user

    return (
        <React.Fragment>{count}</React.Fragment>
    )
}

export default CountDisplay
