// warn: || message.src === socketid doesn't work properly
import React, { PureComponent, useEffect, useState } from 'react'

export default class ParentChatWindowPrivate extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            messages: [],
            users: [],
            socket: props.socket,
            clicked: -1
        }
    }

    findBasedOnSource(users, target) {
        // users : this.state.users

        for (let i = 0; i < users.length; i++) {

            if (users[i].src === target) {

                return true
            }
        }
    }

    ReAssign(message) {

        message = { ...message, date: new Date() + `` }
        message = { ...message, isPrivate: true }

        return message
    }

    componentDidMount() {
        this.state.socket.on(`chat2`, message => {

            message = this.ReAssign(message)

            if (!this.findBasedOnSource(this.state.users, message.src)) {
                this.setState({ users: [...this.state.users, { src: message.src }] })
            }

            this.setState({ messages: [...this.state.messages, message] })

        })
    }

    setClicked = (clicked) => this.setState({ clicked })

    render() {
        return (
            <React.Fragment>


                <table>
                    <thead>
                        <th>users</th>
                        <th>messages</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>

                                <ul>
                                    {
                                        this.state.users.map(({ src }) =>
                                            <li>
                                                <button value={src} onClick={(e) => this.setClicked(e.target.value)}>{src}</button>
                                            </li>)
                                    }
                                </ul>

                            </td>
                            <td>

                                <table>
                                    <thead>
                                        {/* <th>src</th>
                                        <th>message</th> */}
                                    </thead>

                                    <Body messages={this.state.messages} helpers={{

                                        clicked: this.state.clicked,
                                        socketid: this.state.socket.id
                                    }} />
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </React.Fragment>
        )
    }
}


function Body({ messages, helpers: { clicked, socketid } }) {

    return (
        messages.filter(message => {

            console.table(messages)
            return message.src === clicked || message.src === socketid

        }).map(({ src, message }) => <tr>
            {/* <td>{src}</td> */}
            <td>{message}</td>
        </tr>)
    )
}