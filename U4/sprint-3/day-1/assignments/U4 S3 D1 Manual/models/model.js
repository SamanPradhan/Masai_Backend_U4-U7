const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  { versionKey: false }
);

const movieModel = mongoose.model("movies", movieSchema);
module.exports = { movieModel };
