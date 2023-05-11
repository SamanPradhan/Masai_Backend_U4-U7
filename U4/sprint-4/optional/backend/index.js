const express = require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.route");
const { noteRouter } = require("./routes/note.route");
require("dotenv").config();
const cors = require("cors");
let app = express();
app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/note", noteRouter);

app.listen(4040, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (error) {
    console.log("server didn't connect");
  }

  console.log("server is listening at 4040");
});
