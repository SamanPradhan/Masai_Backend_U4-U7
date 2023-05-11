// write the routes for /students end poient and add middlewares.

const express = require("express");

const student_router = express.Router();

student_router.get("/students ", (req, res) => {
  res.send(req.data);
});
student_router.get("/students/:studentCode ", (req, res) => {
  let id = req.params;
  res.send(req.body.id);
});
module.exports = {
  student_router,
};
