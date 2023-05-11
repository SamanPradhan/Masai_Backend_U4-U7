// index.js

//  import the crypto module

const { randomBytes } = await import("node:crypto");

randomBytes(256, (err, buf) => {
  if (err) throw err;
  console.log(`${buf.length} bytes of random data: ${buf.toString("binary")}`);
});

//  get a commands using process.argv
let operation = process.argv[2];
let a = +process.argv[3];
let b = +process.argv[4];

// complete the  function

switch (operation) {
  case "add":
    console.log(a + b);
    break;
  case "sub":
    console.log(a - b);
    break;
  case "mult":
    console.log(a * b);
    break;
  case "divide":
    console.log(a / b);
    break;
  case "sin":
    console.log(Math.sin(a));
    break;
  case "cos":
    console.log(Math.cos(a));
    break;
  case "tan":
    console.log(Math.tan(a));
    break;
  default:
    console.log("Invalid operation");
}
