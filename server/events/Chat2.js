const Chat2 = ({socket,user})=>{

    console.log(new Date(),`chat2`,user)
    const {target}=user
    socket.broadcast.to(target).emit(`chat2`, user)
    socket.emit(`chat2`,user)
}

module.exports={Chat2}