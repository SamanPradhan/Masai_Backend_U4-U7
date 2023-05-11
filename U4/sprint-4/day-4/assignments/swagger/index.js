const express = require("express");
const { default: mongoose } = require("mongoose");

const app = express();

app.listen(8080, async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/practiceone");
    console.log("connected to db");
  } catch (error) {
    console.log("Not connected to db");
  }
  console.log("server is running at 8080");
});
