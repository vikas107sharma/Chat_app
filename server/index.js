const express = require("express");
const app = express();

const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// socket.emit Creates events to send data
// socket.on listens for specific events to collect data

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  
  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`Room id: ${room}`)
  });
  
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
 
  socket.on("disconnect", ()=>{
    console.log(`User disconnected: ${socket.id}`)
  })
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
