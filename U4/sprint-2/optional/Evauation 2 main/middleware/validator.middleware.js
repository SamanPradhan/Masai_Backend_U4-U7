const express = require("express");
const fs = require("fs");
//const validator = express.Router();
function validator(req, res, next) {
  let { password, role } = req.query;
  if (password == 7877 && (role == "admin" || role == "instructor")) {
    next();
  } else {
    res.send("You are not authorised to do this operation");
  }

  console.log(req.query);
}
//module.exports = { validator };
