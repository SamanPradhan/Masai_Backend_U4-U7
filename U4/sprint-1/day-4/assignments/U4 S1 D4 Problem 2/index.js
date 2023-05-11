const http = require("http");
const fs = require("fs");
//const PORT = 7700;

console.log(__dirname);
fs.readdir(__dirname, "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});
// const server = http.createServer((req, res) => {
//   let temp = `${__dirname}${req.url}`;
//   fs.stat(`${temp}`, (err, stats) => {
//     if (err) {
//       res.end("404 Not Found");
//     } else {
//       if (stats.isDirectory()) {
//         const files = fs.readdirSync(`${temp}`, "utf8");
//         res.writeHead(200, { "Content-Type": "text/html" });
//         res.write(`
//                 <ul>${files.map((e) => `<li> ${e}</li>`).join("")}</ul>`);
//         res.end();
//       } else {
//         let data = fs.readFileSync(`${temp}`, "utf8");
//         res.end(data);
//       }
//     }
//   });
// });

//server.listen(PORT);
// // export your server
//module.exports = server;
