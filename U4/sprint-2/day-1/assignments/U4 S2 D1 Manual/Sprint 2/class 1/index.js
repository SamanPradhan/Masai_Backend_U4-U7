const express = require("express");

let app = express();

app.use(express.json());
app.get("/", (req, res) => {
  res.send("hello home");
});

app.post("/adddetails", (req, res) => {
  console.log(req.body);
  res.send("data has been accepted");
});

app.get("/done", (req, res) => {
  res.send("All details so far...");
});
app.listen("4200", () => {
  console.log("app is running");
});
