const UpdateUser = (io,users,user)=>{

    console.log(new Date(), `update user`, user)

    // filter,extract i // modify[0] // replace, use i //
    for (let i = 0; i < users.length; i++) {

        if (users[i].socketid === user.socketid) {
            console.log(user)
            users[i] = { ...user }
            break;
        }
    }

    console.log(`io.emit`, `update user`, users)
    io.emit(`update user`, users)

    return users;
}

module.exports = {UpdateUser}