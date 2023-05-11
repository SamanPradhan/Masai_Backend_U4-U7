const mongoose = require("mongoose");
const connection = mongoose.connect(
  "mongodb+srv://samanpradhan:saman@cluster0.n26q1h8.mongodb.net/todo?retryWrites=true&w=majority"
);

module.exports = { connection };
