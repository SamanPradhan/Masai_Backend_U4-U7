const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { blacklistModel } = require("../models/blacklistedTokns.model");
const authentication = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(req.headers.authorization);
  // const blacklist = blacklistModel.findOne({ token: token });

  // if (blacklist) {
  //   // if (err) {
  //   //   console.log(err);
  //   // } else if (result && result.expiredAt > new Date())
  //   //{
  //   // console.log("JWT token is blacklisted.");
  //   // res.send(400).send({ msg: "JWT token is blacklisted." });
  // } else {
  //   console.log("JWT token is not blacklisted.");
  //   const decode = jwt.verify(token, process.env.JWT_SECRET);
  //   console.log("decode", decode);
  //   if (decode) {
  //     req.body.userId = decode.userID;
  //     req.body.is_married = decode.is_married;
  //     next();
  //   } else {
  //     res.status(400).send({ msg: "Login to access" });
  //   }
  // }
};
//};

module.exports = { authentication };
