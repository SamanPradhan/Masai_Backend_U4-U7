const fs = require("fs");
const { type } = require("os");

// complete the following fubctions

function isNumber(num) {
  if (typeof num == "number") {
    fs.writeFileSync("./test.txt", "it is a Number.");
  } else {
    fs.writeFileSync("./test.txt", "it is Not a Number.");
  }
}

function isStr(str) {
  if (isNaN(Number(str))) {
    fs.writeFileSync("./test.txt", "it is a String.");
  } else {
    fs.writeFileSync("./test.txt", "it is Not a String.");
  }
}

function isArray(arr) {
  if (Array.isArray(arr) == true) {
    fs.writeFileSync("./test.txt", "it is a Array.");
  } else {
    fs.writeFileSync("./test.txt", "it is Not a Array.");
  }
}

function isObj(obj) {
  if (Array.isArray(obj) == true) {
    fs.writeFileSync("./test.txt", "this is not a object.");
  } else {
    fs.writeFileSync("./test.txt", "this is a object.");
  }
}

function cls(filename) {
  fs.unlinkSync(`./${filename}`);
}

// Export All the functions

module.exports = { isNumber, isStr, isArray, isObj, cls };

//console.log(typeof {}, typeof [], typeof "4");
