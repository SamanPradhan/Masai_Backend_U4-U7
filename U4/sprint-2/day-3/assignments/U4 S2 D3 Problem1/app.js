// your code goes here
const express = require("express");
const app = express();

app.get("/multiply", (req, res) => {
  const a = Number(req.query.a);
  const b = Number(req.query.b);
  if (isNaN(a) && isNaN(b)) {
    res.status(400).send({ error: `Both "a" and "b" are required parameters` });
  } else if (isNaN(a) || isNaN(b)) {
    res
      .status(400)
      .send({ error: `"${isNaN(a) ? "a" : "b"}" is not a valid number` });
    console.log(`"${isNaN(a) ? "a" : "b"}" is not a valid number`);
    return;
  }

  const product = a * b;
  res.json({ product });
});

module.exports = app;
//app.listen(4000, () => {
/// console.log("Server started on port 4000");
//});
