const mongoose = require("mongoose");

const BlackListSchema = mongoose.Schema({
  token: { type: String, require: true },
});

const BlackListModel = mongoose.model("blacklisting", BlackListSchema);

module.exports = { BlackListModel };
