const Chat2 = (socket,user)=>{

    const {target}=user
    socket.broadcast.to(target).emit(`chat2`, user)
}

module.exports={Chat2}