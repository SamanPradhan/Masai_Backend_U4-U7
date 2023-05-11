// write the routes for /students end poient and add middlewares.

const express = require("express");
const fs = require("fs");
const studentrouter = express.Router();

function validator(req, res, next) {
  let { pass, role } = req.query;
  if (pass == "7877" && (role == "admin" || role == "instructor")) {
    next();
  } else {
    res.send("You are not authorised to do this operation");
  }

  console.log(req.query);
}
studentrouter.get("/", (req, res) => {
  let data = JSON.parse(fs.readFileSync("./db.json"));
  //console.log(data);
  //res.send("done");
  res.send(data.students);
});

studentrouter.get("/:studentCode", (req, res) => {
  let id = req.params.studentCode;
  let data = JSON.parse(fs.readFileSync("./db.json"));
  //console.log(data.students);
  for (let i = 0; i < data.students.length; i++) {
    if (data.students[i].student_code == id) {
      res.send(data.students[i]);
    }
  }

  //console.log(id);
  //res.send("yes");
});

studentrouter.post("/addstudent", (req, res) => {
  let data = JSON.parse(fs.readFileSync("./db.json"));
  //console.log(data.students);
  //console.log(req.body);
  data.students.push(req.body);
  fs.writeFileSync("./db.json", JSON.stringify(data));
  res.send("Student has been added");
});

studentrouter.delete("/:studentCode", validator, (req, res) => {
  let id = req.params.studentCode;
  let data = JSON.parse(fs.readFileSync("./db.json"));
  // console.log(data.students);
  data.students = data.students.filter((e) => {
    if (e.student_code != id) {
      return true;
    }
  });
  fs.writeFileSync("./db.json", JSON.stringify(data));
  // console.log(data);
  res.send("Deleted Student Details");
});
studentrouter.patch("/:studentCode", validator, (req, res) => {
  let id = req.params.studentCode;
  let data = JSON.parse(fs.readFileSync("./db.json"));

  for (let i = 0; i < data.students.length; i++) {
    if (data.students[i].student_code == id) {
      //console.log(data.students[i]);
      //console.log(req.body.name);
      data.students[i].name = req.body.name;
      data.students[i].location = req.body.location;
      data.students[i].batch = req.body.batch;
    }
  }
  fs.writeFileSync("./db.json", JSON.stringify(data));

  res.send("Patched Student Details");
});
module.exports = { studentrouter };
