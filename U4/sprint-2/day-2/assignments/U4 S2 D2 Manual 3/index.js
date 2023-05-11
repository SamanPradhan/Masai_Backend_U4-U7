const express = require("express");
const morgan = require("morgan");
let app = express();

app.use(express.json());

var amm = app.use(
  morgan(
    ":method :status :res[content-length] - :response-time ms :date[web] :http-version :url\n"
  )
);

app.get("/", (req, res, next) => {
  res.send("morgan done");
});
app.listen(4000, () => console.log("server running at 4000"));
