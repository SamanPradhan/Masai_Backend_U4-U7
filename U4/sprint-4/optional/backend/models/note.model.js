const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
  {
    title: String,
    subject: String,
    body: String,
    userID: String,
  },
  {
    versionkey: false,
  }
);
const noteModel = mongoose.model("note", noteSchema);

module.exports = { noteModel };
