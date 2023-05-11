// write the routes for /instructors end poient and add middlewares.

const express = require("express");

const instructor_router = express.Router();

instructor_router.get("/instructors ", (req, res) => {
  res.send(req.data);
});

module.exports = {
  instructor_router,
};
