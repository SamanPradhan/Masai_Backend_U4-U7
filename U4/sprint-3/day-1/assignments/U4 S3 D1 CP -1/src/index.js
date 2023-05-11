//  import required modules from nodejs and build the server
const validatorfunction = require("./middlewares/validator");

const { json } = require("express");
const express = require("express");
const app = express();
const fs = require("fs");
app.use(express.json());

app.post("/", validatorfunction, (req, res) => {
  res.status(200).send("data received\n");

  const { ID, Name, Rating, Description, Genre, Cast } = req.body;

  if (typeof ID === "number") {
    console.log("ID is a number.");
    fs.appendFileSync("./res.txt", "ID is a number\n");
  }

  if (typeof Name === "string" && !stringContainsNumber(Name)) {
    console.log("Name is a string.");
    fs.appendFileSync("./res.txt", "Name is a string\n");
  }
  if (typeof Rating === "number") {
    console.log("Rating is a number.");
    fs.appendFileSync("./res.txt", "Rating is a number\n");
  }
  if (typeof Description === "string") {
    console.log("Description is a string.");
    fs.appendFileSync("./res.txt", "Description is a string\n");
  }
  if (typeof Genre === "string") {
    console.log("Genre is a string.");
    fs.appendFileSync("./res.txt", "Genre is a string\n");
  }
  if (Array.isArray(Cast) && Cast.every((name) => typeof name === "string")) {
    let line = "Cast is a array of string\n";
    console.log(line, typeof line);
    fs.appendFileSync("./res.txt", line);
  }
});

function stringContainsNumber(Name) {
  return /\d/.test(Name);
}
// export the server
module.exports = app;
