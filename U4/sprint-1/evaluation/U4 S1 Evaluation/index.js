const http = require("http");
const fs = require("fs");
const os = require("os");
const dns = require("node:dns");
const cowsay = require("cowsay");

let userCnt = 0; //To count the number of users

//" make the server function and export";
const server = http.createServer((req, res) => {
  //Handling the home route, send an h1 tag
  res.setHeader("Content-Type", "text/html");
  if (req.url === "/") {
    res.end(`<h1>HOME PAGE</h1>`);
  } else if (req.url === "/count") {
    //counting the number of users and writing the initial number in the logs.txt along with the time stamp

    fs.readFile("data.json", "utf-8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text-plain" });
        // res.write("Send the complete err as response\n");
        return res.end(err);
      } else {
        let m = JSON.parse(data);
        userCnt = m.length;
        //console.log(userCnt);
        let dataMan = `The inital user count is ${userCnt} at ${Date().toString()}\n`;
        fs.appendFile("logs.txt", dataMan, (err) => {
          if (err) {
            res.writeHead(500, { "Content-Type": "text-plain" });
            res.write("Send the complete err as response\n");
            return res.end();
          } else {
            res.writeHead(500, { "Content-Type": "text-plain" });

            res.write(`The user count has been updated in the logs file\n`);
            return res.end();
          }
        });
        //res.end("ll");
      }
    });
  } else if (req.url === "/update") {
    let newUser = {
      id: 10,
      first_name: os.userInfo().username,
      last_name: os.userInfo().username,
      email: "dddd@gmail.com",
      gender: "Male",
    };
    // res.writeHead(500, { "Content-Type": "text-plain" });
    // res.write(newUser);
    let value = fs.readFileSync("data.json", "utf8");
    let user = JSON.parse(value);
    user.push(newUser);
    userCnt++;
    console.log(user);
    fs.writeFile("./data.json", JSON.stringify(user), (err) => {
      if (err) {
        // res.writeHead(500, { "Content-Type": "text-plain" });
        // res.write("Send the complete err as response\n");
        // console.log("error");
        return res.end();
      } else {
        let updatedUser = `The inital user count is ${userCnt} at ${Date().toString()}\n`;
        //fs.appendFileSync("/", updatedUser);
        fs.appendFile("logs.txt", updatedUser, (err) => {
          if (err) {
            res.writeHead(500, { "Content-Type": "text-plain" });
            res.write("Send the complete err as response\n");
            return res.end();
          } else {
            res.writeHead(500, { "Content-Type": "text-plain" });
            res.write(
              "The data has been updated, go and check the data file\n"
            );
            return res.end();
          }
        });
      }
    });
  } else {
    res.end("not found");
  }

  //updating the user database

  //should append updated number of users in logs.txt along with the time stamp

  //get the first names of all the users from the json file and send as a response in list format

  //to get the website url from terminal and write its ip address and family in logs.txt

  // using the cowsay external module
});

// Do not listen to the server just export(default) it
module.exports = server;
// let port = 4000;
// server.listen(port, () => {
//   console.log(`Server running at 4000/`);
// });
