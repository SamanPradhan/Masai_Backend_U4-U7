// create the express app and export it.
const express = require("express");
const fs = require("fs");
const { student_router } = require("./routes/student.route");
const { instructor_router } = require("./routes/instructor.route");
const app = express();

app.use("/students", student_router);
app.use("/instructor", instructor_router);
// export the app
// module.exports=app;

app.listen(4000, () => {
  console.log("server listening to 4000");
});
