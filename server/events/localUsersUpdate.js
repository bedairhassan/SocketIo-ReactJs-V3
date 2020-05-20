const localUsersUpdate= (socket,users)=>{

    socket.emit(`localUsersUpdate`,users)
}

module.exports={localUsersUpdate}

