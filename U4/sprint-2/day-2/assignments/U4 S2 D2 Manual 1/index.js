const express = require("express");
const morgan = require("morgan");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const app = express();
//const upload = multer();

// const middleware = (req, res, next) => {
//   console.log("inside the middle ware");
//   next();
// };

app.post("/upload", upload.single("file"), (req, res) => {
  res.send("File uploaded!");
});
app.listen(4000, () => console.log("server running at 4000"));
