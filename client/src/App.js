import React, { useEffect } from "react";
import socketIOClient from "socket.io-client";
import './App.css';
const ENDPOINT = "http://127.0.0.1:4001"


function App() {
  useEffect(() => {
      const socket = socketIOClient(ENDPOINT);

      const messageContainer = document.getElementById('message-container')
      const messageForm = document.getElementById('send-container')
      const messageInput = document.getElementById('message-input') 
      
      const name = prompt('What is your name?')
      
      appendMessage('You Joined')
      socket.emit('new-user', name)

      socket.on('chat-message', data => {
        appendMessage(`${data.name}: ${data.message}`)
      })

      socket.on('user-connected', name => {
        appendMessage(`${name} connected`)
      })

      socket.on('user-disconnected', name => {
        appendMessage(`${name} disconnected`)
      })

      messageForm.addEventListener('submit', e => {
        e.preventDefault();
        const message = messageInput.value
        appendMessage(`You: ${message}`)
        socket.emit('send-chat-message', message)
        messageInput.value = ''
      })

      function appendMessage(message){
        const messageElement = document.createElement('div')
        messageElement.innerText = message
        messageContainer.append(messageElement)
      }
  }, []);

  return (
    <div className="container">
      <div className="wrapper">
          <h1>Recraft Chat Server</h1>
        <div id="message-container"/>
        <form id="send-container">
          <input type="text" id="message-input"/>
          <button type="submit" id="send-button">Send</button>
        </form>
      </div> 
    </div>
  )
}

export default App;