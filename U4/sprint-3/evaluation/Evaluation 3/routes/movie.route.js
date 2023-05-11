const mongoose = require("mongoose");
const express = require("express");
const fs = require("fs");
const { movieModel } = require("../models/model");
let getRoute = async (req, res) => {
  //const { minRating, maxRating, genre, year_of_release } = req.query;

  try {
    const minRating = req.query.minRating || 0;
    const maxRating = req.query.maxRating || 5;
    const genre = req.query.genre;
    const year_of_release = req.query.year_of_release;
    console.group(minRating, maxRating, genre, year_of_release);
    // const movieDatas = await movieModel.find({ rating: { $lte: maxRating } });
    if (!year_of_release && !genre) {
      const movieDatas = await movieModel.find({
        $and: [
          { rating: { $gte: minRating } },
          { rating: { $lte: maxRating } },
        ],
      });
      res.status(200).send(movieDatas);
    } else if (year_of_release && !genre) {
      const movieDatas = await movieModel.find({
        $and: [
          { rating: { $gte: minRating } },
          { rating: { $lte: maxRating } },
          { year_of_release: year_of_release },
        ],
      });
      res.status(200).send(movieDatas);
    } else if (!genre && year_of_release) {
      const movieDatas = await movieModel.find({
        $and: [
          { rating: { $gte: minRating } },
          { rating: { $lte: maxRating } },
          { genre: JSON.parse(genre) },
        ],
      });
      res.status(200).send(movieDatas);
    } else {
      const movieDatas = await movieModel.find(
        {
          $and: [
            { rating: { $gte: minRating } },
            { rating: { $lte: maxRating } },
            { year_of_release: year_of_release },
            { genre: JSON.parse(genre) },
          ],
        }

        //{ genre: genre }
      );
      res.status(200).send(movieDatas);
    }

    //console.log("done");
  } catch (error) {
    res.status(400).send({ message: error.message });
    console.log("wrong");
  }
};

let postRoute = async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    const movies = new movieModel(data);
    await movies.save();
    res.status(200).send({ msg: "new Move added" });
    console.log("done");
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

let patchRoute = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const data = req.body;
  console.log(data);
  try {
    const movies = await movieModel.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!movies) {
      res.status(404).send({ msg: "Movie is not found" });
      return;
    }

    res.status(200).send({ msg: "the movie is edited" });
    console.log("done");
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

let deleteRoute = async (req, res) => {
  const id = req.params.id;
  console.log(id);

  try {
    const movies = await movieModel.findByIdAndDelete(id);

    if (!movies) {
      res.status(404).send({ msg: "Movie is not found" });
      return;
    }

    res.status(200).send({ msg: "the movie is deleted" });
    console.log("done");
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
module.exports = { getRoute, postRoute, patchRoute, deleteRoute };
