const Chat = (io,user)=>{

    io.emit(`chat`, user)
}

module.exports={Chat}