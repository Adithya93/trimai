'use strict';

//import React from 'react';
//import ReactDOM from 'react-dom';
//import {MessageBox, Message} from './app'
//import MessageBox from './views/app';
//import './index.css';

/*
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var handleResponses = require('./bot-responses');
*/


import express from 'express';
import http from 'http';
import {handleResponses, handleButtonClick} from './bot-responses';
import SocketIO from 'socket.io';

const app = express();
const server = http.Server(app);
const io = new SocketIO(server);
const port = process.env.PORT || 3000;

const dirname = "/Users/radithya/Desktop/summer17/trimai";

const GREETING = "Welcome friend! How are you today?";

app.use(express.static('public'))

app.get('/', function(req, res) {
  res.sendFile(dirname + '/public/index.html');
  console.log("New request received!");
});


console.log("Server successfully setup!");

/*
ReactDOM.render(
  <MessageBox />,
  document.getElementById('react-test')
);
*/
io.on('connection', function(socket){
  if (!socket['seen']) {
  	socket['seen'] = true;
  	console.log('Someone connected!');
    // Risky, may not be attached to React Component yet
    socket.emit('bot_msg', JSON.stringify({type:'text', 'text':GREETING}));
  }

  socket.on('user_msg', function(msg){
    //io.emit('chat message', msg);
    console.log("User: " + msg);
  	// Handle message based on user state (Tag user state on socket?)
  	let response = handleResponses(msg);
    console.log("About to send response " + response);
  	socket.emit('bot_msg', response);
  });

  socket.on('button_click', function(payload) {
    console.log("User clicked on button " + payload);
    let response = handleButtonClick(payload);
    socket.emit('bot_msg', response);
  })

  socket.on('disconnect', function() {
    console.log('Someone disconnected!');
  });
});


server.listen(port, function(){
  console.log('listening on *:' + port);
});
