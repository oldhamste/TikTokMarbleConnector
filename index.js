// TikTok Marble Connector - Full Working Server
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

// Serve root
app.get("/", (req, res) => {
  res.send("TikTok Connector Running");
});

// Serve overlay
app.get("/overlay", (req, res) => {
  res.sendFile(path.join(__dirname, "overlay.html"));
});

// Store last 10 joined users
let lastJoined = [];

// State update
function broadcastState() {
  io.emit("state:lastJoined", lastJoined);
}

// Simulated events — replace with real TikTok events later
// These run every 10 seconds to prove overlay works
setInterval(() => {
  const fakeUser = "User" + Math.floor(Math.random() * 9999);

  lastJoined.unshift({ nickname: fakeUser });
  lastJoined = lastJoined.slice(0, 10);

  io.emit("event:join", { user: { nickname: fakeUser } });
  broadcastState();

}, 10000);

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("Overlay connected:", socket.id);

  // Send state on connect
  socket.emit("state:lastJoined", lastJoined);
});

// Run server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("TikTok Connector Loaded");
  console.log("Server running on port", PORT);
});
