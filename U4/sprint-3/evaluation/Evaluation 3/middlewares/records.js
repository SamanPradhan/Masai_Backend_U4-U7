const fs = require("fs");

function recordsedit(req, res, next) {
  const id = req.params.id;
  fs.appendFileSync(
    "./records.txt",
    `The Movie with id:${id} has been edited  | ${Date()}\n`
  );
  next();
}
function recordsdeleted(req, res, next) {
  const id = req.params.id;
  fs.appendFileSync(
    "./records.txt",
    `The Movie with id:${id} has been deleted  | ${Date()}\n`
  );
  next();
}
module.exports = { recordsedit, recordsdeleted };
