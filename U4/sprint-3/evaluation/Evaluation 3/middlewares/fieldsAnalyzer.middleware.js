const express = require("express");
const mongoose = require("mongoose");

function fieldsAnalyzer(req, res, next) {
  const { movie_name, genre, director, rating, year_of_release } = req.body;

  if (!movie_name || !genre || !director || !rating || !year_of_release) {
    res.status(400).send({
      err: "Few fields are missing, cannot process the request",
    });
  } else {
    next();
  }
}

module.exports = { fieldsAnalyzer };
