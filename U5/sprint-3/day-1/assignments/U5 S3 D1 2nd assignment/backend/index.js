const { WebSocketServer, WebSocket } = require("ws");

const wss = new WebSocketServer({ port: 8080 });
const candidates = [
  { name: "Modi", id: 1, votes: 0 },
  { name: "Rahul", id: 2, votes: 0 },
  { name: "Kejriwal", id: 3, votes: 0 },
];
const names = [];
wss.on("connection", function connection(socket) {
  console.log("new connection was made");
  socket.send(JSON.stringify(candidates));
  socket.on("error", console.error);

  //listening to votes done by the people
  socket.on("message", (data) => {
    console.log(JSON.parse(data));
    data = JSON.parse(data);
    let id = data.id;
    let name = data.name;
    console.log(id, name);
    let x = 1;
    names.forEach((el) => {
      if (el == name) {
        console.log("yes");
        return (x = 0);
      }
    });
    if (x === 1) {
      candidates.forEach((ele) => {
        if (ele.id === id) {
          ele.votes++;
          names.push(name);
        }
        console.log(candidates);
        console.log(names);

        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(candidates));
          }
        });
      });
    }
  });

  //   socket.on("message", function message(data, isBinary) {
  //     wss.clients.forEach(function each(client) {
  //       if (client !== socket && client.readyState === WebSocket.OPEN) {
  //         client.send(data, { binary: isBinary });
  //       }
  //     });
  //   });
});
