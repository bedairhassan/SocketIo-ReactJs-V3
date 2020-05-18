import React, { PureComponent } from 'react'
import Input from '../reusable/Input'

export default class Form extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            message:`message does not exist`,
            socket:props.socket,
            src:props.socket.id,
            target:-1
        }
    }

    targetSet=(target)=>this.setState({target})
    messageSet=(message)=>this.setState({message})

    componentDidMount(){
        this.state.socket.on(`Contacting`, target => this.targetSet(target))
    }

    render() {
        return (
            <React.Fragment>
            <Input 
            onChange={message => this.messageSet(message)} 
            placeholder={`enter message`} />

            {this.state.target === -1 ? (

                <button onClick={() => {

                    this.state.socket.emit(`chat`, {
                        src: this.state.src,
                        message:this.state.message,
                        isPrivate: false
                    })

                }}>Broadcast Message</button>) : (


                    <button onClick={() => {

                        this.state.socket.emit(`chat2`, {
                            src:this.state.src,
                            target:this.state.target,
                            message:this.state.message,
                            isPrivate: true
                        })

                    }}>Send Private</button>
                )
            }

        </React.Fragment>
        )
    }
}
