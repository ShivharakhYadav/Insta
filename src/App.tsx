import React, { useEffect } from 'react';
import './App.css';
import { io } from 'socket.io-client';

function App() {
  useEffect(() => {
    const socket = io(`http://localhost:4100`);
    socket.on("testevent", (response: any) => {
      console.log("response", response)
    })
  }, [])
  return (
    <div>
      <h1>Hello</h1>
      <button>Update</button>
    </div>
  );
}

export default App;
