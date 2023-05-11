// create the express app and export it.
const express = require("express");
const fs = require("fs");
const { studentrouter } = require("./routes/student.route");
const { instructor_router } = require("./routes/instructor.route");
const app = express();
app.use(express.json());
app.use("/students", studentrouter);
app.use("/instructors", instructor_router);
// export the app
module.exports = app;

// app.listen(4700, () => {
//   console.log("server listening to 4700");
// });
