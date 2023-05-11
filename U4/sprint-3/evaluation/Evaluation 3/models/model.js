const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  movie_name: { type: String, required: true },
  genre: { type: String },
  director: { type: String },
  rating: { type: Number, required: true },
  year_of_release: { type: Number, required: true },
});

const movieModel = mongoose.model("movie", movieSchema);

module.exports = { movieModel };
