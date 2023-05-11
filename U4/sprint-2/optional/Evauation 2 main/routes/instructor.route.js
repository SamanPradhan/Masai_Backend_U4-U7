// write the routes for /instructors end poient and add middlewares.

const express = require("express");
const fs = require("fs");
const instructor_router = express.Router();

instructor_router.post("/addinstructor", (req, res) => {
  let data = JSON.parse(fs.readFileSync("./db.json"));
  // console.log(data.instructors);
  // console.log(req.body);
  data.instructors.push(req.body);
  fs.writeFileSync("./db.json", JSON.stringify(data));
  res.send("Instructor has been added");
});
instructor_router.get("/", (req, res) => {
  let data = JSON.parse(fs.readFileSync("./db.json"));
  ///console.log(data);
  //   res.send("done");
  res.send(data.instructors);
});
instructor_router.get("/:empID", (req, res) => {
  let id = req.params.empID;
  let data = JSON.parse(fs.readFileSync("./db.json"));
  // console.log(data.instructors);
  for (let i = 0; i < data.instructors.length; i++) {
    if (data.instructors[i].emp_id == id) {
      res.send(data.instructors[i]);
    }
  }
  //console.log(id);
});

module.exports = { instructor_router };
