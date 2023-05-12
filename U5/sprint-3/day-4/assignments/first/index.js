//process.nextTick()    program

// function display() {
//   console.log("hello world");
// }

// process.nextTick(() => {
//   setTimeout(display, 2000);
// });

//process.hrtime()  program
// function sum1to1000000() {
//   let sum = 0;
//   for (let i = 1; i <= 1000000; i++) {
//     sum += i;
//   }
//   console.log(`Sum of numbers: ${sum}`);
// }

// const startTime = process.hrtime();
// console.log(startTime);
// sum1to1000000();

// const endTime = process.hrtime(startTime);
// console.log(endTime);

// console.log(`toal time : ${endTime[0] * 1e9 + endTime[1]} nanoseconds`);

//last program

const fs = require("fs");

// Phase 1: process.nextTick()
process.nextTick(() => console.log("process.nextTick executed"));

// Phase 2: Promise
Promise.resolve().then(() => console.log("Promise resolved"));

// Phase 3: setTimeout()
setTimeout(() => console.log("setTimeout executed"), 0);

// Phase 4: setInterval()
let count = 0;
const interval = setInterval(() => {
  console.log(`setInterval executed (${++count} times)`);
  if (count === 3) {
    clearInterval(interval);
  }
}, 1000);

// Phase 5: setImmediate()
setImmediate(() => console.log("setImmediate executed"));

// Phase 6: File reading
fs.readFile(__filename, () => console.log("File reading completed"));
