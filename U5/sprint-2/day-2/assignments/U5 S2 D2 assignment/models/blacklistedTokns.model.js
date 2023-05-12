const mongoose = require("mongoose");

const blacklistSchema = mongoose.Schema(
  {
    token: { type: String, required: true },
    expiredAt: { type: Date },
  },
  {
    versionkey: false,
  }
);

const blacklistModel = mongoose.model("backlistedToken", blacklistSchema);
module.exports = { blacklistModel };

// {
//   "title": "new post",
//   "body": "job desc",
//   "device": "laptop",
//   "no_of_comments": "5"
// }
