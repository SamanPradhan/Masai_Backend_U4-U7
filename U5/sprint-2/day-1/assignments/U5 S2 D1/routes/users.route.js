const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../models/users.model");
const { blacklistModel } = require("../models/blacklistedTokns.model");
userRouter.post("/register", async (req, res) => {
  console.log(req.body);
  const { name, email, gender, password, age, city, is_married } = req.body;
  try {
    // Check if user already exists
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Create a new user
    bcrypt.hash(password, 10, async (err, hash) => {
      const newUser = new userModel({
        name,
        email,
        gender,
        password: hash,
        age,
        city,
        is_married,
      });
      await newUser.save();
      res.status(200).send({ msg: "Register successfull" });
    });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const findUser = await userModel.findOne({ email });
    if (findUser) {
      bcrypt.compare(password, findUser.password, (err, com) => {
        if (com) {
          const getToken = jwt.sign(
            { userID: findUser._id },
            process.env.JWT_SECRET,
            {
              expiresIn: "10000s",
            }
          );
          const getRefreshToken = jwt.sign(
            { userID: findUser._id },
            process.env.REFRESH_SECRET,
            {
              expiresIn: "50000s",
            }
          );
          res.status(200).send({
            msg: "login successfull",
            token: getToken,
            refreshtoken: getRefreshToken,
          });
        } else {
          res.status(400).send({ msg: "Password is wrong" });
        }
      });
    } else {
      res.status(404).send({ msg: "email is not registered" });
    }
  } catch (error) {
    res.status(400).send({ msg: "email already registered, please log in" });
  }
});

userRouter.get("/getnewtoken", (req, res) => {
  const refreshtoken = req.headers.authorization1;
  try {
    const decoded = jwt.verify(refreshtoken, process.env.REFRESH_SECRET);
    if (decoded) {
      const token = jwt.sign(
        { userId: decoded.userId },
        process.env.JWT_SECRET,
        {
          expiresIn: "10000s",
        }
      );
      return res.send({ token: token });
    } else {
      res.send("invalid refresh token, plz login again");
    }
  } catch (error) {
    res.status(400).send({ msg: error.msg });
  }
});

userRouter.post("/logout", async (req, res) => {
  const token = req.headers.authorization;
  const expiredAt = Date();
  console.log(token, expiredAt);
  try {
    let blacklist = new blacklistModel({ token, expiredAt });
    await blacklist.save();
    res.status(200).send({ msg: "logout successfull" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: error.msg });
  }
});

module.exports = { userRouter };
