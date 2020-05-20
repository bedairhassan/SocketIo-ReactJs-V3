const disconnect = (io,socket,users)=>{
    
    var usersLength = { beforeDisconnect: users.length }

    // SpliceBy(users,target=socket.id) : returns users
    users = SpliceBy(users,socket.id)

    usersLength = { ...usersLength, afterDisconnect: users.length }
    console.log(usersLength)

    // console.log(new Date(), `io.emit`, users)
    io.emit(`Available Users`, users)
    socket.disconnect()

    return users;
}

// SpliceBy(users,target=socket.id) : returns users
const SpliceBy = (users,target)=>{
    for (let i = 0; i < users.length; i++) {

        if (users[i].socketid === target) {
            // console.log(users[i])
            users.splice(i, 1)
            break;
        }
    }
    return users
}

// export default disconnect

module.exports={
    disconnect
}