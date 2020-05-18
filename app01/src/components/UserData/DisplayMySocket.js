import React,{useState,useEffect} from "react"

export default function DisplayMySocket({ socket, returnSocketId }) {

    const [socketid, socketidSet] = useState(-1)
  
    const onClickThis = (socketid) => {
      socketidSet(socketid)
      returnSocketId(socketid)
    }
  
    useEffect(() => socket.on(`what is my socketid`, socketid => onClickThis(socketid)), [])
  
    return (
  
      <tr>
        <td>Socket Id</td>
        <td>{socketid}</td>
      </tr>
    )
  }