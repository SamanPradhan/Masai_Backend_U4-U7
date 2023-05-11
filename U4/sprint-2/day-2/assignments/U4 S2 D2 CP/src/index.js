//  import required modules from nodejs and build the server
const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  const data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  console.log(data[0]);
  res.send(data.todos);
});

app.post("/", (req, res) => {
  const data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  console.log(req.params);
  data.todos.push(req.body);
  fs.writeFileSync("./db.json", JSON.stringify(data));
  // console.log(data[data.listen - 1]);
  res.send(data.todos);
});
app.put(`/:id`, (req, res) => {
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  console.log(+req.params.id);
  let num = +req.params.id;
  // console.log("put", req.body);

  if (req.body.id != num) {
    res.statusCode = 400;
  }
  data.todos.forEach((element) => {
    if (element.id == req.body.id) {
      element.status = true;
    }
  });
  if (res.statusCode != 200) {
    res.send("Invalid argument");
  } else {
    fs.writeFileSync("./db.json", JSON.stringify(data));
    res.send(data.todos);
  }
});
app.delete("/:id", (req, res) => {
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let num = +req.params.id;

  //   if (data.todos == [] || data.todos.id != nums) {
  //     res.status(400).send("Invalid argument");
  //   } else {
  let mpo = data.todos.filter((e) => {
    console.log(req.body);

    if (+req.params.id == e.id) {
      return false;
    } else {
      return true;
    }
  });
  data.todos = mpo;
  fs.writeFileSync("./db.json", JSON.stringify(data));
  res.send(data.todos);
  //}
});
// export the server
module.exports = app;
//app.listen(4200, () => console.log("server is listening on 4200"));
