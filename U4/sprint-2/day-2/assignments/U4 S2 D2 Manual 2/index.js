const express = require("express");

let app = express();

app.use(express.json());
function validateData(req, res, next) {
  console.log(req.body);
  let { id, name, rating, description, genre, cast } = req.body;
  console.log(id, name, rating, description, genre, cast);
  if (isNaN(id)) {
    return res.status(400).send("check data again");
  }

  if (typeof name !== "string") {
    return res.status(400).send("check data again");
  }

  if (typeof rating !== "number") {
    return res.status(400).send("check data again");
  }

  if (typeof description !== "string") {
    return res.status(400).send("check data again");
  }

  if (typeof genre !== "string") {
    return res.status(400).send("check data again");
  }

  if (!Array.isArray(cast)) {
    return res.status(400).send("check data again");
  }

  next();
}

app.post("/movies", validateData, (req, res) => {
  // console.log("app", req.body);
  res.send("Movie added to database!");
});

app.listen(4000, () => console.log("server running at 4000"));
