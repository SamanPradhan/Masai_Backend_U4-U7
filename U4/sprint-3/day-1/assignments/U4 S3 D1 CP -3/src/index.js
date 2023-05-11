// import required modules
const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const app = express();

app.get("/", (req, res) => {
  res.status(200).send(`{ message: "welcome to server }"`);
});

app.post("/upload", upload.single("file"), (req, res) => {
  console.log(req.file);
  res.status(200).send(`{
    message: "file uploaded successfully"
 }`);
});
// app.listen(4000, () => console.log("server running at 4000"));
// export the server
module.exports = app;
