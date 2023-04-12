import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Chat from "./Chat";

// const socket = io.connect("http://localhost:3001");

const App = () => {
  const [room, setRoom] = useState("");
  const [username, setUsername] = useState("");
  const [joined, setJoined] = useState(false);
  const [socket,setSocket] = useState()

  useEffect(()=>{
    const newSocket = io.connect("http://localhost:3001");
    setSocket(newSocket);
    return () => newSocket.close();
  },[])

  const joinRoom = () => {
    if (room !== "" && username !== "") {
      socket.emit("join_room", room);
      setJoined(true);
    }
  };


  return (
    <main>
      {!joined ? (
        <div className="join_room">
         <h1>Join room</h1>
          <input
            type="text"
            placeholder="username..."
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="room..."
            onChange={(e) => {
              setRoom(e.target.value);
            }}
          />
          <button onClick={joinRoom} >Join</button>
        </div>
      ) : (
        <Chat socket={socket} room={room} username={username} />
      )}
    </main>
  );
};

export default App;
