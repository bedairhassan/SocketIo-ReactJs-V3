import React,{useState,useEffect} from 'react'

function TinyTable({ users, userTarget }) { // userTarget is SOCKETID!

    const [filtered, filteredSet] = useState([])

    useEffect(() => {

        // if(targetMessage===-1){
        //     filteredSet(data)
        // }

       // console.log(new Date(), `FilterByUser, before filtering`, users)

      //  console.log(new Date(),`TinyTable`)
        console.table(users)

        var filterIt = users.filter(({ socketid }) => socketid === userTarget)
        filteredSet([...filterIt])

      //  console.log(new Date(), `FilterByUser, after filtering`, filtered)

    }, [userTarget]) // [targetMessage]

    return (
        <React.Fragment>
            <table>
                <tr>
                    <th style={{ fontSize: '10px' }}>date</th>
                    {/* <th style={{ fontSize: '10px' }}>socket id */}
                    {/* <br /> */}
                    {/* Please select an option */}
                    {/* <Select onClick={(e) => selectSet(e)} data={SocketIdsDynamic(users)} /> */}
                    {/* </th> */}
                    <th style={{ fontSize: '10px' }}>message</th>
                    {/* <th style={{ fontSize: '10px' }}>isPrivate</th> */}
                </tr>

                {/* {onClick,data} */}
                {/* // so useEffect can be triggered! */}

                {/* users: array of users, it is actually array of multiple users with multiple messages */}
                {/* let us apply filtering to a certain user, with multiple messages */}
                {/* FIRST OF ALL, we DO NOT need to verify that it is PRIVATE */}
                {/* we do not even need to verify the source either... */}
                {/* we got multiple users, let's filter by USER! */}

                <tbody>
                    {
                        filtered.map(({ date, src, message, isPrivate }) =>
                            <tr style={{ fontSize: '10px' }} key={date}>
                                <td>{date}</td>
                                {/* <td>{src}</td> */}
                                <td>{message}</td>
                                {/* <td>{isPrivate === true ? `Private` : `Public`}</td> */}
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default TinyTable
