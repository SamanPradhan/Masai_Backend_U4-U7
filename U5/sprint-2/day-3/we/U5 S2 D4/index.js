const express = require("express");
require("dotenv").config();
const { connection } = require("./config/db");
const cookieParser = require("cookie-parser");
const { userRouter } = require("./routes/user.routes");
const { authentication } = require("./middlewares/auth.middleware");
const nodemailer = require("nodemailer");

//nodemailer transports configuration

// console.log(process.env.GOOGLE_PASS);
// const transports = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "pradhansaman@gmail.com",
//     password: process.env.GOOGLE_PASS,
//   },
// });

//OTP generator
// function otpGenerator() {
//   let OTP = "";
//   for (let i = 0; i < 4; i++) {
//     OTP += Math.floor(Math.random() * 10);
//   }
//   return OTP;
// }
// console.log(otpGenerator());

// NODEMAILER TRANSPORTS CONFIGURATION
const trasports = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "inder39811@gmail.com",
    pass: process.env.GOOGLE_PASS,
  },
});
// OTP GENERATRO
function otpgenerator() {
  let otp = "";
  for (let i = 0; i < 6; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  return otp;
}
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/users", userRouter);
app.use(authentication);

app.get("/get-otp", async (req, res) => {
  const { email } = req.body; // person's email to which we want to send otp
  const otp = otpgenerator();
  trasports
    .sendMail({
      to: [email],
      from: "inder39811@gmail.com",
      subject: "OTP verification",
      text: `Your OTP for the password reset process is ${otp}`,
    })
    .then((result) => {
      console.log(result);
      req.session.OTP = otp;
      console.log(req.session.OTP, "LINE 57");
      res.send("Email sent");
    })
    .catch((err) => {
      console.log(err);
      console.log(err.message);
      res.send("Something wrong happend");
    });
});

app.get("/verify-otp", async (req, res) => {
  const { OTP } = req.query;
  const serverOtp = req.session.OTP;
  console.log(req.session);
  console.log(OTP, serverOtp);
  if (OTP == serverOtp) {
    /// provide a file which can reset the password
    res.send("OTP verified");
  } else {
    res.send("Wrong otp");
  }
});

app.get("/protected", auth, (req, res) => {
  res.send("Protected data");
});
// app.get("/get-otp", async (req, res) => {
//   const { email } = req.body; //person needs to send email for getting otp
//   transports
//     .sendMail({
//       to: email,
//       from: "pradhansaman2017@gmail.com",
//       subject: "OTP verification",
//       text: `OTP for resetting the Password ${otpGenerator()}`,
//     })
//     .then((res) => {
//       console.log(res);
//       res.status(200).send({ msg: "OTP send" });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(200).send({ msg: "some errors" });
//     });
// });
app.get("/posts", (req, res) => {
  res.send({ msg: "protected" });
});
app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to db");
  } catch (error) {
    console.log("can't connect to db");
  }

  console.log("server is running at " + process.env.port);
});
