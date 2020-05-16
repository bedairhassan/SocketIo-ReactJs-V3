import React, { PureComponent } from 'react'

export default class ParentChatWindowPrivate extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            messages: [],
            users:[],
            socket: props.socket
        }
    }

    componentDidMount() {
        this.state.socket.on(`chat2`, message => {

            message = { ...message, date: new Date() + `` }
            message = { ...message, isPrivate: true }

            // code segment began
            // if user already exists in list, do not concatenate
            // const found = this.state.users.filter(user => user.src === message.src)
            var found = false
            // segment: findBasedOnSource(this.state.users,target)
            for (let i=0;i<this.state.users.length;i++){

                if(this.state.users[i].src===message.src){
                    found=true
                    break;
                }
            }
            // console.table(found)
            // console.log(found !== undefined)

            // this.setState({ users: [...this.state.users, { src: message.src }] })
            if (!found) {
                this.setState({ users: [...this.state.users, { src: message.src }] })
            }
            console.table(this.state.users)
            // code segment ended

            this.setState({ messages: [...this.state.messages, message] })
            console.table(this.state.messages)
        })
    }

    render() {
        return (
            <React.Fragment>
                nothing
            </React.Fragment>
        )
    }
}