const express = require("express");
const userRouter = express.Router();
const { UserModel } = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

/**
 * @swagger
 * components:
 * schemas:
 * User:
 * type: object
 * properties:
 * id:
 * type: string
 * description: The auto-generated id of the user
 * email:
 * type: string
 * description: name of user
 * password:
 * type: string
 * description: Password of user
 * age:
 * type: integer
 * description: Age of the user
 * * city:
 * type: string
 * description: City of the user
 */
/**
 * @swagger
 * tags:
 * name: user
 * description: All the API routes related to User
 */

/**
 * @swagger
 * /user/register:
 * post:
 * summary: To add new user
 * tags: [user]
 * requestBody:
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/note'
 * responses:
 * 200:
 * description: New user is successfully registered
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/user'
 * 400:
 * description: Some error occurred
 */
userRouter.post("/register", async (req, res) => {
  const { email, password, city, age } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      const user = new UserModel({ email, password: hash, city, age });
      await user.save();
      res.status(200).send({ msg: "Registration has been done!" });
    });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

//login(authentication)

/**
 * @swagger
 * /user/login:
 * post:
 * summary: To log in a user
 * tags: [user]
 * requestBody:
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/user'
 * responses:
 * 200:
 * description: New user is successfully logged in
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/user'
 * 400:
 * description: Some error occurred
 */
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          res.status(200).send({
            msg: "Login successfull!",
            token: jwt.sign({ userID: user._id }, "masai"),
          });
        } else {
          res.status(400).send({ msg: "Wrong Credentials" });
        }
      });
    }
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

module.exports = {
  userRouter,
};
