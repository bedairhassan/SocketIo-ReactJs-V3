const Intro = (socketid,users)=>{
    
    // const socketid=socket.id

    const obj = { 
        socketid, 
        whocansendmefr: `everyone`, 
        SentMe: '-',
        isBlocked:false 
    }


    console.log(new Date(), `users.push`, obj)
    users.push(obj)
    console.log("users", users)

    console.log(new Date(), `what is my socketid`, socketid)
    console.log(new Date(), `Available Users`, users)

    return users;
}

module.exports = {Intro}