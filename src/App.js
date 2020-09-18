import React, {useEffect, useState} from 'react';
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import Pusher from "pusher-js";
import axios from './axios';


function App() {

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('/messages/sync')
      .then(response => {
        setMessages(response.data);
      })
  }, []);
  
  useEffect(() => {
    const pusher = new Pusher('a211a4ebe7a18b846ff4', {
      cluster: 'eu',
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage])
    });
  }, []);

  console.log(messages);

  return (
  <div className="app">
    <div className="app__body">
    <Sidebar />
    <Chat />
    </div>
  </div>
  );
}

export default App;
