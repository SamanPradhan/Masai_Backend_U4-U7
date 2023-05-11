// your code goes here

// your code goes here
const express = require("express");
const app = express();

app.get("/sum", (req, res) => {
  console.log(req.query.a, req.query.b);
  if (req.query.a == undefined || req.query.b == undefined) {
    res.status(400).send({ error: `Both "a" and "b" are required parameters` });
    console.log(req.query.a, req.query.b);
    return;
  } else {
    const a = Number(req.query.a);
    const b = Number(req.query.b);
    if (isNaN(a) && isNaN(b)) {
      res.status(400).send({ error: `Both "a" and "b" must be numbers` });
      console.log(a, b);
      return;
    } else if (isNaN(a) || isNaN(b)) {
      res
        .status(400)
        .send({ error: `"${isNaN(a) ? "a" : "b"}" is not a valid number` });

      return;
    }

    const sum = a + b;
    res.send({ sum });
  }
});

// donot chnage the below code
module.exports = app;
