const { log } = require("console");
const fs = require("fs");

fs.readFile("./lecture.txt", "utf-8", (err, data) => {
  //   setTimeout(() => {
  //     console.log("b");
  //   }, 0);
  //   setImmediate(() => {
  //     console.log("z");
  //   });
  //   process.nextTick(() => {
  //     console.log("m");
  //   });
});
setTimeout(() => {
  console.log("b");
}, 0);

setImmediate(() => {
  console.log("z");
});

process.nextTick(() => {
  console.log("m");
});
