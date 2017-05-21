let msgs = 0;

function handleResponses(userMsg) {
	// TODO : Use FSM from script to determine which one to send
	let mod = msgs ++ %3;
	if (mod == 0) return sendTextMessage("Booyakasha! Your message was " + userMsg.length + " characters long.");
	if (mod == 1) return sendButtonMessage("Wanna chit-chat?", [{text:"Yes", payload:"yes"}, {text:"No", payload:"no"}]);
	return sendPictureMessage("Isn't this cute? :P", ["https://static.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg"]);
}

function sendTextMessage(text) {
	return JSON.stringify({type: "text", text});
}

function sendButtonMessage(text, options) {
	return JSON.stringify({type:"button", text, options});
}

function sendPictureMessage(text, urls) {
	return JSON.stringify({type:"picture", text, urls});
}

function handleButtonClick(payload) {
	return sendTextMessage("Wow, I didn't expect you to say " + payload);
}

//export default handleResponses;
export {handleResponses, handleButtonClick};