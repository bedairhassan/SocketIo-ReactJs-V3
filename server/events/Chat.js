const Chat = ({io,user})=>{

    // console.table(user)
    console.log(new Date(),`chat`,user)

    io.emit(`chat`, user)
}

module.exports={Chat}