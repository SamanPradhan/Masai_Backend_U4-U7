const fs = require("fs");

// make the validator function and export it.
// Custom validation middleware
function validatorfunction(req, res, next) {
  const { ID, Name, Rating, Description, Genre, Cast } = req.body;

  if (!ID || !Name || !Rating || !Description || !Genre || !Cast) {
    res.status(400).send("invalid request body.");
  }

  if (
    typeof ID === "number" &&
    typeof Name === "string" &&
    !stringContainsNumber(Name) &&
    typeof Rating === "number" &&
    typeof Description === "string" &&
    typeof Genre === "string" &&
    Array.isArray(Cast) &&
    Cast.every((name) => typeof name === "string")
  ) {
    return next();
  }
  res.status(400).send("bad request.some data is incorrect.\n");
  fs.writeFileSync("./res.txt", "bad request.some data is incorrect.\n");
  return;
}
function stringContainsNumber(Name) {
  return /\d/.test(Name);
}
module.exports = validatorfunction;
