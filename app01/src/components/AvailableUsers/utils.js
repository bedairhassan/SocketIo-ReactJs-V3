module.exports = {

    isBlockedUpdateArray: (users, socketid, condition) => {

        let copy = [...users]

        for (let i = 0; i < copy.length; i++) {

            if (copy[i].socketid === socketid) {
                copy[i] = { ...copy[i], isBlocked: condition }

                // break; // DO NOT BREAK THIS STATEMENT // leads to missing records
            }
        }

        return copy
    },

    update_isFriendsTrue: (users, src) => {
        let copy = [...users]

        for (let i = 0; i < copy.length; i++) {

            if (copy[i].socketid === src) {

                copy[i] = { ...copy[i], isFriends: true }
            }
        }

        return copy
    },
    update_SentMe: (users, src, target) => {
        
        var copy = [...users]

        // cycle through array
        for (let i = 0; i < copy.length; i++) {

            // search for src
            if (copy[i].socketid === src) {

                // implementation
                copy[i] = { ...copy[i], SentMe: target }

                console.table(copy[i])

                // if found, break
                break;
            }
        }

        return copy
    }
}