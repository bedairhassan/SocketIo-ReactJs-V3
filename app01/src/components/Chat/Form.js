import React, { PureComponent } from 'react'
import Input from '../reusable/Input'
import Button from './Button'

export default class Form extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            message: `message does not exist`,
            socket: props.socket,
            src: props.socket.id,
            target: -1
        }
    }

    targetSet = (target) => this.setState({ target })
    messageSet = (message) => this.setState({ message })

    componentDidMount() {
        this.state.socket.on(`Contacting`, target => this.targetSet(target))
    }

    render() {

        return (
            <React.Fragment>
                
                <Input
                class="form-control"
                    onChange={message => this.messageSet(message)}
                    placeholder={`enter message`} />

                <Button 
                socket={this.state.socket}
                target={this.state.target}
                message={this.state.message}
                src={this.state.socket.id}
                />

            </React.Fragment>
        )
    }
}

