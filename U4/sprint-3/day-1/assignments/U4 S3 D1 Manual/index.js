const express = require("express");
const { connection } = require("./db/db");
const { TodoModel } = require("./models/model");

const {
  getRoute,
  addRoute,
  updateRoute,
  deleteRoute,
} = require("./routes/routes");

let app = express();
app.use(express.json());

app.get("/movies", getRoute);

app.post("/movies/create", addRoute);

app.put("/movies/:movieId", updateRoute);

app.delete("/movies/:movieId", deleteRoute);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to mongo");
  } catch (error) {
    console.log("Not able to connect to Mongo");
  }
  console.log(`connected to server at  ${process.env.port}`);
});
