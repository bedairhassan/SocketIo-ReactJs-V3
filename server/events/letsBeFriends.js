const letsBeFriends = (socket,{src,target})=>{

    socket.broadcast.to(target).emit(`letsBeFriends`, { src })
}

module.exports={letsBeFriends}