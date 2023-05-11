const fs = require("fs");
const path = require("path");

const operation = process.argv[2];
const file = process.argv[3];
const content = process.argv[4];

function read() {
  let read = fs.readFile(`./${file}`, { encoding: "utf-8" }, (err, data) => {
    if (err) {
      console.log("Cannot be read");
      console.log(err);
    } else {
      console.log(data);
    }
  });
  return read;
}

function del() {
  let del = fs.unlink(`./${file}`, (err, data) => {
    if (err) {
      console.log("Cannot be deleted");
      console.log(err);
    } else {
      console.log(data);
    }
  });
  return del;
}

function rename() {
  let rem = fs.rename(`./${file}`, `${content}`, function (err) {
    if (err) throw err;
    console.log("File Renamed!");
  });
  return rem;
}
function write() {
  let write = fs.writeFile(`./${file}`, `${content}`, (err) => {
    if (err) {
      console.log("Cannot be written");
      console.log(err);
    } else {
    }
  });

  return write;
}
function append() {
  fs.appendFileSync(`./${file}`, `\n${content}\n`);
}
switch (operation) {
  // complete the fillowing function.
  case "read":
    fs.readFile(`./${file}`, { encoding: "utf-8" }, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    });
    // console.log(data1.toString());
    break;
  case "write":
    write();
    break;
  case "append":
    fs.appendFileSync(`./${file}`, `\n${content}\n`);
    break;
  case "delete":
    del();
    break;
  case "rename":
    rename();
    break;
  case "create":
    fs.appendFileSync(`./${file}`, `\n${content}\n`);
    break;
  case "list":
    fs.readdir(`./${file}`, (err, files) => {
      files.forEach((e) => {
        console.log(e);
      });
    });
    break;
  default:
    console.log(`Invalid operation '${operation}'`);
}
