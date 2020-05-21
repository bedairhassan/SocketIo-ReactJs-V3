import React from "react"

const Headers = ({ headers }) => <thead>{headers.map(header => <th>{header}</th>)}</thead>

export default Headers