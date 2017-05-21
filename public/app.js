import React, { Component } from 'react';
import ReactDOM from 'react-dom';


class MessageBox extends Component {
	constructor() {
		super();
		this.state = {
			messages: []
		}
	}

	render() {
		/*
		let msgs;
		if (this.messages) {
			msgs = this.messages.map((msg) => );
		}
		*/
		return (
			<div>
				{this.state.messages}
			</div>
		);
	}

	_addMessage(message) {
		
		let messageElem = <Message text={message}/>
		let messages = this.state.messages.concat([messageElem]);
		this.setState({messages})
	}
}

class Message extends Component {
	constructor() {
		super();
	}

	render() {
		return (
			<div>
				{this.props.text}
			</div>
		);
	}
}

/*
ReactDOM.render(
  <MessageBox />,
  document.getElementById('react-test')
);
*/

export {MessageBox, Message};