const express = require("express");
const { SchemaTypes } = require("mongoose");
const { connection } = require("./config/db");
const { TodoModel } = require("./models/model");

const {
  verify,
  getRoute,
  addRoute,
  updateRoute,
  deleteRoute,
} = require("./routes/route");

let app = express();
app.use(express.json());

app.post("/verify", verify);
app.get("/todos", getRoute);

app.post("/todos/create", addRoute);

app.put("/todos/:todoId", updateRoute);

app.delete("/todos/:todoId", deleteRoute);

app.listen(4040, async () => {
  try {
    await connection;
    console.log("connected to mongo");
  } catch (error) {
    console.log("Not able to connect to Mongo");
  }
  console.log(`connected to server at  4040`);
});
