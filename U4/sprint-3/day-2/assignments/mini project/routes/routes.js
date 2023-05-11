const express = require("express");
const jwt = require("jsonwebtoken");
const { userModel } = require("../models/model");
const register = async (req, res) => {
  try {
    const user = new userModel(req.body);
    await user.save();
    res.status(200).send({ msg: "register done" });
  } catch (error) {
    res.status(400).send({ msg: error });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.find({ email: email, password: password });

    user.length > 0
      ? res.status(200).send({
          msg: "login successfull",
          token: jwt.sign({ name: "saman" }, "pradhan"),
        })
      : res.status(404).send({ msg: "User not found" });
    console.log(user);
  } catch (error) {
    res.status(400).send({ msg: error });
  }
};
const about = async (req, res) => {
  const token = req.headers.authorization;
  console.log(token);
  jwt.verify(token, "pradhan", (err, decoded) => {
    decoded
      ? res.status(200).send({ msg: "User Details" })
      : res.status(400).send({ msg: "User does not have authority" });
  });
};

module.exports = { register, login, about };
