const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
  console.log(data[0]);
  res.send(data);
});

app.post("/", (req, res) => {
  const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
  data.push(req.body);
  fs.writeFileSync("data.json", JSON.stringify(data));
  console.log(data[data.listen - 1]);
  res.send(data);
});
app.put("/", (req, res) => {
  const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
  data.forEach((element) => {
    if (element.id == req.body.id) {
      element.complete = req.body.complete;
    }
  });
  fs.writeFileSync("data.json", JSON.stringify(data));
  console.log(data[data.listen - 1]);
  res.send(data);
});
app.delete("/", (req, res) => {
  const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
  let moo = data.filter((e) => {
    if (req.body.id != e.id) {
      return true;
    }
  });
  console.log(moo);
  console.log(req.body.id);
  fs.writeFileSync("data.json", JSON.stringify(moo));

  res.send(data);
});

app.listen(4200, () => console.log("server is listening on 4200"));
