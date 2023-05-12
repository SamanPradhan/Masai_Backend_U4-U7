const { WebSocketServer, WebSocket } = require("ws");
const express = require("express");
const app = express();
const socketio = require("socket.io");
const http = require("http");

const server = http.createServer(app);
const io = socketio(server);
let votes = [{ a: 0 }, { b: 0 }, { c: 0 }];
let voterIds = [];
io.on("connection", (socket) => {
  //   socket.on("error", console.error);

  socket.on("msg", (data) => {
    let party = data.voteData.party;
    let votersID = data.voteData.voterId;
    console.log(party);
    console.log(votersID);
    for (let i = 0; i < voterIds.length; i++) {
      if (voterIds[i] == votersID) {
        console.log("User already voted");
        return false;
      }
    }
    if (party == "a") {
      votes[0].a++;
    } else if (party == "b") {
      votes[1].b++;
    } else if (party == "c") {
      votes[2].c++;
    }
    voterIds.push(votersID);
    console.log(votes);
    console.log(voterIds);
    socket.emit("voteShare", votes);
  });

  socket.send("sent");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(4500, () => {
  console.log("new connection was made here");
});
