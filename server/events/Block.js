const Block=(socket,data)=>{

    const {src,condition,target}=data
    
    socket.broadcast.to(target).emit(`blockk`, 
    {src,condition})
}

module.exports={Block}