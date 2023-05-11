const express = require("express");
const { truncate } = require("fs");
const {
  getRoute,
  postRoute,
  patchRoute,
  deleteRoute,
} = require("./routes/movie.route");
const { fieldsAnalyzer } = require("./middlewares/fieldsAnalyzer.middleware");
const { recordsedit, recordsdeleted } = require("./middlewares/records");
const { movieModel } = require("./models/model");
const mongoose = require("mongoose");
require("dotenv").config();

let app = express();
app.use(express.json());

const connection = mongoose.connect(process.env.mongoUrl);

app.get("/", getRoute);
app.post("/addMovie", fieldsAnalyzer, postRoute);
app.patch("/:id", recordsedit, patchRoute);
app.delete("/:id", recordsdeleted, deleteRoute);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Conncted to MongoDB");
  } catch (error) {
    console.log("Not able to connect to MongoDB");
  }
  console.log("server is listening at " + process.env.port);
});
