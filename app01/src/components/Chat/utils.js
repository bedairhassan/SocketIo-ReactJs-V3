// warn : to write clean code, consider using obj['attribute']
// Dynamic, Filtering

module.exports={
    
    SocketIdsDynamic : (data) => {

        var arr = data.map(item => item.socketid)
    
        let set = new Set()
        arr.forEach(item => set.add(item)) // set is ready
    
        arr = []
        arr.push(`-`)
        set.forEach(item => arr.push(item))
    
        // console.log(arr)
        return arr
    }
}