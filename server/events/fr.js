const fr  = (socket,{src,target})=>{

    socket.broadcast.to(target).emit(`fr`, { src, target })
}

module.exports={fr}