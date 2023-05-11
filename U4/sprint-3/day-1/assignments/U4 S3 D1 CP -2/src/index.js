const express = require("express");
const morgan = require("morgan");
const fs = require("fs");

const app = express();
const accessLogStream = fs.createWriteStream("./src/access.log", {
  flags: "a",
});

// Morgan middleware for logging HTTP requests
app.use(
  morgan(
    ":method :status :res[content-length] - :response-time ms :date[web] :http-version :url\n",
    {
      stream: accessLogStream,
    }
  )
);

// GET route for root path
app.get("/", (req, res) => {
  res.status(200).json({ message: "welcome to server" });
});

// GET route for listing all users
app.get("/get-users", (req, res) => {
  res.status(200).json({ message: "here is the list of all users" });
});

// POST route for adding a user
app.post("/add-user", (req, res) => {
  res.status(201).json({ message: "user added successfully" });
});

// PUT route for updating a user by ID
app.put("/user/:id", (req, res) => {
  const id = req.params.id;
  res.status(201).json({ message: `user ${id} updated successfylly` });
});

// DELETE route for deleting a user by ID
app.delete("/user/:id", (req, res) => {
  const id = req.params.id;
  res.status(200).json({ message: `user ${id} deleted successfylly` });
});

// Export the app for external usage
module.exports = app;
