import React, { useState, Fragment, useEffect } from "react";
import socketIOClient from "socket.io-client";
import './App.css';

const ENDPOINT = "http://127.0.0.1:4001"

function App() {
  const [ username, saveUsername ] = useState("")
  const socket = socketIOClient(ENDPOINT);

  const connectInChat = () => {
    appendMessage('You Joined')
    socket.emit('new-user', username)
    socket.on('user-connected', (data) => {
      appendMessage(`${username} connected in chat.`)
    })
  }

  const appendMessage = message => {
    const messageContainer = document.getElementById('message-container')
    const messageElement = document.createElement('div')
    messageElement.innerText = message 
    messageContainer.append(messageElement)
  }

  useEffect(() => {
    const messageForm = document.getElementById('send-container')
    const messageInput = document.getElementById('message-input') 

    // socket.on('user-disconnected', () => {
    //   appendMessage(`${username} disconnected from chat.`)
    // })

    socket.on('chat-message', data => {
      console.log( data, "data")
      appendMessage(`${data.name}: ${data.message}`)
    }) 

    messageForm.addEventListener('submit', e => {
      e.preventDefault();
      const message = messageInput.value
      appendMessage(`You: ${message}`)
      console.log( username, message, "about to emit")
      socket.emit('send-chat-message', { 'message': message , 'name' : 'Mamta'})
      messageInput.value = ''
    })
  }, [])

  

  return (
    <div className="container">
      <div className="wrapper">
        <h1>Recraft Chat Server</h1>
          <div className="name-input-area">
            <label className="label-text">Enter your name:</label>
            <input type="text" id="name-input" value={username} onChange={(e) => saveUsername(e.target.value)}/>
            <button type="submit" className="connect-button" onClick={connectInChat}>Connect</button>
          </div> 
          <Fragment>
            <div id="message-container"/>
            <form id="send-container">
              <input type="text" id="message-input"/>
              <button type="submit" id="send-button">Send</button>
            </form>
          </Fragment>      
      </div>
    </div>
  )
}

export default App;

