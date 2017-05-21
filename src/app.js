import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const BOT_PREFIX = "Awesome Bot: ";


class MessageBox extends Component {
	constructor() {
		super();
		this.state = {
			//socket : null
			messages: []
		};
		this._addMessage = this._addMessage.bind(this);
		this._addBotMessage = this._addBotMessage.bind(this);
		this._postBack = this._postBack.bind(this);
	}

	componentWillMount() {
		//this.state.socket
	}

	render() {
		return (
			<div>
				<ul id="messages">
					{this.state.messages}
				</ul>
	    		<MessageForm addMessage={this._addMessage} addBotMessage={this._addBotMessage} socket={this.props.socket}/>
    		</div>
		);
	}

	// Message entered by user can only be text message, clicking of button is handled separately
	_addMessage(msg) {
		//let messages = this.state.messages.concat([msg]);
		let messages = this.state.messages.concat([<Message text={msg}/>]);
		this.setState({messages});
		window.scrollTo(0, document.body.scrollHeight); 
	}

	// Parse JSON and determine what kind of message to add, e.g. button messages, picture messages, etc
	_addBotMessage(msg) {
		console.log("Message from bot: " + msg);
		let msgJson = JSON.parse(msg);
		let messages;
		let text = BOT_PREFIX + msgJson['text'];
		if (msgJson['type'] === 'text') {
			messages = this.state.messages.concat([<Message text={text} />]);
		}
		else if (msgJson['type'] === 'button') {
			messages = this.state.messages.concat([<ButtonMessage text={text} options={msgJson['options']} clickHandler={this._postBack} />])
		}
		else {
			messages = this.state.messages.concat([<PictureMessage text={text} urls={msgJson['urls']} />]);
		}
		this.setState({messages});
	}

	// Currently only for buttons
	_postBack(payload) {
		console.log("Informing bot of button click!");
		this.props.socket.emit('button_click', JSON.stringify(payload));
	}
	
}

class MessageForm extends Component {
	constructor() {
		super();
		this.state = {
			text : "",
			clear: false
		};
		this._handleUserMessage = this._handleUserMessage.bind(this);
	}

	componentWillMount() {
		//this.props.socket.on('bot_msg', (msg) => this.props.addBotMessage("Awesome Bot: " + msg)); // TO-DO : Parse JSON and display accordingly
		this.props.socket.on('bot_msg', (msg) => this.props.addBotMessage(msg));
	}

	render() {
		
		if (this.state.clear) {
			this.state.clear = false;
			return (
				<form action="" onSubmit={this._handleUserMessage}>
      				<input id="m" autocomplete="off" placeholder="Say something :)" value = "" ref={c => {this.state.text=c}} /><button>Send</button>
    			</form>
    		);
		}
		
		return (
			<form action="" onSubmit={this._handleUserMessage}>
      			<input id="m" autocomplete="off" placeholder="Say something :)" ref={c => {this.state.text = c}} /><button>Send</button>
    		</form>
    	);
	}

	_handleUserMessage(e) {
		e.preventDefault();
		console.log("Message being posted!");
		//this._addMessage(this.state.text);		
		this.props.addMessage("You: " + this.state.text.value);
		this.props.socket.emit('user_msg', this.state.text.value);
		this._clearText();
		return false;
	}

	_clearText() {
		this.setState({text: "", clear:true});
	}

}

class Message extends Component {
	constructor() {
		super();
	}

	render() {
		return (
			<li>
				{this.props.text}
			</li>
		);
	}
}

class ButtonMessage extends Component {
	constructor() {
		super();
		this._postBack = this._postBack.bind(this);
	}

	render() {
		return (
			<li>
				<div>
					{this.props.text}
				</div>
				<div>
					{this.props.options.map((option) => <button onClick={(e) => this._postBack(e, option['payload'])}>{option['text']}</button>)}
				</div>
			</li>
		);
	}

	_postBack(e, payload) {
		e.preventDefault();
		this.props.clickHandler(payload);
	}
}

class PictureMessage extends Component {
	constructor() {
		super();
	}

	render() {
		const MAX_WIDTH_PERCENTAGE = 80;
		const HEIGHT_IN_PIXELS = 150;
		const MAX_SINGLE_WIDTH_PERCENTAGE = 50;
		let width_percentage = parseInt(MAX_WIDTH_PERCENTAGE / this.props.urls.length) + "%";
		width_percentage = width_percentage > MAX_SINGLE_WIDTH_PERCENTAGE ? MAX_SINGLE_WIDTH_PERCENTAGE : width_percentage;
		return (
			<li>
				<div>
					{this.props.text}
				</div>
				<div>
					{this.props.urls.map((url) => <img src={url} alt="Nice Picture" height={HEIGHT_IN_PIXELS} width={width_percentage}/>)}
				</div>
			</li>
		);
	}
}

ReactDOM.render(
  <MessageBox socket={io()}/>,
  document.getElementById('target')
);

export {MessageBox, Message};