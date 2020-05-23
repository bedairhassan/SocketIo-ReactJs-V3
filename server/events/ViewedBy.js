const ViewedBy= (socket,data)=>{

    const {message:{src}}=data // data.message.src
    socket.broadcast.to(src).emit(`ViewedBy`, data)
}

module.exports={ViewedBy}

