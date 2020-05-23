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
            <div class="input-group mb-3">
            

                <Input
                    className={`form-control`}
                    onChange={message => this.messageSet(message)}
                    placeholder={`enter message`} />


                <div class="input-group-prepend">
                    <Button
                        className={"btn btn-outline-secondary"}
                        socket={this.state.socket}
                        target={this.state.target}
                        message={this.state.message}
                        src={this.state.socket.id}
                    />
                </div>
            </div>
        )
    }
}

