const Contacting = (socket,target)=>{

    socket.emit(`Contacting`, target)
}

module.exports={Contacting}