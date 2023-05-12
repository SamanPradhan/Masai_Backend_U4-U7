const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const app = express();

const server = http.createServer(app);

app.get("/", (req, res) => {
  res.send("base server");
});

server.listen(8000, () => {
  console.log("listening on port 8000");
});
const io = new Server(server);

let count = 0;
io.on("connection", (socket) => {
  count++;
  socket.broadcast.emit("newUser", count);
  console.log("current count is " + count);

  socket.emit("xyz", "hello from server");

  socket.on("moon", (msg) => {
    console.log(msg);
  });

  //disconnecting a user

  socket.on("disconnect", () => {
    count--;

    console.log("current count is " + count);
  });
});

//client side

// socket.on("xyz", (msg) => {
//   console.log(msg);
// });
