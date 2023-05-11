const { movieModel } = require("../models/model");

let getRoute = async (req, res) => {
  const movieTitle = req.query.movieTitle || "";
  const movieRating = req.query.movieRating || "";
  console.log(movieTitle, movieRating);
  try {
    if (movieTitle && movieRating) {
      const movies = await movieModel.find(
        { title: movieTitle },
        { rating: movieRating }
      );
    }

    res.status(200).send(movies);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

let addRoute = async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    const movies = new movieModel(data);
    await movies.save();
    res.status(200).send({ msg: "new ToDo is added" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};

let updateRoute = async (req, res) => {
  const id = req.params.movieId;
  console.log(id);
  try {
    const movies = await movieModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!movies) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).send({ msg: "data updated" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

let deleteRoute = async (req, res) => {
  let id = req.params.movieId;
  console.log(id);
  try {
    const movieFind = await movieModel.findByIdAndDelete(req.params.movieId);
    if (!movieFind) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).send({ msg: "data deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getRoute, addRoute, updateRoute, deleteRoute };
