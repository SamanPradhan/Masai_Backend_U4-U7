const express = require("express");

const app = express();
const { connection } = require("./db");
const { register, login, about } = require("./routes/routes");
app.use(express.json());

//Registration
app.post("/register", register);

//login
app.post("/login", login);

//about
app.get("/about", about);

app.listen(4000, async () => {
  try {
    await connection;
    console.log("connected to db");
  } catch (error) {
    console.log("can't connect to db");
    console.log(error);
  }
  console.log("server running at 4000");
});
