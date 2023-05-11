const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: String,
    age: Number,
    location: String,
  },
  {
    versionkey: false,
  }
);

const userModelq = mongoose.model("user", userSchema);

module.exports = { userModelq };
